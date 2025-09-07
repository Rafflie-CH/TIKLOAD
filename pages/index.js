import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [media, setMedia] = useState(null);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setError("");
    setMedia(null);
    try {
      const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (!data.success) {
        setError("Gagal mengambil video/foto!");
        return;
      }
      setMedia(data.result);
    } catch (err) {
      setError("Terjadi kesalahan server.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* HEADER */}
      <div className="bg-blue-600 text-white px-6 py-4 rounded-xl shadow mb-6 text-center">
        <h1 className="text-2xl font-bold">TiKLoad BY RAFZ</h1>
        <p className="text-sm">Tanpa Watermark dan FREE!!</p>
      </div>

      {/* INPUT */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="masukkan url tiktok"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 p-2 border rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
          >
            Download
          </button>
        </div>

        {/* PREVIEW */}
        <div className="border rounded-lg p-4 bg-gray-50">
          {!media && <p className="text-gray-400">preview video/foto</p>}

          {media && media.type === "video" && (
            <video
              controls
              src={media.video}
              className="w-full rounded-lg"
            ></video>
          )}

          {media && media.type === "image" && (
            <img
              src={media.image}
              alt="preview"
              className="w-full rounded-lg"
            />
          )}
        </div>

        {/* TOMBOL DOWNLOAD */}
        {media && (
          <div className="mt-4 flex flex-col gap-2">
            {media.type === "video" && (
              <a
                href={media.video}
                download
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Download Video
              </a>
            )}
            {media.type === "image" && (
              <a
                href={media.image}
                download
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Download Foto
              </a>
            )}
            {media.audio && (
              <a
                href={media.audio}
                download
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Download Audio
              </a>
            )}
          </div>
        )}

        {/* ERROR */}
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>

      {/* PRODUK LAIN */}
      <div className="mt-6 text-center">
        <p className="mb-2 font-semibold">Coba Produk kami yang lain</p>
        <div className="flex gap-4 justify-center text-blue-600 underline">
          <a href="#">GRAMLOAD</a>
          <a href="#">BOOKLOAD</a>
          <a href="#">THREADS DL</a>
          <a href="#">X DL</a>
        </div>
      </div>

      {/* WHATSAPP */}
      <div className="mt-6">
        <a
          href="https://whatsapp.com/channel/0029Vb6dhS29RZAV6wpMYj3W"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600"
        >
          <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5" />
          <span>Saluran WhatsApp kami</span>
        </a>
      </div>

      {/* THANKS TO */}
      <div className="mt-6 text-center">
        <p className="font-semibold">Thanks To:</p>
        <a
          href="https://www.tikwm.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 mt-2"
        >
          <img src="/tikwm.png" alt="TIKWM" className="w-6 h-6" />
          <span>TIKWM (for API)</span>
        </a>
      </div>

      {/* FOOTER */}
      <footer className="mt-6 text-gray-500">
        Made with ❤️ BY Rafz
      </footer>
    </div>
  );
}
