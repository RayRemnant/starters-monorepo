import { describe, expect, it } from "vitest"

import { deleteDoc, deleteDocs, getDoc, getDocs, setDoc, setDocs } from "./firebase"

const mockDocs = [
  {
    createdAt: new Date().toISOString(),
    email: "testuser@example.com",
    id: Math.random().toString(36).substr(2, 9),
    name: "Test User"
  },
  {
    createdAt: new Date().toISOString(),
    email: "testuser2@example.com",
    id: Math.random().toString(36).substr(2, 9),
    name: "Test User 2"
  }
]

function matchesFields(expected: Record<string, unknown>, actual: Record<string, unknown>) {
  return Object.entries(expected).every(([key, value]) => actual[key] === value)
}

describe("delDoc", () => {
  it("should return the expected object", async () => {
    await deleteDoc("codex", mockDocs[0].id)
    const result = await getDoc("codex", mockDocs[0].id)

    expect(result).toBeUndefined()
  })
})

describe("setDoc & getDoc", () => {
  it("should return the expected object", async () => {
    await setDoc("codex", mockDocs[0])
    const result = await getDoc("codex", mockDocs[0].id)
    expect(result).toBeDefined()
    expect(matchesFields(mockDocs[0], result!)).toBe(true)
  })
})

describe("setDocs & getDocs", () => {
  it("should return the expected objects", async () => {
    await setDocs("codex", mockDocs)
    const result = await getDocs("codex")
    for (const mockDoc of mockDocs) {
      const found = result.find(r => r.id === mockDoc.id)
      expect(found).toBeDefined()
      expect(matchesFields(mockDoc, found!)).toBe(true)
    }
  })
})

describe("deleteDocs", () => {
  it("should return the expected objects", async () => {
    await deleteDocs(
      "codex",
      mockDocs.map(doc => doc.id)
    )
    const result = await getDocs("codex")
    for (const mockDoc of mockDocs) {
      const found = result.find(r => r.id === mockDoc.id)
      expect(found).toBeUndefined()
    }
  })
})
