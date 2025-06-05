const requiredVars = {
  AWS_REGION: 'AWS Region',
  AWS_ACCESS_KEY_ID: 'AWS Access Key ID',
  AWS_SECRET_ACCESS_KEY: 'AWS Secret Access Key',
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
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.S3_BUCKET_NAME
  };
};
