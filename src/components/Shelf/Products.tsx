import { useQuery, gql } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import './index.css'

const GET_PRODUCTS = gql`
  query GET_PRODUCTS($input: SendRegionalizationInput!) {
    storeRegionalization(input: $input) {
      name
      address
      neighborhood
      city
      state
      postalCode
      hour
      products {
        id
        image
        name
        listPrice
        price
        installments
      }
    }
  }
`

type Product = {
  id: string
  image: string
  name: string
  listPrice: number
  price: number
  installments: number
}

type ProductsData = {
  products: Product[]
}

export default function Products() {
  const dispatch = useDispatch()
  const dataInfo = useSelector(state => (state as any).data)

  const { loading, error, data } = useQuery<ProductsData>(GET_PRODUCTS, {
    variables: {
      input: {
        email: 'teste@hotmail.com',
        state: 'SP'
      }
    }
  })

  useEffect(() => {
    if (!data) {
      return
    }
    dispatchState(data)
  }, [data])

  function dispatchState(data: any) {
    dispatch({ type: 'ADD_STATE', payload: data })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>
  if (!data) return <p>{data}</p>

  return (
    <div className="product-list">
      {dataInfo?.storeRegionalization.products.map((product: any) => (
        <div className="product-card">
          <img width={220} src={product.image} alt={product.name} />
          <h2 className="product-name">{product.name}</h2>
          <span className="list-price">R$ {product.listPrice}</span>
          <span className="price-product">R$ {product.price}</span>
          <span className="info-price">
            à vista no pix ou cartão de crédito
          </span>
          <span className="spot-price">
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.1591 0.75H2.84091C1.96227 0.75 1.25 1.44956 1.25 2.3125V11.6875C1.25 12.5504 1.96227 13.25 2.84091 13.25H17.1591C18.0377 13.25 18.75 12.5504 18.75 11.6875V2.3125C18.75 1.44956 18.0377 0.75 17.1591 0.75Z"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.25 5.4375H18.75"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {product.listPrice} em até {product.installments}x de{' '}
            {product.price / product.installments}
          </span>
          <button className="add-to-cart">Adicionar ao carrinho</button>
        </div>
      ))}
    </div>
  )
}
