import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import useHandleProducts from './hooks/useHandleProducts'
import useHandleCategory from './hooks/useHandleCategory';

function App() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchCategoryKeyword, setSearchCategoryKeyword] = useState('')
  const { products, productName, productPrice, newProductName, setNewProductName, setProductName, setProductPrice, isLoading, handleAddNewProduct, handleDeleteProduct, handleEditProductName } = useHandleProducts(searchKeyword)
  const { productsByCategory } = useHandleCategory(searchCategoryKeyword)
  //useEffect: apply call api
  //useEffect(around func, dependency)
  //dependency là 1 cái array, chứa useState cần theo dõi để chạy lại api
  //[] rỗng -> chạy 1 lần
  //[value] -> monitor cái đó để call lại api

  return (
    <div className="App">
      {/* cách để add img vào, img sẽ lấy từ public folder */}
      {/* <img src='./images/1.jpg' /> */}
      {/* process.env.PUBLIC_URL -> lấy vị trí folder public 1 cách chính xác hơn */}
      {/* <img src={`${process.env.PUBLIC_URL}/images/1.jpg`} /> */}

      {/* <input onChange={(e) => { setSearchKeyword(e.target.value) }} value={searchKeyword} placeholder="Search product name" /><br />
      {isLoading ? 'Loading' :
        products.map((product) => {
          return <h1 key={product.id}>{product.productName}
            <button onClick={() => handleDeleteProduct(product)}>X</button><br />
            <input onChange={(e) => { setNewProductName(e.target.value) }} value={newProductName} placeholder='Input new name' />
            <button onClick={() => handleEditProductName(product, newProductName)}>Edit</button>
          </h1>
        })
      }
      <br />
      <input onChange={(e) => { setProductName(e.target.value) }} value={productName} placeholder='Product Name' />
      <input onChange={(e) => { setProductPrice(e.target.value) }} value={productPrice} placeholder='Product Price' />
      <button onClick={() => { handleAddNewProduct(productName, productPrice) }}>Add new product</button><br /> */}

      <input onChange={(e) => { setSearchCategoryKeyword(e.target.value) }} value={searchCategoryKeyword} placeholder="Search product by category name" /><br />
      {isLoading ? 'Loading' :
        productsByCategory.map((product) => {
          return <h1 key={product.id}>{product.productName} {product.productCategory}
            <button onClick={() => handleDeleteProduct(product)}>X</button><br />
            <input onChange={(e) => { setNewProductName(e.target.value) }} value={newProductName} placeholder='Input new name' />
            <button onClick={() => handleEditProductName(product, newProductName)}>Edit</button>
          </h1>
        })
      }
    </div>
  );
}

export default App;
