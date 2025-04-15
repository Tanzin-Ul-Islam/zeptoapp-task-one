import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import HomePage from "./page/Home";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
