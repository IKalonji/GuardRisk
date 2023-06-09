// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface TestToken {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function freeMint(address _mintTo)external;
    function getTokenPrice()external view returns(uint256 _tokenPrice);
    function setTokenPrice(uint256 _newPrice)external;
}

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract GuardRiskInsurance {

    enum PolicyType {Basic, Advanced, Premium, Platinum}
    
    TestToken private testToken;
    AggregatorV3Interface private volatilityFeed;

    struct Policy {
        PolicyType policyType;
        uint256 coveragePercentage;
        uint256 expiryTimestamp;
        uint256 maxLossPercentage;
        bool active;
    }

    struct Claim {
        address claimant;
        uint256 amount;
        bool processed;
    }

    address public owner;
    uint public tokenPrice;
    uint256 public activePoliciesCount;
    uint256 public claimsCount;
    uint256 public totalPremiums;
    uint256 public testTokenPrice;
    uint256 public volatility;
    mapping(address => Policy) public policies;
    mapping(uint256 => Claim) public claims;
    mapping(PolicyType => uint256) public premiumPrice;

    event PolicySelected(address indexed policyHolder, PolicyType policyType);
    event PolicyUpgraded(address indexed policyHolder, PolicyType policyType);
    event PolicyCancelled(address indexed policyHolder);
    event ClaimFiled(address indexed claimant, uint256 claimId);
    event ClaimProcessed(uint256 indexed claimId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }

    constructor(address _testTokenAddress) {
        owner = msg.sender;
        testToken = TestToken(_testTokenAddress);
        volatilityFeed = AggregatorV3Interface(0xC9405E5351d7da0845F5A9015D6f5A8e3eaAcF64);
        premiumPrice[PolicyType.Basic] = 500;
        premiumPrice[PolicyType.Advanced] = 5000;
        premiumPrice[PolicyType.Premium] = 50000;
        premiumPrice[PolicyType.Platinum] = 500000;
    }

    function selectPolicy(PolicyType _policyType) external payable{
        require(!policies[msg.sender].active, "Policy already active");
        require(msg.value >= premiumPrice[_policyType], "Pay the policy");
        totalPremiums += msg.value;
        policies[msg.sender] = Policy(
            _policyType,
            getCoveragePercentage(_policyType),
            block.timestamp + 30 days,
            getMaxLossPercentage(_policyType),
            true
        );
        activePoliciesCount++;
        testToken.freeMint(msg.sender);
        emit PolicySelected(msg.sender, _policyType);
    }

    function upgradePolicy(PolicyType _policyType) external {
        require(policies[msg.sender].active, "No active policy found");
        policies[msg.sender].policyType = _policyType;
        policies[msg.sender].coveragePercentage = getCoveragePercentage(_policyType);
        policies[msg.sender].maxLossPercentage = getMaxLossPercentage(_policyType);
        emit PolicyUpgraded(msg.sender, _policyType);
    }

    function cancelPolicy() external {
        require(policies[msg.sender].active, "No active policy found");
        delete policies[msg.sender];
        activePoliciesCount--;
        emit PolicyCancelled(msg.sender);
    }

    function fileClaim(uint256 _amount) external {
        require(policies[msg.sender].active, "No active policy found");
        require(_amount > 0, "Claim amount must be greater than zero");
        require(_amount <= getMaxLossAmount(msg.sender), "Claim amount exceeds coverage limit");

        uint256 claimId = claimsCount++;
        claims[claimId] = Claim(msg.sender, _amount, false);
        emit ClaimFiled(msg.sender, claimId);
    }

    function processClaim(uint256 _claimId) external onlyOwner {
        require(!claims[_claimId].processed, "Claim already processed");

        address claimant = claims[_claimId].claimant;
        uint256 claimAmount = claims[_claimId].amount;

        delete claims[_claimId];
        claimsCount--;

        payable(claimant).transfer(claimAmount);
        emit ClaimProcessed(_claimId);
    }

    function getCoveragePercentage(PolicyType _policyType) internal pure returns (uint256) {
        if (_policyType == PolicyType.Basic) {
            return 20;
        } else if (_policyType == PolicyType.Advanced) {
            return 40;
        } else if (_policyType == PolicyType.Premium) {
            return 50;
        } else if (_policyType == PolicyType.Platinum) {
            return 100;
        }
        revert("Invalid policy type");
    }

    function getMaxLossPercentage(PolicyType _policyType) internal pure returns (uint256) {
        if (_policyType == PolicyType.Basic) {
            return 70;
        } else if (_policyType == PolicyType.Advanced) {
            return 60;
        } else if (_policyType == PolicyType.Premium) {
            return 50;
        } else if (_policyType == PolicyType.Platinum) {
            return 30;
        }
        revert("Invalid policy type");
    }

    function getMaxLossAmount(address _policyHolder) public returns (uint256) {
        uint256 currentPrice = getCurrentPrice();
        Policy storage policy = policies[_policyHolder];
        uint256 maxLossPercentage = policy.maxLossPercentage;
        uint256 coveragePercentage = policy.coveragePercentage;
        return (currentPrice * maxLossPercentage * coveragePercentage) / (100 * 100);
    }

    function getCurrentPrice() public returns (uint256) {
        tokenPrice = testToken.getTokenPrice();
        return uint256(tokenPrice);
    }

    function getCurrentVolatility() public returns (uint256) {
        (, int256 value, , , ) = volatilityFeed.latestRoundData();
        require(value > 0, "Invalid price");
        volatility = uint256(value);
        return volatility;
    }

    function getPolicyDetails(address _policyHolder) external returns (
        uint256, uint256, uint256, uint256, uint256
    ) {
        Policy storage policy = policies[_policyHolder];
        return (
            getMaxLossAmount(_policyHolder),
            policy.coveragePercentage,
            policy.expiryTimestamp,
            getCurrentPrice(),
            policy.expiryTimestamp + 1 days
        );
    }

    function getClaimCount() external view returns (uint256) {
        return claimsCount;
    }

    function getClaimDetails(uint256 _claimId) external view returns (address, uint256, bool) {
        Claim storage claim = claims[_claimId];
        return (claim.claimant, claim.amount, claim.processed);
    }

    function getActivePoliciesCount() external view returns (uint256) {
        return activePoliciesCount;
    }

    function getTotalPremiums() external view returns (uint256) {
        return totalPremiums;
    }

}