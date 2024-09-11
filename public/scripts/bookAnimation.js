var bookWrapper = document.getElementById("book-wrapper");
var prevButton = document.getElementById("prev");
var nextButton = document.getElementById("next");
var butonCuprins = document.getElementById("buton-cuprins");

//!!! NUMARUL DE PAGINI DIN  src/pages/ghid.astro            !!!
//!!!    SI DIN <HEAD> DIN   src/layouts/BaseLayout.astro    !!!
var numberOfPagesNarrow = 10;
var numberOfPages = numberOfPagesNarrow / 2;

var currentPage = 1;
var currentPageNarrow = 1;

var pages = [];
var pagesNarrow = [];
for(let i = 2 * numberOfPages; i >= numberOfPages + 1; i--) {

    pagesNarrow[i] = document.getElementById(`page${i}-narrow`);
    pagesNarrow[i].style.zIndex = `${numberOfPages - i + 1}`; 
}
for(let i = numberOfPages; i >= 1; i--) {
    
    pages[i] = document.getElementById(`page${i}`);
    pages[i].style.zIndex = `${numberOfPages - i + 1}`;

    pagesNarrow[i] = document.getElementById(`page${i}-narrow`);
    pagesNarrow[i].style.zIndex = `${numberOfPages - i + 1}`;
}

var nextZIndex = numberOfPages;

function animatie(id) { // -1 = previous page | 1 = next page

    if(id === -1) { // previous page
        if(currentPage === 1) return;
        
        if(currentPage === numberOfPages + 1) {

            bookWrapper.style.transform = "translateX(50%)";
            nextButton.style.display = "inline";
        }

        currentPage--;

        if(currentPage === 1) {

            bookWrapper.style.transform = "translateX(0%)";
            prevButton.style.display = "none";
        }

        pages[currentPage].classList.remove("flipped");
        pages[currentPage].style.zIndex = `${nextZIndex}`;
        nextZIndex++;
    }
    else { // next page
        if(currentPage === numberOfPages + 1) return;

        pages[currentPage].classList.add("flipped");
        pages[currentPage].style.zIndex = `${nextZIndex}`;
        nextZIndex++;

        if(currentPage === 1) {

            bookWrapper.style.transform = "translateX(50%)";
            prevButton.style.display = "inline";
        }
        
        currentPage++;

        if(currentPage === numberOfPages + 1) {

            bookWrapper.style.transform = "translateX(100%)";
            nextButton.style.display = "none";
        }
    }

    butonCuprins.style.left = (currentPage <= 3 ? "0px" : "-100px");
}

function goToPage(pageNumber) {

    while(currentPage != pageNumber)
        animatie(currentPage < pageNumber ? 1 : -1);
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
}

function goToPageNarrow(pageNumber) {

    while(currentPageNarrow != pageNumber)
        animatieNarrow(currentPageNarrow < pageNumber ? 1 : -1);
}
