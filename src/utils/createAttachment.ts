import { Violation } from "danger"
import { MessageAttachment } from "@slack/types"

export function createAttachment(title: string, color: string, violations: Violation[]): MessageAttachment {
  const titleWithCount = `${title} (${violations.length})`
  const textContent: string = violations.map((violation) => `• ${violation.message}`).join("\n")

  return {
    color,
    fallback: titleWithCount,
    title: titleWithCount,
    text: textContent,
    mrkdwn_in: ["text"],
  }
}
