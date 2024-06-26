import { getActiveStakeEntriesForPool } from '@cardinal/staking/dist/cjs/programs/stakePool/accounts'
import type { IdlAccountData } from '@manaform/rewards-center'
import { rewardsCenterProgram } from '@manaform/rewards-center'
import type { Connection } from '@solana/web3.js'
import { PublicKey } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { stakeEntryDataToV2 } from 'helpers/fetchStakeEntry'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'

import { TOKEN_DATAS_KEY } from './useAllowedTokenDatas'
import { isStakePoolV2, useStakePoolData } from './useStakePoolData'

export const useStakePoolEntries = () => {
  const { secondaryConnection } = useEnvironmentCtx()
  const { data: stakePoolData } = useStakePoolData()
  return useQuery<
    Pick<IdlAccountData<'stakeEntry'>, 'pubkey' | 'parsed'>[] | undefined
  >(
    [TOKEN_DATAS_KEY, 'useStakePoolEntries', stakePoolData?.pubkey?.toString()],
    async () => {
      if (stakePoolData?.pubkey && stakePoolData?.parsed) {
        if (isStakePoolV2(stakePoolData.parsed)) {
          return getActiveStakePoolEntriesV2(secondaryConnection, stakePoolData)
        } else {
          return (
            await getActiveStakeEntriesForPool(
              secondaryConnection,
              stakePoolData?.pubkey
            )
          ).map((entry) => {
            return {
              pubkey: entry.pubkey,
              parsed: stakeEntryDataToV2(entry.parsed),
            }
          })
        }
      }
    },
    { enabled: !!stakePoolData?.pubkey }
  )
}

export const getActiveStakePoolEntriesV2 = async (
  connection: Connection,
  stakePoolData: Pick<IdlAccountData<'stakePool'>, 'pubkey' | 'parsed'>
): Promise<Pick<IdlAccountData<'stakeEntry'>, 'pubkey' | 'parsed'>[]> => {
  const program = rewardsCenterProgram(connection)
  const stakeEntries = await program.account.stakeEntry.all([
    {
      memcmp: {
        offset: 10,
        bytes: stakePoolData.pubkey.toString(),
      },
    },
  ])
  return stakeEntries
    .filter(
      (entry) =>
        entry.account.lastStaker.toString() !== PublicKey.default.toString()
    )
    .map((e) => {
      return { pubkey: e.publicKey, parsed: e.account }
    })
}
