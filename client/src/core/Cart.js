import React, { useState, useEffect } from "react";
// import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadItemToCart } from "./CartHelper";

export default function Cart() {
	const [product, setProduct] = useState([]);
	const [reload, setReload] = useState(false);

	const preload = () => {
		//backend request firing
		setProduct(loadItemToCart());
	};

	useEffect(() => {
		preload();
	}, [reload]);

	const loadProdcutsToCart = () => (
		<div>
			{product.map((product, index) => {
				return (
					<Card
						key={index}
						product={product}
						removeToCart={true}
						addToCart={false}
						setReload={setReload}
						reload={reload}
					/>
				);
			})}
		</div>
	);
	const loadCheckOut = () => {
		return <h1>s</h1>;
	};
	return (
		<Base title="Cart Page" description="View Your Cart">
			<div className="container">
				<div className="row">
					<div className="col-6">{loadProdcutsToCart()}</div>
					<div className="col-6">{loadCheckOut()}</div>
				</div>
			</div>
		</Base>
	);
}
