const parent = document.getElementById("parent");
//console.log(parent);
const root = ReactDOM.createRoot(parent);
const h2 = React.createElement("h2", {style:{backgroundColor:"brown",textAlign:'center'}}, "ABES Engineeering College");
const li1 =React.createElement("li", {style:{backgroundColor:"yellow"}}, "java");
const li2 =React.createElement("li", {style:{backgroundColor:"pink"}}, "python");
const li3 =React.createElement("li", {style:{backgroundColor:"orange"}}, "React");
const ul =React.createElement("ul", {style:{backgroundColor:"lightblue"}}, li1,li2,li3);
const pic =React.createElement("img", {src:"https://www.aisupersmart.com/wp-content/uploads/jet-form-builder/599641e8d3945ab1ac40d989e16b7182/2024/01/ai-image-to-story-generator-1-1-1024x576-1.jpg", style:{height:'200px',width:'200px'}});
const myname=React.createElement("h1", {}, "rv");
const image = React.createElement("div", {style:{display:'flex', alignItems:'center',gap:"50px"}}, pic, myname);
const hr = React.createElement("hr", {style:{ border:'2px solid #d4c8c8ff'}});
const wrapper =React.createElement("div", {}, h2,image,hr,ul);
const h21=<h2>
    Hi, i am using jsx
</h2>;
const li11=<li>java</li>;
const li12=<li>python</li>;
const li13=<li>React</li>;   
const ul1=<ul>{li11}{li12}{li13}</ul>;
const wrapper1=(
<>
{h21}
{ul1}
</>
)
root.render(wrapper1);