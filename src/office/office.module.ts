
import { Module, forwardRef } from '@nestjs/common';
import { OfficeController } from './office.controller';
import { Office } from 'src/models/office.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeServices } from 'src/services/office.service';
import { StaffModule } from 'src/staff/staff.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([Office]),
    forwardRef(()=>StaffModule),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [OfficeController],
  providers: [OfficeServices],
  exports: [OfficeServices],
})
export class OfficeModule {

}

