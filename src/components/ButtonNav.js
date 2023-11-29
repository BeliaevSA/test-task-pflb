import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setCategory, setShowNavMenu, setIsPagination } from '../store/dataFetchSlice';
import styles from '../styles/ButtonNav.module.css'

export const ButtonNav = ({value}) => {
  const { category} = useSelector(state => state.dataFetch);
  const dispatch = useDispatch();

  let valueCategory
  switch (value) {
    case 'Продукты':
      valueCategory = 'food'
      break;
    case 'Одежда':
      valueCategory = 'dress'
      break;
    case 'Электроника':
      valueCategory = 'technic'
      break;
  
    default:
      valueCategory = 'food'
      break;
  }

  const handlerCategory = (valueCategory) => {
    dispatch(setShowNavMenu({showNavMenu: false}))
    if(valueCategory === category) return 
    dispatch(setIsPagination({dataPagination: [{}]}))
    dispatch(setPage({page: 1}))
    dispatch(setCategory({category: valueCategory}))
  }

  return (
    <li className={styles.item} onClick={() => handlerCategory(valueCategory)}>{value}</li>
  )
}
