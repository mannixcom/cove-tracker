import { NextRequest, NextResponse } from "next/server";
import response from "./responseExample.json";

/** @param {NextRequest} req */
export async function GET(req) {
  const dateParam = req.nextUrl.searchParams.get("date");

  /** @type {TideData} */
  const { heights } = response;

  heights.forEach((height, index) => {
    height.date = new Date(dateParam);
    height.date.setMinutes(30 * index);
    height.dt = height.date.valueOf();
  });

  return NextResponse.json(response);
}