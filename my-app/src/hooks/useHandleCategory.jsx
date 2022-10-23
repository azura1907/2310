import { useState, useEffect } from 'react'
import axios from 'axios'
export default function useHandleCategory(searchCategoryKeyword) {
    const API_URL = 'https://6354e3cbda523ceadcf5bc6b.mockapi.io'
    const [productsByCategory, setProducts] = useState([])
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const handleCallAPICategory = async () => {
        setIsLoading(true)
        // ở đây phải tạo URLSearchParams mới -> để xài cho params ở dưới axios
        const queryParam = new URLSearchParams(
            {
                search: searchCategoryKeyword
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
        const callAPITimeOut = setTimeout(handleCallAPICategory, 2000)
        //nên clear timeout sau mỗi lần chạy
        //đặt const ra để clear
        //cleartimeout sẽ đầu tiên ở lần thứ 2 của useEffect

        return () => {
            clearTimeout(callAPITimeOut)
        }

    }, [API_URL, searchCategoryKeyword])

    return {
        handleCallAPICategory,
        productsByCategory,
        productName,
        productPrice,
        isLoading
    }
}