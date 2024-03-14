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
import { MissionModule } from './mission/mission.module';
import { OfficeModule } from './office/office.module';

import { EnterDistanceModule } from './EnterDistance/enterDistance.module';
import { StampApprovalModule } from './stampApproval/stampApproval.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UserModule,
    TimeKeepingModule,
    StaffModule,
    MissionModule,
    EnterDistanceModule,
    StampApprovalModule,
    OfficeModule,
    StaffModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.HOST_DB,
      port: Number(process.env.PORT_DB),
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE_DB,
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
    })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
   
  }
}
