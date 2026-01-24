import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    )
  }

  if (user?.role !== "Admin") {
    return <Navigate to="/" />
  }

  return children
}

export default AdminRoute