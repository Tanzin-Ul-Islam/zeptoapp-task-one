import { wishlistAtom, wishlistCounterAtom } from "../store/wishlist";
import { useAtom } from "jotai";
import Toast from "../utils/toast";

const useWishlist = () => {
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  const [wishlistCounter] = useAtom(wishlistCounterAtom || 0);


  const addToWishlist = (book) => {
    const newWishlist = [...wishlist, book];
    setWishlist([...newWishlist]);
    Toast("success", "Item added to wishlist successfully.");
    localStorage.setItem("wishlist", JSON.stringify(newWishlist || []));
  };

  const removeFromWishlist = (book) => {
    const newWishlist = wishlist.filter((item) => item.id !== book.id);
    setWishlist([...newWishlist]);
    Toast("warning", "Item removed from wishlist successfully.");
    localStorage.setItem("wishlist", JSON.stringify(newWishlist || []));
  };


  const isInWishlist = (book) => {
    return wishlist.some((item) => item.id === book.id);
  };


  return {
    wishlist,
    wishlistCounter,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
};

export default useWishlist;
