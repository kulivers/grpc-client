import jspb from 'google-protobuf'
import protobuf from 'protobufjs'
import {CountDownStream} from './Components/CountDownStream';
import {UnaryCounter} from './Components/UnaryCounter';
import counterJSONDescriptor from '../src/protos/Counter/counter.json'
import {base64_decode} from './Helpers/base64Helper';
import {CounterReply} from '../src/protos/Counter/counter_pb'
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
            var root = protobuf.Root.fromJSON(counterJSONDescriptor);
            var CounterReply = root.lookup('CounterReply')
            var bytes = base64_decode(xhr.response)
            var result = CounterReply.decode(new Uint8Array(bytes))
            console.log(result)
        }
    }
}

function makeCounterRequest() {
    // const counterClient = new CounterClient('https://localhost:7064', null, null);
    // let serializedEmptyGen = emptyGen.serializeBinary()
    // var encodedEmptyReq = CounterRequestJSON.encode({}).finish();
    // var encodedCounterReq = CounterRequestJSON.encode({count: 321}).finish();
    // let emptyGen = new Empty();
    // var CounterRequestJSON = root.lookup('CounterRequest')
    // var root = protobuf.Root.fromJSON(counterJSONDescriptor);
    // let counterRequest = new CounterRequest();
    // counterRequest.setCount(2131)
    let data = Uint8Array.from([65, 65, 65, 65, 65, 65, 65, 61]);
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
                var counter = new CounterReply();
                counter.setCurcounter(20)
                console.log(counter.getCurcounter())


                // counter.serializeBinary() internally
                var writer = new jspb.BinaryWriter();
                var f = undefined;
                f = 20; //getCounter
                writer.writeInt32(1,f)
                var buffer =  writer.getResultBuffer(); // 8 20, equal to counter.serializeBinary()


            }}>lil debug button
            </button>
            <br/>
            <button onClick={()=>{


            }}> make greet req</button>
        </div>
    );
}

export default App;