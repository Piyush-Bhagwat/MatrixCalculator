// const finalAnsArealEL = $(".finalAnswer")[0];
const finalAnsArealEL = $(".finalAnswer");
const solunAreaEl = $(".solutionArea");
const ansEl = $(".ans");


// var declareing
var a = [[1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]];

var b = [1, 2, 4];

var er = false;

        // functions


function isFilled(){
    for(let i=0; i<9; i++){
        let temp = $(".datVal")[i].value;
        if(temp == ''){
            return false;
        }
    }
    return true;
}

function isFloat(n) {
    return !(n % 1 === 0);
 }

function read(){ //To get the input
    
    let k =0
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            let temp = $(".datVal")[k].value;
            a[i][j]= parseFloat(temp);
            k++
        }
    }

    for(let i=0; i<3; i++){
        let temp = $(".cstVal")[i].value;
        b[i]=parseFloat(temp);
    }
}




function display(color){ //diplays the current equation
   temp =  `
    <div class="eqnContainer">
        

    <div class="matContainer">
        <div class="top-block bl-${color}"></div>
        <div class="bottom-block bl-${color}"></div>
        <table>
    `;
    for(let i=0; i<3; i++){
        temp += `<tr>`;
        for(let j=0; j<3; j++){
            temp += `<td>`;
            if(isFloat(a[i][j])){
                temp+= a[i][j].toFixed(3);
            }
            else{
                temp+=a[i][j];
            }
            temp+=`</td>`;
        }
        temp += `</tr>`;
    }

    temp+=`
            </table>
            </div> X
            <div class="matContainer">
                <div class="top-block bl-${color}"></div>
                <div class="bottom-block bl-${color}"></div>
                    <table>
                        <tr>
                            <td>x</td>
                        </tr>
                        <tr>
                            <td>y</td>
                        </tr>
                        <tr>
                            <td>z</td>
                        </tr>
                    </table>
                </div>
                     =
            `;
    

     temp+=` 
            <div class="matContainer">
                <div class="top-block bl-${color}"></div>
                <div class="bottom-block bl-${color}"></div>
                    <table>`;

    for(let i=0; i<3; i++){
        temp+=`<tr> <td>`;
        if(isFloat(b[i])){
            temp+= b[i].toFixed(3);
        }
        else{
            temp+=b[i];
        }
        temp+=`</td> </tr>`;
    }

    temp+=`         </table>
                </div>
            </div>`

   
    return temp;
}

function rowExc(r1, r2){ //Exchanges 2 row
    let temp = b[r1];
    b[r1] = b[r2];
    b[r2] = temp;

    for(let i=0; i<3; i++){
        temp = a[r1][i];
        a[r1][i] = a[r2][i];
        a[r2][i] = temp; 
    }

    solunAreaEl.append(`R${r1+1} <-> R${r2+1}`)
    solunAreaEl.append(display("light"));
}

function rowSub (r1, r2, val){ //Substract a Row by Other Row with a Constant
    if(val == 0) return;
    for(let i=0; i<3; i++){
        a[r1][i] = a[r1][i] - a[r2][i] * val;
    }
    b[r1] = b[r1]-b[r2]*val;

    solunAreaEl.append(`R${r1+1} = R${r1+1} - R${r2+1} * ${val.toFixed(3)}`);
    solunAreaEl.append(display("light"));
}

function rowDiv( r, val){ //Divides a Row by a num
    if(a[r][r] == 1) return;

    for(let i=0; i<3; i++){
        a[r][i] = a[r][i]/val;
    }

    b[r] = b[r]/val;

    solunAreaEl.append(`R${r+1} = R${r+1}/${val.toFixed(3)}`);
    solunAreaEl.append(display("light"));
}

function error(){ //Used when problem cannot be solved further
    solunAreaEl.html("Sorry this problem cannot be solved!");
    er = true;
}

function checkOne(c){ //to check if we have 1 in the column
    for(let i=c+1; i<3; i++){
        if(a[i][c] == 1){
            return i;
        }                
    }
    return -1;
}

function excForOne(r1){ //If we have one in the colomn we exchange it with diagonal ele
    if(a[r1][r1] == 1) return;

    let r2 = checkOne(r1);
    if (r2 == -1) return;

    rowExc(r1, r2);
}

function removeZero(c){ //To remove 0 from diagonal ele
    if(a[c][c] != 0) return;
    for(i=c+1; i<3; i++){
        if(a[i][c] != 0){ 
            rowExc(c, i);
            return;
        }
    }
    error();
}

function reset(){
    finalAnsArealEL.html("");
    ansEl.html("");
    solunAreaEl.html("");

}

function solve(){ //Main driver func to solve the matrix
    if(!isFilled()){
        alert("Pura to Likh le");
        return;
    }
    read();
    reset();
    finalAnsArealEL.append(display("dark"));

    for(let i=0; i<3; i++){
        excForOne(i);
        removeZero(i);
        if(er) break;
        rowDiv(i, a[i][i]);

        for(let j=0; j<3; j++){
            if(j==i) continue;
            rowSub(j ,i, a[j][i]);
        }
        if(er) break;
    }

    temp = `<h4>x = `; 

    if(isFloat(b[0])){
        temp += b[0].toFixed(3);
    }
    else{
        temp += b[0];
    }

    temp += ", y = ";

    if(isFloat(b[1])){
        temp += b[1].toFixed(3);
    }
    else{
        temp += b[1];
    }

    temp += ", z = ";
    if(isFloat(b[2])){
        temp += b[2].toFixed(3);
    }
    else{
        temp += b[2];
    }

    temp+=`</h4>`;

    ansEl.append(temp);


    solunAreaEl.append(temp);
}
