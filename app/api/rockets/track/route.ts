import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const trackingId = searchParams.get("tracking_id") || "RKT-DEMO";

  return NextResponse.json({
    tracking_id: trackingId,
    current_status: "in_transit",
    timeline: [
      { ts: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), status: "pickup_scheduled", note: "Pickup scheduled" },
      { ts: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), status: "picked_up", note: "Picked up from seller" },
      { ts: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), status: "in_transit", note: "Moving to destination hub" }
    ]
  });
}

