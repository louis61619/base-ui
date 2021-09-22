import React from 'react'
import Button, { ButtonSize, ButtonType } from './components/button/button'

function App() {
  return (
    <div className="App">
      <Button autoFocus size={ButtonSize.large} btnType={ButtonType.primary}>
        我是按鈕
      </Button>
      <Button size={ButtonSize.small} btnType={ButtonType.link}>
        我是連結
      </Button>
      <Button size={ButtonSize.small} btnType={ButtonType.primary} disabled>
        我是連結
      </Button>
      <Button size={ButtonSize.large} btnType={ButtonType.danger}>
        我是連結
      </Button>
      <Button size={ButtonSize.large} btnType={ButtonType.default}>
        我是連結
      </Button>
      <Button size={ButtonSize.large} btnType={ButtonType.link}>
        我是連結
      </Button>
      <Button size={ButtonSize.large} btnType={ButtonType.link} disabled>
        我是連結
      </Button>
    </div>
  )
}

export default App
