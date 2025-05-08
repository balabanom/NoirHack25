# NoirHack25 – zkExpense Splitter

**zkExpense Splitter** is a privacy-first tool that helps groups split expenses without revealing how much each person paid. Using zero-knowledge proofs via Noir, people can prove they contributed fairly — without exposing sensitive financial details.

## Problem We're Tackling

Most expense-splitting apps (like Splitwise) make you show who paid what. In some situations — like anonymous donations or private group spending — this can be a privacy concern.

We wanted to solve that.

## Our Approach

zkExpense Splitter lets users:
- Submit encrypted inputs for what they contributed
- Generate a zero-knowledge proof using Noir
- Prove that the split was fair, without revealing any amounts

This approach can work well for things like:
- Private fundraising
- Organization budget tracking
- Friends or family who want to keep things fair without micromanaging

## Tech Stack

| Component | Purpose |
|----------|---------|
| **Noir** | Handles the core zk logic to verify fair expense splits |
| **Express.js backend** | Provides endpoints to update input files and trigger proving |
| **Shell script (`prover.sh`)** | Runs Noir proof generation from the backend |
| **Frontend (planned)** | Interface for submitting data (to be added) |
| **zk-expense-hardhat** | Scaffold for optional contract deployment in the future |

## Noir Circuit

You’ll find the circuit in `expense_splitter/Noir/`. It checks that all encrypted shares add up to the total and produces a proof of correctness.

Files include:
- `main.nr`: The main entry point
- `lib.nr`: Logic for summing and constraint checks
- `Prover.toml`: Input values used during proving

## How to Run Locally

```bash
# 1. Install backend dependencies
cd expense_splitter/backend
npm install

# 2. Start the server
node server.js

# 3. Update Prover Input
# Send a POST request with your TOML body to:
# http://localhost:5050/write-toml
# Example with curl:
curl -X POST http://localhost:5050/write-toml --data-binary @Prover.toml

# 4. Trigger the prover
# Visit the following URL in your browser or via curl:
http://localhost:5050/run-prover
```

> Note: You’ll need `nargo` and Noir CLI tools installed to generate proofs locally.

## Folder Structure

```
NoirHack25-main/
├── expense_splitter/
│   ├── backend/        # API logic and Noir integration
│   ├── frontend/       # UI (to be added)
│   ├── Noir/           # Noir circuit and config
│   └── prover.sh       # Script to run proof generation
├── zk-expense-hardhat/ # Optional smart contract setup
└── README.md
```

## Demo & Submission Details

- **Video Demo**: [Coming Soon]
- **Live Demo**: [If deployed, link it here]
- **Slides**: [Presentation link goes here]
- **Prize Tracks**:  
  - Aztec – General  
  - Technical Excellence  
  - Follow-up Grant  
  - Entrepreneurship Award

## Libraries & Tools

- Noir + Nargo
- Node.js / Express
- Bash scripting
- (Optional) Hardhat + Solidity (for future on-chain verification)

## Challenges We Faced

- Connecting backend logic to dynamic TOML file generation
- Structuring constraints in Noir to validate fairness
- Keeping proof generation time manageable under hackathon pressure

## What’s Next

- Add a full frontend for submitting and verifying proofs
- Deploy a verifier smart contract for optional on-chain proof validation
- Support multi-user identity with tools like zkID or Semaphore

---

Made with ❤️ for NoirHack25
