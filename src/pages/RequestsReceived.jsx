import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiPackage,
  FiUser,
  FiCheck,
  FiX,
} from "react-icons/fi";

import {
  getAllBorrowRequestsAPI,
  updateBorrowRequestAPI,
  updateItemAPI,
} from "../services/allAPI";

function RequestsReceived() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [user] = useState(() => {
    const savedUser = localStorage.getItem("borrowlyUser");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const result = await getAllBorrowRequestsAPI();

        const ownerRequests = result.data.filter(
          (request) =>
            request.ownerName === user.name
        );

        setRequests(ownerRequests);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  // Accept / Reject request
  const updateStatus = async (request, status) => {
    try {
      // Update request status
      const result = await updateBorrowRequestAPI(
        request.id,
        {
          status: status,
        }
      );

      // If accepted, make item unavailable
      if (
        status === "Accepted" &&
        request.itemId
      ) {
        await updateItemAPI(
          request.itemId,
          {
            available: false,
          }
        );
      }

      console.log(result.data);

      setRequests((previousRequests) =>
        previousRequests.map((item) =>
          item.id === request.id
            ? {
                ...item,
                status: status,
              }
            : item
        )
      );

      if (status === "Accepted") {
        alert(
          "Request accepted. The item is now unavailable."
        );
      } else {
        alert("Request rejected.");
      }
    } catch (error) {
      console.log(error);

      alert(
        "Something went wrong while updating the request."
      );
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border"
          role="status"
        ></div>

        <p className="text-muted mt-3">
          Loading requests...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <FiUser size={45} />

        <h4 className="mt-3">
          Please login first
        </h4>

        <p className="text-muted">
          Login to see requests for your items.
        </p>

        <Link
          to="/login"
          className="btn btn-dark"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="requests-page">
      <div className="container py-5">

        <div className="mb-4">
          <h2 className="fw-bold">
            Requests Received
          </h2>

          <p className="text-muted">
            Manage requests for the items you have listed.
          </p>
        </div>

        {requests.length > 0 ? (
          <div className="row g-4">

            {requests.map((request) => (
              <div
                className="col-md-6 col-lg-4"
                key={request.id}
              >

                <div className="request-card">

                  <div className="request-icon">
                    <FiPackage size={30} />
                  </div>

                  <div className="mt-3">

                    <span className="item-category">
                      Borrow Request
                    </span>

                    <h5 className="fw-bold mt-2">
                      {request.itemName}
                    </h5>

                    <div className="request-date">

                      <FiUser size={15} />

                      <span>
                        Requested by:{" "}
                        {request.borrowerName}
                      </span>

                    </div>

                    <div className="request-date">

                      <FiCalendar size={15} />

                      <span>
                        {request.fromDate} to{" "}
                        {request.toDate}
                      </span>

                    </div>

                    {request.message && (
                      <p className="text-muted small mt-3 mb-2">
                        "{request.message}"
                      </p>
                    )}

                    <div className="mt-3">

                      <span
                        className={
                          request.status === "Accepted"
                            ? "request-status accepted"
                            : request.status === "Rejected"
                            ? "request-status rejected"
                            : request.status === "Returned"
                            ? "request-status returned"
                            : "request-status pending"
                        }
                      >
                        {request.status}
                      </span>

                    </div>

                    {/* Accept / Reject */}
                    {request.status === "Pending" && (
                      <div className="d-flex gap-2 mt-4">

                        <button
                          className="btn btn-dark flex-grow-1"
                          onClick={() =>
                            updateStatus(
                              request,
                              "Accepted"
                            )
                          }
                        >
                          <FiCheck className="me-1" />
                          Accept
                        </button>

                        <button
                          className="btn btn-outline-dark flex-grow-1"
                          onClick={() =>
                            updateStatus(
                              request,
                              "Rejected"
                            )
                          }
                        >
                          <FiX className="me-1" />
                          Reject
                        </button>

                      </div>
                    )}

                  </div>

                </div>

              </div>
            ))}

          </div>
        ) : (
          <div className="empty-requests">

            <FiPackage size={45} />

            <h5 className="mt-3">
              No requests received
            </h5>

            <p className="text-muted">
              Requests for your items will appear here.
            </p>

            <Link
              to="/add-item"
              className="btn btn-dark mt-2"
            >
              Add an Item
            </Link>

          </div>
        )}

      </div>
    </div>
  );
}

export default RequestsReceived;