import protobuf from 'protobufjs';
import greeterDescriptor from './protos/Greeter/greet.json';
import {toUTF8Array} from './Helpers/ToUTF8Array';
import {CountDownStream} from './Components/CountDownStream';
import {UnaryCounter} from './Components/UnaryCounter';
import {StreamRequestClgButton} from './Components/StreamRequestClgButton';
import {frameRequest} from './Helpers/FrameRequest';


function sayHelloRequest() {
    let BASE_URL = 'https://localhost:7064'
    const serviceName = 'greet.Greeter'
    const methodName = 'SayHello'
    const root = protobuf.Root.fromJSON(greeterDescriptor);
    const Greeter = root.lookup('Greeter')
    var greeter = Greeter.create(/* see above */ rpcImpl, /* request delimited? */ false, /* response delimited? */ false);
    console.log(greeter)
    greeter.sayHello({ name: 'EGA ETA YA' }, function(err, response) {
        console.log('Greeting: ', response);
    });


    // fetch(`${BASE_URL}/${serviceName}/${methodName}`, {
    //     method: 'POST',
    //     mode: 'cors',
    //     cache: 'no-cache',
    //     headers: {
    //         'Content-Type': 'application/grpc-web-text',
    //         'X-Accept-Content-Transfer-Encoding': 'base64',
    //         'accept': 'application/grpc-web',
    //     },
    //     body: {name: 'EGA'},
    // }).then(async response => {
    //     const reader = response.body.getReader();
    //     while(true) {
    //         const {done, value} = await reader.read();
    //         console.log(`Получено ${value}`)
    //         if (done) {
    //             break;
    //         }
    //     }})
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
            <StreamRequestClgButton/>
            <hr/>
            <br/>

            <button onClick={() => {
                sayHelloRequest()
            }}>
                sayHelloRequest            </button>
            <hr style={{backgroundColor: 'blue', border: '3px solid blue', width: '100%'}}/>

        </div>
    );
}

function rpcImpl(method, requestData, callback) {
    // console.log(method)
    // console.log(requestData)
    // console.log(callback)

    let BASE_URL = 'https://localhost:7064'
    const serviceName = 'greet.Greeter'
    const methodName = 'SayHello'
    return async (method, requestData, callback) => {
        const request = await fetch(`${BASE_URL}/${serviceName}/${methodName}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/grpc-web+proto',
                'x-grpc-web': '1',
            },
            body: frameRequest(requestData),
        });
        console.log(request)
    };
}

export default App;