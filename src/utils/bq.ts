
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

parseRows()
  .then(function(results){
    console.log("RESULTS", results)
  })
  .catch(function(err){
    console.log("ERR", err)
  })
