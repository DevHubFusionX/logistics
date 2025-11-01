export const formatCurrency = (amount, currency = "₦") =>
  `${currency}${Number(amount).toLocaleString()}`;

export const formatDate = (date, format = "short") => {
  const d = new Date(date);
  if (format === "short") return d.toLocaleDateString();
  if (format === "long")
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  if (format === "time") return d.toLocaleTimeString();
  return d.toLocaleString();
};

export const formatWeight = (kg) =>
  kg >= 1000 ? `${(kg / 1000).toFixed(1)}t` : `${kg}kg`;

export const formatDistance = (km) =>
  km >= 1000 ? `${(km / 1000).toFixed(1)}k km` : `${km} km`;

export const truncate = (str, length = 50) =>
  str?.length > length ? `${str.slice(0, length)}...` : str;

export const formatPhone = (phone) =>
  phone?.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

export const formatPercentage = (value, decimals = 1) => {
  const num = Number(value);
  if (isNaN(num)) return "0%";
  return `${num.toFixed(decimals)}%`;
};
