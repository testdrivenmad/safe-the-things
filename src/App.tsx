import { ListItem, Stack, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import storeDb from "./db/safe-stores.json";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import React from "react";

const rowRenderer = (props: ListChildComponentProps) => {
  const name = props.data[props.index].name;
  return (
    <ListItem key={name} style={props.style}>
      {name}
    </ListItem>
  );
};
function App() {
  const [filteredStores, setFilteredStores] = React.useState(storeDb);
  return (
    <Paper sx={{ width: "100%", height: "600px" }} elevation={8}>
      <Stack direction={"column"}>
        <TextField
          onChange={(event) => {
            if (event.target.value === undefined) setFilteredStores(storeDb);
            else {
              const newFilteredStores = storeDb.filter(({ name }) =>
                name.includes(event.target.value),
              );
              setFilteredStores(newFilteredStores);
            }
          }}
        ></TextField>
        <FixedSizeList
          height={400}
          itemSize={30}
          itemData={filteredStores}
          itemCount={filteredStores.length}
          width={300}
          overscanCount={30}
        >
          {rowRenderer}
        </FixedSizeList>
      </Stack>
    </Paper>
  );
}

export default App;
