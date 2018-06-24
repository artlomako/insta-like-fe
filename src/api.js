let root = "/api";
if (process.env.NODE_ENV !== "production") {
  root = "http://localhost:3000" + root;
}
export const apiFetchDefaultComments = () => fetch(root + "/default-comments");

export const apiStart = (photoUrl, shouldLike, comments) => (
    fetch(root + "/start", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({photoUrl, shouldLike, comments})
    })
);