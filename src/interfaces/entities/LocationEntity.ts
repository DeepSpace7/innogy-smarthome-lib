/**
 * Represents the loation entity in SmartHome.
 */
interface LocationEntity {
  /**
   * The unique id of the location.
   */
  id: string,
  /**
   * The reference to the description.
   */
  desc?: string,
  /**
   * The configuration container.
   */
  Config: Container<Property>,
  /**
   * Container for tagging the location.
   */
  Tags?: Container<Property>
}