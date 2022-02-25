export const getbaseURL = () => {
  let baseURL =
    window.location.pathname == "/"
      ? window.location.href
      : window.location.href.replace(window.location.pathname, "");

  if (baseURL.includes("?")) {
    let tab = baseURL.split("?");
    baseURL = tab[0];
  }

  return baseURL;
};
