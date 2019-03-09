import {httpProvider,ERC20contractAddr,ERC20contractABI,PAScontractAddr,PAScontractABI} from "./const";
global.Buffer = global.Buffer || require("buffer").Buffer;

global.gERC20Instance = null;
global.gPASInstance = null;

export var InitChain3 = function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof chain3 !== 'undefined') {
    console.log("chain3 is defined");
    // Use Mist/MetaMask's provider
    global.chain3 = new Chain3(chain3.currentProvider);
  } else if (typeof web3 !== 'undefined') {
    global.chain3 = new Chain3(web3.currentProvider);
    GetERC20Instance();
  } else {
    console.log('No chain3? You should consider trying MoacMask!')
    try {
      global.chain3 = new Chain3(new Chain3.providers.HttpProvider(httpProvider));
    } catch (err) {
      console.log('Error', err);
      alert('Please install MOACMask wallet.\n\nFor crypto geeks who will run local nodes, you can run a local MOAC node at port 8545');

    }
  }
}

export var GetERC20Instance = function(){
if (!gERC20Instance) {
    var MyContract = chain3.mc.contract(ERC20contractABI);
    gERC20Instance = MyContract.at(ERC20contractAddr);
    return gERC20Instance;
  }
  return gERC20Instance;
}


export var GetPASInstance = function(){
if (!gPASInstance) {
    var MyContract = chain3.mc.contract(PAScontractABI);
    gPASInstance = MyContract.at(PAScontractAddr);
    return gPASInstance;
  }
  return gPASInstance;
}

export var getBalance = function(address,callback){
  gERC20Instance.balanceOf(address,callback);
}

export var getLog = function(_logId, callback){
  gPASInstance.getLog(_logId,callback);
}

export var transferPAS = function(_to, _value,callback){
  var opt =  {
    from: chain3.mc.accounts[0],
    gas: 5000000,
    value: 0,
    gasPrice: 20000000000,
  };
  gERC20Instance.transfer.sendTransaction(_to,_value,opt,function(e,r){
      if(callback){
        callback(e,r);
      }
  })
}