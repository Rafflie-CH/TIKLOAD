export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ success: false, message: "Missing URL" });
    }

    // Forward request ke TikWM (atau URL video asli)
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "*/*",
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ success: false, message: "Failed to fetch from source" });
    }

    // Ambil hasil sebagai buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Kirim balik ke client dengan header yang sesuai
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/octet-stream"
    );
    res.setHeader("Content-Disposition", "attachment; filename=download");

    res.send(buffer);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ success: false, message: "Server error (proxy failed)" });
  }
}
