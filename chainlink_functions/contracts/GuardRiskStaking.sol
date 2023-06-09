// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Functions, FunctionsClient} from "./dev/functions/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract GuardRiskStaking is FunctionsClient, ConfirmedOwner {
    using Functions for Functions.Request;


    bytes32 public latestRequestId;
    bytes public latestResponse;
    bytes public latestError;
    address public chainlinkFunctionsOracle = 0xeA6721aC65BCeD841B8ec3fc5fEdeA6141a0aDE4;
    struct Stake {
        uint256 amount;
        uint256 duration;
        uint256 endTime;
    }

    mapping(address => Stake) public stakes;
    address[] private stakesMappingAddressKeys;
    uint256 public totalStakes;
    uint256 public stakedAmount;

    event StakeDeposited(address indexed staker, uint256 amount, uint256 duration);
    event StakeReleased(address indexed staker, uint256 amount, uint256 duration);
    event RewardPaid(address indexed staker, uint256 amount);
    event OCRResponse(bytes32 indexed requestId, bytes result, bytes err);

    constructor() FunctionsClient(chainlinkFunctionsOracle) ConfirmedOwner(msg.sender){}

    function depositStake(uint256 _duration) external payable {
        require(_duration == 6 || _duration == 12 || _duration == 24, "Invalid staking duration");
        require(msg.value > 0, "Must be greater than zero");
        require(stakes[msg.sender].amount == 0, "Already staked");

        uint256 endTime = block.timestamp + (_duration * 30 days);
        stakes[msg.sender] = Stake(msg.value, _duration, endTime);
        stakesMappingAddressKeys.push(msg.sender);
        totalStakes++;
        stakedAmount += msg.value;
        emit StakeDeposited(msg.sender, msg.value, _duration);
    }

    function releaseStake() external {
        for (uint i; i < stakesMappingAddressKeys.length; i++){
            if ((stakes[stakesMappingAddressKeys[i]].amount > 0) && (block.timestamp >= stakes[stakesMappingAddressKeys[i]].endTime)){
                uint256 amount = stakes[stakesMappingAddressKeys[i]].amount;
                uint256 duration = stakes[stakesMappingAddressKeys[i]].duration;
                delete stakes[stakesMappingAddressKeys[i]];
                totalStakes--;
                stakedAmount -= amount;
                payable(stakesMappingAddressKeys[i]).transfer(amount);
                emit StakeReleased(stakesMappingAddressKeys[i], amount, duration);
                delete stakesMappingAddressKeys[i];
            }
        }
    }

    function calculateReward(address _staker) internal view returns (uint256) {
        // Basic calculation just for hackathon demo
        uint256 basisPoints = 300;
        return stakes[_staker].amount * basisPoints / 10000;
    }

    function claimReward() external {
        require(stakes[msg.sender].amount > 0, "No stake found");
        require(block.timestamp >= stakes[msg.sender].endTime, "Not yet expired");

        uint256 reward = calculateReward(msg.sender);
        delete stakes[msg.sender];
        totalStakes--;

        payable(msg.sender).transfer(reward);
        emit RewardPaid(msg.sender, reward);
    }

    function getStakeDetails(address _staker) external view returns (uint256, uint256) {
        Stake storage stake = stakes[_staker];
        return (stake.amount, stake.duration);
    }

    function getTotalStakes() external view returns (uint256) {
        return totalStakes;
    }

    function executeRequest(
    string calldata source,
    bytes calldata secrets,
    string[] calldata args,
    uint64 subscriptionId,
    uint32 gasLimit
  ) public onlyOwner returns (bytes32) {
    Functions.Request memory req;
    req.initializeRequest(Functions.Location.Inline, Functions.CodeLanguage.JavaScript, source);
    if (secrets.length > 0) {
      req.addRemoteSecrets(secrets);
    }
    if (args.length > 0) req.addArgs(args);

    bytes32 assignedReqID = sendRequest(req, subscriptionId, gasLimit);
    latestRequestId = assignedReqID;
    return assignedReqID;
  }

    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
    latestResponse = response;
    latestError = err;
    emit OCRResponse(requestId, response, err);
  }

  function updateOracleAddress(address oracle) public onlyOwner {
    setOracle(oracle);
  }

  function addSimulatedRequestId(address oracleAddress, bytes32 requestId) public onlyOwner {
    addExternalRequest(oracleAddress, requestId);
  }

}

