import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//This file handle the local strategy. The basic authentication using username and password. Passport makes it for us
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
