"use client";

import { useState } from "react";
import { Calendar, Clock, ArrowRight, Check } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const SLOTS = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"];

/**
 * Compact appointment-booking preview widget for the marketing pages.
 * Not wired to the backend yet — Phase 2 will connect this to Booking model.
 */
export function BookingWidget() {
  const [day, setDay] = useState(2);
  const [slot, setSlot] = useState("10:30");
  const [confirmed, setConfirmed] = useState(false);

  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <Card className="overflow-hidden border-brand/15 shadow-xl shadow-brand/5">
      <div className="bg-gradient-to-br from-brand-soft via-secondary-soft to-accent-soft p-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-brand" />
          <span className="text-sm font-semibold">Book a session</span>
        </div>
        <Badge variant="brand">Live demo</Badge>
      </div>

      <CardContent className="space-y-5 p-5">
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-2">Select a day</div>
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((d, i) => {
              const isSelected = i === day;
              return (
                <button
                  key={i}
                  onClick={() => { setDay(i); setConfirmed(false); }}
                  className={cn(
                    "flex flex-col items-center rounded-lg border py-2 text-xs transition",
                    isSelected
                      ? "border-brand bg-brand text-brand-foreground shadow"
                      : "border-border hover:border-foreground/30"
                  )}
                >
                  <span className="uppercase opacity-70">
                    {d.toLocaleDateString("en", { weekday: "short" }).slice(0, 2)}
                  </span>
                  <span className="text-sm font-semibold">{d.getDate()}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <Clock className="size-3.5" /> Available times
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {SLOTS.map((s) => (
              <button
                key={s}
                onClick={() => { setSlot(s); setConfirmed(false); }}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-medium transition",
                  slot === s
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border hover:border-foreground/30"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <Button
          variant={confirmed ? "outline" : "gradient"}
          size="lg"
          className="w-full"
          onClick={() => setConfirmed(true)}
        >
          {confirmed ? (
            <>
              <Check className="size-4" /> Booked for {days[day].toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}, {slot}
            </>
          ) : (
            <>
              Confirm appointment <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
