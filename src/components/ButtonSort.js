import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/ButtonSort.module.css'
import { setOrder, setShowSort, setSort } from '../store/dataFetchSlice';

export const ButtonSort = ({value}) => {
  const { showSort} = useSelector(state => state.dataFetch);
  const dispatch = useDispatch();

  const handlerClick = () => {
    let sort
    let order
    switch (value) {
      case 'По умолчанию':
        sort = null
        order ='asc'
        break;
      case 'По названию':
        sort = 'title'
        order ='asc'
        break;
      case 'По убыванию цены':
        sort = 'price'
        order ='desc'
        break;
      case 'По возрастанию цены':
        sort = 'price'
        order ='asc'
        break;
    
      default:
        break;
    }
    dispatch(setSort({sort}))
    dispatch(setOrder({order}))
    dispatch(setShowSort({showSort: !showSort}))
  }
  return (
    <li className={styles.item} onClick={handlerClick}>{value}</li>
  )
}
