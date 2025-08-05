import { moderateContent } from "@/misc/moderateContent";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { title, content } = req.body;
  const apiKey = process.env.PURGO_RAPID_API_KEY;

  try {
    console.log(title, content);
    const cleanedData = await moderateContent(title, content, apiKey);
    res.status(200).json({ cleanedData });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
}
