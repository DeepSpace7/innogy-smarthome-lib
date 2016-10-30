/**
 * The interface of response.
 */
interface Response {
  /**
   * The response body.
   */
  body: string,
  /**
   * The response status.
   */
  status: number,
  /**
   * The response url.
   */
  url: string,
  /**
   * The response headers.
   */
  headers: Headers
}