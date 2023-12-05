/**
 * src/components/common/StyledButton.tsx
 */
import styled from 'styled-components'

const StyledButton = styled('button')<{
  backgroundColor?: string
  color?: string
  padding?: string
}>`
  background-color: ${(props) => props?.backgroundColor ?? '#1976d2'};
  color: ${(props) => props?.color ?? '#ffffff'};
  padding: ${(props) => props?.padding ?? '8px 12px'};
  border-radius: 4px;
  border: none;
  cursor: pointer;
`

export default StyledButton
