import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constant';
import { TimeKeepingModule } from './timekeeping/timekeeping.module';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [
    UserModule,
    TimeKeepingModule,
    StaffModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'PDGIAU-PC',
      port: 1433,
      username: 'sa',
      password: '@pdg1234567',
      database: 'nestjs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      }

    }),
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
