import './App.css';
import {useEffect} from 'react';
import {CounterReply, CounterRequest, Empty} from './protos/counter_pb'
import {UnaryCounter} from './Components/UnaryCounter';
import CounterClient from './protos/counter_grpc_web_pb';


const serverCounterStream = () => {

}


const SetCounterComp = () => {

}

function App() {
    const handleClick = async () => {
        const counterClient = new CounterClient.CounterClient('https://localhost:7064', null, null);
        let stream = counterClient.countdown(new Empty(), {})
        stream.on('data', function (response) {
            console.log(response);
        });
        stream.on('status', function (status) {
            console.log(status.code);
            console.log(status.details);
            console.log(status.metadata);
        });
        stream.on('end', function (end) {
            // stream end signal
        });

        // to close the stream
        stream.cancel()

    }

    useEffect(() => {
        SetCounterComp();
    }, [])

    return (
        <div className="App">
            <button onClick={handleClick}>make stream request</button>
            <UnaryCounter/>
        </div>
    );
}

export default App;
