var trv_token = artifacts.require("./TraverToken.sol");
var token_registry = artifacts.require("./CustomTokenRegistry.sol");

module.exports = function(deployer) {
	deployer.deploy(trv_token, 10000).then(function() {
		return deployer.deploy(token_registry, trv_token.address)
	});
};
