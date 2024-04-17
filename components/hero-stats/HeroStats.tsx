import { useRewardDistributorData } from 'hooks/useRewardDistributorData'
import { useStakePoolEntries } from 'hooks/useStakePoolEntries'
import { useStakePoolMaxStaked } from 'hooks/useStakePoolMaxStaked'
import { useStakePoolTotalStaked } from 'hooks/useStakePoolTotalStaked'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'


export const HeroStats: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const rewardDistributorData = useRewardDistributorData()
  const stakePoolEntries = useStakePoolEntries()
  const { data: maxStaked } = useStakePoolMaxStaked()
  const totalStaked = useStakePoolTotalStaked()
  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()

  return (
    <div
      className={`mb-1 flex w-full flex-col flex-wrap gap-y-5 rounded-xl px-12 py-6 md:flex-row ${
        stakePoolMetadata?.colors?.fontColor ? '' : 'text-gray-200'
      } justify-evenly bg-white bg-opacity-5 ${className}`}
      style={{
        background: stakePoolMetadata?.colors?.backgroundSecondary,
        border: stakePoolMetadata?.colors?.backgroundSecondary
          ? `2px solid ${stakePoolMetadata?.colors?.backgroundSecondary}`
          : '',
      }}
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <div
          className="text-lg color-medium-4 imagine"
          style={{ color: stakePoolMetadata?.colors?.fontColorTertiary }}
        >
          NFTs staked
        </div>
        {!totalStaked.isFetched ? (
          <div className="h-6 w-10 animate-pulse rounded-md bg-border"></div>
        ) : (
          <div
            className="text-center text-xl text-light-1"
            style={{ color: stakePoolMetadata?.colors?.fontColor }}
          >
            {totalStaked.data?.toLocaleString()}{' '}
            {stakePoolMetadata?.maxStaked
              ? `/ ${Number(stakePoolMetadata?.maxStaked).toLocaleString()}`
              : '/'}
          </div>
        )}
        {stakePoolEntries.data?.length &&
                  Math.floor(
                    ((stakePoolEntries.data?.length * 100) / (maxStaked ?? 0)) *
                      10000
                  ) / 10000}
                % of the total NFT
      </div>
    </div>
  )
}
