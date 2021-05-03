export const formatDate = (d) => {
  const date = new Date(d);
  date.setUTCHours(2);
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getMinutes();
  const month = date.getMonth() + 1;
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
  return formattedDate.toString();
};
