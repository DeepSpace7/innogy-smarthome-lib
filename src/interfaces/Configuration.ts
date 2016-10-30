/**
 * The configuration interface to define the API usage.
 */
interface Configuration {
  /**
  * The base64 string of "clientId ':' clientSecret".
  */
  client: string,
  /**
  * The requester to perform HTTP requests.
  */
  requester: Requester,
  /**
  * The optional streaming connection to receive events.
  */
  streaming?: Streaming,
  /**
  * The optional cache for meta data results.
  */
  meta?: Cache<Object>
}