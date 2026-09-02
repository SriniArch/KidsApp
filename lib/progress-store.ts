import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { generateBuddyCode } from "@/lib/buddy-code"
import { mergeProgress, type ProgressMap } from "@/lib/progress-data"

export interface BuddyAccount {
  code: string
  name: string
  progress: ProgressMap
  updatedAt: string
}

type AccountTable = Record<string, BuddyAccount>

const FILE_NAME = "buddy-progress.json"

function kvConfigured() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

async function kvGetTable(): Promise<AccountTable> {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return {}
  const res = await fetch(`${url}/get/kids-buddy-progress-v1`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  if (!res.ok) return {}
  const payload = (await res.json()) as { result?: unknown }
  if (!payload.result) return {}
  if (typeof payload.result === "object") return payload.result as AccountTable
  try {
    return JSON.parse(String(payload.result)) as AccountTable
  } catch {
    return {}
  }
}

async function kvSetTable(table: AccountTable) {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return
  await fetch(`${url}/set/kids-buddy-progress-v1`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(JSON.stringify(table)),
  })
}

function fileCandidates() {
  return [
    path.join(process.cwd(), "data", FILE_NAME),
    path.join("/tmp", FILE_NAME),
  ]
}

let resolvedFilePath: string | null = null

async function readFileTable(): Promise<{ table: AccountTable; filePath: string }> {
  const paths = resolvedFilePath
    ? [resolvedFilePath, ...fileCandidates()]
    : fileCandidates()
  for (const filePath of paths) {
    try {
      const raw = await readFile(filePath, "utf8")
      resolvedFilePath = filePath
      return { table: JSON.parse(raw) as AccountTable, filePath }
    } catch {
      // try next location
    }
  }
  return { table: {}, filePath: fileCandidates()[0] }
}

async function writeFileTable(preferred: string, table: AccountTable) {
  const paths = [preferred, fileCandidates()[1]].filter(
    (value, index, all) => all.indexOf(value) === index,
  )
  let lastError: unknown
  for (const filePath of paths) {
    try {
      await mkdir(path.dirname(filePath), { recursive: true })
      await writeFile(filePath, JSON.stringify(table), "utf8")
      resolvedFilePath = filePath
      return
    } catch (err) {
      lastError = err
    }
  }
  throw lastError
}

let queue: Promise<unknown> = Promise.resolve()

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn)
  queue = run.then(
    () => undefined,
    () => undefined,
  )
  return run
}

async function loadTable(): Promise<{ table: AccountTable; filePath: string; useKv: boolean }> {
  if (kvConfigured()) {
    return { table: await kvGetTable(), filePath: "", useKv: true }
  }
  const { table, filePath } = await readFileTable()
  return { table, filePath, useKv: false }
}

async function persistTable(table: AccountTable, filePath: string, useKv: boolean) {
  if (useKv) {
    await kvSetTable(table)
    return
  }
  await writeFileTable(filePath, table)
}

export async function getAccount(code: string): Promise<BuddyAccount | null> {
  return withLock(async () => {
    const { table } = await loadTable()
    return table[code] ?? null
  })
}

export async function createAccount(name: string, progress: ProgressMap): Promise<BuddyAccount> {
  return withLock(async () => {
    const { table, filePath, useKv } = await loadTable()
    let code = generateBuddyCode()
    for (let i = 0; i < 40 && table[code]; i++) {
      code = generateBuddyCode()
    }
    if (table[code]) {
      throw new Error("Could not allocate a buddy code")
    }
    const account: BuddyAccount = {
      code,
      name,
      progress,
      updatedAt: new Date().toISOString(),
    }
    table[code] = account
    await persistTable(table, filePath, useKv)
    return account
  })
}

export async function mergeAndSave(
  code: string,
  incoming: ProgressMap,
  name?: string,
): Promise<BuddyAccount | null> {
  return withLock(async () => {
    const { table, filePath, useKv } = await loadTable()
    const existing = table[code]
    if (!existing) return null
    const account: BuddyAccount = {
      code,
      name: name !== undefined ? name : existing.name,
      progress: mergeProgress(existing.progress, incoming),
      updatedAt: new Date().toISOString(),
    }
    table[code] = account
    await persistTable(table, filePath, useKv)
    return account
  })
}
