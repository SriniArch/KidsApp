export type TopicStatus = "not-started" | "in-progress" | "completed"

export interface ProgressRecord {
  status: TopicStatus
  bestScore?: number
  total?: number
}

export type ProgressMap = Record<string, ProgressRecord>

const STATUS_RANK: Record<TopicStatus, number> = {
  "not-started": 0,
  "in-progress": 1,
  completed: 2,
}

const KEY_PATTERN = /^[\w-]+:[\w-]+:[\w-]+$/
const STATUSES = new Set<TopicStatus>(["not-started", "in-progress", "completed"])

export function isProgressMap(value: unknown): value is ProgressMap {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false
  for (const [key, record] of Object.entries(value)) {
    if (!KEY_PATTERN.test(key)) return false
    if (!record || typeof record !== "object" || Array.isArray(record)) return false
    const rec = record as Record<string, unknown>
    if (typeof rec.status !== "string" || !STATUSES.has(rec.status as TopicStatus)) {
      return false
    }
    if (rec.bestScore !== undefined && (!Number.isFinite(rec.bestScore) || (rec.bestScore as number) < 0)) {
      return false
    }
    if (rec.total !== undefined && (!Number.isFinite(rec.total) || (rec.total as number) < 0)) {
      return false
    }
  }
  return true
}

export function mergeProgress(a: ProgressMap, b: ProgressMap): ProgressMap {
  const out: ProgressMap = { ...a }
  for (const [key, incoming] of Object.entries(b)) {
    const prev = out[key]
    if (!prev) {
      out[key] = incoming
      continue
    }
    const status =
      STATUS_RANK[incoming.status] >= STATUS_RANK[prev.status] ? incoming.status : prev.status
    const prevBest = prev.bestScore ?? 0
    const nextBest = incoming.bestScore ?? 0
    const bestScore = Math.max(prevBest, nextBest)
    const total = nextBest >= prevBest ? (incoming.total ?? prev.total) : (prev.total ?? incoming.total)
    out[key] = {
      status,
      ...(bestScore > 0 ? { bestScore } : {}),
      ...(total !== undefined ? { total } : {}),
    }
  }
  return out
}

export function progressEqual(a: ProgressMap, b: ProgressMap): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}
