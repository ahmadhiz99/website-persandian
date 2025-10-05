"use client";

import { Suspense } from "react";
import TrackingTTEPage from "./tracking-tte";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackingTTEPage />
    </Suspense>
  );
}
