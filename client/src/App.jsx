import "./App.scss";
import Layout from "./layout";
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Wallets from "./pages/Wallets";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wallets" element={<Wallets />} />
      </Routes>
    </Layout>
  );
}

export default App;
