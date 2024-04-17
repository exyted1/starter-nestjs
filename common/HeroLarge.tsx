import { css } from '@emotion/react'
import { useStakePoolId } from 'hooks/useStakePoolId'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

import { HeroStats } from '../components/hero-stats/HeroStats'
import { HeroStats0 } from '../components/hero-stats/HeroStats0'
import { HeroStats2 } from '../components/hero-stats/HeroStats2'

export const HeroLarge: React.FC = () => {
  const { data: stakePoolId } = useStakePoolId()
  const { data: config } = useStakePoolMetadataCtx()
  return (
    <div className="relative flex mvl flex-wrap items-stretch justify-center gap-2 py-2 lg:flex-nowrap lg:justify-between lg:gap-2">
      <div
        className="blur-4xl invisible absolute -right-20 top-72 -z-10 h-[100px] w-[550px] -rotate-[60deg] blur-[120px] md:visible lg:visible xl:visible"
        css={css`
          background-color: ${config?.colors?.accent};
        `}
      />
      <div
        className="blur-4xl invisible absolute -right-20 top-72 -z-10 h-[100px] w-[550px] -rotate-[60deg] blur-[120px] md:visible lg:visible xl:visible"
        css={css`
          background-color: ${config?.colors?.accent};
        `}
      />
      <HeroStats0 />
      <div className="flex w-full grow-[2] flex-col pt-4 ">
        <div className="mbx flex-col-gap-6">
          <div
            className="text-4xl text-light-0"
            style={{ color: config?.colors?.fontColor }}
          >
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full mx-auto lg:items-center lg:justify-between">
  <HeroStats />
</div>
<div className="flex flex-col lg:flex-row w-full mx-auto lg:items-center lg:justify-between">
<HeroStats2/>
      </div>
      </div>
    </div>
  )
}
