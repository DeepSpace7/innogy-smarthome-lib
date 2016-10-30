/**
 * The product entity of SmartHome.
 */
interface ProductEntity {
  /**
   * Type of the product.
   */
  type: string,
  /**
   * Version of the product, which is equal to the major.minor version of the
   * add-in.
   */
  version: string,
  /**
   * Indicates whether the product has been provisioned for the given SHC.
   */
  provisioned: boolean,
  /**
   * Link to the metadata description of the product.
   */
  desc?: string,
  /**
   * Contains the link to the devices, which are introduced with this product.
   */
  Devices?: Container<Link>,
  /**
   * The Config container includes all properties, which are relevant for the
   * product.
   */
  Config?: Container<Property>,
  /**
   * Includes well defined properties, which indicate the state of the product
   * in the backend and on the SHC.
   */
  State?: Container<Property>,
  /**
   * The Actions container lists links to all actions, which are introduced by
   * this product. 
   */
  Actions?: Container<Link>,
  /**
   * The Events container lists links to all supported custom events for the
   * product.
   */
  Events?: Container<Link>,
  /**
   * This container has the links to all available Messages for this product.
   */
  Messages?: Container<Link>,
}