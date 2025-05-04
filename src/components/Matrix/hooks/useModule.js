import { useState, useMemo } from 'react'
import Module from './module'

export function useModule() {
  const [modules, setModule] = useState([])

  function addBoxInNewGroupModule() {
    setModule(new Module(modules).newGroup().modules)
  }

  function addBoxToStack(group, hstack, vstack) {
    setModule(new Module(modules).newBox(group, hstack, vstack).modules)
  }

  function addStackToGroupModule(group) {
    setModule(new Module(modules).newStack(group).modules)
  }

  const orderedModules = useMemo(() => {
    return modules.map((group) => {
      return group.sort((a, b) => a.pos_y - b.pos_y)
    })
  }, [modules])

  return {
    modules,
    addBoxInNewGroupModule,
    orderedModules,
    addBoxToStack,
    addStackToGroupModule,
    setModule, // Avoid to use this function, this is for testing purpose only
  }
}
