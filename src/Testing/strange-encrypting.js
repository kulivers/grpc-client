const protobuf = require('protobufjs')
const {CounterRequest, CounterReply} = require('../protos/Counter/counter_pb');
const {arrayBufferToBase64} = require('../Helpers/base64Helper');
const jspb = require('google-protobuf');
const {Test1} = require('./Test1_pb')

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var counterRequest = new CounterRequest();
counterRequest.setCount(20)
var binary = counterRequest.serializeBinary()
// console.log(binary) //  [08, 20] = { 1: 32 } in protoc, wtf
var a = arrayBufferToBase64(binary)
// console.log(a)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const reply = new CounterReply();
reply.setCurcounter(20)
const replyBin = reply.serializeBinary(); //same
// console.log(replyBin)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
protobuf.load('Test1.proto', function (err, root) {
    var Test1 = root.lookup('Test1')
    var buffer = Test1.encode(150).finish()
    // console.log('adas',new Uint8Array(buffer))
})
////////////////////////////////////////////////////////////////////////
var test = new Test1()
test.setA(150)
console.log(test.serializeBinary()) //Uint8Array(3) [ 8, 150, 1 ]
// AHAHAHA https://developers.google.com/protocol-buffers/docs/encoding CHECK EXAMPLE