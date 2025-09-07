import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState(null);

  const handleDownload = () => {
    if (!url) return alert("Masukkan URL TikTok dulu!");
    // contoh pemanggilan API TikWM
    fetch(`/api/download?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.video) {
          setPreview(data.video);
          window.open(data.video, "_blank");
        } else {
          alert("Gagal mengambil video!");
        }
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-blue-600 text-white text-center py-4 px-6 rounded-2xl shadow-lg mb-6">
        <h1 className="text-2xl font-bold">TiKLoad BY RAFZ</h1>
        <p className="text-sm">Tanpa Watermark dan FREE!!</p>
      </div>

      {/* Card utama */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="masukkan url tiktok"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
          />
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-1 shadow transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
              />
            </svg>
            <span>Download</span>
          </button>
        </div>

        {/* Preview */}
        <div className="border border-gray-300 rounded-lg h-48 flex items-center justify-center text-gray-400">
          {preview ? (
            <video src={preview} controls className="h-full rounded-lg" />
          ) : (
            "preview video/foto"
          )}
        </div>

        {/* Produk lain */}
        <div className="text-center">
          <p className="font-medium">Coba Produk kami yang lain</p>
          <div className="flex flex-wrap justify-center gap-2 mt-2 text-blue-600">
            <a href="#" className="hover:underline">GRAMLOAD</a>
            <a href="#" className="hover:underline">BOOKLOAD</a>
            <a href="#" className="hover:underline">THREADS DL</a>
            <a href="#" className="hover:underline">X DL</a>
          </div>
        </div>

        {/* Saluran WhatsApp */}
        <div className="flex justify-center">
          <a
            href="https://whatsapp.com/channel/0029Vb6dhS29RZAV6wpMYj3W" // ganti dengan link saluran WA kamu
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-full shadow transition"
          >
            <img src="/whatsapp.png" alt="WhatsApp" className="h-5 w-5" />
            <span>Saluran WhatsApp kami</span>
          </a>
        </div>

        {/* Thanks To */}
        <div className="flex flex-col items-center space-y-2">
          <span className="font-medium">Thanks To:</span>
          <a
            href="https://www.tikwm.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <img
              src="/tikwm.png"
              alt="TIKWM Logo"
              className="h-6 w-6"
            />
            <span className="text-sm">TIKWM (for API)</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-sm text-gray-500">
        Made with A̶I ❤️ BY Rafz
      </p>
    </div>
  );
}
