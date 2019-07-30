pragma solidity >=0.4.21 <0.6.0;
import "./Migrations.sol";

contract Auth is Migrations {

    mapping (address=>mapping(string=>bool)) private authTable;

    function authDevice(address addrs, string memory macAddress,bool status) public restricted returns(bool) {
        authTable[addrs][macAddress] = status;
        return authTable[addrs][macAddress];
    }
    
    function verifyDevice(string memory macAddress) public view returns (bool) {
        return authTable[msg.sender][macAddress];
    }

    function isOwner() public view returns (bool) {
        return owner == msg.sender;
    }
}
