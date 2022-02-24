export default {
  createSession(token, body) {
    return fetch(`${process.env.API_URL}api/v1/checkout/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
};
