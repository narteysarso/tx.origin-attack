// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract TxResistantContract {
    
    address public owner;

    constructor(){
        owner = msg.sender;
    }

    function changeOwner(address _newOwner) public {
        // uses msg.sender to avoid tx.origin attack
        require(msg.sender == owner, "Not owner");
        owner = _newOwner;
    }
}
