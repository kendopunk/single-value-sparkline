/**
 * src/stories/utils/StyledWrapper.tsx
 * Generic styled-components container
 */
import styled from 'styled-components'

export const StyledWrapper = styled('div')<{ width?: number | string; height?: number | string }>`
  padding: 20px;
  background-color: #fff;
  font-family: 'Helvetica', sans-serif;
  font-size: 14px;
  color: #888;
`
