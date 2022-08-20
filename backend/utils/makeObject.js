const makeObject = (arg) => {
  const obj = {};
  const keys = Object.keys(arg);
  keys.forEach((key) => {
    if (arg[key]) obj[key] = arg[key];
  });
  return obj;
};

module.exports = makeObject;
