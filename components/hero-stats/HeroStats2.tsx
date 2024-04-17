import { BN } from '@coral-xyz/anchor'
import { useRewardDistributorData } from 'hooks/useRewardDistributorData'
import { useStakePoolEntries } from 'hooks/useStakePoolEntries'
import { useStakePoolMaxStaked } from 'hooks/useStakePoolMaxStaked'
import { useStakePoolTotalStaked } from 'hooks/useStakePoolTotalStaked'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

import { RewardsRate } from '@/components/hero-stats/RewardsRate'
import { TreasuryBalance } from '@/components/hero-stats/TreasuryBalance'

export const HeroStats2: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const rewardDistributorData = useRewardDistributorData()
  const stakePoolEntries = useStakePoolEntries()
  const { data: maxStaked } = useStakePoolMaxStaked()
  const totalStaked = useStakePoolTotalStaked()
  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()

  return (
    <div
      className={`frontm2 flex w-full flex-col flex-wrap gap-y-5 rounded-xl px-12 py-6 md:flex-row ${
        stakePoolMetadata?.colors?.fontColor ? '' : 'text-gray-200'
      } justify-evenly bg-white bg-opacity-5 ${className}`}
      style={{
        background: stakePoolMetadata?.colors?.backgroundSecondary,
        border: stakePoolMetadata?.colors?.backgroundSecondary
          ? `2px solid ${stakePoolMetadata?.colors?.backgroundSecondary}`
          : '',
      }}
    >
      {rewardDistributorData.data && (
        <>
          <div className="flex flex-1 flex-col items-center justify-center">
            <p
              className="text-lg color-medium-4 imagine"
              style={{ color: stakePoolMetadata?.colors?.fontColorTertiary }}
            >
              {rewardDistributorData.data.parsed?.maxRewardSecondsReceived?.eq(
                new BN(1)
              )
                ? '1x Claim'
                : 'Daily Rewards / NFT'}
            </p>
            <RewardsRate />
            <TreasuryBalance />
          </div>
        </>
      )}
    </div>
  )
}
