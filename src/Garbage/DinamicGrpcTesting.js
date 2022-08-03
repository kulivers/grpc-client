import protobuf from 'protobufjs';
import greeterDescriptor from '../protos/Greeter/greet.json';
import {GreeterClient} from '../protos/Greeter/greet_grpc_web_pb';


function f(packageName = 'greet', serviceName = 'Greeter', methodName = 'SayHello', body = {name: 'Ega'}) {
    const fullProtoName = 'greet.proto'
    var protoName = fullProtoName.split('.')[0]
    const root = protobuf.Root.fromJSON(greeterDescriptor);
    const method = root.lookup(methodName)
    const requestType = method.requestType
    const responseType = method.responseType

    eval(`const {` + requestType + `} = require('../protos/` + serviceName + '/' + packageName + `_pb')`)
    eval(`const {` + requestType + `} = require('../protos/` + serviceName + '/' + packageName + `_grpc_web_pb')`)
    const SayHello = root.lookup('SayHello')
    if (SayHello === null)
        return null;

}

export function DinamicGrpcTesting() {
    function runService(packageName = 'greet', serviceName = 'Greeter', methodName = 'SayHello', body = {name: 'Ega'}) {
        //get directory by proto name, if not exist- dinamicaly create
        //greeterDescriptor(now its import) need to be getted dinamically, it will be allowed when we will get proto from serv

        const {HelloRequest} = require('../protos/Greeter/greet_pb')
        const {GreeterClient} = require('../protos/Greeter/greet_grpc_web_pb')
        let request = new HelloRequest();
        request.setName(body.name)
        let client = new GreeterClient('https://localhost:7064'); //localhost from config
        client.options = {}
        let call = client.sayHello(request);
        console.log(call)


    }

    return (<div>

        <button onClick={() => {
            runService()
        }}>try make fetch
        </button>
    </div>);
}