/**
 * Every fixed string the interface itself speaks — labels, headings, buttons,
 * form feedback, and the text only a screen reader hears.
 *
 * Wedding *details* (dates, venues, the parents' names, gift copy) are not
 * here; they live in `content.ts`, which is written per language the same way.
 * Anything that needs a detail spliced into it takes it as an argument, so this
 * file never reaches into the content.
 *
 * `en` is the shape of record: `id` is typed against it, so a key added on one
 * side fails to compile until the other side has it too.
 */

import type { Locale } from "@/app/_lib/i18n";

const en = {
  meta: {
    description: (weddingDate: string) =>
      `With gratitude, we invite you to celebrate our wedding — ${weddingDate}.`,
  },

  welcome: {
    eyebrow: "The Wedding Of",
    openInvitation: "Open Invitation",
  },

  /** Shared by the header nav and the footer chips — one set of section names. */
  sections: {
    top: "Top",
    details: "Events",
    ngunduhMantu: "Ngunduh Mantu",
    ucapan: "Wishes",
    registry: "Gifts",
  },

  nav: {
    backToTop: (names: string) => `${names} — back to top`,
    sectionNavigation: "Section navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  /** Words that ride along in the custom cursor on pointer devices. */
  cursor: {
    top: "Top",
    view: "View",
    click: "Click",
    play: "Play",
    pause: "Pause",
  },

  hero: {
    sonOf: "Son of",
    daughterOf: "Daughter of",
    invitation:
      "With great respect and joy, we cordially invite you to share in the celebration of our wedding.",
    scroll: "Scroll",
    lineage: (groom: string, groomParents: string, bride: string, brideParents: string) =>
      `${groom}, son of ${groomParents}. ${bride}, daughter of ${brideParents}.`,
  },

  events: {
    heading: "Two ceremonies, one blessed day.",
    addToCalendar: "Add to Calendar",
    viewOnMaps: "View Location on Google Maps",
    calendarTitle: (names: string) => `Ceremony & Reception — ${names}`,
    calendarDescription: (ceremonyTime: string, receptionTime: string) =>
      `Marriage ceremony at ${ceremonyTime}, followed by the reception at ${receptionTime}.`,
  },

  ngunduhMantu: {
    heading: "And once more, at the groom's family home.",
    calendarTitle: (label: string, names: string) => `${label} — ${names}`,
    calendarDescription: (label: string, venue: string, time: string) =>
      `${label} at ${venue}, from ${time}.`,
  },

  countdown: {
    eyebrow: "Countdown",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    announceArrived: "The day we've waited for is here.",
    announceRemaining: (days: number, hours: number) =>
      `${days} days and ${hours} hours to go.`,
  },

  ucapan: {
    eyebrow: "Wishes & Prayers",
    heading: "Leave us your warmest wishes.",
    nameLabel: "Name",
    messageLabel: "Wishes & Prayers",
    nameRequired: "Please enter your name.",
    messageRequired: "Please write your wishes or prayer.",
    submit: "Send Wishes",
    submitting: "Sending…",
    sent: "Sent",
    success: "Thank you for your wishes and prayers — they mean the world to us.",
    /** Keyed by the `code` the guestbook route returns, plus a local fallback. */
    errors: {
      generic: "Something went wrong. Please try again in a moment.",
      invalid: "Something in the form isn't quite right. Please check and try again.",
      unconfigured: "The guestbook isn't ready yet. Please try again later.",
      rate_limited: "You've just sent a wish. Please wait a few minutes before sending another.",
      save_failed: "Could not save your wish. Please try again in a moment.",
    },
  },

  registry: {
    heading: "Your blessing is the greatest gift. But should you wish to share a token of love —",
    copied: "Copied",
  },

  footer: {
    heading: "See you on our happy day.",
    navigation: "Footer navigation",
    madeWith: (names: string) => `Made with love, for ${names}.`,
  },

  music: {
    nowPlaying: "Now playing",
    paused: "Paused",
    playLabel: (track: string) => `Play music — ${track}`,
    pauseLabel: (track: string) => `Pause music — ${track}`,
  },

  language: {
    label: "Language",
    switchTo: (language: string) => `Switch to ${language}`,
  },
};

export type Dictionary = typeof en;

const id: Dictionary = {
  meta: {
    description: (weddingDate) =>
      `Dengan penuh rasa syukur, kami mengundang Anda untuk merayakan hari pernikahan kami — ${weddingDate}.`,
  },

  welcome: {
    eyebrow: "Pernikahan",
    openInvitation: "Buka Undangan",
  },

  sections: {
    top: "Atas",
    details: "Acara",
    ngunduhMantu: "Ngunduh Mantu",
    ucapan: "Ucapan",
    registry: "Hadiah",
  },

  nav: {
    backToTop: (names) => `${names} — kembali ke atas`,
    sectionNavigation: "Navigasi bagian",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
  },

  cursor: {
    top: "Atas",
    view: "Lihat",
    click: "Klik",
    play: "Putar",
    pause: "Jeda",
  },

  hero: {
    sonOf: "Putra dari",
    daughterOf: "Putri dari",
    invitation:
      "Dengan penuh rasa hormat dan sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk berkenan hadir dan berbagi kebahagiaan di hari pernikahan kami.",
    scroll: "Gulir",
    lineage: (groom, groomParents, bride, brideParents) =>
      `${groom}, putra dari ${groomParents}. ${bride}, putri dari ${brideParents}.`,
  },

  events: {
    heading: "Dua acara, satu hari yang penuh berkah.",
    addToCalendar: "Tambahkan ke Kalender",
    viewOnMaps: "Lihat Lokasi di Google Maps",
    calendarTitle: (names) => `Akad Nikah & Resepsi — ${names}`,
    calendarDescription: (ceremonyTime, receptionTime) =>
      `Akad nikah pukul ${ceremonyTime}, dilanjutkan resepsi pukul ${receptionTime}.`,
  },

  ngunduhMantu: {
    heading: "Dan sekali lagi, di kediaman keluarga mempelai pria.",
    calendarTitle: (label, names) => `${label} — ${names}`,
    calendarDescription: (label, venue, time) => `${label} di ${venue}, mulai pukul ${time}.`,
  },

  countdown: {
    eyebrow: "Hitung Mundur",
    days: "Hari",
    hours: "Jam",
    minutes: "Menit",
    seconds: "Detik",
    announceArrived: "Hari yang kami nantikan telah tiba.",
    announceRemaining: (days, hours) => `${days} hari dan ${hours} jam lagi.`,
  },

  ucapan: {
    eyebrow: "Ucapan & Doa",
    heading: "Tinggalkan ucapan dan doa terbaik Anda.",
    nameLabel: "Nama",
    messageLabel: "Ucapan & Doa",
    nameRequired: "Mohon isi nama Anda.",
    messageRequired: "Mohon tuliskan ucapan atau doa Anda.",
    submit: "Kirim Ucapan",
    submitting: "Mengirim…",
    sent: "Terkirim",
    success: "Terima kasih atas ucapan dan doanya — sangat berarti bagi kami.",
    errors: {
      generic: "Terjadi kesalahan. Mohon coba lagi sesaat lagi.",
      invalid: "Ada isian yang belum sesuai. Mohon periksa kembali lalu kirim ulang.",
      unconfigured: "Buku ucapan belum siap. Mohon coba lagi nanti.",
      rate_limited:
        "Anda baru saja mengirim ucapan. Mohon tunggu beberapa menit sebelum mengirim lagi.",
      save_failed: "Ucapan Anda belum tersimpan. Mohon coba lagi sesaat lagi.",
    },
  },

  registry: {
    heading: "Doa dan restu Anda adalah hadiah terindah. Namun bila berkenan berbagi tanda kasih —",
    copied: "Tersalin",
  },

  footer: {
    heading: "Sampai jumpa di hari bahagia kami.",
    navigation: "Navigasi footer",
    madeWith: (names) => `Dibuat dengan cinta, untuk ${names}.`,
  },

  music: {
    nowPlaying: "Sedang diputar",
    paused: "Dijeda",
    playLabel: (track) => `Putar musik — ${track}`,
    pauseLabel: (track) => `Jeda musik — ${track}`,
  },

  language: {
    label: "Bahasa",
    switchTo: (language) => `Ganti ke ${language}`,
  },
};

export const dictionaries: Record<Locale, Dictionary> = { id, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
