import { call, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

const payload = {
  event: "subscribe",
  channel: "book",
  symbol: "tBTCUSD",
};

const createSocketChannel = () =>
  eventChannel(emitter => {
    const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    ws.onopen = () => {
      ws.send(JSON.stringify(payload));
    };

    ws.onmessage = message => {
      let msg;
      try {
        msg = JSON.parse(message.data);
      } catch (error) {
        console.error(`Error parsing: ${error}`);
      }
      if (msg) {
        emitter( { type: 'ACTION_TYPE', payload: msg } );
      }
    };

    ws.onerror = error => {
      console.log(`WebSocket error: ${error}`);
    }

    // unsubscribe function
    return () => {
      console.log('Socket off');
    };
  });

export function* saga() {
  const channel = yield call(createSocketChannel);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}
