import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        },
        salary: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
)

export const User = mongoose.model("Employee", employeeSchema)