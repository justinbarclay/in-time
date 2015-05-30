var anArray = [];
for (i=0; i<= 100; i++) {
    anArray.push(Math.floor(Math.random()*13));
}

console.log(anArray);

console.log(Math.max(anArray));

var highest = 0;
anArray.map(function(item){
    highest = Math.max(highest, item);
});
console.log(highest);
