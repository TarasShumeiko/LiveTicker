import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectSoldBitcoins } from '../store';

export const SalesTable = () => {
  const soldBitcoins = useSelector(selectSoldBitcoins);
  const ref = useRef(null);
  const trHeight = ref.current?.offsetHeight;

  return (
    <>
      {!!soldBitcoins.length && (
        <table>
          <tr>
            <th>PRICE</th>
            <th>TOTAL</th>
            <th>AMOUNT</th>
            <th>COUNT</th>
          </tr>
          {soldBitcoins.map(item => {
            const [price, count, amount, total] = item;
            return (
              <>
                <div style={{
                  position: 'absolute',
                  width: `${Math.round((total / soldBitcoins.length) * 100)}%`,
                  maxWidth: 'calc(50vw - 40px)',
                  height: `${trHeight}px`,
                  opacity: 0.5,
                  backgroundColor: '#e44b44',
                }} />
                <tr ref={ref}>
                  <td>{price}</td>
                  <td>{total}</td>
                  <td>{amount}</td>
                  <td>{count}</td>
                </tr>
              </>
            )
          })}
        </table>
      )}
    </>
  );
};
