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
	const [loading, setLoading] = useState(true);
	const [all_product, setAll_product] = useState([]);
	const [cartItems, setCartItems] = useState(getDefaultCart());
	const [loggedIn, setLoggedIn] = useState(false);

	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url
	// console.log(baseUrl);
	useEffect(() => {
		const loadingTimeout = setTimeout(() => {
			setLoading(true);
		}, 5000);
		fetch(`${baseUrl.concat("allproducts")}`)
			.then((response) => response.json())
			.then((data) => setAll_product(data))
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				clearTimeout(loadingTimeout);
				setLoading(false);
			});

		if (localStorage.getItem("auth-token")) {
			setLoggedIn(true);
			fetch(`${baseUrl.concat("getcart")}`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"auth-token": `${localStorage.getItem("auth-token")}`,
					"Content-Type": "application/json",
				},
				body: "",
			})
				.then((response) => response.json())
				.then((data) => setCartItems(data));
		}
	}, []);

	const addToCart = (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
		if (localStorage.getItem("auth-token")) {
			fetch(`${baseUrl.concat("addtocart")}`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"auth-token": `${localStorage.getItem("auth-token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					itemId: itemId,
				}),
			})
				.then((response) => response.json())
				.then((data) => console.log(data));
		}
	};

	const removeFromCart = (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
		if (localStorage.getItem("auth-token")) {
			fetch(`${baseUrl.concat("removefromcart")}`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"auth-token": `${localStorage.getItem("auth-token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					itemId: itemId,
				}),
			})
				.then((response) => response.json())
				.then((data) => console.log(data));
		}
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
		return totalAmount.toFixed(2);
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
		loading,
		all_product,
		cartItems,
		addToCart,
		removeFromCart,
		getTotalCartAmount,
		getTotalCartItems,
		loggedIn,
	};

	return (
		<ShopContext.Provider value={contextValue}>
			{props.children}
		</ShopContext.Provider>
	);
};

export default ShopContextProvider;
