"use client"

import { useEffect, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Lightbulb,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react"
import type { Question, Subject, Topic } from "@/lib/curriculum"
import { buildTopicQuiz } from "@/lib/quiz"
import { subjectStyles } from "@/lib/subject-style"
import { SubjectIcon } from "@/components/subject-icon"
import type { useProgress } from "@/hooks/use-progress"

type Phase = "lesson" | "quiz" | "result"

interface TopicScreenProps {
  gradeId: string
  subject: Subject
  topic: Topic
  hasNextTopic: boolean
  onBack: () => void
  onNextTopic: () => void
  progress: ReturnType<typeof useProgress>
}

export function TopicScreen({
  gradeId,
  subject,
  topic,
  hasNextTopic,
  onBack,
  onNextTopic,
  progress,
}: TopicScreenProps) {
  const style = subjectStyles[subject.color]
  const [phase, setPhase] = useState<Phase>("lesson")
  const [quizQuestions, setQuizQuestions] = useState<Question[]>(topic.questions)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [wasCorrect, setWasCorrect] = useState(false)

  const total = quizQuestions.length
  const question = quizQuestions[index]

  useEffect(() => {
    // Scroll to top when the topic changes.
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  function startQuiz() {
    setQuizQuestions(buildTopicQuiz(gradeId, subject.id, topic.id, topic.questions))
    progress.markInProgress(gradeId, subject.id, topic.id)
    setPhase("quiz")
    setIndex(0)
    setScore(0)
    setAnswered(false)
    setWasCorrect(false)
  }

  function handleAnswer(correct: boolean) {
    setAnswered(true)
    setWasCorrect(correct)
    if (correct) setScore((s) => s + 1)
  }

  function nextQuestion() {
    if (index + 1 < total) {
      setIndex((i) => i + 1)
      setAnswered(false)
      setWasCorrect(false)
    } else {
      progress.markCompleted(gradeId, subject.id, topic.id, score, total)
      setPhase("result")
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  function tryAgain() {
    startQuiz()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="pt-6">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to {subject.title}
      </button>

      {/* Topic heading */}
      <div className="mb-6 flex items-center gap-3">
        <span className={`flex size-12 items-center justify-center rounded-2xl ${style.solid} shadow-sm`}>
          <SubjectIcon color={subject.color} className="size-6" />
        </span>
        <div>
          <p className={`text-xs font-bold uppercase tracking-wide ${style.text}`}>
            {subject.title}
          </p>
          <h1 className="font-display text-3xl font-extrabold text-foreground">{topic.title}</h1>
        </div>
      </div>

      {phase === "lesson" && (
        <LessonView topic={topic} colorText={style.text} soft={style.soft} onStart={startQuiz} />
      )}

      {phase === "quiz" && (
        <QuizView
          question={question}
          index={index}
          total={total}
          answered={answered}
          wasCorrect={wasCorrect}
          barClass={style.bar}
          onAnswer={handleAnswer}
          onNext={nextQuestion}
          isLast={index + 1 === total}
        />
      )}

      {phase === "result" && (
        <ResultView
          score={score}
          total={total}
          soft={style.soft}
          colorText={style.text}
          hasNextTopic={hasNextTopic}
          onTryAgain={tryAgain}
          onNextTopic={onNextTopic}
          onBackToSubject={onBack}
        />
      )}
    </div>
  )
}

/* -------------------------------- Lesson -------------------------------- */

function LessonView({
  topic,
  colorText,
  soft,
  onStart,
}: {
  topic: Topic
  colorText: string
  soft: string
  onStart: () => void
}) {
  return (
    <div className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-8">
      <div className="flex items-center gap-2">
        <BookOpen className={`size-5 ${colorText}`} aria-hidden="true" />
        <h2 className="font-display text-xl font-extrabold text-foreground">Let&apos;s learn</h2>
      </div>

      <ul className="mt-4 space-y-3">
        {topic.lesson.concept.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${soft} ${colorText} text-sm font-extrabold`}
            >
              {i + 1}
            </span>
            <span className="text-pretty text-lg leading-relaxed text-foreground">{point}</span>
          </li>
        ))}
      </ul>

      <div className={`mt-6 flex items-start gap-3 rounded-2xl ${soft} p-4`}>
        <Lightbulb className={`mt-0.5 size-5 shrink-0 ${colorText}`} aria-hidden="true" />
        <div>
          <p className={`text-xs font-bold uppercase tracking-wide ${colorText}`}>Example</p>
          <p className="mt-1 text-pretty text-lg leading-relaxed text-foreground">
            {topic.lesson.example}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-display text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
      >
        <Sparkles className="size-5" aria-hidden="true" />
        Start the quiz
      </button>
    </div>
  )
}

/* --------------------------------- Quiz --------------------------------- */

function QuizView({
  question,
  index,
  total,
  answered,
  wasCorrect,
  barClass,
  onAnswer,
  onNext,
  isLast,
}: {
  question: Question
  index: number
  total: number
  answered: boolean
  wasCorrect: boolean
  barClass: string
  onAnswer: (correct: boolean) => void
  onNext: () => void
  isLast: boolean
}) {
  const pct = Math.round(((index + (answered ? 1 : 0)) / total) * 100)

  return (
    <div className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm font-bold text-muted-foreground">
          <span>
            Question {index + 1} of {total}
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full ${barClass} transition-all duration-300`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <h2 className="text-balance font-display text-2xl font-extrabold leading-snug text-foreground">
        {question.prompt}
      </h2>

      <div className="mt-6">
        <AnswerArea key={question.id} question={question} answered={answered} onAnswer={onAnswer} />
      </div>

      {/* Feedback */}
      {answered && (
        <div
          className={[
            "mt-6 flex items-start gap-3 rounded-2xl p-4",
            wasCorrect
              ? "bg-success/10 text-foreground"
              : "bg-destructive/10 text-foreground",
          ].join(" ")}
          role="status"
        >
          <span
            className={[
              "flex size-8 shrink-0 items-center justify-center rounded-full",
              wasCorrect
                ? "bg-success text-success-foreground"
                : "bg-destructive text-destructive-foreground",
            ].join(" ")}
          >
            {wasCorrect ? (
              <Check className="size-5" aria-hidden="true" />
            ) : (
              <X className="size-5" aria-hidden="true" />
            )}
          </span>
          <div>
            <p className="font-display text-lg font-extrabold">
              {wasCorrect ? "Correct! Nice work." : "Not quite."}
            </p>
            <p className="mt-0.5 text-pretty leading-relaxed text-muted-foreground">
              {question.explanation}
            </p>
          </div>
        </div>
      )}

      {answered && (
        <button
          type="button"
          onClick={onNext}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-display text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
        >
          {isLast ? "See my score" : "Next question"}
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

function AnswerArea({
  question,
  answered,
  onAnswer,
}: {
  question: Question
  answered: boolean
  onAnswer: (correct: boolean) => void
}) {
  const [picked, setPicked] = useState<number | boolean | null>(null)
  const [numberValue, setNumberValue] = useState("")

  if (question.type === "mcq" || question.type === "boolean") {
    const options: { label: string; value: number | boolean; correct: boolean }[] =
      question.type === "mcq"
        ? question.options.map((label, i) => ({
            label,
            value: i,
            correct: i === question.answerIndex,
          }))
        : [
            { label: "True", value: true, correct: question.answer === true },
            { label: "False", value: false, correct: question.answer === false },
          ]

    return (
      <div className={question.type === "boolean" ? "grid grid-cols-2 gap-3" : "grid gap-3"}>
        {options.map((opt) => {
          const isPicked = picked === opt.value
          const showCorrect = answered && opt.correct
          const showWrongPick = answered && isPicked && !opt.correct

          return (
            <button
              key={String(opt.value)}
              type="button"
              disabled={answered}
              onClick={() => {
                if (answered) return
                setPicked(opt.value)
                onAnswer(opt.correct)
              }}
              aria-pressed={isPicked}
              className={[
                "flex items-center justify-between gap-3 rounded-2xl border-2 px-5 py-4 text-left font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "text-lg text-foreground",
                showCorrect
                  ? "border-success bg-success/10"
                  : showWrongPick
                    ? "border-destructive bg-destructive/10"
                    : answered
                      ? "border-border opacity-60"
                      : "border-border bg-background hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md",
              ].join(" ")}
            >
              <span>{opt.label}</span>
              {showCorrect && <Check className="size-5 text-success" aria-hidden="true" />}
              {showWrongPick && <X className="size-5 text-destructive" aria-hidden="true" />}
            </button>
          )
        })}
      </div>
    )
  }

  // Number answer
  const correctAnswer = question.answer
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (answered || numberValue.trim() === "") return
        onAnswer(Number(numberValue) === correctAnswer)
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="number"
        inputMode="numeric"
        step="any"
        value={numberValue}
        disabled={answered}
        onChange={(e) => setNumberValue(e.target.value)}
        placeholder="Type your answer"
        aria-label="Your numeric answer"
        className="flex-1 rounded-2xl border-2 border-border bg-background px-5 py-4 text-lg font-bold text-foreground outline-none transition-colors placeholder:font-normal placeholder:text-muted-foreground focus:border-primary disabled:opacity-70"
      />
      <button
        type="submit"
        disabled={answered || numberValue.trim() === ""}
        className="rounded-2xl bg-primary px-6 py-4 font-display text-lg font-extrabold text-primary-foreground shadow-md transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      >
        Check
      </button>
    </form>
  )
}

/* -------------------------------- Result -------------------------------- */

function ResultView({
  score,
  total,
  soft,
  colorText,
  hasNextTopic,
  onTryAgain,
  onNextTopic,
  onBackToSubject,
}: {
  score: number
  total: number
  soft: string
  colorText: string
  hasNextTopic: boolean
  onTryAgain: () => void
  onNextTopic: () => void
  onBackToSubject: () => void
}) {
  const pct = total > 0 ? score / total : 0
  const message =
    pct === 1
      ? "Perfect score! You're a star!"
      : pct >= 0.6
        ? "Great job! Keep it up!"
        : "Good try! Practice makes perfect."

  return (
    <div className={`rounded-3xl ${soft} p-8 text-center shadow-sm`}>
      <p className="font-display text-2xl font-extrabold text-foreground">Your Score</p>
      <p className={`mt-2 font-display text-6xl font-extrabold ${colorText}`}>
        {score} / {total}
      </p>
      <p className="mt-3 text-pretty text-lg font-semibold text-foreground">{message}</p>

      {/* Dots showing correct count */}
      <div className="mt-5 flex justify-center gap-2" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={[
              "size-3 rounded-full",
              i < score ? "bg-success" : "bg-card/70",
            ].join(" ")}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onTryAgain}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-card px-6 py-4 font-display text-lg font-extrabold text-foreground shadow-sm ring-1 ring-border transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcw className="size-5" aria-hidden="true" />
          Try Again
        </button>

        {hasNextTopic ? (
          <button
            type="button"
            onClick={onNextTopic}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-display text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Next Topic
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onBackToSubject}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-display text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Back to topics
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}
