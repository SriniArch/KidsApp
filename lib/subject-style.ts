import type { SubjectColor } from "@/lib/curriculum"

interface SubjectStyle {
  // Solid badge / accent
  solid: string
  // Soft tinted surface
  soft: string
  // Text in the subject color
  text: string
  // Ring / border in the subject color
  ring: string
  // Progress bar fill
  bar: string
  tagline: string
}

export const subjectStyles: Record<SubjectColor, SubjectStyle> = {
  math: {
    solid: "bg-math text-math-foreground",
    soft: "bg-math-soft",
    text: "text-math",
    ring: "ring-math/40",
    bar: "bg-math",
    tagline: "Numbers, shapes & puzzles",
  },
  science: {
    solid: "bg-science text-science-foreground",
    soft: "bg-science-soft",
    text: "text-science",
    ring: "ring-science/40",
    bar: "bg-science",
    tagline: "Explore how the world works",
  },
  geography: {
    solid: "bg-geography text-geography-foreground",
    soft: "bg-geography-soft",
    text: "text-geography",
    ring: "ring-geography/40",
    bar: "bg-geography",
    tagline: "Places, maps & our planet",
  },
}
