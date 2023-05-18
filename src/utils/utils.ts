export const timestampToDate = (timestamp: number): string => {
  const date = new Date(Number(timestamp) * 1000);
  const dateTimeString = date.toLocaleString();
  return dateTimeString;
};
