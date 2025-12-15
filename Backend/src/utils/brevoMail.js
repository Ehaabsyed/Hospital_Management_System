import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendMail = async (to, subject, html) => {
  try {
    await tranEmailApi.sendTransacEmail({
      sender: {
        email: "testehaabsyed@gmail.com", // must be VERIFIED in Brevo
        name: "Hospital Management System",
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    console.log("📧 Email sent via Brevo API");
  } catch (error) {
    console.error(
      "❌ Brevo API email failed:",
      error.response?.body || error.message
    );
  }
};

export default sendMail;
