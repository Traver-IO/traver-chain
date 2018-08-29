pragma solidity ^0.4.24;
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";

contract TraverToken is BurnableToken, MintableToken, DetailedERC20 {

    constructor(uint256 _initialSupply) 
        DetailedERC20("Traver Token", "TVR", 18) 
        public 
    {
        mint(owner, _initialSupply);
    }
}
