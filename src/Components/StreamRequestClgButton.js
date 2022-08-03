import {HelloRequest} from '../protos/Greeter/greet_pb';
import {GreeterClient} from '../protos/Greeter/greet_grpc_web_pb';

export function StreamRequestClgButton() {
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
            }}>Get greets in clg
            </button>
        </div>
    )
}