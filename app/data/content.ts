/**
 * Single source of truth for all wedding content.
 * Replace the placeholder values below with the real details —
 * every section on the site reads from this file only.
 *
 * Assumes an Indonesian Muslim wedding — the Marriage Ceremony (Akad Nikah)
 * followed by the Reception. Adjust freely if that doesn't match your context.
 *
 * The file is split in two: facts that read the same in any language (names,
 * ISO timestamps, account numbers, map links) live at the top level, while
 * anything a guest reads as prose is written once per language further down and
 * served through `getContent(locale)`. Sections call that; nothing imports a
 * language's strings directly.
 */

import type { Locale } from "@/app/_lib/i18n";

// Names are stored without their academic titles and the titles kept beside
// them, so each surface can pick: the hero states the formal name in full,
// while the page title, share card and calendar entries stay readable.
export const couple = {
  partnerOne: "Arie",
  partnerOneFull: "Arie Azhari",
  partnerOneDegree: "A.Md.Kep.", // D3 Keperawatan — Ahli Madya Keperawatan
  partnerTwo: "Lily",
  partnerTwoFull: "Lily Putri Marito",
  partnerTwoDegree: "S.Kep., Ns., M.Kep.",
  hashtag: "#ArieAndLily",
};

/** Full name with the academic title appended — the formal invitation form. */
export const partnerOneFormal = `${couple.partnerOneFull}, ${couple.partnerOneDegree}`;
export const partnerTwoFormal = `${couple.partnerTwoFull}, ${couple.partnerTwoDegree}`;

// Cover photo shown on the welcome screen. Drop your photo in /public
// (e.g. public/images/cover.jpg) and set src to "/images/cover.jpg" — until
// then a monogram placeholder is shown instead.
export const coverPhoto = {
  src: "/images/welcome.png" as string | null,
  alt: `${couple.partnerOneFull} & ${couple.partnerTwoFull}`,
};

/**
 * Background music.
 *
 * Drop the audio file into `public/audio/` and name it `wedding-song.mp3`
 * (or rename it here — `src` is a path relative to /public). MP3 is the safest
 * format: every browser plays it. Keep it under ~4 MB / 128–192 kbps so the
 * first load stays quick, and prefer a track that loops without an awkward
 * seam, since it repeats for as long as the page is open.
 *
 * Playback starts from the "Open Invitation" button — browsers only allow
 * audio that a real tap or click asked for — and the vinyl player at the
 * bottom-left toggles it after that. Set `src` to null to drop music entirely;
 * the vinyl player then never renders. The track's display title is translated
 * (see `musicTitle` below); an artist is a proper name, so it isn't.
 */
export const music = {
  src: "/audio/wedding-song.mp3" as string | null,
  artist: "",
};

// ISO 8601 — used to drive the live countdown. Keep this the ceremony start time.
export const weddingDateISO = "2026-08-08T09:00:00";

// Both events are at the same location — one shared map link/pin for both.
export const venueMapUrl = "https://maps.app.goo.gl/bShwDUZuXvAQ6BCw7";

/** When and how long each event runs — the calendar entries read these. */
const eventSchedule = [
  { id: "akad", dateTimeISO: "2026-08-08T09:00:00", endTimeISO: "2026-08-08T10:00:00" },
  { id: "resepsi", dateTimeISO: "2026-08-08T10:30:00", endTimeISO: "2026-08-08T13:00:00" },
] as const;

/**
 * Ngunduh Mantu — the homecoming reception hosted by the groom's family,
 * held a month after the ceremony and in a different city, so it gets its own
 * date, venue and map pin rather than sitting in the events list above.
 * `endTimeISO` only exists so the calendar entry gets a sensible block of time
 * rather than a zero-length one; "onwards" has no fixed end.
 */
const ngunduhMantuSchedule = {
  dateTimeISO: "2026-09-12T10:00:00",
  endTimeISO: "2026-09-12T14:00:00",
  mapUrl: "https://maps.app.goo.gl/8UFW4fJ6Dg77Zgsz7",
};

/** Where a gift can actually go — untranslatable by nature. */
const registryTargets = [
  { id: "bank-bride", kind: "bank", ctaHref: "1830005507735" },
  { id: "bank-groom", kind: "bank", ctaHref: "1370016771939" },
  { id: "sociabuzz", kind: "link", ctaHref: "https://sociabuzz.com/arieandlily" },
] as const;

type EventStrings = {
  label: string;
  time: string;
  venueName: string;
  address: string;
  note: string;
};

export type EventDetail = EventStrings & {
  id: string;
  dateTimeISO: string;
  endTimeISO: string;
};

type NgunduhMantuStrings = EventStrings & { dateDisplay: string };

export type NgunduhMantuDetail = NgunduhMantuStrings & typeof ngunduhMantuSchedule;

type RegistryStrings = {
  title: string;
  detail: string;
  ctaLabel: string;
};

export type RegistryEntry = RegistryStrings & {
  id: string;
  kind: "bank" | "wishlist" | "link";
  ctaHref: string;
};

/** Everything on this page that a guest reads as prose, per language. */
type ContentStrings = {
  weddingDateDisplay: string;
  parents: { groom: string; bride: string };
  musicTitle: string;
  events: EventStrings[];
  ngunduhMantu: NgunduhMantuStrings;
  registry: RegistryStrings[];
  rsvpDeadlineDisplay: string;
};

