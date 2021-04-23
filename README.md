# Mini Page Builder

![Screenshot](https://user-images.githubusercontent.com/8324407/115888804-f514b700-a470-11eb-9fcc-3a441b635a0f.png)

## Features

- Drag and Drop elements to the board
- Board Elements state stored on Local Storage to persist state across page refresh

## Tech / Libraries

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [react-draggable](https://github.com/react-grid-layout/react-draggable) (dragging elements on the board)
- [react-drag-drop-container](https://github.com/peterh32/react-drag-drop-container) (dragging elements from sidebar to board)
- [ESLint](https://eslint.org/) (maintaining coding style)
- [Prettier]() (automatically enforcing coding style)
- [airbnb/javascript](https://github.com/airbnb/javascript) (style guide)
- [uuid](https://github.com/uuidjs/uuid) (generating unique ID for each element)

## Usage

1. Drag and Drop Elements from Sidebar to the Board.

   ![Screenshot1](https://user-images.githubusercontent.com/8324407/115888565-b252df00-a470-11eb-8d1c-92582bbdb5bf.png)

1. Drag the Elements on the board to change their position.

1. Click on an element on the board to select it.

1. Pressing `Delete` on keyboard will delete the element from the board.

1. Pressing `Enter` on keyboard will open a modal where you can edit element configurations.

1. Edit Element configurations (Text, X, Y, Font Size, Font Weight) and click `Save Changes` to update element state.

   ![Screenshot2](https://user-images.githubusercontent.com/8324407/115888757-e928f500-a470-11eb-9e21-109c530bbfc5.PNG)

## Documentation

### Directory Structure

```markdown
📦src
 ┣ 📂components
 ┃ ┣ 📂Board
 ┃ ┃ ┣ 📜board.module.scss
 ┃ ┃ ┗ 📜Board.tsx
 ┃ ┣ 📂ElementItem
 ┃ ┃ ┣ 📜elementItem.module.scss
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
 ┃ ┣ 📜home.module.scss
 ┃ ┗ 📜Home.tsx
 ┣ 📂sassStyles
 ┃ ┣ 📜index.scss
 ┃ ┣ 📜_global.scss
 ┃ ┣ 📜_typography.scss
 ┃ ┗ 📜_variables.scss
 ┣ 📂types
 ┃ ┗ 📜element.tsx
 ┣ 📜App.scss
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

### Components Structure
