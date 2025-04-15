import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import HomePage from "./page/Home";
import WishlistPage from "./page/Wishlist";
import BookDetails from "./page/BookDetials";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/book/:bookId" element={<BookDetails />} />
        <Route path="/wishlist" element={<WishlistPage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
