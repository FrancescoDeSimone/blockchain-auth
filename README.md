# Blockchain-auth

This project is made for the IoT Data Analytics course at University of Salerno.

## Description

**Blockchain-auth** allows you to use your ethereum wallet to manage all your iot devices. 
Blockchain-auth is an access control system whom live on the ethereum blockchain.
The aim of blockchain-auth is to pair an iot devices with an ethereum account. 
The access to a iot device is allowed only if a pair procedure is made by an administrator.
The securety is granted by the blockchain tecnology.

## Requirements
 - [Nodejs](https://nodejs.org/en/)
 - [Ganache](https://www.trufflesuite.com/ganache)
 - [Truffle suite](https://www.trufflesuite.com/docs/truffle/overview)
 - [MetaMask](https://metamask.io/)
 
The iot devices have to be configured with a free zero-configuration networking (like [avahi](https://www.avahi.org/)) and have a ssh service enable.
Blockchain-auth will search for every ssh devices in the network through mdns.  
 
## Usage

- Clone the repo

  ```git clone https://github.com/FrancescoDeSimone/blockchain-auth```

- Open ganache

- Compile the SmartContracts and migrate it

  ```truffle compiler && truffle migrate --reset```

- Start the server in the root
  
   ```node server.js```

- Open your browser at:

  ```localhost:3000```

- Use MetaMask to manage your ethereum account
