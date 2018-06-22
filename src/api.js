export const apiFetchDefaultComments = () => fetch("http://localhost:3000/default-comments");

export const apiStart = (photoUrl, shouldLike, comments) => (
    fetch("http://localhost:3000/start", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({photoUrl, shouldLike, comments})
    })
);