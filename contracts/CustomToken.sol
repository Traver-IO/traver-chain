pragma solidity ^0.4.24;
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";

contract CustomToken is BurnableToken, MintableToken, DetailedERC20 {
	address public tvr_contract;

    constructor(address _tvr_contract, uint256 _initial_supply, string _name, string _symbol)
        DetailedERC20(_name, _symbol, 18) 
        public
    {
		tvr_contract = _tvr_contract;
        mint(owner, _initial_supply);
    }
}
