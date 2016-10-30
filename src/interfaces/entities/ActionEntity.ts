/**
 * The action entity of SmartHome.
 */
interface ActionEntity {
  /**
   * Type of the action.
   */
  type: string,
  /**
   * Link to the metadata to the action definition.
   */
  desc?: string,
  /**
   * Link to the instance or metadata of the underlying entity.
   */
  Link: Link,
  /**
   * Container of parameters required for the intended execution of the action.
   */
  Data?: Container<Parameter>,
  /**
   * Container of properties for tagging (identifying) an Action.
   */
  Tags?: Container<Property>
}