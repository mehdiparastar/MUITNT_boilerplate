import * as bcrypt from 'bcrypt';

const validateHashedData = async (
  toValidateHashedData: string,
  primaryHashedData: string,
): Promise<boolean> => {
  return bcrypt.compare(toValidateHashedData, primaryHashedData);
};

export { validateHashedData };
