import bcrypt from "bcrypt";

//hashing plain password
export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    }); //strength of the password
  });
};

export const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed); //returns boolean value
};
