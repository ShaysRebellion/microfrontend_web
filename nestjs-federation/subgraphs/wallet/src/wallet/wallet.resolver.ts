import { Args, Query, Resolver } from '@nestjs/graphql';
import { WalletInfo, WalletInfoInput } from './wallet.model';
import { WalletService } from './wallet.service';

@Resolver(() => WalletInfo)
export class WalletResolver {
  constructor(private walletService: WalletService) {}

  @Query(() => WalletInfo)
  async getWalletInfo(
    @Args('walletInfoInput') walletInfoInput: WalletInfoInput,
  ): Promise<WalletInfo> {
    const { walletAddress } = walletInfoInput;
    return await this.walletService.getWalletInfo(walletAddress);
  }
}
