type CalendarEventInput = {
  title: string;
  description: string;
  location: string;
  startISO: string;
  endISO: string;
};

function toCompactDateTime(iso: string): string {
  // "2027-04-17T15:00:00" -> "20270417T150000"
  return iso.replace(/[-:]/g, "").replace(/\.\d+$/, "");
}

export function googleCalendarUrl({
  title,
  description,
  location,
  startISO,
  endISO,
}: CalendarEventInput): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: description,
    location,
    dates: `${toCompactDateTime(startISO)}/${toCompactDateTime(endISO)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
