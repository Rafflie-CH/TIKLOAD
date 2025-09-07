// pages/api/download.js
export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ success: false, message: "URL tidak boleh kosong" });
    }

    // API TikWM (gratis, no watermark)
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!data || !data.data) {
      return res.status(500).json({ success: false, message: "API tidak mengembalikan data" });
    }

    const result = {
      success: true,
      title: data.data.title || "Video",
      cover: data.data.cover || null,
      play: data.data.play || null,
      music: data.data.music || null,
      images: data.data.images || [],
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error("Download API error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
