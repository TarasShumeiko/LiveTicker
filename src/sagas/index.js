import { call, put, select, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { SET_DATA, SET_EVENT, UPDATE_BOUGHT_BITCOINS, UPDATE_SOLD_BITCOINS } from '../store';

const payload = {
  event: "subscribe",
  channel: "book",
  symbol: "tBTCUSD",
};

const createSocketChannel = () =>
  eventChannel((emitter) => {
    const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    ws.onopen = () => {
      ws.send(JSON.stringify(payload));
    };

    ws.onmessage = message => {
      emitter(JSON.parse(message.data));
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
    const state = yield select();
    const data = yield take(channel);

    if (data.event) {
      yield put({ type: SET_EVENT, payload: data.event });
    }

    let result;
    if (Array.isArray(data)) {
      const [, items] = data;
      result = items;
    }

    if (state.event === 'subscribed' && result?.length === 50) {
      const boughtBitcoins = result.slice(0, 25);
      const soldBitcoins = result.slice(25, 50);
      yield put({ type: SET_DATA, payload: { boughtBitcoins, soldBitcoins } });
    }

    if (state.event === 'subscribed' && result?.length === 3) {
      const [price, quantity, amount] = result;
      const getPrice = item => {
        const [price] = item;
        return price;
      };
      const boughtBitcoinsPrices = state.boughtBitcoins.map(getPrice)
      if (quantity > 0 && amount > 0 && boughtBitcoinsPrices.some(p => price > p)) {
        const index = boughtBitcoinsPrices.findIndex(p => price > p);
        const higherPricesBitcoins = state.boughtBitcoins.slice(0, index);
        const lowerPricesBitcoins = state.boughtBitcoins.slice(index, 24);
        const bitcoins = [...higherPricesBitcoins, result, ...lowerPricesBitcoins];
        yield put({ type: UPDATE_BOUGHT_BITCOINS, payload: bitcoins });
      }
      const soldBitcoinsPrices = state.soldBitcoins.map(getPrice)
      if (quantity > 0 && amount < 0 && soldBitcoinsPrices.some(p => price < p)) {
        const index = soldBitcoinsPrices.findIndex(p => price < p);
        const lowerPricesBitcoins = state.soldBitcoins.slice(0, index);
        const higherPricesBitcoins = state.soldBitcoins.slice(index, 24);
        const bitcoins = [...lowerPricesBitcoins, result, ...higherPricesBitcoins];
        yield put({ type: UPDATE_SOLD_BITCOINS, payload: bitcoins });
      }
    }
  }
}
