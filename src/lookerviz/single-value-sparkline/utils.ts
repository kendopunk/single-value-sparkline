/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * src/lookerviz/single-value-sparkline/utils.ts
 * Utility functions
 */
import { VisQueryResponse, VisualizationDefinitionExtended } from '../../types/looker'

export type TargetColumn = {
  label: string
  name: string
}

export function getDefaultTitle(queryResults: VisQueryResponse): string {
  const [firstNumericDimension] = (queryResults?.fields?.dimensions ?? []).filter(
    (f) => f.type === 'number'
  )
  const [firstMeasure] = queryResults?.fields?.measures ?? []

  // use measure or dimension
  let fieldToUse = firstMeasure
  if (!firstMeasure) {
    fieldToUse = firstNumericDimension
  }

  return fieldToUse?.label ?? ''
}

/**
 * get information on measures and/or numeric dimensions
 * @param queryResults
 * @returns
 */
export function getTargetColumns(queryResults: VisQueryResponse): TargetColumn[] {
  const measures = (queryResults?.fields?.measures ?? []).map((m) => {
    return {
      label: m?.label,
      name: m?.name
    }
  })

  const numericDimensions = (queryResults?.fields?.dimensions ?? [])
    .filter((f) => f.type === 'number')
    .map((m) => {
      return {
        label: m?.label,
        name: m?.name
      }
    })

  return [...measures, ...numericDimensions]
}

export function handleErrors(
  vis: VisualizationDefinitionExtended,
  resp: VisQueryResponse
): boolean {
  /**
   * no data
   */
  if (!resp?.data || (resp?.data || []).length === 0) {
    if (vis.addError) {
      vis.addError({
        title: 'No results',
        message: 'No results returned by query.'
      })
    }
    return true
  }

  /**
   * dimensions and measures
   */
  const dim = resp?.fields?.dimensions || []
  const meas = resp?.fields?.measures || []
  const dimNumber = dim.filter((f: any) => f.type === 'number')

  /**
   * error checks
   */
  if (dimNumber.length < 1 && meas.length < 1) {
    if (vis.addError) {
      vis.addError({
        title: 'Dimension or Measure',
        message: 'At least one measure or one numeric dimension is required'
      })
      return true
    }
  }

  if ((resp?.data || []).length <= 1) {
    if (vis.addError) {
      vis.addError({
        title: 'Invalid Data',
        message: '2 or more data rows required for visualization'
      })
      return true
    }
  }

  // all good
  return false
}
