import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  
  cilSpeedometer, 
  cilPeople,
  cilHeart,
  cilCalendar,
  cilHome,
  cilUser,
  cilGraph,
  cilCart,
  cilMobile,
  cilDollar,
  cilSitemap
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'


const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    
  },


  
  {
    //Usuario
    component: CNavGroup,
    name: 'Users', //Usuario 
    to: '/Users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Employees',
        to: '/Users/Employees',
      }, 
      {
        component: CNavItem,
        name: 'Customers',
        to: '/Users/Customers',
      }, 

    ],
  },

  {
    //Ventas y ordenes
    component: CNavGroup,
    name: 'Sales & Orders', //Sales & Orders 
    to: '/Sales & Orders',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Sales',
        to: '/Sales & Orders/Sales',
      }, 
      {
        component: CNavItem,
        name: 'Orders',
        to: '/Sales & Orders/Orders',
      }, 
   
    ],
  },

  {
   

    //Reportes y análisis
    component: CNavGroup,
    name: 'Reports & Analytics', 
    to: '/Reports & Analytics',
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Report Customers',
        to: '/Reports & Analytics/Customers_Report',
      }, 
      {
        component: CNavItem,
        name: 'Report Sales',
        to: '/Reports & Analytics/Sales-report',
      }, 
   
    ],
  },




  
  {
    //Productos
    component: CNavGroup,
    name: 'Products', //Productos 
    to: '/Products',
    icon: <CIcon icon={cilMobile} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/Products/List',
      }, 
   
    ],
  },

    


  {
   

    //Proveedores
    component: CNavGroup,
    name: 'Suppliers', //Proveedores 
    to: '/Suppliers',
    icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/Suppliers/List',
      }, 
   
    ],
  },


  {
   

    //Financias
    component: CNavGroup,
    name: 'Financials', //Financias 
    to: '/Financials',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Invoices',
        to: '/Financials/Invoices',
      }, 
   
    ],
  },






]

export default _nav
