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
  initContract: async function () {
      let blockauth = await $.getJSON("Auth.json");
      blockchain_auth.contracts.auth = await TruffleContract(blockauth);
      blockchain_auth.contracts.auth.setProvider(blockchain_auth.web3Provider);
      console.log(blockchain_auth.contracts)
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
