import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import api from "../services/api"

const CreateEmployeePage = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    department: "",
    designation: "",
    salary: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      await api.post(
        "/employees/create-employee",
        form,
        { withCredentials: true }
      )

      navigate("/employees")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create employee")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Employee
          </h2>

          {["userName", "email", "phoneNumber", "department", "designation", "salary"].map(field => (
            <input
              key={field}
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              value={form[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
            />
          ))}

          {error && (
            <p className="text-red-500 text-sm text-center mb-3">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Employee"}
          </button>
        </form>
      </div>
    </>
  )
}

export default CreateEmployeePage