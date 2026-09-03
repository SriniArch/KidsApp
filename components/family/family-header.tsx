"use client"

import Link from "next/link"
import { GraduationCap, Users } from "lucide-react"

export function FamilyHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full outline-none transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <GraduationCap className="size-5" aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
            Learn Buddy
          </span>
        </Link>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-bold text-secondary-foreground">
          <Users className="size-4" aria-hidden="true" />
          Family
        </span>
      </div>
    </header>
  )
}
