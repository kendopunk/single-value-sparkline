/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * src/stories/SingleValueSparkline.stories.tsx
 */
import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SingleValueSparkline, { SingleValueSparklineProps } from '../components/SingleValueSparkline'
import { StyledWrapper } from './utils/StyledWrapper'

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
    },
    trendlineConfig: {
      name: 'Trendline Config',
      control: 'select',
      value: null,
      description:
        '"secondfirst" = second from right value vs far right value, "meanfirst" = mean value vs far right value, "lastfirst" = leftmost value vs right value',
      options: ['secondfirst', 'meanfirst', 'lastfirst', null]
    }
  }
} as ComponentMeta<typeof SingleValueSparkline>

const Template: ComponentStory<typeof SingleValueSparkline> = (args: SingleValueSparklineProps) => {
  return (
    <StyledWrapper>
      <SingleValueSparkline {...args} trendlineConfig={args?.trendlineConfig ?? null} />
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

Basic.argTypes = {
  trendlineConfig: { table: { disabled: true } }
}

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
