const createID = () => {
  const id = (Date.now() + Math.floor(Math.random() * 10000)).toString(32)
    .substring(4, 10);
  return id;
};

export default createID;
