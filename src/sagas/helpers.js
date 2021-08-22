export const getTotal = (acc, [price, quantity, num], index) => {
  const amount = Math.abs(num);
  if (!index) {
    return [[price, quantity, amount, amount]]
  }
  const [, , , total] = acc[index - 1];
  if (total) {
    const t = Number((amount + total).toFixed(8));
    return [...acc, [price, quantity, amount, t]]
  }
  return acc;
};

export const getPrice = item => {
  const [price] = item;
  return price;
};