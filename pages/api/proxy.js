// pages/api/proxy.js
export default async function handler(req, res) {
  try {
    const { url, filename } = req.query;

    if (!url) {
      return res.status(400).send("URL tidak ada");
    }

    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Disposition", `attachment; filename="${filename || "file"}"`);
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");

    return res.send(Buffer.from(buffer));
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).send("Gagal proxy file");
  }
}
