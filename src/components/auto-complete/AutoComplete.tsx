import React, { useState, ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react'

import Input, { IInputProps } from '../input/Input'
import Icon from '../icon/Icon'
import Transition from '../transition/Transition'

import useDebounce from '../../hooks/useDebounce'
import useClickOutSide from '../../hooks/useClickOutSide'
import classNames from 'classnames'

export interface IDataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = IDataSourceObject & T

export interface IAutoCompleteProps extends Omit<IInputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => React.ReactElement
}

const AutoComplete: React.FC<IAutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...resetProps } = props
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [highlightIndex, setHighLightIndex] = useState(-1)
  const [showDropdown, setShowDropDown] = useState(false)
  const debounceValue = useDebounce(inputValue, 300)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  useClickOutSide(componentRef, () => {
    setSuggestions([])
  })

  const hightlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighLightIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // console.log(e.key)
    // triggerSearch.current = true
    // setSuggestions([])
    switch (e.key) {
      case 'Enter':
        handleSelect(suggestions[highlightIndex])
        break
      case 'Down':
      case 'ArrowDown':
        hightlight(highlightIndex + 1)
        break
      case 'Up':
      case 'ArrowUp':
        hightlight(highlightIndex - 1)
        break
      case 'Esc': // IE/Edge specific value
      case 'Escape':
        // console.log('4848')
        // setSuggestions([])
        setShowDropDown(false)
        break
      default:
        break
    }
  }

  // console.log(suggestions)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    triggerSearch.current = true
  }

  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const results = fetchSuggestions(debounceValue)
      setSuggestions([])
      // 判斷是否為promise
      if (results instanceof Promise) {
        setIsLoading(true)
        results.then((data) => {
          setIsLoading(false)
          setSuggestions(data)
          if (data.length > 0) {
            setShowDropDown(true)
          } else {
            setShowDropDown(false)
          }
        })
      } else {
        setSuggestions(results)
        if (results.length > 0) {
          setShowDropDown(true)
        } else {
          setShowDropDown(false)
        }
      }
    } else {
      setSuggestions([])
      setShowDropDown(false)
    }
    setHighLightIndex(-1)
  }, [debounceValue, fetchSuggestions])

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])

    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || isLoading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSuggestions([])
        }}
      >
        <ul className="base-suggestion-list">
          {isLoading && (
            <li className="suggstions-loading-icon">
              <Icon icon="spinner" spin></Icon>
            </li>
          )}
          {suggestions.map((item, index) => {
            const classes = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            })
            return (
              <li className={classes} onClick={() => handleSelect(item)} key={index}>
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }

  return (
    <div className="base-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...resetProps}
      ></Input>
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete
