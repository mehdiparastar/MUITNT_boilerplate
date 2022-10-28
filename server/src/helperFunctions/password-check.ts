import { promisify } from 'util';
import { scrypt as _scrypt } from 'crypto';

const scrypt = promisify(_scrypt);

const passwordCheck = async (pass: string, inDBHashedPass: string) => {
  const [salt, storedHash] = inDBHashedPass.split('.');
  const hash = (await scrypt(pass, salt, 32)) as Buffer;
  return storedHash == hash.toString('hex');
};

export { passwordCheck };
