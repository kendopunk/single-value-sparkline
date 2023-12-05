/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * src/hoc/toSingleValueSparkline.ts
 * Convert Looker query results to format for <SingleValueSparkline>
 */
import { SingleValueSparklineProps } from '../components/SingleValueSparkline'
import { VisQueryResponse } from '../types/looker'

export default function toSingleValueSparkline(
  queryResults: VisQueryResponse,
  targetColumn: string | undefined,
  percentCalculation: string | undefined
): SingleValueSparklineProps {
  // mutable vars
  let fieldName = ''
  let rawValue = ''
  let title = 'Result'
  let percentRaw = 0

  const [firstNumericDimension] = (queryResults?.fields?.dimensions ?? []).filter(
    (f) => f.type === 'number'
  )
  const [firstMeasure] = queryResults?.fields?.measures ?? []
  const [firstRecord, secondRecord] = queryResults?.data ?? []
  const [lastRecord] = (queryResults?.data ?? []).slice(-1)
  const data = queryResults?.data ?? []

  // use measure or dimension or specific target column
  let fieldToUse
  if (targetColumn) {
    const match = [
      ...(queryResults?.fields?.dimensions ?? []),
      ...(queryResults?.fields?.measures ?? [])
    ].filter((f) => {
      return f.name === targetColumn
    })
    fieldToUse = match[0]
  } else {
    fieldToUse = firstMeasure
    if (!firstMeasure) {
      fieldToUse = firstNumericDimension
    }
  }

  // adjust mutable variables
  fieldName = fieldToUse?.name
  rawValue = firstRecord[fieldName]?.value
  if (fieldToUse?.label) {
    title = fieldToUse.label
  }

  // calculate sparkline data
  const temp = data.map((m: any, i: number) => {
    return {
      index: i,
      y: m[fieldName]?.value
    }
  })

  temp.sort((a: any, b: any) => b.index - a.index)

  const sparklineData = temp.map((m: any, i: number) => {
    return {
      x: i,
      y: m.y
    }
  })

  // calculating the mean
  let meanValue: number | undefined = undefined
  const meanValueArray = (queryResults?.data ?? [])
    .map((m: any) => {
      return m[fieldName]
    })
    .map((m: any) => m.value)
    .filter((f) => f)
  if (meanValueArray.length) {
    meanValue = meanValueArray.reduce((a: number, b: number) => a + b) / meanValueArray.length
  }

  // prep
  let firstValue = 0
  let secondValue = 0
  let lastValue = 0
  if (firstRecord) {
    firstValue = firstRecord[fieldName]?.value ?? 0
  }
  if (secondRecord) {
    secondValue = secondRecord[fieldName]?.value ?? 0
  }
  if (lastRecord) [(lastValue = lastRecord[fieldName]?.value ?? 0)]

  // calculating percent change
  if (firstValue && firstValue !== 0) {
    if (percentCalculation === 'lastfirst' && lastValue) {
      percentRaw = ((firstValue - lastValue) / Math.abs(lastValue)) * 100
    } else if (percentCalculation === 'meanfirst' && meanValue) {
      percentRaw = ((firstValue - meanValue) / Math.abs(meanValue)) * 100
    }
    if (percentCalculation === 'secondfirst' && secondValue) {
      percentRaw = ((firstValue - secondValue) / Math.abs(secondValue)) * 100
    }
  }

  return {
    percentDecimals: 2,
    percentRaw,
    rawValue,
    sparklineData,
    sparklineColor: '#000000',
    title
  }
}
