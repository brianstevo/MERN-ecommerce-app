import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllProduct, deleteProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const ManageProducts = () => {
	const [product, setProduct] = useState([]);
	const { token } = isAuthenticated();

	const preload = async () => {
		//backend request firing
		try {
			const data = await getAllProduct(); //name is sent like object so that stringify in fetch works
			if (data.error) {
				console.log(data.error);
			} else {
				setProduct(data);
			}
		} catch {
			console.log("error in getting Product");
		}
	};

	useEffect(() => {
		preload();
	}, []);

	const deleteThisProduct = async (productId) => {
		try {
			const data = await deleteProduct(productId, token); //name is sent like object so that stringify in fetch works
			if (data.error) {
				console.log(data.error);
			} else {
				preload();
			}
		} catch {
			console.log("error in deleting product");
		}
	};

	const getproduct = () => {
		return (
			<div className="card mb-1">
				<h4 className="card-header">Product Information</h4>
				<ul className="list-group">
					{product.map((ele, index) => {
						return (
							<li key={index} className="list-group-item text-dark">
								{ele.name}
								<Link
									className="btn btn-success ml-5 mr-2 "
									to={`/admin/product/update/${ele._id}`}
								>
									<span className="">Update</span>
								</Link>
								<span
									className="btn  btn-danger"
									onClick={() => {
										deleteThisProduct(ele._id);
									}}
								>
									Delete
								</span>
							</li>
						);
					})}
				</ul>
			</div>
		);
	};
	const goBack = () => (
		<div className="mt-4">
			<Link className="btn btn-md btn-outline-dark" to="/admin/dashboard">
				Admin Home
			</Link>
		</div>
	);
	return (
		<Base className="container bg-info p-4 mb-3">
			{getproduct()}
			{goBack()}
		</Base>
	);
};

export default ManageProducts;
