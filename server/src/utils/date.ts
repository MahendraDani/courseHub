export const getDate = () => {
  const dataObj = new Date();

  const date = dataObj.getDate();
  const month = dataObj.getMonth();
  const year = dataObj.getFullYear();

  const currentDate = `${date}.${month}.${year}`;
  return currentDate;
};
