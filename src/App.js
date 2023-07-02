import "./App.css";
import Product from "./components/Product";
import { ProductProvider } from "./context/ProductContext";
import { ModeProvider } from "./context/ModeContext";

function App() {
  return (
    <div className="App">
      <ModeProvider>
        <ProductProvider>
          <Product />
        </ProductProvider>
      </ModeProvider>
    </div>
  );
}

export default App;
