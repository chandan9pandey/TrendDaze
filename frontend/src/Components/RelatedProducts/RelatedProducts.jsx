import React, { useState, useEffect } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";
const RelatedProducts = (props) => {
	const { product } = props;
	const [relatedProducts, setRelatedProducts] = useState([]);

	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url
	// console.log(baseUrl);
	useEffect(() => {
		fetch(`${baseUrl.concat("allproducts")}`)
			.then((response) => response.json())
			.then((result) =>
				result.filter((item) => {
					return item.category === product.category;
				})
			)
			.then((res) => res.sort(() => 0.5 - Math.random()).slice(0, 4))
			.then((data) => setRelatedProducts(data));
	}, [product]);
	return (
		<div className="relatedproducts">
			<h1>Related Products</h1>
			<hr />
			<div className="relatedproducts-item">
				{relatedProducts.map((item, i) => {
					return (
						<Item
							key={i}
							id={item.id}
							name={item.name}
							image={item.image}
							new_price={item.new_price}
							old_price={item.old_price}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default RelatedProducts;
