import { query, accessToken } from "./constants.js";
import { grab } from "./utils.js";
import { formatRepoDetails, formatUserDetails } from "./templates.js";

const renderPageContent = result => {
  const repositoryContainer = grab("repo-list-container");
  const detailBlock = grab("main-left-container");

  const userDetails = formatUserDetails(result.data.viewer);
  detailBlock.innerHTML = userDetails;

  const repositories = formatRepoDetails(result.data.viewer.repositories.edges);
  repositoryContainer.innerHTML = repositories;
};

const renderErrorToast = e => {
  console.log(e);
  const template = grab("error-template");
  template.style.display = "flex";

  setTimeout(() => {
    template.style.display = "none";
  }, 5000);
};

const init = () => {
  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`
    },
    body: JSON.stringify({ query })
  })
    .then(response => response.json())
    .then(renderPageContent)
    .catch(renderErrorToast);
};

window.addEventListener("load", init);
