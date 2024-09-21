var prevButtonNarrow = document.getElementById("prev-narrow");
var nextButtonNarrow = document.getElementById("next-narrow");

//!!! NUMARUL DE PAGINI DIN public/scripts/bookAnimation.js     !!!
//!!! NUMARUL DE PAGINI DIN  src/pages/ghid.astro               !!!
//    SI DIN <HEAD> DIN   src/layouts/BaseLayout.astro          !!!
var numberOfPagesNarrow = 88;
var currentPageNarrow = 1;
var visiblePages = 10;

var pagesNarrow = [];

function loadPageNarrow(page) {

    page.classList.add("active");

    const img = page.querySelector("img");

    if(img && img.dataset.src) {

        img.src = img.dataset.src;
        img.removeAttribute("data-src");
    }
}

function unloadPageNarrow(page) {

    page.classList.remove("active");

    const img = page.querySelector("img");

    if(img && !img.dataset.src) {

        img.dataset.src = img.src;
        img.src = "";
    }
}

for(let i = numberOfPagesNarrow; i >= 1; i--) {

    pagesNarrow[i] = document.getElementById(`page${i}-narrow`);
    pagesNarrow[i].style.zIndex = `${numberOfPagesNarrow - i + 1}`; 

    if(i > currentPageNarrow - visiblePages && i < currentPageNarrow + visiblePages)
        loadPageNarrow(pagesNarrow[i]);

    else
        unloadPageNarrow(pagesNarrow[i]);
}

function animatieNarrow(id) {

    if(id === -1) { // previous page

        if(currentPageNarrow === 1) return;

        pagesNarrow[--currentPageNarrow].classList.remove("flipped");

        if(currentPageNarrow - visiblePages >= 1)
            loadPageNarrow(pagesNarrow[currentPageNarrow - visiblePages]);

        if(currentPageNarrow + visiblePages <= numberOfPagesNarrow)
            unloadPageNarrow(pagesNarrow[currentPageNarrow + visiblePages]);
    }
    else { // next page

        if(currentPageNarrow === numberOfPagesNarrow) return;

        pagesNarrow[currentPageNarrow++].classList.add("flipped");

        if(currentPageNarrow - visiblePages >= 1)
            unloadPageNarrow(pagesNarrow[currentPageNarrow - visiblePages]);

        if(currentPageNarrow + visiblePages <= numberOfPagesNarrow)
            loadPageNarrow(pagesNarrow[currentPageNarrow + visiblePages]);
    }

    prevButtonNarrow.style.display =
    nextButtonNarrow.style.display = (currentPageNarrow === 6 ? "none" : "inline");
}

function goToPageNarrow(pageNumber) {

    while(currentPageNarrow !== pageNumber)
        animatieNarrow(currentPageNarrow < pageNumber ? 1 : -1);
}
