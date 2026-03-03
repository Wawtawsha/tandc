import { ImageResponse } from "next/og";

export const alt = "About Town & Country Furniture";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(120deg, rgb(64, 55, 50) 0%, rgb(85, 73, 65) 100%)",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              margin: 0,
              fontFamily: "serif",
              lineHeight: 1.2,
            }}
          >
            About Town & Country Furniture
          </h1>
          <p
            style={{
              fontSize: "36px",
              color: "rgb(212, 198, 185)",
              textAlign: "center",
              margin: 0,
              fontFamily: "sans-serif",
            }}
          >
            Family-Owned Since Day One | Farmville, VA
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "12px",
            background: "rgb(158, 115, 75)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
