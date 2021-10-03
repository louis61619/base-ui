import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Menu from './Menu'
import MenuItem from './MenuItem'
import Submenu from './Submenu'

export default {
  title: 'Components/Menu',
  component: Menu,
  subcomponents: { Submenu, MenuItem }
} as ComponentMeta<typeof Menu>

const Template: ComponentStory<typeof Menu> = (args) => {
  return (
    <Menu {...args}>
      <MenuItem>menu item 1</MenuItem>
      <MenuItem>menu item 2</MenuItem>
      <MenuItem>menu item 3</MenuItem>
      <Submenu title="subMenu">
        <MenuItem>submenu item 1</MenuItem>
        <MenuItem>submenu item 2</MenuItem>
        <MenuItem>submenu item 3</MenuItem>
      </Submenu>
    </Menu>
  )
}

export const Default = Template.bind({})
Default.args = {
  mode: 'horizontal'
}
Default.storyName = 'horizontal'

export const Vertical = Template.bind({})
Vertical.args = {
  mode: 'vertical',
  defaultIndex: '3-1'
}
Vertical.storyName = 'vertical'
