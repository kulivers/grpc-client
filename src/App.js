import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react';
import CounterClient from './protos/counter_grpc_web_pb'
import counter_pb from './protos/counter_pb'

const CounterReply = counter_pb.CounterReply
const CounterRequest = counter_pb.CounterRequest
const CounterEmpty = counter_pb.Empty


function App() {
    useEffect(() => {
    }, [])
    const handleClick = async () => {
        const counterClient = new CounterClient.CounterClient('https://localhost:7064', null, null);
        const reply = new CounterReply()
        const empty = new CounterEmpty()
        const request = new CounterRequest();


        console.log('request', request)
        console.log('counterClient', counterClient)

        counterClient.getCounter(empty, {'custom-header-1': 'value1'},
            (err, response) => {
                console.log('err', err)
                console.log('response', response)
            })


    }
    return (
        <div className="App">
            <button onClick={handleClick}>papapa</button>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
