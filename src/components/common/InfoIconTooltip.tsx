/**
 * src/components/common/InfoIconTooltip.tsx
 */
import React from 'react'

export type InfoIconTooltipProps = {
  width?: string
  height?: string
  text?: string
}

const TOOLTIP_ID = 'info-icon-tooltip'

export default function InfoIconTooltip({
  width = '16',
  height = '16',
  text = ''
}: InfoIconTooltipProps): JSX.Element {
  function showTooltip(evt: React.MouseEvent<SVGGElement, MouseEvent>, text: string) {
    const tooltip = document.getElementById(TOOLTIP_ID)
    if (tooltip) {
      tooltip.innerHTML = text
      tooltip.style.display = 'block'
      tooltip.style.left = evt.pageX + 20 + 'px'
      tooltip.style.top = evt.pageY - 10 + 'px'
    }
  }

  function hideTooltip() {
    const tooltip = document.getElementById(TOOLTIP_ID)
    if (tooltip) {
      tooltip.style.display = 'none'
    }
  }

  return (
    <>
      <div
        id={TOOLTIP_ID}
        style={{
          position: 'absolute',
          display: 'none',
          background: '#eee',
          color: '#888',
          fontSize: '10px',
          fontFamily: '"Roboto", "Helvetica", sans-serif',
          padding: '8px',
          borderRadius: '4px',
          boxShadow: 'rgba(0, 0, 0, 0.08) 0 3px 10px 0',
          border: 'solid 1px #333'
        }}
      />
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
      >
        <g onMouseMove={(evt) => showTooltip(evt, text)} onMouseOut={() => hideTooltip()}>
          <path fill="#fff" d="M0 0h24v24H0V0z"></path>
          <path
            fill="#3b82f6"
            d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
          ></path>
        </g>
      </svg>
    </>
  )

  // onmousemove="showTooltip(evt, 'This is blue');" onmouseout="hideTooltip();"
}
