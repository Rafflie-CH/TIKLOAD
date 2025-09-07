const form = document.querySelector("form");
const input = document.querySelector("input");
const preview = document.getElementById("preview");
const buttons = document.getElementById("buttons");
const loading = document.getElementById("loading");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = input.value.trim();

  if (!url) {
    alert("Masukkan URL terlebih dahulu!");
    return;
  }

  preview.innerHTML = "";
  buttons.innerHTML = "";
  loading.style.display = "flex"; // tampilkan animasi loading

  try {
    const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    if (!data.success) throw new Error(data.message);

    // tampilkan preview
    if (data.type === "video") {
      preview.innerHTML = `
        <video controls class="rounded-xl w-full shadow">
          <source src="${data.video}" type="video/mp4">
          Browser anda tidak mendukung video.
        </video>
      `;
      buttons.innerHTML = `
        <button onclick="downloadFile('${data.video}', 'video.mp4')" class="download-btn">Unduh Video</button>
        <button onclick="downloadFile('${data.audio}', 'audio.mp3')" class="download-btn">Unduh Audio</button>
      `;
    } else if (data.type === "image") {
      preview.innerHTML = `
        <img src="${data.image}" alt="preview" class="rounded-xl w-full shadow">
      `;
      buttons.innerHTML = `
        <button onclick="downloadFile('${data.image}', 'photo.jpg')" class="download-btn">Unduh Foto</button>
      `;
    }
  } catch (err) {
    preview.innerHTML = `<p class="text-red-500">Error: ${err.message}</p>`;
  } finally {
    loading.style.display = "none"; // sembunyikan loading
  }
});

function downloadFile(fileUrl, filename) {
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(fileUrl)}`;
  const link = document.createElement("a");
  link.href = proxyUrl;
  link.download = filename || "download";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
