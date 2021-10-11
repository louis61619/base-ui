import React from 'react'
import { ComponentStory, ComponentMeta, Story } from '@storybook/react'

import Input from './Input'

export default {
  title: 'Components/Input',
  component: Input
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => {
  return <Input {...args} />
}

export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'default'

export const ControlInput = Template.bind({})
ControlInput.args = {
  value: ''
}
ControlInput.storyName = 'control input'

export const WithIcon = Template.bind({})
WithIcon.args = {
  icon: 'search',
  placeholder: 'default'
}
WithIcon.storyName = 'with icon'

export const AllSizeInput: Story = () => {
  return (
    <div className="group">
      <Input size="large" placeholder="large">
        Button
      </Input>
      <Input placeholder="default">Button</Input>
      <Input size="small" placeholder="small">
        Button
      </Input>
    </div>
  )
}
AllSizeInput.storyName = 'all size input'

export const PandInput: Story = () => (
  <div className="group">
    <Input defaultValue="prepend text" prepend="https://" />
    <Input defaultValue="google" append=".com" />
  </div>
)
PandInput.storyName = 'pand input'

// export const ControlInput: Story = () => {
//   const [value, setValue] = useState('')
//   return <Input value={value} onChange={(e) => setValue(e.target.value)} />
// }
// PandInput.storyName = 'control input'
