let root = "/api";
if (process.env.NODE_ENV !== "production") {
  root = "http://localhost:3000" + root;
}
const credentials = "same-origin";

export const apiFetchDefaultComments = () => fetch(root + "/comments");

export const apiFetchUsers = (password) => (
    fetch(root + "/users", {
      method: "GET",
      credentials,
      headers: {
        "Admin-Password": password,
      }
    })
);

export const apiSubmitUsers = (password, users) => (
    fetch(root + "/users", {
      method: "POST",
      credentials,
      headers: {
        'content-type': 'application/json',
        "Admin-Password": password
      },
      body: JSON.stringify(users)
    })
);


export const apiStart = (body) => (
    fetch(root + "/worker/start", {
      method: "POST",
      credentials,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
);

export const apiSubmitDefaultComments = (password, comments) => (
    fetch(root + "/comments", {
      method: "POST",
      credentials,
      headers: {
        'content-type': 'application/json',
        "Admin-Password": password
      },
      body: JSON.stringify(comments)
    })
);

export const apiStatus = () => (
    fetch(root + "/worker/status", {
      method: "GET",
      credentials
    }).then(r => r.json())
);