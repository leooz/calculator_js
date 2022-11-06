// reproduire le comportement d'une calculatrice en js avec les boutons dans index.html

const allNumbers = document.querySelectorAll(".key");
let value = document.querySelector(".value");

allNumbers.forEach((number) => {
  if (!isNaN(number.textContent)) {
    console.log(number.textContent);
    number.addEventListener("click", () => {
      if (value.value === "0") value.value = number.textContent;
      else value.value += number.textContent;
    });
  } else {
      number.addEventListener("click", () => {
      if (number.textContent === "C") value.value = "0";
      else if (number.textContent === "=")
        value.value = eval_recode(value.value);
      else {
        if (value.value === "0") value.value = number.textContent;
        else value.value += number.textContent;
      }
    });
  }
});

function eval_recode(str) {
  let res = 0;
  let op = "";
  let opBefore = "";
  let no2Op = false;
  console.log(str);
  for (let index = 0; index < str.length; index++) {
    const element = str[index];
    if (element.match(/[0-9]/) || element === ".") {
        console.log("test");
      op += element;
      no2Op = false;
    }
    if (!no2Op && (element.match(/[\+\-\*\/]/) || index == str.length - 1)) {
      if(!element.match(/[0-9]/)) no2Op = true;
      if (res == 0) {
        if(no2Op && index == 0){
            if(element == "-") op += "-";
            console.log("opfd", op);
        } else {
            console.log("op", op);
            res = parseFloat(op);
        }
      } else {
        console.log(res, op, opBefore);
        if (opBefore || index == str.length - 1) {
            console.log("op : " + op);
          if (opBefore === "+") res += parseFloat(op);
          else if (opBefore === "-") res -= parseFloat(op);
          else if (opBefore === "*") res *= parseFloat(op);
          else if (opBefore === "/") res /= parseFloat(op);
        }
      }
      opBefore = element;
      if(!(no2Op && index == 0)) op = "";
    } else if(no2Op){
        alert("Erreur de saisie");
        return "0";
    }
  }
  console.log(res);
  return res;
}
