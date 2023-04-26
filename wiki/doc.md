## What is the Lucky dApp?

Lucky is a dApp built on the top of dApp Staking in Astar Network.

If the user stakes on the Lucky dApp, he will still receive the rewards from the dApp Staking and moreover he will have a chance to win extra rewards. It's a no loser lottery!

## About the dApp Staking

It's important to understand how dApp Staking works in Astar Network.

Token holders can stake their tokens on their favourite dApp and rewards are sent both to the staker and to the dApp developper. It’s a smart way to incentive the builders even if unfortunatly some dApps can receive many rewards and doesn’t build so much in the ecosystem. This is why it's important that the token holders take the time to choose the dApp on which they stake.

One word about the security, when a user stakes on a dApp, the tokens stay in the wallet of the user. The tokens are locked by the protocol and will be unlocked when the user will unstake. It means that this is the Astar protocol that directly secure the stake, and developers has no control on it.

## The raffle

In the Lucky dApp, the smart contract organizes a raffle among the addresses who staked on the dApp and distributes a share of the developer rewards to one lucky address.

It means that the user who stakes to the dApp Lucky will still receive the rewards from the dApp Staking in Astar, and moreover he will have a chance to win extra rewards with the raffles.

There is one raffle by [era](https://support.polkadot.network/support/solutions/articles/65000168050-what-is-an-era-). An era is ~24 hours on Astar and ~6 hours on Shiden. The more you stake, the more chance you have to win a raffle.

When you stake 100 tokens, it means you have 100 tickets for the raffle. Total tickets are the sum of all staked tokens on the dApp at each raffle.
So more tickets means more chance to win!

To try to give everyone a chance and prevent a whale from getting all the rewards, a same address cannot win consecutively. It must wait 10 eras to participate in the lottery again. The number of epochs is configurable and can be adapted if necessary.

Next we will implement a feature to reward the loyalty. It means that the longer you stake the more you increase your chance.

## How to use it?

### Stake

Use the [Astar Portal](https://portal.astar.network) to stake on the Lucky dApp.

Link to the testnet: [https://portal.astar.network/shibuya-testnet/dapp-staking/dapp?dapp=xz3shvmrgry3mt3qq3sjz3aupqtfhkj4rkeoqm6vjrend3w](https://portal.astar.network/shibuya-testnet/dapp-staking/dapp?dapp=xz3shvmrgry3mt3qq3sjz3aupqtfhkj4rkeoqm6vjrend3w)

### Claim

When an account win the raffle, the tokens are available to claim. Each user need to claim manually. Go to the Lucky dApp periodically to see if you won a raffle and have rewards to claim.

[https://lucky.substrate.fi/](https://lucky.substrate.fi/)

The tokens are stored in the contract until you claim, that means you can just stake and forget it for some times. Come back in a while, no need to worry, your Raffle will still wait for you!

But stay tuned as we are thinking about proposing other types of raffle, which could be reserved to active users of the dapp in the future

### Give feedback

Feel free to give us your feedback via this form: [https://forms.gle/XdvwAZSNo4U4N3DZA](https://forms.gle/XdvwAZSNo4U4N3DZA)

## Technical point of view

The principle is simple but behind the scene there are several wasm smart contracts, subquery or subsquid for indexing the data and schedulled jobs to regulary claim the rewards from the dApp Staking, read the data from the indexer and push them into the smart contracts.

All these schedulled jobs will be replaced soon by phat contracts in order to have a 100% decentralized dApp .

<iframe width="560" height="315" src="https://www.youtube.com/embed/hW4OcKYC3YM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Awards and Partnerships

The dApp was awarded in the Polkadot Hackathon Europe Edition, in the category ink! Smart Contracts.

We have a partnership with the dApp Royal Raffle written by the community Kusama Kingdom and when the Lucky dApp will be tested, our technology could then be used by other teams or other DAOs.

## Links

test dApp (Shibuya): [https://portal.astar.network/shibuya-testnet/dapp-staking/dapp?dapp=xz3shvmrgry3mt3qq3sjz3aupqtfhkj4rkeoqm6vjrend3w]()

Shiden dApp: --
Astar dApp: --

Web: [https://lucky.substrate.fi]()
Twitter: [https://twitter.com/Luckydapp]()

## contact (Discord):

GuiGou#1021
Arηo#8446

-----
