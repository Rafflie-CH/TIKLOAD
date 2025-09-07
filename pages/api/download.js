export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const apiRes = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await apiRes.json();
    if (!data || data.code !== 0) {
      return res.status(400).json({ error: "Failed to fetch TikTok data" });
    }

    const result = {
      title: data.data.title || "video",
      type: data.data.images ? "photo" : "video",
      play: data.data.play || (data.data.images ? data.data.images[0] : null),
      music: data.data.music,
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
