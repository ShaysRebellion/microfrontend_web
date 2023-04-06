import { Module } from '@nestjs/common';
import { WalletResolver } from './wallet.resolver';
import { WalletService } from './wallet.service';

@Module({
  imports: [],
  providers: [WalletResolver, WalletService],
})
export class WalletModule {}
