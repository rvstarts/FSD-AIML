// console.log("Hello, World!");
// var a=20;
// console.log("a: " + a);
// var a=30;
//let a=50;
// if(a>20){
//     var a=50;
//     console.log("a inside " + a);
// }
// else
//    { console.log("inside else statement");
//    }



// console.log("a outside value " + a);
//function as an expression
//anonymous function(without name of function)
// const data=function(msg){
//     // console.log("Hii");
//     return "Hii"+ msg;
// }
// console.log(data("message"));


//arrow function
//  const data=(msg)=>{
//      return "Hii"+ msg; 
//      return "Hello"+ msg; //only first return will be executed  
//  }
//  console.log(data("good morning"));
//if only one parameter no need to use ()
// 
//immediately invoked function expression(IIFE)
// (()=>{
//     console.log("Hiiclancl");
// })();

// setTimeout(()=>{
//     console.log("Hiilo");
// },1000);
// setInterval(()=>{
//     console.log("Hii");
// },1000);

// function greeting(msg="Hello"){
//     console.log(msg);
// }   
// greeting("welcomw to");


 function selectLanguage(lang){
    let data;
    if(lang=="java"){
        function javaCompiler(){
            return "hey, java compiler calling";
        }
        data=javaCompiler();
    }else if(lang=="c"){
        function cCompiler(){
            return "hey, c compiler calling";
        }
        data=cCompiler();
    }else{
       data = "no compiler selected";
    }
   return data;

 }

console.log(selectLanguage("java"));
console.log(selectLanguage("c"));
console.log(selectLanguage("C++"));