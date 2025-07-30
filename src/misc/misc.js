export function timeSince(date) {
  let convertedDate = date.toDate();
  let seconds = Math.floor((new Date() - convertedDate) / 1000);

  let interval = seconds / 31536000;

  if (interval >= 1) {
    return `${Math.floor(interval)} ${
      Math.floor(interval) == 1 ? "year" : "years"
    } ago`;
  }
  interval = seconds / 2592000;
  if (interval >= 1) {
    return `${Math.floor(interval)} ${
      Math.floor(interval) == 1 ? "month" : "months"
    } ago`;
  }
  interval = seconds / 86400;
  if (interval >= 1) {
    return `${Math.floor(interval)} ${
      Math.floor(interval) == 1 ? "day" : "days"
    } ago`;
  }
  interval = seconds / 3600;
  if (interval >= 1) {
    return `${Math.floor(interval)} ${
      Math.floor(interval) == 1 ? "hour" : "hours"
    } ago`;
  }
  interval = seconds / 60;
  if (interval >= 1) {
    return `${Math.floor(interval)} ${
      Math.floor(interval) == 1 ? "minute" : "minutes"
    } ago`;
  }
  return `${seconds} ${seconds == 1 ? "second" : "seconds"} ago`;
}

// Check if user has liked the post/comment/reply
export function checkLiked(likes, uid) {
  return likes.includes(uid);
}

export function timerDisplay(secondsLeft) {
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return `${minutes}:${seconds}`;
}
