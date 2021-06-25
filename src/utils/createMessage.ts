import { IncomingWebhookSendArguments } from "@slack/webhook"
import { DangerResults, GitLabMR } from "danger"
import { SlackOptions } from "../types"
import { createAttachment } from "./createAttachment"
import { createMarkdownAttachment } from "./createMarkdownAttachment"
import { getDynamicEmoji } from "./getDynamicEmoji"

export function createMessage(
  pr: Partial<GitLabMR> | GitLabMR,
  resultLists: DangerResults,
  options: SlackOptions
): IncomingWebhookSendArguments {
  const msg: IncomingWebhookSendArguments = {
    text: "",
    username: options.username || "DangerJS",
    icon_emoji: options.iconEmoji || ":open_mouth:",
    attachments: [],
  }

  // custom iconUrl if set
  if (options.iconUrl) {
    msg.icon_url = options.iconUrl
  }

  // custom channel if set
  if (options.channel) {
    msg.channel = options.channel
  }

  // send only a custom text
  if (options.text) {
    msg.text = `${options.text}`
  } else {
    // send only the report

    const fails = resultLists.fails
    const warnings = resultLists.warnings
    const messages = resultLists.messages
    const markdowns = resultLists.markdowns

    const prInfo = pr ? `<${pr.web_url}|*PR#${pr.id}* - ${pr.title}>` : "not info found"
    const prAuthor = pr ? `<${pr.author?.avatar_url}|${pr.author?.username}>` : "not author found"

    msg.icon_emoji = getDynamicEmoji(fails, warnings)
    msg.text = `${prInfo} by ${prAuthor}\n${pr.description}`

    // add violations as slack attachments
    if (!fails.length && !warnings.length && !messages.length) {
      msg.text += "\nNo output to show."
    } else {
      if (msg.attachments) {
        if (fails.length > 0) {
          msg.attachments.push(createAttachment("Fails", "danger", fails))
        }

        if (warnings.length > 0) {
          msg.attachments.push(createAttachment("Warnings", "warning", warnings))
        }

        if (messages.length > 0) {
          msg.attachments.push(createAttachment("Messages", "#999", messages))
        }

        if (markdowns.length > 0) {
          msg.attachments.push(createMarkdownAttachment("Comments", "#EEE", markdowns))
        }
      }
    }
  }

  return msg
}
