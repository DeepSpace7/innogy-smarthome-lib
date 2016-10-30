/**
 * The capability entity of SmartHome.
 */
interface CapabilityEntity {
  /**
   * Unique id for the capability.
   */
  id: string,
  /**
   * The class of the capability indicates the functionality of the capability.
   */
  class: string,
  /**
   * Type of the capability.
   */
  type: string,
  /**
   * Contains the link to the parent device, which offers the capability.
   */
  Device: Link,
  /**
   * Link to the metadata of that specific capability.
   */
  desc?: string,
  /**
   * The tag container can contain any number of properties for grouping of the
   * capabilities in the client.
   */
  Tags?: Container<Property>,
  /**
   * The location contains the link to the location of the device.
   */
  Location?: Container<Link>,
  /**
   * Represents a container of all configuration properties of the capability.
   */
  Config?: Container<Property>,
  /**
   * Represents a container of all state properties.
   */
  State?: Container<Property>,
  /**
   * The Actions container lists the links to all supported actions for the
   * capability.
   */
  Actions?: Container<Link>,
  /**
   * The Events container lists the links to all supported events for the
   * capability.
   */
  Events?: Container<Link>
}