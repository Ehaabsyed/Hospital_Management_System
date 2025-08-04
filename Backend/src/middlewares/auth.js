import jwt from 'jsonwebtoken';
import { userModel } from '../models/userSchema.js';

export const isAdminauthenticated =async(req, res, next) => {
    
    const token = req.cookies.adminToken;
    
    if (!token) {
        return res.json({status:false, message: "Unauthorized, no token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user= await userModel.findById(decoded.id);
        if (user.role !== "Admin") {
            return res.json({status:false, message: "Forbidden, not an admin" });
        }
        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.json({status:false, message: "Unauthorized, invalid token" });
    }
}

export const isPatientauthenticated =async(req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
        return res.json({status:false, message: "Unauthorized, no token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user= await userModel.findById(decoded.id);
        if (user.role !== "Patient") {
            return res.status(403).json({ message: "Forbidden, not an Patient" });
        }
        req.user = user; // Attach user to request object
        next(); 
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ message: "Unauthorized, invalid token" });
    }
}