class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  editCone(height, radius, segments) {
    return fetch(`${this._baseUrl}/triangulation`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        height, radius, segments,
      }),
    }).then(this._getResponseData)
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

export const api = new Api({
  baseUrl: "http://localhost:3000",
});
