"use client";

import { useState } from "react";
import { Calendar, Clock, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn, formatCurrency } from "@/lib/utils";
import type { ServiceEntry } from "@/lib/services-data";

const SLOTS = ["08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30"];

export function ServiceBookingForm({ service }: { service: ServiceEntry }) {
  const [dayOffset, setDayOffset] = useState(2);
  const [slot, setSlot] = useState(SLOTS[2]);
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  function handleConfirm() {
    setConfirmed(true);
    toast.success(`Booked ${service.title} on ${days[dayOffset].toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })} at ${slot}.`);
  }

  return (
    <Card className="border-brand/20 shadow-xl shadow-brand/5">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Total</div>
            <div className="font-display text-3xl font-bold">{formatCurrency(service.priceCents / 100)}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{service.durationMin}-minute appointment</div>
          </div>
          <Badge variant="brand"><ShieldCheck className="size-3" /> Secure booking</Badge>
        </div>

        <Separator />

        {/* Day picker */}
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Calendar className="size-3.5" /> Choose a day
          </Label>
          <div className="mt-3 grid grid-cols-7 gap-1.5">
            {days.slice(0, 7).map((d, i) => {
              const isSel = i === dayOffset;
              return (
                <button
                  key={i}
                  onClick={() => { setDayOffset(i); setConfirmed(false); }}
                  className={cn(
                    "flex flex-col items-center rounded-lg border py-2 text-xs transition",
                    isSel ? "border-brand bg-brand text-brand-foreground shadow" : "border-border hover:border-foreground/30"
                  )}
                >
                  <span className="uppercase opacity-70">{d.toLocaleDateString("en", { weekday: "short" }).slice(0, 2)}</span>
                  <span className="text-sm font-semibold">{d.getDate()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Slots */}
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Clock className="size-3.5" /> Time slot
          </Label>
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {SLOTS.map((s) => (
              <button
                key={s}
                onClick={() => { setSlot(s); setConfirmed(false); }}
                className={cn(
                  "rounded-lg border px-2 py-2 text-sm font-medium transition",
                  slot === s ? "border-brand bg-brand text-brand-foreground" : "border-border hover:border-foreground/30"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <Label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Notes for {service.provider} (optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Anything we should know — pickup details, allergies, special requests..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-2 min-h-[80px]"
          />
        </div>

        <Separator />

        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service</span>
            <span className="font-medium">{formatCurrency(service.priceCents / 100)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Platform fee</span>
            <span className="font-medium">{formatCurrency((service.priceCents * 0.05) / 100)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total due today</span>
            <span>{formatCurrency((service.priceCents * 1.05) / 100)}</span>
          </div>
        </div>

        <Button
          variant={confirmed ? "outline" : "gradient"}
          size="lg"
          className="w-full"
          onClick={handleConfirm}
        >
          {confirmed ? (
            <><Check className="size-4" /> Booking confirmed</>
          ) : (
            <>Confirm & pay <ArrowRight className="size-4" /></>
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Free cancellation up to 24 hours before your appointment.
        </p>
      </CardContent>
    </Card>
  );
}
