const requiredVars = {
  URL: 'URL to test with Lighthouse'
};

const validateEnvVariables = () => {
  const missingVars = Object.entries(requiredVars)
    .filter(([key]) => !process.env[key])
    .map(([key, description]) => `${key} (${description})`);

  if (missingVars.length > 0) {
    throw new Error(`Missing required Lighthouse environment variables:\n${missingVars.join('\n')}`);
  }
};

export const getConfig = () => {
  validateEnvVariables();
  
  return {
    url: process.env.URL
  };
};
