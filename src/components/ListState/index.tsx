import './index.css'
import { useLazyQuery } from '@apollo/client'
import { GET_REGIONALIZATION } from '../../graphql/query'
import { useEffect, useState } from 'react'
import { listStateJson } from './listState'
import IconAddress from '../../assets/icon-address'
import IconPhone from '../../assets/icon-phone'
import IconHour from '../../assets/icon-hour'
import { useDispatch } from 'react-redux'

type ListStateProps = {
  toggle: () => void
}

function ListState({ toggle }: ListStateProps) {
  const [getState, { data }] = useLazyQuery(GET_REGIONALIZATION)
  const [stateSelected, setStateSelected] = useState(false)
  const [stateLocal, setStateLocal] = useState<string | null>(null)

  useEffect(() => {
    if (!data) {
      return
    }

    addState(data)
  }, [addState, data])

  const dispatch = useDispatch()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function addState(data: any) {
    dispatch({ type: 'ADD_STATE', payload: data })
  }

  function toggleState(selectedState: any) {
    dispatch({ type: 'TOGGLE_SELECTED_STATE', payload: selectedState })
  }

  const localStorageData = window.localStorage.getItem('state')

  useEffect(() => {
    if (localStorageData) {
      getState({
        variables: {
          input: {
            email: 'teste@hotmail.com',
            state: 'localStorageData'
          }
        }
      })
    }
  }, [])

  const optionState = (state: string) => {
    setStateLocal(state)

    getState({
      variables: {
        input: {
          email: 'teste@b8.com',
          state
        }
      }
    })
  }

  return (
    <>
      {stateLocal === null && (
        <div className="modal-content">
          <div className="title-modal">
            <span className="title-1">Olá Trainee 😃,</span>
            <span className="title-2"> selecione seu Estado: </span>
          </div>
          <div className="modal-list-contatiner">
            <div className="modal-list-step-1">
              <ul>
                {listStateJson.map(state => (
                  <li
                    className="list-state"
                    onClick={() => optionState(state.sigla)}
                  >
                    {state.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {stateLocal !== null && data && (
        <div className="modal-info">
          <h1 className="title-info-modal">
            Confira as informações da loja do seu Estado e prossiga:{' '}
          </h1>
          <span className="store-title">
            Loja {data.storeRegionalization.city}{' '}
            {data.storeRegionalization.neighborhood}
          </span>
          <div className="container-address">
            <div className="icon-addres">
              <IconAddress />
            </div>
            <div className="content-address">
              <span className="address">
                Endreço: {data.storeRegionalization.address}
              </span>
              <span className="city">
                Bairro: {data.storeRegionalization.neighborhood}
              </span>
              <span className="city">
                Cidade: {data.storeRegionalization.city}
              </span>
              <span className="city">
                CEP: {data.storeRegionalization.postalCode}
              </span>
            </div>
          </div>
          <div className="container-hour">
            <div className="icon-hour">
              <IconHour />
            </div>
            <div className="content-address">
              <span className="info-hour">
                {data.storeRegionalization.hour}
              </span>
            </div>
          </div>
          <div className="container-phone">
            <div className="icon-phone">
              <IconPhone />
            </div>
            <div className="content-addres">
              <span className="info-prohe">(71) 98991-9999</span>
              <span className="info-prohe">0800 0000 0000</span>
            </div>
          </div>
          <div className="button-setModal">
            <button className='button-go-back'
              onClick={() => {
                setStateLocal(null)
                toggleState(false)
                setStateSelected(false)
              }}
            >
              Voltar
            </button>
            <button className='button-proceed'
              onClick={() => {
                toggle()
                toggleState(true)
                setStateSelected(true)
                window.localStorage.setItem('state', stateLocal)
              }}
            >
              Prosseguir
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ListState
