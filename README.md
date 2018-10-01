# Todo

`as T` to TypeScript's non-null assertion (`!`)

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
        Number of cells stepped on
        Number of cells left in the open list
        Number of cells in the closed list
```