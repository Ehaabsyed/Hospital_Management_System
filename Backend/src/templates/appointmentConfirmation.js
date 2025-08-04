const appointmentPendingTemplate = ({ firstname, secondname, date, doctorName, department }) => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <h2 style="color: #333;">Appointment Submitted</h2>
        <p>Dear <strong>${firstname} ${secondname}</strong>,</p>
        <p>Your appointment for <strong>${date}</strong> with <strong>Dr. ${doctorName}</strong> in the <strong>${department}</strong> department has been submitted successfully.</p>
        <p>We will contact you shortly to update the status — whether it is accepted or not.</p>
        <p><strong>Current Status:</strong> Pending</p>
        <p>Further updates will be shared via email.</p>
        <p>Thank you,<br/>Hospital Management Team</p>
      </div>
    </div>
  `;

  const text = `Dear ${firstname} ${secondname},

Your appointment for ${date} with Dr. ${doctorName} in the ${department} department has been submitted successfully.

Current Status: Pending

We will contact you shortly to update whether your appointment is accepted or not. Please check your email for further updates.

Thank you,
Hospital Management Team
`;

  return { html, text };
};

export default appointmentPendingTemplate;
