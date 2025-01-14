

let i=10;
let j=0;
document.write(" <div style='padding:20px auto;display:grid; grid-template-columns: repeat(10, 1fr); '>");
while(i<=100){
    document.write("<span style='font-size:"+i+"px'>"+String.fromCharCode(65+j)+"</span>");
    i+=3;
    j=(j+4)%26;
    
}
document.write("</div>");