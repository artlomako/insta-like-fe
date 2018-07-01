let root = "/api";
if (process.env.NODE_ENV !== "production") {
  root = "http://localhost:3000" + root;
}
export const apiFetchDefaultComments = () => fetch(root + "/default-comments");
export const apiFetchUsers = (password) => fetch(root + "/users", {
  method: "GET",
  credentials: "same-origin",
  headers: {
    "Admin-Password": password
  }
});

export const apiSubmitUsers = (password, users) => (
    fetch(root + "/users", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({password, users})
    })
);



export const apiStart = (body) => (
    fetch(root + "/start", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
);

export const apiSubmitDefaultComments = (password, comments) => (
    fetch(root + "/default-comments", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({password, comments})
    })
);

export const apiStatus = () => (
    fetch(root + "/status", {credentials: 'same-origin'}).then(r => r.json())
);