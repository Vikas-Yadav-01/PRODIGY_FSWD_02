import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import EmployeesPage from "./pages/EmployeesPage"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"
import { AuthProvider } from "./context/AuthContext"
import CreateEmployeePage from "./pages/CreateEmployeePage"
import EditEmployeePage from "./pages/EditEmployee"

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/employees" element={
            <ProtectedRoute>
              <AdminRoute>
                <EmployeesPage />
              </AdminRoute>
            </ProtectedRoute>
          } />
          <Route
            path="/employees/create" element={
              <ProtectedRoute>
                <AdminRoute>
                  <CreateEmployeePage />
                </AdminRoute>
              </ProtectedRoute>
            } />
          <Route
            path="/employees/edit/:id" element={
              <ProtectedRoute>
                <AdminRoute>
                  <EditEmployeePage />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App