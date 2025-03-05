import existingDb from "../src/db/safe-stores.json";

const csvToTextArr = async (path: string, newLineChar = "\r\n") => {
  const file = Bun.file(path);
  const data = await file.arrayBuffer();
  const decoder = new TextDecoder();
  const text = decoder.decode(data);
  return text.split(newLineChar);
};
const rawData = await csvToTextArr("./data/oneiowa.csv");
rawData.shift();
const db = {};
for (const rawBusiness of rawData) {
  const [name, contactInfo] = rawBusiness.split(",");
  const newRecord = {
    contactInfo,
    keywords: [name.toLowerCase()],
  };
  if (existingDb[name]) {
    db[name] = {
      ...existingDb[name],
      ...newRecord,
    };
  }
  db[name] = newRecord;
}
console.log("db", JSON.stringify(db));

Bun.write("src/db/safe-stores.json", JSON.stringify(db));

export {};
