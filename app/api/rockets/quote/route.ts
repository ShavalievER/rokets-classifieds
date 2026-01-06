import { NextResponse } from "next/server";

type QuoteRequest = {
  listingId: string;
  pickupArea: string;
  dropoffArea: string;
  weightKg?: number;
  declaredValueAed?: number;
  fragile?: boolean;
};

export async function POST(req: Request) {
  const body = (await req.json()) as QuoteRequest;

  const base = 20;
  const distanceFactor = body.pickupArea === body.dropoffArea ? 0 : 15;
  const weightFactor = Math.ceil((body.weightKg ?? 3) * 2);
  const fragileFactor = body.fragile ? 10 : 0;
  const valueFactor = Math.ceil(((body.declaredValueAed ?? 300) / 1000) * 8);

  const price = base + distanceFactor + weightFactor + fragileFactor + valueFactor;

  return NextResponse.json({
    request_id: `q_${Date.now()}`,
    currency: "AED",
    price: price,
    eta_hours: "24-72",
    insurance_included: true,
    disclaimer: "Demo quote (mock). Final pricing will be calculated by Rockets."
  });
}
