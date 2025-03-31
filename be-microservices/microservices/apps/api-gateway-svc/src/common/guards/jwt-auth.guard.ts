import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const path = request.url.split('?')[0];
    
    // const publicPaths = [
    //   '/api/user/register',
    //   '/api/user/login',
    //   '/api/user/forgot-password',
    //   '/api/user/reset-password',
    //   '/api/user/otps/verify-otp',
    //   '/api/user/otps/resend-otp',
    //   '/api/user/google-login',
    // ];
    // if (publicPaths.includes(path)) {
    //   console.log('[JwtAuthGuard] Bypassing auth for public route');
    //   return true;
    // }

    console.log('[JwtAuthGuard] Auth guard activated for route:', path);
    return super.canActivate(context);
  }
}
