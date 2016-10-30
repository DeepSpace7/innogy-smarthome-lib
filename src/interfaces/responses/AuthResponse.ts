/**
 * Represents the response to an authentication call.
 */
interface AuthResponse {
  /**
   * The access token to be used as bearer.
   */
  access_token: string,
  /**
   * The type of token that is given.
   */
  token_type: string,
  /**
   * The valid timespan in seconds.
   */
  expires_in: number,
  /**
   * The refresh token for long-term access.
   */
  refresh_token: string
}