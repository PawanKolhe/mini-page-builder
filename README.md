# Mini Page Builder

![GIF](https://user-images.githubusercontent.com/8324407/115931575-f95cc680-a4a8-11eb-8f1f-cc5e839fc47c.gif)

## ⭐ Features

- Drag and Drop elements from sidebar to board
- Edit element configuration
- Delete element from board
- Element position can be changed by dragging it across the board
- Board Elements state stored on Local Storage to persist state across page refresh

## 💻 Tech / Libraries

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [react-draggable](https://github.com/react-grid-layout/react-draggable) (dragging elements within the board)
- [react-drag-drop-container](https://github.com/peterh32/react-drag-drop-container) (dragging elements from sidebar to board)
- [ESLint](https://eslint.org/) (maintaining coding style)
- [Prettier]() (automatically enforcing coding style)
- [uuid](https://github.com/uuidjs/uuid) (generating unique ID for each element)
- [Iconify](https://www.npmjs.com/package/@iconify/react-with-api) (icons)

## 🕹 Usage

1. Drag and Drop Elements from Sidebar to the Board.

   ![Screenshot1](https://user-images.githubusercontent.com/8324407/115888565-b252df00-a470-11eb-8d1c-92582bbdb5bf.png)

1. Drag the Elements on the board to change their position.

1. Click on an element on the board to select it.

1. Pressing `Delete` on keyboard will delete the element from the board.

1. Pressing `Enter` on keyboard will open a modal where you can edit element configurations.

1. Edit Element configurations (Text, X, Y, Font Size, Font Weight) and click `Save Changes` to update element state.

   ![Screenshot2](https://user-images.githubusercontent.com/8324407/115888757-e928f500-a470-11eb-9e21-109c530bbfc5.PNG)


## 🔧 Local Environment Setup

1. Install [Node.js](https://nodejs.org/en/)
1. Install project dependencies
   ```bash
   npm install
   ```
1. Launch live server
   ```bash
   npm run start
   ```

## 📝 Documentation

### Style Guide

- React code follows the [airbnb/javascript](https://github.com/airbnb/javascript) style guidelines to maintain consistency in a collaborative environment.

- CSS classnames adhere to the [BEM](http://getbem.com/) methodology.

### Directory Structure

```markdown
📦src
 ┣ 📂components
 ┃ ┣ 📂Board
 ┃ ┃ ┣ 🎨board.module.scss
 ┃ ┃ ┗ 📜Board.tsx
 ┃ ┣ 📂ElementItem
 ┃ ┃ ┣ 🎨elementItem.module.scss
 ┃ ┃ ┗ 📜ElementItem.tsx
 ┃ ┣ 📂ElementList
 ┃ ┣ 📂Elements
 ┃ ┃ ┣ 📂Button
 ┃ ┃ ┣ 📂Input
 ┃ ┃ ┣ 📂Label
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂ElementWrapper
 ┃ ┣ 📂FormButton
 ┃ ┣ 📂FormInput
 ┃ ┣ 📂Modal
 ┃ ┗ 📂Sidebar
 ┣ 📂pages
 ┃ ┣ 🎨home.module.scss
 ┃ ┗ 📜Home.tsx
 ┣ 📂sassStyles
 ┃ ┣ 🎨index.scss
 ┃ ┣ 🎨_global.scss
 ┃ ┣ 🎨_typography.scss
 ┃ ┗ 🎨_variables.scss
 ┣ 📂types
 ┃ ┗ 📜element.tsx
 ┣ 🎨App.scss
 ┣ 📜App.tsx
 ┣ 📜externals.d.ts
 ┗ 📜index.tsx
```

- `components/` - all components that are not pages
- `pages/` - components with a defined route
- `sassStyles/` - global Sass stylesheets
- `types/` - commonly used typescript type definitions
- `externals.d.ts` - type definitions of external libraries that don't have @types
- `index.tsx` - entry point of application

### Components Tree
```markdown
⚫️App
 ┗ 🟣Home
   ┣ 🟡DropTarget
   ┃ ┗ 🔵Board
   ┃   ┣ 🟠ElementWrapper
   ┃   ┃ ┗ 🟡Draggable
   ┃   ┃   ┣ 🟠Label
   ┃   ┃   ┣ 🟠Input
   ┃   ┃   ┗ 🟠Button
   ┃   ┗ 🔵Modal
   ┃     ┣ 🟠FormInput
   ┃     ┗ 🟠FormButton
   ┗ 🔵Sidebar
     ┗ 🔵ElementList
       ┗ 🟡DragDropContainer
         ┗ 🟠ElementItem

🟣 --> Page
🟡 --> External library
🔵 --> Single-use component
🟠 --> Multi-use component
```

- There is only 1 page in the app i.e. **Home** component.
- **Home** has two components: **Board** and **Sidebar**
- **Sidebar** contains **ElementList** component which contains **ElementItem** wrapped in **DragDropContainer** from the `react-drag-drop-container` library which makes dragging and dropping elements to the board easier as we can pass it data that will be directly received by **DropTarget** component (which is wrapped around the **Board** component) on drop. The data being passed between **DragDropContainer** and **DropTarget** will contain information about which element needs to be created on the board (Label, Input, or Button).
- **Board** holds the elements state on the board and handles logic related to *adding*, *updating*, and *deleting* elements on the board.
- Everytime the elements state is updated, a useEffect hook stores the elements state to the local storage.
- **Board** also contains the **Modal** component which is used to edit element configuration.
- Each element on the board (i.e. Label, Input, or Button) is wrapped with the **Draggable** component from the `react-draggable` library, which in turn is wrapped with the **ElementWrapper** component which handles logic related to triggering updates to element position on drag and selecting the element on click.
