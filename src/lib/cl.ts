import Cloudinary from "cloudinary";
// configセットしているがなくてもURL生成できる。
Cloudinary.v2.config({
  cloud_name: "dusfum3ze",
  api_key: process.env.CL_API_KEY,
  api_secret: process.env.SECRET_KEY,
});
//cloudinary textパラメータ用メソッド
export const clOverlay = async (title: string) => {
  const text = encodeURI(title);
  const option = {
    secure: true,
    sign_url: true,
    version: "1622464021",
    transformation: [
      {
        overlay: {
          font_family: "Sawarabi Gothic",
          font_size: 70,
          font_weight: "bold",
          text: text,
        },
        color: "#000",
        crop: "fit",
        width: 1600,
      },
    ],
  };
  return Cloudinary.v2.url("ogp/blog-ogp_oika6p.png", option);
};
