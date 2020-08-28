import React, { useState, useEffect } from "react";
import ImageHelper from "./ImageHelper";
import { addItemToCart, removeItemFromCart } from "./CartHelper";
import { Redirect } from "react-router-dom";

const Card = ({
	product,
	addToCart = true,
	removeToCart = false,
	setReload = (f) => f,
	reload = undefined,
}) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(product.count);

	const cardTitle = product ? product.name : "title";
	const cardDescription = product ? product.description : "description";
	const cardPrice = product ? product.price : "price";

	const performAddToCart = () => {
		addItemToCart(product, () => setRedirect(true));
	};
	const getRedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};
	const showAddToCart = (addToCart) => {
		return (
			addToCart && (
				<button
					onClick={performAddToCart}
					className="btn btn-block btn-outline-success mt-2 mb-2"
				>
					Add to Cart
				</button>
			)
		);
	};
	const RemoveToCart = (removeToCart) => {
		return (
			removeToCart && (
				<button
					onClick={() => {
						removeItemFromCart(product._id);
						setReload(!reload);
					}}
					className="btn btn-block btn-outline-danger mt-2 mb-2"
				>
					Remove from cart
				</button>
			)
		);
	};
	return (
		<div className="card text-white text-center bg-dark border border-info ">
			<div className="card-header lead">{cardTitle}</div>
			<div className="card-body">
				{getRedirect(redirect)}
				<ImageHelper product={product} />
				<p className="lead bg-success font-weight-normal text-wrap">
					{cardDescription}
				</p>
				<p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
				<div className="row">
					<div className="col-12">{showAddToCart(addToCart)}</div>
					<div className="col-12">{RemoveToCart(removeToCart)}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