const id: ContentStrings = {
  weddingDateDisplay: "Sabtu, 8 Agustus 2026",
  parents: {
    groom: "Bapak (Almarhum) M. Ridwan, S.Sos & Ibu Efrida",
    bride: "Bapak H. Muhd. Dohir Hasibuan, S.Pd & Ibu Dra. Hj. Nurmintahari",
  },
  musicTitle: "Lagu Kami",
  events: [
    {
      label: "Akad Nikah",
      time: "09.00 WIB",
      venueName: "Kediaman Keluarga Mempelai Wanita",
      address:
        "Pasar Matanggor, Pintu Padang, Kecamatan Batang Onang, Kabupaten Padang Lawas Utara, Sumatera Utara 22762",
      note: "",
    },
    {
      label: "Resepsi",
      time: "10.30 WIB sampai selesai",
      venueName: "Kediaman Keluarga Mempelai Wanita",
      address:
        "Pasar Matanggor, Pintu Padang, Kecamatan Batang Onang, Kabupaten Padang Lawas Utara, Sumatera Utara 22762",
      note: "",
    },
  ],
  ngunduhMantu: {
    label: "Ngunduh Mantu",
    dateDisplay: "Sabtu, 12 September 2026",
    time: "10.00 WIB sampai selesai",
    venueName: "Kediaman Keluarga Mempelai Pria",
    address:
      "Jl. H. A. Halim No. 47, Paya Roba, Kecamatan Binjai Barat, Kota Binjai, Sumatera Utara 20748",
    note: "Perayaan ngunduh mantu yang digelar keluarga mempelai pria di Binjai — kesempatan kedua untuk berkumpul bagi Bapak/Ibu/Saudara/i yang belum dapat hadir di Padang Lawas.",
  },
  registry: [
    {
      title: "Amplop Mempelai Wanita",
      detail: "Bank Mandiri · Lily Putri Marito · No. Rek. 1830005507735",
      ctaLabel: "Salin nomor rekening",
    },
    {
      title: "Amplop Mempelai Pria",
      detail: "Bank Mandiri · Arie Azhari · No. Rek. 1370016771939",
      ctaLabel: "Salin nomor rekening",
    },
    {
      title: "Untuk Sahabat di Luar Negeri",
      detail:
        "Bagi sahabat kami yang berada di luar negeri — bila berkenan mengirimkan tanda kasih, SociaBuzz memudahkannya dengan kartu dan metode pembayaran internasional. Terima kasih atas kebaikan Anda.",
      ctaLabel: "Kirim hadiah lewat SociaBuzz",
    },
  ],
  rsvpDeadlineDisplay: "25 Juli 2026",
};

const en: ContentStrings = {
  weddingDateDisplay: "Saturday, 8 August 2026",
  parents: {
    groom: "Mr. (the late) M. Ridwan, S.Sos & Mrs. Efrida",
    bride: "Mr. H. Muhd. Dohir Hasibuan, S.Pd & Mrs. Dra. Hj. Nurmintahari",
  },
  musicTitle: "Our Song",
  events: [
    {
      label: "Marriage Ceremony",
      time: "09:00 AM (WIB)",
      venueName: "Residence of the Bride's Family",
      address:
        "Pasar Matanggor, Pintu Padang, Batang Onang Subdistrict, North Padang Lawas Regency, North Sumatra 22762",
      note: "",
    },
    {
      label: "Reception",
      time: "10:30 AM (WIB) onwards",
      venueName: "Residence of the Bride's Family",
      address:
        "Pasar Matanggor, Pintu Padang, Batang Onang Subdistrict, North Padang Lawas Regency, North Sumatra 22762",
      note: "",
    },
  ],
  ngunduhMantu: {
    label: "Ngunduh Mantu",
    dateDisplay: "Saturday, 12 September 2026",
    time: "10:00 AM (WIB) onwards",
    venueName: "Residence of the Groom's Family",
    address:
      "Jl. H. A. Halim No. 47, Paya Roba, Binjai Barat Subdistrict, Binjai City, North Sumatra 20748",
    note: "The homecoming celebration hosted by the groom's family in Binjai — a second chance to gather for those who could not join us in Padang Lawas.",
  },
  registry: [
    {
      title: "The Bride's Envelope",
      detail: "Bank Mandiri · Lily Putri Marito · Acc. No. 1830005507735",
      ctaLabel: "Copy account number",
    },
    {
      title: "The Groom's Envelope",
      detail: "Bank Mandiri · Arie Azhari · Acc. No. 1370016771939",
      ctaLabel: "Copy account number",
    },
    {
      title: "For Our Friends Abroad",
      detail:
        "For our dear friends overseas — should you wish to send a token of love, SociaBuzz makes it effortless with international cards and payment methods. Thank you for your kindness.",
      ctaLabel: "Send a gift via SociaBuzz",
    },
  ],
  rsvpDeadlineDisplay: "25 July 2026",
};

const contentStrings: Record<Locale, ContentStrings> = { id, en };

export type WeddingContent = {
  weddingDateDisplay: string;
  parents: { groom: string; bride: string };
  musicTitle: string;
  events: EventDetail[];
  ngunduhMantu: NgunduhMantuDetail;
  registry: RegistryEntry[];
  rsvpDeadlineDisplay: string;
};

/**
 * The content of the page in one language, with the language-independent
 * schedule and links folded back in. Position in the `events` / `registry`
 * arrays is what pairs a string with its timestamp or account number, so keep
 * those lists the same length and order in every language.
 */
export function getContent(locale: Locale): WeddingContent {
  const strings = contentStrings[locale];

  return {
    weddingDateDisplay: strings.weddingDateDisplay,
    parents: strings.parents,
    musicTitle: strings.musicTitle,
    events: eventSchedule.map((schedule, i) => ({ ...schedule, ...strings.events[i] })),
    ngunduhMantu: { ...ngunduhMantuSchedule, ...strings.ngunduhMantu },
    registry: registryTargets.map((target, i) => ({ ...target, ...strings.registry[i] })),
    rsvpDeadlineDisplay: strings.rsvpDeadlineDisplay,
  };
}
