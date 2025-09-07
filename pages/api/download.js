// pages/api/download.js
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL tidak ditemukan" });
  }

  try {
    // Panggil API TikWM
    const apiRes = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `url=${encodeURIComponent(url)}`,
    });

    const data = await apiRes.json();

    if (data?.data?.play) {
      return res.status(200).json({ video: data.data.play });
    } else {
      return res.status(500).json({ error: "Gagal mengambil video" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
