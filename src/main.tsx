import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { AppProvider } from './contexts/app-context'
import App from './app'

// create once with default options
const queryClient = new QueryClient()
const container = document.getElementById('root')
const root = ReactDOM.createRoot(container!)

root.render(
   <React.StrictMode>
      <BrowserRouter>
         <QueryClientProvider client={queryClient}>
            <AppProvider>
               <App />
               <ReactQueryDevtools initialIsOpen={false} />
            </AppProvider>
         </QueryClientProvider>
      </BrowserRouter>
   </React.StrictMode >,
)
