import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/browse?search=${encodeURIComponent(search)}`);
    } else {
      navigate("/browse");
    }
  };

  const categories = [
    {
      name: "Electronics",
      icon: "bi-laptop",
    },
    {
      name: "Books",
      icon: "bi-book",
    },
    {
      name: "Tools",
      icon: "bi-tools",
    },
    {
      name: "Sports",
      icon: "bi-dribbble",
    },
    {
      name: "Other",
      icon: "bi-box",
    },
  ];

  return (
    <div>

      {/* ================= HERO SECTION ================= */}

      <section className="borrowly-hero">

        <div className="container">

          <div className="row align-items-center min-vh-75">

            {/* LEFT SIDE */}

            <div className="col-lg-7">

              <p className="text-uppercase small fw-semibold text-muted mb-3">
                Borrow. Use. Return.
              </p>

              <h1 className="display-4 fw-bold mb-3">
                Why buy it when you can borrow it?
              </h1>

              <p className="lead text-muted mb-4">
                Find useful things from people around you and borrow
                them when you actually need them.
              </p>

              {/* SEARCH */}

              <form
                className="borrowly-search"
                onSubmit={handleSearch}
              >

                <i className="bi bi-search"></i>

                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <button type="submit">
                  Search
                </button>

              </form>

              <div className="mt-4">

                <Link
                  to="/browse"
                  className="text-dark text-decoration-none fw-semibold"
                >
                  Explore available items

                  <i className="bi bi-arrow-right ms-2"></i>

                </Link>

              </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="col-lg-5 mt-5 mt-lg-0">

              <div className="hero-card">

                <div className="hero-card-top">

                  <span className="fw-semibold">
                    Borrowly
                  </span>

                  <span className="small text-muted">
                    Simple sharing
                  </span>

                </div>

                <div className="text-center py-4">

                  <div
                    className="mx-auto mb-4 d-flex align-items-center justify-content-center bg-light rounded-circle"
                    style={{
                      width: "90px",
                      height: "90px",
                    }}
                  >

                    <i
                      className="bi bi-arrow-repeat"
                      style={{ fontSize: "38px" }}
                    ></i>

                  </div>

                  <h4 className="fw-bold">
                    Borrow what you need
                  </h4>

                  <p className="text-muted mb-0">
                    Use something for a while instead of buying it
                    just for one occasion.
                  </p>

                </div>

                <hr />

                <div className="d-flex justify-content-between">

                  <small className="text-muted">

                    <i className="bi bi-people me-1"></i>

                    Community based

                  </small>

                  <small className="fw-semibold">

                    <i className="bi bi-shield-check me-1"></i>

                    Simple & secure

                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CATEGORIES ================= */}

      <section className="py-5">

        <div className="container">

          <div className="mb-4">

            <h3 className="fw-bold">
              Browse categories
            </h3>

            <p className="text-muted">
              Find something useful without buying it.
            </p>

          </div>

          <div className="row g-3">

            {categories.map((category) => (

              <div
                className="col-6 col-md-4 col-lg"
                key={category.name}
              >

                <Link
                  to={`/browse?category=${encodeURIComponent(
                    category.name
                  )}`}
                  className="text-decoration-none text-dark"
                >

                  <div className="category-card h-100">

                    <span>
                      <i
                        className={`bi ${category.icon}`}
                        style={{ fontSize: "24px" }}
                      ></i>
                    </span>

                    <h6 className="mt-3 mb-0">
                      {category.name}
                    </h6>

                  </div>

                </Link>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className="py-5 bg-light">

        <div className="container">

          <div className="text-center mb-5">

            <h3 className="fw-bold">
              How Borrowly works
            </h3>

            <p className="text-muted">
              Borrowing something is just a few clicks away.
            </p>

          </div>

          <div className="row g-4">

            {/* STEP 1 */}

            <div className="col-md-4">

              <div className="text-center px-3">

                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm"
                  style={{
                    width: "65px",
                    height: "65px",
                  }}
                >

                  <i
                    className="bi bi-search"
                    style={{ fontSize: "25px" }}
                  ></i>

                </div>

                <h5 className="fw-bold">
                  1. Find an item
                </h5>

                <p className="text-muted">
                  Browse items shared by people in the community.
                </p>

              </div>

            </div>

            {/* STEP 2 */}

            <div className="col-md-4">

              <div className="text-center px-3">

                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm"
                  style={{
                    width: "65px",
                    height: "65px",
                  }}
                >

                  <i
                    className="bi bi-person-plus"
                    style={{ fontSize: "25px" }}
                  ></i>

                </div>

                <h5 className="fw-bold">
                  2. Send a request
                </h5>

                <p className="text-muted">
                  Choose your dates and send a request to the owner.
                </p>

              </div>

            </div>

            {/* STEP 3 */}

            <div className="col-md-4">

              <div className="text-center px-3">

                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm"
                  style={{
                    width: "65px",
                    height: "65px",
                  }}
                >

                  <i
                    className="bi bi-arrow-repeat"
                    style={{ fontSize: "25px" }}
                  ></i>

                </div>

                <h5 className="fw-bold">
                  3. Use & return
                </h5>

                <p className="text-muted">
                  Use the item and return it when you're finished.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;