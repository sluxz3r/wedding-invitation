/**
 * Single source of truth for all wedding content.
 * Replace the placeholder values below with the real details —
 * every section on the site reads from this file only.
 *
 * Assumes an Indonesian Muslim wedding — the Marriage Ceremony (Akad Nikah)
 * followed by the Reception. Adjust freely if that doesn't match your context.
 */

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

export const parents = {
  groom: "Mr. (the late) M. Ridwan & Mrs. Efrida",
  bride: "Mr. H. Muhd. Dohir Hasibuan, S.Pd & Mrs. Dra. Hj. Nurmintahari",
};

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
 * the vinyl player then never renders.
 */
export const music = {
  src: "/audio/wedding-song.mp3" as string | null,
  title: "Our Song",
  artist: "",
};

// ISO 8601 — used to drive the live countdown. Keep this the ceremony start time.
export const weddingDateISO = "2026-08-08T09:00:00";

export const weddingDateDisplay = "Saturday, 8 August 2026";

export type EventDetail = {
  id: string;
  label: string;
  time: string;
  venueName: string;
  address: string;
  dateTimeISO: string;
  endTimeISO: string;
  note: string;
};

export const events: EventDetail[] = [
  {
    id: "akad",
    label: "Marriage Ceremony",
    time: "09:00 AM (WIB)",
    venueName: "Residence of the Bride's Family",
    address: "Pasar Matanggor, Pintu Padang, Batang Onang Subdistrict, North Padang Lawas Regency, North Sumatra 22762",
    dateTimeISO: "2026-08-08T09:00:00",
    endTimeISO: "2026-08-08T10:00:00",
    note: "",
  },
  {
    id: "resepsi",
    label: "Reception",
    time: "10:30 AM (WIB) onwards",
    venueName: "Residence of the Bride's Family",
    address: "Pasar Matanggor, Pintu Padang, Batang Onang Subdistrict, North Padang Lawas Regency, North Sumatra 22762",
    dateTimeISO: "2026-08-08T10:30:00",
    endTimeISO: "2026-08-08T13:00:00",
    note: "",
  },
];

// Both events are at the same location — one shared map link/pin for both.
export const venueMapUrl = "https://maps.app.goo.gl/bShwDUZuXvAQ6BCw7";

// Ngunduh Mantu — the homecoming reception hosted by the groom's family,
// held a month after the ceremony and in a different city, so it gets its own
// date, venue and map pin rather than sitting in the `events` list above.
export const ngunduhMantu = {
  label: "Ngunduh Mantu",
  dateDisplay: "Wednesday, 9 September 2026",
  time: "10:00 AM (WIB) onwards",
  venueName: "Residence of the Groom's Family",
  address:
    "Jl. H. A. Halim No. 47, Paya Roba, Binjai Barat Subdistrict, Binjai City, North Sumatra 20748",
  dateTimeISO: "2026-09-09T10:00:00",
  // "Onwards" has no fixed end — this is only here so the calendar entry gets
  // a sensible block of time rather than a zero-length one.
  endTimeISO: "2026-09-09T14:00:00",
  mapUrl: "https://maps.app.goo.gl/8UFW4fJ6Dg77Zgsz7",
  note: "The homecoming celebration hosted by the groom's family in Binjai — a second chance to gather for those who could not join us in Padang Lawas.",
};

export type RegistryEntry = {
  id: string;
  kind: "bank" | "wishlist" | "link";
  title: string;
  detail: string;
  ctaLabel: string;
  ctaHref: string;
};

export const registry: RegistryEntry[] = [
  {
    id: "bank-bride",
    kind: "bank",
    title: "The Bride's Envelope",
    detail: "Bank Mandiri · Lily Putri Marito · Acc. No. 1830005507735",
    ctaLabel: "Copy account number",
    ctaHref: "1830005507735",
  },
  {
    id: "bank-groom",
    kind: "bank",
    title: "The Groom's Envelope",
    detail: "Bank Mandiri · Arie Azhari · Acc. No. 1370016771939",
    ctaLabel: "Copy account number",
    ctaHref: "1370016771939",
  },
  {
    id: "sociabuzz",
    kind: "link",
    title: "For Our Friends Abroad",
    detail:
      "For our dear friends overseas — should you wish to send a token of love, SociaBuzz makes it effortless with international cards and payment methods. Thank you for your kindness.",
    ctaLabel: "Send a gift via SociaBuzz",
    ctaHref: "https://sociabuzz.com/arieandlily",
  },
];

export const rsvpDeadlineDisplay = "25 July 2026";
