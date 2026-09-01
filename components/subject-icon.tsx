import { Calculator, FlaskConical, Globe2, type LucideIcon } from "lucide-react"
import type { SubjectColor } from "@/lib/curriculum"

const iconMap: Record<SubjectColor, LucideIcon> = {
  math: Calculator,
  science: FlaskConical,
  geography: Globe2,
}

export function SubjectIcon({
  color,
  className,
}: {
  color: SubjectColor
  className?: string
}) {
  const Icon = iconMap[color]
  return <Icon className={className} aria-hidden="true" />
}
