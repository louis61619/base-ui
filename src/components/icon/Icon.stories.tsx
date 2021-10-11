import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import Icon from './Icon'

export default {
  title: 'Components/Icon',
  component: Icon
} as ComponentMeta<typeof Icon>

export const NormalIcon: Story = () => {
  return (
    <div className="group">
      <p
        style={{
          marginBottom: '16px'
        }}
      >
        see more in{' '}
        <a
          target="_blank"
          href="https://fontawesome.com/v5.15/icons?d=gallery&p=2&s=solid&m=free"
          rel="noreferrer"
        >
          fontawesome
        </a>
      </p>
      <Icon icon="baby-carriage" size="3x" theme="primary" />
      <Icon icon="archway" size="3x" theme="info" />
      <Icon icon="bible" size="3x" theme="error" />
      <Icon icon="check-circle" size="3x" theme="danger" />
      <Icon icon="check-circle" size="3x" theme="secondary" />
    </div>
  )
}

NormalIcon.storyName = 'all theme icon'

export const Spinner: Story = () => {
  return (
    <div className="group">
      <Icon icon="spinner" spin size="3x" theme="primary" />
      <Icon icon="spinner" spin size="3x" theme="info" />
      {/* <Icon icon="spinner" spin size="3x" theme="error" />
      <Icon icon="spinner" spin size="3x" theme="danger" />
      <Icon icon="spinner" spin size="3x" theme="secondary" /> */}
    </div>
  )
}

Spinner.storyName = 'spinner'
