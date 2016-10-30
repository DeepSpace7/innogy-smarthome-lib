/**
 * Represents a core SmartHome API class.
 */
class SmartHome {
  private _authorization: string;
  private _accessToken: string;
  private _refreshToken: string;
  private _expires: Date;
  private _listeners: EventListeners;

  /**
   * Gets the state of the SmartHome connection.
   */
  connection: ConnectionState;

  /**
   * Gets the state of the SmartHome authorization.
   */
  state: AuthorizationState;

  /**
   * Gets the state of the SmartHome authorization.
   */
  listener: SmartHomeListener;

  /**
   * Gets the state of the SmartHome authorization.
   */
  sender: SmartHomeSender;

  /**
   * Constructs a new SmartHome API instance.
   * @constructor
   * @param config The interaction configuration to use.
   * @param baseAddr The base addresses to use, if any.
   */
  constructor(config: Configuration, baseAddr?: BaseAddress) {
    const addr = baseAddr || {};
    this.state = 'unauthorized';
    this.connection = 'disconnected';
    this._listeners = {};
    this._authorization = 'Basic ' + config.client;
    this.sender = new SmartHomeSender(config.requester, addr);

    if (config.streaming) {
      this.listener = new SmartHomeListener(config.streaming, addr);
      this.listener.on(ev => {
        const parts = ev.type.split('/');
        const eventName = parts[parts.length - 1] || ev.type;
        this.emit('message', ev);
        this.emit(eventName, ev);
      });
    }
  }

  /**
   * Connects to SmartHome with the given options.
   * @param options The options to use for connecting.
   * @param callback The optional callback to use when connected.
   * @return The current instance.
   */
  connect(options: ConnectionOptions, callback?: (eventData: EventData) => void): SmartHome {
    var promise: Promise<void>;
    var authorize: Promise<AuthResponse>;

    const initialize = () => {
      return this.sender.init(this._accessToken).then(response => {
        if (this.listener) {
          const reconnect = () => {
            this.emit('reconnecting');
            this.listener.open(this._accessToken, reconnect);
          };
          this.listener.open(this._accessToken, reconnect);
        }
      
        this.connection = 'connected';
        this.emit('initialized', response);
      });
    };

    if (this.state !== 'authorized') {
      switch (options.mode) {
        case 'code':
          authorize = this.sender.auth(this._authorization, {
            'Grant_Type': 'authorization_code',
            'Code': options.auth.code,
            'Redirect_Uri': options.auth.redirectUri,
            'Scope': options.auth.scope
          });
          break;
        case 'refresh':
          authorize = this.sender.auth(this._authorization, {
            'Grant_Type': 'refresh_token',
            'Refresh_Token': options.token
          });
          break;
        case 'password':
          authorize = this.sender.auth(this._authorization, {
            'Grant_Type': 'password',
            'UserName': options.user.name,
            'Password': options.user.password,
            'Scope': options.user.scope
          });
          break;
      }
    }

    if (this.connection !== 'connected') {
      if (authorize) {
        promise = authorize.then(response => {
          const current = new Date();
          current.setSeconds(current.getSeconds() + response.expires_in);
          this._accessToken = response.access_token;
          this._refreshToken = response.refresh_token;
          this._expires = current;
          this.state = 'authorized';
          this.emit('authorized', response);
        }).then(initialize);
      } else {
        promise = initialize();
      }

      promise.catch(error => {
        this.emit('error', error);
      });
    }

    return this;
  }

  /**
   * Disconnects from SmartHome.
   * @param callback The optional callback to use when disconnected.
   * @return The current instance.
   */
  disconnect(callback?: (eventData: EventData) => void): SmartHome {
    this.sender.api('/uninitialize', this._accessToken).then(() => {
      this.connection = 'disconnected';
      this.emit('uninitialized');
    });
    return this;
  }

  /**
   * Emits an event by dispatching it to all listeners.
   * @param eventName The name of the event to emit.
   * @param args The event arguments to dispatch.
   * @return The current instance.
   */
  emit(eventName: string, ...args: any[]): SmartHome {
    const listeners = this._listeners[eventName];

    if (listeners) {
      listeners.forEach(listener => listener.apply(this, args));
    }

    return this;
  }

  /**
   * Attaches an event listener.
   * @param eventName The name of the event to listen to.
   * @param callback The code to run in case of the event.
   * @return The current instance.
   */
  on(eventName: string, callback: (eventData: EventData) => void): SmartHome {
    var listeners = this._listeners[eventName];

    if (listeners === undefined) {
      this._listeners[eventName] = listeners = [];
    }

    listeners.push(callback);
    return this;
  }

  /**
   * Detaches an event listener.
   * @param eventName The name of the event to stop listening to.
   * @param callback The specific callback to detach, if any.
   * @return The current instance.
   */
  off(eventName: string, callback?: (eventData: EventData) => void): SmartHome {
    var listeners = this._listeners[eventName];

    if (listeners) {
      if (callback) {
        var index = listeners.indexOf(callback);
        listeners.splice(index, 1);
      } else {
        listeners.splice(0);
      }
    }

    return this;
  }
}