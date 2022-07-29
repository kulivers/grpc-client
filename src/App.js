import {UnaryCounter} from './Components/UnaryCounter';
import {SteamRequest} from './Components/SteamRequest';

const {HelloRequest, HelloReply} = require('./protos/Greeter/greet_pb');
const {GreeterClient} = require('./protos/Greeter/greet_grpc_web_pb');

function GreeterDemo() {
    var streamingCall = null;

    function MakeStreamRequest(nameInput = 'bitc') {
        if (!streamingCall) {
            var request = new HelloRequest();
            request.setName(nameInput);
            var client = new GreeterClient('https://localhost:7064');
            streamingCall = client.sayHellos(request, {});
            streamingCall.on('data', (response) => {
                console.log('respose ', response)
            });
            streamingCall.on('status', (status) => {
                if (status.code === 0) {
                    console.log('DONE, status is: ', status)
                } else {
                    console.log('ERROR, status is: ', status)
                }
            });
        } else {
            console.log('STREAMING CALL CANSEL')
            streamingCall.cancel();
            streamingCall = null;
        }
    }

    return (
        <div>
            <h1>Greeter: </h1>
            <button onClick={() => {
                MakeStreamRequest()
            }}>MakeStreamRequest
            </button>

            <button onClick={() => {
                MakeStreamRequest()
            }}>Stop steam
            </button>

        </div>
    )
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
            <SteamRequest/>
            <UnaryCounter/>
            <span style={{marginTop: '8px', fontStyle: 'italic', fontWeight: 'bold'}}>Yeah, server returns {'{{}}'}, (it is empty array in js) when the counter equals 0 instead of {'{'}"curCounter": 0{'}'} , idk why </span>

            If you need client-side streaming, that is currently not supported
            <hr/>
            <hr/>
            <hr/>
            <GreeterDemo/>
        </div>
    );
}

export default App;
