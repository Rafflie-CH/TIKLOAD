export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ success: false, message: "URL missing" });
  }

  try {
    const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (!data || !data.data) {
      return res.status(500).json({ success: false, message: "Invalid API response" });
    }

    const result = data.data;

    if (result.images) {
      return res.json({
        success: true,
        type: "image",
        title: result.title || "tiktok",
        images: result.images,
      });
    } else {
      return res.json({
        success: true,
        type: "video",
        title: result.title || "tiktok",
        video: result.play || result.wmplay,
        music: result.music,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
 
