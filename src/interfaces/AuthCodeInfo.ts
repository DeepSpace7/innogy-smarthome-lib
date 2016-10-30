/**
 * Represents the authorization code information.
 */
interface AuthCodeInfo {
  /**
   * The given authorization code from the server.
   */
  code: string,
  /**
   * The used redirect URL of the client.
   */
  redirectUri: string,
  /**
   * The optional scope for logging in.
   */
  scope?: string
}