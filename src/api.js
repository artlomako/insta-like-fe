let root = "/api";
if (process.env.NODE_ENV !== "production") {
  root = "http://localhost:3000" + root;
}
export const apiFetchDefaultComments = () => fetch(root + "/default-comments");

export const apiStart = (body) => (
    fetch(root + "/start", {
      method: "POST",
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
);

export const apiStatus = () => (
    fetch(root + "/status", {credentials: 'include'}).then(r => r.json())
);