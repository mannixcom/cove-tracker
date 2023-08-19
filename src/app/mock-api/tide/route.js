import { NextRequest, NextResponse } from "next/server";
import response from "./response.json";

/**
 * @typedef {object} Height
 * @property {number} dt
 * @property {Date} date
 * @property {number} height
 */

/** @param {NextRequest} req */
export async function GET(req) {
  const dateParam = req.nextUrl.searchParams.get("date");

  /** @type {Height[]} */
  const heights = response.heights;

  heights.forEach((height, index) => {
    height.date = new Date(dateParam);
    height.date.setMinutes(30 * index);
    height.dt = height.date.valueOf();
  });

  return NextResponse.json(response);
}
