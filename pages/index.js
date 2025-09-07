// pages/index.js
import { useState, useEffect } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // supaya Next.js tidak error SSR
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (data.success) {
        setResult(data);
      } else {
        alert(data.message || "Gagal mengambil data.");
      }
    } catch (err) {
      alert("Terjadi kesalahan server.");
    } finally {
      setLoading(false);
    }
  };

  const handleProxyDownload = (fileUrl, type, title) => {
    if (typeof window === "undefined") return; // cegah error SSR

    const fileName = `RAFZ-TIKLOAD-${title}.${type}`;
    const link = document.createElement("a");
    link.href = `/api/proxy?url=${encodeURIComponent(fileUrl)}&filename=${encodeURIComponent(fileName)}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white p-6">
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          TIKLOAD BY RAFZ
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Tempel URL TikTok di sini..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
          >
            {loading ? "Loading..." : "Unduh"}
          </button>
        </div>

        {result && (
          <div className="mt-4 space-y-3">
            {result.cover && (
              <img
                src={result.cover}
                alt="Thumbnail"
                className="rounded-lg shadow-md mx-auto"
              />
            )}
            <p className="text-center font-semibold">{result.title}</p>

            {isClient && (
              <div className="flex flex-col gap-2">
                {result.play && (
                  <button
                    onClick={() =>
                      handleProxyDownload(result.play, "mp4", result.title)
                    }
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
                  >
                    Unduh Video
                  </button>
                )}

                {result.music && (
                  <button
                    onClick={() =>
                      handleProxyDownload(result.music, "mp3", result.title)
                    }
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold"
                  >
                    Unduh Audio
                  </button>
                )}

                {result.images &&
                  result.images.length > 0 &&
                  result.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        handleProxyDownload(img, "jpg", `${result.title}-${idx + 1}`)
                      }
                      className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-white font-semibold"
                    >
                      Unduh Foto {idx + 1}
                    </button>
                  ))}
              </div>
            )}
          </div>
        )}

        <footer className="mt-6 text-center text-sm text-gray-500">
          Thanks to{" "}
          <a
            href="https://www.tikwm.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-bold"
          >
            <img
              src="/tikwm-logo.png"
              alt="Tikwm"
              className="inline h-5 mx-1"
            />
          </a>
          | Join Saluran WhatsApp{" "}
          <a
            href="https://wa.me/xxxxxx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-600 font-bold"
          >
            <img src="/whatsapp.png" alt="WA" className="h-5 mr-1" />
            Klik di sini
          </a>
        </footer>
      </div>
    </div>
  );
}
