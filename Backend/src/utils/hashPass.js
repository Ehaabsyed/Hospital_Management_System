import bcrypt from 'bcrypt';

// This function hashes a plain password using bcrypt and returns the hashed password.
export const hashPass = async (password) => {
    try {
        if (!password) {
            throw new Error("Password is required for hashing");
        }


        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (err) {
        console.error("Error hashing password:", err);
        throw err;
    }
};


// This function compares a plain password with a hashed password
// and returns true if they match, false otherwise.
export const comparePass = async (plainPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch; //true false
    } catch (err) {
        console.error("Error comparing passwords:", err);
        throw err;
    }
};
