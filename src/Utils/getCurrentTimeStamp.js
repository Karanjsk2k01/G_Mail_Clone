const getCurrentTimestamp = () => {
  const currentDate = new Date();
  return currentDate.toISOString();
};

export default getCurrentTimestamp;