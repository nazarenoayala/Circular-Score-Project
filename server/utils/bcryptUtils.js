import bcrypt from 'bcrypt'
export const compareString = async(str, hash) => {
  return await bcrypt.compare(str, hash);
}

export const hashSting = async(str, cycles) => {
  return await bcrypt.hash(str, cycles)
}

