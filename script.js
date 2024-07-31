const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";


const select_con = Array.from(document.querySelectorAll("select"));
const result = document.querySelector(".result");
const compute = document.getElementById("btn");
const exchange = document.querySelector("span");


for(let i=0;i<select_con.length;i++){
    for (codes in countryList){
        let op = document.createElement("option");
        op.innerHTML = codes;
        op.innervalue = codes;
        if(codes == "INR"&& select_con[i].name == "from"){
            op.selected = true;
        }
        if(codes == "USD"&& select_con[i].name == "to"){
            op.selected = true;
        }
        select_con[i].append(op);
    }

    select_con[i].addEventListener('change',(event)=>{
        updateflag(event.target);
    });
}

function updateflag(select_ele){
    let code = select_ele.value;
    let cc = countryList[code];
    let img_src = `https://flagsapi.com/${cc}/flat/64.png`;
    let imgi = select_ele.parentElement.querySelector("img");
    imgi.src = img_src;
}

exchange.addEventListener("click",()=>{
    let temp = select_con[0].value;
    select_con[0].value = select_con[1].value;
    select_con[1].value = temp;
    updateflag(select_con[0]);
    updateflag(select_con[1]);
})


async function compute_curr(){
    let input_val = document.getElementById("amount").value;
    let from_val = select_con[0].value.toLowerCase();
    let to_val = select_con[1].value.toLowerCase();
    let newurl = URL + `${from_val}.json`;
    let res = await fetch(newurl);
    let data = await res.json();
    let mul_factor = data[from_val][to_val];
    let ans = input_val * mul_factor;
    final_ans = `${input_val} ${from_val.toUpperCase()} = ${ans} ${to_val.toUpperCase()}<br><br>`;
    result.innerHTML = final_ans;
}


compute.addEventListener("click",()=>{
    compute_curr();
})