import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
	const [values, setValues] = useState({
		email: "rebel@gmail.com",
		password: "rebel123",
		error: "",
		loading: false,
		didRedirect: false,
	});

	const { email, password, error, loading, didRedirect } = values;
	const { user } = isAuthenticated();

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		try {
			const data = await signin({ email, password });
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {
				authenticate(data, () => {
					setValues({
						...values,
						didRedirect: true,
					});
				});
			}
		} catch {
			console.log("error in signin");
		}
	};

	const performRedirect = () => {
		if (didRedirect) {
			if (user && user.role === 1) {
				return <Redirect to="/admin/dashboard" />;
			} else {
				return <Redirect to="/user/dashboard" />;
			}
		}
		if (isAuthenticated()) {
			return <Redirect to="/" />;
		}
	};

	const loadingMessage = () => {
		return (
			loading && (
				<div className="alert alert-info">
					<h2>Loading ...</h2>
				</div>
			)
		);
	};

	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col col-md-6 offset-md-3 text-left">
					<div
						className="alert alert-danger"
						style={{ display: error ? "" : "none" }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	const signinForm = () => {
		return (
			<div className="row">
				<div className="col col-md-6 offset-md-3 text-left">
					{loadingMessage()}
					{errorMessage()}
					<form>
						<div className="form-group">
							<label className="text-light">Email</label>
							<input
								onChange={handleChange("email")}
								value={email}
								className="form-control"
								type="email"
							/>
						</div>
						<div className="form-group">
							<label className="text-light">Password</label>
							<input
								onChange={handleChange("password")}
								value={password}
								className="form-control"
								type="password"
							/>
						</div>
						<button
							onClick={onSubmit}
							className="btn btn-success btn-block mt-5"
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	};
	return (
		<Base title="Sign In page" description="A page for user to sign in!">
			{signinForm()}
			{performRedirect()}
		</Base>
	);
};

export default Signin;
