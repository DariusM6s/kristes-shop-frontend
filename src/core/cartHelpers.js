export const addItem = (item, next) => {
	let cart = [];
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}
		cart.push({ ...item, count: 1 });

		// Remove duplicates *** build an Array from new Set and turn it back into array using Array.from that later ***
		// --> we can re-map it *** new Set() will allow ONLY UNIQUE values in it so pass the IDs of each product
		// If the loop tries to add same value again, it'll get ignored with the array of IDs we got on the first map() ***
		//run map() on it again to get actual products from the cart

		cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
			return cart.find(p => p._id === id);
		});

		localStorage.setItem('cart', JSON.stringify(cart));
		next();
	}
};

export const itemTotal = () => {
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			return JSON.parse(localStorage.getItem('cart')).length;
		}
	}
	return 0;
};

export const getCart = () => {
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			return JSON.parse(localStorage.getItem('cart'));
		}
	}
	return [];
};

export const updateItem = (productId, count) => {
	let cart = [];
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			return JSON.parse(localStorage.getItem('cart'));
		}
		cart.map((product, i) => {
			if (product._id === productId) {
				cart[i].count = count;
			}
		});
		localStorage.setItem('cart', JSON.stringify(cart));
	}
};

export const removeItem = productId => {
	let cart = [];
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}
		cart.map((product, i) => {
			if (product._id === productId) {
				cart.splice(i, 1);
			}
		});
		localStorage.setItem('cart', JSON.stringify(cart));
	}
	return cart;
};

export const emptyCart = next => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('cart');
		next();
	}
};
