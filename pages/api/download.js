import { tiktokDl } from "../../lib/scrape";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ status: false, message: "URL tidak valid" });
  }

  const result = await tiktokDl(url);
  if (!result.status) {
    return res.status(404).json({ status: false, message: "Konten tidak ditemukan" });
  }

  return res.status(200).json(result);
}
