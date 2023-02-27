import './App.css'
import Header from './components/Header/Header'
import ListState from './components/ListState'
import Modal from './components/Modal/Modal'
import useModal from './components/Modal/useModal'
import { Provider } from 'react-redux'
import store from './store'
import Products from './components/Shelf/Products'

function App() {
  const { isOpen, toggle } = useModal()

  return (
    <Provider store={store}>
      <div className="App">
        <div className="modal">
          <Modal isOpen={!isOpen} toggle={toggle}>
            <ListState toggle={toggle} />
          </Modal>
        </div>
        <header className="App-header">
          <Header />
        </header>
        <div className="container-text">
          <div className="content-title">
            <h1 className="text-shelf">
              Ofertas especiais pra você não perder nada!
            </h1>
            <div className="container-shelf">
              <Products />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  )
}

export default App
