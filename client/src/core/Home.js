import React, { useState, useEffect } from "react";
// import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getAllProduct } from "./helper/coreapicalls";

export default function Home() {
	const [product, setProduct] = useState([]);
	const [error, setError] = useState(false);
	const preload = async () => {
		//backend request firing
		try {
			const data = await getAllProduct(); //name is sent like object so that stringify in fetch works
			if (data.error) {
				setError(error);
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
	return (
		<Base title="Home Page" description="Welcome to the Tshirt Store">
			<div className="container">
				<div className="row">
					{product.map((product, index) => {
						return (
							<div key={index} className="col-12 col-md-6 col-lg-4 mb-5">
								<Card product={product} />
							</div>
						);
					})}
				</div>
			</div>
		</Base>
	);
}
