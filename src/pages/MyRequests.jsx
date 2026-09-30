import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiPackage } from "react-icons/fi";
import {
  getMyRequestsAPI,
  updateBorrowRequestAPI,
  updateItemAPI,
} from "../services/allAPI";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);

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
        const result = await getMyRequestsAPI(user.name);

        console.log(result.data);

        setRequests(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  // Return item
  const handleReturnItem = async (request) => {
    try {
      setReturningId(request.id);

      // Mark request as Returned
      await updateBorrowRequestAPI(request.id, {
        status: "Returned",
      });

      // Make item available again
      if (request.itemId) {
        await updateItemAPI(request.itemId, {
          available: true,
        });
      }

      // Update page immediately
      setRequests((previousRequests) =>
        previousRequests.map((item) =>
          item.id === request.id
            ? {
                ...item,
                status: "Returned",
              }
            : item
        )
      );

      alert("Item returned successfully!");
    } catch (error) {
      console.log("Return error:", error);

      alert("Something went wrong while returning the item.");
    } finally {
      setReturningId(null);
    }
  };

  const getStatusClass = (status) => {
    if (status === "Accepted") {
      return "request-status accepted";
    }

    if (status === "Rejected") {
      return "request-status rejected";
    }

    if (status === "Returned") {
      return "request-status returned";
    }

    return "request-status pending";
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border"
          role="status"
        ></div>

        <p className="text-muted mt-3">
          Loading your requests...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-person-circle fs-1 text-muted"></i>

        <h4 className="mt-3">
          Please login first
        </h4>

        <p className="text-muted">
          Login to view your borrow requests.
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
            My Borrow Requests
          </h2>

          <p className="text-muted">
            Keep track of the items you have requested.
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

                      <FiCalendar size={15} />

                      <span>
                        {request.fromDate} to{" "}
                        {request.toDate}
                      </span>

                    </div>

                    <div className="mt-3">

                      <span
                        className={getStatusClass(
                          request.status
                        )}
                      >
                        {request.status}
                      </span>

                    </div>

                    {/* Return button */}
                    {request.status === "Accepted" && (
                      <button
                        className="btn btn-dark w-100 mt-3"
                        onClick={() =>
                          handleReturnItem(request)
                        }
                        disabled={
                          returningId === request.id
                        }
                      >
                        {returningId === request.id
                          ? "Returning..."
                          : "Return Item"}
                      </button>
                    )}

                    {/* Returned message */}
                    {request.status === "Returned" && (
                      <div className="text-center mt-3">
                        <small className="text-success fw-semibold">
                          Item has been returned
                        </small>
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
              No borrow requests yet
            </h5>

            <p className="text-muted">
              Browse available items and request
              something you need.
            </p>

            <Link
              to="/browse"
              className="btn btn-dark mt-2"
            >
              Browse Items
            </Link>

          </div>
        )}

      </div>
    </div>
  );
}

export default MyRequests;