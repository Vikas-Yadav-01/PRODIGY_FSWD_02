import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees/fetch-employee", {
        withCredentials: true
      })
      setEmployees(res.data.employees)
    } catch (error) {
      console.error("Failed to fetch employees", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    )
    if (!confirmDelete) return

    try {
      await api.delete(`/employees/delete-employee/${id}`, {
        withCredentials: true
      })

      setEmployees(prev =>
        prev.filter(emp => emp._id !== id)
      )
    } catch (error) {
      alert("Failed to delete employee")
    }
  }

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Employees</h2>

          <button
            onClick={() => navigate("/employees/create")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            + Add Employee
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <p className="p-6 text-center">Loading employees...</p>
          ) : employees.length === 0 ? (
            <p className="p-6 text-center">No employees found</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-left">Salary</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {employees.map(emp => (
                  <tr key={emp._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{emp.userName}</td>
                    <td className="p-3">{emp.email}</td>
                    <td className="p-3">{emp.department}</td>
                    <td className="p-3">₹{emp.salary}</td>

                    <td className="p-3 flex gap-4">
                      <button
                        onClick={() =>
                          navigate(`/employees/edit/${emp._id}`)
                        }
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(emp._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}

export default EmployeesPage