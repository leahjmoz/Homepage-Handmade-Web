$(function () {
    $(".draggable").draggable({
        containment: "body",
        snap: ".box, .draggable",
        snapMode: "inner",
        snapTolerance: 20,
        revert: "invalid",
        stack: ".draggable",
        start: function (event, ui) {
            $(this).css("z-index", 1000);
        }
    });

    $(".box").each(function (index) {
        $(this).attr("data-index", index + 1);
    });

    $(".box").droppable({
        accept: ".draggable",
        tolerance: "intersect",
        drop: function (event, ui) {
            let dropped = ui.draggable;
            let droppedOn = $(this);

            let offset = droppedOn.offset();
            dropped.offset({
                top: offset.top,
                left: offset.left
            });

            let boxIndex = droppedOn.data("index"); 
            dropped.attr("data-box", boxIndex);

            checkWinCondition();
        }
    });

    function checkWinCondition() {
        for (let i = 1; i <= 9; i++) {
            let block = $(".block" + i);
            let currentBox = block.attr("data-box");

            if (parseInt(currentBox) !== i) {
                return; 
            }
        }

        setTimeout(() => {
            alert("You Win!");
        }, 100); 
    }
});


