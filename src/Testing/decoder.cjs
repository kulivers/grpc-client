var jspb = require('google-protobuf');
var goog = jspb;

function base64_decode(s) {
    var base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    // remove/ignore any characters not in the base64 characters list
    //  or the pad character -- particularly newlines
    s = s.replace(new RegExp('[^' + base64chars.split('') + '=]', 'g'), '');

    // replace any incoming padding with a zero pad (the 'A' character is zero)
    var p = (s.charAt(s.length - 1) === '=' ?
        (s.charAt(s.length - 2) === '=' ? 'AA' : 'A') : '');
    var r = '';
    s = s.substr(0, s.length - p.length) + p;

    // increment over the length of this encoded string, four characters at a time
    for (var c = 0; c < s.length; c += 4) {

        // each of these four characters represents a 6-bit index in the base64 characters list
        //  which, when concatenated, will give the 24-bit number for the original 3 characters
        var n = (base64chars.indexOf(s.charAt(c)) << 18) + (base64chars.indexOf(s.charAt(c + 1)) << 12) +
            (base64chars.indexOf(s.charAt(c + 2)) << 6) + base64chars.indexOf(s.charAt(c + 3));

        // split the 24-bit number into the original three 8-bit (ASCII) characters
        r += String.fromCharCode((n >>> 16) & 255, (n >>> 8) & 255, n & 255);
    }
    // remove any zero pad that was added to make this a multiple of 24 bits
    return r.substring(0, r.length - p.length);
}

function frameRequest(bytes) {
    const frame = new ArrayBuffer(bytes.byteLength + 5);
    new DataView(frame, 1, 4).setUint32(0, bytes.length, false);
    new Uint8Array(frame, 5).set(bytes);
    return new Uint8Array(frame);
}

function parseChunk(buffer) {
    return new ChunkParser()
        .parse(new Uint8Array(buffer))
        .find(chunk => chunk.chunkType === ChunkType.MESSAGE);
}




function _base64ToArrayBuffer(base64) {
    var binary_string = atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}


var encoded = ''
//                                                                 //echo 080110c0071a052f74657374 | xxd -r -p | protoc --decode_raw   !!!!IN CMD!!!!
var buffer = _base64ToArrayBuffer('AAAAAAwIARDABxoFL3Rlc3Q=') //  00       00 00 00 0c      080110c0071a052f74657374
console.log(buffer)                                                  // flag        length=12       grab next 12 bytes



encoded = 'AAAAAAIIFA==gAAAABBncnBjLXN0YXR1czogMA0K' // BAD
buffer = _base64ToArrayBuffer(encoded)
console.log(buffer) //0814 = 1: 20, works fine




