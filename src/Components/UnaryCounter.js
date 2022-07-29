import {useEffect, useState} from 'react';
import {CounterReply, CounterRequest, Empty} from '../protos/Counter/counter_pb'
import CounterClient from '../protos/Counter/counter_grpc_web_pb';


export const UnaryCounter = () => {
    const [counter, setCounter] = useState([]);
    useEffect(() => {
        fetchCounter()
    }, [])

    const fetchCounter = async () => {
        const counterClient = new CounterClient.CounterClient('https://localhost:7064', null, null);
        const empty = new Empty()
        counterClient.getCounter(empty, {'custom-header-1': 'value1'},
            (err, response) => {
                if (err) {
                    console.log('error in fetchCounter')
                    console.log(err.code);
                    console.log(err.message);
                } else {
                    setCounter(response.array)
                }
            })
    }
    const setCounterRequest = (value) => {
        const counterClient = new CounterClient.CounterClient('https://localhost:7064', null, null);
        const request = new CounterRequest();
        request.setCount(value)
        counterClient.setCounter(request);
    }

    const incrementCounterRequest = async () => {
        const counterClient = new CounterClient.CounterClient('https://localhost:7064', null, null);
        const emptyMessage = new Empty()
        counterClient.increment(emptyMessage, {'custom-header-1': 'value1'},
            (err, response) => {
                if (err) {
                    console.log(err.code);
                    console.log(err.message);
                } else {
                    fetchCounter()
                }
            })
    }
    const [inputValue, setInputValue] = useState(20);
    return (
        <div style={{
            marginTop: '30px',
            border: 'solid red 2px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <h1>unary requests</h1>
            <button onClick={fetchCounter}>Get Counter from server</button>
            <button onClick={incrementCounterRequest}>inc</button>
            <div>
                <input style={{marginRight: '8px'}} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <button onClick={() => {
                    setCounterRequest(inputValue)
                }}>Set counter
                </button>
            </div>
            <br/>
            <span>Counter from server: {counter.length === 0 ? '' : counter.map(c => c + ' ')}</span>

        </div>
    )
}

