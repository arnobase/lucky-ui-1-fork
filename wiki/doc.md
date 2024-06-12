# What is the Lucky dApp?

Lucky is a dApp built on the top of dApp Staking in Astar Network.

If the user stakes on the Lucky dApp, he will still receive the rewards from the dApp Staking and moreover he will have a chance to win extra rewards. It's a no loser lottery!

## About the dApp Staking

It's important to understand how dApp Staking works in Astar Network.

Token holders can stake their tokens on their favourite dApp and rewards are sent both to the staker and to the dApp developper. It’s a smart way to incentive the builders even if unfortunatly some dApps can receive many rewards and doesn’t build so much in the ecosystem. This is why it's important that the token holders take the time to choose the dApp on which they stake/vote.

One word about the security, when a user stakes on a dApp, the tokens stay in the wallet of the user. The tokens are locked by the protocol and will be unlocked when the user will unstake. It means you never transfer tokens and the risk of losing tokens is zero (even if the risk 0 never exist).

## The raffle

In the Lucky dApp, the smart contract organizes a raffle among the addresses who staked on the dApp and distributes a share of the developer rewards to one lucky address.

It means that the user who stakes to the dApp Lucky will still receive the rewards from the dApp Staking in Astar, and moreover he will have a chance to win extra rewards with the raffles.

There is one raffle by [era](https://support.polkadot.network/support/solutions/articles/65000168050-what-is-an-era-). An era is ~24 hours on Astar and ~6 hours on Shiden. The more you stake, the more chance you have to win a raffle.

When you stake 100 tokens, it means you have 100 tickets for the raffle. Total tickets are the sum of all staked tokens on the dApp at each raffle.
So more tickets means more chance to win!

To try to give everyone a chance and prevent a whale from getting all the rewards, a same address cannot win consecutively. It must wait 10 eras to participate in the lottery again. The number of epochs is configurable and can be adapted if necessary.

## How to use it?

### Stake

Use the [Astar Portal](https://portal.astar.network/astar/dapp-staking/dapp?dapp=zsv1gvepvmwfdshmwgczs4zyvmmwesbjwqjn4wdpuefrrpy) to stake on the Lucky dApp and that's all!

### Claim

When an account win the raffle, the tokens are available to claim. Each user need to claim manually. Go to the Lucky dApp periodically to see if you won a raffle and have rewards to claim.

The tokens are stored in the contract until you claim, that means you can just stake and forget it for some times. Come back in a while, no need to worry, your rewards will still wait for you!

But stay tuned as we are thinking about proposing other types of raffle, which could be reserved to active users of the dapp in the future.

## Technical point of view

The principle is simple but behind the scene there are several wasm smart contracts, phat contracts, subquery/subsquid indexer to regulary claim the rewards from dApp Staking and organise a raffle per era.

The dApp is built with Smart contracts on Astar Network and Phat contracts on Phala Network to be as decentralized as possible.

<iframe width="560" height="315" src="https://www.youtube.com/embed/hW4OcKYC3YM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Awards

The Lucky dApp was awarded in the Polkadot Hackathon Europe Edition, in the category ink! Smart Contracts.

# What is the Lotto dApp?

Lotto is a free lottery in which participants choose 4 numbers between 1 and 50 and if their numbers match with the winning numbers, they win the jackpot.

The initial jackpot will consist of 4M $PINK + 2000 ASTR and will increase regularly.

There will be a draw every week until we have a winner.

## How to participate?

Just pick 4 numbers and submit your participation (free to play).

You just have to pay the transaction fee to register your participation in the blockchain.

All data is recorded on the blockchain for easy verification.

## How the winning numbers are drawn?

It is managed by a Phat Contract (ie a smart contract deployed on Phala Network) and we use a VRF (Verifiable Random Function), developped by Phala Team, to draw the winning numbers.

As Phala team very well said [here](https://x.com/PhalaNetwork/status/1790410734775455810): Using a verifiable random function (VRF) for number drawing, the game ensures transparency and fairness. All data is recorded on the blockchain for easy verification.

## Winners

If your numbers match the draw, congrats you win the jackpot!

In this case the winner need to manually claim the jackpot on the dApp.

If there is a winner, he will receive the full jackpot.

If there are several winners, the jackpot will be shared equally.


## Technical point of view

As for the Lucky dApp, we use Smart contracts on Astar Network and Phat contracts on Phala Network to be as decentralized as possible.

<iframe width="560" height="315" src="https://youtu.be/2NqkHoibHDc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
