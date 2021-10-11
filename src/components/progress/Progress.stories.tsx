import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Progress from './Progress'

export default {
  title: 'Components/Progress',
  component: Progress
} as ComponentMeta<typeof Progress>

const Template: ComponentStory<typeof Progress> = (args) => {
  return <Progress {...args}>Button</Progress>
}

export const Default = Template.bind({})
Default.args = {
  percent: 50,
  strokeHeight: 20
}
Default.storyName = 'default'
