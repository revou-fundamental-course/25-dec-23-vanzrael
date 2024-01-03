function processForm(){
    const sisi1 = document.forms["hitung-segitiga"]["sisi1"].value;
    const sisi2 = document.forms["hitung-segitiga"]["sisi2"].value;
    const sisi3 = document.forms["hitung-segitiga"]["sisi3"].value;

    let status = true;
    let messagePayload = "";

    let validateResult = validateParam(sisi1);
    if(validateResult.status === false){
        status = false;
        messagePayload = messagePayload + validateResult.message;
    }

    validateResult = validateParam(sisi2);
    if(validateResult.status === false){
        status = false;
        messagePayload = messagePayload + validateResult.message;
    }

    validateResult = validateParam(sisi3);
    if(validateResult.status === false){
        status = false;
        messagePayload = messagePayload + validateResult.message;
    }

    if(status === true){
        const sisi1Num = parseFloat(sisi1);
        const sisi2Num = parseFloat(sisi2);
        const sisi3Num = parseFloat(sisi3);

        let operationType = document.forms["hitung-segitiga"]["operation-type"].value;
        if(operationType === "luas"){
            const luas = calculateArea(sisi1Num, sisi2Num, sisi3Num);
            messagePayload = `<p>Luas segitiga berikut adalah ${luas}</p>`;
        } else if(operationType === "keliling"){
            const keliling = calculatePerimeter(sisi1Num, sisi2Num, sisi3Num);
            messagePayload = `<p>Keliling segitiga berikut adalah ${keliling}</p>`;
        } else {
            messagePayload = "<p>Jenis operasi tidak diketahui</p>";
        }
    }


    document.getElementById("result").innerHTML = messagePayload;
}

function validateParam(paramVal){
    let res = {status: true, message: "success"};
    return res;
}

function makeErrorMessageElement(message){
    return `<p>${message}</p>`
}

function calculatePerimeter(a, b, c){
    return a + b + c;
}

function calculateArea(a, b, c){
    let perimeter = calculatePerimeter(a, b, c);
    let halfPerim = perimeter / 2.0;
    let area = Math.sqrt(halfPerim * (halfPerim - a) * (halfPerim - b) * (halfPerim - c));
    return area;
}