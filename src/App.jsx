import { List } from "./components/List"


export function App() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-black mt-4">Rick And Morty Search</h1>
      <List/>
    </div>
  )
}


export default App
