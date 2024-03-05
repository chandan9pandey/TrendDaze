import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import nav_dropdown from "../Assets/dropdown.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
const Navbar = () => {
	const [menu, setMenu] = useState("shop");
	const { loggedIn, getTotalCartItems } = useContext(ShopContext);
	const menuRef = useRef();
	const dropdown_toggle = (e) => {
		menuRef.current.classList.toggle("nav-menu-visible");
		e.target.classList.toggle("open");
	};
	return (
		<div className="navbar">
			<div className="nav-logo" onClick={() => window.location.replace("/")}>
				<img src={logo} alt="logo" />
				<p>TrendDaze</p>
			</div>
			<img
				className="nav_dropdown"
				src={nav_dropdown}
				onClick={dropdown_toggle}
				alt=""
			/>
			<ul ref={menuRef} className="nav-menu">
				<li
					onClick={() => {
						setMenu("shop");
					}}
				>
					<Link to="/"> Shop </Link>

					{menu === "shop" ? <hr /> : <></>}
				</li>
				<li
					onClick={() => {
						setMenu("mens");
					}}
				>
					<Link to="/mens"> Mens </Link>
					{menu === "mens" ? <hr /> : <></>}
				</li>
				<li
					onClick={() => {
						setMenu("womens");
					}}
				>
					<Link to="/womens"> Womens </Link>
					{menu === "womens" ? <hr /> : <></>}
				</li>
				<li
					onClick={() => {
						setMenu("kids");
					}}
				>
					<Link to="/kids"> Kids </Link>
					{menu === "kids" ? <hr /> : <></>}
				</li>
			</ul>
			<div className="nav-login-cart">
				{localStorage.getItem("auth-token") ? (
					<button
						onClick={() => {
							localStorage.removeItem("auth-token");
							window.location.replace("/");
						}}
					>
						Log Out
					</button>
				) : (
					<Link to="/login">
						<button>Login</button>
					</Link>
				)}

				{loggedIn === true ? (
					<Link to="/cart">
						<img src={cart_icon} alt="" />
					</Link>
				) : (
					<Link to="/login">
						<img src={cart_icon} alt="" />
					</Link>
				)}

				<div className="nav-cart-count">{getTotalCartItems()}</div>
			</div>
		</div>
	);
};

export default Navbar;
