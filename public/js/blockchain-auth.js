const blockchain_auth = {
  web3Provider: null,
  contracts: {},
  account: null,
  isAdmin: false,

  initWeb3: function () {
      if (typeof web3 !== 'undefined') {
          if (web3.currentProvider.isMetaMask === true) {
              blockchain_auth.web3Provider = web3.currentProvider;
          } else {
              console.log("metamask is not available")
          }
      } else {
        console.log("TODO")
      }
      console.log("Web3 init")
      return blockchain_auth.initContract();
  },
  initContract: function () {
      $.getJSON("auth.json", function (blockauth) {
          blockauth.contracts.auth = TruffleContract(blockauth);
          blockauth.contracts.auth.setProvider(blockchain_auth.web3Provider);
      });
      console.log("contract init")
  },
  registerDevice: function(keySSH){
    blockchain_auth.contracts.auth.deployed().then(function (instance) {
      instance.registerDevice(string)
    })
  },
  verifyDevice: function(keySSH){
    return new Promise((res,rej) =>{
      blockchain_auth.contracts.auth.deployed().then(function (instance) {
        instance.verifyDevice(keySSH).then(isAllowed => {
          res(isAllowed)
        }).catch(console.log)
      })
    })
  }
};
