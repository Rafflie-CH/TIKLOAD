import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState(null);

  const handleDownload = async () => {
    if (!url) return alert("Masukkan URL TikTok dulu!");

    setLoading(true);
    setMedia(null);

    try {
      const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (data.success) {
        setMedia(data);
      } else {
        alert("Gagal mengambil media!");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan!");
    }

    setLoading(false);
  };

  const triggerDownload = (fileUrl, filename, ext) => {
    const link = document.createElement("a");
    link.href = `/api/proxy?file=${encodeURIComponent(
      fileUrl
    )}&filename=${encodeURIComponent(filename + ext)}`;
    link.click();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1a73e8, #6f42c1)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "20px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#1a73e8", marginBottom: "10px" }}>
          TiKLoad BY RAFZ
        </h1>
        <p style={{ marginBottom: "20px", fontSize: "14px", color: "#555" }}>
          Tanpa Watermark dan FREE!!
        </p>

        <div style={{ display: "flex", marginBottom: "20px" }}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Tempelkan link TikTok di sini..."
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px 0 0 8px",
              outline: "none",
            }}
          />
          <button
            onClick={handleDownload}
            disabled={loading}
            style={{
              padding: "10px 16px",
              background: "#1a73e8",
              color: "white",
              border: "none",
              borderRadius: "0 8px 8px 0",
              cursor: "pointer",
            }}
          >
            {loading ? "Loading..." : "Download"}
          </button>
        </div>

        {media && (
          <div>
            {media.type === "video" && (
              <div>
                <video
                  src={media.video}
                  controls
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    marginBottom: "12px",
                  }}
                />
                <button
                  onClick={() =>
                    triggerDownload(media.video, `RAFZ-TIKLOAD-${media.title}`, ".mp4")
                  }
                  style={btnStyle}
                >
                  Download Video
                </button>
                <button
                  onClick={() =>
                    triggerDownload(media.music, `RAFZ-TIKLOAD-${media.title}`, ".mp3")
                  }
                  style={btnStyle}
                >
                  Download Audio
                </button>
              </div>
            )}

            {media.type === "image" && (
              <div>
                {media.images.map((img, idx) => (
                  <div key={idx}>
                    <img
                      src={img}
                      alt="TikTok Image"
                      style={{
                        width: "100%",
                        borderRadius: "12px",
                        marginBottom: "12px",
                      }}
                    />
                    <button
                      onClick={() =>
                        triggerDownload(img, `RAFZ-TIKLOAD-${media.title}-${idx+1}`, ".jpg")
                      }
                      style={btnStyle}
                    >
                      Download Foto {idx + 1}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: "24px", fontSize: "14px" }}>
          <p>Coba Produk kami yang lain</p>
          <p>
            <a href="https://wa.me/yourchannel" target="_blank" rel="noreferrer">
              📢 Saluran WhatsApp Kami
            </a>
          </p>
          <p>
            <a href="https://www.tikwm.com/" target="_blank" rel="noreferrer">
              <img
                src="/tikwm.png"
                alt="TIKWM"
                style={{ width: "24px", verticalAlign: "middle", marginRight: "6px" }}
              />
              TIKWM (for API)
            </a>
          </p>
        </div>

        <p style={{ marginTop: "16px", fontSize: "12px", color: "#777" }}>
          Made with ❤️ BY Rafz
        </p>
      </div>
    </div>
  );
}

const btnStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  margin: "6px 0",
  background: "#1a73e8",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
