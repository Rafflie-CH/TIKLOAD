export default async function handler(req, res) {
  try {
    const { url, filename } = req.query;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const fileRes = await fetch(url);
    if (!fileRes.ok) {
      return res.status(500).json({ error: "Failed to fetch file" });
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename || "download"}"`
    );
    res.setHeader("Content-Type", fileRes.headers.get("content-type"));

    fileRes.body.pipe(res);
  } catch (err) {
    res.status(500).json({ error: "Proxy error" });
  }
}
