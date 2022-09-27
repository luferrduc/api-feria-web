import bcrypt from "bcryptjs";

export const encriptar = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword)
    return hashPassword;
    
  } catch (error) {
    console.log(error);
  }
};

export const comparar = async (password, hashPassword) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error) {
    console.log(error)
  }
};
