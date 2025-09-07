import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

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
        alert("Gagal mengambil data");
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

  const downloadFile = (fileUrl, filename) => {
    const link = document.createElement("a");
    link.href = `/api/proxy?url=${encodeURIComponent(fileUrl)}&filename=${filename}`;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white">
      <div className="max-w-2xl w-full text-center">
        {/* Judul */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
          TikTok Downloader
        </h1>

        {/* Input */}
        <div className="flex bg-white rounded-2xl overflow-hidden shadow-md">
          <input
            type="text"
            placeholder="Tempel URL TikTok di sini..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-3 text-black outline-none"
          />
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 px-6 text-white font-semibold"
          >
            {loading ? "Loading..." : "Download"}
          </button>
        </div>

        {/* Hasil */}
        {result && (
          <div className="mt-8 bg-white text-black rounded-2xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">{result.title}</h2>

            {/* Jika video */}
            {result.play && (
              <div className="mb-4">
                <video
                  controls
                  src={result.play}
                  className="w-full rounded-xl"
                />
                <button
                  onClick={() => downloadFile(result.play, "video.mp4")}
                  className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium"
                >
                  ⬇ Download Video
                </button>
              </div>
            )}

            {/* Jika foto */}
            {result.images && result.images.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                {result.images.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img}
                      alt={`Image ${i}`}
                      className="rounded-xl shadow-md"
                    />
                    <button
                      onClick={() => downloadFile(img, `photo-${i + 1}.jpg`)}
                      className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md"
                    >
                      ⬇
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Jika audio */}
            {result.music && (
              <div>
                <audio controls src={result.music} className="w-full mb-2" />
                <button
                  onClick={() => downloadFile(result.music, "audio.mp3")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-medium"
                >
                  ⬇ Download Audio
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
