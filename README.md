# NoirHack25 – zkExpense Splitter

**zkExpense Splitter** is a privacy-focused tool that lets people split expenses fairly without revealing how much each person paid. By using zero-knowledge proofs through Noir, it proves fairness — but keeps personal amounts and identities hidden.

## Problem We're Tackling

Most expense-splitting apps require everyone to see who paid what. That’s fine for casual use, but in more sensitive contexts (like donations or private group transactions), it can be a privacy issue.

Our goal is to fix that by using zero-knowledge tech.

## Our Approach

With zkExpense Splitter:
- Users enter their private payment amounts
- A Noir circuit checks if the split is fair
- A ZK proof is generated — no actual amounts or IDs are revealed

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
- Takes in the user's paid amount and expected share
- Checks that the user paid their fair share
- Commits values using Pedersen hashes
- Hides identities and amounts using cryptographic commitments
- Supports note generation and nullifiers for private transfers

Files:
- `main.nr`: Circuit entry point (fair share check)
- `lib.nr`: Logic for delta calculation, repayment, nullifiers
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

3. **Use the App**

   Go to:
   ```
   http://localhost:3000
   ```
  Enter 3 payment values and the total expense, then click “Run ZK Proof” to generate and verify the proof.

4. **Noir Prover**
   The backend automatically generates `Prover.toml`, runs the Noir circuit via `prover.sh`, and returns the proof status to the frontend.

> You’ll need [Noir CLI tools](https://noir-lang.org/docs/getting-started/installation) installed locally (`nargo`) to generate the proof via `prover.sh`.

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

## Team - MEF Blockchain

- Özgür Matiloğlu  
- Ömer Faruk Balaban  
- Efe Yılmaz  
- Sudenur Bilgin


## Demo & Submission

- **Video Demo**: https://youtu.be/hedBypkSSug 
- **Slides**: https://docs.google.com/presentation/d/1UKRzsNdLCw4HeIXCCtkFqHJFJ7N9DmEhlWqu19e507o/edit?usp=sharing 

## Libraries & Tools

- Noir CLI (`nargo`)
- Node.js + Express
- React + TypeScript
- Hardhat (optional)

## What’s Next

- Add full repayment flow to frontend  
- Integrate zk identity (e.g. zkEmail, Worldcoin)  
- Deploy smart contract verifier for DAOs and dApps

---

Made with ❤️ for NoirHack25
