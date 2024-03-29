import { v2 as cloudinary } from "cloudinary";
//configセットしているがなくてもURL生成できる。

const API_KEY = process.env.CL_API_KEY ?? "";
const API_SEC_KEY = process.env.CL_SECRET_KEY ?? "";
cloudinary.config({
  cloud_name: "dusfum3ze",
  api_key: API_KEY,
  api_secret: API_SEC_KEY,
});
//cloudinary textパラメータ用メソッド
export const clOverlay = async (title: string): Promise<string> => {
  const text = encodeURI(title);
  const option = {
    secure: true,
    sign_url: true,
    version: "1622464021",
    transformation: [
      {
        overlay: {
          font_family: "notosansjp-medium.otf",
          font_size: 85,
          font_weight: "bold",
          text: text,
        },
        color: "#000",
        crop: "fit",
        width: 1600,
      },
    ],
  };
  return cloudinary.url("ogp/blog-ogp_oika6p.png", option);
};
