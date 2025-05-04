import React, { createContext, useContext, useEffect } from 'react'
import { useModule } from './hooks/useModule'

export const MatrixContext = createContext()

const MatrixProvider = ({ children }) => {
  const modules = useModule()

  useEffect(() => {
    const handleMatrixEvents = (event) => {
      if (event.detail.type === 'new-group') {
        modules.addBoxInNewGroupModule()
      }
    }

    document.addEventListener('matrix-events', handleMatrixEvents)

    return () => {
      document.removeEventListener('matrix-events', handleMatrixEvents)
    }
  }, [modules])

  return <MatrixContext.Provider value={{ modules }}>{children}</MatrixContext.Provider>
}

export const useMatrixContext = () => useContext(MatrixContext)

export default MatrixProvider
