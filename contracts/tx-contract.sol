// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract TxContract {
    
    address public owner;

    constructor(){
        owner = msg.sender;
    }

    function changeOwner(address _newOwner) public {
        require(tx.origin == owner, "Not owner");
        owner = _newOwner;
    }
}
