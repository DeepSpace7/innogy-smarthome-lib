/**
 * The contract of a requester to use for performing HTTP requests.
 */
interface Requester {
  /**
   * Performs a fetch with the given parameters.
   * @param request The request parameters.
   * @return A promise eventually resolving the response to the request.
   */
  fetch(request: Request): Promise<Response>;
}