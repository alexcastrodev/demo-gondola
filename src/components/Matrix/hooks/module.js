export default class Module {
  modules = []
  constructor(modules) {
    this.modules = [...modules]
  }
  newGroup() {
    this.modules.push([
      // GROUP
      [ // HSTACK
        {
          settings: {},
          boxes: [ // VSTACK
            {
              // New box
              pos_x: 0,
              pos_y: 0,
              data: {},
            },
          ]
        }  
        
      ],
    ])

    return this
  }

  getMaxXFromGroup(group) {
    let highestX = -1

    for (const hstack of this.modules[group]) {
      for (const vstacks of hstack) {
        // Instead loop all vstacks
        // Does not matter how much vstack we have
        // we just need the current x
        if (vstacks.boxes[0]['pos_x'] > highestX) {
          highestX = vstacks.boxes[0]['pos_x']
        }
      }
    }

    return highestX
  }

  newStack(group) {
    const newModule = { data: {} }
    const currentGroup = this.modules[group]

    if (!currentGroup) {
      console.error('Group index out of bounds')
      return this
    }

    const maxX = this.getMaxXFromGroup(group)
    newModule.pos_x = maxX + 1
    newModule.pos_y = 0

    this.modules[group].push([
      // HSTACK
      {
        settings: {
          spacing: 12
        },
        boxes: [ // VSTACK
          newModule,
        ]
      }
    ])

    return this
  }

  newBox(group, hstack, vstack) {
    const newModule = { data: {} }
    const currentHStack = this.modules[group][hstack]

    if (!currentHStack) {
      console.error('HStack index out of bounds')
      return this
    }

    let currentVStack = currentHStack[vstack]

    if (!currentVStack) {
      console.error('VStack index out of bounds')
      return this
    }

    const maxY = Math.max(...currentVStack.boxes.map((mod) => mod.pos_y), -1)
    newModule.pos_x = 0
    newModule.pos_y = maxY + 1
    currentVStack.boxes.push(newModule)
    currentVStack = currentVStack.boxes.sort((a, b) => b.pos_y - a.pos_y)
    this.modules[group][hstack] = currentHStack

    return this
  }
}
