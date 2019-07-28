pragma solidity >=0.4.21 <0.6.0;
import "./Migrations.sol";

contract Auth is Migrations {

    mapping (address=>mapping(string=>bool)) private authTable;

    function registerDevice(string memory sshKey) public restricted returns(bool) {
        authTable[address(this)][sshKey] = true;
        return authTable[address(this)][sshKey];
    }

    function verifyDevice(string memory sshKey) public view returns (bool) {
        return authTable[address(this)][sshKey];
    }
}
