export const grab = (className, all = false) => {
  return all
    ? document.getElementsByClassName(className)
    : document.getElementsByClassName(className)[0];
};

export const formatTime = updatedTime => {
  const normalizedUpdatedTime = new Date(updatedTime);
  const normalizedCurrentTime = new Date();
  const dateStringArray = normalizedUpdatedTime.toDateString().split(" ");

  const updatedYear = normalizedUpdatedTime.getFullYear();
  const currentYear = normalizedCurrentTime.getFullYear();
  if (currentYear != updatedYear) {
    return `Updated on ${dateStringArray[2]} ${dateStringArray[1]} ${dateStringArray[3]}`; //e.g 10 Sep 2019
  }

  const updatedMonth = normalizedUpdatedTime.getMonth();
  const currentMonth = normalizedCurrentTime.getMonth();
  if (currentMonth > updatedMonth) {
    return `Updated on ${dateStringArray[2]} ${dateStringArray[1]} `; //e.g 10 Sep
  }

  const currentDay = normalizedCurrentTime.getUTCDate();
  const updatedDay = normalizedUpdatedTime.getUTCDate();
  if (currentDay > updatedDay) {
    return currentDay - updatedDay > 1
      ? `Updated ${currentDay - updatedDay} days ago`
      : `Updated ${currentDay - updatedDay} day ago`;
  }

  const currentHour = normalizedCurrentTime.getHours();
  const updatedHour = normalizedUpdatedTime.getHours();
  if (currentHour > updatedHour) {
    return currentHour - updatedHour > 1
      ? `Updated ${currentHour - updatedHour} hours ago`
      : `Updated ${currentHour - updatedHour} hour ago`;
  }

  const currentMinute = normalizedCurrentTime.getUTCMinutes();
  const updatedMinute = normalizedUpdatedTime.getUTCMinutes();
  if (currentMinute > updatedMinute) {
    return currentMinute - updatedMinute > 1
      ? `Updated ${currentMinute - updatedMinute} minutes ago`
      : `Updated ${currentMinute - updatedMinute} minute ago`;
  }

  const currentSecond = normalizedCurrentTime.getSeconds();
  const updatedSecond = normalizedUpdatedTime.getSeconds();
  if (currentSecond > updatedSecond) {
    return currentSecond - updatedSecond > 1
      ? `Updated ${currentSecond - updatedSecond} seconds ago`
      : ` Updated now`;
  }
};
