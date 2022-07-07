import React, { useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import { ToastContainer } from 'react-toastify'

const UserDetails = React.lazy(() => import('./UserDetails'))
const UserTips = React.lazy(() => import('./UserTips'))
const UserSubscribe = React.lazy(() => import('./userSubscribe'))
const View = (props) => {
  const [activeTab, setActiveTab] = useState('1')

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <div>
      <ToastContainer position='top-right' autoClose={3000} />
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1')
            }}>
            Detail
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2')
            }}>
            Tips
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3')
            }}>
            Subscribe
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          <UserDetails />
        </TabPane>
        <TabPane tabId='2'>
          <UserTips />
        </TabPane>
        <TabPane tabId='3'>
          <UserSubscribe />
        </TabPane>
      </TabContent>
    </div>
  )
}

export default View
