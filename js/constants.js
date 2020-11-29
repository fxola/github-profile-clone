export const accessToken = "";
export const query = `query {
    viewer {
      login
      name
      email
      avatarUrl
      status{
        emojiHTML
        message
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      repositories(first: 20, orderBy: {field: PUSHED_AT, direction: DESC}) {
        totalCount
        edges {
          node {
            name
            stargazerCount
            forkCount
            url
            parent {
              nameWithOwner
              url
            }
            isFork
            description
            isPrivate
            licenseInfo {
              name
            }
            repositoryTopics(first: 5) {
              nodes {
                topic {
                  name
                }
                url
              }
            }
            pushedAt
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }`;
