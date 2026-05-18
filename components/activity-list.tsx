"use client";

import * as React from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { ActivityEntry } from "@/lib/mock-data";

interface ActivityListProps {
  entries: ActivityEntry[];
  className?: string;
}

export function ActivityList({ entries, className }: ActivityListProps) {
  return (
    <ul
      className={cn(
        "divide-y divide-border rounded-xl border border-border bg-card",
        className
      )}
    >
      {entries.map((entry) => {
        const Icon =
          entry.type === "presented"
            ? ArrowUpFromLine
            : entry.type === "received"
            ? ArrowDownToLine
            : entry.type === "issued"
            ? ArrowDownToLine
            : XCircle;
        const StatusIcon =
          entry.status === "success"
            ? CheckCircle2
            : entry.status === "pending"
            ? Clock
            : XCircle;
        const statusColor =
          entry.status === "success"
            ? "text-accent"
            : entry.status === "pending"
            ? "text-saffron"
            : "text-destructive";

        return (
          <li
            key={entry.id}
            className="flex items-start justify-between gap-4 px-5 py-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary">
                <Icon className="h-4 w-4 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {entry.title}{" "}
                  <span className="font-normal text-muted-foreground">
                    · {entry.party}
                  </span>
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {entry.description}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <Badge variant="muted" className="text-[10px]">
                <StatusIcon className={cn("h-3 w-3", statusColor)} />
                <span className="capitalize">{entry.status}</span>
              </Badge>
              <span className="text-[11px] text-muted-foreground">
                {formatRelativeTime(entry.at)}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
