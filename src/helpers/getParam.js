const getParam = (name, defaultValue) => {
  try {
    if (window) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const paramValue = urlParams.get(name);
      return paramValue || defaultValue;
    }
  } catch (e) {
    return defaultValue;
  }
};

export default getParam;