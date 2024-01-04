function processForm(){
    const sisi1 = document.forms["hitung-segitiga"]["sisi1"].value;
    const sisi2 = document.forms["hitung-segitiga"]["sisi2"].value;
    const sisi3 = document.forms["hitung-segitiga"]["sisi3"].value;

    let status = true;
    let messagePayload = "";

    let sisi1ValidateRes = validateParam(sisi1, "Sisi <b>a</b>");
    if(sisi1ValidateRes.status === false){
        status = false;
        messagePayload = messagePayload + makeMessageElement(sisi1ValidateRes.message);
    }

    let sisi2ValidateRes = validateParam(sisi2, "Sisi <b>b</b>");
    if(sisi2ValidateRes.status === false){
        status = false;
        messagePayload = messagePayload + makeMessageElement(sisi2ValidateRes.message);
    }

    let sisi3ValidateRes = validateParam(sisi3, "Sisi <b>c</b>");
    if(sisi3ValidateRes.status === false){
        status = false;
        messagePayload = messagePayload + makeMessageElement(sisi3ValidateRes.message);
    }

    if(status === true){
        const sisi1Num = parseFloat(sisi1);
        messagePayload = messagePayload + makeMessageElement(`<b>a</b> = ${sisi1Num}`);

        const sisi2Num = parseFloat(sisi2);
        messagePayload = messagePayload + makeMessageElement(`<b>b</b> = ${sisi2Num}`);

        const sisi3Num = parseFloat(sisi3);
        messagePayload = messagePayload + makeMessageElement(`<b>c</b> = ${sisi3Num}`);

        const isSegitiga = isTriangle(sisi1Num, sisi2Num, sisi3Num);
        if(isSegitiga === false){
            status = false;
            messagePayload = messagePayload + makeMessageElement("Nilai sisi <b>a</b>, sisi <b>b</b>, dan sisi <b>c</b> tidak membentuk segitiga");
        } else {
            let operationType = document.forms["hitung-segitiga"]["operation-type"].value;
            if(operationType === "luas"){
                messagePayload = messagePayload + calculateAreaFullReport(sisi1Num, sisi2Num, sisi3Num);
            } else if(operationType === "keliling"){
                messagePayload = messagePayload + calculatePerimeterFullReport(sisi1Num, sisi2Num, sisi3Num);
            } else {
                messagePayload = makeMessageElement(`Jenis operasi <i>${operationType}</i> tidak diketahui`);
            }
        }
        
    }

    document.getElementById("result").innerHTML = messagePayload;
}

function isTriangle(a, b, c){
    let res = (isNaN(a) || isNaN(b) || isNaN(c)) === false;
    if(res === true){
        let sum = a;
        let max = a;

        sum = sum + b;
        if(b > max){
            max = b;
        }

        sum = sum + c;
        if(c > max){
            max = c;
        }

        res = (sum - max) >= max;
    }

    return res;
}

function validateParam(paramVal, paramName){
    let resStatus = true;
    let resMessage = "sukses";
    let resValue = -1;
    if(paramVal === ""){
        resMessage = `${paramName} tidak boleh kosong`;
        resStatus = false;
    } else if(isNaN(paramVal)){
        resMessage = `${paramName} harus berupa bilangan positif`;
        resStatus = false;
    } else {
        let paramFloat = parseFloat(paramVal);
        if(paramFloat <= 0){
            resMessage = `Panjang ${paramName} harus lebih besar dari 0`;
            resStatus = false;
        } else {
            resValue = paramFloat;
        }
    }

    let res = {status: resStatus, value: resValue, message: resMessage};
    return res;
}

function makeMessageElement(message){
    return `<p class="text response">${message}</p>`
}

function calculatePerimeter(a, b, c){
    return a + b + c;
}

function calculatePerimeterHTML(a, b, c){
    messagePayload = makeMessageElement("<b>K</b> = <b>a</b> + <b>b</b> + <b>c</b>");
    messagePayload += makeMessageElement(`<b>K</b> = ${a} + ${b} + ${c}`);

    const perim = calculatePerimeter(a, b, c);
    messagePayload += makeMessageElement(`<b>K</b> = ${perim}`);

    const res = {value: perim, htmlPayload: messagePayload};
    return res;
}

function calculatePerimeterFullReport(a, b, c){
    const perimPayload = calculatePerimeterHTML(a, b, c);
    let perimHTML = perimPayload.htmlPayload;
    const perimVal = perimPayload.value;

    perimHTML += makeMessageElement(`Keliling segitiga berikut adalah ${perimVal}`);
    return perimHTML;
}

function calculateArea(a, b, c){
    let perimeter = calculatePerimeter(a, b, c);
    let halfPerim = perimeter / 2.0;
    let area = Math.sqrt(halfPerim * (halfPerim - a) * (halfPerim - b) * (halfPerim - c));
    return area;
}

function calculateAreaFullReport(a, b, c){
    const perimPayload = calculatePerimeterHTML(a, b, c);
    const perimHTML = perimPayload.htmlPayload;
    const perimVal = perimPayload.value;

    let messagePayload = perimHTML;
    messagePayload += makeMessageElement("<b>S</b> = <b>K</b> / 2");
    messagePayload += makeMessageElement(`<b>S</b> = ${perimVal} / 2`);

    let halfPerim = perimVal / 2.0;
    messagePayload += makeMessageElement(`<b>S</b> = ${halfPerim}`);

    messagePayload += makeMessageElement("<b>L</b> = sqrt(<b>S</b> * (<b>S</b> - <b>a</b>) * (<b>S</b> - <b>b</b>) * (<b>S</b> - <b>c</b>))");
    messagePayload += makeMessageElement(`<b>L</b> = sqrt(${halfPerim} * (${halfPerim} - ${a}) * (${halfPerim} - ${b}) * (${halfPerim} - ${c})`);

    const halfPerimMinA = halfPerim - a;
    const halfPerimMinB = halfPerim - b;
    const halfPerimMinC = halfPerim - c;

    messagePayload += makeMessageElement(`<b>L</b> = sqrt(${halfPerim} * ${halfPerimMinA} * ${halfPerimMinB} * ${halfPerimMinC}`);

    const areaProduct = halfPerim * halfPerimMinA * halfPerimMinB * halfPerimMinC;
    messagePayload += makeMessageElement(`<b>L</b> = sqrt(${areaProduct})`);

    const areaFinal = Math.sqrt(areaProduct);
    messagePayload += makeMessageElement(`<b>L</b> = ${areaFinal}`);
    messagePayload += makeMessageElement(`Luas segitiga berikut adalah ${areaFinal}`);

    return messagePayload;
}