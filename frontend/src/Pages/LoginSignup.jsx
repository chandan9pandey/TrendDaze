import React, { useEffect, useState } from "react";
import "./CSS/LoginSignup.css";
const LoginSignup = () => {
	const [state, setState] = useState("Log In");
	const [containerHeight, setContainerHeight] = useState(400);
	const [loginSignupHeight, setLoginSignupHeight] = useState(100);

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
				<div className="loginsinup-fields">
					{state === "Sign Up" ? (
						<input type="text" placeholder="Your Name" />
					) : (
						""
					)}
					<input type="email" placeholder="Email Address" />
					<input type="password" placeholder="Password" />
				</div>
				{state === "Sign Up" ? (
					<>
						<div className="loginsignup-agree">
							<input type="checkbox" name="" id="" />
							<p>
								By continuing , I agree to the terms of use & privacy policy
							</p>
						</div>
						<button>Continue</button>
					</>
				) : (
					<button>Log In</button>
				)}
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
