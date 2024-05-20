import classNames from 'classnames'
import type { AllowedTokenData } from 'hooks/useAllowedTokenDatas'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

export interface TokenWrapperProps {
  select: (tokenData: any) => void
  selected: boolean
  children: React.ReactNode
  token: AllowedTokenData
}

export const TokenWrapper = ({
  token,
  children,
  selected,
  select,
}: TokenWrapperProps) => {
  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()

  return (
    <div
      className={classNames([
        'relative flex cursor-pointer w-[26vh] flex-col rounded-2xl border-4 aspal flux',
        {
          'border-violet-500 shadow-lg':
            selected && !stakePoolMetadata?.colors?.secondary,
          'border-sky-500 shadow-lg': !selected,
        },
      ])}
      onClick={() => select(token)}
      style={{
        borderColor: selected ? stakePoolMetadata?.colors?.secondary : '',
        boxShadow: selected
          ? `0px 0px 20px ${stakePoolMetadata?.colors?.secondary || '#FFFFFF'}`
          : '',
      }}
    >
      {children}
    </div>
  )
}
