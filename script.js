

let i=30;
let j=3;
let c=0;
document.write("<div style=' margin:20px; display:grid; grid-template-columns: repeat(5, 1fr); '>");
while(i>=8){
    if(c==5){
        i-=2;
        c=0;
    }
    document.write("<span style='margin:20px auto; font-size:"+i+"px'>"+String.fromCharCode(65+j)+" "+i+"</span>");
    j=(j+4)%26;
    c++
    
}
document.write("</div>");