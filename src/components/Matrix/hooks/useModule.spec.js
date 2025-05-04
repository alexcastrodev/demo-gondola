import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useModule } from './useModule'
import Module from './module'

describe('useModule hook', () => {
  it('should initialize with an empty modules array', () => {
    const { result } = renderHook(() => useModule())
    expect(result.current.modules).toEqual([])
  })

  it('should add a new group module with addBoxInNewGroupModule', () => {
    const { result } = renderHook(() => useModule())
    const GROUP = 0
    const VSTACK = 0
    const HSTACK = 0

    act(() => {
      result.current.addBoxInNewGroupModule()
    })

    expect(result.current.modules).toHaveLength(1)
    expect(result.current.modules[GROUP]).toHaveLength(1)
    expect(result.current.modules[GROUP][VSTACK]).toHaveLength(1)
    expect(result.current.modules[GROUP][HSTACK][VSTACK]).toHaveLength(1)
    expect(result.current.modules[GROUP][HSTACK][VSTACK][0]).toHaveProperty('pos_x', 0)
    expect(result.current.modules[GROUP][HSTACK][VSTACK][0]).toHaveProperty('pos_y', 0)
  })

  it('should add a box to an existing stack', () => {
    const { result } = renderHook(() => useModule())
    const GROUP = 0
    const VSTACK = 0
    const HSTACK = 0

    act(() => {
      result.current.addBoxInNewGroupModule()
    })

    act(() => {
      result.current.addBoxToStack(GROUP, HSTACK, VSTACK)
    })
    JSON.stringify(result.current.modules, null, 2)
    expect(result.current.modules).toHaveLength(1)
    expect(result.current.modules[GROUP]).toHaveLength(1)
    expect(result.current.modules[GROUP][VSTACK]).toHaveLength(1)
    expect(result.current.modules[GROUP][HSTACK][VSTACK]).toHaveLength(2)
    expect(result.current.modules[GROUP][HSTACK][VSTACK][0]).toHaveProperty('pos_x', 0)
    expect(result.current.modules[GROUP][HSTACK][VSTACK][0]).toHaveProperty('pos_y', 0)
    expect(result.current.modules[GROUP][HSTACK][VSTACK][0]).toHaveProperty('data', {})
    expect(result.current.modules[GROUP][HSTACK][VSTACK][1]).toHaveProperty('pos_x', 0)
    expect(result.current.modules[GROUP][HSTACK][VSTACK][1]).toHaveProperty('pos_y', 1)
    expect(result.current.modules[GROUP][HSTACK][VSTACK][1]).toHaveProperty('data', {})
  })

  it('Should a new stack to an existing group', () => {
    const { result } = renderHook(() => useModule())
    const GROUP = 0
    const VSTACK = 0
    const HSTACK = 0
    const NEW_HSTACK = 1
    const NEW_VSTACK = 0

    act(() => {
      result.current.addBoxInNewGroupModule()
    })

    act(() => {
      result.current.addStackToGroupModule(GROUP)
    })

    expect(result.current.modules).toHaveLength(1)
    expect(result.current.modules[GROUP]).toHaveLength(2)

    expect(result.current.modules[GROUP][HSTACK][VSTACK]).toHaveLength(1)
    expect(result.current.modules[GROUP][HSTACK][VSTACK][0]).toHaveProperty('pos_x', 0)
    expect(result.current.modules[GROUP][HSTACK][VSTACK][0]).toHaveProperty('pos_y', 0)
    expect(result.current.modules[GROUP][HSTACK][VSTACK][0]).toHaveProperty('data', {})
    expect(result.current.modules[GROUP][NEW_HSTACK][NEW_VSTACK][0]).toHaveProperty('pos_x', 1)
    expect(result.current.modules[GROUP][NEW_HSTACK][NEW_VSTACK][0]).toHaveProperty('pos_y', 0)
    expect(result.current.modules[GROUP][NEW_HSTACK][NEW_VSTACK][0]).toHaveProperty('data', {})
  })

  it('Should always add a box on the top of stack', () => {
    const { result } = renderHook(() => useModule())
    const GROUP = 0
    const VSTACK = 0
    const HSTACK = 0

    act(() => {
      result.current.setModule(
        new Module([])
          .newGroup() // Add a new group with a new box
          .newBox(GROUP, HSTACK, VSTACK).modules // add another box
      )
    })

    act(() => {
      result.current.addBoxToStack(GROUP, HSTACK, VSTACK)
    })

    expect(result.current.modules).toHaveLength(1)
    expect(result.current.modules[GROUP][HSTACK][VSTACK]).toHaveLength(3)
  })
})
