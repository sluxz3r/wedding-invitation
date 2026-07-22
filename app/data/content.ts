/**
 * Single source of truth for all wedding content.
 * Replace the placeholder values below with the real details —
 * every section on the site reads from this file only.
 *
 * Assumes an Indonesian Muslim wedding — Akad Nikah followed by Resepsi.
 * Adjust freely if that doesn't match your family's context.
 */

export const couple = {
  partnerOne: "Arie",
  partnerOneFull: "Arie Azhari",
  partnerTwo: "Lily",
  partnerTwoFull: "Lily Putri Marito, S.Kep., Ns., M.Kep.",
  hashtag: "#ArieLilyMenikah",
};

export const parents = {
  groom: "Bapak (Alm.) M. Ridwan & Ibu Efrida",
  bride: "Bapak H. Muhd. Dohir Hasibuan, S.Pd & Ibu Dra. Hj. Nurmintahari",
};

// Cover photo shown on the welcome screen. Drop your photo in /public
// (e.g. public/images/cover.jpg) and set src to "/images/cover.jpg" — until
// then a monogram placeholder is shown instead.
export const coverPhoto = {
  src: "/images/welcome.png" as string | null,
  alt: `${couple.partnerOneFull} & ${couple.partnerTwoFull}`,
};

// ISO 8601 — used to drive the live countdown. Keep this the Akad Nikah start time.
export const weddingDateISO = "2026-08-08T09:00:00";

export const weddingDateDisplay = "Sabtu, 08 Agustus 2026";

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
    label: "Akad Nikah",
    time: "09.00 WIB",
    venueName: "Kediaman Keluarga Mempelai Wanita",
    address: "Pasar Matanggor, Pintu Padang, Kec. Batang Onang, Kabupaten Padang Lawas Utara, Sumatera Utara 22762",
    dateTimeISO: "2026-08-08T09:00:00",
    endTimeISO: "2026-08-08T10:00:00",
    note: "",
  },
  {
    id: "resepsi",
    label: "Resepsi",
    time: "10.30 WIB s.d. selesai",
    venueName: "Kediaman Keluarga Mempelai Wanita",
    address: "Pasar Matanggor, Pintu Padang, Kec. Batang Onang, Kabupaten Padang Lawas Utara, Sumatera Utara 22762",
    dateTimeISO: "2026-08-08T10:30:00",
    endTimeISO: "2026-08-08T13:00:00",
    note: "",
  },
];

// Both events are at the same location — one shared map link/pin for both.
export const venueMapUrl = "https://maps.app.goo.gl/bShwDUZuXvAQ6BCw7";

export type RegistryEntry = {
  id: string;
  kind: "bank" | "wishlist";
  title: string;
  detail: string;
  ctaLabel: string;
  ctaHref: string;
};

export const registry: RegistryEntry[] = [
  {
    id: "bank",
    kind: "bank",
    title: "Amplop Digital",
    detail: "Bank Mandiri — a.n. Lily Putri Marito · No. Rek. 1830005507735",
    ctaLabel: "Salin nomor rekening",
    ctaHref: "1830005507735",
  },
];

export const rsvpDeadlineDisplay = "25 Juli 2026";
