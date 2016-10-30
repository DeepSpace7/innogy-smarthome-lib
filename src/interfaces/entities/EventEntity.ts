/**
 * The event entity of SmartHome.
 */
interface EventEntity {
  /**
   * Specifies the type of the event.
   */
  type: string,
  /**
   * Date and time when the event occurred in the system.
   */
  timestamp: string,
  /**
   * Link to the metadata to the event definition.
   */
  desc?: string,
  /**
   * Reference to the associated entity (instance or metadata) for the given event.
   */
  Link: Link,
  /**
   * Data for the event which can contain any type of entity dependent on the
   * event type.
   */
  Data?: Container<any>,
  /**
   * This container includes only properties, e.g. for the changed state
   * properties.
   */
  Properties?: Container<Property>
}