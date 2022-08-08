import jspb from 'google-protobuf'
import protobuf from 'protobufjs'
import {CountDownStream} from './Components/CountDownStream';
import {UnaryCounter} from './Components/UnaryCounter';
import counterJSONDescriptor from '../src/protos/Counter/counter.json'
import {base64_decode, base64ToArrayBuffer, getBinaryHex, stringToArrayBufferFROMLIB} from './Helpers/base64Helper';
import {CounterReply, CounterRequest, Empty} from '../src/protos/Counter/counter_pb'
import {ChunkParser} from './Helpers/Chunkparser';
import {frameRequest} from './Helpers/FrameRequest';
import {UInt32Value} from 'google-protobuf/google/protobuf/wrappers_pb';

const MakeXHRGrpcRequest = (url, data) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true)
    xhr.setRequestHeader('accept', 'application/grpc-web-text')
    xhr.setRequestHeader('content-type', 'application/grpc-web-text')
    xhr.setRequestHeader('x-grpc-web', 1)
    xhr.setRequestHeader('x-user-agent', 'grpc-web-javascript/0.1')
    xhr.send(data)


    xhr.onload = function () {
        if (xhr.status !== 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
        } else { // если всё прошло гладко, выводим результат
            var response = xhr.response
            response = 'AAAAAAIIFA=='
            console.log(getBinaryHex(response))
            var buffer = stringToArrayBufferFROMLIB(response); // 65 65, this one decrypts invalid strings
            const data = atob(response);
            const array = Uint8Array.from(data, b => b.charCodeAt(0));


        }
    }
}

function makeCounterRequest() {
    let data = Uint8Array.from([65, 65, 65, 65, 65, 65, 65, 61]); //'AAAAAAA='
    let url = 'https://localhost:7064/count.Counter/GetCounter'
    MakeXHRGrpcRequest(url, data)
}

function App() {
    return (
        <div style={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>

            <CountDownStream/>
            <UnaryCounter/>
            <span style={{marginTop: '8px', fontStyle: 'italic', fontWeight: 'bold'}}>Yeah, server returns {'{{}}'}, (it is empty array in js) when the counter equals 0 instead of {'{'}"curCounter": 0{'}'} , idk why </span>
            If you need client-side streaming, that is currently not supported
            <hr/>
            <hr/>
            <hr/>

            <hr/>
            <br/>

            <button onClick={() => {
                makeCounterRequest()
            }}>
                get counter request
            </button>
            <hr style={{backgroundColor: 'blue', border: '3px solid blue', width: '100%'}}/>
            <button onClick={() => {
                var root = protobuf.Root.fromJSON(counterJSONDescriptor);
                var response = 'AAAAAAIIFA=='
                const asciiResponse = atob(response);
                const array = Uint8Array.from(asciiResponse, b => b.charCodeAt(0));
                var parser = new ChunkParser()
                var chunks = parser.parse(array)
                var payload = chunks[0].data
                var counterReply = root.lookup('CounterReply')
                console.log(counterReply.decode(payload))

            }}>lil debug button
            </button>

            <br/>
        </div>
    );
}

export default App;