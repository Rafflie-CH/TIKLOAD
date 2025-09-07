export default async function handler(req, res) {
  try {
    const { file, filename } = req.query;
    if (!file) {
      return res.status(400).json({ success: false, message: "File URL missing" });
    }

    // Fetch dengan header tambahan
    const response = await fetch(file, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36",
        Referer: "https://www.tikwm.com/",
        Range: "bytes=0-",
      },
    });

    if (!response.ok || !response.body) {
      return res
        .status(response.status || 500)
        .json({ success: false, message: "Proxy gagal ambil file" });
    }

    const safeName = filename ? filename : "RAFZ-TIKLOAD-media";

    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/octet-stream"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${safeName}"`);

    // Pipe langsung ke response
    response.body.pipe(res);
  } catch (error) {
    console.error("Proxy Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error (proxy failed)" });
  }
}
