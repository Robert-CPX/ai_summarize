import { Captain, Lieutenant } from "./components"

const App = () => {
  return (
    <div>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Captain />
        <Lieutenant />
      </div>
    </div>
  )
}

export default App