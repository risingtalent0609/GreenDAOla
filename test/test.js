const { expect , assert } = require("chai");
const { ethers } = require("hardhat");

describe("The whole test started!",async function () {
  let user1, user2;

  beforeEach(async function () {
    [user1, user2] = await ethers.getSigners();

    const token_deploy = await ethers.getContractFactory("GreenDAOla");
    token = await token_deploy.deploy("GreenDAOla", "GD", 6, 5000000000000000, 500000000000000);
    await token.deployed();

    
    await token.transfer(user1.address, 1000000000);
    await token.transfer(user2.address, 1000000000);
  });

  describe("Checking constructor", async function () {
    it("Checking token name", async function () {
      expect(await token.name()).equal("GreenDAOla");
    });
    it("Checking token symbol", async function () {
      expect(await token.symbol()).equal("GD");
    });
    it("Checking token amount", async function () {
      expect(await token.totalSupply()).equal(500000000000000);
    });
  });

  describe("Checking activities", async function () {
    it("Checking transfer", async function () {
      await token.connect(user1).transfer(user2.address, 100000000);
      expect(await token.balanceOf(user2.address)).equal(1100000000);
    });

    it("Checking approve", async function () {
      await token.connect(user1).approve(user2.address, 100000000);
      await token.connect(user2).transferFrom(user1.address, user2.address, 100000000);
      expect(await token.balanceOf(user2.address)).equal(1100000000);
    });

    it("Checking mint", async function () {
      await token.connect(user1).mint(user1.address, 100000000);
      expect(await token.totalSupply()).equal(500000100000000);
    });
  });
});
