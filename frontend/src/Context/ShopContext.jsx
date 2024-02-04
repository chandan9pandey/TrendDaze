import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
	let cart = {};
	for (let index = 0; index < 300 + 1; index++) {
		cart[index] = 0;
	}
	return cart;
};

const ShopContextProvider = (props) => {
	const [all_product, setAll_product] = useState([]);
	const [cartItems, setCartItems] = useState(getDefaultCart());

	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url
	// console.log(baseUrl);
	useEffect(() => {
		fetch(`${baseUrl.concat("allproducts")}`)
			.then((response) => response.json())
			.then((data) => setAll_product(data));
	}, []);

	const addToCart = (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
		console.log(cartItems);
	};
	const removeFromCart = (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
	};
	const getTotalCartAmount = () => {
		let totalAmount = 0;
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				let itemInfo = all_product.find(
					(product) => product.id === Number(item)
				);
				totalAmount += itemInfo.new_price * cartItems[item];
			}
		}
		return totalAmount;
	};
	const getTotalCartItems = () => {
		let totalItem = 0;
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				totalItem += cartItems[item];
			}
		}
		return totalItem;
	};
	const contextValue = {
		all_product,
		cartItems,
		addToCart,
		removeFromCart,
		getTotalCartAmount,
		getTotalCartItems,
	};

	return (
		<ShopContext.Provider value={contextValue}>
			{props.children}
		</ShopContext.Provider>
	);
};

export default ShopContextProvider;
