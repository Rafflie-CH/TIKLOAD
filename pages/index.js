import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState(null);
  const [error, setError] = useState("");

  const fetchDownload = async () => {
    if (!url) return;
    setLoading(true);
    setError("");
    setMedia(null);

    try {
      const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (!data.success) {
        setError("Gagal mengambil data, coba periksa URL TikTok.");
      } else {
        setMedia(data.result);
      }
    } catch (err) {
      setError("Terjadi kesalahan server.");
    } finally {
      setLoading(false);
    }
  };

  const triggerDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.click();
  };

  return (
    <>
      <Head>
        <title>TikTok Downloader</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center p-6 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
          TikTok Downloader
        </h1>

        {/* Input */}
        <div className="flex w-full max-w-lg bg-white rounded-xl overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Tempelkan link TikTok di sini..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 p-3 text-black outline-none"
          />
          <button
            onClick={fetchDownload}
            className="bg-blue-600 px-4 py-2 hover:bg-blue-700"
          >
            Cari
          </button>
        </div>

        {/* Loading / Error */}
        {loading && <p className="mt-4 animate-pulse">Memproses link...</p>}
        {error && <p className="mt-4 text-red-300">{error}</p>}

        {/* Hasil */}
        {media && (
          <div className="mt-8 w-full max-w-lg bg-white text-black rounded-xl shadow-xl p-4">
            <h2 className="text-lg font-semibold mb-3">Preview:</h2>

            {media.type === "video" && media.video && (
              <video
                src={media.video}
                controls
                className="w-full rounded-lg mb-3"
              />
            )}

            {media.type === "image" && media.image && (
              <img
                src={media.image}
                alt="TikTok"
                className="w-full rounded-lg mb-3"
              />
            )}

            {/* Tombol Download */}
            <div className="flex flex-col gap-3">
              {media.type === "video" && media.video && (
                <button
                  onClick={() =>
                    triggerDownload(
                      `/api/proxy?file=${encodeURIComponent(
                        media.video
                      )}&filename=tiktok_video.mp4`
                    )
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Download Video
                </button>
              )}

              {media.type === "image" && media.image && (
                <button
                  onClick={() =>
                    triggerDownload(
                      `/api/proxy?file=${encodeURIComponent(
                        media.image
                      )}&filename=tiktok_photo.jpg`
                    )
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Download Foto
                </button>
              )}

              {media.audio && (
                <button
                  onClick={() =>
                    triggerDownload(
                      `/api/proxy?file=${encodeURIComponent(
                        media.audio
                      )}&filename=tiktok_audio.mp3`
                    )
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Download Audio
                </button>
              )}
            </div>
          </div>
        )}

        {/* Bagian Bawah */}
        <div className="mt-12 text-center space-y-4">
          <p
            className="cursor-pointer hover:underline"
            onClick={() => alert("Masih dalam pengembangan!")}
          >
            Coba produk kami yang lain
          </p>

          <a
            href="https://whatsapp.com/channel/0029Vb6dhS29RZAV6wpMYj3W"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 hover:underline"
          >
            <img
              src="/whatsapp.png"
              alt="WhatsApp"
              className="w-5 h-5 inline-block"
            />
            <span>Saluran WhatsApp Kami</span>
          </a>

          <a
            href="https://www.tikwm.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-2 hover:underline"
          >
            <img src="/tikwm.png" alt="Tikwm" className="w-5 h-5 inline-block" />
            <span>TIKWM (for API)</span>
          </a>
        </div>
      </div>
    </>
  );
}
