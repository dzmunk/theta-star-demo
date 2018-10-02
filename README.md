# Todo

- `as T` to TypeScript's non-null assertion (`!`)
- Text fields with range constraints
- Setting a tile as both start and end causes an error
- Grid sizing
- Design (error message, tile and path colors, space between fields)
- Smartphones

# Component Structure

```xml
<App>
  <header>
  <main>
    <PathFinder>
      <GridSetting>
      <TileSetting>
      <GridContainer>
        <div> grid-path-coordinator
          <GridView>
            <TileView> x ?
          <PathView>
      <ButtonContainer>
        Start
        Clear path
        Reset tiles
      <Metrics>
        Cumulative cost
        Total distance
        Number of cells left in the open list
        Number of cells in the closed list
```