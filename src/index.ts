import { IncomingWebhook, IncomingWebhookSendArguments } from "@slack/webhook"
import { DangerDSLType, DangerResults } from "danger"
import { SlackOptions } from "./types"
import { createMessage } from "./utils/createMessage"

/**
 * Current instance of Danger data
 */
declare const danger: DangerDSLType

/**
 * Current results of Danger run instance
 */
declare let results: DangerResults

/**
 * Report to Slack the result of Danger
 */

export default function slack(options: SlackOptions, customMessage?: IncomingWebhookSendArguments): void {
  const webhook = new IncomingWebhook(options.webhookUrl)

  webhook.send(customMessage ? customMessage : createMessage(danger.gitlab.mr, results, options))
}
