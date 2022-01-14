export default {
  createSession(body) {
    console.log("test");
    return fetch(`${process.env.API_URL}api/v1/checkout/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
};
