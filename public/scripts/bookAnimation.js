var bookWrapper = document.getElementById("book-wrapper");
var prevButton = document.getElementById("prev");
var nextButton = document.getElementById("next");
var butonCuprins = document.getElementById("buton-cuprins");

//!!! NUMARUL DE PAGINI DIN  src/pages/ghid.astro                   !!!
//!!! NUMARUL DE PAGINI DIN  public/scripts/bookAnimationNarrow.js  !!!
//    SI DIN <HEAD> DIN   src/layouts/BaseLayout.astro              !!!
var numberOfPages = 44; // numar total de pagini (ar trebui sa fie numar par) impartit la 2
var currentPage = 1;
var visiblePages = 6; // si fata si spate

var nextZIndex = numberOfPages;

var pages = [];

function loadPage(page) {

    page.classList.add("active");

    const imgs = page.querySelectorAll("img");
    const frontImg = imgs[0];
    const backImg = imgs[1];

    if(frontImg && frontImg.dataset.src) {

        frontImg.src = frontImg.dataset.src;
        frontImg.removeAttribute("data-set");
    }
    if(backImg && backImg.dataset.src) {

        backImg.src = backImg.dataset.src;
        backImg.removeAttribute("data-set");
    }
}

function unloadPage(page) {

    page.classList.remove("active");

    const imgs = page.querySelectorAll("img");
    const frontImg = imgs[0];
    const backImg = imgs[1];

    if(frontImg && !frontImg.dataset.src) {

        frontImg.dataset.src = frontImg.src;
        frontImg.src = "";
    }
    if(backImg && !backImg.dataset.src) {

        backImg.dataset.src = backImg.src;
        backImg.src = "";
    }
}

for(let i = numberOfPages; i >= 1; i--) {
    
    pages[i] = document.getElementById(`page${i}`);
    pages[i].style.zIndex = `${numberOfPages - i + 1}`;

    if(i > currentPage - visiblePages && i < currentPage + visiblePages)
        loadPage(pages[i]);
    
    else
        unloadPage(pages[i]);
}

function animatie(id, loadPages=true) { // -1 = previous page | 1 = next page

    if(id === -1) { // previous page
        if(currentPage === 1) return;
        
        if(currentPage === numberOfPages + 1) {

            bookWrapper.style.transform = "translateX(50%)";
            nextButton.style.display = "inline";
        }

        currentPage--;
        prevButton.style.display = (currentPage === 4 ? "none" : "inline");

        if(currentPage === 1) {

            bookWrapper.style.transform = "translateX(0%)";
            prevButton.style.display = "none";
        }

        pages[currentPage].classList.remove("flipped");
        pages[currentPage].style.zIndex = `${nextZIndex}`;
        nextZIndex++;

        if(loadPages) {
            if(currentPage - visiblePages >= 1)
                loadPage(pages[currentPage - visiblePages]);
            
            if(currentPage + visiblePages <= numberOfPages)
                unloadPage(pages[currentPage + visiblePages]);
        }
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
        
        if(loadPages) {
            if(currentPage - visiblePages >= 1)
                unloadPage(pages[currentPage - visiblePages]);
            
            if(currentPage + visiblePages <= numberOfPages)
                loadPage(pages[currentPage + visiblePages]);
        }

        currentPage++;
        prevButton.style.display = (currentPage === 4 ? "none" : "inline");

        if(currentPage === numberOfPages + 1) {

            bookWrapper.style.transform = "translateX(100%)";
            nextButton.style.display = "none";
        }
    }

    butonCuprins.style.left = (currentPage <= 3 ? "0px" : "-100px"); // translate left buton cuprin
}

function loadAllPages() {

    for(let i = 1; i <= numberOfPages; i++) {

        if(i > currentPage - visiblePages && i < currentPage + visiblePages)
            loadPage(pages[i]);
        
        else
            unloadPage(pages[i]);
    }
}
async function goToPage(pageNumber) {
    
    const directie = (currentPage < pageNumber ? 1 : -1);
    
    if( Math.abs(currentPage - pageNumber) < visiblePages )
        _goToPage(pageNumber);
    
    else {
            
        // preload 2 pagini (spatele filei din stanga si fata celei din dreapta)
        loadPage(pages[pageNumber]);
        loadPage(pages[pageNumber - directie]);
        loadPage(pages[pageNumber + directie]);
        
        // parcurge paginile incarcate fara a incarca altele
        await _goToPage(currentPage + visiblePages * directie, false)

        while(directie * currentPage < directie * pageNumber)
            animatie(directie, false);

        await new Promise(resolve => setTimeout(resolve, 500));
        loadAllPages();
    }
}

async function _goToPage(pageNumber, loadPages=true) {

    // daca trebuie sa mearga mai putin de 6 de pagini se misca mai incet
    const flipDelay = ( Math.abs(pageNumber - currentPage) < 6 ? 100 : 50 );
    
    async function flip() {

        if(currentPage !== pageNumber) {
            
            animatie(currentPage < pageNumber ? 1 : -1, loadPages);
            await new Promise(resolve => setTimeout(resolve, flipDelay));
            return flip();
        }
    }
    
    await flip();
}
