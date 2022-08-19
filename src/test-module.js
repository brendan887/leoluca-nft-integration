// export const testModule = () => {
//     alert("Test successful");
// }

const btnTest = document.getElementById(`btn-test`);
btnTest.onclick = () => {
  console.log("hello from test module!");
};
console.log("btnTest", btnTest);


