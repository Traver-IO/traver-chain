let ContractService = require('./services/contract-service');
const VERSION = require('.././package.json').version

class traverChain {
	constructor({
		web3,
		contractAddresses
	} = {})
	{
		this.version = VERSION;
		this.contractService = new ContractService({ contractAddresses, web3 })
	}
}

module.exports = traverChain
