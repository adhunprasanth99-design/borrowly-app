import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserByEmailAPI } from '../services/allAPI'

function Login() {

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const result = await getUserByEmailAPI(loginData.email)

      const users = result.data

      if (users.length === 0) {

        alert('User not found')
        return

      }

      const user = users[0]

      if (user.password !== loginData.password) {

        alert('Incorrect password')
        return

      }

      localStorage.setItem(
        'borrowlyUser',
        JSON.stringify(user)
      )

      alert('Login successful!')

      window.location.href = '/'

    } catch (error) {

      console.log(error)

      alert('Something went wrong')

    }

  }

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-6 col-lg-5">

          <div className="mb-4">

            <h2 className="fw-bold">
              Welcome Back
            </h2>

            <p className="text-muted">
              Login to continue using Borrowly.
            </p>

          </div>

          <div className="add-item-card">

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={loginData.email}
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
                  value={loginData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your password"
                  required
                />

              </div>

              <button
                type="submit"
                className="btn btn-dark w-100"
              >
                Login
              </button>

            </form>

            <p className="text-center text-muted mt-4 mb-0">

              Don't have an account?{' '}

              <Link
                to="/register"
                className="text-dark fw-semibold"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login