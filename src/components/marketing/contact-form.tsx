"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const TOPICS = ["Support", "Sales", "Partnerships", "Press"];

export function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    if (!fd.get("email") || !fd.get("message")) {
      toast.error("Email and message are required.");
      return;
    }
    setSent(true);
    toast.success("Message sent — we'll reply within 6 business hours.");
  }

  if (sent) {
    return (
      <Card className="border-brand/30">
        <CardContent className="p-10 text-center space-y-3">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-brand text-brand-foreground">
            <Check className="size-6" />
          </div>
          <h2 className="font-display text-xl font-bold">Got it.</h2>
          <p className="text-sm text-muted-foreground">We'll be in touch within 6 business hours.</p>
          <Button variant="outline" onClick={() => setSent(false)}>Send another</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6 sm:p-8 space-y-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Your name</Label>
              <Input id="name" name="name" placeholder="Jane Founder" className="mt-2" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@business.com" className="mt-2" required />
            </div>
          </div>

          <fieldset className="space-y-2">
            <Label>Topic</Label>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                    topic === t ? "border-brand bg-brand text-brand-foreground" : "border-border text-muted-foreground hover:border-foreground/30"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required placeholder="How can we help?" className="mt-2 min-h-[140px]" />
          </div>

          <Button type="submit" variant="gradient" size="lg" className="w-full">
            Send message <ArrowRight className="size-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
