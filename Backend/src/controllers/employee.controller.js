import { Employee } from "../models/employee.model.js"

const createEmployee = async (req, res) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const { phoneNumber, department, designation, salary } = req.body
        if (!phoneNumber || !department || !designation || !salary) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const employee = await Employee.create({
            userName: user.userName,
            email: user.email,
            phoneNumber,
            department,
            designation,
            salary
        })
        return res.status(201).json({ message: "Employee created", success: true, employee })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error })
    }
}

const fetchEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
        if (!employees) {
            return res.status(404).json({ message: "Employees not found" })
        }
        return res.status(200).json({ message: "Employees found", success: true, employees })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error })
    }
}

const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        return res.status(200).json({ message: "Employee updated", success: true, employee })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error })

    }
}

const deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id)
        return res.status(200).json({ success: true, message: "Employee deleted" })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error })
    }
}

export {
    createEmployee,
    fetchEmployees,
    updateEmployee,
    deleteEmployee
}