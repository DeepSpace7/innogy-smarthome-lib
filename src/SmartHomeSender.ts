/**
 * Represents the low-level REST request sender.
 */
class SmartHomeSender {
  private _requester: Requester;
  private _apiUrl: string;
  private _dataUrl: string;

  /**
   * Creates a new API sender proxy.
   * @constructor
   * @param requester The underlying HTTP requester to use.
   * @param baseAddr The base address for the Innogy API.
   */
  constructor(requester: Requester, baseAddr: BaseAddress) {
    this._requester = requester;
    this._apiUrl = 'https://' + (baseAddr.api || 'api.services-smarthome.de');
    this._dataUrl = 'https://' + (baseAddr.data || 'data.services-smarthome.de');
  }

  /**
   * The general fetch abstraction to perform a request.
   * @param url The absolute URL (endpoint) to call.
   * @param headers The headers to transport.
   * @param body The optional body to include as JSON.
   * @return A promise for the API response.
   */
  req(url: string, method: string, headers: Headers, body?: Object): Promise<Response> {
    const json = typeof body === 'object';
    headers['content-type'] = 'application/json';
    return this._requester.fetch({
      headers: headers,
      method: method || 'GET',
      body: json ? JSON.stringify(body) : body.toString(),
      url: url
    });
  }

  /**
   * The API fetch abstraction to perform a request.
   * @param url The relative URL (endpoint) to call.
   * @param authorization The access token to use.
   * @param method The optional HTTP verb to set.
   * @param body The optional body to include as JSON.
   * @return A promise for the API response.
   */
  api(path: string, authorization: string, method?: string, body?: Object): Promise<Response> {
    const url = this._apiUrl + '/api/1.0' + path;
    const headers = {
      authorization: authorization
    };
    return this.req(url, method, headers, body);
  }

  /**
   * The DATA fetch abstraction to perform a request.
   * @param url The relative URL (endpoint) to call.
   * @param authorization The access token to use.
   * @param method The optional HTTP verb to set.
   * @param body The optional body to include as JSON.
   * @return A promise for the API response.
   */
  data(path: string, authorization: string, method?: string, body?: Object): Promise<Response> {
    const url = this._dataUrl + '/data/1.0' + path;
    const headers = {
      authorization: authorization
    };
    return this.req(url, method, headers, body);
  }

  /**
   * The authorization service to call for tokens.
   * @param authorization The client id / secret to use.
   * @param body The specific request to perform.
   * @return A promise for the authorization response.
   */
  auth(authorization: string, body: AuthCodeRequest | RefreshTokenRequest | PasswordRequest): Promise<AuthResponse> {
    const url = this._apiUrl + '/auth/token';
    const headers = {
      authorization: authorization
    };
    return this.req(url, 'POST', headers, body).then(response => {
      const data = JSON.parse(response.body);

      if (response.status === 200) {
        return <AuthResponse>data;
      }

      throw new SmartHomeError(data);
    });
  }

  /**
   * The initialize process to perform for the SHC.
   * @param authorization The access token to use.
   * @return A promise for the initialize response.
   */
  init(authorization: string): Promise<InitializeResponse> {
    return this.api('/initialize', authorization).then(response => {
      const data = JSON.parse(response.body);

      if (response.status === 200) {
        return <InitializeResponse>data;        
      } else if (response.status === 409) {
        return {
          CurrentConfigurationVersion: 0, // read SHC state -- property ConfigVersion
          Data: [] // read again?
        };
      }

      throw new SmartHomeError(data);
    });
  }
}