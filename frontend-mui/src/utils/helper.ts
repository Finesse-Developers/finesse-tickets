export const convertToDaysHoursMins = (pastDate: Date | string) => {
  // Ensure pastDate is a Date object
  const date = new Date(pastDate);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date provided");
  }

  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - date.getTime()); // avoid negative values

  const msInMinute = 60 * 1000;
  const msInHour = 60 * msInMinute;
  const msInDay = 24 * msInHour;

  const days = Math.floor(diffMs / msInDay);
  const hours = Math.floor((diffMs % msInDay) / msInHour);
  const mins = Math.floor((diffMs % msInHour) / msInMinute);

  return { days, hours, mins };
};
