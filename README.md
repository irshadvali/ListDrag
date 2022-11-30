# ListDrag
## Features
- Drag and drop items on first item view
- Using PanResponder for drag and drop
- Showing list in FlatList and create a Card for showing items and implement drag and drop on card
- First item is not draggable , because other items will drag on first items.
- When we when item will start to drag on first item that time we are showing one FALSE ITEM VIEW in the place of first item.
 # ------------Why showing FALSE ITEM VIEW --------#
 - Because when we started drag that time Flat list scrollview will not work.
 - if we will use autoscroll than drag and drop will not work.

 ## Files
  - App.js -> here we are import other files for navigation
  - HomeFour.js ---> here using FlatList to show data
  - Card.js ---> Here style for card and logic for drag and drop
  - NextPage.js

  ## Drag and drop
  - Using PanResponder APIs
  - and drop file on first items of data , here we are calculate moveX and moveY, (It will calcualte according to your drop zone)
  - if it will get proper moveX and moveY value (Drop zone), we drop item and it will navigate to next page(Nextpage.js)
  - if it will not get proper drop zone and you drop than it drop item will go to own position

  ## NPM package
    ```sh
       "@react-native-community/masked-view": "^0.1.11",
        "react": "17.0.2",
        "react-native": "0.68.2",
        "react-native-gesture-handler": "^2.8.0",
        "react-native-reanimated": "^2.13.0",
        "react-native-safe-area-context": "^4.4.1",
        "react-native-screens": "^3.18.2",
        "react-navigation": "^4.4.4",
        "react-navigation-stack": "^2.10.4",
    ```

## How to use above file
- create react native project
- inastll all above npm package
- raplace App.js file with above App.js file
- copy src folder in you project
- run your project
