import type { Question } from "./curriculum"
import { getExtraQuestions } from "./extra-questions"

// ----------------------------------------------------------------------------
// Randomization helpers used by quizzes and the daily challenge.
// ----------------------------------------------------------------------------

// Fisher-Yates shuffle. Accepts an optional RNG so results can be made
// deterministic (used by the daily challenge).
export function shuffle<T>(arr: readonly T[], rng: () => number = Math.random): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Shuffle the options of a multiple-choice question while keeping the
// correct answer pointing at the right option. Other question types are
// returned unchanged.
export function randomizeQuestion(q: Question, rng: () => number = Math.random): Question {
  if (q.type !== "mcq") return q
  const order = shuffle(
    q.options.map((_, i) => i),
    rng,
  )
  return {
    ...q,
    options: order.map((i) => q.options[i]),
    answerIndex: order.indexOf(q.answerIndex),
  }
}

// Ensure IDs are unique within one generated quiz.
// Keeps original id when possible; otherwise appends/increments __N.
function ensureUniqueQuestionIds(questions: readonly Question[]): Question[] {
  const used = new Set<string>()
  const counts = new Map<string, number>()

  return questions.map((q) => {
    const base = q.id
    let n = (counts.get(base) ?? 0) + 1
    counts.set(base, n)

    let candidate = n === 1 ? base : `${base}__${n}`
    while (used.has(candidate)) {
      n += 1
      counts.set(base, n)
      candidate = `${base}__${n}`
    }

    used.add(candidate)
    if (candidate === q.id) return q
    return { ...q, id: candidate }
  })
}

// Build a quiz by shuffling a pool, taking `size` questions, and shuffling
// the options within each one.
export function buildQuiz(
  pool: readonly Question[],
  size: number,
  rng: () => number = Math.random,
): Question[] {
  const selected = shuffle(pool, rng)
    .slice(0, size)
    .map((q) => randomizeQuestion(q, rng))

  return ensureUniqueQuestionIds(selected)
}

// Small, fast seeded RNG (mulberry32) so the daily challenge is the same for
// everyone on a given day but changes each day.
export function seededRng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// A stable key + numeric seed for "today" in the user's local time.
export function todayKey(date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function dailySeed(date = new Date()): number {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
}

export function buildTopicQuiz(
  gradeId: string,
  subjectId: string,
  topicId: string,
  baseQuestions: readonly Question[],
  size = 10,
  rng: () => number = Math.random,
): Question[] {
  const pool = [...baseQuestions, ...getExtraQuestions(gradeId, subjectId, topicId)]
  return buildQuiz(pool, Math.min(size, pool.length), rng)
}
