const requiredVars = {
  AWS_REGION: 'AWS Region',
  S3_BUCKET_NAME: 'S3 Bucket Name'
};

const validateEnvVariables = () => {
  const missingVars = Object.entries(requiredVars)
    .filter(([key]) => !process.env[key])
    .map(([key, description]) => `${key} (${description})`);

  if (missingVars.length > 0) {
    throw new Error(`Missing required S3 environment variables:\n${missingVars.join('\n')}`);
  }
};

export const getConfig = () => {
  validateEnvVariables();
  
  return {
    region: process.env.AWS_REGION,
    bucketName: process.env.S3_BUCKET_NAME
  };
};
