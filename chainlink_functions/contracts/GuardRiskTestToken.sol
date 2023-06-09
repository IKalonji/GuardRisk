// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GuardRiskTestToken {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    uint256 public tokenPrice;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event FreeMint(address _to, uint _amount);

    constructor() {
        name = "GuardRiskTestToken";
        symbol = "GRTT";
        decimals = 18;
        totalSupply = 10000;
        balanceOf[msg.sender] = 10000;
    }

    function transfer(address _to, uint256 _value) external returns (bool) {
        require(_to != address(0), "Invalid recipient address");
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) external returns (bool) {
        require(_spender != address(0), "Invalid spender address");

        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool) {
        require(_from != address(0), "Invalid sender address");
        require(_to != address(0), "Invalid recipient address");
        require(balanceOf[_from] >= _value, "Insufficient balance");
        require(allowance[_from][msg.sender] >= _value, "Insufficient allowance");

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);
        return true;
    }

    function freeMint(address _minter) external {
        balanceOf[_minter] += 10000;
        totalSupply += 10000;
        emit FreeMint(_minter, 10000);
    }

    function getTokenPrice()external view returns(uint256 _tokenPrice){
        _tokenPrice = tokenPrice;
    }

    function setTokenPrice(uint256 _newPrice)external {
        tokenPrice = _newPrice;
    }
}