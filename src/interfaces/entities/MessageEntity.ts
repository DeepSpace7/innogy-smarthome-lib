/**
 * Represents the message entity in SmartHome.
 */
interface MessageEntity {
  /**
   * The unique id of the message.
   */
  id: string,
  /**
   * Specifies the type of the message.
   */
  type: string,
  /**
   * Defines whether it is an alert or a message, default is message.
   */
  class: string,
  /**
   * Defines whether the message has been viewed by a user.
   */
  read: boolean,
  /**
   * Reference to the description of the message.
   */
  desc?: string,
  /**
   * Timestamp when the message was created.
   */
  timestamp?: string,
  /**
   * Reference to the underlying product, which the message relates to.
   */
  Product: Link,
  /**
   * Reference to the underlying devices, which the message relates to.
   */
  Devices?: Container<Link>,
  /**
   * Reference to the underlying capabilities, which the message relates to.
   */
  Capabilities?: Container<Link>,
  /**
   * Container for all parameters of the message.
   */
  Data?: Container<Property>,
  /**
   * Container for tagging the message.
   */
  Tags?: Container<Property>
}