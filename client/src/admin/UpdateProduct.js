import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
	getAllCategory,
	getProduct,
	updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateProduct = ({ match }) => {
	const { user, token } = isAuthenticated();

	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		stock: "",
		photo: "",
		categories: [],
		category: "",
		loading: false,
		error: "",
		createdProduct: "",
		getaRedirect: false,
		formData: "",
	});

	const {
		name,
		description,
		price,
		stock,
		categories,
		category,
		error,
		createdProduct,
		getaRedirect,
		formData,
	} = values;

	const preload = (productId) => {
		getProduct(productId).then((data) => {
			//console.log(data);
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				preloadCategory();
				setValues({
					...values,
					name: data.name,
					description: data.description,
					price: data.price,
					stock: data.stock,
					category: data.category._id,
					formData: new FormData(),
				});
			}
		});
	};

	const preloadCategory = async () => {
		//backend request firing
		try {
			const data = await getAllCategory(); //name is sent like object so that stringify in fetch works
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ categories: data, formData: new FormData() });
			}
		} catch {
			console.log("error in getting Category");
		}
	};

	useEffect(() => {
		preload(match.params.productId);
	}, []);

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: "", loading: true });
		updateProduct(match.params.productId, user._id, token, formData).then(
			(data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setValues({
						...values,
						name: data.name,
						description: data.description,
						price: data.price,
						stock: data.stock,
						error: "",
						photo: "",
						createdProduct: data.name,
					});
				}
			}
		);
	};

	const handleChange = (name) => (event) => {
		const value = name === "photo" ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const successMessage = () => (
		<div
			className="alert alert-success mt-3"
			style={{ display: createdProduct ? "" : "none" }}
		>
			{createdProduct} updated successfully
		</div>
	);
	const errorMessage = () => {
		return (
			<div
				className="alert alert-danger"
				style={{ display: error ? "" : "none" }}
			>
				{error}
			</div>
		);
	};

	const updateProductForm = () => (
		<form>
			<span>Post photo</span>
			<div className="form-group">
				<label className="btn btn-block btn-info">
					<input
						onChange={handleChange("photo")}
						type="file"
						name="photo"
						accept="image"
						placeholder="choose a file"
					/>
				</label>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange("name")}
					name="photo"
					className="form-control"
					placeholder="Name"
					value={name}
				/>
			</div>
			<div className="form-group">
				<textarea
					onChange={handleChange("description")}
					name="photo"
					className="form-control"
					placeholder="Description"
					value={description}
				/>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange("price")}
					type="number"
					className="form-control"
					placeholder="Price"
					value={price}
				/>
			</div>
			<div className="form-group">
				<select
					onChange={handleChange("category")}
					className="form-control"
					placeholder="Category"
				>
					<option>Select</option>
					{categories &&
						categories.map((cate, index) => (
							<option key={index} value={cate._id}>
								{cate.name}
							</option>
						))}
				</select>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange("stock")}
					type="number"
					className="form-control"
					placeholder="Stock"
					value={stock}
				/>
			</div>

			<button
				type="submit"
				onClick={onSubmit}
				className="btn btn-outline-success mb-3"
			>
				Update Product
			</button>
		</form>
	);

	return (
		<Base
			title="Update a product here!"
			description="Welcome to product updation section"
			className="container bg-success p-4 my-5"
		>
			<Link to="/admin/dashboard" className="btn btn-md btn-outline-light mb-3">
				Admin Home
			</Link>
			<div className="row bg-dark text-white rounded">
				<div className="col-md-8 offset-md-2 mt-4">
					{successMessage()}
					{errorMessage()}
					{updateProductForm()}
				</div>
			</div>
		</Base>
	);
};

export default UpdateProduct;
