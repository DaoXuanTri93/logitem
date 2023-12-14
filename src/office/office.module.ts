import { Module } from '@nestjs/common';
import { OfficeController } from './office.controller';
import { Office } from 'src/models/office.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeService } from 'src/services/office.service';
import { StaffModule } from 'src/staff/staff.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([Office]),
    StaffModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [OfficeController],
  providers: [OfficeService],
  exports: [OfficeService],
})
export class OfficeModule {

}
