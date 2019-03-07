import './chain3Init';
import {ERC20contractAddr,ERC20contractABI,PAScontractAddr,PAScontractABI,founderAddr,founderKey} from "../client/const";

var ERC20Instance = chain3.mc.contract(ERC20contractABI).at(ERC20contractAddr);
var PASInstance = chain3.mc.contract(PAScontractABI).at(PAScontractAddr);
var networkId = chain3.version.network;
var gasEstimate = 4000000;
var founderInfo = {
  "addr": founderAddr, 
  "key": founderKey
};


function callContractMethod(src, contractAddress, gasValue, MsgValue,inchainID, inByteCode,callback){
    var txcount = chain3.mc.getTransactionCount(src["addr"],"pending");
    // console.log('gasvalue',gasValue);
    console.log("Get nonce", txcount)
    //Build the raw tx obj
    //note the transaction
    var rawTx = {
      from: src.addr,
      to: contractAddress, 
      nonce: chain3.intToHex(txcount),
      gasPrice: chain3.intToHex(30000000000),
      gasLimit: chain3.intToHex(gasValue),
      value: chain3.intToHex(MsgValue), 
      data: inByteCode,
      chainId: chain3.intToHex(inchainID)
    }
    // console.log(rawTx);
    var cmd1 = chain3.signTransaction(rawTx, src["key"]);    

    console.log("\nSend signed TX:\n", cmd1);

    chain3.mc.sendRawTransaction(cmd1, function(err, hash) {
     if (err){
      console.log('chain3 err:',err.message);
      return;
    }
    if(callback){
      callback(err,hash);
    }
    })
  }

Meteor.method({
	addLog(_logId, _logContent){
		var addLogData = PASInstance.addLog.getData(_logId,_logContent);
		callContractMethod(founderInfo,areaGameContractAddr,gasEstimate+100,0,networkId,addLogData);
	},
	addEncodedLog(_logId, _logContent){
		var addEncondedLogData = PASInstance.addLog.getData(_logId,_logContent);
		callContractMethod(founderInfo,areaGameContractAddr,gasEstimate+100,0,networkId,addEncondedLog);
	}
})