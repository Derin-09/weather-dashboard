"use client"

import { cn } from "@/lib/utils"

export default function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-[#2A2A2A]", className)} />
}