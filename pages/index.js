import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!url) return alert("Masukkan URL TikTok dulu!");
    setLoading(true);
    setMedia(null);

    try {
      const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (!data.success) {
        alert("Gagal mengambil video!");
      } else {
        setMedia(data.result);
      }
    } catch (err) {
      alert("Terjadi error server!");
    }
    setLoading(false);
  };

  const triggerDownload = (fileUrl, filename) => {
    const link = document.createElement("a");
    link.href = `/api/proxy?file=${encodeURIComponent(
      fileUrl
    )}&filename=${filename}`;
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 py-6">
      {/* HEADER */}
      <div className="bg-blue-600 text-white rounded-xl px-6 py-4 shadow-md text-center">
        <h1 className="text-2xl font-bold">TiKLoad BY RAFZ</h1>
        <p className="text-sm">Tanpa Watermark dan FREE!!</p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-6 w-full max-w-md text-center">
        <div className="flex">
          <input
            type="text"
            placeholder="masukkan url tiktok"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 border rounded-l-xl px-3 py-2 focus:outline-none"
          />
          <button
            onClick={handleDownload}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-xl hover:bg-blue-700"
          >
            {loading ? "..." : "Download"}
          </button>
        </div>

        {/* PREVIEW */}
        <div className="mt-4">
          {!media && (
            <div className="border rounded-lg h-40 flex items-center justify-center text-gray-400">
              preview video/foto
            </div>
          )}

          {media && (
            <div>
              {media.type === "video" && (
                <video
                  controls
                  src={media.video}
                  className="w-full rounded-lg"
                ></video>
              )}
              {media.type === "image" && (
                <img
                  src={media.image}
                  alt="preview"
                  className="w-full rounded-lg"
                />
              )}

              {/* TOMBOL DOWNLOAD */}
              <div className="mt-3 space-y-2">
                {media.type === "video" && (
                  <button
                    onClick={() =>
                      triggerDownload(media.video, "tiktok_video.mp4")
                    }
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Download Video
                  </button>
                )}

                {media.type === "image" && (
                  <button
                    onClick={() =>
                      triggerDownload(media.image, "tiktok_image.jpg")
                    }
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Download Foto
                  </button>
                )}

                {media.audio && (
                  <button
                    onClick={() =>
                      triggerDownload(media.audio, "tiktok_audio.mp3")
                    }
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    Download Audio
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* PRODUK LAIN */}
        <div className="mt-6">
          <p className="text-sm text-gray-600">Coba Produk kami yang lain</p>
          <div className="flex justify-center gap-3 mt-2 text-blue-600 font-medium">
            <a href="#">GRAMLOAD</a>
            <a href="#">BOOKLOAD</a>
            <a href="#">THREADS DL</a>
            <a href="#">X DL</a>
          </div>
        </div>

        {/* WHATSAPP */}
        <div className="mt-6">
          <a
            href="https://whatsapp.com/channel/xxxx" // ganti dengan link channel kamu
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600"
          >
            <img src="/whatsapp.png" alt="WA" className="w-5 h-5" />
            <span>Saluran WhatsApp kami</span>
          </a>
        </div>

        {/* THANKS */}
        <div className="mt-6 text-sm text-gray-600">
          <p>Thanks To:</p>
          <a
            href="https://www.tikwm.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-1"
          >
            <img src="/tikwm.png" alt="tikwm" className="w-6 h-6" />
            <span>TIKWM (for API)</span>
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-6 text-gray-600 text-sm">
        Made with ❤️ BY Rafz
      </footer>
    </div>
  );
}
