import { userModel } from "../models/userSchema.js";
import { hashPass, comparePass } from "../utils/hashPass.js";
import { generateToken } from "../utils/cookie.js";
import sendMail from "../utils/sendMail.js";
import { patientRegistrationTemplate } from "../templates/PatientSignup.js";
import otpSchema from "../models/otpSchema.js";
import { generateOTP } from "../utils/generateOtp.js";
import { generateOtpEmailTemplate } from "../templates/sendOTP.js";
import cloudinary from "../config/cloudinary.js";
// Function to create a new user
export const createUser = async (req, res) => {

    try {
        const { firstname, secondname, email, password, phone, address, nic, gender, isVisited, dob } = req.body.data;
        // console.log(firstname, secondname, email, password, phone, address, nic, gender, isVisited, dob);

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }
        let hashedPassword = await hashPass(password)

        // console.log(firstname, secondname, email, password,phone,adress,nic,role,gender,isVisited,image,dob);
        const newUser = new userModel({
            firstname,
            secondname,
            email,
            password: hashedPassword,
            phone,
            address,
            nic,
            role: "Patient",
            gender,
            isVisited,
            dob
        });
        await newUser.save();
        console.log();

        const html = patientRegistrationTemplate({
            firstName: firstname,
            lastName: secondname,
            email,
            phone,
            dob,
            gender,
            patientId: newUser._id  // or any custom ID logic you use
        });

        await sendMail(
            email,
            "Welcome to Your SyedHospital",
            "Thank you for registering with us.",
            html
        );
        const token = generateToken(newUser._id);
        res.cookie("patientToken", token)
        res.json({status:true, message: "User created successfully", user: newUser });


    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
export const getallPatients = async (req, res) => {
    try {
        const patients = await userModel.find({ role: "Patient" });
        res.json({
            success: true,
            data: patients,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching patients",
            error: error.message,
        });
    }
}
//login function
export const userlogin = async (req, res) => {
    // console.log(req.body);

    try {
        const { email, password } = req.body.data;
        let existUser = await userModel.findOne({ email }).select("+password");

        if (!existUser) {
            return res.json({ status: false, message: "User not found" });
        }
        let isMatch = await comparePass(password, existUser.password)
        const userWithoutPassword = existUser.toObject();
        delete userWithoutPassword.password; // Remove password from the response

        if (!isMatch) {
            return res.json({ status: false, message: "Invalid credentials" });
        } else {
            const token = generateToken(existUser._id);
            if (userWithoutPassword.role === "Admin") {
                res.cookie("adminToken", token);
            } else {
                res.cookie("patientToken", token);
            }


            return res.json({ status: true, message: "Login successful", user: userWithoutPassword });
        }

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
// Function to create a new doctor
export const createDoctor = async (req, res) => {
    
    try {
        const {
            firstname, secondname, email, password, phone,
            address, nic, gender, department, dob, experience, qualification
        } = req.body;



        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const imageFile = req.files.image;

        const existDoctor = await userModel.findOne({ email, role: "Doctor" });

        if (existDoctor) {
            return res.json({ status: false, message: "Doctor already exists" });
        }

        const hashedPassword = await hashPass(password);

        const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {
            folder: 'doctors',
        });
        // console.log(result);
        
        const doctorData = new userModel({
            firstname,
            secondname,
            email,
            password: hashedPassword,
            phone,
            address,
            nic,
            role: "Doctor",
            gender,
            image: result.secure_url,
            experience,
            qualification,
            department,
            dob,
        });

        await doctorData.save();

        res.json({ status: true, message: "Doctor created successfully", doctor: doctorData });
    } catch (error) {
        console.error("Error creating doctor:", error);
        res.json({ message: "Internal server error" });
    }
};


//addAdmin function
export const addAdmin = async (req, res) => {
    try {
        console.log("Adding admin with data:", req.body);

        const { firstname, secondname, email, password, phone, address, nic, gender, dob } = req.body.data;
        console.log(firstname, secondname, email, password, phone, address, nic, gender, dob);


        const existingAdmin = await userModel.findOne({ email, role: "Admin" });
        if (existingAdmin) {
            return res.json({ message: "Admin already exists" });
        }
        console.log(password);

        const hashedPassword = await hashPass(password);
        console.log(hashedPassword);

        const adminData = new userModel({
            firstname,
            secondname,
            email,
            password: hashedPassword,
            phone,
            address,
            nic,
            role: "Admin",
            gender,
            dob
        });
        await adminData.save();
        console.log("d");

        res.json({ status: true, message: "Admin created successfully", admin: adminData });
    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getall = async (req, res) => {
    try {
        const admins = await userModel.find({ role: "Admin" });
        res.json({ message: "Messages fetched successfully", data: admins });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Failed to fetch messages" });
    }
}

//send otp forgotpass
export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body.data
        const otp = await generateOTP()

        const newOtp = new otpSchema({
            email,
            otp
        });
        await newOtp.save();
        //send MAIL
        const htmlContent = generateOtpEmailTemplate(otp);
        await sendMail(
            email,
            "Your OTP Code for SyedHospital",
            `Your OTP code is ${otp}`, // plain text fallback
            htmlContent
        );
        res.json({ status: true, message: `sent otp to ${email}`, email })


    } catch (error) {
        console.error("Error sending OTP", error);
        res.json({ status: false, message: "Failed to send OTP" });
    }
}

//reset the passsword
export const resetPass = async (req, res) => {
    try {

        const { otp, email } = req.body

        const otpModel = await otpSchema.findOne({ email })

        if (otpModel == undefined) {

            res.json({ time: false, message: "Resend otp" })
        }
        if (otp == otpModel.otp) {
            console.log("matched");

            res.json({ status: true, message: "Otp Matched" })
        } else {
            res.json({ status: false, message: "Otp Not matched" })
        }



    } catch (error) {

    }
}

//change password
export const changePass = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Password to hash:", password);

        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const newPassword = await hashPass(password);
        console.log("Old:", user.password, "New:", newPassword);

        user.password = newPassword;
        await user.save();
        await otpSchema.deleteOne({ email })
        res.json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        console.error("Password change error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

