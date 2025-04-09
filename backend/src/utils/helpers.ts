import "dotenv/config";

interface OpenNoResponseData {
  days: number;
  hours: number;
  mins: number;
}

const SERVER_LINK = process.env.SERVER_LINK;
let timeoutId: NodeJS.Timeout;

export const pingBot = () => {
  if (!SERVER_LINK) return;

  const attemptPing = () => {
    fetch(SERVER_LINK)
      .then((res) => res.text())
      .then((text) => console.log(`Ping successful: ${text}`))
      .catch((err) => {
        clearTimeout(timeoutId);
        console.log(`Ping failed, retrying: ${err}`);
        timeoutId = setTimeout(attemptPing, 5000);
      });
  };

  attemptPing();
};

export function DayHourMinuteToSeconds(
  days: number,
  hours: number,
  minutes: number
): number {
  return days * 86400 + hours * 3600 + minutes * 60;
}

export const convertToDateOrNumber = (
  data: OpenNoResponseData
  // returnAsDate: boolean = false
) => {
  const { days, hours, mins } = data;

  // Convert days, hours, minutes to milliseconds
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const millisecondsInAnHour = 60 * 60 * 1000;
  const millisecondsInAMinute = 60 * 1000;

  // Calculate total time in milliseconds
  const totalMilliseconds =
    days * millisecondsInADay +
    hours * millisecondsInAnHour +
    mins * millisecondsInAMinute;

  // If returnAsDate is true, return a Date object representing that time in the past
  const date = new Date();
  date.setTime(date.getTime() - totalMilliseconds); // Subtract the total time from the current date
  return date;

  // Otherwise, return the total milliseconds
  // return totalMilliseconds;
};
