import { formatTime, grab } from "./utils.js";

const formatRepositoryTopics = nodes => {
  return nodes
    .map(
      node =>
        `<li><a role="button" class="repo-topic" href=${node.url}>${node.topic.name}</a></li>`
    )
    .join("");
};

export const formatRepoDetails = edges => {
  return edges
    .map(({ node }) => {
      return `
          <article class="repo-item">
              <div class="repo-detail">
                  <span style="display:flex; align-items:center;">
                      <a role="button" class="repo-name" href=${node.url}>
                       ${node.name}
                      </a>
                      ${
                        node.isPrivate
                          ? `<span class="private-tag">Private</span>`
                          : ""
                      }
                  </span>
                  ${
                    node.isFork
                      ? `<span class="forked-repo">
                          Forked from
                          <a role="button" href=${node.parent.url}>${node.parent.nameWithOwner}</a>
                         </span>`
                      : ""
                  }
  
                  ${
                    node.description
                      ? `<p class="repo-description">
                           ${node.description}
                         </p>`
                      : ""
                  }
  
                  ${
                    node.repositoryTopics.nodes.length
                      ? `<ul class="repo-topic-collection">` +
                        formatRepositoryTopics(node.repositoryTopics.nodes) +
                        `</ul>`
                      : ""
                  }
              
                  <div class="repo-metadata">
                      ${
                        node.primaryLanguage
                          ? `<span class="repo-metadata-item">
                                  <span class="language-color"  style="background-color: ${node.primaryLanguage.color};"></span>
                                  <span class="language">${node.primaryLanguage.name}</span>
                              </span>`
                          : ""
                      }
  
                      ${
                        node.stargazerCount
                          ? `<a role="button" class="repo-metadata-item">
                                  <svg class="metadata-icon"  height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                                      <path
                                          fill-rule="evenodd"
                                          d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                                      ></path>
                                  </svg>
                                  <span class="star-count">${node.stargazerCount}</span>
                              </a>`
                          : ""
                      }
  
                      ${
                        node.forkCount
                          ? `
                              <a role="button" class="repo-metadata-item forks">
                                  <svg aria-label="fork" class="metadata-icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
                                      <path
                                          fill-rule="evenodd"
                                          d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                      ></path>
                                  </svg>
                                  <span class="fork-count">${node.forkCount}</span>
                              </a>`
                          : ""
                      }
  
                      ${
                        node.licenseInfo
                          ? ` <span class="repo-metadata-item license">
                                  <svg class="metadata-icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                                      <path
                                          fill-rule="evenodd"
                                          d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"
                                      ></path>
                                  </svg>
                                   <span class="license-name">${node.licenseInfo.name}</span>
                              </span>`
                          : ""
                      } 
                    <span class="repo-metadata-item">
                        <span class="update-time">${formatTime(
                          node.pushedAt
                        )}</span>
                    </span>
                  </div>
              </div>
              <div class="star-container">
                  <button class="star-button">
                  <svg class="metadata-icon" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                      <path
                      fill-rule="evenodd"
                      d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                      ></path>
                  </svg>
                  Star
                  </button>
              </div>
          </article>
          `;
    })
    .join("");
};

export const formatUserDetails = data => {
  const repoCountCollection = grab("repo-count", true);
  const nameCollection = grab("username", true);
  const avatarCollection = grab("avatar", true);

  Array.from(nameCollection).forEach(node => {
    node.textContent = data.login;
  });
  Array.from(repoCountCollection).forEach(node => {
    node.textContent = data.repositories.totalCount;
  });
  Array.from(avatarCollection).forEach(node => {
    node.src = data.avatarUrl;
  });

  return `<div class="profile-bio-data">
                <div class="block">
                  <img class="profile-picture" loading="lazy"  src=${data.avatarUrl} alt="User profile picture" />
                </div>
                <div class="bio-data-block">
                  <h3 class="profile-name">${data.name}</h3>
                  <p class="profile-username">${data.login}</p>
                </div>
              </div>
              <div class="profile-status" role="button">
                ${data.status.emojiHTML}<span class="profile-status-text">${data.status.message}</span>
              </div>
              <div class="profile-details">
                <button class="edit-button">Edit Profile</button>
                <div class="profile-data-aggregate">
                  <a href="#" class="profile-links" role="button">
                    <svg class="profile-data-icon" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"
                      ></path>
                    </svg>
                    <p>
                      <span class="profile-numbers">${data.followers.totalCount}</span>
                      followers
                    </p>
                  </a>
                  <span class="profile-dot">·</span>
                  <a href="#" class="profile-links" role="button">
                    <p>
                      <span class="profile-numbers">${data.following.totalCount}</span>
                      following
                    </p>
                  </a>
                  <span class="profile-dot">·</span>
                  <a href="#" class="profile-links" role="button">
                    <svg  class="profile-data-icon" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                      ></path>
                    </svg>
                    <p>
                      <span class="profile-numbers">${data.starredRepositories.totalCount}</span>
                    </p>
                  </a>
                </div>
            </div>`;
};
