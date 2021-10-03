import React from 'react'
import { ComponentStory, ComponentMeta, Story } from '@storybook/react'

import Button from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => {
  return <Button {...args}>Button</Button>
}

export const Default = Template.bind({})

Default.storyName = 'default'

export const AllTypeButton: Story = () => {
  return (
    <div className="button-group">
      <Button btnType="default">Button</Button>
      <Button btnType="primary">Button</Button>
      <Button btnType="danger">Button</Button>
      <Button btnType="link">Button</Button>
    </div>
  )
}
AllTypeButton.storyName = 'all type button'

export const AllTypAndDisabledButton: Story = () => {
  return (
    <div className="button-group">
      <Button disabled btnType="default">
        Button
      </Button>
      <Button disabled btnType="primary">
        Button
      </Button>
      <Button disabled btnType="danger">
        Button
      </Button>
      <Button disabled btnType="link">
        Button
      </Button>
    </div>
  )
}
AllTypAndDisabledButton.storyName = 'all type disabled button'

export const AllSizeButton: Story = () => {
  return (
    <div className="button-group">
      <Button size="large">Button</Button>
      <Button>Button</Button>
      <Button size="small">Button</Button>
    </div>
  )
}
AllSizeButton.storyName = 'all size button'

// More on args: https://storybook.js.org/docs/react/writing-stories/args
// export const Large = Template.bind({})
// Large.args = {
//   size: 'large'
// }

// export const Small = Template.bind({})
// Small.args = {
//   size: 'small'
// }
