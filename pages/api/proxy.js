export default async function handler(req, res) {
  const { file, filename } = req.query;

  if (!file) {
    return res.status(400).send("File URL kosong");
  }

  try {
    const response = await fetch(file);

    if (!response.ok) {
      return res.status(500).send("Gagal fetch file");
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename || "download"}"`
    );
    res.setHeader("Content-Type", response.headers.get("content-type"));

    response.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error server proxy");
  }
}
