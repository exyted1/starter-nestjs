import {
  getImageFromTokenData,
  getNameFromTokenData,
} from 'common/tokenDataUtils'
import type { AllowedTokenData } from 'hooks/useAllowedTokenDatas'
import { useMintJson } from 'hooks/useMintJson'

export interface TokenImageProps {
  token: AllowedTokenData
}

export const TokenImage = ({ token }: TokenImageProps) => {
  const mintMetadata = useMintJson(token)
  return (
    <>
      {mintMetadata.isFetched &&
      getImageFromTokenData(token, mintMetadata.data) ? (
        <>
          <img
            loading="lazy"
            className={`absolute-content`}
            src={getImageFromTokenData(token, mintMetadata?.data)}
            alt={getNameFromTokenData(token, mintMetadata?.data)}
          />
          <div className="absolute-content2" />
        </>
      ) : (
        <div
          className={`w-full grow animate-pulse rounded-t-xl bg-white bg-opacity-5 `}
        />
      )}
    </>
  )
}
