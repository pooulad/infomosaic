export const FormatSizeByBytes = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "Kb", "Mb", "Gb", "Tb"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
};

export const UptimeCalculatorBySeconds = (seconds: number) => {
  const days = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  const formattedDays = days > 0 ? `${days}d ` : "";
  const formattedHours = hours > 0 ? `${hours}h ` : "";
  const formattedMinutes = minutes > 0 ? `${minutes}m ` : "";
  const formattedSeconds = `${seconds}s`;

  return `${formattedDays}${formattedHours}${formattedMinutes}${formattedSeconds}`;
};
