import { useSelector } from 'react-redux';
import { selectSoldBitcoins } from '../store';

export const SalesTable = () => {
  const soldBitcoins = useSelector(selectSoldBitcoins);

  return (
    <>
      {!!soldBitcoins.length && (
        <table>
          <tr>
            <th>PRICE</th>
            <th>AMOUNT</th>
            <th>COUNT</th>
          </tr>
          {soldBitcoins.map(item => {
            const [price, count, amount] = item;
            return (
              <tr>
                <td>{price}</td>
                <td>{amount}</td>
                <td>{count}</td>
              </tr>
            )
          })}
        </table>
      )}
    </>
  );
};
