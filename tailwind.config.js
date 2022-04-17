module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'dark-primary': '#262626',
				'brown-primary': '#B8887B',
				'light-primary': '#FFF8F2',
				'green-primary': '#436D66',
				'purple-primary': '#8577C2',
				'muave-secondary': '#AC8C9F',
				'mocha-secondary': '#B8E7D3',
				'gray-primary': '#858585',
				'navy-primary': '#05084D',
				'red-primary': '#CC3A3A',
				'yellow-primary': '#DFA91F',
				'orange-primary': '#E98D6E',
			},
			borderRadius: {
				'4xl': '3.2rem',
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
