import { curriculum, getGrade } from "@/lib/curriculum"
import type { SubjectColor } from "@/lib/curriculum"
import { parseDailyProgressKey, todayKey } from "@/lib/quiz"
import type { ProgressMap, TopicStatus } from "@/lib/progress-data"

export interface DailyProgressRow {
  date: string
  gradeId: string
  gradeTitle: string
  bestScore?: number
  total?: number
  status: TopicStatus
}

export interface TopicProgressRow {
  topicId: string
  title: string
  status: TopicStatus
  bestScore?: number
  total?: number
}

export interface SubjectProgressGroup {
  subjectId: string
  title: string
  color: SubjectColor
  completed: number
  total: number
  topics: TopicProgressRow[]
}

export interface GradeProgressGroup {
  gradeId: string
  title: string
  subjects: SubjectProgressGroup[]
}

export interface ProgressSummary {
  daily: DailyProgressRow[]
  today: DailyProgressRow[]
  grades: GradeProgressGroup[]
}

function topicKey(gradeId: string, subjectId: string, topicId: string) {
  return `${gradeId}:${subjectId}:${topicId}`
}

export function summarizeProgress(
  progress: ProgressMap,
  options?: { today?: string },
): ProgressSummary {
  const today = options?.today ?? todayKey()
  const daily: DailyProgressRow[] = []

  for (const [key, record] of Object.entries(progress)) {
    const parsed = parseDailyProgressKey(key)
    if (!parsed) continue
    daily.push({
      date: parsed.date,
      gradeId: parsed.gradeId,
      gradeTitle: getGrade(parsed.gradeId)?.title ?? parsed.gradeId,
      status: record.status,
      ...(record.bestScore !== undefined ? { bestScore: record.bestScore } : {}),
      ...(record.total !== undefined ? { total: record.total } : {}),
    })
  }

  daily.sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1
    return a.gradeTitle.localeCompare(b.gradeTitle)
  })

  const grades: GradeProgressGroup[] = curriculum.map((grade) => ({
    gradeId: grade.id,
    title: grade.title,
    subjects: grade.subjects.map((subject) => {
      const topics: TopicProgressRow[] = subject.topics.map((topic) => {
        const record = progress[topicKey(grade.id, subject.id, topic.id)]
        return {
          topicId: topic.id,
          title: topic.title,
          status: record?.status ?? "not-started",
          ...(record?.bestScore !== undefined ? { bestScore: record.bestScore } : {}),
          ...(record?.total !== undefined ? { total: record.total } : {}),
        }
      })
      return {
        subjectId: subject.id,
        title: subject.title,
        color: subject.color,
        completed: topics.filter((t) => t.status === "completed").length,
        total: topics.length,
        topics,
      }
    }),
  }))

  return {
    daily,
    today: daily.filter((row) => row.date === today),
    grades,
  }
}
