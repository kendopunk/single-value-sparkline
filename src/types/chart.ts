/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * src/types/chart.ts
 * Chart typings for use across D3, Highcharts, etc. and in the context
 * of HOCs
 */

/**
 * e.g., bar chart etc...simple name/value object
 */
export type GenericNameValueElement = {
  name: string | number
  value: number
  [key: string]: any
}

export type GenericNameValueData = GenericNameValueElement[]

/**
 * Generic X/Y data
 */
export type GenericXYValueElement = {
  x: string | number
  y: number
  [key: string]: any
}

export type GenericXYValueData = GenericXYValueElement[]

/**
 * tabular data, generic
 */
export type GenericTabularDataHeaderElement = {
  fieldName: string
  display: string
  [key: string]: any
}

export type GenericTabularDataRowElement = {
  value: string | number | null
  rendered?: string
  [key: string]: unknown
}

export type GenericTabularData = {
  headers: GenericTabularDataHeaderElement[]
  rows: GenericTabularDataRowElement[][]
}

export type SingleValueSparklineData = {
  percentRaw?: number | null | undefined
  rawValue: string | number
  title?: string
}

/**
 * Generic chartData typing
 */
export type WithChartDataProps = {
  chartData?: any
  [key: string]: any
}
