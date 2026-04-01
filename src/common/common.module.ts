import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './services/mail.service';
import { CloudinaryService } from './services/cloudinary.service';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [MailService, CloudinaryService],
    exports: [MailService, CloudinaryService],
})
export class CommonModule { }
