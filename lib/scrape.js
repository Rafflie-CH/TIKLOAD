import axios from "axios";

export async function tiktokDl(url) {
  try {
    const domain = "https://www.tikwm.com/api/";
    const { data } = await axios.post(domain, {}, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      params: { url, hd: 1 }
    });

    const res = data.data;
    if (!res) return { status: false };

    const result = {
      status: true,
      title: res.title,
      cover: "https://www.tikwm.com" + res.cover,
      duration: res.duration,
      data: [],
      audio: "https://www.tikwm.com" + res.music
    };

    if (res.duration === 0) {
      result.data = res.images.map((v) => ({ type: "photo", url: v }));
    } else {
      result.data = [
        { type: "nowatermark_hd", url: "https://www.tikwm.com" + res?.hdplay }
      ];
    }

    return result;
  } catch (e) {
    console.error(e);
    return { status: false };
  }
}
