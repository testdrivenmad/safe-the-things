import { ListItem, Stack, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import rawObj from "./db/safe-stores.json";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import React from "react";

const storeDb = new Map();
const storeNameCache: string[] = [];
const keywordToStoreNameCache = new Map<string, string[]>();
Object.entries(rawObj).forEach(([name, metadata]) => {
  storeNameCache.push(name);
  storeDb.set(name, metadata);
  for (const keyword of metadata.keywords) {
    if (keywordToStoreNameCache.has(keyword)) {
      keywordToStoreNameCache.get(keyword)!.push(name);
    } else {
      keywordToStoreNameCache.set(keyword, [name]);
    }
  }
});

const rowRenderer = (props: ListChildComponentProps) => {
  const name = props.data[props.index];
  return (
    <ListItem key={name} style={props.style}>
      {name}
    </ListItem>
  );
};
function App() {
  const [filteredStores, setFilteredStores] = React.useState(storeNameCache);

  return (
    <Paper sx={{ width: "100%", height: "600px" }} elevation={8}>
      <Stack direction={"column"}>
        <TextField
          onChange={(event) => {
            if (event.target.value === undefined)
              setFilteredStores(storeNameCache);
            else {
              const searchTerm = event.target.value.trim().toLowerCase();

              const newFilteredStores = new Set<string>();
              keywordToStoreNameCache.forEach((businesses, keyword) => {
                if (keyword.includes(searchTerm)) {
                  businesses.forEach((business) =>
                    newFilteredStores.add(business),
                  );
                }
              });
              setFilteredStores([...newFilteredStores.values()]);
            }
          }}
        ></TextField>
        <FixedSizeList
          height={400}
          itemSize={30}
          itemData={filteredStores}
          itemCount={filteredStores.length}
          width={"100%"}
          overscanCount={30}
        >
          {rowRenderer}
        </FixedSizeList>
      </Stack>
    </Paper>
  );
}

export default App;
