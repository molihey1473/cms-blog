import fetch from "node-fetch";
import { NextApiRequest, NextApiResponse } from "next";
export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.slug) {
    res.status(404).end();
  }
  const content = await fetch(
    `https://roy1473.microcms.io/api/v1/blog/${req.query.slug}?fields=id&draftKey=${req.query.draftKey}`,
    { headers: { "X-API-KEY": process.env.API_KEY ?? "" } }
  )
    .then((res) => res.json())
    .catch((error) => null);
  if (!content) {
    return res.status(401).json({ message: "Invalid slug" });
  }
  res.setPreviewData({
    slug: content.id,
    drafyKey: req.query.drafyKey,
  });
  res.writeHead(307, { Location: `/${content.id}` });
  res.end("Preview mode enabled");
}
