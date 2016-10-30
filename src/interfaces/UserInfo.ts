/**
 * Represents the login information for a user.
 */
interface UserInfo {
  /**
   * The login name of the user.
   */
  name: string,
  /**
   * The login password of the user.
   */
  password: string,
  /**
   * The optional scope for logging in.
   */
  scope?: string
}