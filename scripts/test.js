function getTimesString(time) {
  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInMonth = 30 * secondsInDay; // Assuming 30 days in a month
  const secondsInYear = 12 * secondsInMonth; // Assuming 12 months in a year

  // Calculate the number of years
  const year = parseInt(time / secondsInYear);
  let remainingSecond = time % secondsInYear;

  // Calculate the number of months
  const month = parseInt(remainingSecond / secondsInMonth);
  remainingSecond = remainingSecond % secondsInMonth;

  // Calculate the number of days
  const day = parseInt(remainingSecond / secondsInDay);
  remainingSecond = remainingSecond % secondsInDay;

  // Calculate the number of hours
  const hour = parseInt(remainingSecond / secondsInHour);
  remainingSecond = remainingSecond % secondsInHour;

  // Calculate the number of minutes
  const minute = parseInt(remainingSecond / secondsInMinute);
  remainingSecond = remainingSecond % secondsInMinute;

  // Construct the time string
  return `${year > 0 ? year + " year " : ""}${
    month > 0 ? month + " month " : ""
  }${day > 0 ? day + " day " : ""}${hour > 0 ? hour + " hour " : ""}${
    minute > 0 ? minute + " minute " : ""
  }${remainingSecond > 0 ? remainingSecond + " second " : ""} ago`;
}
