pragma solidity ^0.4.24;
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract CustomTokenRegistry is Ownable {
	struct custom_token {
		uint256 image_uri;
		uint16 multiplier;
		address contract_location;
		uint256 held_tvr_tokens;
	}

	address public tvr_contract;
	mapping (address => custom_token) public token_list;
	  
	event token_added(
		address indexed _id,
		uint256 _initial_supply,
		uint16 indexed _multiplier,
		uint256 _image_uri
	);

	event token_updated(
		address indexed _id,
		uint256 _supply,
		uint16 indexed _multiplier,
		uint256 _image_uri
	);

	event token_increased(
		address indexed _id,
		uint256 indexed _amount
	);

	event token_decreased(
		address indexed _id,
		uint256 indexed _amount
	);
		
	event token_removed(
		address indexed _id,
		uint256 indexed _amount
	);

	constructor(address _tvr_contract) public { 
		tvr_contract = _tvr_contract;
	}

	function update_tvr_contract(address _tvr_contract) 
		external
		onlyOwner
	{
		tvr_contract = _tvr_contract;
	}

	function add_token(
		uint256 _image_uri,
		uint16 _multiplier,
		address _contract_location,
		uint256 _tvr_supply
	)
		external
       		onlyOwner
	{
		require(token_list[_contract_location].contract_location == address(0));
		token_list[_contract_location] = custom_token({
			image_uri: _image_uri,
			multiplier: _multiplier,
			contract_location: _contract_location,
			held_tvr_tokens: _tvr_supply
		});
		emit token_added(_contract_location, _tvr_supply, _multiplier, _image_uri); 		
	}

	function update_token(
		address _contract_location,
		uint256 _new_supply,
		uint256 _image_uri,
		uint16 _multiplier
	)
		external
		onlyOwner
	{
		require(token_list[_contract_location].contract_location == _contract_location);
		token_list[_contract_location].image_uri = _image_uri;
		token_list[_contract_location].multiplier = _multiplier;
		token_list[_contract_location].contract_location = _contract_location;
		token_list[_contract_location].held_tvr_tokens = _new_supply;
		emit token_updated(_contract_location, _new_supply, _multiplier, _image_uri);
	}

	function view_token(address _address) public view returns(
		uint256 image_uri,
		uint16 multiplier,
		address contract_location,
		uint256 held_tvr_tokens
	) {
		require(token_list[_address].contract_location == _address);
		image_uri = token_list[_address].image_uri;
		multiplier = token_list[_address].multiplier;
		contract_location = token_list[_address].contract_location;
		held_tvr_tokens = token_list[_address].held_tvr_tokens;
	}
}
