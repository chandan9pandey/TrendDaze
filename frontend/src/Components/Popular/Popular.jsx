import React, { useState, useEffect } from "react";
import "./Popular.css";
import Item from "../Item/Item";
import { Grid } from "react-loader-spinner";
const Popular = () => {
	const [loading, setLoading] = useState(true);
	const [popularInWomen, setPopularInWomen] = useState([]);

	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url
	// console.log(baseUrl);
	useEffect(() => {
		fetch(`${baseUrl.concat("popularinwomen")}`)
			.then((response) => response.json())
			.then((data) => setPopularInWomen(data));
		setLoading(false);
	}, []);
	return (
		<div className="popular">
			<h1>POPULAR IN WOMEN</h1>
			<hr />
			{loading ? (
				<div style={{ marginTop: "50px" }}>
					<Grid
						visible={true}
						height="90"
						width="90"
						color="#ecbef7"
						ariaLabel="grid-loading"
						radius="12.5"
						wrapperStyle={{}}
						wrapperClass="grid-wrapper"
					/>
				</div>
			) : (
				<div className="popular-item">
					{popularInWomen.map((item, i) => {
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
			)}
		</div>
	);
};

export default Popular;
