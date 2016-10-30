/**
 * Defines the connection options to use.
 */
interface ConnectionOptions {
  /**
   * The required authentication mode.
   */
  mode: AuthMode,
  /**
   * The authentication info if mode === 'code' is used.
   */
  auth?: AuthCodeInfo,
  /**
   * The refresh token if mode === 'refresh' is used.
   */
  token?: string,
  /**
   * The user info if mode === 'password' is used.
   */
  user?: UserInfo
}