/**
 * src/components/SingleValueSparkline/PercentValue.tsx
 * An extracted presentation component for the Single Value Sparkline
 */
import React from 'react'
import { PercentNegative } from './PercentNegative'
import { PercentZero } from './PercentZero'
import { PercentPositive } from './PercentPositive'

export type PercentValueProps = {
  fontSize: string
  value: number
  decimals?: number
}

export function PercentValue({ fontSize, value, decimals = 2 }: PercentValueProps): JSX.Element {
  if (value === 0) {
    return <PercentZero decimals={decimals} fontSize={fontSize} />
  } else if (value < 0) {
    return <PercentNegative value={value} decimals={decimals} fontSize={fontSize} />
  } else {
    return <PercentPositive value={value} decimals={decimals} fontSize={fontSize} />
  }
}
