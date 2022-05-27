import { Module } from '@nestjs/common';
import { LowdbService } from './lowdb.service';

@Module({
	imports: [],
	controllers: [],
	providers: [LowdbService],
	exports: [LowdbService],
})
export class LowdbModule {}
