import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectBoughtBitcoins } from '../store';

export const PurchaseTable = () => {
  const boughtBitcoins = useSelector(selectBoughtBitcoins);
  const ref = useRef(null);
  const trHeight = ref.current?.offsetHeight;

  return (
    <>
      {!!boughtBitcoins.length && (
        <table>
          <tr>
            <th>COUNT</th>
            <th>AMOUNT</th>
            <th>TOTAL</th>
            <th>PRICE</th>
          </tr>
          {boughtBitcoins.map(item => {
            const [price, count, amount, total] = item;
            return (
              <>
                <div style={{
                  position: 'absolute',
                  right: '50%',
                  width: `${Math.round((total / boughtBitcoins.length) * 100)}%`,
                  maxWidth: 'calc(50vw - 40px)',
                  height: `${trHeight}px`,
                  opacity: 0.5,
                  backgroundColor: '#01A781',
                }} />
                <tr ref={ref}>
                  <td>{count}</td>
                  <td>{amount}</td>
                  <td>{total}</td>
                  <td>{price}</td>
                </tr>
              </>
            )
          })}
        </table>
      )}
    </>
  );
};
