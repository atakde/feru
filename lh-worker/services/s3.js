import AWS from 'aws-sdk';

export class S3Uploader {
  constructor(config) {
    this.validateConfig(config);
    this.s3 = new AWS.S3({
      region: config.region,
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });
    this.bucketName = config.bucketName;
  }

  validateConfig(config) {
    const requiredFields = ['region', 'accessKeyId', 'secretAccessKey', 'bucketName'];
    const missingFields = requiredFields.filter(field => !config[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required configuration: ${missingFields.join(', ')}`);
    }
  }

  async upload(key, body, contentType) {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    };

    try {
      console.log(`Uploading ${key} to bucket ${this.bucketName}...`);
      const result = await this.s3.upload(params).promise();
      console.log(`Successfully uploaded ${key}`);
      return result;
    } catch (error) {
      console.error(`Failed to upload ${key}:`, error);
      throw error;
    }
  }
}
