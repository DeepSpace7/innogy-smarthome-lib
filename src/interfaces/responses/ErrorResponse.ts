/**
 * Represents the response to an invalid call.
 */
interface ErrorResponse {
  /**
   * The code representing the error.
   */
  errorcode: number,
  /**
   * The description of the error.
   */
  description: string,
  /**
   * The messages associated with the error.
   */
  messages?: Array<string>,
  /**
   * The reference of the error.
   */
  ref?: string
}