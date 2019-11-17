
const {BigQuery} = require('@google-cloud/bigquery');

const bq = new BigQuery({
  keyFilename: "google-credentials.json",
  projectId: "outrage-classifications",
});
console.log(bq);

const datasetName = "outrage_development";
const tableName = "classifications";

async function parseRows() {
  console.log("ROWS");
  const [rows] = await bq.dataset(datasetName).table(tableName).getRows();

  console.log(typeof(rows))
  rows.forEach(row => console.log(row));
}

async function insertRow(row:object) {
  const response = await bq.dataset(datasetName).table(tableName).insert(row);
  console.log("RESPONSE", response)
}

console.log("---------------------")

insertRow({
  tweet_uuid: "tweet123",
  username: "user123",
  outrage: false,
  classified_at: new Date().toISOString() //.getTime
}).then(function(results){
  console.log("INSERTION RESULTS", results)
})
.catch(function(err){
  console.log("ERR", err)
})

console.log("---------------------")

parseRows()
  .then(function(results){
    console.log("RESULTS", results)
  })
  .catch(function(err){
    console.log("ERR", err)
  })
