export const formatDate = (d) => {
  const date = new Date(d);
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const month = date.getMonth() + 1;
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
  return formattedDate.toString();
};
