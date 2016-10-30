/**
 * The contract of a streaming client to use for receiving events.
 */
interface Streaming {
  /**
  * Opens a connection to the given URL.
  * @param url The url to connec to.
  */
  open(url: string): void,
  /**
  * Closes the connection if applicable.
  */
  close(): void,
  /**
  * Registers a callback to the given event.
  * @param eventName The name of the event to listen to.
  * @param callback The callback to trigger with the event.
  */
  on(eventName: string, callback: (ev: any) => void): void
}