const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("tx.origin attack", function () {
    async function txAttackSetup() {
        const [owner, otherAccount] = await ethers.getSigners();

        const txContract = await ethers.getContractFactory("TxContract");
        const deployedTxContract = await txContract.deploy();

        const attackerContract = await ethers.getContractFactory("Attacker");
        const deployedAttackerContract = await attackerContract.deploy(
            deployedTxContract.address
        );

        return {
            deployedTxContract,
            deployedAttackerContract,
            owner,
            otherAccount,
        };
    }
    async function txResistantSetup() {
        const [owner] = await ethers.getSigners();

        const txResistantContract = await ethers.getContractFactory(
            "TxResistantContract"
        );
        const deployedTxResistantContract = await txResistantContract.deploy();

        const attackerContract = await ethers.getContractFactory("Attacker");
        const deployedAttackerContract = await attackerContract.deploy(
            deployedTxResistantContract.address
        );

        return {
            deployedTxResistantContract,
            deployedAttackerContract,
            owner,
        };
    }

    it("Attacker.sol will be able to change the owner of TxContract.sol", async function () {
        const { deployedTxContract, deployedAttackerContract, owner } =
            await loadFixture(txAttackSetup);

        expect(await deployedTxContract.owner()).to.equal(owner.address);

        await deployedAttackerContract.connect(owner).attack();

        expect(await deployedTxContract.owner()).to.equal(
            deployedAttackerContract.address
        );
    });

    it("Attacker.sol will fail to change the owner of TxContract.sol", async function () {
        const { deployedTxResistantContract, deployedAttackerContract, owner } =
            await loadFixture(txResistantSetup);

        expect(await deployedTxResistantContract.owner()).to.equal(
            owner.address
        );

        await expect(
            deployedAttackerContract.connect(owner).attack()
        ).to.revertedWith("Not owner");
    });
});
