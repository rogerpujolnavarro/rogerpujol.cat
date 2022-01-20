const $ = (selector, context) => {
	context = context || document;
	return context.querySelector(selector);
};
const $$ = (selector, context) => {
	context = context || document;
	return [...context.querySelectorAll(selector)];
};

export { $, $$ };
