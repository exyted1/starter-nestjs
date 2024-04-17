import { contrastify } from '@cardinal/common'
import type { Interpolation, Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'

import { Tooltip } from './Tooltip'

type Option<T> = {
  label: string | React.ReactNode
  value: T
  tooltip?: string
  disabled?: boolean
}

type Props<T> = {
  colors?: {
    background?: string
    color?: string
  }
  outerCss?: Interpolation<Theme>
  placeholder?: string
  value?: Option<T>
  options: Option<T>[]
  defaultOption?: Option<T>
  onChange?: (arg: Option<T>) => void
}

export const TabSelector = <T,>({
  defaultOption,
  value,
  onChange,
  options = [],
  colors,
}: Props<T>) => {
  const [internalValue, setInternalValue] = useState<Option<T> | undefined>(
    defaultOption
  )

  useEffect(() => {
    value?.label &&
      value?.label !== internalValue?.label &&
      setInternalValue(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.label])

  return (
    <div
      className="flex flex-wrap rounded-lg"
    >
      {options.map((o, i) => (
        <Tooltip key={i} title={o.tooltip || ''}>
          <div
            className={`flex items-center justify-between rounded-lg mnm py-2 text-lg color-medium-5 transition-colors smile mvj ${
              o.disabled
                ? 'cursor-default opacity-25 '
                : 'cursor-pointer hover:text-primary'
            } ${internalValue?.value === o.value ? 'bg-dark-6' : ''}`}
            css={css`
              color: ${colors?.background &&
              contrastify(1, colors?.background)} ;
              background: ${internalValue?.value === o.value
                ? colors?.background && contrastify(0.1, colors?.background)
                : colors?.background} !important;
              &:hover {
                color: ${colors?.color} !important;
              }
            `}
            onClick={() => {
              if (o.disabled) return
              setInternalValue(o)
              onChange && onChange(o)
            }}
          >
            <div>{o.label}</div>
          </div>
        </Tooltip>
      ))}
    </div>
  )
}
