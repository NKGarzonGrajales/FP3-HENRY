import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { PrismaService } from 'prisma/prisma.service';
import { FilesUploadModule } from 'src/files-upload/files-upload.module';
import { EmailModule } from 'src/email/email.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [FilesUploadModule, EmailModule, AuthModule],
  controllers: [PetsController],
  providers: [PetsService, PrismaService],
})
export class PetsModule {}
