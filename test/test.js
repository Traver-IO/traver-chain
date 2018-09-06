var contract = require('truffle-contract')
var ContractService = require('../src/services/contract-service')
var TraverToken = require('../build/contracts/TraverToken.json')
var Web3 = require('web3');


require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(Web3.BigNumber))
    .should();

describe('ContractService', async function() {
	const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))
	const contractService = new ContractService({web3})
	let accounts = await web3.eth.getAccounts()
	const owner = accounts[0];
	web3.eth.defaultAccount = owner;
	let deployedContract = { } 

	describe('Calling a contracts functions', async function () {
		const traverToken = contract(TraverToken)
		traverToken.setProvider(web3.currentProvider)
		/* 
		* Workaround for truffle-contract bug here:
		* https://github.com/trufflesuite/truffle-contract/issues/57
		*/	
		if (typeof traverToken.currentProvider.sendAsync !== "function") {
			traverToken.currentProvider.sendAsync = function () {
				return traverToken.currentProvider.send.apply(
					traverToken.currentProvider, arguments
				);
			};
		}
		//Truffle sets these by default
		//but since using just truffle-contract
		//need to provide
		traverToken.defaults({
			from: owner,
			gas: 4712388,
			gasPrice: 100000000000
		})
		try {
			deployedContract = await traverToken.new(10000, { from: owner });
		} catch (err) {
			console.log(err);
		}

		let name = await deployedContract.name()
		let result = { }

    	//it('allows constant (call) contract read', async function () {
			try {
				result = await contractService.contractFunc(
					TraverToken,
					deployedContract.address,	
					'name'
				)	
			} catch (err) {
				console.log(err)
			}
			result.should.be.equal(name);
		//}).run();
	})
})