//launch geth with the following parameters

./geth --rpc --rpcaddr '127.0.0.1' --rpcapi "eth,web3,personal"

Usage:

Modify the toAddress = 'your_address'; line to include your deposit address or wherever you want to send your MNE

Modify the web3.personal.unlockAccount(web3.eth.accounts[u], "your_password", 10); line to include the password which unlocks the MNE accounts

Modify the amount variable to include the amount of MNE you wish to send from each account. 100000000 = 1 MNE

Running:

Run the script using 'node send.js' from the mnesend directory
