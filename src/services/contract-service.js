var TraverToken = require('./../../contracts/build/contracts/TraverToken.json');
var Web3 = require('web3');
var bs58 = require('bs58');

//TODO add addtional modular functionality
//across different networks
class ContractService {
	constructor(options = {}) {
		console.log('ContractService constructor')
		const externalWeb3 = options.web3
		//if (!externalWeb3) {
		//   throw new Error(
		//      'web3 is required for this library, Please pass in as an option'
		// )
		// }
		this.web3 = new Web3(externalWeb3.currentProvider)
		console.log('ContractService constructor2')
		const contracts = Object.assign(
		{
			traverTokenContract: TraverToken
		})
		this.contractAddresses = options.contractAddresses

		//for (const name in contracts) {
		//	this[name] = contracts[name]
	//		try {
		//		this[name].networks = Object.assign(
		//			{},
		//			this[name].networks,
		//			options.contractAddresses[name]
		//		)
		//	} catch (e) {
//
//			}
//		}
	}
	
	async deployed(contract, address) {
		return new this.web3.eth.Contract(contract.abi, address)		
	}

	async currentAccount() {
		const accounts = await this.web3.eth.getAccounts()
		const defaultAccount = this.web3.eth.defaultAccount
		return defaultAccount || accounts[0]
	}

	async contractFunc(
		contractSource,
		address,
		functionName,
		args = [],
		options = {},
		confirmationCallback
	) {
		const opts = Object.assign(options, {})
		opts.from = opts.from || (await this.currentAccount())
		opts.gas = options.gas || 50000

		const contract = await this.deployed(contractSource, address)
		const method = contract.methods[functionName].apply(contract, args)
		if (method._method.constant) {
			return await method.call(opts)
		}

		const transReceipt = await new Promise((resolve, reject) => {
			method
				.send(opts)
				.on('receipt', resolve)
				.on('confirmation', confirmationCallback)
				.on('error', reject)
		})

		const block = await this.web3.get.getBlock(transReceipt.blockNumber)
		return {
			created: block ? block.timestamp : Math.floor(Date.now() / 1000),
			transReceipt
		}
	}
}

module.exports = ContractService;
