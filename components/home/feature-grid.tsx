"use client";

import { Card } from "@/components/ui/card";
import {
  RevealStagger,
  RevealStaggerItem,
} from "@/components/animations/reveal";
import { TiltCard } from "@/components/animations/tilt-card";
import { FEATURES } from "@/lib/mock-data";

export function FeatureGrid() {
  return (
    <RevealStagger className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((feature) => {
        const Icon = feature.icon;
        return (
          <RevealStaggerItem key={feature.title}>
            <TiltCard intensity={4} className="rounded-xl">
              <Card className="h-full p-6 transition-colors hover:border-primary/40">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            </TiltCard>
          </RevealStaggerItem>
        );
      })}
    </RevealStagger>
  );
}
