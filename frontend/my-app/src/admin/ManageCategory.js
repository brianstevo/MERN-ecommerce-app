import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import {
	getAllCategory,
	deleteCategory,
	updateCategory,
} from "./helper/adminapicall";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const ManageCategory = () => {
	const [category, setCategory] = useState([]);
	const { user, token } = isAuthenticated();

	const preload = async () => {
		//backend request firing
		try {
			const data = await getAllCategory(); //name is sent like object so that stringify in fetch works
			if (data.error) {
				console.log(data.error);
			} else {
				setCategory(data);
			}
		} catch {
			console.log("error in getting Category");
		}
	};

	useEffect(() => {
		preload();
	}, []);

	const deleteThisCategory = async (categoryId) => {
		try {
			const data = await deleteCategory(categoryId, user._id, token); //name is sent like object so that stringify in fetch works
			if (data.error) {
				console.log(data.error);
			} else {
				preload();
			}
		} catch {
			console.log("error in deleting category");
		}
	};
	const getcategory = () => {
		return (
			<div className="card mb-1">
				<h4 className="card-header">Category Information</h4>
				<ul className="list-group">
					{category.map((ele, index) => {
						return (
							<li key={index} className="list-group-item">
								{ele.name}
								<Link
									className="btn btn-success ml-5 mr-2 "
									to={`/admin/category/update/${ele._id}`}
								>
									<span className="">Update</span>
								</Link>
								<span
									className="btn btn-md btn-danger"
									onClick={() => {
										deleteThisCategory(ele._id);
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
			<Link className="btn btn-md btn-outline-light" to="/admin/dashboard">
				Admin Home
			</Link>
		</div>
	);
	return (
		<Base className="container bg-info p-4 mb-3">
			{getcategory()}
			{goBack()}
		</Base>
	);
};
export default ManageCategory;
