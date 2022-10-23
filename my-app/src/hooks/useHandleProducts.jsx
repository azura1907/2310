import { useState, useEffect } from 'react'
import axios from 'axios'
export default function useHandleProducts(searchKeyword) {
    const [products, setProducts] = useState([])
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [newProductName, setNewProductName] = useState('')
    const API_URL = 'https://6354e3cbda523ceadcf5bc6b.mockapi.io'


    //call api with fetch
    // const handleCallAPI = async () => {
    //   const productsJSON = await fetch(`${API_URL}/products`)
    //   const productData = await productsJSON.json()
    //   setProducts(productData)
    // }

    //call api with axios
    const handleCallAPI = async () => {
        setIsLoading(true)
        // ở đây phải tạo URLSearchParams mới -> để xài cho params ở dưới axios
        const queryParam = new URLSearchParams(
            {
                search: searchKeyword
            }
        )

        const productData = await axios.get(`${API_URL}/products`, {
            params: queryParam
        });
        console.log(productData)
        setProducts(productData.data)
        setIsLoading(false)
    }

    useEffect(() => {
        const callAPITimeOut = setTimeout(handleCallAPI, 2000)
        //nên clear timeout sau mỗi lần chạy
        //đặt const ra để clear
        //cleartimeout sẽ đầu tiên ở lần thứ 2 của useEffect

        return () => {
            clearTimeout(callAPITimeOut)
        }

    }, [API_URL, searchKeyword])

    const handleAddNewProduct = async (productName, productPrice) => {
        await axios.post(`${API_URL}/products`, {
            productName: productName,
            productPrice: productPrice
        })

        handleCallAPI();
    }

    const handleDeleteProduct = async (product) => {
        await axios.delete(`${API_URL}/products/${product.id}`)
        handleCallAPI()
    }

    const handleEditProductName = async (product, newProductName) => {
        await axios.put(`${API_URL}/products/${product.id}`, {
            productName: newProductName
        })
        handleCallAPI();
    }

    return {
        handleCallAPI,
        handleAddNewProduct,
        handleDeleteProduct,
        handleEditProductName,
        products,
        productName,
        productPrice,
        newProductName,
        setIsLoading,
        setNewProductName,
        setProductName,
        setProductPrice,
        isLoading
    }
}
