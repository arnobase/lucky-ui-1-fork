import Shiden from '../assets/Shiden.png'
const ENDPOINTS = {
	kusama: {
		chain: 'Kusama',
		provider: 'wss://kusama.api.onfinality.io/public-ws',
	},
	astar: {
		chain: 'Astar',
		provider: 'wss://astar.api.onfinality.io/public-ws',
	},
	shiden: {
		chain: 'Shiden',
		provider: 'wss://shiden.api.onfinality.io/public-ws',
	},
	shibuya: {
		chain: 'Shibuya',
		provider: 'wss://shibuya.public.blastapi.io',
		icon: { Shiden }
	}
};

export default ENDPOINTS;