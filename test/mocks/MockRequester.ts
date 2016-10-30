/// <reference path="../../src/interfaces/Requester.ts" />
/// <reference path="../../src/interfaces/Request.ts" />

class MockRequester implements Requester {
  private _callback: (request: Request) => Object;

  constructor(callback: (request: Request) => Object) {
    this._callback = callback;
  }

  fetch<T>(request: Request): Promise<T> {
    const result = <T>this._callback(request);
    return Promise.resolve(result);
  }
}