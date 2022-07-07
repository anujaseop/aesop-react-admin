import React, { useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import { ToastContainer } from 'react-toastify'

const UserDetails = React.lazy(() => import('./UserDetails'))
const Rating = React.lazy(() => import('./Rating'))
const ConsultantTip = React.lazy(() => import('./consultantTip'))
const Member = React.lazy(() => import('./Member'))

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
            Rating
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3')
            }}>
            Tips
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              toggle('4')
            }}>
            Member
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          <UserDetails />
        </TabPane>
        <TabPane tabId='2'>
          <Rating />
        </TabPane>
        <TabPane tabId='3'>
          <ConsultantTip />
        </TabPane>{' '}
        <TabPane tabId='4'>
          <Member />
        </TabPane>
      </TabContent>
    </div>
  )
}

export default View
