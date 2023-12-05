/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * src/lookerviz/single-value-sparkline/index.tsx
 * Looker custom viz wrapper for <SingleValueSparkLine>
 */
import React from 'react'
import { createRoot } from 'react-dom/client'
import type {
  Looker,
  VisConfig,
  VisQueryResponse,
  VisualizationDefinitionExtended
} from '../../types/looker'
import SingleValueSparkline from '../../components/SingleValueSparkline'
import { getDefaultTitle, getTargetColumns, handleErrors, TargetColumn } from './utils'
import withLookerDataConversion from '../../hoc/withLookerDataConversion'

declare const looker: Looker

const viz: VisualizationDefinitionExtended = {
  options: {
    percentCalculation: {
      label: 'Percent Based On',
      display: 'select',
      section: 'Data',
      type: 'string',
      default: 'secondfirst',
      values: [
        { 'second value / first value': 'secondfirst' },
        { 'mean value / first value': 'meanfirst' },
        {
          'last value / first value': 'lastfirst'
        }
      ]
    },
    title: {
      label: 'Title',
      section: 'Formatting',
      type: 'string',
      order: 1
    },
    numberFormat: {
      label: 'Number Format',
      section: 'Formatting',
      type: 'string',
      default: '#,##0.00',
      order: 2
    },
    percentDecimals: {
      default: 2,
      label: '% Decimal Places',
      order: 3,
      section: 'Formatting',
      type: 'number'
    },
    sparklineColor: {
      default: '#990066',
      display: 'select',
      label: 'Sparkline Color',
      order: 4,
      section: 'Formatting',
      type: 'string',
      values: [
        { purple: '#990066' },
        { black: '#000000' },
        { blue: '#0000cc' },
        { red: '#cc3300' },
        { green: '#00cc00' }
      ]
    },
    infoNote: {
      label: 'Info Note',
      section: 'Formatting',
      type: 'string',
      default: '',
      order: 5
    }
  },

  create(element: any) {
    /* eslint-disable no-param-reassign */
    element.innerHTML = `
       <style>
       #single-value-sparkline-wrapper {
           /* Vertical centering */
           height: 100%;
           width: 100%;
           color: #990066;
       }
       </style>
     `

    const container = element.appendChild(document.createElement('div'))
    container.id = 'single-value-sparkline'

    // Create an element to contain the text.
    this._textElement = container.appendChild(document.createElement('div'))

    // we're using this higher-order component (HOC) for data transformation
    const EnhancedComponent = withLookerDataConversion(
      SingleValueSparkline,
      {
        data: [],
        fields: {}
      },
      'singleValueSparkline'
    )

    // eslint-disable-next-line react/no-render-return-value
    const el = document.getElementById('single-value-sparkline')
    if (el) {
      this.chart = createRoot(el).render(<EnhancedComponent />)
    }
  },

  updateAsync(
    data: any,
    element: any,
    config: VisConfig,
    queryResponse: VisQueryResponse,
    details: any,
    done: () => void
  ) {
    if (this.clearErrors) {
      this.clearErrors()
    }

    // error handling
    const errors = handleErrors(this, queryResponse)
    if (errors) {
      return
    }

    /**
     * extract option values from config
     */
    const {
      infoNote,
      numberFormat,
      percentCalculation,
      percentDecimals,
      sparklineColor,
      title,
      targetColumn
    } = config

    /**
     * handling the default title vs a user-specified title
     */
    const defaultTitle = getDefaultTitle(queryResponse)
    const useTitle = title ? title : defaultTitle

    /**
     * Measures or numeric dimensions available for Target Column
     */
    const targetColumns = getTargetColumns(queryResponse)

    /**
     * build new options
     */
    const values: TargetColumn[] = targetColumns.map((m: any) => {
      const { label, name } = m
      const obj: any = {}
      obj[label] = name
      return obj
    })

    /**
     * unique list of column names
     */
    const availableCols: string[] = values
      .map((m: TargetColumn) => {
        const v = Object.values(m)
        return v
      })
      .flat()

    let useTargetColumn = ''
    if (targetColumn && availableCols.indexOf(targetColumn) >= 0) {
      useTargetColumn = targetColumn
    } else {
      useTargetColumn = availableCols[0]
    }

    const newOptions = Object.assign({}, this.options)

    newOptions['targetColumn'] = {
      label: 'Column to Calculate',
      display: 'select',
      default: useTargetColumn,
      section: 'Data',
      order: 2,
      type: 'string',
      values
    }

    /**
     * apply the trigger
     */
    if (this.trigger) {
      this.trigger('registerOptions', newOptions)
      this.trigger('updateConfig', [{ title: useTitle, targetColumn: useTargetColumn }])
    }

    /**
     * We're using this higher-order component (HOC) for data transformation
     */
    const EnhancedComponent = withLookerDataConversion(
      SingleValueSparkline,
      queryResponse,
      'singleValueSparkline',
      {
        defaultTargetColumn: useTargetColumn,
        percentCalculation
      }
    )

    // eslint-disable-next-line react/no-render-return-value
    const el = document.getElementById('single-value-sparkline')
    if (el) {
      this.chart = createRoot(el).render(
        <EnhancedComponent
          note={infoNote ?? ''}
          numberFormat={numberFormat ?? '#,##0.00'}
          percentDecimals={+percentDecimals}
          sparklineColor={sparklineColor}
          title={useTitle}
        />
      )
    }

    done()
  }
}

looker.plugins.visualizations.add(viz)
