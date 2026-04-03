import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryConfig {
    private readonly logger = new Logger(CloudinaryConfig.name);

    constructor(private configService: ConfigService) {
        const cloudName = this.configService.get('CLOUDINARY_CLOUD_NAME');
        const apiKey = this.configService.get('CLOUDINARY_API_KEY');
        const apiSecret = this.configService.get('CLOUDINARY_API_SECRET');

        if (!cloudName || !apiKey || !apiSecret) {
            this.logger.error('Missing Cloudinary configuration variables. Check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.');
        } else {
            this.logger.log('Cloudinary configuration initialized.');
        }

        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret,
        });
    }

    getCloudinary() {
        return cloudinary;
    }
}
