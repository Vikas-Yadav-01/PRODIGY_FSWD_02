import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../services/api"
import Navbar from "../components/Navbar"

const EditEmployeePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    department: "",
    designation: "",
    salary: ""
  })

  const [loading, setLoading] = useState(true)

  const fetchEmployee = async () => {
    try {
      const res = await api.get(`/employees/get-employee/${id}`, {
        withCredentials: true
      })

      const emp = res.data.employee

      setForm({
        userName: emp.userName || "",
        email: emp.email || "",
        phoneNumber: emp.phoneNumber || "",
        department: emp.department || "",
        designation: emp.designation || "",
        salary: emp.salary || ""
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployee()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await api.put(`/employees/update-employee/${id}`, form, {
      withCredentials: true
    })

    navigate("/employees")
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>

          <input
            name="userName"
            value={form.userName}
            onChange={handleChange}
            placeholder="Name"
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />

          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />

          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Department"
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />

          <input
            name="designation"
            value={form.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />

          <input
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="w-full mb-6 px-4 py-2 border rounded-md"
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Update Employee
          </button>
        </form>
      </div>
    </>
  )
}

export default EditEmployeePage