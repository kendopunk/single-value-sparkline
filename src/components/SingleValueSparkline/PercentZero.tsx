/**
 * src/components/SingleValueSparkline/PercentZero.tsx
 */
import React from 'react'

export type PercentZeroProps = {
  decimals?: number
  fontSize: string
}

export function PercentZero({ decimals = 2, fontSize }: PercentZeroProps): JSX.Element {
  const V = 0

  return <div style={{ fontSize }}>{`${V.toFixed(decimals)}%`}</div>
}
