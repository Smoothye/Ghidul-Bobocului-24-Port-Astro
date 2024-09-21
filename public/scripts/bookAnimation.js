var bookWrapper = document.getElementById("book-wrapper");
var prevButton = document.getElementById("prev");
var nextButton = document.getElementById("next");
var butonCuprins = document.getElementById("buton-cuprins");

//!!! NUMARUL DE PAGINI DIN  src/pages/ghid.astro            !!!
//    SI DIN <HEAD> DIN   src/layouts/BaseLayout.astro       !!!
var numberOfPages = 44; // numar total de pagini (ar trebui sa fie numar par) impartit la 2
var currentPage = 1;

var pages = [];
for(let i = numberOfPages; i >= 1; i--) {
    
    pages[i] = document.getElementById(`page${i}`);
    pages[i].style.zIndex = `${numberOfPages - i + 1}`;
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
        prevButton.style.display = (currentPage === 4 ? "none" : "inline");

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
        prevButton.style.display = (currentPage === 4 ? "none" : "inline");

        if(currentPage === numberOfPages + 1) {

            bookWrapper.style.transform = "translateX(100%)";
            nextButton.style.display = "none";
        }
    }

    butonCuprins.style.left = (currentPage <= 3 ? "0px" : "-100px"); // translate left buton cuprin
}

function goToPage(pageNumber) {

    function flip() {

        if(currentPage !== pageNumber) {

            animatie(currentPage < pageNumber ? 1 : -1)
            setTimeout(flip, 10);
        }
    }

    flip();
    // while(currentPage !== pageNumber)
    //     animatie(currentPage < pageNumber ? 1 : -1);
}
