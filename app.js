console.log("Hello Back to School!");
let viz;
//1. Create a variable to store the vizContainer
//2. Create a variable to store the dashboard options
//3. Create a variable to the URL - if it does not load, might need to specify height and width

const containerDiv = document.getElementById("vizContainer");
const options = {
  device: "desktop",
  height: "900px",
  width: "1100px",
};
const url =
  "https://public.tableau.com/views/Embedding/Embeddingexample?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link";
function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}
document.addEventListener("DOMContentLoaded", initViz);
const exportpdfbutton = document.getElementById("exportPDF");
exportpdfbutton.addEventListener("click", exportPDFfunction);
function exportPDFfunction() {
  viz.showExportPDFDialog();
}
document.addEventListener("DOMContentLoaded", initViz);
const exportpptbutton = document.getElementById("exportPowerPoint");
exportpptbutton.addEventListener("click", exportPowerPointfunction);
function exportPowerPointfunction() {
  viz.showExportPowerPointDialog();
}
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  //need to get the active sheet but this could be a dashboard or worksheet
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  // inspect the sheets you need to filter
  console.log(sheets);
  // index of the sheets you want to filter
  const sheetToFilter = sheets[0];
  //do the filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alter("viz filtered"));
}
document
  .getElementById("FilterButton")
  .addEventListener("click", getRangeValues);
