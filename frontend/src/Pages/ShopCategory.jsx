import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import { Grid } from "react-loader-spinner";
const ShopCategory = (props) => {
	const { loading, all_product } = useContext(ShopContext);
	return (
		<div className="shop-category">
			<img className="shopcategory-banner" src={props.banner} alt="" />
			<div className="shopcategory-indexSort">
				<p>
					<span>Showing 1-12</span> out of 36 products
				</p>
				<div className="shopcategory-sort">
					Sort by <img src={dropdown_icon} alt="" />
				</div>
			</div>
			{loading ? (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginTop: "200px",
						marginBottom: "200px",
					}}
				>
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
				<>
					<div className="shopcategory-products">
						{all_product.map((item, i) => {
							if (props.category === item.category) {
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
							} else {
								return null;
							}
						})}
					</div>
					<div className="shopcategory-loadmore">Explore More</div>
				</>
			)}
		</div>
	);
};

export default ShopCategory;
