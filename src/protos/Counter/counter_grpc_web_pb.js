/**
 * @fileoverview gRPC-Web generated client stub for count
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.count = require('./counter_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.count.CounterClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.count.CounterPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.count.Empty,
 *   !proto.count.CounterReply>}
 */
const methodDescriptor_Counter_GetCounter = new grpc.web.MethodDescriptor(
  '/count.Counter/GetCounter',
  grpc.web.MethodType.UNARY,
  proto.count.Empty,
  proto.count.CounterReply,
  /**
   * @param {!proto.count.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.count.CounterReply.deserializeBinary
);


/**
 * @param {!proto.count.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.count.CounterReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.count.CounterReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.count.CounterClient.prototype.getCounter =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/count.Counter/GetCounter',
      request,
      metadata || {},
      methodDescriptor_Counter_GetCounter,
      callback);
};


/**
 * @param {!proto.count.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.count.CounterReply>}
 *     Promise that resolves to the response
 */
proto.count.CounterPromiseClient.prototype.getCounter =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/count.Counter/GetCounter',
      request,
      metadata || {},
      methodDescriptor_Counter_GetCounter);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.count.Empty,
 *   !proto.count.CounterReply>}
 */
const methodDescriptor_Counter_Increment = new grpc.web.MethodDescriptor(
  '/count.Counter/Increment',
  grpc.web.MethodType.UNARY,
  proto.count.Empty,
  proto.count.CounterReply,
  /**
   * @param {!proto.count.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.count.CounterReply.deserializeBinary
);


/**
 * @param {!proto.count.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.count.CounterReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.count.CounterReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.count.CounterClient.prototype.increment =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/count.Counter/Increment',
      request,
      metadata || {},
      methodDescriptor_Counter_Increment,
      callback);
};


/**
 * @param {!proto.count.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.count.CounterReply>}
 *     Promise that resolves to the response
 */
proto.count.CounterPromiseClient.prototype.increment =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/count.Counter/Increment',
      request,
      metadata || {},
      methodDescriptor_Counter_Increment);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.count.CounterRequest,
 *   !proto.count.Empty>}
 */
const methodDescriptor_Counter_SetCounter = new grpc.web.MethodDescriptor(
  '/count.Counter/SetCounter',
  grpc.web.MethodType.UNARY,
  proto.count.CounterRequest,
  proto.count.Empty,
  /**
   * @param {!proto.count.CounterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.count.Empty.deserializeBinary
);


/**
 * @param {!proto.count.CounterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.count.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.count.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.count.CounterClient.prototype.setCounter =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/count.Counter/SetCounter',
      request,
      metadata || {},
      methodDescriptor_Counter_SetCounter,
      callback);
};


/**
 * @param {!proto.count.CounterRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.count.Empty>}
 *     Promise that resolves to the response
 */
proto.count.CounterPromiseClient.prototype.setCounter =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/count.Counter/SetCounter',
      request,
      metadata || {},
      methodDescriptor_Counter_SetCounter);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.count.Empty,
 *   !proto.count.CounterReply>}
 */
const methodDescriptor_Counter_Countdown = new grpc.web.MethodDescriptor(
  '/count.Counter/Countdown',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.count.Empty,
  proto.count.CounterReply,
  /**
   * @param {!proto.count.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.count.CounterReply.deserializeBinary
);


/**
 * @param {!proto.count.Empty} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.count.CounterReply>}
 *     The XHR Node Readable Stream
 */
proto.count.CounterClient.prototype.countdown =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/count.Counter/Countdown',
      request,
      metadata || {},
      methodDescriptor_Counter_Countdown);
};


/**
 * @param {!proto.count.Empty} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.count.CounterReply>}
 *     The XHR Node Readable Stream
 */
proto.count.CounterPromiseClient.prototype.countdown =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/count.Counter/Countdown',
      request,
      metadata || {},
      methodDescriptor_Counter_Countdown);
};


module.exports = proto.count;

