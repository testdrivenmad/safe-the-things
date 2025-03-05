const file = Bun.file("./data/oneiowa.csv");
console.log("file size", file.size);
const rawData = await file.arrayBuffer();
const decoder = new TextDecoder();
const text = decoder.decode(rawData);
const textArr = text.split("\r\n");
const db: { name: string; contactInfo: string }[] = [];
textArr.shift();
for (const rawBusiness of textArr) {
  const [name, contactInfo] = rawBusiness.split(",");
  const business = {
    name,
    contactInfo,
  };
  db.push(business);
}

Bun.write("src/db/safe-stores.json", JSON.stringify(db));

export {};
