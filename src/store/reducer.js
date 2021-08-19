const initialState = {};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ACTION_TYPE':
      console.log('payload', payload);
      return {};

    default:
      return state;
  }
};
