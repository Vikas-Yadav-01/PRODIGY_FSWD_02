import Navbar from "../components/Navbar"
import { useAuth } from "../context/AuthContext"

const HomePage = () => {
  const { user } = useAuth()

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Role</h3>
            <p className="text-gray-600 mt-2">{user?.role}</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-gray-600 mt-2">{user?.email}</p>
          </div>

          {user?.role === "Admin" && (
            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Employee Management</h3>
              <a
                href="/employees"
                className="inline-block mt-4 text-blue-600 font-medium"
              >
                Go to Employees →
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage