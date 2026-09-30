import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUserAPI } from '../services/allAPI'

function Register() {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const result = await registerUserAPI(user)

      console.log(result.data)

      alert('Registration successful!')

      setUser({
        name: '',
        email: '',
        password: ''
      })

      navigate('/login')

    } catch (error) {

      console.log(error)

      alert('Registration failed')

    }

  }

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-6 col-lg-5">

          <div className="mb-4">

            <h2 className="fw-bold">
              Create an Account
            </h2>

            <p className="text-muted">
              Join Borrowly and start borrowing items.
            </p>

          </div>

          <div className="add-item-card">

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your name"
                  required
                />

              </div>

              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />

              </div>

              <div className="mb-4">

                <label className="form-label fw-semibold">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Create a password"
                  required
                />

              </div>

              <button
                type="submit"
                className="btn btn-dark w-100"
              >
                Create Account
              </button>

            </form>

            <p className="text-center text-muted mt-4 mb-0">

              Already have an account?{' '}

              <Link
                to="/login"
                className="text-dark fw-semibold"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Register