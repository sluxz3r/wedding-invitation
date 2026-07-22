import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { couple, weddingDateDisplay } from "@/app/data/content";

export const alt = `${couple.partnerOneFull} & ${couple.partnerTwoFull}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  let photoSrc: string | null = null;
  try {
    const data = await readFile(join(process.cwd(), "public/images/welcome.png"));
    photoSrc = `data:image/png;base64,${data.toString("base64")}`;
  } catch {
    photoSrc = null;
  }

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0a0908" }}>
        <div style={{ display: "flex", width: "44%", height: "100%" }}>
          {photoSrc ? (
            <img
              src={photoSrc}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                background: "#17130f",
              }}
            >
              <span style={{ fontSize: 140, color: "rgba(239,219,160,0.18)", fontWeight: 700 }}>
                {couple.partnerOne[0]}
                {couple.partnerTwo[0]}
              </span>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "56%",
            height: "100%",
            padding: "0 64px",
          }}
        >
          <span
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#c9a227",
            }}
          >
            The Wedding Of
          </span>
          <span style={{ marginTop: 22, fontSize: 46, fontWeight: 700, color: "#f7f5f1" }}>
            {couple.partnerOneFull}
          </span>
          <span
            style={{
              margin: "6px 0",
              fontSize: 32,
              fontStyle: "italic",
              fontWeight: 700,
              color: "#efdba0",
            }}
          >
            &amp;
          </span>
          <span style={{ fontSize: 32, fontWeight: 700, color: "#f7f5f1" }}>
            {couple.partnerTwoFull}
          </span>
          <span
            style={{
              marginTop: 28,
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#a8a29b",
            }}
          >
            {weddingDateDisplay}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
