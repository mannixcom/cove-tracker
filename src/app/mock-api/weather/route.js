import { NextResponse } from "next/server";
import response from "./responseExample.json";
import { today } from "@/utils/date";

export async function GET() {
  /** @type {WeatherData} */
  const { hours } = response;

  hours.forEach((hour, index) => {
    hour.time = new Date(today);
    hour.time.setHours(1 * index);
  });

  return NextResponse.json(response);
}