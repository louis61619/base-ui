import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import AutoComplete, { DataSourceType } from './AutoComplete'

interface GithubUserProps {
  login: string
  url: string
  avatar_url: string
}

export default {
  title: 'Components/AutoComplete',
  component: AutoComplete
} as ComponentMeta<typeof AutoComplete>

// const Template: ComponentStory<typeof AutoComplete> = (args) => {
//   const lakers = [
//     'bradley',
//     'pope',
//     'caruso',
//     'cook',
//     'cousins',
//     'james',
//     'AD',
//     'green',
//     'howard',
//     'kuzma',
//     'McGee',
//     'rando'
//   ]

//   const handleFetch = (query: string) => {
//     const list = lakers.filter((name) => name.includes(query)).map((name) => ({ value: name }))
//     return list
//   }
//   // const [value, setValue] = useState(args.value ?? '')
//   return <AutoComplete {...args} fetchSuggestions={handleFetch} />
// }

// export const Default = Template.bind({})
// Default.args = {
//   value: ''
// }

export const ControlAutoComplete: Story = () => {
  // const lakers = [
  //   'bradley',
  //   'pope',
  //   'caruso',
  //   'cook',
  //   'cousins',
  //   'james',
  //   'AD',
  //   'green',
  //   'howard',
  //   'kuzma',
  //   'McGee',
  //   'rando'
  // ]

  // const handleFetch = (query: string) => {
  //   const list = lakers.filter((name) => name.includes(query))
  //   return list
  // }

  const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
    { value: 'bradleyafaf', number: 11 },
    { value: 'popefaf', number: 1 },
    { value: 'carusofaf', number: 4 },
    { value: 'cookss', number: 2 },
    { value: 'cousinsff', number: 15 },
    { value: 'jamesff', number: 23 },
    { value: 'ADaaf', number: 3 },
    { value: 'greenff', number: 14 },
    { value: 'howardafa', number: 39 },
    { value: 'kuzmaf', number: 0 }
  ]

  const handleFetch = (query: string) => {
    return new Promise<any[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(lakersWithNumber.filter((item) => item.value.includes(query)))
      }, 1000)
    })
  }

  // const handleFetch = (query: string) => {
  //   return fetch(`https://api.github.com/search/users?q=${query}`)
  //     .then((res) => res.json())
  //     .then(({ items }) => {
  //       // console.log(items)
  //       return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
  //     })
  // }

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
        <span>Name: {itemWithGithub.value}</span>
        {/* <p>url: {itemWithGithub.url}</p> */}
      </>
    )
  }

  return (
    <AutoComplete fetchSuggestions={handleFetch} placeholder="Search" renderOption={renderOption} />
  )
}
ControlAutoComplete.storyName = 'async auto complete'

// type IFoo = <T>(item: DataSourceType<T>) => void

// function identity(arg: any): IFoo {
//   console.log(arg.length); // 可以获取length属性
//   return arg;
// }

// identity({ length: 88 })
