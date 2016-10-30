/**
 * Represents an error emitted from the library.
 */
class SmartHomeError extends Error {
  /**
   * Gets the specific error code.
   */
  code: number;
  /**
   * Gets the reference of the error.
   */
  ref: string;
  /**
   * Gets the contained messages.
   */
  messages: Array<string>;

  /**
   * Creates a SmartHome library error.
   * @constructor
   * @param response The response from the API to wrap.
   */
  constructor(response: ErrorResponse) {
    super(response.description);
    this.code = response.errorcode;
    this.ref = response.ref || '';
    this.messages = response.messages || [];
  }
}