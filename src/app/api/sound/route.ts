
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import ytdl from "@distube/ytdl-core";
// import { NextRequest } from "next/server";



// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const url = searchParams.get("url");

//   if (!url || !ytdl.validateURL(url)) {
//     console.log(url);
//     return new Response(JSON.stringify({ error: "Invalid or missing YouTube URL" }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   try {
//     const stream = ytdl(url, {
//       filter: "audioonly",
//       quality: "highestaudio",
//       highWaterMark: 1 << 25, // helps with stutter

//     });

//     return new Response(stream as any, {
//       headers: {
//         "Content-Type": "audio/mpeg",
//         "Transfer-Encoding": "chunked",
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ error: "Failed to stream audio" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
import ytdl from "@distube/ytdl-core";
import { NextRequest } from "next/server";
import { Readable } from "stream";

// Force Node.js runtime on Vercel (not Edge)
export const runtime = "nodejs";

// 🔑 Convert Node stream -> Web stream
function nodeToWeb(nodeStream: Readable) {
  return new ReadableStream({
    start(controller) {
      nodeStream.on("data", (chunk) => controller.enqueue(chunk));
      nodeStream.on("end", () => controller.close());
      nodeStream.on("error", (err) => controller.error(err));
    },
    cancel() {
      nodeStream.destroy(); // ✅ works now
    },
  });
}


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url || !ytdl.validateURL(url)) {
    return new Response(JSON.stringify({ error: "Invalid or missing YouTube URL" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const nodeStream = ytdl(url, {
      filter: "audioonly",
      quality: "highestaudio",
      highWaterMark: 1 << 25,
    });

    const webStream = nodeToWeb(nodeStream);

    return new Response(webStream, {
      headers: {
        "Content-Type": "audio/mpeg",
        // no Transfer-Encoding here, Vercel handles it
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to stream audio" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
