import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// 설정이 안맞음
// (cookie-session은 CommonJS 모듈 시스템을 사용하기 때문에 import 대신 require를 사용해야 함)
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['asdfasdf'], // 실제론 env 파일에서 가져오기
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      // 유효하지 않은 프로퍼티는 자동으로 무시하고 http 요청을 처리
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
