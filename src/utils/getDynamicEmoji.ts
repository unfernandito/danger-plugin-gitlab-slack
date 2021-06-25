import { Violation } from "danger"

export function getDynamicEmoji(errors: Violation[], warnings: Violation[]): string {
  const emojiError = ":rage:"
  const emojiWarning = ":neutral_face:"
  const emojiHealthy = ":blush:"

  if (errors.length > 0) {
    return emojiError
  } else if (warnings.length > 0) {
    return emojiWarning
  } else {
    return emojiHealthy
  }
}
