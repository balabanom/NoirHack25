# NoirHack25 – zkExpense Splitter

**zkExpense Splitter** is a zero-knowledge-powered expense sharing tool that allows groups of friends to split expenses **without revealing individual contribution amounts**. By leveraging Noir, users can prove they paid their fair share — without disclosing sensitive payment details.

## 🧩 Problem Statement

Most expense splitting tools (e.g., Splitwise) require users to reveal the full breakdown of who paid what. This creates **privacy risks**, especially when expenses involve sensitive contexts like donations, political causes, or private group spending.

## ✅ Our Solution

zkExpense Splitter introduces a **privacy-preserving expense verification system**:
- Users submit their share as encrypted inputs.
- Noir verifies off-chain that the expense was split correctly.
- The result is a **valid zero-knowledge proof**, confirming fairness without revealing raw numbers.

This is especially powerful for:
- Anonymous crowdfunding
- Private organization spending
- Family or group budgeting without micro-surveillance

## 🛠️ Tech Stack

| Component | Description |
|----------|-------------|
| **Noir** | zk circuit logic for validating fair expense splitting |
| **Express.js Backend** | Serves API routes for generating proofs and handling inputs |
| **Shell script (`prover.sh`)** | Automates proving process using Noir |
| **Frontend (basic)** | (Optional) Interface for submitting inputs and viewing proofs |
| **zk-expense-hardhat** | (Optional) Smart contract + deployment scripts (future expansion) |

## 🔐 Noir Circuit Details

Located under `expense_splitter/Noir/`, our Noir circuit:
- Accepts encrypted expense shares
- Validates that total contributions match expected total
- Outputs a proof that can be verified without revealing private values

Files:
- `main.nr`: Entry point for the circuit
- `lib.nr`: Contains constraint logic for summing and checking fairness
- `Prover.toml`: Auto-generated inputs for the prover

## 🚀 How to Run Locally

1. **Install dependencies**:
   ```bash
   cd expense_splitter/backend
   npm install
   
2. **Start the backend server**:
   ```bash
   node server.js

3. **Update Prover Input**:
   Send a `POST` request to the `/write-toml` endpoint with a valid TOML body.
   You can use tools like [Postman](https://www.postman.com/) or `curl`:
   ```bash
   curl -X POST http://localhost:5050/write-toml --data-binary @Prover.toml
   ```

4. **Run the Prover**:
   Access the `/run-prover` endpoint to generate a proof using your Noir circuit:
   ```
   http://localhost:5050/run-prover
   ```

> _Note: You must have `nargo` and the Noir CLI tools installed locally to generate proofs._

## 📂 Folder Structure

```text
NoirHack25-main/
├── expense_splitter/
│   ├── backend/        # Express.js server and API
│   ├── frontend/       # Optional UI (basic)
│   ├── Noir/           # Noir circuit + Prover config
│   └── prover.sh       # ZK proof script
├── zk-expense-hardhat/ # Optional smart contract scaffold
└── README.md
```

## 📹 Demo & Submission Info

- **Video Demo**: [Coming Soon]
- **Live Demo**: [If hosted, insert link here]
- **Slides**: [Link to presentation]
- **Submission for**: 
  - 🥇 Aztec – General Track
  - ⚙️ Technical Excellence
  - 🚀 Follow-up Grant Potential
  - 🌍 Entrepreneurship Prize (Best Real-World App)

## 🧠 Libraries & Tools Used

```text
- Noir CLI + Nargo
- Express.js
- Shell scripting for automation
- (Optional) Hardhat & Solidity (zk-expense-hardhat for expansion)
```

## 🙌 Challenges Overcome

```text
- Dynamically generating valid TOML input and wiring backend logic to Noir prover
- Ensuring circuit constraints work with realistic inputs
- Timeboxing for proof generation during development
```

## 📝 Future Work

```text
- Add frontend UI for user interaction
- Deploy smart contract verifier (zk-expense-hardhat)
- Enable multi-user flows with persistent identity (zkID or Semaphore)
```

---

Made with ❤️ for **NoirHack25**
