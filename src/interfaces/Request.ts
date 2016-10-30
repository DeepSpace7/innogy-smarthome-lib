/**
 * The interface of response.
 */
interface Request {
  /**
   * The request body.
   */
  body: string,
  /**
   * The request method.
   */
  method: string,
  /**
   * The request url.
   */
  url: string,
  /**
   * The request headers.
   */
  headers: Headers
}