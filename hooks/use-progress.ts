"use client"

import { useCallback, useEffect, useState } from "react"

export type TopicStatus = "not-started" | "in-progress" | "completed"

// Progress is stored per-device in localStorage. Simple by design.
// Key format: `${gradeId}:${subjectId}:${topicId}`
interface ProgressRecord {
  status: TopicStatus
  bestScore?: number
  total?: number
}

type ProgressMap = Record<string, ProgressRecord>

const STORAGE_KEY = "kids-learning-progress-v1"

function readStorage(): ProgressMap {
  if (typeof window === "undefined") return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ProgressMap) : {}
  } catch {
    return {}
  }
}

function keyFor(gradeId: string, subjectId: string, topicId: string) {
  return `${gradeId}:${subjectId}:${topicId}`
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setProgress(readStorage())
    setLoaded(true)
  }, [])

  const persist = useCallback((next: ProgressMap) => {
    setProgress(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore write errors (e.g. private mode)
    }
  }, [])

  const getStatus = useCallback(
    (gradeId: string, subjectId: string, topicId: string): TopicStatus => {
      return progress[keyFor(gradeId, subjectId, topicId)]?.status ?? "not-started"
    },
    [progress],
  )

  const getRecord = useCallback(
    (gradeId: string, subjectId: string, topicId: string): ProgressRecord | undefined => {
      return progress[keyFor(gradeId, subjectId, topicId)]
    },
    [progress],
  )

  const markInProgress = useCallback(
    (gradeId: string, subjectId: string, topicId: string) => {
      const k = keyFor(gradeId, subjectId, topicId)
      // Don't downgrade a completed topic.
      if (progress[k]?.status === "completed") return
      persist({ ...progress, [k]: { ...progress[k], status: "in-progress" } })
    },
    [progress, persist],
  )

  const markCompleted = useCallback(
    (gradeId: string, subjectId: string, topicId: string, score: number, total: number) => {
      const k = keyFor(gradeId, subjectId, topicId)
      const prevBest = progress[k]?.bestScore ?? 0
      persist({
        ...progress,
        [k]: {
          status: "completed",
          bestScore: Math.max(prevBest, score),
          total,
        },
      })
    },
    [progress, persist],
  )

  const countCompleted = useCallback(
    (gradeId: string, subjectId: string, topicIds: string[]): number => {
      return topicIds.filter(
        (topicId) => progress[keyFor(gradeId, subjectId, topicId)]?.status === "completed",
      ).length
    },
    [progress],
  )

  return {
    loaded,
    getStatus,
    getRecord,
    markInProgress,
    markCompleted,
    countCompleted,
  }
}
