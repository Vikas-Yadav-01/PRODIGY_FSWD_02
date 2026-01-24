import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">EMS</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">{user?.userName}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar