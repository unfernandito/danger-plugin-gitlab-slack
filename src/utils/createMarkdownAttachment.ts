import { MessageAttachment } from "@slack/types"
import { Violation } from "danger"

export function createMarkdownAttachment(title: string, color: string, comments: Violation[]): MessageAttachment {
  const textContent: string = comments.map((comment) => comment.message).join("\n")

  return {
    color,
    fallback: title,
    title,
    text: textContent,
    mrkdwn_in: ["text"],
  }
}
