export default async function handler(req, res) {
  try {
    const { file, filename } = req.query;
    if (!file) {
      return res.status(400).json({ success: false, message: "File URL missing" });
    }

    const response = await fetch(file);
    if (!response.ok) {
      return res.status(500).json({ success: false, message: "Gagal fetch file" });
    }

    const safeName = filename ? filename : "RAFZ-TIKLOAD-media";

    res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${safeName}"`);

    const buffer = Buffer.from(await response.arrayBuffer());
    res.send(buffer);

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
