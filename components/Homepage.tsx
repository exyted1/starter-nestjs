import { Banner } from 'common/Banner'
import { FooterSlim } from 'common/FooterSlim'
import { useAllStakePools } from 'hooks/useAllStakePools'
import Head from 'next/head'

import { CollectionsView } from './CollectionsView'
import { MainHero } from './MainHero'

function Homepage() {
  const allStakePools = useAllStakePools()

  return (
    <div className="bg-dark-5">
      <Head>
        <title>MinkSpace - NFT Staking</title>
        <meta name="title" content="NFT Staking on Solana" />
        <meta
          name="description"
          content="Launch staking for your NFT collection on Solana with reward distribution"
        />
        <link rel="icon" href={'/favicon.ico'} />
      </Head>
      <Banner />
      <MainHero />
      <div className="mx-auto flex flex-col gap-16 px-8 md:px-16">
        <CollectionsView
          configs={allStakePools.data?.stakePoolsWithMetadata.filter(
            (pool) =>
              !(
                pool.stakePoolMetadata?.hidden ||
                pool.stakePoolMetadata?.notFound
              )
          )}
        />
        <CollectionsView
          configs={allStakePools.data?.stakePoolsWithoutMetadata}
        />
      </div>
      <FooterSlim />
    </div>
  )
}

export default Homepage
