# Todo

- Smartphones
- Embed

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
      <TileLegend>
        Plain
        Blocked
        In open list
        In closed list
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