import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleDownload() {
    if (!url) return alert("Masukkan URL TikTok!");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!data.status) return alert("Konten tidak ditemukan!");
      setResult(data);
    } catch (e) {
      console.error(e);
      alert("Terjadi kesalahan!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>TikLoad BY RAFZ</title>
      </Head>

      <main className="flex flex-col items-center py-8 px-4">
        {/* Header */}
        <div className="bg-blue-700 text-white py-4 px-6 rounded-2xl shadow-md mb-6 text-center">
          <h1 className="text-2xl font-bold">TiKLoad BY RAFZ</h1>
          <p className="text-sm mt-1">Tanpa Watermark dan FREE!!</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg animate-fadeIn">
          {/* Input */}
          <div className="flex items-center border rounded-full overflow-hidden">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="masukkan url tiktok"
              className="flex-grow px-4 py-2 outline-none text-gray-700"
            />
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
            >
              {/* Ikon Download SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
              </svg>
              <span>Download</span>
            </button>
          </div>

          {/* Preview */}
          <div className="mt-4 flex justify-center items-center bg-gray-200 h-48 rounded-lg text-gray-600">
            {loading && "🔎 Sedang mencari..."}
            {!loading && !result && "preview video/foto"}
            {result && result.duration === 0 && (
              <img src={result.data[0].url} className="max-h-48 rounded-lg" />
            )}
            {result && result.duration !== 0 && (
              <video controls className="max-h-48 rounded-lg">
                <source src={result.data[0].url} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Tombol Unduh */}
          {result && (
            <div className="mt-4 space-y-3 text-center">
              <a
                href={result.data[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 w-full py-2 rounded-xl bg-blue-600 text-white font-semibold hover:scale-105 transition"
              >
                {/* Ikon Download */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                {result.duration === 0 ? "Unduh Foto" : "Unduh Video"}
              </a>
              <a
                href={result.audio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 w-full py-2 rounded-xl bg-blue-600 text-white font-semibold hover:scale-105 transition"
              >
                🎵 Unduh Audio
              </a>
            </div>
          )}

          {/* Produk lain */}
          <div className="mt-6 text-center">
            <p className="font-semibold">Coba Produk kami yang lain</p>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {["GRAMLOAD", "BOOKLOAD", "THREADS DL", "X DL"].map((p) => (
                <button
                  key={p}
                  onClick={() => alert("Masih dalam pengembangan!")}
                  className="underline text-blue-700"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* WhatsApp Channel */}
          <div className="mt-6 text-center">
            <a
              href="https://whatsapp.com/channel/0029Vb6dhS29RZAV6wpMYj3W"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-600 transition"
            >
              <img src="/whatsapp-logo.png" alt="WhatsApp" className="w-5 h-5" />
              <span>Saluran WhatsApp kami</span>
            </a>
          </div>

          {/* Thanks To */}
          <div className="text-center mt-6">
            <p className="font-semibold text-gray-700">Thanks To:</p>
            <a
              href="https://www.tikwm.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transform transition hover:scale-110 hover:shadow-lg"
            >
              <img src="/tikwm-logo.png" alt="TIKWM Logo" className="mx-auto w-16 h-16" />
            </a>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-600 mt-6 text-sm">
            Made with ❤️ BY Rafz
          </p>
        </div>
      </main>
    </>
  );
    }
