import { Resend } from "resend";

export const handler = async (event: any, context: any) => {
  // CORS & Preflight handling
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, message: "Method Not Allowed" }),
    };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body || "{}");
    const recipient = "chltmdghlove@gmail.com";

    // Access the API key registered in Netlify's dashboard
    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const resend = new Resend(apiKey);
      
      await resend.emails.send({
        from: "onboarding@resend.dev", // Note: The domain to send from
        to: recipient,
        subject: `[Biometa Lab Inquiry] ${subject || "No Subject"}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });

      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          success: true,
          isMock: false,
          message: "문의가 성공적으로 실제 이메일로 전송되었습니다."
        }),
      };
    } else {
      console.warn("RESEND_API_KEY is not defined in Netlify.");
      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          success: true,
          isMock: true,
          message: "RESEND_API_KEY 환경변수가 설정되어 있지 않습니다. 모의 데이터로 시뮬레이션 전송되었습니다.",
          preview: { name, email, subject, message, recipient }
        }),
      };
    }
  } catch (error: any) {
    console.error("Netlify serverless function error:", error);
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        message: `이메일 전송 중 오류 발생: ${error.message || error}`
      }),
    };
  }
};
