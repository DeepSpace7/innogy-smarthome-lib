/**
 * The device entity of SmartHome.
 */
interface DeviceEntity {
  /**
   * Gets the unique id for the device.
   */
  id: string,
  /**
   * Gets the identifier of the manufacturer.
   */
  manufacturer: string,
  /**
   * Gets the version number of the device. 
   */
  version: string,
  /**
   * Defines the product, which is used as an identifier for selecting the right
   * add-in to support the functionality of the device.
   */
  product: string,
  /**
   * Specifies the type of the device, which is defined by the manufacturer.
   */
  type: string,
  /**
   * Device number or id like SGTIN given by the manufacturer.
   */
  serialnumber?: string,
  /**
   * Link to the metadata of that specific device. The link can be followed
   * without further additions. 
   */
  desc?: string,
  /**
   * Contains a list of the device, which are linked to this device.
   */
  Devices?: Container<Link>,
  /**
   * Contains a list of the device capabilities.
   */
  Capabilities?: Container<Link>,
  /**
   * The location contains the link to the location of the device.
   */
  Location?: Container<Link>,
  /**
   * The Actions container lists links to all supported actions for the device.
   */
  Actions?: Container<Link>,
  /**
   * The Events container lists links to all supported custom events for the
   * device including generic and custom events.
   */
  Events?: Container<Link>,
  /**
   * This container links to all available Messages for this device.
   */
  Messages?: Container<Link>,
  /**
   * This represents a container of all configuration properties like firmware
   * version of the device. 
   */
  Config?: Container<Property>,
  /**
   * Gets write-only configuration properties needed by the device.
   */
  Volatile?: Container<Property>,
  /**
   * This represents a container of all state properties like reachability for a
   * RF device.
   */
  State?: Container<Property>,
  /**
   * The tag container can contain any number of properties for grouping of the
   * devices in a client.
   */
  Tags?: Container<Property>
}