const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/write-toml", (req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk.toString()));
  req.on("end", () => {
    try {
      const filePath = path.join(__dirname, "../Noir/Prover.toml");
      fs.writeFileSync(filePath, body);
      console.log("✅ Prover.toml updated:\n" + body);
      res.send("TOML written successfully");
    } catch (err) {
      console.error("❌ Error writing TOML:", err.message);
      res.status(500).send("Failed to write TOML");
    }
  });
});

app.get("/run-prover", (req, res) => {
  const scriptPath = path.join(__dirname, "../prover.sh");
  if (!fs.existsSync(scriptPath)) {
    return res.status(500).send("❌ prover.sh not found");
  }

  exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error executing prover:\n${stderr}`);
      return res.status(500).send("Prover execution failed");
    }

    const lines = stdout.split("\n");
    const outputLine = lines.find((line) => line.includes("Circuit output:"));

    if (!outputLine) {
      return res.status(500).send("❌ Circuit output not found in stdout");
    }

    const match = outputLine.match(/Field\\(([-0-9]+)\\)/);
    if (!match) {
      return res.status(500).send("❌ Could not parse commitment output");
    }

    const commitmentInt = BigInt(match[1]);
    const commitmentHex = "0x" + commitmentInt.toString(16);

    const jsonOutput = {
      commitment: commitmentHex,
      proof: "0xZKPROOFPLACEHOLDER",
    };

    const outputPath = path.join(__dirname, "../frontend/public/output.json");
    fs.writeFileSync(outputPath, JSON.stringify(jsonOutput, null, 2));
    console.log("✅ output.json saved:", jsonOutput);

    res.send(JSON.stringify(jsonOutput, null, 2));
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
