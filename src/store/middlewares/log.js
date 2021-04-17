const log = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("Prev state:", store.getState());
  console.log("Dispatching:", action.type);

  let result = next(action);

  console.log("New state:", store.getState());
  console.groupEnd();
  return result;
};

export default log;
