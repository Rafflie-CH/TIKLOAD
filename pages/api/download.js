export default async function handler(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ success: false, message: "Missing TikTok URL" });
    }

    // Request ke API TikWM
    const apiRes = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({ url }),
    });

    const data = await apiRes.json();

    if (data.code !== 0) {
      return res.status(400).json({ success: false, message: "Gagal mengunduh video" });
    }

    res.status(200).json({
      success: true,
      data: {
        video: data.data.play, // url video
        music: data.data.music, // url audio
        cover: data.data.cover, // thumbnail
      },
    });
  } catch (error) {
    console.error("Download API error:", error);
    res.status(500).json({ success: false, message: "Server error (download)" });
  }
}
