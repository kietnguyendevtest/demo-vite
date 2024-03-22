
import { useRouteElements } from "./hooks"

function App() {
   const routeElements = useRouteElements();

   return (
      <>
         {routeElements}
      </>
   )
}

export default App
