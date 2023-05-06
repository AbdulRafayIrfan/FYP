export function timeSince(date) {
  let convertedDate = date.toDate();
  let seconds = Math.floor((new Date() - convertedDate) / 1000);

  let interval = seconds / 31536000;

  if (interval >= 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval >= 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval >= 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval >= 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval >= 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

// Check if user has liked the post/comment/reply
export function checkLiked(likes, uid) {
  return likes.includes(uid);
}
