import { GitHubPRDSL } from "danger"
import { SlackOptions } from "../types"
import { createMessage } from "../utils/createMessage"
import { emptyResults, failsResults, summaryResults } from "./danger-mock"

declare const global: Record<string, unknown>

global.warn = jest.fn()
global.message = jest.fn()
global.fail = jest.fn()
global.markdown = jest.fn()
global.warn = undefined
global.message = undefined
global.fail = undefined
global.markdown = undefined

describe("createMessage()", () => {
  let pr: Partial<GitHubPRDSL>
  let options: SlackOptions
  let expectedText: string

  beforeEach(() => {
    const dateString = new Date().toString()
    pr = {
      html_url: "custom_url",
      number: 10,
      title: "super PR",
      body: "Some text in body",
      user: {
        id: 0,
        login: "julon",
        avatar_url: "file://test.png",
        type: "User",
        href: "#",
      },
      state: "open",
      created_at: dateString,
      locked: false,
      updated_at: dateString,
      closed_at: null,
      merged_at: null,
    }

    options = {
      webhookUrl: "url",
      text: "text",
      username: "username",
      iconEmoji: "iconEmoji",
      iconUrl: "iconUrl",
      channel: "#channel",
    }

    expectedText = "<custom_url|*PR#10* - super PR> by <file://test.png|julon>\nSome text in body"
  })

  it("should output the correct options (text, username, iconEmoji, iconUrl, channel) when set", () => {
    const result = createMessage(pr, summaryResults, options)
    expect(result.text).toBe(`text`)
    expect(result.username).toBe("username")
    expect(result.icon_emoji).toBe("iconEmoji")
    expect(result.icon_url).toBe("iconUrl")
    expect(result.channel).toBe("#channel")
  })

  it("should output the report text when no text is set", () => {
    const result = createMessage(pr, summaryResults, { webhookUrl: "" })
    expect(result.text).toBe(expectedText)
  })

  it("should output no attachment and append a message saying nothing to show when results is empty", () => {
    const result = createMessage(pr, emptyResults, { webhookUrl: "" })
    expect(result.text).toBe(`${expectedText}\nNo output to show.`)
  })

  it("should output one fail attachment when results contains a fail", () => {
    const result = createMessage(pr, failsResults, { webhookUrl: "" })
    const attachment = result.attachments ? result.attachments[0] : {}
    expect(attachment).toEqual({
      color: "danger",
      fallback: "Fails (1)",
      title: "Fails (1)",
      text: "• Failing message",
      mrkdwn_in: ["text"],
    })
  })
})
