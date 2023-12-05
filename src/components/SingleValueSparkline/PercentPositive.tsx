/**
 * src/components/SingleValueSparkline/PercentPositive.tsx
 */
import React from 'react'
import { ArrowUpCircle } from 'react-feather'

export type PercentPositiveProps = {
  fontSize: string
  value: number
  decimals?: number
}

export function PercentPositive({
  fontSize,
  value,
  decimals = 2
}: PercentPositiveProps): JSX.Element {
  const GREEN = '#339933'
  const ARROW_DIM = '1.75em'
  const ARROW_FONT_SIZE = '0.75em'

  return (
    <>
      <div style={{ marginRight: '0.5em' }}>
        <ArrowUpCircle
          style={{
            fontSize: ARROW_FONT_SIZE,
            height: ARROW_DIM,
            width: ARROW_DIM,
            color: GREEN
          }}
        />
      </div>
      <div style={{ color: GREEN, fontSize }}>{`${value.toFixed(decimals)}%`}</div>
    </>
  )
}
