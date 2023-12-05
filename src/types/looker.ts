/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */

/**
 * Typings to assist with Looker data and not really available in the Looker SDK
 */
export interface Looker {
  plugins: {
    visualizations: {
      add: (visualization: VisualizationDefinition) => void
    }
  }
}

export interface LookerChartUtils {
  Utils: {
    openDrillMenu: (options: { links: Cell | Link[]; event: Record<string, unknown> }) => void
    openUrl: (url: string, event: Record<string, unknown>) => void
    textForCell: (cell: Cell) => string
    filterableValueForCell: (cell: Cell) => string
    htmlForCell: (
      cell: Cell,
      context?: string,
      fieldDefinitionForCell?: any,
      customHtml?: string
    ) => string
  }
}

/**
 * visualization definition
 */
export interface VisualizationDefinition {
  id?: string
  label?: string
  options: VisOptions
  addError?: (error: VisualizationError) => void
  clearErrors?: (errorName?: string) => void
  create: (element: HTMLElement, settings: VisConfig) => void
  // trigger?: (event: string, config: Record<string, unknown>[]) => void
  trigger?: (event: string, config: any) => void
  update?: (
    data: VisData,
    element: HTMLElement,
    config: VisConfig,
    queryResponse: VisQueryResponse,
    details?: VisUpdateDetails
  ) => void
  updateAsync?: (
    data: VisData,
    element: HTMLElement,
    config: VisConfig,
    queryResponse: VisQueryResponse,
    details: VisUpdateDetails | undefined,
    updateComplete: () => void
  ) => void
  destroy?: () => void
}

export type VisualizationDefinitionExtended = VisualizationDefinition & {
  chart?: any
  _textElement?: any
}

export interface VisOptions {
  [optionName: string]: VisOption
}

export interface VisOptionValue {
  [label: string]: string
}

export interface VisQueryResponse {
  [key: string]: any
  data: VisData
  fields: {
    [key: string]: any[]
  }
  pivots?: Pivot[]
}

export interface Pivot {
  key: string
  is_total: boolean
  data: { [key: string]: string }
  metadata: { [key: string]: { [key: string]: string } }
}

export interface Link {
  label?: string
  type?: string
  type_label?: any
  url?: string
  [key: string]: any
}

export interface Cell {
  value: any
  rendered?: string
  html?: string
  links?: Link[]
  [key: string]: any
}

export interface FilterData {
  add: string
  field: string
  rendered: string
}

export interface PivotCell {
  [pivotKey: string]: Cell
}

export interface Row {
  [fieldName: string]: PivotCell | Cell
}

export type VisData = Row[]

export interface VisConfig {
  [key: string]: VisConfigValue
}

export type VisConfigValue = any

export interface VisUpdateDetails {
  changed: {
    config?: string[]
    data?: boolean
    queryResponse?: boolean
    size?: boolean
  }
}

export interface VisOption {
  type: string
  values?: VisOptionValue[]
  display?: string
  default?: any
  label: string
  section?: string
  placeholder?: string
  display_size?: 'half' | 'third' | 'normal'
  order?: number
  min?: number
  max?: number
  step?: number
  required?: boolean
  supports?: string[]
}

export interface VisualizationError {
  group?: string
  message?: string
  title?: string
  retryable?: boolean
  warning?: boolean
}
