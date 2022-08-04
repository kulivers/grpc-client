import protobuf from 'protobufjs'
import {CountDownStream} from './Components/CountDownStream';
import {UnaryCounter} from './Components/UnaryCounter';
import {frameRequest} from './Helpers/FrameRequest';
import {CounterClient} from './protos/Counter/counter_grpc_web_pb';
import {CounterRequest, Empty} from '../src/protos/Counter/counter_pb';
import counterJSONDescriptor from '../src/protos/Counter/counter.json'

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

            console.log('xhr response ', xhr)
        }
    }
}

function sayHelloRequest() {
    const counterClient = new CounterClient('https://localhost:7064', null, null);
    let emptyGen = new Empty();
    let serializedEmptyGen = emptyGen.serializeBinary()
    var root = protobuf.Root.fromJSON(counterJSONDescriptor);
    var CounterRequestJSON = root.lookup('CounterRequest')
    var encodedEmptyReq = CounterRequestJSON.encode({}).finish();
    var encodedCounterReq = CounterRequestJSON.encode({count: 321}).finish();
    var counterRequest = new CounterRequest()
    counterRequest.setCount(2131)

    var data = Uint8Array.from([65, 65, 65, 65, 65, 65, 65, 61])
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
                sayHelloRequest()
            }}>
                get counter by fetch
            </button>
            <hr style={{backgroundColor: 'blue', border: '3px solid blue', width: '100%'}}/>
            <hr style={{backgroundColor: 'blue', border: '3px solid blue', width: '100%'}}/>
            <hr style={{backgroundColor: 'blue', border: '3px solid blue', width: '100%'}}/>
            <button onClick={()=>{
                var root = protobuf.Root.fromJSON(counterJSONDescriptor);
                var CounterReply = root.lookup('CounterReply')
                var decoded = CounterReply.decode(xhr.response)
                console.log('decoded', decoded)


            }}>lil test button </button>

        </div>
    );
}
export default App;