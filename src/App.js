import { Header } from './components/Header';
import { PurchaseTable } from './components/PurchaseTable';
import { SalesTable } from './components/SalesTable';

export const App = () => (
  <div className="app">
    <Header />
    <div className="wrapper">
      <PurchaseTable />
      <SalesTable />
    </div>
  </div>
);
