const host = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

export const apiFetchDefaultComments = () => fetch(host + "/default-comments");

export const apiStart = (photoUrl, shouldLike, comments) => (
    fetch(host + "/start", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({photoUrl, shouldLike, comments})
    })
);