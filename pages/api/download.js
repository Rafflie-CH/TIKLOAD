export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ success: false, error: "URL tidak ditemukan" });
  }

  try {
    const apiRes = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `url=${encodeURIComponent(url)}`,
    });

    const result = await apiRes.json();

    if (!result || !result.data) {
      return res.status(500).json({ success: false, error: "Gagal mengambil data" });
    }

    const data = result.data;
    let response = {
      success: true,
      result: {}
    };

    // Cek apakah konten foto atau video
    if (data.images && data.images.length > 0) {
      response.result.type = "image";
      response.result.image = data.images[0]; // ambil foto pertama
    } else {
      response.result.type = "video";
      response.result.video = data.play || data.hdplay || null;
    }

    // Audio (musik)
    if (data.music) {
      response.result.audio = data.music;
    }

    return res.status(200).json(response);
  } catch (err) {
    console.error("Download API Error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
}
