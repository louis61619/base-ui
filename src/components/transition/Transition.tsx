import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationType = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom'

type TransitionProps = CSSTransitionProps & { animation?: AnimationType; wrapper?: boolean }

const Transition: React.FC<TransitionProps> = (props) => {
  const { animation, wrapper, classNames, children, ...resetProps } = props
  const nodeRef = useRef(null)

  const renderCildren = () => {
    const nodeCount = React.Children.count(children)
    if (nodeCount > 1 || wrapper) {
      return <div ref={nodeRef}>{children}</div>
    }
    return children
    // return React.Children.map(children, (child, index) => {
    //   const childElement = child as React.FunctionComponentElement<any>
    //   return React.cloneElement(childElement, {
    //     ref: nodeRef
    //   })
    // })
  }

  return (
    <CSSTransition nodeRef={nodeRef} classNames={classNames || animation} {...resetProps}>
      {renderCildren()}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transition
