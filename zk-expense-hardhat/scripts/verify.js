const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const proofPath = path.join(__dirname, "../../expense_splitter/Noir/target/proof/proof");
  const publicInputsPath = path.join(__dirname, "../../expense_splitter/Noir/target/proof/public_inputs");

  const proof = fs.readFileSync(proofPath); // binary proof (Buffer)
  const publicInputsBuffer = fs.readFileSync(publicInputsPath); // also binary

  // Decode buffer into array of 32-byte chunks (Field elements)
  const fieldSize = 32;
  const publicInputs = [];
  for (let i = 0; i < publicInputsBuffer.length; i += fieldSize) {
    const fieldBytes = publicInputsBuffer.slice(i, i + fieldSize);
    const fieldHex = "0x" + fieldBytes.toString("hex");
    publicInputs.push(ethers.BigNumber.from(fieldHex));
  }

  const verifier = await ethers.getContractAt(
    "HonkVerifier",
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  );

  const isValid = await verifier.verify(publicInputs, proof);
  console.log("✅ Proof is", isValid ? "VALID ✅" : "INVALID ❌");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
