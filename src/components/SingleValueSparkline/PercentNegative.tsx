/**
 * src/components/SingleValueSparkline/PercentNegative.tsx
 */
import React from 'react'
import { ArrowDownCircle } from 'react-feather'

export type PercentNegativeProps = {
  fontSize: string
  value: number
  decimals?: number
}

export function PercentNegative({
  fontSize,
  value,
  decimals = 2
}: PercentNegativeProps): JSX.Element {
  const RED = '#cb292b'
  const ARROW_DIM = '1.75em'
  const ARROW_FONT_SIZE = '0.75em'

  return (
    <>
      <div style={{ marginRight: '0.5em' }}>
        <ArrowDownCircle
          style={{
            fontSize: ARROW_FONT_SIZE,
            height: ARROW_DIM,
            width: ARROW_DIM,
            color: RED
          }}
        />
      </div>
      <div style={{ color: RED, fontSize }}>{`${value.toFixed(decimals)}%`}</div>
    </>
  )
}
