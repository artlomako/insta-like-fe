import store from "../store";

let root = "/api/settings";
let credentials = "same-origin";

if (process.env.NODE_ENV !== "production") {
  root = "http://localhost:3000" + root;
  credentials = "include";
}

const headers = () => ({
  "Content-Type": "application/json",
  "Admin-Password": store.state.admin.authentication.password
});

export const fetchSettings = () => (
    fetch(root + "/likes", {
      method: "GET",
      credentials,
      headers: headers()
    })
);

export const submitSettings = (settings) => (
    fetch(root + "/likes", {
      method: "POST",
      credentials,
      headers: headers(),
      body: JSON.stringify(settings)
    })
);

export const fetchUsers = () => (
    fetch(root + "/users", {
      method: "GET",
      credentials,
      headers: headers()
    })
);

export const submitUsers = (usernames) => (
    fetch(root + "/users", {
      method: "POST",
      credentials,
      headers: headers(),
      body: JSON.stringify(usernames)
    })
);

export const fetchComments = () => (
    fetch(root + "/comments", {
      method: "GET",
      credentials,
      headers: headers()
    })
);

export const submitComments = (settings) => (
    fetch(root + "/comments", {
      method: "POST",
      credentials,
      headers: headers(),
      body: JSON.stringify(settings)
    })
);

export const authenticateAdmin = (password) => (
    fetch(root + "/authenticate", {
      method: "POST", headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({password})
    })
);