import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export class S3Uploader {
  constructor(config) {
    this.validateConfig(config);
    this.s3Client = new S3Client({
      region: 'us-east-1', // Default region, can be changed as needed
      signatureVersion: 'v4' // Optional, can be omitted in AWS SDK v3
    });
    this.bucketName = config.bucketName;
  }

  validateConfig(config) {
    const requiredFields = ['bucketName'];
    const missingFields = requiredFields.filter(field => !config[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required configuration: ${missingFields.join(', ')}`);
    }
  }

  async upload(key, body, contentType) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    });

    try {
      console.log(`Uploading ${key} to bucket ${this.bucketName}...`);
      const result = await this.s3Client.send(command);
      console.log(`Successfully uploaded ${key}`);
      return result;
    } catch (error) {
      console.error(`Failed to upload ${key}:`, error);
      throw error;
    }
  }
}
