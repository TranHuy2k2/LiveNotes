import dayjs from "dayjs";

export function randomUsername() {
  return `user-${Math.floor(Math.random() * 1000)}`;
}

export const getLocation = async (setCountryCode) => {
  try {
    const res = await fetch("https://api.db-ip.com/v2/free/self");
    const { countryCode, error } = await res.json();
    if (error) throw new Error(error);

    setCountryCode(countryCode);
    localStorage.setItem("countryCode", countryCode);
    return countryCode;
  } catch (error) {
    console.error(`error getting location from api.db-ip.com:`, error.message);
  }
};

export function formatDateShow(dateString) {
  const date = dayjs(dateString);
  const now = dayjs();
  const diff = now.diff(date, "day");
  if (diff === 0) {
    return date.format("HH:mm");
  }
  if (diff === 1) {
    return "Yesterday";
  }
  return date.format("DD/MM/YYYY");
}
