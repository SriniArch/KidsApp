"use client"

import { CheckCircle2, Circle, PlayCircle } from "lucide-react"
import { displayBuddyCode } from "@/lib/buddy-code"
import type { FamilyAccountErr, FamilyAccountOk } from "@/lib/family-progress"
import {
  summarizeProgress,
  type DailyProgressRow,
  type TopicProgressRow,
} from "@/lib/progress-summary"
import type { TopicStatus } from "@/lib/progress-data"
import { subjectStyles } from "@/lib/subject-style"

const statusMeta: Record<
  TopicStatus,
  { label: string; icon: typeof Circle; className: string }
> = {
  "not-started": {
    label: "Not started",
    icon: Circle,
    className: "text-muted-foreground",
  },
  "in-progress": {
    label: "In progress",
    icon: PlayCircle,
    className: "text-primary",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "text-success",
  },
}

function formatDay(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number)
  if (!year || !month || !day) return dateKey
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatUpdatedAt(iso?: string) {
  if (!iso) return null
  const parsed = new Date(iso)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
}

function scoreLabel(row: { bestScore?: number; total?: number; status: TopicStatus }) {
  if (row.bestScore !== undefined && row.total !== undefined) {
    return `${row.bestScore} / ${row.total}`
  }
  if (row.status === "in-progress") return "Started"
  return "—"
}

function DailyRows({ rows, empty }: { rows: DailyProgressRow[]; empty: string }) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">{empty}</p>
  }
  return (
    <ul className="divide-y divide-border/70 overflow-hidden rounded-2xl bg-card ring-1 ring-border">
      {rows.map((row) => {
        const meta = statusMeta[row.status]
        const Icon = meta.icon
        return (
          <li
            key={`${row.date}-${row.gradeId}`}
            className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
          >
            <div>
              <p className="font-display text-base font-extrabold text-foreground">
                {formatDay(row.date)}
              </p>
              <p className="text-sm text-muted-foreground">{row.gradeTitle}</p>
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold">
              <span className={`inline-flex items-center gap-1 ${meta.className}`}>
                <Icon className="size-4" aria-hidden="true" />
                {meta.label}
              </span>
              <span className="tabular-nums text-foreground">{scoreLabel(row)}</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function TopicRow({ topic }: { topic: TopicProgressRow }) {
  const meta = statusMeta[topic.status]
  const Icon = meta.icon
  return (
    <li className="flex items-center justify-between gap-3 px-3 py-2">
      <span className="min-w-0 truncate font-semibold text-foreground">{topic.title}</span>
      <span className="flex shrink-0 items-center gap-2 text-sm">
        <span className={`inline-flex items-center gap-1 ${meta.className}`}>
          <Icon className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">{meta.label}</span>
        </span>
        <span className="w-14 text-right tabular-nums text-muted-foreground">
          {scoreLabel(topic)}
        </span>
      </span>
    </li>
  )
}

export function ChildProgressCard({
  result,
}: {
  result: FamilyAccountOk | FamilyAccountErr
}) {
  if (!result.ok) {
    return (
      <section
        id={result.code}
        className="rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border sm:p-6"
      >
        <h2 className="font-display text-xl font-extrabold text-foreground">
          {displayBuddyCode(result.code)}
        </h2>
        <p className="mt-2 text-sm font-semibold text-destructive" role="alert">
          {result.error}
        </p>
      </section>
    )
  }

  const summary = summarizeProgress(result.progress)
  const history = summary.daily.filter((row) => !summary.today.some((today) => today.date === row.date && today.gradeId === row.gradeId))
  const updated = formatUpdatedAt(result.updatedAt)
  const heading = result.name || displayBuddyCode(result.code)

  return (
    <section
      id={result.code}
      className="space-y-6 rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border sm:p-6"
    >
      <header>
        <h2 className="font-display text-2xl font-extrabold text-foreground">{heading}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Code {displayBuddyCode(result.code)}
          {updated ? ` · Last saved ${updated}` : ""}
        </p>
      </header>

      <div>
        <h3 className="mb-2 font-display text-lg font-extrabold text-foreground">
          Today&apos;s daily
        </h3>
        <DailyRows rows={summary.today} empty="No daily challenge yet today." />
      </div>

      <div>
        <h3 className="mb-2 font-display text-lg font-extrabold text-foreground">
          Daily history
        </h3>
        <p className="mb-2 text-sm text-muted-foreground">Best score for each calendar day.</p>
        <DailyRows rows={history} empty="No earlier daily challenges saved yet." />
      </div>

      <div>
        <h3 className="mb-3 font-display text-lg font-extrabold text-foreground">Topics</h3>
        <div className="space-y-4">
          {summary.grades.map((grade) => (
            <div key={grade.gradeId}>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                {grade.title}
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {grade.subjects.map((subject) => {
                  const style = subjectStyles[subject.color]
                  return (
                    <div
                      key={subject.subjectId}
                      className={`rounded-2xl ${style.soft} p-3 ring-1 ${style.ring}`}
                    >
                      <div className="mb-1 flex items-baseline justify-between gap-2 px-1">
                        <p className={`font-display text-base font-extrabold ${style.text}`}>
                          {subject.title}
                        </p>
                        <p className="text-sm font-semibold text-muted-foreground">
                          {subject.completed} / {subject.total} done
                        </p>
                      </div>
                      <ul className="rounded-xl bg-card/80">
                        {subject.topics.map((topic) => (
                          <TopicRow key={topic.topicId} topic={topic} />
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
