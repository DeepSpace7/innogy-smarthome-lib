/**
 * Represents the request for an access token using
 * an authorization token.
 */
 interface AuthCodeRequest {
  /**
   * The selected grant type.
   */
  Grant_Type: string,
  /**
   * The obtained authorization code.
   */
  Code: string,
  /**
   * The redirect URI of the client.
   */
  Redirect_Uri: string,
  /**
   * The optional scope.
   */
  Scope: string
}