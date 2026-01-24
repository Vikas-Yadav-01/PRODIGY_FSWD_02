import { Router } from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import isAdmin from "../middlewares/role.middleware.js"
import { createEmployee, deleteEmployee, fetchEmployeeById, fetchEmployees, updateEmployee } from "../controllers/employee.controller.js"

const router = Router()

router.route("/create-employee").post(verifyJWT, isAdmin, createEmployee)
router.route("/get-employee/:id").get(verifyJWT, isAdmin, fetchEmployeeById)
router.route("/fetch-employee").get(verifyJWT, isAdmin, fetchEmployees)
router.route("/update-employee/:id").put(verifyJWT, isAdmin, updateEmployee)
router.route("/delete-employee/:id").delete(verifyJWT, isAdmin, deleteEmployee)

export default router