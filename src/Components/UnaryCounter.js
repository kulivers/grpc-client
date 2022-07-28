import {useEffect, useState} from 'react';
import {CounterReply, CounterRequest, Empty} from '../protos/counter_pb'
import CounterClient from '../protos/counter_grpc_web_pb';


export const UnaryCounter = () => {
    const [counter, setCounter] = useState([]);
    useEffect(() => {
        fetchCounter()
    }, [])
    const fetchCounter = async () => {
        const counterClient = new CounterClient.CounterClient('https://localhost:7064', null, null);
        const reply = new CounterReply()
        const empty = new Empty()
        const request = new CounterRequest();
        counterClient.getCounter(empty, {'custom-header-1': 'value1'},
            (err, response) => {
                if (err) {
                    console.log(err.code);
                    console.log(err.message);
                } else {
                    console.log(response.array)
                    setCounter(response.array)
                }
            })
    }
    const makeIncrementCounterRequest = async () => {
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
    return (
        <div>
            <button onClick={makeIncrementCounterRequest}>inc</button>
            <button onClick={fetchCounter}>Get Counter from server</button>
            <span>Counter from server: {counter.length === 0 ? '' : counter.map(c => c + ' ')}</span>
        </div>
    )
}