const appointmentStatusUpdateTemplate = ({
  firstname,
  secondname,
  status,
  gender,
  doctorFirstName,
  doctorLastName,
  department,
  date,
}) => {
  const isAccepted = status === "Accepted";

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="color: ${isAccepted ? '#28a745' : '#dc3545'};">Appointment ${status}</h2>
        <p>Hello <strong>${firstname} ${secondname}</strong>,</p>
        <p>Your appointment has been <strong>${status}</strong>. Here are the details:</p>
        <ul>
          <li><strong>Gender:</strong> ${gender}</li>
          <li><strong>Doctor:</strong> Dr. ${doctorFirstName} ${doctorLastName}</li>
          <li><strong>Department:</strong> ${department}</li>
          <li><strong>Appointment Date:</strong> ${date}</li>
          <li><strong>Status:</strong> ${status}</li>
        </ul>
        ${
          isAccepted
            ? `<p><strong>Please arrive before 11:30 AM on ${date}</strong> to complete any required formalities.</p>`
            : `<p>Unfortunately, your appointment was not accepted. You may try booking a different date or contact support for assistance.</p>`
        }
        <p>Thank you,<br/>Hospital Management Team</p>
      </div>
    </div>
  `;

  const text = `Hello ${firstname} ${secondname},

Your appointment has been ${status}.

Gender: ${gender}
Doctor: Dr. ${doctorFirstName} ${doctorLastName}
Department: ${department}
Appointment Date: ${date}
Status: ${status}

${
  isAccepted
    ? `Please arrive before 11:30 AM on ${date}.`
    : `Unfortunately, your appointment was not accepted. You may try a different date or contact us for help.`
}

- Hospital Management Team
`;

  return { html, text };
};

export default appointmentStatusUpdateTemplate;
