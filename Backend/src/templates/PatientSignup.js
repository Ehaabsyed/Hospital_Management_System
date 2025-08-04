// /src/templates/patientRegistrationTemplate.js

export const patientRegistrationTemplate = ({
  firstName,
  lastName,
  email,
  phone,
  dob,
  gender,
    patientId
}) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333;
      background-color: #f8f9fa;
      padding: 20px;
    }
    .email-container {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      color: #2b6777;
    }
    .content {
      margin-top: 20px;
      font-size: 16px;
      line-height: 1.6;
    }
    .footer {
      margin-top: 30px;
      font-size: 14px;
      text-align: center;
      color: #6c757d;
    }
    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 20px;
      background-color: #2b6777;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h2 class="header">🩺 Welcome to Your Hospital</h2>
    <div class="content">
      <p>Dear <strong>${firstName} ${lastName}</strong>,</p>

      <p>We’re thrilled to confirm your registration as a patient at <strong>Your Hospital</strong>.</p>

      <p><strong>Registration details:</strong></p>
      <ul>
        <li><strong>PatientID:</strong> ${patientId}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>DOB:</strong> ${dob}</li>
        <li><strong>Gender:</strong> ${gender}</li>
      </ul>

      <p>Login to your patient portal for appointments and records.</p>

      <a href="https://your-hospital.com/login" class="button">Go to Patient Portal</a>
    </div>

    <div class="footer">
      &copy; 2025 Your Hospital · All rights reserved<br />
      Syed Hospital Neerodi Road, Shiroor, India
    </div>
  </div>
</body>
</html>
`;
