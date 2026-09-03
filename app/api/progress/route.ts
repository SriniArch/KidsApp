import { NextResponse } from "next/server"
import { isBuddyCode, normalizeBuddyCode, sanitizeDisplayName } from "@/lib/buddy-code"
import { isProgressMap } from "@/lib/progress-data"
import { createAccount, getAccount, mergeAndSave } from "@/lib/progress-store"

export const runtime = "nodejs"

const MAX_BODY_BYTES = 60_000

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status })
}

async function readJson(request: Request) {
  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) {
    return { error: jsonError("That save is too big.", 413) }
  }
  try {
    return { body: raw ? (JSON.parse(raw) as Record<string, unknown>) : {} }
  } catch {
    return { error: jsonError("Could not read that request.", 400) }
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = normalizeBuddyCode(url.searchParams.get("code") ?? "")
  if (!isBuddyCode(code)) {
    return jsonError("That buddy code does not look right.", 400)
  }
  const account = await getAccount(code)
  if (!account) {
    return jsonError("We could not find that buddy code.", 404)
  }
  return NextResponse.json({
    code: account.code,
    name: account.name,
    progress: account.progress,
    updatedAt: account.updatedAt,
  })
}

export async function POST(request: Request) {
  const parsed = await readJson(request)
  if ("error" in parsed && parsed.error) return parsed.error
  const body = parsed.body ?? {}
  const progress = body.progress
  if (!isProgressMap(progress)) {
    return jsonError("Progress data is not valid.", 400)
  }
  const name = sanitizeDisplayName(body.name)
  try {
    const account = await createAccount(name, progress)
    return NextResponse.json({
      code: account.code,
      name: account.name,
      progress: account.progress,
      updatedAt: account.updatedAt,
    })
  } catch {
    return jsonError("Could not make a buddy code. Try again.", 500)
  }
}

export async function PUT(request: Request) {
  const parsed = await readJson(request)
  if ("error" in parsed && parsed.error) return parsed.error
  const body = parsed.body ?? {}
  const code = normalizeBuddyCode(typeof body.code === "string" ? body.code : "")
  if (!isBuddyCode(code)) {
    return jsonError("That buddy code does not look right.", 400)
  }
  if (!isProgressMap(body.progress)) {
    return jsonError("Progress data is not valid.", 400)
  }
  const name = body.name !== undefined ? sanitizeDisplayName(body.name) : undefined
  const account = await mergeAndSave(code, body.progress, name)
  if (!account) {
    return jsonError("We could not find that buddy code.", 404)
  }
  return NextResponse.json({
    code: account.code,
    name: account.name,
    progress: account.progress,
    updatedAt: account.updatedAt,
  })
}
