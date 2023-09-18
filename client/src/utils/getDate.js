const getDate = (TimeStamp) => {
  const date = new Date(TimeStamp);
  return {
    day: date.getDate(),
    month: date.toLocaleString("default", { month: "numeric" }),
    year: date.getFullYear(),
  };
};

export default getDate;
