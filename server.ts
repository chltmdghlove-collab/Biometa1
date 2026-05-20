import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing middleware
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Mock Admin API for data updates (in-memory for demo, but structured for expansion)
  let siteData = {
    news: [],
    members: [],
    research: []
  };

  app.get("/api/data", (req, res) => {
    res.json(siteData);
  });

  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "biometa2024") {
      res.json({ success: true, token: "mock-jwt-token" });
    } else {
      res.status(401).json({ success: false, message: "로그인 실패" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;
    const recipient = "chltmdghlove@gmail.com";

    console.log(`[Contact Form] Received message from ${name} (${email}): ${subject}`);

    try {
      if (process.env.RESEND_API_KEY) {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: "onboarding@resend.dev", // Note: The user will need to configure their domain in Resend for real production use
          to: recipient,
          subject: `[Biometa Lab Inquiry] ${subject || "No Subject"}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });
        
        res.json({ success: true, isMock: false, message: "문의가 성공적으로 실제 이메일로 전송되었습니다." });
      } else {
        // Fallback for when API keys are not set yet
        console.warn("RESEND_API_KEY is not set. Email not sent, but received the inquiry.");
        res.json({ 
          success: true, 
          isMock: true,
          message: "RESEND_API_KEY 환경변수가 설정되어 있지 않습니다. 모의 데이터로 시뮬레이션 전송되었습니다.",
          preview: { name, email, subject, message, recipient }
        });
      }
    } catch (error: any) {
      console.error("Failed to send email:", error);
      res.status(500).json({ success: false, message: `이메일 전송 중 오류 발생: ${error.message || error}` });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
