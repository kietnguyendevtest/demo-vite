import { createContext, useState } from 'react'
import { getAccessTokenFromLS } from '~/utils'

interface AppContextInterface {
   isAuthenticated: boolean
   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
   reset: () => void
}

const initialAppContext: AppContextInterface = {
   isAuthenticated: Boolean(getAccessTokenFromLS()),
   setIsAuthenticated: () => null,
   reset: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)

   const reset = () => {
      setIsAuthenticated(false);
      localStorage.clear();
   }

   return (
      <AppContext.Provider
         value={{
            isAuthenticated,
            setIsAuthenticated,
            reset
         }}
      >
         {children}
      </AppContext.Provider>
   )
}
