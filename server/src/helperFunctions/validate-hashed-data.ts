import * as bcrypt from 'bcrypt';

const validateHashedData = async (
  toValidateHashedData: string,
  primaryHashedData: string,
): Promise<boolean> => {
  try {
    const result = await bcrypt.compare(toValidateHashedData, primaryHashedData);
    return result
  }
  catch (ex) {
    console.log(ex)
  }
};

export { validateHashedData };
