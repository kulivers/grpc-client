function base64_decode(s) {
    var base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    // remove/ignore any characters not in the base64 characters list
    //  or the pad character -- particularly newlines
    s = s.replace(new RegExp('[^' + base64chars.split('') + '=]', 'g'), '');

    // replace any incoming padding with a zero pad (the 'A' character is zero)
    var p = (s.charAt(s.length - 1) == '=' ?
        (s.charAt(s.length - 2) == '=' ? 'AA' : 'A') : '');
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

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function base64ToArrayBuffer(base64) {
    var binary_string = atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

function stringToArrayBuffer(str) {
    function codePointAtPolyfill(str, index) {
        let code = str.charCodeAt(index);
        if (code >= 0xd800 && code <= 0xdbff) {
            const surr = str.charCodeAt(index + 1);
            if (surr >= 0xdc00 && surr <= 0xdfff) {
                code = 0x10000 + ((code - 0xd800) << 10) + (surr - 0xdc00);
            }
        }
        return code;
    }

    const asArray = new Uint8Array(str.length);
    let arrayIndex = 0;
    for (let i = 0; i < str.length; i++) {
        const codePoint = (String.prototype).codePointAt ? (str).codePointAt(i) : codePointAtPolyfill(str, i);
        asArray[arrayIndex++] = codePoint & 0xFF;
    }
    return asArray;
}

function getBinaryHex(grpcText) {
    const buffers = [];
    for (const text of grpcText) {
        const buffer = Buffer.from(text, "base64");
        const bufString = buffer.toString("hex");
        buffers.push(bufString);
    }
    return buffers;
}


module.exports = {arrayBufferToBase64, base64_decode, base64ToArrayBuffer, stringToArrayBufferFROMLIB: stringToArrayBuffer, getBinaryHex}