"use client";

import { Suspense } from "react";
import TicketGeneratedPage from "./ticket-generated";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TicketGeneratedPage />
    </Suspense>
  );
}
