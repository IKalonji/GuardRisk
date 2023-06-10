export let DashboardCardInfo = (policyDetailsObject) => {
    return [
        {
            heading: "Cover End-date",
            Color: "#93BFCF",
            data: `${new Date(policyDetailsObject.expire * 1000)}`
        },
        {
            heading: "Active",
            Color: "#B2A4FF",
            data: `${policyDetailsObject.isActive}`.toUpperCase()
        },
        {
            heading: "Insured Asset Price",
            Color: "#FFD966",
            data: `${policyDetailsObject.price} GRTT/MATIC`
        },
        {
            heading: "Chainlink Volatility Index Feed",
            Color: "#9BABB8",
            data: `${policyDetailsObject.volatility} bps`
        },
        {
            heading: "Insured Loss Coverage",
            Color: "#D2E9E9",
            data: `${policyDetailsObject.coverage}%`
        },
        {
            heading: "Outstanding Claims",
            Color: "#C7E9B0",
            data: 0
        },
        {
            heading: "Policy Type",
            Color: "#E8F3D6",
            data: `${policyDetailsObject.policy}`
        },
        {
            heading: "Max Loss",
            Color: "#8EA7E9",
            data: `${policyDetailsObject.maxLoss}%`
        },
    ]
}