import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiMapPin, FiArrowLeft } from "react-icons/fi";

import {
  getItemByIdAPI,
  addBorrowRequestAPI,
} from "../services/allAPI";

function ItemDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get logged-in user
  const [currentUser] = useState(() => {
    const savedUser = localStorage.getItem("borrowlyUser");

    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        console.log(error);
      }
    }

    return null;
  });

  const [request, setRequest] = useState({
    borrowerName: "",
    fromDate: "",
    toDate: "",
    message: "",
  });

  // Fetch item
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const result = await getItemByIdAPI(id);

        console.log("Item:", result.data);

        setItem(result.data);
      } catch (error) {
        console.log("Item fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  };

  // Request to borrow
  const handleRequest = async (e) => {
    e.preventDefault();

    // Login check
    if (!currentUser) {
      alert("Please login first.");
      return;
    }

    if (currentUser.name === item.ownerName) {
      alert("You cannot request your own item.");
      return;
    }

  
    if (item.available === false) {
      alert("This item is currently borrowed.");
      return;
    }

    // Required fields
    if (
      !request.borrowerName ||
      !request.fromDate ||
      !request.toDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Date validation
    if (request.toDate < request.fromDate) {
      alert("Return date cannot be before the start date.");
      return;
    }

    const borrowRequest = {
      itemId: item.id,
      itemName: item.name,
      ownerName: item.ownerName,
      borrowerName: request.borrowerName,
      fromDate: request.fromDate,
      toDate: request.toDate,
      message: request.message,
      status: "Pending",
    };

    try {
      const result = await addBorrowRequestAPI(borrowRequest);

      console.log("Borrow request:", result.data);

      alert("Borrow request sent successfully!");

      setRequest({
        borrowerName: "",
        fromDate: "",
        toDate: "",
        message: "",
      });
    } catch (error) {
      console.log("Request error:", error);

      alert("Something went wrong. Please try again.");
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading...</h4>
      </div>
    );
  }

  // Item not found
  if (!item) {
    return (
      <div className="container py-5 text-center">
        <h4>Item not found</h4>

        <Link
          to="/browse"
          className="btn btn-dark mt-3"
        >
          Back to Browse
        </Link>
      </div>
    );
  }

  
  const isOwner =
    currentUser &&
    currentUser.name === item.ownerName;

  return (
    <div className="item-details-page">

      <div className="container py-5">

        <Link
          to="/browse"
          className="text-dark text-decoration-none"
        >
          <FiArrowLeft className="me-2" />
          Back to Browse
        </Link>

        <div className="row mt-4 g-5">

          

          <div className="col-lg-6">

            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="img-fluid rounded shadow-sm w-100"
                style={{
                  height: "450px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                className="bg-light rounded d-flex align-items-center justify-content-center"
                style={{
                  height: "450px",
                }}
              >
                <span className="text-muted">
                  No Image Available
                </span>
              </div>
            )}

          </div>

          

          <div className="col-lg-6">

            {/* Category */}
            <span className="badge bg-light text-dark">
              {item.category}
            </span>

            {/* Item name */}
            <h1 className="fw-bold mt-3">
              {item.name}
            </h1>

            {/* Location */}
            <div className="d-flex align-items-center text-muted mb-4">
              <FiMapPin
                size={17}
                className="me-2"
              />

              {item.location}
            </div>

            {/* Owner */}
            <p className="text-muted">
              <strong>Owner:</strong>{" "}
              {item.ownerName}
            </p>


            {item.available === false ? (
              <div className="alert alert-warning">
                <strong>
                  Currently Borrowed
                </strong>

                <br />

                This item is currently unavailable.
              </div>
            ) : (
              <div className="alert alert-success">
                <strong>
                  Available
                </strong>

                <br />

                This item is currently available to borrow.
              </div>
            )}

            {/*PRICE  */}

            <div className="mb-4">

              <strong className="fs-3">
                ₹{item.price}
              </strong>

              <span className="text-muted ms-2">
                / day
              </span>

            </div>

            {/* Description */}
            <p className="text-muted">
              {item.description}
            </p>

            <hr className="my-4" />

           
            {/* OWNER VIEW */}
         

            {isOwner ? (

              <div className="alert alert-info">

                <h5 className="fw-bold">
                  This is Your Item
                </h5>

                <p className="mb-0">
                  You are the owner of this item.
                  Other users can request to borrow it.
                </p>

              </div>

            ) : item.available === false ? (

             
             
             

              <div>

                <h5 className="fw-bold">
                  Item Unavailable
                </h5>

                <p className="text-muted">
                  You cannot request this item until
                  it has been returned.
                </p>

                <Link
                  to="/browse"
                  className="btn btn-dark"
                >
                  Browse Other Items
                </Link>

              </div>

            ) : (

             
              /* OTHER USER REQUEST FORM */
            

              <>

                <h5 className="fw-bold mb-3">
                  Request to Borrow
                </h5>

                <form onSubmit={handleRequest}>

                  {/* Your Name */}
                  <div className="mb-3">

                    <label className="form-label">
                      Your Name
                    </label>

                    <input
                      type="text"
                      name="borrowerName"
                      className="form-control"
                      value={request.borrowerName}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />

                  </div>

                  {/* From Date */}
                  <div className="mb-3">

                    <label className="form-label">
                      Borrow From
                    </label>

                    <input
                      type="date"
                      name="fromDate"
                      className="form-control"
                      value={request.fromDate}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* Return Date */}
                  <div className="mb-3">

                    <label className="form-label">
                      Return Date
                    </label>

                    <input
                      type="date"
                      name="toDate"
                      className="form-control"
                      value={request.toDate}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* Message */}
                  <div className="mb-3">

                    <label className="form-label">
                      Message
                    </label>

                    <textarea
                      name="message"
                      className="form-control"
                      rows="3"
                      value={request.message}
                      onChange={handleChange}
                      placeholder="Why do you need this item?"
                    ></textarea>

                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg w-100"
                  >
                    Request to Borrow
                  </button>

                </form>

              </>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ItemDetails;