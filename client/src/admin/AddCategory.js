import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "../admin/helper/adminapicall";

const AddCategory = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const { token } = isAuthenticated();

	const handleChange = (event) => {
		setError("");
		setSuccess(false);
		setName(event.target.value);
	};
	const Submit = async (event) => {
		event.preventDefault();
		setError("");
		setSuccess(false);
		//backend request firing
		try {
			const data = await createCategory(token, { name }); //name is sent like object so that stringify in fetch works
			if (data.error) {
				setError(true);
			} else {
				setError("");
				setSuccess(true);
				setName("");
			}
		} catch {
			console.log("error in createCategory");
		}
	};

	const successMessage = () => {
		if (success) {
			return (
				<h4 className="alert alert-success mt-2">
					Category created successfully
				</h4>
			);
		}
	};

	const warningMessage = () => {
		if (error) {
			return (
				<h4 className="alert alert-danger mt-2">Failed to create category</h4>
			);
		}
	};

	const goBack = () => (
		<div className="mt-5">
			<Link className="btn btn-success mb-3" to="/admin/dashboard">
				Admin Home
			</Link>
		</div>
	);

	const myCategoryForm = () => (
		<form>
			<div className="form-group">
				<p className="lead mt-3">Enter the category</p>
				<input
					type="text"
					className="form-control my-3"
					autoFocus
					onChange={handleChange}
					value={name}
					required
					placeholder="For Ex. Summer"
				/>
				<button onClick={Submit} className="btn btn-outline-info">
					Create Category
				</button>
			</div>
		</form>
	);

	return (
		<Base
			title="Create a category here"
			description="Add a new category for new tshirts"
			className="container bg-info p-4 mb-5"
		>
			<div className="row bg-white rounded">
				<div className="col-md-8 offset-md-2">
					{successMessage()}
					{warningMessage()}
					{myCategoryForm()}
					{goBack()}
				</div>
			</div>
		</Base>
	);
};
export default AddCategory;
