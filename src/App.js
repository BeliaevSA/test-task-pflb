import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonNav } from './components/ButtonNav';
import { ButtonSort } from './components/ButtonSort';
import { ProductCard } from './components/ProductCard';
import { ProductInBasket } from './components/ProductInBasket';
import styles from './styles/App.module.css';
import { useGetProductsQuery, useGetPaginationQuery } from './store/api/api';
import { setIsPagination, setPage, setShowNavMenu, setShowSort } from './store/dataFetchSlice';

function App() {
  const {basket, basketCurrent} = useSelector(state => state.basket);
  const {category, sort, order, page, isPagination, showNavMenu, showSort} = useSelector(state => state.dataFetch);
  const dispatch = useDispatch();

  const [showBasket, setShowBasket] = useState(false)
  const [finishPrice, setFinishPrice] = useState(null)

  
  const { data, isLoading: isLoadingDataFetch } = useGetProductsQuery({category, sort, order, page});
  const { data: dataPagination, isLoading: isLoadingDataPagination } = useGetPaginationQuery({category, page});

  const fetchDataPagination = async () => {
    !isLoadingDataPagination && dispatch(setIsPagination({dataPagination}))
  }

  useEffect(() => {
    fetchDataPagination()
  }, [isLoadingDataPagination])

  const handlerSort = () => {
    dispatch(setShowSort({showSort: !showSort}))
  }

  const handlerPagination = () => {
    dispatch(setPage({page: page + 1}))
    fetchDataPagination()
  }

  const handlerTogleBasket = () => {
    setShowBasket(!showBasket)
  }
  
  const handlerClickIconMenu = () => {
    dispatch(setShowNavMenu({showNavMenu: !showNavMenu}))
  }

  const handlerCloseBasket = () => {
    setShowBasket(false)
  }

  const stylesBasketWraper = showBasket ? `${styles['basket-wrapper']} ${styles.active}` : `${styles['basket-wrapper']}`
  const stylesNavMenu = showNavMenu ? `${styles.nav} ${styles.active}` : `${styles.nav}`
  const stylesIconMenu = showNavMenu ? `${styles['icon-menu']} ${styles.active}` : `${styles['icon-menu']}`
  
  const basketValue = basketCurrent > 0 ? `(${basketCurrent})` : ''

  useEffect(() => {
    if(basket.length) {
      let price = 0
      basket.forEach(item => {
        price += item.current * item.price
      })
      setFinishPrice(price)
    } else {
      setFinishPrice(null)
    }
  }, [basket])

  return (
    !isLoadingDataFetch && <div className={styles.app}>
      
      <header className={styles.header}>
        <div className={styles['header-wrapper']}>
          <h1 className={styles.title}>Товары</h1>
          <div className={styles['nav-wrapper']}>
            <nav>
              <ul className={stylesNavMenu}>
                <ButtonNav value='Продукты'/>
                <ButtonNav value='Одежда'/>
                <ButtonNav value='Электроника'/>
              </ul>
              <div className={stylesIconMenu} onClick={handlerClickIconMenu}></div>
            </nav>
            <div className={styles.basket} onClick={handlerTogleBasket}>Корзина {basketValue }</div>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles['sort-wrapper']}>
          <button className={styles['sort-value']} onClick={handlerSort}>Сортировать</button>
          {showSort && <ul className={styles['sort-list']}>
            <ButtonSort value='По умолчанию'/>
            <ButtonSort value='По названию'/>
            <ButtonSort value='По убыванию цены'/>
            <ButtonSort value='По возрастанию цены'/>
          </ul>}
        </div>
        <div className={styles.products}>
          {data.map((product, index) => (
            <ProductCard key={index} product={product}/>
          ))}
        </div>
        {isPagination && <button className={styles['btn-more']} onClick={handlerPagination}>Показать больше</button>}
      </main>
      <aside className={stylesBasketWraper}>
        <h3 className={styles['basket-title']}>Товаров в корзине: {basketValue ? basketValue : 0}</h3>
        <div className={styles['basket-products']}>
          {basket.length ?
            basket.map(item => {
              return <ProductInBasket key={item.id} product={item}/>
            }) :
            <p className={styles['basket-no-products']}>Товаров в корзине нет.</p>}
        </div>
        {finishPrice && <p>Итого: {finishPrice} &#8381;</p>}
        <button className={styles['basket-btn']} disabled={basket.length ? false : true} onClick={() => alert('Заказ оформлен!')}>Оформить заказ</button>
        <div className={styles['basket-close']} onClick={handlerCloseBasket}></div>
      </aside>
    </div>
  );
}

export default App;
