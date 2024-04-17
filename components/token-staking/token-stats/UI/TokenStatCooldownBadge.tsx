import type { StakeEntryTokenData } from 'hooks/useStakedTokenDatas'
import { useStakePoolData } from 'hooks/useStakePoolData'




export interface TokenStatCooldownBadgeProps {
  tokenData: StakeEntryTokenData
  className?: string
}

export const TokenStatCooldownBadge = ({
  className,
  tokenData,
}: TokenStatCooldownBadgeProps) => {
  const { data: stakePool } = useStakePoolData()

  return (
    <>
    </>
  )
}
