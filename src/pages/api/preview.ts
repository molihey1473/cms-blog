import fetch from "node-fetch";

import { NextApiRequest, NextApiResponse } from "next";

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.slug;
  const draftKey = req.query.draftKey;
  if (!id) {
    return res.status(404).end();
  }

  const content = await fetch(
    `https://roy1473.microcms.io/api/v1/blog/${id}?draftKey=${draftKey}`,
    { headers: { "X-MICROCMS-API-KEY": process.env.API_KEY || "" } }
  )
    .then((res) => res.json())
    .catch((error) => console.error(error));

  if (!content) {
    return res.status(401).json({ message: "Invalid slug" });
  }
  // Next.js独自のヘッドレスCMS用プレビュー機能
  res.setPreviewData({
    id: id,
    draftKey: draftKey,
  });
  res.writeHead(307, { Location: `/articles/${id}` });
  res.end("Preview mode enabled");
}
