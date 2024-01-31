import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './schemas/user.providers';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy';

@Module({
  imports: [DatabaseModule, JwtModule.register({})],
  providers: [AuthService, ...usersProviders, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
