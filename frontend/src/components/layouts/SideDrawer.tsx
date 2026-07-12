import React from 'react';
import { Drawer, DrawerProps } from './Drawer';

export interface SideDrawerProps extends Omit<DrawerProps, 'position'> {
  position?: 'left' | 'right';
}

export function SideDrawer(props: SideDrawerProps) {
  return <Drawer {...props} />;
}

export default SideDrawer;
