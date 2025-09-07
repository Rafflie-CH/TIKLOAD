import { useState } from "react";
import Head from "next/head";
import "../public/style.css";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError("Gagal mengambil data. Pastikan link TikTok valid.");
    } finally {
      setLoading(false);
    }
  };

  const handleProxyDownload = (fileUrl, type, title) => {
    const fileName = `RAFZ-TIKLOAD-${title}.${type}`;
    const link = document.createElement("a");
    link.href = `/api/proxy?url=${encodeURIComponent(fileUrl)}&filename=${encodeURIComponent(fileName)}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      <Head>
        <title>RAFZ TikTok Downloader</title>
      </Head>

      <div className="container">
        <h1 className="title">RAFZ TikTok Downloader</h1>
        <p className="subtitle">Tanpa Watermark dan GRATIS!!</p>

        <div className="input-box">
          <input
            type="text"
            placeholder="Tempelkan link TikTok disini..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={handleDownload} disabled={loading}>
            {loading ? "Loading..." : "Cari"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className="result">
            <h2>{result.title}</h2>

            {result.type === "video" && (
              <>
                <video controls src={result.play} />
                <button
                  onClick={() =>
                    handleProxyDownload(result.play, "mp4", result.title)
                  }
                >
                  Unduh Video
                </button>
              </>
            )}

            {result.type === "photo" && (
              <>
                <img src={result.play} alt="TikTok Photo" />
                <button
                  onClick={() =>
                    handleProxyDownload(result.play, "jpg", result.title)
                  }
                >
                  Unduh Foto
                </button>
              </>
            )}

            <button
              onClick={() =>
                handleProxyDownload(result.music, "mp3", result.title)
              }
            >
              Unduh Audio
            </button>
          </div>
        )}

        <footer className="footer">
          <a
            href="https://www.tikwm.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="tikwm"
          >
            <img src="/tikwm-logo.png" alt="tikwm" className="logo" /> TIKWM (for API)
          </a>
          <a
            href="https://whatsapp.com/channel/0029Vb6dhS29RZAV6wpMYj3W"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp"
          >
            <img src="/whatsapp.png" alt="whatsapp" className="logo" /> Saluran WhatsApp
          </a>
        </footer>
      </div>
    </>
  );
}
