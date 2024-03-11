import React from 'react'
import notFoundImg from '../../assets/images/error.svg'
// import styles from './NotFound.module.scss'

export default function NotFound() {
  return (
    <section className='container my-5'>
      <img src={notFoundImg} className='w-100' alt="" />
    </section>
  )
}
