type WhatsAppLinkInput = {
  /**
   * International format — country code first, no leading "+". Separators are
   * stripped, so "+62 812-3456-7890" and "6281234567890" both work.
   */
  phone: string;
  /** Typed into the chat for the guest; they only have to press send. */
  message: string;
};

/**
 * A wa.me link with the message already composed. On a phone this hands off to
 * the WhatsApp app, on a desktop to web.whatsapp.com.
 *
 * The message is escaped with encodeURIComponent rather than URLSearchParams
 * because the latter writes a space as "+", which WhatsApp shows literally.
 */
export function whatsappUrl({ phone, message }: WhatsAppLinkInput): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
