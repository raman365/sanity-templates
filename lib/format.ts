/** Formats an ISO date string as e.g. "Jan 2023". */
export function formatMonthYear(date?: string): string {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateRange(startDate?: string, endDate?: string): string {
  const start = formatMonthYear(startDate);
  const end = endDate ? formatMonthYear(endDate) : "Present";
  if (!start) return end === "Present" ? "" : end;
  return `${start} — ${end}`;
}
