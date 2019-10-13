function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  function priority(buf){
    switch(buf){
      case "+": return 2 ; 
      case "-": return 2 ; 
      case "*": return 1 ;
      case "/": return 1 ;
      case "(": return 0;
      case ")": return 0;
    }
  }    
  let buf = "";
  let stack = [];
  flag = false;
  let cn =0;
  let cn2 = 0
  let beforePolish = [];
  let afterPolish = [];
  var re = /\s*;\s*/;
  expr = expr.replace(/\s+/g, '');
  // перевод в нормальный вид строку
  for(let i = 0 ; i < expr.length ; i++){
    switch(expr[i]){
      case "+":if(flag){beforePolish.push(buf);buf="";flag=!flag}buf+=expr[i];beforePolish.push(buf);buf="";break;
      case "-":if(flag){beforePolish.push(buf);buf="";flag=!flag}buf+=expr[i];beforePolish.push(buf);buf="";break;
      case "/":if(flag){beforePolish.push(buf);buf="";flag=!flag}buf+=expr[i];beforePolish.push(buf);buf="";break;
      case "*":if(flag){beforePolish.push(buf);buf="";flag=!flag}buf+=expr[i];beforePolish.push(buf);buf="";break;
      case "(":cn++;if(flag){beforePolish.push(buf);buf="";flag=!flag}buf+=expr[i];beforePolish.push(buf);buf="";break;
      case ")":cn2++;if(flag){beforePolish.push(buf);buf="";flag=!flag}buf+=expr[i];beforePolish.push(buf);buf="";break;
      default:{
        buf+=expr[i];
        if(i+1 ==expr.length){
          beforePolish.push(buf);
        }
        flag = true;
        break;
    }
  }
  }
  if(cn != cn2){
    throw "ExpressionError: Brackets must be paired";
  }
  for(let i = 0 ; i < beforePolish.length;i++){
  if(beforePolish[i] == " "){
    beforePolish.splice(i,1);
    continue;
  }
  }
  beforePolish.push("|")
  
  // блок создания польской нотации
  let k;
  for(let i = 0 ; i < beforePolish.length ; i++){
  
     if(beforePolish[i] == "|")
     {
        for(let j = 0 ; j <= stack.length ; j++){
          afterPolish.push(stack.pop());
        }
      }
    if(beforePolish[i] != "*" && beforePolish[i] != "+" && beforePolish[i] != "-" && beforePolish[i] != "(" && beforePolish[i] != ")" && beforePolish[i] != "/" && beforePolish[i] != "|"){
      afterPolish.push(beforePolish[i]);
      continue;
    }
    else{
     
      if(beforePolish[i] == "(")
      {
        
        stack.push(beforePolish[i]);  
        
        continue;
      }
      if(beforePolish[i] == ")"){
        for(;;){
          
          k = stack.pop();
          if(k=="(")break;
          else{
            afterPolish.push(k);
          }
        }
          continue
        }
      
     if(stack.length == 0){
       stack.push(beforePolish[i]);
       continue;
     }
     
      if(priority(beforePolish[i]) >= priority(stack[stack.length-1]) && stack[stack.length-1]!="("){
            afterPolish.push(stack.pop());
            while(true){
              if(priority(beforePolish[i]) >= priority(stack[stack.length-1]) && stack[stack.length-1]!="("){
                afterPolish.push(stack.pop());
              }
              else{
                stack.push(beforePolish[i]);
                break;
              }
  
  
            }
          
        continue;
      }
      
      else{
        stack.push(beforePolish[i]);
        continue;
      }
     
    }
     
  }
  stack = [];
  let buffer ;
  for(let i = 0 ; i < afterPolish.length ; i++){
  if(afterPolish[i] != "*" && afterPolish[i] != "+" && afterPolish[i] != "-" && afterPolish[i] != "(" && afterPolish[i] != ")" && afterPolish[i] != "/"){
      stack.push(Number(afterPolish[i]));
     
      continue;
    }
    else{
      if(afterPolish[i]=="*"){
        buffer = stack[stack.length-1]*stack[stack.length-2];
        stack.pop();
        stack.pop();
        stack.push(buffer)
      
        
      }
      if(afterPolish[i]=="-"){
        buffer = stack[stack.length-2] - stack[stack.length-1];
        stack.pop();
        stack.pop();
        stack.push(buffer)
      
      }
      if(afterPolish[i]=="+"){
        buffer = stack[stack.length-1]+stack[stack.length-2];
        stack.pop();
        stack.pop();
        stack.push(buffer)
        
      }
      if(afterPolish[i]=="/"){
        if(stack[stack.length-1]==0){
          throw "TypeError: Division by zero.";
        }
        buffer =stack[stack.length-2]/stack[stack.length-1];
        stack.pop();
        stack.pop();
        stack.push(buffer)
      
      }
    }
  
  }
  
  
  
  return Number(stack[0].toFixed(4));
  }
module.exports = {
    expressionCalculator
}