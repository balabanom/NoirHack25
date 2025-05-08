// lib.nr
use dep::std::hash::pedersen_hash;

// Computes net delta of all contributions in a fixed-size group
pub fn compute_net_delta(paid_list: [Field; 3], total: Field) -> Field {
    let n: u32 = 3;
    let share = total / Field::from(n);

    let mut net_delta = 0;
    for i in 0..n {
        let delta = paid_list[i] - share;
        net_delta += delta;
    }

    net_delta
}

// Returns array of repayments for each person: share - paid[i]
pub fn compute_repayments(paid_list: [Field; 3], total: Field) -> [Field; 3] {
    let n: u32 = 3;
    let share = total / Field::from(n);

    let mut repayments: [Field; 3] = [0, 0, 0];
    for i in 0..n {
        repayments[i] = share - paid_list[i];
    }

    repayments
}

// Transfers value privately by creating a new note and nullifying the old one
pub fn transfer_note(
    sender_id: Field,
    receiver_id: Field,
    amount: Field,
    note_secret: Field,
) -> (Field, Field) {
    // Step 1: Commit to sender's original note
    let sender_note = pedersen_hash([sender_id, amount, note_secret]);

    // Step 2: Derive nullifier to mark it as spent
    let nullifier = pedersen_hash([sender_note, sender_id]);

    // Step 3: Create new note commitment for receiver
    let new_note = pedersen_hash([receiver_id, amount, note_secret]);

    // Output (nullifier, new_note_commitment) as tuple
    (nullifier, new_note)
}
