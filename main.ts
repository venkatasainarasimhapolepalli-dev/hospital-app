import express, { Request, Response } from "express";
import cors from "cors";
import { client } from "./feature";
import { doctors } from "./data";

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- ROOT (Fix Cannot GET /) ---------------- */

app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Hospital Backend Running");
});

/* ---------------- GET: Doctors ---------------- */

app.get("/doctors", (req: Request, res: Response) => {
  const { city, department } = req.query;

  const filtered = doctors.filter(
    (d) => d.city === city && d.speciality === department
  );

  res.json(filtered);
});

/* ---------------- POST: Chat ---------------- */

app.post("/chat", async (req: Request, res: Response) => {
  const { message, whatsapp } = req.body;

  const doctorAvailable = await client.getBooleanValue(
    "doctor_available",
    false
  );

  const useAI = await client.getBooleanValue(
    "use_ai_fallback",
    false
  );

  /* Decision Logic */

  if (doctorAvailable) {
    return res.json({
      type: "doctor",
      reply: "Doctor will respond shortly 👨‍⚕️"
    });
  }

  if (useAI) {
    return res.json({
      type: "ai",
      reply: "🤖 AI Suggestion: Take rest and drink water."
    });
  }

  if (whatsapp) {
    return res.json({
      type: "system",
      reply: `We will contact you on WhatsApp: ${whatsapp}`
    });
  }

  res.json({
    type: "system",
    reply: "No doctors available."
  });
});

/* ---------------- START SERVER ---------------- */

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});