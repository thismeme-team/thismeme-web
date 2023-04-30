import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const logo = (
  <svg fill="none" height="37" viewBox="0 0 76 37" width="76" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21.2327 17.9243H9.28523C4.50879 17.9243 0.636719 14.0523 0.636719 9.27583C0.636719 4.49939 4.50879 0.627319 9.28523 0.627319L19.4582 0.627319C28.6616 0.627319 36.1224 8.08815 36.1224 17.2915V23.6495C36.1224 30.6313 30.4625 36.2913 23.4806 36.2913H9.19607C4.46887 36.2913 0.636719 32.4591 0.636719 27.7319C0.636719 23.0047 4.46887 19.1726 9.19607 19.1726H21.2327C21.5774 19.1726 21.8568 18.8932 21.8568 18.5485C21.8568 18.2038 21.5774 17.9243 21.2327 17.9243Z"
      fill="white"
    />
    <path
      d="M39.6875 17.9243V13.2691C39.6875 6.28725 45.3474 0.627319 52.3293 0.627319H58.509C67.7123 0.627319 75.1732 8.08814 75.1732 17.2915V18.4593V23.6495C75.1732 30.6313 69.5132 36.2913 62.5314 36.2913H52.3293C45.3474 36.2913 39.6875 30.6314 39.6875 23.6495V19.1726V17.9243Z"
      fill="white"
    />
  </svg>
);

export default function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // ?tag=<tag>
    const hasTag = searchParams.has("tag");
    const tag = hasTag ? searchParams.get("tag")?.slice(0, 100) : "My default title";

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={tag}
            src="https://jjmeme-bucket-2.s3.amazonaws.com/hashed_name_image/f006498e9ee4a434546f6534604a587f37a8080f302721b42eee1889d75fba04.jpg"
            style={{
              position: "absolute",
              width: "100%",
              objectFit: "cover",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              backgroundColor: "black",
              opacity: 0.5,
            }}
          ></span>
          <span
            style={{
              position: "absolute",
              top: 80,
              left: 60,
            }}
          >
            {logo}
          </span>
          <p
            style={{
              position: "relative",
              color: "white",
              fontSize: 88,
              fontWeight: 800,
            }}
          >
            {tag} 밈
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
