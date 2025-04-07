import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const wishlistAtom = atomWithStorage("wishlist", []);

export const wishlistCounterAtom = atom((get) => get(wishlistAtom).length);
