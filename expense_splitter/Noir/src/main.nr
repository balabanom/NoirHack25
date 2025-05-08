// src/main.nr

use dep::std::hash::pedersen_hash;

// This circuit proves that a user paid exactly their fair share,
// without revealing how much anyone else paid.
// It also outputs a commitment hash for on-chain verification.

struct Inputs {
    paid: Field,
    expected_share: Field,
    pub total: Field,
}

fn main(input: Inputs) -> pub Field {
    // Number of participants (fixed for now)
    let n = 3;

    // Calculate expected share from total
    let computed_share = input.total / Field::from(n);

    // Ensure provided share matches expected share
    assert(computed_share == input.expected_share);

    // Ensure user paid exactly their share
    assert(input.paid == input.expected_share);

    // Return a Pedersen hash commitment for this proof
    let commitment = pedersen_hash([input.paid, input.expected_share, input.total]);

    commitment
}
