var prevButtonNarrow = document.getElementById("prev-narrow");
var nextButtonNarrow = document.getElementById("next-narrow");

var numberOfPagesNarrow = 88;
var currentPageNarrow = 1;

var pagesNarrow = [];
for(let i = numberOfPagesNarrow; i >= 1; i--) {

    pagesNarrow[i] = document.getElementById(`page${i}-narrow`);
    pagesNarrow[i].style.zIndex = `${numberOfPagesNarrow - i + 1}`; 
}

function animatieNarrow(id) {

    if(id === -1) { // previous page

        if(currentPageNarrow === 1) return;

        pagesNarrow[--currentPageNarrow].classList.remove("flipped");
    }
    else { // next page

        if(currentPageNarrow === numberOfPagesNarrow) return;

        pagesNarrow[currentPageNarrow++].classList.add("flipped");
    }

    prevButtonNarrow.style.display =
    nextButtonNarrow.style.display = (currentPageNarrow === 6 ? "none" : "inline");
}

function goToPageNarrow(pageNumber) {

    while(currentPageNarrow !== pageNumber)
        animatieNarrow(currentPageNarrow < pageNumber ? 1 : -1);
}
