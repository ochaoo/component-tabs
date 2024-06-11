import './App.scss'
import AppRouter from './AppRouter'
import TabsContainer from './components/TabsContainer/TabsContainer'

const App = () => {
    return (
        <>
            <TabsContainer />
            <div className="app">
                <div className="content">
                    <AppRouter />
                </div>
            </div>
        </>
    )
}

export default App
