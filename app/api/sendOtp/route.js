import { NextResponse } from "next/server";
import https from "https";

export async function POST(req) {
  try {
    const { phone } = await req.json();

    const data = JSON.stringify({ to: phone });

    const options = {
      hostname: "console.melipayamak.com",
      port: 443,
      path: "/api/send/otp/c24ddb0114084c399f5b94acf2bff5ea",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
      },
    };

    return new Promise((resolve, reject) => {
      const request = https.request(options, (response) => {
        let responseData = "";

        response.on("data", (chunk) => {
          responseData += chunk;
        });

        response.on("end", () => {
          resolve(
            new NextResponse(responseData, { status: response.statusCode })
          );
        });
      });

      request.on("error", (error) => {
        reject(
          new NextResponse(
            JSON.stringify({ error: "Internal Server Error", details: error }),
            { status: 500 }
          )
        );
      });

      request.write(data);
      request.end();
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Invalid request", details: error.message }),
      { status: 400 }
    );
  }
}
