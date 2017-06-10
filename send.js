var Web3 = require('web3');

var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:8545'));

console.log("Handle attached...");

//define the contract (dont change this, i will provide new abi information for the live qwark contract)
var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"currentEthBlock","outputs":[{"name":"blockNumber","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"initialSupplyPerAddress","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"totalSupply","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalGenesisAddresses","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"availableBalanceOf","outputs":[{"name":"Balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_caller","type":"address"}],"name":"setGenesisCallerAddress","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"maxTotalSupply","outputs":[{"name":"maxSupply","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address[]"}],"name":"setGenesisAddressArray","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"genesisAddress","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"rewardPerBlockPerAddress","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"currentBlock","outputs":[{"name":"blockNumber","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"initialBlockCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"genesisCallerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

console.log("ABI Variable loaded...");
console.log(web3.eth.accounts.length);
// synchronous loop function
var syncLoop = function(iterations, process, exit){
    var index = 0,
        done = false,
        shouldExit = false;
    var loop = {
      next:function(){
          if(done){
              if(shouldExit && exit){
                  exit(); // Exit if we're done
              } else {
                return; // Stop the loop if we're done
              }
          }
          // If we're not finished
          if(index < iterations){
              index++; // Increment our index
              if (index % 100 === 0) { //clear stack
                setTimeout(function() {
                  process(loop); // Run our process, pass in the loop
                }, 1);
              } else {
                 process(loop); // Run our process, pass in the loop
              }
          // Otherwise we're done
          } else {
              done = true; // Make sure we say we're done
              if(exit) exit(); // Call the callback on exit
          }
      },
      iteration:function(){
          return index - 1; // Return the loop number we're on
      },
      break:function(end){
          done = true; // End the loop
          shouldExit = end; // Passing end as true means we still call the exit callback
      }
    };
    loop.next();
    return loop;
  };


//declare the contract/token object
var minereum =  web3.eth.contract(abi).at("0x1a95b271b0535d15fa49932daba31ba612b52946");

console.log("Contract instantiated...");

/* // test contract is loaded correctly;
if (minereum.address) {
  console.log(minereum.address);
} else {
  console.log('err');
}
*/

// address to send to
var toAddress = 'your_address';

// amount to send in smallest units (satoshis), e.g 1.0 mne = 100000000 satoshi
var amount = 100000000; // 1 mne

syncLoop(web3.eth.accounts.length, function(uloop) {
  var u = uloop.iteration();
  web3.eth.defaultAccount = web3.eth.accounts[u];
  console.log("Default account selected...");
  web3.personal.unlockAccount(web3.eth.accounts[u], "your_password", 10);
  console.log("Account unlocked...");

  minereum.transfer(toAddress, amount, function(err, txid){
    console.log("Inside transfer function...");
    if (err) {
      console.log(err);
      uloop.next();
    } else {
      console.log("txid:" + txid);
      uloop.next();
    }
  });
}, function(){
  console.log("Exiting loop...tx's sent.");
});
