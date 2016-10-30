/**
 * Represents the request for an access token using
 * a password.
 */
interface PasswordRequest {
  /**
   * The selected grant type.
   */
  Grant_Type: string,
  /**
   * The user name to use.
   */
  UserName: string,
  /**
   * The associated password.
   */
  Password: string,
  /**
   * The optional scope.
   */
  Scope: string
}