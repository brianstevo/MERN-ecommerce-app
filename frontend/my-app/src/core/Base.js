import React from 'react';
import Menu from './Menu';
import '../styles.css';

const Base = ({
	title = 'My Title',
	description = 'My desription',
	className = 'bg-dark text-white p-4',
	children,
}) => (
	<div>
		<Menu />
		<div className="container-fluid">
			<div className="jumbotron bg-dark text-white text-center mb-0 pb-2">
				<h2 className="display-4">{title}</h2>
				<p className="lead">{description}</p>
			</div>
			<div className={className}>{children}</div>
		</div>
		<footer className="footer bg-dark mt-auto">
			<div className="container-fluid bg-success text-white text-center">
				<h4>If you got any questions, feel free to reach out!</h4>
				<button className="btn btn-warning btn-lg">Contact Us</button>
			</div>
		</footer>
	</div>
);

export default Base;
