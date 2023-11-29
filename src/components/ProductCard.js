import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addProductToBasket, changeProductToBasket, changeBasketCurrent, removeProductToBasket} from '../store/basketSlice';
import styles from '../styles/ProductCard.module.css'

export const ProductCard = ({product}) => {
  const basket = useSelector(state => state.basket.basket);
  const dispatch = useDispatch();

  const productInBasket = basket.find(item => +item.id === +product.id)
  const [current, setCurrent] = useState(productInBasket ? productInBasket.current : null)

  useEffect(() => {
    setCurrent(productInBasket ? productInBasket.current : 1)
  }, [basket])

  const handlerClick = () => {
    const newProduct = {id: product.id, title: product.title, current, price: product.price}
    dispatch(addProductToBasket({newProduct}))
    dispatch(changeBasketCurrent(1))
  }

  const handlerAddCurrent = (e) => {
    setCurrent(prev => prev + 1)
    dispatch(changeBasketCurrent(1))
    const newBasket = [...basket]
    let newProduct = newBasket.find(item => item.id === +product.id)
    newProduct = {...newProduct, current: newProduct.current + 1}
    dispatch(changeProductToBasket({newProduct}))
  }

  const handlerRemoveCurrent = () => {
    dispatch(changeBasketCurrent(-1))
    const newBasket = [...basket]
    if(current === 1) {
      const indexProduct = newBasket.findIndex(item=> item.id === product.id)
      dispatch(removeProductToBasket({indexProduct}))
      return
    }
    setCurrent(prev => prev - 1)
    let newProduct = newBasket.find(item => +item.id === +product.id)
    newProduct = {...newProduct, current: newProduct.current - 1}
    dispatch(changeProductToBasket({newProduct}))
  }

  return (
    <div className={styles.wrapper} id={product.id}>
      <img className={styles.img} alt={product.title} src={product.img}/>
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.price}>Цена: {product.price} руб.</p>
      {!productInBasket && <button className={styles['button-basket']} onClick={handlerClick}>Добавить в корзину</button>}
      {productInBasket && <div className={styles.currents}>
        <div className={styles.add} onClick={handlerAddCurrent}></div>
        <p className={styles.current}>{current}</p>
        <div className={styles.remove} onClick={handlerRemoveCurrent}></div>
      </div>}
    </div>
  )
}
