interface XMLHttpRequest {
  responseURL?: string
}

class StandardRequester {
  private _headers: RegExp;

  constructor() {
    this._headers = /^([a-zA-Z\-]+):\s+(.*)/;
  }

  getHeaders(headers: string) {
    const result: Headers = {};
    headers.split('\n').filter(header => !!header).forEach(header => {
      const hv = this._headers.exec(header);
      result[hv[1]] = hv[2];
    });
    return result;
  }

  fetch(request: Request) {
    return new Promise<Response>((resolve, reject) => {
      const headers = request.headers;
      const xhr = new XMLHttpRequest();
      xhr.open(request.method, request.url, true);
      xhr.withCredentials = false;

      Object.keys(headers).forEach(name => {
        const value = headers[name];
        xhr.setRequestHeader(name, value);
      });

      xhr.addEventListener('readystatechange', ev => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          const headers = xhr.getAllResponseHeaders();
          resolve({
            url: xhr.responseURL || request.url,
            headers: this.getHeaders(headers),
            body: xhr.responseText,
            status: xhr.status
          });
        }
      }, false);

      xhr.addEventListener('error', ev => {
        reject(ev.error);
      }, false);

      xhr.send(request.body);
    });
  }
}

class StandardStreaming {
  private _ws: WebSocket;

  open(url: string) {
    this._ws = new WebSocket(url);
  }

  close() {
    this._ws.close();
    this._ws = undefined;
  }

  on(eventName: string, callback: (ev: any) => void) {
    if (this._ws) {
      this._ws.addEventListener(eventName, callback, false);
    }
  } 
}

function createSmartHome(clientId: string, clientSecret: string) {
  const client = btoa(clientId + ':' + clientSecret);
  return new SmartHome({
    client: client,
    requester: new StandardRequester(),
    streaming: new StandardStreaming(),
  });
}