pragma solidity >=0.4.21 <0.6.0;


contract Auth {
    mapping (address=>string) private authTable;

    function registerDevice(string memory sshKey) public {
        authTable[address(this)] = sshKey;
    }

    function verifyDevice(string memory sshKey) public view returns (bool) {
        return
        (keccak256(bytes(authTable[address(this)])) == keccak256(bytes(sshKey)));
    }

}
