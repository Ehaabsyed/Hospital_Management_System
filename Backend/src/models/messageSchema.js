import mongoose from "mongoose";
// create user model (firstName, lastName, email, phone, nic, dob, gender, password)
// validate the email
// passoword hashing (bcrypt)
// compare passowrd
// generate jwt 


const messageSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "First Name is required"],
            minLength: [3, "First Name contaians at least 3 characters"],
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
        message: {
            type: String,
            required: [true, "Message is required!"],
        },
        date:{
        type:Date,
        default:Date.now
    },
        
    },
);



export const messageModel = mongoose.model("Message", messageSchema); 