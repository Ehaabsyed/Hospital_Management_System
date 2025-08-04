import { appointmentModel } from "../models/appointmentSchema.js";
import { messageModel } from "../models/messageSchema.js";
import { userModel } from "../models/userSchema.js";

export const sendInfo = async (req, res) => {
    try {
        const doctors = await userModel.find({role:"Doctor"})
        // console.log(doctors.length);
        const Patients = await userModel.find({role:"Patient"})
        // console.log(Patients.length);
        const appointments= await appointmentModel.find({})
        // console.log(appointments.length);
        const pending=await appointmentModel.find({status:"Pending"})
        const accepted=await appointmentModel.find({status:"Accepted"})
        const rejected=await appointmentModel.find({status:"Rejected"})
        // console.log(pending.length,accepted.length,rejected.length);
        

        const messages=await messageModel.find({})
        // console.log(messages.length);
        res.json({status:true,doctors:doctors.length,appointments:appointments.length,
        messages:messages.length,Patients:Patients.length,Accepted:accepted.length,Rejected:rejected.length,Pending:pending.length})
        
        

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching details",
            error: error.message,
        });
    }
}