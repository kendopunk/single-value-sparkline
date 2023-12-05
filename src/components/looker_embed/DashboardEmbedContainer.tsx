/**
 * src/components/looker_embed/DashboardEmbedContiner.tsx
 * A simple styled component wrapper
 */
import styled from 'styled-components'

const EmbedContainer = styled('div')<{
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

export default EmbedContainer
