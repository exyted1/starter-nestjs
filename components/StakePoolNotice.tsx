import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { contrastify } from 'common/colors'
import { defaultSecondaryColor } from 'helpers/mapping'
import { useStakePoolData } from 'hooks/useStakePoolData'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'
import { useEffect, useState } from 'react'

import { StakedTokens } from '@/components/token-staking/staked-tokens/StakedTokens'
import { UnstakedTokens } from '@/components/token-staking/unstaked-tokens/UnstakedTokens'

export const StakePoolNotice = () => {
  const wallet = useWallet()
  const walletModal = useWalletModal()
  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()
  const { data: stakePool, isFetched: stakePoolLoaded } = useStakePoolData()

  // Menambahkan state untuk mengontrol visibility content
  const [showContent, setShowContent] = useState(false);

  // Mengatur visibility content berdasarkan koneksi wallet
  useEffect(() => {
    if (wallet.connected) {
      setShowContent(true);
    } else {
      setShowContent(false);
    }
  }, [wallet.connected]);

  const handleConnectWalletClick = () => {
    walletModal.setVisible(true);
  };

  return (
    <>
      {(!stakePool && stakePoolLoaded) || stakePoolMetadata?.notFound ? (
        <div
          className="rounded-md border-[1px] bg-opacity-40 p-4 text-center text-lg font-semibold"
          style={{
            background:
              stakePoolMetadata?.colors?.secondary || defaultSecondaryColor,
            color: stakePoolMetadata?.colors?.fontColor,
            borderColor: contrastify(
              0.5,
              stakePoolMetadata?.colors?.secondary || defaultSecondaryColor
            ),
          }}
        >
          Stake pool not found
        </div>
      ) : (
        !wallet.connected && (
          <div
            className={`cursor-pointer rounded-md border-[1px] mvp p-4 text-center text-lg font-semibold ${
              stakePoolMetadata?.colors?.accent &&
              stakePoolMetadata?.colors.fontColor
                ? ''
                : 'border-yellow-500 bg-yellow-500 bg-opacity-40'
            }`}
            style={
              stakePoolMetadata?.colors?.accent &&
              stakePoolMetadata?.colors.fontColor
                ? {
                    background: stakePoolMetadata?.colors?.accent,
                    borderColor: stakePoolMetadata?.colors?.accent,
                    color:
                      stakePoolMetadata?.colors?.fontColorSecondary ||
                      stakePoolMetadata?.colors?.fontColor,
                  }
                : {}
            }
            onClick={handleConnectWalletClick}
          >
            Connect wallet to continue
          </div>
        )
      )}

      {showContent && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <UnstakedTokens />
          <StakedTokens />
        </div>
      )}
    </>
  )
}
