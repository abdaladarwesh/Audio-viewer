import ytdl from "@distube/ytdl-core";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    responseLimit: false, // important for streaming!
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url as string;

  if (!url || !ytdl.validateURL(url)) {
    res.status(400).json({ error: "Invalid or missing YouTube URL" });
    return;
  }

  res.setHeader("Content-Type", "audio/mpeg");

  const stream = ytdl(url, {
    filter: "audioonly",
    quality: "highestaudio",
    highWaterMark: 1 << 25,
    requestOptions: {
    headers: {
      cookie: process.env.YOUTUBE_COOKIE ?? "",
    },
  },
  });

  stream.pipe(res);
}
