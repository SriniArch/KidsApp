const ANIMALS = [
  "panda",
  "tiger",
  "otter",
  "koala",
  "whale",
  "eagle",
  "robin",
  "puppy",
  "kitten",
  "bunny",
  "horse",
  "zebra",
  "giraffe",
  "monkey",
  "frog",
  "duck",
  "owl",
  "fox",
  "wolf",
  "seal",
  "dolphin",
  "turtle",
  "penguin",
  "hippo",
  "camel",
  "llama",
  "sheep",
  "mouse",
  "moose",
  "crab",
  "shark",
  "parrot",
  "toucan",
  "swan",
  "goose",
  "raccoon",
  "beaver",
  "hedgehog",
  "squirrel",
  "jaguar",
  "cheetah",
  "leopard",
] as const

const ANIMAL_SET = new Set<string>(ANIMALS)
const CODE_PATTERN = /^[a-z]+-\d{3}$/

export function generateBuddyCode(): string {
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)]
  const digits = String(100 + Math.floor(Math.random() * 900))
  return `${animal}-${digits}`
}

export function normalizeBuddyCode(raw: string): string {
  const compact = raw.trim().toLowerCase().replace(/[\s_]+/g, "-")
  const match = compact.match(/^([a-z]+)[-\s]?(\d{3})$/)
  if (match) return `${match[1]}-${match[2]}`
  return compact
}

export function isBuddyCode(value: string): boolean {
  return CODE_PATTERN.test(value) && ANIMAL_SET.has(value.split("-")[0] ?? "")
}

export function displayBuddyCode(code: string): string {
  return code.toUpperCase()
}

export function sanitizeDisplayName(raw: unknown): string {
  if (typeof raw !== "string") return ""
  return raw.replace(/\s+/g, " ").trim().slice(0, 32)
}
