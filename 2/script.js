const VARIANT = 9;

const SIZE = 6;
const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorPicker");
document.getElementById("variantLabel").textContent = VARIANT;

let n = 1;
for (let r = 0; r < SIZE; r++) {
  const tr = document.createElement("tr");
  for (let c = 0; c < SIZE; c++) {
    const td = document.createElement("td");
    td.textContent = n;
    td.dataset.value = String(n);
    td.dataset.row = String(r);
    td.dataset.col = String(c);

    if (n === VARIANT) td.classList.add("variant");

    tr.appendChild(td);
    n++;
  }
  grid.appendChild(tr);
}

function randomColor() {
  const rand = () => Math.floor(60 + Math.random() * 195);
  return `rgb(${rand()}, ${rand()}, ${rand()})`;
}

function isVariantCell(td) {
  return td?.tagName === "TD" && Number(td.dataset.value) === VARIANT;
}

grid.addEventListener("mouseover", (e) => {
  const td = e.target.closest("td");
  if (!isVariantCell(td)) return;
  td.style.backgroundColor = randomColor();
});

grid.addEventListener("click", (e) => {
  const td = e.target.closest("td");
  if (!isVariantCell(td)) return;
  td.style.backgroundColor = colorPicker.value;
});

grid.addEventListener("dblclick", (e) => {
  const td = e.target.closest("td");
  if (!isVariantCell(td)) return;

  const startRow = Number(td.dataset.row);
  const col = Number(td.dataset.col);
  const color = colorPicker.value;

  for (let r = startRow; r < SIZE; r += 2) {
    grid.rows[r].cells[col].style.backgroundColor = color;
  }
});
