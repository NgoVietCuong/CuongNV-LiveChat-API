function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}-${month}-${year}`;
}

const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours || 12;

  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  return formattedTime;
};

module.exports = {
  formatDate,
  formatTime
}