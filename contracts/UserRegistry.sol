pragma solidity ^0.4.24;
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract UserRegistry is Ownable {
	event NewUser(address _address);
	//mapping from an eth address to 
	//URI of data location
	mapping(address => uint256) public users;

	function add(address _address, uint256 _hash) external {
		require(users[_address] == 0);
		users[_address] = _hash;
	}

	function remove(address _address) external {
		users[_address] = 0;
	}
}
