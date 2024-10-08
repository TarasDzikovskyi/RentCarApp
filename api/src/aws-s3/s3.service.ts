import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import {
    S3Client,
    PutObjectCommand,
    PutObjectCommandInput,
    PutObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express';


@Injectable()
export class S3Service {
    private logger = new Logger(S3Service.name);
    private region: string;
    private s3: S3Client;

    constructor(private configService: ConfigService) {
        this.region = configService.get<string>('AWS_S3_REGION') || 'eu-west-2';
        this.s3 = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
                secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY')
            }
        });
    }


    async uploadFile(file: Express.Multer.File, key: string): Promise<string> {
        const bucket = this.configService.get<string>('AWS_S3_BUCKET');
        const input: PutObjectCommandInput = {
            Body: file.buffer,
            Bucket: bucket,
            Key: key,
            ContentType: file.mimetype,
            ACL: 'public-read',
        };

        try {
            const response: PutObjectCommandOutput = await this.s3.send(
                new PutObjectCommand(input),
            );
            if (response.$metadata.httpStatusCode === 200) {
                return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
            } else throw new BadRequestException(`Image upload failed with status code: ${response.$metadata.httpStatusCode}`)
            throw new BadRequestException('Image not saved in s3!');
        } catch (err) {
            this.logger.error('Cannot save file to s3,', err);
            throw err;
        }
    }
}