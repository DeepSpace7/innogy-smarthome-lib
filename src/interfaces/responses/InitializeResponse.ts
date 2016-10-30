/**
 * Represents the response to an initialize call.
 */
interface InitializeResponse {
  /**
   * The current configuration version.
   */
  CurrentConfigurationVersion: number,
  /**
   * The associated device data.
   */
  Data: Container<DeviceEntity>
}