"use client";

import { FileDown, ArrowLeft, Wand2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

/** Client-side actions for the report page — print/save-as-PDF + re-run. */
export function ReportActions() {
  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      <Button variant="brand" size="md" onClick={() => window.print()}>
        <FileDown className="size-4" /> Download PDF
      </Button>
      <Button asChild variant="outline" size="md">
        <Link href="/analyzer"><Wand2 className="size-4" /> Analyze another site</Link>
      </Button>
      <Button asChild variant="ghost" size="md">
        <Link href="/"><ArrowLeft className="size-4" /> Home</Link>
      </Button>
    </div>
  );
}
