import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, FileDto, LoginDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { upload } from 'src/shared/cloudinary';

@Controller('auth')
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
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
