import { ButtonSmall } from 'common/ButtonSmall'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

export const StakePoolImage = ({ onClick }: { onClick?: () => void }) => {
  const { data: config } = useStakePoolMetadataCtx()
  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()
  return config?.imageUrl ? (
    <div className={`relative flex w-2/6 grow items-center justify-center rounded-xl ${
      stakePoolMetadata?.colors?.fontColor ? '' : 'text-gray-200'
    } justify-evenly bg-white bg-opacity-5 $`}
    style={{
      background: stakePoolMetadata?.colors?.backgroundSecondary,
      border: stakePoolMetadata?.colors?.accent
        ? `2px solid ${stakePoolMetadata?.colors?.accent}`
        : '',
    }}>
      <img
        className={`max-h-[400px] w-auto rounded-xl ${
          config?.logoPadding && 'p-1'
        }`}
        src={config?.imageUrl}
        alt={config?.displayName}
      />
    </div>
  ) : (
    <div className="flex min-h-[200px] w-full items-center justify-center rounded-xl bg-white bg-opacity-5 md:w-1/4 md:grow">
      <ButtonSmall onClick={onClick}>Add image</ButtonSmall>
    </div>
  )
}
