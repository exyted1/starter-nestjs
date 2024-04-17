import { contrastify } from 'common/colors'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'
import { useRef } from 'react'

interface TokenListWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  setPageNum: React.Dispatch<React.SetStateAction<[number, number]>>
}

export const TokenListWrapper2 = ({
  children,
  setPageNum,
}: TokenListWrapperProps) => {
  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()
  const ref = useRef<HTMLDivElement | null>(null)

  const handlePaging = () => {
    if (!ref.current) return

    const { scrollTop, scrollHeight, clientHeight } = ref.current

    if (scrollHeight - scrollTop <= clientHeight * 1.1) {
      setPageNum(([n, prevScrollHeight]) => {
        return prevScrollHeight !== scrollHeight
          ? [n + 1, scrollHeight]
          : [n, prevScrollHeight]
      })
    }
  }

  return (
    <div
      className="token-list-wrapper2"
      style={{
        background:
          stakePoolMetadata?.colors?.backgroundSecondary &&
          contrastify(0.05, stakePoolMetadata?.colors?.backgroundSecondary),
      }}
      ref={ref}
      onScroll={handlePaging}
    >
      {children}
    </div>
  )
}
