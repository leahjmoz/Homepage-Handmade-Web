$( ".draggable" ).draggable( {
   containment: "parent",
   grid: [ 60, 60 ],
   obstacle: ".draggable",
   preventCollision: true
});

$( ".draggable2" ).draggable({ axis: "x" });

$( ".draggable3" ).draggable({ axis: "y" });

