import { useRewardDistributorData } from 'hooks/useRewardDistributorData'
import { useStakePoolEntries } from 'hooks/useStakePoolEntries'
import { useStakePoolMaxStaked } from 'hooks/useStakePoolMaxStaked'
import { useStakePoolTotalStaked } from 'hooks/useStakePoolTotalStaked'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

export const HeroStats0: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const rewardDistributorData = useRewardDistributorData()
  const stakePoolEntries = useStakePoolEntries()
  const { data: maxStaked } = useStakePoolMaxStaked()
  const totalStaked = useStakePoolTotalStaked()
  const { data: config } = useStakePoolMetadataCtx()
  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()

  return (
    <div
      className={`flex-container ${
        stakePoolMetadata?.colors?.fontColor ? '' : 'text-gray-200'
      } justify-evenly bg-white bg-opacity-5 ${className}`}
      style={{
        background: stakePoolMetadata?.colors?.backgroundSecondary,
        border: stakePoolMetadata?.colors?.backgroundSecondary
          ? `2px solid ${stakePoolMetadata?.colors?.backgroundSecondary}`
          : '',
      }}
    >
      <div className="flex-item">
        <img
          className={`img-container ${
            config?.logoPadding && 'p-1'
          }`}
          src={config?.imageUrl}
          alt={config?.displayName}
        />
        <p className="text-1 md:text-1 lg:text-base imagine3">
          STAKE YOUR NFT TO GET $MINK
        </p>
      </div>
    </div>
  )
}
