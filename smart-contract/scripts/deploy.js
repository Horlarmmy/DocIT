// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const DocT = await hre.ethers.getContractFactory("Doct");
  const doct = await DocT.deploy();

  await doct.deployed();

  console.log(
    `DocT contract deployed to ${doct.address}`
  );

  console.log("Before: ", await doct.getdocuments());
  await doct.addDoc("https://docs.google.com/document/d/1pShZAnOmAS2XGkzxxXpuCpa6gf73KvTI/edit?usp=share_link&ouid=116133008642794496243&rtpof=true&sd=true");
  await doct.addDoc("https://docs.google.com/presentation/d/1ERBVS_5CGlu2eR3AudnsP99BAWwdbAFY/edit?usp=share_link&ouid=116133008642794496243&rtpof=true&sd=true");
  await doct.addDoc("https://drive.google.com/file/d/1xgb_IEgjWzzNmAl2jXxkCXXb8LF4e8ax/view?usp=share_link");
  const tx = await doct.addDoc("https://drive.google.com/file/d/1I4SVh-nBmQ9QqF6JWrKndd0wIly5jb-h/view?usp=share_link", );
  await tx.wait
  // await doct.addBook("");
  console.log("After: ", await doct.getdocuments());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
