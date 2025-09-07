export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL tidak ditemukan" });
  }

  try {
    const apiRes = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `url=${encodeURIComponent(url)}`,
    });

    const data = await apiRes.json();

    if (data?.data) {
      return res.status(200).json({
        video: data.data.play || null,
        audio: data.data.music || null,
        images: data.data.images || [],
      });
    } else {
      return res.status(500).json({ error: "Gagal mengambil data" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
