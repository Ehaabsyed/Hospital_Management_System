import mongoose from "mongoose";



const appointmentSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "First Name is required"],
            minLength: [2, "First Name contaians at least 2 characters"],
        },
        secondname: {
            type: String,
            required: [true, "Last Name is required"],
            minLength: [3, "Last Name contaians at least 3 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required!"],
        },
        phone: {
            type: String,
            required: [true, "Phone is required"],
            minLength: [10, "Phone Number must contains exactly 10 digits"],
            maxLength: [10, "Phone Number must contains exactly 10 digits"],

        },
        date: {
            type: String,
            required: [true, "Date is required!"],
        },
        address: {
            type: String,
            required: [true, "Address is required!"],
        },

        dob: {
            type: String,
            required: [true, "DOB Is Required!"],
        },
        nic: {
            type: String,
            required: [true, "Nic Is Required!"],
             minLength: [5, "nic Number must contains exactly 5 digits"],
            maxLength: [5, "nic Number must contains exactly 5 digits"],
        },
        gender: {
            type: String,
            required: [true, "Gender Is Required!"],
            enum: ["Male", "Female"],
        },

        isVisited: {
            type: Boolean,
            default: false,
        },
        doctorFirstName: {
            type: String,
            required: [true, "Doctor's First Name is required!"],
        },
        doctorLastName: {
            type: String,
            required: [true, "Doctor's Last Name is required!"],
        },
        department: {
            type: String,
            required: [true, "Department is required!"],
        },
        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending",
        },
        dateCreated: {
            type: Date,
            default: Date.now
        },
    }
);



export const appointmentModel = mongoose.model("Appointment", appointmentSchema); 