import React from 'react'
// import styles from './Layout.module.scss'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
  return (
    <>
    <Navbar/>
<Outlet/>
<Toaster/>
    <Footer/>
    </>
  )
}
