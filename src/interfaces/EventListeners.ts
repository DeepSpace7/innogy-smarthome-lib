/**
 * Represents a collection of SmartHome event listeners.
 */
interface EventListeners {
  /**
   * Gets a list of registered listeners for the given event.
   * @param eventName The name of the event.
   * @return The array with registered listeners.
   */
  [eventName: string]: Array<(eventData: EventData) => void>
}