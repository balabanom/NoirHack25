# NoirHack25 – zkExpense Splitter

**zkExpense Splitter** is a privacy-focused tool that lets people split expenses fairly without revealing how much each person paid. By using zero-knowledge proofs through Noir, it proves fairness — but keeps personal amounts hidden.

## Problem We're Tackling

Most expense-splitting apps require everyone to see who paid what. That’s fine for casual use, but in more sensitive contexts (like donations or private group transactions), it can be a privacy issue.

Our goal is to fix that by using zero-knowledge tech.

## Our Approach

With zkExpense Splitter:
- Users enter encrypted amounts
- A Noir circuit checks if the split is fair
- A ZK proof is generated — no actual amounts are revealed

This kind of system is useful for:
- Anonymous fundraising
- Private organizational spending
- Friends or families who want fairness without oversharing

## Tech Stack

| Component            | Purpose                                                         |
|----------------------|-----------------------------------------------------------------|
| **Noir**             | Core ZK circuit for expense fairness checks                     |
| **Express.js backend** | API endpoints for updating input and triggering proof generation |
| **React frontend**   | Simple UI to interact with the backend                          |
| **Shell script**     | Runs Noir CLI proof generation logic                            |
| **zk-expense-hardhat** | Scaffold for smart contract deployment (optional/future work)   |

## Noir Circuit

Located in `expense_splitter/Noir/`, the circuit:
- Takes in a list of encrypted expense shares
- Checks that they sum to the total expected amount
- Outputs a valid ZK proof if all checks pass

Files:
- `main.nr`: Circuit entry point
- `lib.nr`: Logic for validating fairness
- `Prover.toml`: Auto-filled file holding input values

## How to Run Locally

1. **Backend Setup**
   ```bash
   cd expense_splitter/backend
   npm install
   node server.js
   ```

2. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

3. **Update Prover Input**
   Send a POST request to:
   ```
   http://localhost:5050/write-toml
   ```
   Example with `curl`:
   ```bash
   curl -X POST http://localhost:5050/write-toml --data-binary @Prover.toml
   ```

4. **Trigger the ZK Prover**
   Visit:
   ```
   http://localhost:5050/run-prover
   ```

> You’ll need [Noir CLI tools](https://noir-lang.org/docs/getting-started/installation) installed locally (`nargo`) to generate the proof.

## Folder Structure

```
NoirHack25-main/
├── expense_splitter/
│   ├── backend/        # Express server (API for TOML + proof)
│   ├── frontend/       # React app (submit inputs, view results)
│   ├── Noir/           # Noir circuits and configs
│   ├── Prover.toml     # Sample input file for proving
│   └── prover.sh       # Local ZK proof script
├── zk-expense-hardhat/ # Smart contract scaffold (optional)
└── README.md
```

## Demo & Submission

- **Video Demo**: [Coming Soon]
- **Live Demo**: [Optional - deploy frontend/backend]
- **Slides**: [Link to slides]
- **Tracks We're Submitting To**:  
  - Aztec – General  
  - Technical Excellence  
  - Follow-up Grant  
  - Entrepreneurship Award

## Libraries & Tools

- Noir CLI (`nargo`)
- Node.js + Express
- React + TypeScript
- Hardhat (optional)

## Challenges We Faced

- Connecting dynamic TOML input to the Noir prover
- Validating correct constraints inside the circuit
- Building around Noir's proof system in a short time

## What’s Next

- Add more user-friendly frontend features
- Deploy smart contract for proof verification
- Use zkID or Semaphore for user identity/roles

---

Made with ❤️ for NoirHack25
