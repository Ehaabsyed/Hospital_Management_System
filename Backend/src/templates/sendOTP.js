export const generateOtpEmailTemplate = (otp) => {
  const year = new Date().getFullYear();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>OTP Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .container {
          max-width: 500px;
          background-color: #fff;
          margin: auto;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          text-align: center;
        }
        .otp {
          font-size: 32px;
          font-weight: bold;
          color: #1a73e8;
          margin: 20px 0;
          letter-spacing: 6px;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Email Verification</h2>
        <p>Use the following OTP to verify your email address:</p>
        <div class="otp">${otp}</div>
        <p>This OTP is valid for only 10 minutes. Do not share it with anyone.</p>
        <div class="footer">
          &copy; ${year} Hospital Management System. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
};
