import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { User } from './schemas/user.schema';
import { AuthDto, FileDto, LoginDto } from './dto';
import * as bcryptjs from 'bcryptjs';
import { setFetchFormatToAuto } from 'src/shared/cloudinary';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL') private userModel: Model<User>,
    private jwt: JwtService,
  ) {}
  async signup(dto: AuthDto, fileDto: Partial<FileDto>) {
    let image: string | undefined;
    if (fileDto) {
      let imagesArr = [fileDto?.path];
      [image] = setFetchFormatToAuto(imagesArr);
    }
    const hashedPassword = bcryptjs.hashSync(dto.password, 12);
    const newUser = new this.userModel({
      name: dto.name,
      email: dto.email,
      photo: image,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({
      email: dto.email,
    });
    if (!user) {
      throw new ForbiddenException('Invalid email or password');
    }

    const pwMatch = bcryptjs.compareSync(dto.password, user.password);

    if (!pwMatch) {
      throw new ForbiddenException('Invalid email or password');
    }
    const token = await this.generateToken(user._id, user.email);
    return {
      name: user.name,
      photo: user.photo,
      token,
    };
  }

  async generateToken(id: ObjectId, email: string): Promise<string> {
    const payload = {
      id: id,
      email: email,
    };
    const secret = process.env.JWT_SECRETKEY;

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '8h',
      secret: secret,
    });

    return token;
  }
}
