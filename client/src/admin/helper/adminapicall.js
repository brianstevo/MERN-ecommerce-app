const { API } = require("../../backend");

export const createCategory = async (userId, token, category) => {
	try {
		const response = await fetch(`${API}/category/create`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(category),
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};

export const getAllCategory = async () => {
	try {
		const response = await fetch(`${API}/category`, {
			method: "GET",
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};
export const getCategory = async (categoryId) => {
	try {
		const response = await fetch(`${API}/category/${categoryId}`, {
			method: "GET",
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};

export const updateCategory = async (categoryId, userId, token, category) => {
	try {
		const response = await fetch(`${API}/category/${categoryId}/${userId}`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(category),
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};

export const deleteCategory = async (categoryId, userId, token) => {
	try {
		const response = await fetch(`${API}/category/${categoryId}/${userId}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};

//product calls
export const createProduct = async (userId, token, product) => {
	try {
		const response = await fetch(`${API}/product/create/${userId}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: product,
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};

export const getAllProduct = async () => {
	try {
		const response = await fetch(`${API}/products`, {
			method: "GET",
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};

export const getProduct = async (productId) => {
	try {
		const response = await fetch(`${API}/product/${productId}`, {
			method: "GET",
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};

export const updateProduct = async (productId, userId, token, product) => {
	try {
		const response = await fetch(`${API}/product/${productId}/${userId}`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: product,
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};

export const deleteProduct = async (productId, userId, token) => {
	try {
		const response = await fetch(`${API}/product/${productId}/${userId}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};

//end of product calls
