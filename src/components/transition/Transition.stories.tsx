import React, { useState, useEffect } from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import Transition from './Transition'
import Button from '../button/Button'

export default {
  title: 'Components/Transition',
  component: Transition
} as ComponentMeta<typeof Transition>

export const ZoomInTop: Story = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(true)
  }, [])
  return (
    <div>
      <Button onClick={() => setShow(!show)}>click</Button>
      <Transition animation="zoom-in-top" in={show} timeout={300}>
        <h2>Hello!</h2>
        <h2>My name is Louis</h2>
        <h2>I am 26 years old</h2>
      </Transition>
    </div>
  )
}

ZoomInTop.storyName = 'zoom in top'
