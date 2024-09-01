import bcrypt from "bcryptjs";

export default class HashManager {
  getHashedPassword = async (password: string): Promise<string> => {
    if (process.env.NODE_ENV === "test") {
      return password;
    }

    const salt: string = await bcrypt.genSalt(10);
    const hashedPass: string = await bcrypt.hash(password, salt);

    return Promise.resolve(hashedPass);
  };

  hash = async (data: string) => {
    return await bcrypt.hash(data, "$2b$10$Y79NnHg6QTChYPcMKt9wh.");
  };

  isValidPassword = async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    if (process.env.NODE_ENV === "test") {
      return password === hashedPassword;
    }

    return await bcrypt.compare(password, hashedPassword);
  };
}
