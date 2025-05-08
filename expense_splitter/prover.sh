#!/bin/bash
cd "$(dirname "$0")/Noir"

nargo check > /dev/null
nargo execute | grep "Circuit output:" > ../frontend/public/output.txt
