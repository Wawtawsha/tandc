import { ImageResponse } from "next/og";

export const alt = "Town & Country Furniture | Farmville, VA";
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
          background: "linear-gradient(135deg, rgb(54, 47, 42) 0%, rgb(75, 65, 58) 100%)",
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
            Town & Country Furniture
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
            La-Z-Boy & Ashley Furniture | Farmville, VA
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "12px",
            background: "rgb(168, 132, 98)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
