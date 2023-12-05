/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * src/stories/EmbedSSO.stories.tsx
 */
import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import EmbedSSO, { EmbedSSOProps } from '../components/looker_embed/EmbedSSO'

export default {
  title: 'Embed/Embed SSO',
  component: EmbedSSO,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    targetUrl: {
      type: 'string',
      name: 'Target Embed URL',
      description:
        'Looker embed URL for Dashboard, Look, etc. e.g. https://yourdomain.looker.com/embed/dashboards/{dashboardId}'
    },
    userId: {
      type: 'string',
      name: 'User ID',
      description: 'Must be the User ID of an embed user with a valid external_user_id property.'
    },
    forceLogoutLogin: {
      type: 'boolean',
      name: 'Force Logout/Login'
    },
    sessionLength: {
      type: 'number',
      name: 'Session Length'
    }
  }
} as ComponentMeta<typeof EmbedSSO>

const Template: ComponentStory<typeof EmbedSSO> = (args: EmbedSSOProps) => {
  return <EmbedSSO {...args} />
}

/**
 * runtime mock Looker data
 */
export const EditableProps = Template.bind({})

EditableProps.args = {
  userId: '',
  forceLogoutLogin: false,
  sessionLength: 300,
  targetUrl: ''
}
