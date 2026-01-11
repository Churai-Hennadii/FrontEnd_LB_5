function Formdata(data) {
  const boxes = ["f_pib", "f_group", "f_variant", "f_faculty", "f_bdate"];
  boxes.forEach(id => {
    const box = document.getElementById(id);
    if (box) box.classList.remove("error");
  });

  function fail(boxId, msg) {
    const box = document.getElementById(boxId);
    if (box) box.classList.add("error");
    alert(msg);
    return false;
  }

  const pibVal = (data.pib && data.pib.value) ? data.pib.value.trim() : "";
  if (pibVal.length === 0) return fail("f_pib", 'Заповніть поле "ПІБ"');
  const pibRe = /^[А-ЯІЇЄҐA-Z][а-яіїєґa-z’'’-]+(?:\s+[А-ЯІЇЄҐA-Z][а-яіїєґa-z’'’-]+)?\s+[А-ЯІЇЄҐA-Z]\.[А-ЯІЇЄҐA-Z]\.$/u;
  if (!pibRe.test(pibVal)) return fail("f_pib", 'ПІБ введено невірно. Приклад: "Власюк В.А."');

  const groupVal = (data.group && data.group.value) ? data.group.value.trim() : "";
  if (groupVal.length === 0) return fail("f_group", 'поле "Група" пусте');
  const groupRe = /^[A-Za-zА-ЯІЇЄҐа-яіїєґ]{2}-\d{2}$/u;
  if (!groupRe.test(groupVal)) return fail("f_group", 'Групу вказано невірно. Приклад: "ІТ-72" або "IT-72"');

  const variantVal = (data.variant && data.variant.value !== undefined) ? String(data.variant.value).trim() : "";
  if (variantVal.length === 0) return fail("f_variant", 'поле "Варіант" пусте');
  const varRe = /^\d{1,2}$/;
  if (!varRe.test(variantVal)) return fail("f_variant", '"Варіант" введено невірно (потрібні цифри)');

  const facultyVal = (data.faculty && data.faculty.value) ? data.faculty.value.trim() : "";
  if (facultyVal.length === 0) return fail("f_faculty", 'поле "Факультет" пусте');
  const facultyRe = /^[A-Za-zА-ЯІЇЄҐа-яіїєґ]{4}$/u;
  if (!facultyRe.test(facultyVal)) return fail("f_faculty", '"Факультет" введено невірно (рівно 4 літери)');

  const bdateVal = (data.bdate && data.bdate.value) ? data.bdate.value.trim() : "";
  if (bdateVal.length === 0) return fail("f_bdate", 'поле "Дата народж." пусте');
  const bdateRe = /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(19\d{2}|20\d{2})$/;
  if (!bdateRe.test(bdateVal)) return fail("f_bdate", 'Дата введена невірно. Приклад: "31.12.2004"');

  const [ddS, mmS, yyS] = bdateVal.split(".");
  const dd = Number(ddS), mm = Number(mmS), yyyy = Number(yyS);
  const d = new Date(yyyy, mm - 1, dd);
  const real = d.getFullYear() === yyyy && (d.getMonth() + 1) === mm && d.getDate() === dd;
  if (!real) return fail("f_bdate", "Такої дати не існує");

  document.getElementById("out_pib").textContent = pibVal;
  document.getElementById("out_group").textContent = groupVal;
  document.getElementById("out_variant").textContent = variantVal;
  document.getElementById("out_faculty").textContent = facultyVal;
  document.getElementById("out_bdate").textContent = bdateVal;

  return false;
}

