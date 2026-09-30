import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiPackage,
  FiMapPin,
  FiTrash2,
  FiEdit
} from 'react-icons/fi'

import {
  getMyItemsAPI,
  deleteItemAPI
} from '../services/allAPI'

function MyItems() {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const [user] = useState(() => {

    const savedUser = localStorage.getItem('borrowlyUser')

    return savedUser
      ? JSON.parse(savedUser)
      : null

  })

  useEffect(() => {

    const fetchItems = async () => {

      if (!user) {
        setLoading(false)
        return
      }

      try {

        const result = await getMyItemsAPI(user.name)

        console.log(result.data)

        setItems(result.data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }

    }

    fetchItems()

  }, [user])

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this item?'
    )

    if (!confirmDelete) {
      return
    }

    try {

      await deleteItemAPI(id)

      setItems(
        items.filter((item) => item.id !== id)
      )

      alert('Item deleted successfully')

    } catch (error) {

      console.log(error)

      alert('Something went wrong')

    }

  }

  if (loading) {

    return (
      <div className="container py-5 text-center">

        <div
          className="spinner-border"
          role="status"
        ></div>

        <p className="text-muted mt-3">
          Loading your items...
        </p>

      </div>
    )

  }

  if (!user) {

    return (
      <div className="container py-5 text-center">

        <FiPackage size={45} />

        <h4 className="mt-3">
          Please login first
        </h4>

        <p className="text-muted">
          Login to manage your items.
        </p>

        <Link
          to="/login"
          className="btn btn-dark"
        >
          Login
        </Link>

      </div>
    )

  }

  return (
    <div className="requests-page">

      <div className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h2 className="fw-bold mb-2">
              My Items
            </h2>

            <p className="text-muted mb-0">
              Manage the items you have listed on Borrowly.
            </p>

          </div>

          <Link
            to="/add-item"
            className="btn btn-dark"
          >
            Add Item
          </Link>

        </div>

        {items.length > 0 ? (

          <div className="row g-4">

            {items.map((item) => (

              <div
                className="col-md-6 col-lg-4"
                key={item.id}
              >

                <div className="request-card">

                  <div className="request-icon">
                    <FiPackage size={30} />
                  </div>

                  <div className="mt-3">

                    <span className="item-category">
                      {item.category}
                    </span>

                    <h5 className="fw-bold mt-2">
                      {item.name}
                    </h5>

                    <div className="request-date">

                      <FiMapPin size={15} />

                      <span>
                        {item.location}
                      </span>

                    </div>

                    <p className="text-muted small mt-3">
                      {item.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-3">

                      <div>

                        <strong>
                          ₹{item.price}
                        </strong>

                        <span className="text-muted small">
                          {' '}/ day
                        </span>

                      </div>

                      <span
                        className={
                          item.available
                            ? 'request-status accepted'
                            : 'request-status rejected'
                        }
                      >
                        {item.available
                          ? 'Available'
                          : 'Unavailable'}
                      </span>

                    </div>

                    <div className="d-flex gap-2 mt-4">

                      <button
                        className="btn btn-outline-dark flex-grow-1"
                        type="button"
                      >
                        <FiEdit className="me-1" />
                        Edit
                      </button>

                      <button
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >
                        <FiTrash2 />
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="empty-requests">

            <FiPackage size={45} />

            <h5 className="mt-3">
              You haven't added any items
            </h5>

            <p className="text-muted">
              List something you are willing to lend.
            </p>

            <Link
              to="/add-item"
              className="btn btn-dark mt-2"
            >
              Add Your First Item
            </Link>

          </div>

        )}

      </div>

    </div>
  )
}

export default MyItems