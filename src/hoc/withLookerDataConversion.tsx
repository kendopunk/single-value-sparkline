/**
 * src/hoc/withLookerDataConverstion.tsx
 * Convert Looker query data to format consumable by chart in question
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { WithChartDataProps } from '../types/chart'
import { VisQueryResponse } from '../types/looker'
import toSingleValueSparkline from './toSingleValueSparkline'

export default function withLookerDataConversion<T extends WithChartDataProps>(
  Component: React.ComponentType<T>,
  queryResults: VisQueryResponse,
  conversionType: 'htmlTable' | 'singleValueSparkline',
  options?: { [key: string]: any }
) {
  let formattedChartData: any = []

  // Try to create a nice displayName for React Dev Tools.
  const displayName = Component.displayName || Component.name || 'Component'

  /**
   * Runtime data transformation between Looker results and various chart formats
   */
  if (conversionType === 'singleValueSparkline') {
    formattedChartData = toSingleValueSparkline(
      queryResults,
      options?.defaultTargetColumn,
      options?.percentCalculation
    )
  }

  /**
   * with chartData prop
   */
  const ComponentWithChartData = (props: Omit<WithChartDataProps, 'chartData'>) => {
    return <Component {...(props as T)} chartData={formattedChartData} />
  }

  ComponentWithChartData.displayName = `withLookerDataConversion(${displayName})`

  /**
   * without chartData prop, like the single value spark line which is special
   * override props need to come last
   */
  const ComponentWithoutChartData = (props: any) => {
    return <Component {...formattedChartData} {...(props as T)} />
  }

  ComponentWithoutChartData.displayName = `withLookerDataConversion(${displayName})`

  if (conversionType === 'singleValueSparkline') {
    return ComponentWithoutChartData
  }

  return ComponentWithChartData
}
