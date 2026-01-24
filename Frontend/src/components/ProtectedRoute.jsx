import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../services/api"

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/users/fetch-user", {
          withCredentials: true
        })
        setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/" replace />
}

export default ProtectedRoute