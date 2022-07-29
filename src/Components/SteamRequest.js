import {CounterClient} from '../protos/Counter/counter_grpc_web_pb';
import {Empty} from '../protos/Counter/counter_pb';


var streamingCall = null;
const streamRequest = async () => {
    if (!streamingCall) {
        let emptyRequest = new Empty();
        const counterClient = new CounterClient('https://localhost:7064');
        streamingCall = counterClient.countdown(emptyRequest, {})

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


export function SteamRequest() {


    return (<div>
        <h1>my stream</h1>
        <button onClick={() => streamRequest()}>make stream request</button>
    </div>)
}