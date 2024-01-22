function showSection(sectionId) {
    const allSections = ['sectorsSection1', 'sectorsSection2', 'productsSection1', 'productsSection2', 'brandsSection'];

    allSections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            element.style.display = 'none';
        }
    });

    const selectedSection = document.getElementById(sectionId);
    const productPagination = document.getElementById('productsPagination');
    const sectorPagination = document.getElementById('sectorPagination');

    if (selectedSection) {
        selectedSection.style.display = 'block';

        // Display corresponding text container based on the section ID
        const textContainerId = 'textContainer' + sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
        const textContainer = document.getElementById(textContainerId);
        if (textContainer) {
            textContainer.style.display = 'block';
        }

        if (sectionId.startsWith('productsSection') && productPagination) {
            productPagination.style.display = 'block';
            const pageNumberAlt = parseInt((sectionId || '').replace('productsSection', '')) || 1;
            showPageAlt(pageNumberAlt);
        } else {
            if (productPagination) {
                productPagination.style.display = 'none';
            }
        }

        if (sectionId.startsWith('sectorsSection') && sectorPagination) {
            sectorPagination.style.display = 'block';
            const pageNumber = parseInt((sectionId || '').replace('sectorsSection', '')) || 1;
            showPage(pageNumber);
        } else {
            if (sectorPagination) {
                sectorPagination.style.display = 'none';
            }
        }

        // Check if the loaded section is "brandsSection" and show textContainerA
        if (sectionId === 'brandsSection') {
            const textContainers = document.querySelectorAll('.text-container-inner');
            textContainers.forEach(container => {
                container.style.display = 'block';
            });
        } else {
            const textContainers = document.querySelectorAll('.text-container-inner');
            textContainers.forEach(container => {
                container.style.display = 'none';
            });
        }
    } else {
        console.error(`Element with ID '${sectionId}' not found.`);
        console.log('Attempting to show section with ID:', sectionId);
    }

    const updatedSectorSection = document.getElementById('updatedSectorSection');
    if (updatedSectorSection) {
        updatedSectorSection.style.display = 'none';
    }
}



// Rest of your code remains unchanged


var currentPage = 1;

function showPage(pageNumber) {
    var prevPageButton = document.getElementById('prevPage');
    var nextPageButton = document.getElementById('nextPage');
    var page1Item = document.getElementById('page1Item');
    var page2Item = document.getElementById('page2Item');

    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });

    // Show the selected page
    const selectedPage = document.getElementById('sectorsSection' + pageNumber);
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }

    // Update active states and disable/enable buttons
    if (pageNumber === 1) {
        prevPageButton.classList.add('disabled');
        nextPageButton.classList.remove('disabled');
        page1Item.classList.add('active');
        page2Item.classList.remove('active');
    } else if (pageNumber === 2) {
        prevPageButton.classList.remove('disabled');
        nextPageButton.classList.add('disabled');
        page1Item.classList.remove('active');
        page2Item.classList.add('active');
    }

    // Update current page
    currentPage = pageNumber;

    // Enable/disable Next button based on the current page
    if (pageNumber === 1) {
        nextPageButton.classList.remove('disabled');
    } else if (pageNumber === 2) {
        nextPageButton.classList.add('disabled');
    }
}




var currentPageAlt = 1;

function showPageAlt(pageNumberAlt) {
    var prevPageButton = document.getElementById('prevPageAlt');
    var nextPageButton = document.getElementById('nextPageAlt');
    var page1Item = document.getElementById('page1ItemAlt');
    var page2Item = document.getElementById('page2ItemAlt');

    // Hide all pages
    document.querySelectorAll('.pageAlt').forEach(page => {
        page.style.display = 'none';
    });

    // Show the selected page
    const selectedPage = document.getElementById('productsSection' + pageNumberAlt);
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }

    // Update active states and disable/enable buttons
    if (pageNumberAlt === 1) {
        prevPageButton.classList.add('disabled');
        nextPageButton.classList.remove('disabled');
        page1Item.classList.add('active');
        page2Item.classList.remove('active');
    } else if (pageNumberAlt === 2) {
        prevPageButton.classList.remove('disabled');
        nextPageButton.classList.add('disabled');
        page1Item.classList.remove('active');
        page2Item.classList.add('active');
    }

    // Update current page
    currentPageAlt = pageNumberAlt;

    // Enable/disable Next button based on the current page
    if (pageNumberAlt === 1) {
        nextPageButton.classList.remove('disabled');
    } else if (pageNumberAlt === 2) {
        nextPageButton.classList.add('disabled');
    }
}


$(document).ready(function () {
    // Show textContainerA by default
    $("#textContainerA").show();

    // Hide all other text containers initially
    $(".text-container-inner").not("#textContainerA").hide();

    // Button click event
    $(".btn").click(function () {
        // Hide all text containers
        $(".text-container-inner").hide();

        // Show the corresponding text container based on the button ID
        var buttonId = $(this).attr("id");

        if (buttonId) {
            var targetContainer = "#" + buttonId.replace("btn", "textContainer");
            $(targetContainer).show();
        }
    });
});


  /**
   * Back to top button
   */
  let backtotop = document.querySelector('#back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }
  
let preloader = document.querySelector('#preloader');
if (preloader) {
  window.addEventListener('load', () => {
    console.log('Load event triggered'); // Check if this line is logged
    preloader.remove();
    console.log('Preloader removed'); // Check if this line is logged
  });
}

  /**
   * Back to index
   */
  document.addEventListener('DOMContentLoaded', function() {
    let backToProducts = document.querySelector('.back-to-index');
    
    if (backToProducts) {
      const toggleBackToProducts = () => {
        if (window.scrollY > 0) { // Detect any scrolling
          backToProducts.classList.add('active');
        } else {
          backToProducts.classList.remove('active');
        }
      };
  
      window.addEventListener('load', toggleBackToProducts);
      window.addEventListener('scroll', toggleBackToProducts);
    }
  });

document.addEventListener('DOMContentLoaded', function() {
    
    // Wait for the DOM to be fully loaded before accessing elements
    var downloadButton = document.getElementById('downloadPdfButton');

    if (downloadButton) {
        // Add click event listener only if the element is found
        downloadButton.addEventListener('click', function() {
            var pdfFile = './assets/pdf/PemiPartsSupplierList.pdf';

            var link = document.createElement('a');
            link.href = pdfFile;
            link.download = 'PEMI PARTS complete supplier list.pdf';
            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
        });
    }
    
});


// Call showPage with the default page number once the page is loaded
window.onload = function () {
    showSection('sectorsSection1');
    showPage(1); // Optionally, if you want to show a specific page by default
};