/**
 * src/components/looker_embed/EmbedSSOContainer.tsx
 * A simple styled component wrapper
 */
import styled from 'styled-components'

const EmbedSSOContainer = styled('div')<{
  height?: string | number
  width?: string | number
}>`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '95vh')};
  & > iframe {
    width: 100%;
    height: 100%;
  }
`

export default EmbedSSOContainer
