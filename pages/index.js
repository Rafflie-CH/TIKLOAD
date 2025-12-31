import Head from 'next/head';
import { useState, useEffect } from "react";
import React from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [previewImg, setPreviewImg] = useState(null)

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownload = async () => {
    if (!url) {
      alert("Masukkan URL TikTok terlebih dahulu");
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (!data.success) {
        alert("Gagal mengambil data pastikan url sudah benar");
        return;
      }
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  const handleProxyDownload = (fileUrl, type, title) => {
    if (typeof window === "undefined") return;

    const safeTitle = title.replace(/[^\w\s-]/g, "").replace(/\s+/g, "_");
    const fileName = `RAFZ-TIKLOAD-${safeTitle}.${type}`;

    const link = document.createElement("a");
    link.href = `/api/proxy?url=${encodeURIComponent(fileUrl)}&filename=${encodeURIComponent(fileName)}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
<React.Fragment>
    <Head>
  <title>TiKLoad BY RAFZ (Rafflie aditya) - Tiktok Downloader Tanpa Watermark</title>
  <meta name="description" content="Download video TikTok tanpa watermark secara gratis dan cepat dengan TiKLoad BY RAFZ. 100% FREE! No password dan tanpa login ya ges yah dan tampa iklan lhoo!" />

    {/* Favicon */}
<link rel="icon" href="/favicon.ico" />
    
  {/* Open Graph Meta Tags */}
  <meta property="og:title" content="TiKLoad BY RAFZ - Tiktok Downloader" />
  <meta property="og:description" content="Download video TikTok tanpa watermark secara gratis dan cepat dengan TiKLoad BY RAFZ. 100% FREE! No password dan tanpa login ya ges yah dan tanpa iklan lhoo!" />
  <meta property="og:image" content="https://tikload.rafzhost.xyz/logo.png" />
  <meta property="og:url" content="https://tikload.rafzhost.xyz" />
  <meta property="og:type" content="website" />
</Head>
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-6">
      <div className="bg-white text-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-lg">
        {/* Header */}
        <h1 className="text-center text-lg font-bold text-white bg-blue-600 rounded-lg py-2 mb-4">
          TiKLoad BY RAFZ
          <span className="block text-xs font-normal">Tiktok Downloader Tanpa Watermark dan 100% FREE!! dan yang pastinya TANPA IKLAN</span>
        </h1>

        {/* Input + tombol */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="https://vt.tiktok.com/xxxxx"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
          >
            {loading ? "Loading..." : "Download"}
          </button>
        </div>

        {/* Hasil */}
        {result && (
          <div className="mt-4 space-y-3 text-center">
            {result.cover && (
              <img
                src={result.cover}
                alt="Thumbnail"
                className="rounded-lg shadow-md mx-auto"
              />
            )}
            <p className="font-semibold">{result.title}</p>

            {mounted && (
              <div className="flex flex-col gap-2">
                {result.play && (
                  <button
                    onClick={() => handleProxyDownload(result.play, "mp4", result.title)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
                  >
                    ⬇ Unduh Video
                  </button>
                )}

                {result.music && (
                  <button
                    onClick={() => handleProxyDownload(result.music, "mp3", result.title)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold"
                  >
                    🎵 Unduh Audio
                  </button>
                )}

                {result.images &&
  result.images.length > 0 &&
  result.images.map((img, idx) => (
    <div
      key={idx}
      className="flex items-center gap-3 bg-pink-600 rounded-lg p-2"
    >
      {/* thumbnail */}
      <img
        src={img}
        alt={`Foto ${idx + 1}`}
        className="w-14 h-14 object-cover rounded-md border border-white"
        loading="lazy"
      />

      {/* tombol lihat (HIJAU) */}
      <button
        onClick={() => setPreviewImg(img)}
        className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
      >
        👁 Lihat
      </button>

      {/* tombol download */}
      <button
        onClick={() =>
          handleProxyDownload(img, "jpg", `${result.title}-${idx + 1}`)
        }
        className="flex-1 px-3 py-2 bg-pink-700 hover:bg-pink-800 rounded-lg text-white font-semibold text-left"
      >
        🖼️ Unduh Foto {idx + 1}
      </button>
    </div>
  ))}

{previewImg && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    onClick={() => setPreviewImg(null)}
  >
    <div
      className="relative max-w-[95%] max-h-[95%]"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setPreviewImg(null)}
        className="absolute -top-4 -right-4 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 font-bold z-10"
      >
        ✕
      </button>

      <div className="overflow-auto max-h-[90vh]">
        <img
          src={previewImg}
          className="max-w-full rounded-lg"
          style={{ touchAction: "pinch-zoom" }}
        />
      </div>
    </div>
  </div>
)}
        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p className="mb-2">Coba produk kami yang lain:</p>
          <button
            onClick={() => alert("Masih dalam pengembangan!")}
            className="mx-1 text-blue-600 font-semibold"
          >
            GRAMLOAD
          </button>
          ·
          <button
            onClick={() => alert("Masih dalam pengembangan!")}
            className="mx-1 text-blue-600 font-semibold"
          >
            BOOKLOAD
          </button>
          ·
          <button
            onClick={() => alert("Masih dalam pengembangan!")}
            className="mx-1 text-blue-600 font-semibold"
          >
            THREADS DL
          </button>
          ·
          <button
            onClick={() => alert("Masih dalam pengembangan!")}
            className="mx-1 text-blue-600 font-semibold"
          >
            X DL
          </button>

          <div className="mt-3">
            <a
              href="https://whatsapp.com/channel/0029Vb6dhS29RZAV6wpMYj3W"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg"
            >
              <img src="/whatsapp.svg" alt="WhatsApp" className="w-5 h-5" />
              Saluran WhatsApp kami
            </a>
          </div>

          <div className="mt-4 flex justify-center items-center gap-2">
            <a
              href="https://www.tikwm.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 font-semibold"
            >
              <img src="/tikwm.png" alt="Tikwm" className="w-6 h-6" />
              TIKWM (for API)
            </a>
          </div>

          <p className="mt-2 text-xs">Made with ❤️ by Rafz (Rafflie Aditya)</p>
        </div>
      </div>
    </div>
                </React.Fragment>
                );
}
