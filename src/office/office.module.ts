import { Module } from '@nestjs/common';
import { OfficeController } from './office.controller';
import { Office } from 'src/models/office.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeService } from 'src/services/office.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Office])
  ],
  controllers: [OfficeController],
  providers: [OfficeService],
  exports: [OfficeService],
})
export class OfficeModule {

}
