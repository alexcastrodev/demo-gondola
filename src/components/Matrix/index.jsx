import MatrixProvider, { useMatrixContext } from './Provider'

export function Matrix() {
  const {
    modules: { orderedModules },
  } = useMatrixContext()

  return (
    <div className="flex">
      {orderedModules.map((hstacks, group) => (
        <RenderGroup key={group} group={group} hstacks={hstacks} />
      ))}
    </div>
  )
}

function RenderGroup({ hstacks, group }) {
  return (
    <div className="group">
      {hstacks.map((vstacks, hStackIndex) => (
        <RenderHStack key={hStackIndex} group={group} vstacks={vstacks} hstack={hStackIndex} />
      ))}
    </div>
  )
}

function RenderHStack({ group, vstacks, hstack }) {
  return (
    <div className="hstack">
      {vstacks.map((boxWrapper, vStackIndex) => (
        <RenderVStack key={vStackIndex} group={group} boxes={boxWrapper.boxes} hstack={hstack} vstack={vStackIndex} />
      ))}
    </div>
  )
}

function RenderVStack({ group, boxes, hstack, vstack }) {
  return (
    <div className="vstack">
      <ControlAddStack group={group} />

      {boxes.map((product, productIndex) => (
        <RenderBox key={productIndex} product={product} group={group} hstack={hstack} vstack={vstack} />
      ))}
    </div>
  )
}

function RenderBox({ product, group, hstack, vstack }) {
  return (
    <div data-map-group={group} data-map-x={`${product.pos_x}`} data-map-y={`${product.pos_y}`} className="box">
      <ControlAddBox group={group} hstack={hstack} vstack={vstack} />
    </div>
  )
}

export function ControlAddStack({ group }) {
  const {
    modules: { addStackToGroupModule },
  } = useMatrixContext()

  function onClick() {
    addStackToGroupModule(group)
  }

  return (
    <button className="control control-add-stack" onClick={onClick}>
      +
    </button>
  )
}

export function ControlAddBox({ group, hstack, vstack }) {
  const {
    modules: { addBoxToStack },
  } = useMatrixContext()

  function onClick() {
    addBoxToStack(group, hstack, vstack)
  }

  return (
    <button className="control control-add-box" onClick={onClick}>
      +
    </button>
  )
}

// This function avoid wrapping Matrix provider to whole app
// avoiding rerender of the whole app
// and only rerendering the Matrix component
export function sendGroupEvent() {
  const event = new CustomEvent('matrix-events', {
    detail: {
      type: 'new-group',
    },
  })
  document.dispatchEvent(event)
}

// Compounding the Provider to the Matrix component
Matrix.Provider = MatrixProvider
