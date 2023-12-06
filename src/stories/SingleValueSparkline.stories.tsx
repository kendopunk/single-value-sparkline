/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * src/stories/SingleValueSparkline.stories.tsx
 */
import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SingleValueSparkline, { SingleValueSparklineProps } from '../components/SingleValueSparkline'
import { StyledWrapper } from './utils/StyledWrapper'
// import withLookerDataConversion from '../hoc/withLookerDataConversion'
// import { runLookerQuery } from './utils/storyutils'

export default {
  title: 'D3/Single Value Sparkline',
  component: SingleValueSparkline,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    note: {
      type: 'string',
      name: 'Info icon note'
    },
    numberFormat: {
      type: 'string',
      name: 'Number Format'
    },
    percentDecimals: {
      type: 'number',
      name: 'Decimal Places'
    },
    percentRaw: {
      type: 'number',
      name: 'Raw Decimal Value'
    },
    queryId: {
      type: 'string',
      name: 'Looker Query ID'
    },
    rawValue: {
      type: 'string',
      name: 'Raw Value'
    },
    sparklineData: {
      name: 'Sparkline Data'
    },
    sparklineColor: {
      type: 'string',
      name: 'Sparkline Color'
    },
    title: {
      type: 'string',
      name: 'Title'
    }
  }
} as ComponentMeta<typeof SingleValueSparkline>

const Template: ComponentStory<typeof SingleValueSparkline> = (args: SingleValueSparklineProps) => {
  return (
    <StyledWrapper>
      <SingleValueSparkline {...args} />
    </StyledWrapper>
  )
}

/**
 * runtime mock Looker data
 */
export const Basic = Template.bind({})
const mockSparklineData = [...Array(10).keys()].map((m: number) => {
  return {
    x: m,
    y: Math.random() * 10
  }
})

Basic.args = {
  note: 'My sample note',
  numberFormat: '#,##0.00',
  percentDecimals: 2,
  percentRaw: 20.234923,
  rawValue: '15289642.68',
  sparklineColor: '#000000',
  sparklineData: mockSparklineData,
  title: 'Dimensions and Measures $ Net Revenue'
}
