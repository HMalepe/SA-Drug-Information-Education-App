import type { OutboundMessage, SendResult } from "@materia/shared";

function resendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

function twilioConfigured(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID?.trim() &&
      process.env.TWILIO_AUTH_TOKEN?.trim() &&
      process.env.TWILIO_FROM_NUMBER?.trim(),
  );
}

/**
 * Dispatch outbound reminder. Live providers only when keys set.
 * Never sends identifiable health data beyond short support reminder copy.
 */
export async function sendOutbound(message: OutboundMessage): Promise<SendResult> {
  if (message.channel === "in_app") {
    return {
      channel: "in_app",
      provider: "stub",
      status: "sent_stub",
      to: message.to,
      detail: "Delivered to in-app notification log (stub).",
    };
  }

  if (message.channel === "email") {
    if (!resendConfigured()) {
      return {
        channel: "email",
        provider: "stub",
        status: "sent_stub",
        to: message.to,
        detail: "Resend unset — email logged locally only. Set RESEND_API_KEY to send.",
      };
    }
    // Live Resend call intentionally deferred until DPA + templates approved.
    return {
      channel: "email",
      provider: "resend",
      status: "queued",
      to: message.to,
      detail: "RESEND_API_KEY present — wire template send in production deploy.",
    };
  }

  if (message.channel === "sms" || message.channel === "whatsapp") {
    if (!twilioConfigured()) {
      return {
        channel: message.channel,
        provider: "stub",
        status: "sent_stub",
        to: message.to,
        detail: "Twilio unset — message logged locally only. Set TWILIO_* to send.",
      };
    }
    return {
      channel: message.channel,
      provider: "twilio",
      status: "queued",
      to: message.to,
      detail: "Twilio credentials present — WhatsApp/SMS Business API send lands in production deploy.",
    };
  }

  return {
    channel: message.channel,
    provider: "stub",
    status: "skipped",
    to: message.to,
    detail: "Unknown channel",
  };
}

export function messagingProvidersStatus() {
  return {
    email: resendConfigured() ? "resend" : "stub",
    sms: twilioConfigured() ? "twilio" : "stub",
    whatsapp: twilioConfigured() ? "twilio" : "stub",
    in_app: "stub",
  };
}
