/**
 * src/components/looker_embed/DashboardToolbar.tsx
 * show / hide the native looker embed controls
 */
import React from 'react'
import styled from 'styled-components'

export type DashboardToolbarProps = {
  hideLookerControls: boolean
}

const DashboardToolbarWrapper = styled('div')<{
  visible: boolean
}>`
  height: 55px;
  background: red;
  position: absolute;
  background: #f7f8fa;
  width: 100%;
  display: ${(props) => {
    return props.visible ? '' : 'none'
  }};
`

export function DashboardToolbar({ hideLookerControls }: DashboardToolbarProps): JSX.Element {
  return <DashboardToolbarWrapper visible={hideLookerControls} />
}
