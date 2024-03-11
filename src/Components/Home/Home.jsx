import React from 'react'
import MainSlider from '../MainSlider/MainSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import { Helmet } from 'react-helmet'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
// import styles from './Home.module.scss'

export default function Home() {
  return (
    <>
    <Helmet>
                <title>Home Page</title>
            </Helmet>
    <MainSlider/>
    <CategoriesSlider/>
    <FeatureProducts/>
    </>
  )
}
