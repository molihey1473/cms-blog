import { NextApiRequest, NextApiResponse } from "next";
export default async function clearPreview(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  // Next.js独自のヘッドレスCMS用プレビュー機能
  res.clearPreviewData();
  res.writeHead(307, { Location: "/" });
  res.end();
}
