Web3 = require('web3')
fs = require('fs')
solc = require('solc')
var sleep = require('sleep')

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

code = fs.readFileSync('Voting.sol').toString();
compiledCode = solc.compile(code);

abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)

VotingContract = web3.eth.contract(abiDefinition);

byteCode = compiledCode.contracts[':Voting'].bytecode;

VotingContract.new(['Shreyansh', 'Shivam', 'Rishabh', 'Sumit'], {data: byteCode, from: web3.eth.accounts[0], gas: 4700000}, function(err, deployedContract) {
  if(!err) {
    if(!deployedContract.address) {
      console.log(deployedContract.transactionHash) // The hash of the transaction, which deploys the contract
      return
    }
    console.log("Total votes for Shreyansh-" + deployedContract.totalVotesFor.call('Shreyansh').toLocaleString())
    deployedContract.voteForCandidate('Shreyansh', {from: web3.eth.accounts[0]})
    deployedContract.voteForCandidate('Shreyansh', {from: web3.eth.accounts[0]})
    deployedContract.voteForCandidate('Shreyansh', {from: web3.eth.accounts[0]})
    deployedContract.voteForCandidate('Shreyansh', {from: web3.eth.accounts[0]})
    console.log("Voted for Shreyansh 4 times")
    console.log("Total votes for Shreyansh-" + deployedContract.totalVotesFor.call('Shreyansh').toLocaleString())
    console.log("Total votes for Shivam-" + deployedContract.totalVotesFor.call('Shivam').toLocaleString())
    console.log("Total votes for Rishabh-" + deployedContract.totalVotesFor.call('Rishabh').toLocaleString())
    console.log("Total votes for Sumit-" + deployedContract.totalVotesFor.call('Sumit').toLocaleString())
    console.log("contractaddress-   " + deployedContract.address)
  }
  else {
    console.log(err);
  }
});
