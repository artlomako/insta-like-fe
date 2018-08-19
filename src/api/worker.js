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
    fetch(root + "/status/likes", {
      method: "GET",
      credentials,
      headers: headers()
    })
);

export const fetchCommentsStatus = () => (
    fetch(root + "/status/comments", {
      method: "GET",
      credentials,
      headers: headers()
    })
);

export const startLikes = (photoUrl, actionsCount, hoursCount) => (
    fetch(root + "/start/likes", {
      method: "POST",
      credentials,
      headers: headers(),
      body: JSON.stringify({photoUrl, actionsCount, hoursCount})
    })
);

export const startComments = (data) => (
    fetch(root + "/start/comments", {
      method: "POST",
      credentials,
      headers: headers(),
      body: JSON.stringify(data)
    })
);

export const fetchLikesLimits = () => (
    fetch(root + "/limits/likes", {
      method: "GET",
      credentials,
      headers: headers()
    })
);
export const fetchCommentsLimits = () => (
    fetch(root + "/limits/comments", {
      method: "GET",
      credentials,
      headers: headers()
    })
);

export const fetchDefaultComments = () => (
    fetch(root + "/default-comments", {
      method: "GET",
      credentials,
      headers: headers()
    })
);