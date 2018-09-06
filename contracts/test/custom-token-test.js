var BigNumber = web3.BigNumber;
var TraverToken = artifacts.require("TraverToken")
var CustomToken = artifacts.require("CustomToken")

require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

contract ('CustomToken', accounts => {
    let token = null;
	let traver = null;
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
    });

    it('Has the correct initial supply, decimals, symbol,name, and tvr address', async function () {
        let [name, 
			symbol,
			balance,
			tvr_address] = await Promise.all([token.name(), token.symbol(), token.balanceOf(owner), token.tvr_contract()]);

		
        name.should.be.equal('Hilton Coin');
        symbol.should.be.equal('HLT');
        balance.should.be.bignumber.equal(100);
		tvr_address.should.be.equal(traver.address);
    });

    
});
