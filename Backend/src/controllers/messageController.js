import {messageModel} from "../models/messageSchema.js";


export const sendMessage = (req, res) => {
    // console.log("Message sent:", req.body);
    try {
        const {firstname,secondname, email,phone, message} = req.body.data;
        console.log("Message sent:", firstname, secondname, email, phone, message);
        const messageData = new messageModel({
            firstname,
            secondname,
            email,
            phone,
            message
        });
        messageData.save();
        res.json({status:true, message: "Message sent successfully", data: messageData });
    } catch (error) {
        console.error("Error sending message:", error);
        res.json({status:false, message: "Failed to send message" });
    }
    
}

export const getallMessages = async (req, res) => {
    console.log("sdsd");
    
    try {
        const messages = await messageModel.find({});
        res.json({ message: "Messages fetched successfully", data: messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Failed to fetch messages" });
    }
}
