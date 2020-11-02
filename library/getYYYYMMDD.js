export default function getYYYYMMDD(date) {
  const d = new Date(date);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000)
    .toISOString()
    .split("T")[0];
}
