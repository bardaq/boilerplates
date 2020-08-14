export type ApiError = {
  value: string;
  msg: string;
  param: string;
  location: string;
};

export default class FetchAPI {
  static DELETE = (endpoint: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(FetchAPI.handleResponse)
      .catch(FetchAPI.errorHandler);

  static GET = (endpoint: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(FetchAPI.handleResponse)
      .catch(FetchAPI.errorHandler);

  static POST = (endpoint: string, data: unknown) =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Access-Control-Allow-Origin": "*",
      },
      referrer: "no-referrer",
      body: JSON.stringify(data),
    })
      .then(FetchAPI.handleResponse)
      .catch(FetchAPI.errorHandler);

  static async handleResponse(res: Response) {
    if (res.status === 401) {
      return {
        error: {
          url: res.url,
          message: "Unauthorized",
        },
      };
    }
    if (res.body) {
      try {
        const json = await res
          .text()
          .then((text) => (text ? JSON.parse(text) : {}));
        if (Array.isArray(json.error)) {
          const stringifiedError = json.error.reduce(
            (result: string, err: ApiError) => (result += err.msg),
            ""
          );
          return { error: stringifiedError };
        }
        return json;
      } catch (e) {
        return {
          error: {
            url: res.url,
            message: e.message,
          },
        };
      }
    }
  }

  static async errorHandler(e: { message: string; url?: string }) {
    console.error(`Failed to fetch ${e.url}\n\n${e.message}`);
    return { error: e.message };
  }
}
