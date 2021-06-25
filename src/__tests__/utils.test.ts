import { Violation } from "danger"
import { createAttachment } from "../utils/createAttachment"
import { createMarkdownAttachment } from "../utils/createMarkdownAttachment"
import { getDynamicEmoji } from "../utils/getDynamicEmoji"
import { failsResults, warnResults, emptyResults, summaryResults } from "./danger-mock"
import { MessageAttachment } from "@slack/types"

describe("getDynamicEmoji()", () => {
  it("should return an angry emoji if there is at least a fail", () => {
    const result = getDynamicEmoji(failsResults.fails, failsResults.warnings)
    expect(result).toBe(":rage:")
  })

  it("should return an neutral face emoji if there is no fail and at least a warning", () => {
    const result = getDynamicEmoji(warnResults.fails, warnResults.warnings)
    expect(result).toBe(":neutral_face:")
  })

  it("should return an happy face emoji if there is no fail and no warning", () => {
    const result = getDynamicEmoji(emptyResults.fails, emptyResults.warnings)
    expect(result).toBe(":blush:")
  })

  it("should return an angry emoji if there is at least a fail and some warning", () => {
    const result = getDynamicEmoji(summaryResults.fails, summaryResults.warnings)
    expect(result).toBe(":rage:")
  })
})

describe("createAttachment()", () => {
  it("should return an attachment with a title, a black color and one violation", () => {
    const violations: Violation[] = [{ message: "This is a violation" }]
    const result: MessageAttachment = createAttachment("title", "#000000", violations)
    expect(result).toEqual({
      color: "#000000",
      fallback: "title (1)",
      title: "title (1)",
      text: "• This is a violation",
      mrkdwn_in: ["text"],
    })
  })
})

describe("createMarkdownAttachment()", () => {
  it("should return an attachment with a title, a black color and one violation", () => {
    const markdowns: Violation[] = [{ message: "This is markdown" }]
    const result: MessageAttachment = createMarkdownAttachment("title", "#000000", markdowns)
    expect(result).toEqual({
      color: "#000000",
      fallback: "title",
      title: "title",
      text: "This is markdown",
      mrkdwn_in: ["text"],
    })
  })
})
