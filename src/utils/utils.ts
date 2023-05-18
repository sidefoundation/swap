export const timestampToDate = (timestamp: number): string => {
  const date = new Date(Number(timestamp));
  const dateTimeString = date.toLocaleString();
  return dateTimeString;
};
