import React, { useState } from 'react'
import Menu from './components/menu/Menu'
import MenuItem from './components/menu/MenuItem'
import SubMenu from './components/menu/Submenu'
import Icon from './components/icon'
import Transition from './components/transition/Transition'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function App() {
  const [show, setShow] = useState(false)

  return (
    <div className="App">
      <Icon icon="arrow-down" theme="danger" size="10x" />

      <Menu
        onSelect={(index) => {
          // console.log(index)
        }}
        mode="horizontal"
        defaultIndex="subMenu-acitve"
      >
        <MenuItem index="acitve">active</MenuItem>
        <MenuItem index="disabled">disabled</MenuItem>
        <MenuItem index="default">default</MenuItem>
        <SubMenu title="subMenu" index="subMenu">
          <MenuItem index="subMenu-acitve">active</MenuItem>
          <MenuItem index="subMenu-disabled">disabled</MenuItem>
          <MenuItem index="subMenu-default">default</MenuItem>
        </SubMenu>
      </Menu>

      <Transition animation="zoom-in-bottom" in={show} timeout={300}>
        <p>4848484</p>
        <p>4848484</p>
        <p>4848484</p>
      </Transition>
    </div>
  )
}

export default App
