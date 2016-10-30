/**
 * Represents the request for an access token using
 * a refresh token.
 */
interface RefreshTokenRequest {
  /**
   * The selected grant type.
   */
  Grant_Type: string,
  /**
   * The refresh token to use.
   */
  Refresh_Token: string
}