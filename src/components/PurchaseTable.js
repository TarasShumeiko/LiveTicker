import { useSelector } from 'react-redux';
import { selectBoughtBitcoins } from '../store';

export const PurchaseTable = () => {
  const boughtBitcoins = useSelector(selectBoughtBitcoins);

  return (
    <>
      {!!boughtBitcoins.length && (
        <table>
          <tr>
            <th>COUNT</th>
            <th>AMOUNT</th>
            <th>PRICE</th>
          </tr>
          {boughtBitcoins.map(item => {
            const [price, count, amount] = item;
            return (
              <tr>
                <td>{count}</td>
                <td>{amount}</td>
                <td>{price}</td>
              </tr>
            )
          })}
        </table>
      )}
    </>
  );
};
