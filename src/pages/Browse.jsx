import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { getAllItemsAPI } from "../services/allAPI";

function Browse() {
  const [items, setItems] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  // Get values from URL
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "All";

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getAllItemsAPI();

        console.log("Items:", response.data);

        setItems(response.data);
      } catch (error) {
        console.log("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  // Search
  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearch(value);

    const params = {};

    if (value.trim()) {
      params.search = value;
    }

    if (category !== "All") {
      params.category = category;
    }

    setSearchParams(params);
  };

  // Category
  const handleCategoryChange = (e) => {
    const value = e.target.value;

    setCategory(value);

    const params = {};

    if (search.trim()) {
      params.search = search;
    }

    if (value !== "All") {
      params.category = value;
    }

    setSearchParams(params);
  };

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSearchParams({});
  };

  // Filter items
  const filteredItems = items.filter((item) => {

    const matchesSearch = item.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-5">

      {/* HEADING */}

      <div className="text-center mb-5">

        <h1 className="fw-bold">
          Browse Items
        </h1>

        <p className="text-muted">
          Find something you need and borrow it from someone nearby.
        </p>

      </div>

     

      <div className="row g-3 mb-5">

        {/* Search */}

        <div className="col-md-8">

          <div className="input-group">

            <span className="input-group-text">
              <FaSearch />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search items..."
              value={search}
              onChange={handleSearchChange}
            />

          </div>

        </div>

        {/* Category */}

        <div className="col-md-4">

          <select
            className="form-select"
            value={category}
            onChange={handleCategoryChange}
          >

            <option value="All">
              All Categories
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Books">
              Books
            </option>

            <option value="Tools">
              Tools
            </option>

            <option value="Sports">
              Sports
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>

      </div>

      

      <div className="d-flex justify-content-between align-items-center mb-3">

        <p className="text-muted mb-0">

          {filteredItems.length}{" "}

          {filteredItems.length === 1
            ? "item"
            : "items"}{" "}

          found

        </p>

        {(search || category !== "All") && (

          <button
            className="btn btn-sm btn-outline-dark"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        )}

      </div>

      {/* ITEMS */}

      <div className="row g-4">

        {filteredItems.length > 0 ? (

          filteredItems.map((item) => (

            <div
              className="col-md-6 col-lg-4"
              key={item.id}
            >

              <div className="card h-100 border-0 shadow-sm overflow-hidden">

                {/* IMAGE */}

                {item.image ? (

                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.name}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />

                ) : (

                  <div
                    className="d-flex align-items-center justify-content-center bg-light"
                    style={{
                      height: "220px",
                    }}
                  >

                    <span className="text-muted">
                      No Image
                    </span>

                  </div>

                )}

                {/* CARD BODY */}

                <div className="card-body d-flex flex-column">

                  <div className="d-flex justify-content-between align-items-start mb-2">

                    <h5 className="card-title text-capitalize mb-0">
                      {item.name}
                    </h5>

                    {item.available === false ? (

                      <span className="badge bg-warning text-dark">
                        Borrowed
                      </span>

                    ) : (

                      <span className="badge bg-success">
                        Available
                      </span>

                    )}

                  </div>

                  {/* CATEGORY */}

                  <p className="text-muted small mb-2">
                    {item.category}
                  </p>

                  {/* DESCRIPTION */}

                  <p className="card-text text-muted">
                    {item.description}
                  </p>

                  <div className="mt-auto">

                    {/* PRICE & LOCATION */}

                    <div className="d-flex justify-content-between align-items-center mb-3">

                      <div>

                        <strong className="fs-5">
                          ₹{item.price}
                        </strong>

                        <span className="text-muted small">
                          {" "}
                          / day
                        </span>

                      </div>

                      <span className="text-muted small">

                        <i className="bi bi-geo-alt me-1"></i>

                        {item.location}

                      </span>

                    </div>

                    {/* VIEW DETAILS */}

                    <Link
                      to={`/item/${item.id}`}
                      className="btn btn-dark w-100"
                    >
                      View Details
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          ))

        ) : (

          /* NO ITEMS */

          <div className="text-center py-5">

            <h5>
              No items found
            </h5>

            <p className="text-muted">
              Try another search or category.
            </p>

            <button
              className="btn btn-outline-dark"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default Browse;