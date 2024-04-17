import { Tooltip } from 'common/Tooltip'
import { useStakePoolData } from 'hooks/useStakePoolData'

export const StakePoolConfig: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const { data: stakePool } = useStakePoolData()
  return (
    <div className={`flex flex-row gap-8 text-lg ${className}`}>
      {!!stakePool?.parsed?.endDate &&
        stakePool?.parsed.endDate.toNumber() !== 0 && (
          <Tooltip
            title={`Pool will no longer accept staked tokens after this date`}
          >
            <div className="flex cursor-pointer flex-row items-center justify-center gap-2">
            </div>
          </Tooltip>
        )}
      {!!stakePool?.parsed?.cooldownSeconds &&
        stakePool?.parsed.cooldownSeconds !== 0 && (
          <Tooltip
            title={`Unstaking tokens will initiate a cooldown period until they can be fully unstaked`}
          >
            <div className="flex cursor-pointer flex-row items-center justify-center gap-2">
            </div>
          </Tooltip>
        )}
      {!!stakePool?.parsed?.minStakeSeconds &&
        stakePool?.parsed.minStakeSeconds !== 0 && (
          <Tooltip
            title={`Tokens must be staked for this minimum duration before unstaking or claiming rewards`}
          >
            <div className="flex cursor-pointer flex-row items-center justify-center gap-2">
            </div>
          </Tooltip>
        )}
    </div>
  )
}
