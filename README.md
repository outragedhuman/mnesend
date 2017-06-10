//launch geth with the following parameters

./geth --rpc --rpcaddr '127.0.0.1' --rpcapi "eth,web3,personal"

Usage:

Modify the toAddress = 'your_address'; line to include your deposit address or wherever you want to send your MNE

Modify the web3.personal.unlockAccount(web3.eth.accounts[u], "your_password", 10); line to include the password which unlocks the MNE accounts
