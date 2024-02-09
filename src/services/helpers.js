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
