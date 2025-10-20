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
            const dropped = ui.draggable;
            const droppedOn = $(this);

            
            const offset = droppedOn.offset();
            dropped.offset({
                top: offset.top,
                left: offset.left
            });

            const boxIndex = droppedOn.data("index");
            dropped.attr("data-box", boxIndex);

            checkWinCondition(); 
        }
    });

    function checkWinCondition() {
        let allCorrect = true;

        for (let i = 1; i <= 25; i++) {
            const block = $(".block" + i);

            if (block.length === 0) {
                allCorrect = false;
                break;
            }

            const boxIndex = block.attr("data-box");

            console.log(`Block ${i} is in box ${boxIndex}`);

            if (!boxIndex) {
                console.log(`Block ${i} has not been placed.`);
                allCorrect = false;
                break;
            }

            if (parseInt(boxIndex) !== i) {
                console.log(`Block ${i} is in the wrong box (${boxIndex}).`);
                allCorrect = false;
                break;
            }
        }

        if (allCorrect) {
            setTimeout(() => {
                alert("You Win!");
            }, 100);
        }
    }
});
