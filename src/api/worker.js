let root = "/api/worker";
let credentials = "same-origin";

if (process.env.NODE_ENV !== "production") {
  root = "http://localhost:3000" + root;
  credentials = "include";
}

const headers = () => ({
  "Content-Type": "application/json"
});

export const fetchLikesStatus = () => (
    fetch(root + "/likes/status", {
      method: "GET",
      credentials,
      headers: headers()
    })
);

export const fetchCommentsStatus = () => (
    fetch(root + "/comments/status", {
      method: "GET",
      credentials,
      headers: headers()
    })
);

export const startLikes = (photoUrl, actionsCount, hoursCount) => (
    fetch(root + "/likes/start", {
      method: "POST",
      credentials,
      headers: headers(),
      body: JSON.stringify({photoUrl, actionsCount, hoursCount})
    })
);

export const startComments = (data) => (
    fetch(root + "/comments/start", {
      method: "POST",
      credentials,
      headers: headers(),
      body: JSON.stringify(data)
    })
);

export const fetchLikesLimits = () => (
    fetch(root + "/likes/limits", {
      method: "GET",
      credentials,
      headers: headers()
    })
);
export const fetchCommentsLimits = () => (
    fetch(root + "/comments/limits", {
      method: "GET",
      credentials,
      headers: headers()
    })
);

export const fetchDefaultComments = () => (
    fetch(root + "/comments/default", {
      method: "GET",
      credentials,
      headers: headers()
    })
);