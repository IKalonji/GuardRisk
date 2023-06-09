# GuardRisk

This is an insurance application smart contract built on the Polygon and Flow blockchain using Solidity and Cadence. It allows users to insure risks associated with systemic risks like the collapse of a CEX/DEX, market disruptions not associated with the normal trading of assets. Investors stake their funds for a specified duration in order to cover liability and in return earn yield on the premiums paid by users. The application includes various features such as policy selection, stake deposit, rewards calculation, policy management, and claims processing.

## Problem Statement

In the rapidly growing crypto ecosystem, there is a need for reliable insurance solutions to protect investors from potential losses due to market volatility and unforeseen circumstances. Traditional insurance systems are often slow, inefficient, and lack transparency. Additionally, existing crypto insurance platforms may have limitations, such as high costs, complex processes, and limited policy options.

## Solution

The Insurance Application aims to address the above challenges by providing a decentralized insurance solution. By leveraging the benefits of blockchain technology, the application offers the following advantages:

- **Transparency**: All insurance policies, stake deposits, rewards calculations, and claims processing are recorded on the public Polygon blockchain, providing transparency and auditability to policyholders.

- **Security**: Smart contracts ensure the security of funds and automate policy management, eliminating the need for intermediaries and reducing the risk of fraud.

- **Efficiency**: The application automates policy expiration, rewards calculation, and claims processing using Chainlink, streamlining the insurance lifecycle and reducing administrative overhead.

- **Flexibility**: Users can select from multiple insurance policies with varying levels of coverage, allowing them to choose the one that best suits their needs and risk appetite.

- **Improved User Experience**: The frontend interface provides an intuitive user experience, making it easy for users to interact with the application, manage their policies, and track their rewards and claims.

## Architecture

The application consists of two main smart contracts:

1. Insurance Contract: Handles the insurance policies, including policy selection, expiration, and maximum loss protection percentages.
2. Timebased Staking Contract: Manages the staking of funds for a specific duration and calculates rewards based on the insurance protocol performance.
3. Test Token was deployed as the underlying insured asset for the demo.

[![](https://mermaid.ink/img/pako:eNpdkl9rgzAUxb9KuE8ObNGmWPVh0NY-Fgplexi-XDX-oZqIiXSu7XdfNN3ajZAQzjn3l3CTC6QiYxBCXotzWmKnSMwJkX1SdNiW5E2ybhQIWVsHUVfpQA5YsBcym71ej6xmqZKknYwr2VhHhaeKFyZj6jYmqg0mSd7zTF7J1opQlonALruntlNqj1wXPoCRdcChYVw9A6N7dOS1xtbEPxjBKyW6B2dnbWusGvmM2U3R94qdSWrMspK6avgPm-70i1qPHuNZzH_GGDUr2NCwrsEq0w29jFoMqmQNiyHU24zl2NcqBttYCaanohO6JcZPai3EEPObBmGvxHHgKYSq65kNfZuhYlGF-l0aCHOspVZb5BBe4BPCpT_3fBoEnuu4qyV1HM-GAUKfzhf-ynGdgFKXUhrcbPgSQhOcebCgKyfwqJ6e63vLCfcxmeZMlo1t3JsPMv2T2zcKQK8i?type=png)](https://mermaid.live/edit#pako:eNpdkl9rgzAUxb9KuE8ObNGmWPVh0NY-Fgplexi-XDX-oZqIiXSu7XdfNN3ajZAQzjn3l3CTC6QiYxBCXotzWmKnSMwJkX1SdNiW5E2ybhQIWVsHUVfpQA5YsBcym71ej6xmqZKknYwr2VhHhaeKFyZj6jYmqg0mSd7zTF7J1opQlonALruntlNqj1wXPoCRdcChYVw9A6N7dOS1xtbEPxjBKyW6B2dnbWusGvmM2U3R94qdSWrMspK6avgPm-70i1qPHuNZzH_GGDUr2NCwrsEq0w29jFoMqmQNiyHU24zl2NcqBttYCaanohO6JcZPai3EEPObBmGvxHHgKYSq65kNfZuhYlGF-l0aCHOspVZb5BBe4BPCpT_3fBoEnuu4qyV1HM-GAUKfzhf-ynGdgFKXUhrcbPgSQhOcebCgKyfwqJ6e63vLCfcxmeZMlo1t3JsPMv2T2zcKQK8i)

## How GuardRisk was built 
- React
- Vercel
- Ethers
- Chainlink
- Solidity
- Cadence
- Chainlink functions starterkit

#### Deployed Contracts

- GuardRiskTestToken: 0xBde7A4Dc4Fd28729B668EC6361B8d5E7c82E462c (Test underlying insured asset)

- GuardRiskInsurance: 0x5E24aBe3706f7d988713A4568e421223f4591BBc
    - Automation:
        * Update asset value: https://mumbai.polygonscan.com/tx/0x8e7e50df0a3c0a7c43b818b361f7ff5e082cac26eee03136e8126313f08dc15a
        * Automate claim based on insured asset value: https://mumbai.polygonscan.com/tx/0x0716d0bf025d769cbf23bfae8c615fef371e16f03d69665172ca23da19d745b7
    - Data feed
        * Volatility index used for calculating risk: https://mumbai.polygonscan.com/tx/0xf0fdf2735a56a94105962a55baff575f71876027d292f86093e77a15af3f9855

- GuardRiskStaking: 0x2281E49eb686663b9e033670AC103289c20FA033 
    - Functions:
        * Chainlink Functions for calculation of staking rewards: https://mumbai.polygonscan.com/tx/0xcd05b45d1b7e60e07465b01a67a61719bec49b99e8ea9b033daffd50616a1a76
        https://mumbai.polygonscan.com/tx/0x4bf07a39b02ba6095835094ab38550ddc0a9ee5bf0fe2caf5ea4e0dda75a3b75
    - Automation:
        * Return stake and rewards on expiry: https://mumbai.polygonscan.com/tx/0x63456176b767dd13d97a271c4a3646987db64063c0d4d2eee8c7e37a434b5063

- Flow contracts can be found in ./contracts_cadence folder
- Solidity contracts can be found in ./chainlink_functions/contracts folder

## Usage

1. Access the frontend application through a web browser.
2. Navigate to the Policy Page and select the desired insurance policy.
3. Proceed to the Staking Page and stake the desired amount for a specified duration.
4. Monitor the policy details and rewards on the Dashboard.
5. Make payments on the Payment Page to reactivate an expired policy.
6. View and track claims on the Claims Page.
7. Manage policies by upgrading or canceling on the Policy Page.

## What I've learnt

As it was my first time working with Chainlink Functions and Automation, as well as Flow, I had a few stumbling blocks. The documentation did however assist a lot whenever I was stuck. It was a lot of fun learning and building with these new technologies and I will continue building and improving the dApp. I'm proud to have been able to complete and submit my project.