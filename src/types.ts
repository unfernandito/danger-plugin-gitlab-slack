export interface SlackOptions {
  webhookUrl: string
  text?: string
  username?: string
  iconEmoji?: string
  iconUrl?: string
  channel?: string
}

export interface SlackAttachment {
  color: string
  fallback: string
  title: string
  text: string
  mrkdwn_in?: string[]
}

export interface SlackMessage {
  text: string
  username?: string
  iconEmoji?: string
  iconUrl?: string
  channel?: string
  attachments: SlackAttachment[]
}
