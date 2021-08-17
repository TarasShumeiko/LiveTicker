// import { eventChannel } from 'redux-saga';
// import { call, fork, put, take } from 'redux-saga/effects';
// import io from 'socket.io-client';
//
// const socket = io('wss://api-pub.bitfinex.com/ws/2');
//
// const SocketEvents = {
//   event: "subscribe",
//   channel: "book",
//   symbol: "tBTCUSD",
// };
//
// const createLiveTickerChannel = () => {
//   const subscribe = emitter => {
//     socket.on(SocketEvents, emitter);
//     return () => socket.removeListener(SocketEvents, emitter);
//   };
//   return eventChannel(subscribe);
// }
//
// function* liveTickerSaga() {
//   const channel = yield call(createLiveTickerChannel);
//   while (true) {
//     const jobs = yield take(channel);
//     console.log('jobs', jobs);
//     // const action = JobsActions.fresh(jobs);
//     // yield put(action);
//   }
// }
//
// export function* saga() {
//   yield fork(liveTickerSaga);
// }


import { all, apply, call, fork, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

// function createSocketConnection() {
//   return new WebSocket('wss://api-pub.bitfinex.com/ws/2');
// }

const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2')

const createSocketChannel = ws =>
  eventChannel(emitter => {
    ws.addEventListener('message', message => {
      socket.send({
        event: "subscribe", channel: "book", symbol: "tBTCUSD"
      })
      console.log('message.data', message.data);
    });

    ws.addEventListener('open', () => {
      socket.send({
        event: "subscribe", channel: "book", symbol: "tBTCUSD"
      })
      console.log('open');
    });

    ws.addEventListener('error', () => {
      console.log('error');
    });

    ws.addEventListener('close', () => {
      console.log('close');
    });

    return () => ws.close();
  });

function* emitResponse(socket) {
  yield apply(socket, socket.emit, ['message received']);
}

function* watchSocketChannel() {
  // const socket = yield call(createSocketConnection, 'http://localhost:3000', 'wss://api-pub.bitfinex.com/ws/2');
  const socketChannel = yield call(createSocketChannel, socket);

  console.log('socket', socket);
  console.log('socketChannel', socketChannel);

  while (true) {
    try {
      const payload = yield take(socketChannel);
      console.log('payload', payload);
      // yield put({type: actions.WEBSOCKET_MESSAGE, payload});
      yield fork(emitResponse, socket);
    } catch (err) {
      console.log('socket error: ', err);
    }
  }
}

export function* saga() {
  yield all([
    fork(watchSocketChannel),
  ])
}
