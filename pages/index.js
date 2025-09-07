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
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-700 via-blue-500 to-purple-600 py-6">
      {/* HEADER */}
      <header className="w-full max-w-2xl bg-blue-600 text-white rounded-2xl px-6 py-4 text-center shadow-lg animate-fade-in">
        <h1 className="text-3xl font-bold drop-shadow-lg">TiKLoad BY RAFZ</h1>
        <p className="text-sm">Tanpa Watermark dan FREE!!</p>
      </header>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-2xl shadow-blue-300/40 p-6 mt-6 w-full max-w-md text-center animate-slide-up">
        <div className="flex">
          <input
            type="text"
            placeholder="Tempelkan link TikTok..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 border rounded-l-xl px-3 py-2 focus:outline-none"
          />
          <button
            onClick={handleDownload}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-xl hover:bg-blue-700 active:scale-95 transition flex items-center justify-center shadow-md shadow-blue-400/50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Cari"
            )}
          </button>
        </div>

        {/* PREVIEW */}
        <div className="mt-4">
          {!media && !loading && (
            <div className="border rounded-lg h-40 flex items-center justify-center text-gray-400">
              preview video/foto
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center h-40">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {media && !loading && (
            <div>
              {media.type === "video" && (
                <video
                  controls
                  src={media.video}
                  className="w-full rounded-lg shadow-lg shadow-blue-400/40"
                ></video>
              )}
              {media.type === "image" && (
                <img
                  src={media.image}
                  alt="preview"
                  className="w-full rounded-lg shadow-lg shadow-blue-400/40"
                />
              )}

              {/* TOMBOL DOWNLOAD */}
              <div className="mt-3 space-y-2">
                {media.type === "video" && (
                  <button
                    onClick={() =>
                      triggerDownload(media.video, "tiktok_video.mp4")
                    }
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition shadow-md shadow-blue-400/50"
                  >
                    Download Video
                  </button>
                )}

                {media.type === "image" && (
                  <button
                    onClick={() =>
                      triggerDownload(media.image, "tiktok_image.jpg")
                    }
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition shadow-md shadow-blue-400/50"
                  >
                    Download Foto
                  </button>
                )}

                {media.audio && (
                  <button
                    onClick={() =>
                      triggerDownload(media.audio, "tiktok_audio.mp3")
                    }
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 active:scale-95 transition shadow-md shadow-green-400/50"
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
          <p className="text-sm text-gray-600">Coba produk kami yang lain</p>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {["GRAMLOAD", "BOOKLOAD", "THREADS DL", "X DL"].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Masih dalam pengembangan!");
                }}
                className="px-3 py-1 bg-gray-100 rounded-full text-blue-600 font-medium hover:bg-blue-100 active:scale-95 transition"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* WHATSAPP */}
        <div className="mt-6">
          <a
            href="https://whatsapp.com/channel/0029Vb6dhS29RZAV6wpMYj3W"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 active:scale-95 transition shadow-md shadow-green-400/50"
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
            className="flex items-center justify-center gap-2 mt-1 hover:underline"
          >
            <img src="/tikwm.png" alt="tikwm" className="w-6 h-6" />
            <span>TIKWM (for API)</span>
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-6 text-white text-sm drop-shadow animate-fade-in">
        Made with ❤️ BY Rafz
      </footer>
    </div>
  );
}
