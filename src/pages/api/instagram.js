export default function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.INSTAGRAM_RAPID_API_KEY;

  try {
    //
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
