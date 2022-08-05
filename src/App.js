
import Header from './components/Header';
import Footer from './components/Footer/Footer';
import InvoiceGenerator from './invoice-generator/InvoiceGenerator'

import classes from './App.module.css'


function App() {
  return (
    <div className={classes.wrapper}>
      <Header />
      <InvoiceGenerator />
      <Footer/>
    </div>
  );
}

export default App;
