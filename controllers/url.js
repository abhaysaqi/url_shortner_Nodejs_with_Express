import { nanoid } from 'nanoid';
import { URL } from "../models/url.js";

async function GenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = nanoid(8);

  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
  });

  return res.json({ id: shortId });
}

async function getAnalytics(req, res) {
  const shortId= req.params.shortId;
  const result= await URL.findOne({shortId})
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  })
}
export{
  GenerateNewShortUrl,
  getAnalytics,
};
