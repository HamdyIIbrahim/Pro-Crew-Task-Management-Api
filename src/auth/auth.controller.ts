import {
  Body,
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, FileDto, LoginDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { upload } from 'src/shared/cloudinary';
import { MongoExceptionFilter } from 'src/shared/errorHandler';

@Controller('auth')
@UseFilters(MongoExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: upload.storage,
      fileFilter: upload.fileFilter,
    }),
  )
  signup(@Body() dto: AuthDto, @UploadedFile() fileDto: Partial<FileDto>) {
    return this.authService.signup(dto, fileDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
