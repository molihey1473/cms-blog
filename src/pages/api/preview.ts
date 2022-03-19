import fetch from "node-fetch";

import { NextApiRequest, NextApiResponse } from "next";

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.slug) {
    return res.status(404).end();
  }
  const content = await fetch(
    `https://roy1473.microcms.io/api/v1/blog/${req.query.slug}?fields=id&draftKey=${req.query.draftKey}`,
    { headers: { "X-API-KEY": process.env.API_KEY || "" } }
  )
    .then((res) => res.json())
    .catch((error) => console.error(error));

  if (!content) {
    return res.status(401).json({ message: "Invalid slug" });
  }
  // Next.js独自のヘッドレスCMS用プレビュー機能
  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  });
  res.writeHead(307, { Location: `/blog/${content.id}` });
  res.end("Preview mode enabled");
}
