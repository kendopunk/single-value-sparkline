/**
 * src/components/SingleValueSparkline/index.tsx
 * Single value viz with optional sparkline
 */
import React from 'react'
import styled from 'styled-components'
import { useResizeDetector } from 'react-resize-detector'
import { format } from 'numfmt'

import Sparkline from '../Sparkline'
import { GenericXYValueData } from '../../types/chart'
import { PercentValue } from './PercentValue'
import InfoIconTooltip from '../common/InfoIconTooltip'

const OuterWrapper = styled.div`
  padding: 1em;
  font-family: 'Helvetica', 'Arial', sans-serif;
`

const FlexWrapperOuter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const FlexWrapperInner = styled.div`
  display: flex;
  flex-direction: column;
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`

const PercentContainer = styled.div`
  display: flex;
  margin-top: 0.1em;
  margin-bottom: 0.1em;
  align-items: center;
`

const StyledSparklineContainer = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`

const StyledTitle = styled.div<{
  fontSize: string
}>`
  font-size: ${(props) => props.fontSize};
  font-weight: bold;
  color: #ccc;
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  margin-right: 0.5em;
`

const StyledValue = styled.div<{
  fontSize: string
}>`
  font-size: ${(props) => props.fontSize};
  color: #777;
  margin-top: 0.25em;
  margin-bottom: 0.25em;
`

export type SingleValueSparklineProps = {
  note?: string
  numberFormat?: string
  percentDecimals?: number
  percentRaw?: number | null | undefined
  rawValue: string | number
  sparklineData: GenericXYValueData | null
  sparklineColor?: string
  title?: string
}

export default function SingleValueSparkline({
  note,
  numberFormat = '#,##0.00',
  percentDecimals = 2,
  percentRaw,
  rawValue,
  sparklineData = [],
  sparklineColor = '#3399ff',
  title
}: SingleValueSparklineProps): JSX.Element | null {
  const { width, ref } = useResizeDetector({
    handleHeight: false,
    refreshMode: 'debounce',
    refreshRate: 500
  })

  function getTitleFontSize(width: number | undefined): string {
    if (width) {
      if (width >= 300) {
        return '1.35em'
      }
      if (width >= 200) {
        return '1.15em'
      }
      if (width >= 100) {
        return '1em'
      }
      return '0.75em'
    }
    return '1.35em'
  }

  function getValueFontSize(width: number | undefined): string {
    if (width) {
      if (width >= 300) {
        return '2em'
      }
      if (width >= 200) {
        return '1.75em'
      }
      if (width >= 150) {
        return '1.25em'
      }
      return '1em'
    }
    return '2em'
  }

  function tryNumberFormat(): string {
    let result = rawValue + ''
    try {
      result = format(numberFormat, +rawValue)
    } catch (_e) {}

    return result
  }

  return (
    <OuterWrapper ref={ref}>
      <FlexWrapperOuter>
        <FlexWrapperInner>
          {/* title and tooltip */}
          <HeaderWrapper>
            {title && <StyledTitle fontSize={getTitleFontSize(width)}>{title}</StyledTitle>}
            {note && <InfoIconTooltip text={note} />}
          </HeaderWrapper>

          {/* single value */}
          <StyledValue fontSize={getValueFontSize(width)}>{tryNumberFormat()}</StyledValue>

          {/* percent display */}
          {!Number.isNaN(percentRaw) && (
            <PercentContainer>
              <PercentValue
                value={percentRaw ?? 0}
                decimals={percentDecimals}
                fontSize={getTitleFontSize(width)}
              />
            </PercentContainer>
          )}

          {/* optional sparkline */}
          {sparklineData && sparklineData.length > 0 && (
            <StyledSparklineContainer>
              <Sparkline data={sparklineData} color={sparklineColor} width={width ?? 150} />
            </StyledSparklineContainer>
          )}
        </FlexWrapperInner>
      </FlexWrapperOuter>
    </OuterWrapper>
  )
}
