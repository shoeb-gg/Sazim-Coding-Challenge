import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    try {
      // Extract token from Authorization header
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedException('Authorization header not found');
      }

      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Invalid authorization header format');
      }

      // Verify the token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'Hogwarts business, very secret',
      });

      // Attach the user payload to the request object
      req.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
