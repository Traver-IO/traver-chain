var BigNumber = web3.BigNumber;
var TraverToken = artifacts.require("TraverToken")
var CustomToken = artifacts.require("CustomToken")
var CustomTokenRegistry = artifacts.require("CustomTokenRegistry")

require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

contract ('CustomTokenRegistry', accounts => {
    let token = null;
	let traver = null;
	let tkn_reg = null;
    const owner = accounts[0]
	const supplier1 = accounts[1];

    beforeEach(async function() {
        traver = await TraverToken.new(1000, {from: owner});
		token = await CustomToken.new(
				traver.address, 
				100, 
				"Hilton Coin", 
				"HLT",
				{from: owner});
		tkn_reg = await CustomTokenRegistry.new(
				traver.address,
				{from: owner});
    });

	it('Deploys CustomTokenRegistry', async function() {
		let tvr_address = await tkn_reg.tvr_contract();

		tvr_address.should.be.equal(traver.address);
	});

	describe('updating the registry', () => {
    	it('allows a custom token to be added and updated', async function () {
			await tkn_reg.add_token(
				0x12345678,
				5,
				token.address,
				100,
				{from: owner});

			let resp = await tkn_reg.view_token(token.address);
			resp[0].should.be.bignumber.equal(0x12345678);
			resp[1].should.be.bignumber.equal(5);
			resp[2].should.be.equal(token.address);
			resp[3].should.be.bignumber.equal(100);

			await tkn_reg.update_token(
				token.address,
				150,
				0x6819,
				3,
				{from: owner});

			resp = await tkn_reg.view_token(token.address);
			resp[0].should.be.bignumber.equal(0x6819);
			resp[1].should.be.bignumber.equal(3);
			resp[2].should.be.equal(token.address);
			resp[3].should.be.bignumber.equal(150);
   		 });
	});

    
});
