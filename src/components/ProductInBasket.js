import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeProductToBasket, changeBasketCurrent, removeProductToBasket} from '../store/basketSlice';
import styles from '../styles/ProductInBasket.module.css'

export const ProductInBasket = ({product}) => {
  const basket = useSelector(state => state.basket.basket);
  const dispatch = useDispatch();
  
  const valuePrice = +product.price * +product.current

  const handlerAddCurrent = () => {
    dispatch(changeBasketCurrent(1))
    const newBasket = [...basket]
    let newProduct = newBasket.find(item => item.id === +product.id)
    newProduct = {...newProduct, current: newProduct.current + 1}
    dispatch(changeProductToBasket({newProduct}))
  }

  const handlerRemoveCurrent = () => {
    dispatch(changeBasketCurrent(-1))
    const newBasket = [...basket]
    const currentProduct = newBasket.find(item => +item.id === +product.id)
    if(currentProduct.current === 1) {
      const indexProduct = newBasket.findIndex(item=> item.id === product.id)
      dispatch(removeProductToBasket({indexProduct}))
      return
    }
    let newProduct = newBasket.find(item => +item.id === +product.id)
    newProduct = {...newProduct, current: newProduct.current - 1}
    dispatch(changeProductToBasket({newProduct}))
  }

  const handlerRemoveProduct = () => {
    const newBasket = [...basket]
    const currentProduct = newBasket.find(item => +item.id === +product.id)
    dispatch(changeBasketCurrent(-currentProduct.current))
    const indexProduct = newBasket.findIndex(item=> item.id === product.id)
    dispatch(removeProductToBasket({indexProduct}))
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{product.title}:</h3>
      <span className={styles.remove} onClick={handlerRemoveProduct}></span>
      <div className={styles['current-wrapper']}>
        <span className={styles['current-add']} onClick={handlerAddCurrent}></span>
        <p className={styles.current}>{product.current}</p>
        <span className={styles['current-remove']} onClick={handlerRemoveCurrent}></span>
      </div>
      <p className={styles.price}>{valuePrice} &#8381;</p>
    </div>
  )
}