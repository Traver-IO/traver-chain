var BigNumber = web3.BigNumber;
var TraverToken = artifacts.require("TraverToken")

require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

contract ('TraverToken', accounts => {
    let token = null;
    const owner = accounts[0]

    beforeEach(async function() {
        token = await TraverToken.new(100, {from: owner});
    });

    it('Has the correct initial supply, decimals, symbol and name.', async function () {
        let [name, symbol, balance] = await Promise.all([token.name(), token.symbol(), token.balanceOf(owner)]);

        name.should.be.equal('Traver Token');
        symbol.should.be.equal('TVR');
        balance.should.be.bignumber.equal(100);
    });

    
});
