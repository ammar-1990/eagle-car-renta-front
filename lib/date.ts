import { formatInTimeZone } from "date-fns-tz";

export function convertDateToISOString(date: Date | undefined) {
    if (!date) {
      return undefined;
    }
  
    // Manually construct the ISO string in YYYY-MM-DD format
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();
  
    // Pad single digit month and day with leading zeros
    const paddedMonth = month.toString().padStart(2, "0");
    const paddedDay = day.toString().padStart(2, "0");
  
    return `${year}-${paddedMonth}-${paddedDay}`;
  }


  
 export function combineDateAndTimeToUTC(
  dateString: string,
  timeString: string
) {
  // Combine the date and time strings
  const combinedDateTimeString = `${dateString}T${timeString}:00.000Z`;

  // Create a Date object from the combined string
  const utcDate = new Date(combinedDateTimeString);

  return utcDate;
}


export function calculateDuration(startDate: Date, endDate: Date) {
  const msInHour = 1000 * 60 * 60;
  const msInDay = msInHour * 24;
  const msInWeek = msInDay * 7;

  let diff = endDate.getTime() - startDate.getTime();

  const months = Math.floor(diff / (30 * msInDay));
  diff -= months * (30 * msInDay);  // Subtract months

  const weeks = Math.floor(diff / msInWeek);
  diff -= weeks * msInWeek;  // Subtract weeks

  const days = Math.floor(diff / msInDay);
  diff -= days * msInDay;  // Subtract days

  const hours = Math.floor(diff / msInHour);

  return {
    months,
    weeks,
    days,
    hours,
  };
}



export const formatDateUtc = (date:Date)=>{
 return formatInTimeZone(date,'UTC','MMM, dd yyyy - HH:mm')
}