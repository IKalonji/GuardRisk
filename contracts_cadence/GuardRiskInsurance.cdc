import FlowToken from 0xToken // Assuming the FlowToken contract is deployed at this address

pub contract InsuranceContract {
    pub enum PolicyType: UInt8 {
        case Basic
        case Advanced
        case Premium
        case Platinum
    }

    pub struct Policy {
        pub var policyType: PolicyType
        pub var coveragePercentage: UInt32
        pub var expiryTimestamp: UInt64
        pub var maxLossPercentage: UInt32
        pub var active: Bool
    }

    pub struct Claim {
        pub var claimant: Address
        pub var amount: UFix64
        pub var processed: Bool
    }

    pub var activePoliciesCount: UInt32
    pub var claimsCount: UInt32
    pub var totalPremiums: UFix64
    pub var policies: @{Address: Policy}
    pub var claims: @{UInt32: Claim}

    pub event PolicySelected(policyHolder: Address, policyType: PolicyType)
    pub event PolicyUpgraded(policyHolder: Address, policyType: PolicyType)
    pub event PolicyCancelled(policyHolder: Address)
    pub event ClaimFiled(claimant: Address, claimId: UInt32)
    pub event ClaimProcessed(claimId: UInt32)

    pub fun selectPolicy(policyType: PolicyType) {
        let policyHolder = getAccount(Address(authenticate: true))
        assert(policyHolder.borrow<&InsuranceContract.Policy>(from: InsuranceContract.policies) == nil, message: "Policy already active")

        let policy: InsuranceContract.Policy = {
            policyType: policyType,
            coveragePercentage: getCoveragePercentage(policyType),
            expiryTimestamp: UInt64(CurrentBlock.timestamp) + 30 * 24 * 60 * 60, // 30 days
            maxLossPercentage: getMaxLossPercentage(policyType),
            active: true,
        }

        activePoliciesCount += 1
        InsuranceContract.policies[<-policyHolder] = policy
        emit InsuranceContract.PolicySelected(policyHolder: policyHolder.address, policyType: policyType)
    }

    pub fun upgradePolicy(policyType: PolicyType) {
        let policyHolder = getAccount(Address(authenticate: true))
        let policy = policyHolder.borrow<&InsuranceContract.Policy>(from: InsuranceContract.policies)
            ?? panic("No active policy found")

        policy.policyType = policyType
        policy.coveragePercentage = getCoveragePercentage(policyType)
        policy.maxLossPercentage = getMaxLossPercentage(policyType)

        emit InsuranceContract.PolicyUpgraded(policyHolder: policyHolder.address, policyType: policyType)
    }

    pub fun cancelPolicy() {
        let policyHolder = getAccount(Address(authenticate: true))
        let policy = policyHolder.borrow<&InsuranceContract.Policy>(from: InsuranceContract.policies)
            ?? panic("No active policy found")

        policyHolder.unlink(InsuranceContract.policies)
        activePoliciesCount -= 1

        emit InsuranceContract.PolicyCancelled(policyHolder: policyHolder.address)
    }

    pub fun fileClaim(amount: UFix64) {
        let policyHolder = getAccount(Address(authenticate: true))
        let policy = policyHolder.borrow<&InsuranceContract.Policy>(from: InsuranceContract.policies)
            ?? panic("No active policy found")

        assert(amount > UFix64(0), message: "Claim amount must be greater than zero")
        assert(amount <= getMaxLossAmount(policyHolder), message: "Claim amount exceeds coverage limit")

        let claimId = claimsCount
        claimsCount += 1

    let claim: InsuranceContract.Claim = {
            claimant: policyHolder.address,
            amount: amount,
            processed: false,
        }

        InsuranceContract.claims[claimId] = claim
        emit InsuranceContract.ClaimFiled(claimant: policyHolder.address, claimId: claimId)
    }

    pub fun processClaim(claimId: UInt32) {
        let claim = InsuranceContract.claims[claimId]
        assert(!claim.processed, message: "Claim has already been processed")

        claim.processed = true
        InsuranceContract.claims[claimId] = claim

        emit InsuranceContract.ClaimProcessed(claimId: claimId)
    }

    pub fun getMaxLossAmount(policyHolder: Address): UFix64 {
        let currentPrice = FlowToken.getCurrentPrice()
        let policy = InsuranceContract.policies[policyHolder]
            ?? panic("No active policy found")

        let maxLossPercentage = policy.maxLossPercentage
        let coveragePercentage = policy.coveragePercentage

        return currentPrice * UFix64.from(maxLossPercentage) * UFix64.from(coveragePercentage) / UFix64.from(100 * 100)
    }

    pub fun getCurrentPrice(): UFix64 {
        return FlowToken.getCurrentPrice()
    }

    pub fun getPolicyDetails(policyHolder: Address): (UFix64, UInt32, UInt64, UFix64, UInt64) {
        let policy = InsuranceContract.policies[policyHolder]
            ?? panic("No active policy found")

        return (
            getMaxLossAmount(policyHolder),
            policy.coveragePercentage,
            policy.expiryTimestamp,
            getCurrentPrice(),
            policy.expiryTimestamp + 1 * 24 * 60 * 60, // Next payment due date
        )
    }

    pub fun getClaimCount(): UInt32 {
        return claimsCount
    }

    pub fun getClaimDetails(claimId: UInt32): (Address, UFix64, Bool) {
        let claim = InsuranceContract.claims[claimId]
            ?? panic("Claim not found")

        return (claim.claimant, claim.amount, claim.processed)
    }

    pub fun getActivePoliciesCount(): UInt32 {
        return activePoliciesCount
    }

    pub fun getTotalPremiums(): UFix64 {
        return totalPremiums
    }

    // Helper functions

    fun getCoveragePercentage(policyType: InsuranceContract.PolicyType): UInt32 {
        if policyType == InsuranceContract.PolicyType.Basic {
            return 20
        } else if policyType == InsuranceContract.PolicyType.Advanced {
            return 40
        } else if policyType == InsuranceContract.PolicyType.Premium {
            return 50
        } else if policyType == InsuranceContract.PolicyType.Platinum {
            return 100
        }

        panic("Invalid policy type")
    }

    fun getMaxLossPercentage(policyType: InsuranceContract.PolicyType): UInt32 {
        if policyType == InsuranceContract.PolicyType.Basic {
            return 70
        } else if policyType == InsuranceContract.PolicyType.Advanced {
            return 60
        } else if policyType == InsuranceContract.PolicyType.Premium {
            return 50
        } else if policyType == InsuranceContract.PolicyType.Platinum {
            return 30
        }

        panic("Invalid policy type")
    }
}

       
