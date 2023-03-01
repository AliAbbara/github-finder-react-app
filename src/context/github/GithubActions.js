import axios from 'axios';

const githubUrl = process.env.REACT_APP_GITHUB_URL;
const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: githubUrl,
  headers: { Authorization: `token ${githubToken}` },
});

// Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);
  return response.data.items;

  //   const response = await fetch(`${githubUrl}/search/users?${params}`, {
  //     headers: {
  //       Authorization: `token ${githubToken}`,
  //     },
  //   });
  //   const { items } = await response.json();

  // dispatch({
  //   type: 'GET_USERS',
  //   payload: items,
  // });
  //   return items;
};

//Get single user
// export const getUser = async (login) => {
//   const response = await fetch(`${githubUrl}/users/${login}`, {
//     headers: {
//       Authorization: `token ${githubToken}`,
//     },
//   });

//   if (response.status === 404) {
//     window.location = '/notfound';
//   } else {
//     const data = await response.json();

//     //   dispatch({
//     //     type: 'GET_USER',
//     //     payload: data,
//     //   });
//     return data;
//   }
// };

// // Get user repos
// export const getUserRepos = async (login) => {
//   const params = new URLSearchParams({
//     sort: 'created',
//     per_page: 10,
//   });

//   const response = await fetch(`${githubUrl}/users/${login}/repos?${params}`, {
//     headers: {
//       Authorization: `token ${githubToken}`,
//     },
//   });
//   const data = await response.json();

//   // dispatch({
//   //   type: 'GET_REPOS',
//   //   payload: data,
//   // });
//   return data;
// };

// Get user and repos
export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  });

  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?${params}`),
  ]);

  return { user: user.data, repos: repos.data };
};
