import * as request from 'request';
import * as WebSocket from 'ws';

class StandardRequester {
  fetch(req: Request) {
    return new Promise<Response>((resolve, reject) => {
      request({
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: req.body
      }, (err: any, response: any, body: any) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            url: response.url,
            body: response.body,
            status: response.statusCode,
            headers: response.headers
          });
        }
      });
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
      this._ws.on(eventName, () => callback(this));
    }
  } 
}

function createSmartHome(clientId: string, clientSecret: string) {
  const client = new Buffer(clientId + ':' + clientSecret);
  return new SmartHome({
    client: client.toString('base64'),
    requester: new StandardRequester(),
    streaming: new StandardStreaming(),
  });
}

export { createSmartHome };
