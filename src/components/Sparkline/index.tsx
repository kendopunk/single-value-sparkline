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
  height?: number
}

export default function Sparkline({ data, color = '#000000' }: SparklineProps): JSX.Element {
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
    </svg>
  )
}
