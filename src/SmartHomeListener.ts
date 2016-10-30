/**
 * Represents the low-level WebSocket event listener.
 */
class SmartHomeListener {
  private _wsUrl: string;
  private _streaming: Streaming;
  private _connected: boolean;
  private _listeners: Array<(ev: EventEntity) => void>;
  private _disconnected: () => void;

  /**
   * Creates a new event listener.
   * @constructor
   * @param streaming The streaming client to use.
   * @param baseAddr The base address of the Innogy SmartHome API.
   */
  constructor(streaming: Streaming, baseAddr: BaseAddress) {
    this._wsUrl = 'wss://' + (baseAddr.api || 'api.services-smarthome.de') + '/1.0/events?token=';
    this._streaming = streaming;
    this._connected = false;
    this._listeners = [];
    this._streaming.on('message', ev => {
      const data = <EventEntity>JSON.parse(ev.data);
      this._listeners.forEach(listener => listener.call(this, data));
    });
    this._streaming.on('close', ev => {
      if (this._connected) {
        this._connected = false;

        if (this._disconnected) {
          this._disconnected.call(this);
        }
      }
    });
  }

  /**
   * Adds the given listener to the handlers.
   * @param callback The callback to consider.
   */
  on(callback: (ev: EventEntity) => void) {
    if (this._listeners.indexOf(callback) === -1) {
      this._listeners.push(callback);
    }
  }

  /**
   * Drops the given listener from the handlers.
   * @param callback The callback to remove.
   */
  off(callback: (ev: EventEntity) => void) {
    const index = this._listeners.indexOf(callback);
    this._listeners.splice(index, 1);
  }

  /**
   * Opens the connection to a streaming connection.
   * @param token The access token for establishing the connection.
   * @param disconnected The callback to invoke if disconnected unexpectedly.
   */
  open(token: string, disconnected?: () => void): void {
    if (!this._connected) {
      const url = this._wsUrl + encodeURI(token);
      this._connected = true;
      this._streaming.open(url);
      this._disconnected = disconnected;
    }
  }

  /**
   * Closes the connection to a streaming connection.
   */
  close(): void {
    if (this._connected) {
      this._connected = false;
      this._streaming.close();
    }
  }
}