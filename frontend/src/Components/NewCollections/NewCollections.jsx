import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";
import { Grid } from "react-loader-spinner";
const NewCollections = () => {
	const [loading, setLoading] = useState(true);
	const [new_collections, setNew_collections] = useState([]);

	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url
	// console.log(baseUrl);
	useEffect(() => {
		fetch(`${baseUrl.concat("newcollections")}`)
			.then((response) => response.json())
			.then((data) => setNew_collections(data));
		setLoading(false);
	}, []);

	return (
		<div className="new-collections">
			<h1>NEW COLLECTIONS</h1>
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
				<div className="collections">
					{new_collections.map((item, i) => {
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

export default NewCollections;
