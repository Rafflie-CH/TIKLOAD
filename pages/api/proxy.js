export default async function handler(req, res) {
  try {
    const { file, filename } = req.query;
    if (!file) {
      return res.status(400).json({ success: false, message: "File URL missing" });
    }

    // Fetch file dengan header tambahan
    const response = await fetch(file, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36",
        Referer: "https://www.tikwm.com/",
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ success: false, message: "Gagal fetch file" });
    }

    const safeName = filename ? filename : "RAFZ-TIKLOAD-media";

    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/octet-stream"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${safeName}"`);

    // Pipe stream langsung ke response (lebih aman di Vercel)
    const reader = response.body.getReader();
    const encoder = new TextEncoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }

    res.end();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error (proxy failed)" });
  }
}
