import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationType = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom'

type TransitionProps = CSSTransitionProps & { animation?: AnimationType; wrapper?: boolean }

const Transition: React.FC<TransitionProps> = (props) => {
  const { animation, wrapper, classNames, children, ...resetProps } = props
  const nodeRef = React.useRef(null)
  const nodeCount = React.Children.count(children)

  const renderCildren = () => {
    if (nodeCount > 1 || wrapper) {
      return <div ref={nodeRef}>{children}</div>
    } else {
      return React.cloneElement(children as React.ReactElement<any>, { ref: nodeRef })
      // return <div ref={nodeRef}>{children}</div>
    }
    // return children
    // return React.Children.map(children, (child, index) => {
    //   const childElement = child as React.FunctionComponentElement<any>
    //   return React.cloneElement(childElement, {
    //     ref: nodeRef
    //   })
    // })
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames={classNames ? classNames : animation}
      {...resetProps}
    >
      {renderCildren()}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transition

// import React from 'react'
// import { CSSTransition } from 'react-transition-group'
// import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

// type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

// type TransitionProps = CSSTransitionProps & { animation?: AnimationName; wrapper?: boolean }

// const Transition: React.FC<TransitionProps> = (props) => {
//   const { children, classNames, animation, wrapper, ...restProps } = props
//   return (
//     <CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
//       {wrapper ? <div>{children}</div> : children}
//     </CSSTransition>
//   )
// }
// Transition.defaultProps = {
//   unmountOnExit: true,
//   appear: true
// }

// export default Transition
