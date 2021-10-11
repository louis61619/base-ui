import { FC } from 'react'

import InternalMenu, { IMenuProps } from './Menu'
import MenuItem, { IMenuItemProps } from './MenuItem'
import SubMenu, { ISubMenuProps } from './Submenu'

interface CompoundedComponent extends FC<IMenuProps> {
  MenuItem: FC<IMenuItemProps>
  SubMenu: FC<ISubMenuProps>
}

// export type IMenuComponent = FC<IMenuProps> & {
//   Item: FC<IMenuItemProps>,
//   SubMenu: FC<ISubMenuProps>
// }

const Menu = InternalMenu as CompoundedComponent
Menu.MenuItem = MenuItem
Menu.SubMenu = SubMenu

export { MenuItem, SubMenu }
export default Menu
