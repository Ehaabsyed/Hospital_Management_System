import { userModel } from "../models/userSchema.js";

export const getallDoctors = async (req, res) => {
    try {
        const doctors = await userModel.find({role:"Doctor"});
        res.json({
            success: true,
            doctors: doctors,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching doctors",
            error: error.message,
        });
    }
}