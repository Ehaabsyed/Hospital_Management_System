import { appointmentModel } from "../models/appointmentSchema.js";
import appointmentPendingTemplate from "../templates/appointmentConfirmation.js";
import appointmentConfirmationTemplate from "../templates/appointmentConfirmation.js";
import appointmentStatusUpdateTemplate from "../templates/appointmentStatus.js";
import sendMail from "../utils/sendMail.js";

export const sendAppointment = async (req, res) => {

  try {
    // console.log("Appointment sent:", req.body);

    const { firstname, secondname, email, phone, nic, address, gender, dob, date, doctor, department, isVisited } = req.body.data;

    const [doctorFirstName, doctorLastName] = doctor.split(" ")

    const appointmentData = new appointmentModel({
      firstname,
      secondname,
      email,
      phone,
      address,
      gender,
      dob,
      nic,
      date,
      doctorFirstName,
      doctorLastName,
      department,
      isVisited

    });
    await appointmentData.save();
    const doctorName = `${doctorFirstName} ${doctorLastName}`;
    const { html, text } = appointmentPendingTemplate({
      firstname,
      secondname,
      date,
      doctorName,
      department,
    });
    await sendMail(email, "Your Appointment is Submitted", text, html);


    res.json({ status: true, message: "Appointment sent successfully", data: appointmentData });
  } catch (error) {
    console.error("Error sending appointment:", error);
    res.json({ status: false, message: "Failed to send appointment" });
  }
}
// get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    // console.log(appointments);

    res.json({ message: "Appointments fetched successfully", appointments: appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
}
//update appointment status
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await appointmentModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.json({ status: false, message: "Appointment not found" });
    }

    const { html, text } = appointmentStatusUpdateTemplate({
      firstname: appointment.firstname,
      secondname: appointment.secondname,
      status: appointment.status, // Now updated
      gender: appointment.gender,
      doctorFirstName: appointment.doctorFirstName,
      doctorLastName: appointment.doctorLastName,
      department: appointment.department,
      date: appointment.date,
    });

    await sendMail(appointment.email, `Appointment ${status}`, text, html);

    res.json({
      status: true,
      message: "Appointment status updated successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("❌ Error updating status:", error);
    res.json({
      status: false,
      message: "Failed to update appointment status",
    });
  }
};


// delete appointment
export const deleteAppointment = async (req, res) => {
  console.log(req.params);

  try {
    const id = req.params.id;

    const appointment = await appointmentModel.findByIdAndDelete(id);
    if (!appointment) {
      return res.json({ status: false, message: "Appointment not found" });
    }
    res.json({ status: true, message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete appointment" });
  }
}