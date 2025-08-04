import mongoose from "mongoose";
// create user model (firstName, lastName, email, phone, nic, dob, gender, password)
// validate the email
// passoword hashing (bcrypt)
// compare passowrd
// generate jwt 


const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "First Name is required"],
            minLength: [2, "First Name contaians at least 2 characters"],
        },
        secondname: {
            type: String,
            required: [true, "Last Name is required"],
            minLength: [2, "Last Name contaians at least 3 characters"],
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
        nic: {
            type: String,
            required: [true, "nic is required"],
            minLength: [5, "Phone Number must contains exactly 5 digits"],
            maxLength: [5, "Phone Number must contains exactly 5 digits"],

        },
        address: {
            type: String,
            required: [true, "Address is required!"],
        },
        password: {
            type: String,
            required: true,
            minLength: [3, "Password must contain at least 3 characters"],
            select: false,
        },
        dob: {
            type: String,
            required: [true, "DOB Is Required!"],
        },
        gender: {
            type: String,
            required: [true, "Gender Is Required!"],
            enum: ["Male", "Female"],
        },
        role: {
            type: String,
            required: true,
            enum: ["Admin", "Patient", "Doctor"]
        },
        image: {
            type: String,
        },
        department: {
            type: String,
        },
        experience: {
            type: String, // in years
        },
        qualification: {
            type: String, // Example: ["MBBS", "MD"]
        },
    }
);



export const userModel = mongoose.model("User", userSchema); 