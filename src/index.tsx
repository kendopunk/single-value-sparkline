/**
 * src/index.tsx
 */
import React, { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'

interface Props {
  children?: ReactNode
}

function App({ children }: Props): JSX.Element {
  return (
    <React.Fragment>
      <h1>React, Typescript and Webpack</h1>
      {children}
    </React.Fragment>
  )
}

// https://stackoverflow.com/questions/71668256/deprecation-notice-reactdom-render-is-no-longer-supported-in-react-18
const el = document.getElementById('root')
if (el) {
  createRoot(document.getElementById('root') as Element).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
