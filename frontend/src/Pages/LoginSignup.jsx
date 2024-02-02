import React, { useEffect, useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
	const [state, setState] = useState("Log In");
	const [containerHeight, setContainerHeight] = useState(400); // controlling the height of the container(white box)
	const [loginSignupHeight, setLoginSignupHeight] = useState(100); // controlling the height of the loginsignup div

	// input fields

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url

	//to handle register submission

	const handleRegister = async (e) => {
		e.preventDefault();
		const data = {
			username: formData?.username,
			email: formData?.email,
			password: formData?.password,
		};
		const requestOptions = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};
		try {
			const response = await fetch(
				`${baseUrl.concat("register")}`,
				requestOptions
			);
			const res = await response.json();
			// console.log(res);
			if (res.success) {
				localStorage.setItem("auth-token", res.token);
				window.location.replace("/");
			} else {
				alert(res.error);
			}
		} catch (error) {
			console.log(error);
		}
	};

	//to handel Log In submissions

	const handleLogin = async () => {};

	//to handle Input in fields

	const handleInputChange = (e) => {
		const { name, value } = e.currentTarget;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	useEffect(() => {
		if (state === "Sign Up") {
			setContainerHeight(600);
			setLoginSignupHeight(120);
		} else {
			setContainerHeight(400);
			setLoginSignupHeight(100);
		}
	}, [state]);

	return (
		<div className="loginsignup" style={{ height: `${loginSignupHeight}vh` }}>
			<div
				className="loginsignup-container"
				style={{ height: `${containerHeight}px` }}
			>
				<h1>{state}</h1>
				<div className="loginsignup-fields">
					{state === "Sign Up" ? (
						<input
							name="username"
							value={formData?.username}
							onChange={handleInputChange}
							type="text"
							placeholder="Your Name"
						/>
					) : (
						""
					)}
					<input
						name="email"
						value={formData?.email}
						onChange={handleInputChange}
						type="email"
						placeholder="Email Address"
					/>
					<input
						name="password"
						value={formData?.password}
						onChange={handleInputChange}
						type="password"
						placeholder="Password"
					/>
				</div>
				{state === "Sign Up" ? (
					<>
						<div className="loginsignup-agree">
							<input type="checkbox" name="" id="" />
							<p>
								By continuing , I agree to the terms of use & privacy policy
							</p>
						</div>
					</>
				) : (
					""
				)}
				<button
					onClick={(e) => {
						state === "Sign Up" ? handleRegister(e) : handleLogin(e);
					}}
				>
					{state === "Sign Up" ? "Continue" : "Log In"}
				</button>
				{state === "Sign Up" ? (
					<p className="loginsignup-login">
						Already have an account?{" "}
						<span onClick={() => setState("Log In")}>Log In</span>
					</p>
				) : (
					<p className="loginsignup-login">
						Start by creating an account.{" "}
						<span onClick={() => setState("Sign Up")}>Click here</span>
					</p>
				)}
			</div>
		</div>
	);
};

export default LoginSignup;
