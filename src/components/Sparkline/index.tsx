/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * src/components/Sparkline/index.tsx
 * https://www.essycode.com/posts/create-sparkline-charts-d3/
 */
import React, { useEffect, useRef } from 'react'
import { line, select, scaleLinear, Selection } from 'd3'
import { GenericXYValueData, GenericXYValueElement } from '../../types/chart'

export type SparklineProps = {
  data: GenericXYValueData
  width: number
  color?: string
  trendlineConfig?: 'secondfirst' | 'meanfirst' | 'lastfirst' | null
}

export default function Sparkline({
  data,
  color = '#000000',
  trendlineConfig = null
}: SparklineProps): JSX.Element {
  const HEIGHT = 50
  const WIDTH = 120

  const svgRef = useRef<SVGSVGElement | null>(null)

  function setXScale() {
    return scaleLinear().domain([0, data.length]).range([0, WIDTH])
  }

  function setYScale() {
    const mn = Math.min(...data.map((m: GenericXYValueElement) => m.y))
    const mx = Math.max(...data.map((m: GenericXYValueElement) => m.y))

    return scaleLinear()
      .domain([Math.min(0, mn), mx])
      .range([HEIGHT, 0])
  }

  function handleTrendline(svg: Selection<SVGSVGElement | null, any, null, undefined>): void {
    const [leftRecord] = data
    const leftValue = leftRecord?.y ?? 0

    const [nextToRightRecord] = data.slice(-2)
    const nextToRightValue = nextToRightRecord?.y ?? 0

    const [rightRecord] = data.slice(-1)
    const rightValue = rightRecord?.y ?? 0

    const meanValue =
      data
        .map((m: GenericXYValueElement) => m.y)
        .filter((f) => f)
        .reduce((a: number, b: number) => a + b) / data.length

    const yScale: any = setYScale()

    // JRAT
    const gSel = svg.select('g.trendline')
    gSel.selectAll('line').remove()

    gSel
      .append('line')
      .style('stroke', '#ddd')
      .style('stroke-width', 1)
      .attr('x1', 0)
      .attr('x2', WIDTH)
      .attr('y1', () => {
        if (trendlineConfig === 'lastfirst') {
          return yScale(leftValue)
        } else if (trendlineConfig === 'meanfirst') {
          return yScale(meanValue)
        } else {
          return yScale(nextToRightValue)
        }
      })
      .attr('y2', () => yScale(rightValue))
  }

  function handleSparkline(svg: Selection<SVGSVGElement | null, any, null, undefined>): void {
    const xScale: any = setXScale()
    const yScale: any = setYScale()

    const lineFn: any = line<GenericXYValueElement>()
      .x((_d, i) => xScale(i))
      .y((d) => yScale(d.y))

    // JRAT -> Join Remove Append Transition
    const gSel = svg.select('g.line')

    gSel.selectAll('path').remove()

    gSel
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1)
      .transition('100')
      .attr('d', lineFn)
  }

  /**
   * primary draw function
   */
  function draw(svg: Selection<SVGSVGElement | null, any, null, undefined>): void {
    handleSparkline(svg)
    if (trendlineConfig) {
      handleTrendline(svg)
    }
  }

  useEffect(() => {
    const svg: Selection<SVGSVGElement | null, any, null, undefined> = select(svgRef.current)
    draw(svg)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, color])

  return (
    <svg
      ref={svgRef}
      version="1.1"
      baseProfile="full"
      width={WIDTH}
      height={HEIGHT}
      className="generic-sparkline"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="line" />
      <g className="trendline" />
    </svg>
  )
}
