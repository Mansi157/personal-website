(function(){
    emailjs.init('user_gv3cuEmUW8JYnPIABk1zr');
    //lazy-loading
    const imgs = document.querySelectorAll('img');
    const observer = window.lozad(imgs); // passing a `NodeList` (e.g. `document.querySelectorAll()`) is also valid
    observer.observe();
})();
var aboutItem = document.getElementById("about-item");
var portfolioItem = document.getElementById("portfolio-item");
var contactItem = document.getElementById("contact-item");
var loadingPage = document.getElementById("loading-page");
var mainContent = document.getElementById("main-content");

window.addEventListener("load", displayContent);

setTimeout(displayContent, 15000);

function displayContent() {
    loadingPage.style.display = "none";
    mainContent.style.display = "block";
}

function toggleResume() {
    var resumeOptions = document.querySelector('.resume-options');
    resumeOptions.classList.toggle('view-resume-options');
    if(resumeOptions.className === "resume-options view-resume-options") {
        document.querySelector('.resume-link').innerHTML = "Close";
    } else {
        document.querySelector('.resume-link').innerHTML = "Resume";
    }
}

function downloadResume() {
    document.getElementById('download-resume').click();
    toggleResume();
}

function viewResume() {
    document.getElementById('view-resume').click();
    toggleResume();
}

function slideTo(id,isInNavigation) {
    var element = document.getElementById(id);
    if(isInNavigation) {
        if(typeof window.orientation !== 'undefined' || (window.navigator.userAgent.toLowerCase().includes('mobi'))) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        } else {
            document.getElementById('nav-toggle').checked = false;
            setTimeout(function() {
                window.scrollTo({
                    top: element.offsetTop,
                    behavior: 'smooth'
                });
            },700);
        }
    } else {
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    }
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Animation

function animate(container, isOnTop=false) {
    var parent = document.querySelector(container);
    var childrens = [];
    for (var i=0;i<parent.childNodes.length;i++) {
        if(parent.childNodes[i].dataset && parent.childNodes[i].dataset.animatable == "animatable") {
            parent.childNodes[i].style.opacity = '0';
            childrens.push(parent.childNodes[i]);
        }
    }   
    function routine() {
        var scroll_pos = document.documentElement.scrollTop + document.documentElement.clientHeight;
        var animatedCount = 0;
        for(var i=0;i<childrens.length;i++) {
            if((childrens[i].offsetTop + childrens[i].style.height)  < scroll_pos - 0.25*innerHeight || window.scrollY > document.body.scrollHeight - 1.1*innerHeight || isOnTop) {
                childrens[i].style.opacity = '0';
                childrens[i].style.transform =`translateY(${16 + i*4}px) rotate(-5deg)`;
                childrens[i].style.animationDelay =String(Number(i*50)) + "ms";
                childrens[i].classList.add("slide-up-opacity-animation");
            }
            if(childrens[i].classList.contains("slide-up-opacity-animation")){
                animatedCount++;
            }
        }
        if(animatedCount === childrens.length){
            window.removeEventListener("scroll", listener);
        }
    }
    var listener = debounce(routine, 10, true);

    if(isOnTop)
        routine();
    else
        window.addEventListener("scroll", listener);
}

animate("#about");
animate(".portfolio-container");
animate(".about-me-text");
animate(".about-me-info");
animate(".skills-container");
animate(".project-selection");
animate(".contact-container");
animate(".centered");
animate(".contact-form");
animate(".footer");
animate(".recommendations-container");


// Projects
var projectContainer = document.querySelector(".projects-container");
var projects = [
    {
        name: "Bank Management System",
        image: "bank.PNG",
        desc: "Bank Management System is a web application where users can transfer money to different users and they can also see the total amount transferred..",
        link: "https://github.com/Mansi157/Spark-Bank",
        tags: ["all", "full stack"]
    },
    {
        name: "Glass morphism Calculater",
        image: "cal.PNG",
        desc: "The Glass Morphism Calculator is a tool that performs simple calculations (like addition, subtraction, multiplication, and division), and I implemented it with HTML5, CSS, and JS.",
        link: "https://mansi157.github.io/calculater/",
        tags: ["all","front end"]
    },
    {
        name: "Menu Management System",
        image: "menu.PNG",
        desc: "Menu management system is a web application made with HTML5 CSS3 and PHP. Menus of the restaurant are available, as well as reserving a table.",
        link: "http://menumanagement.epizy.com/?i=1",
        tags: ["all", "full stack"]
    },
    {
        name: "Digital Portfolio",
        image: "port.PNG",
        desc: "Here is my Personal Website, where you can find out more about me ≧◉◡◉≦.",
        link: "https://mansi157.github.io/Personal-potfolio/",
        tags: ["all","full stack","front end"]
    },
    {
        name: "Snake Game",
        image: "snake.png",
        desc: "This a Snake Game website. ",
        link: "https://5vg7dwx1dr6prmav1zyscq-on.drv.tw/www.gmae.cf/snake1.html",
        tags: ["all", "front end"]
    },
    {
        name: "Covid19 Tracker",
        image: "c-19.PNG",
        desc: "The Covid-19 Tracker is our final year project, which provides updates about Covid-19 both globally, as well as at the state level. We also provide a covid-19 game, state-wise NGOs, SMS features, and many more on this website.",
        link: "https://5vg7dwx1dr6prmav1zyscq-on.drv.tw/www.gmae.cf/snake1.html",
        tags: ["all","full stack", "front end"]
    },
    
]


var new_projects = projects;

function selectCategory(category) {
    var newProjects = projects.filter(function(project) {
        return project.tags.includes(category);
    });
    document.querySelector(".category-selected").classList.remove("category-selected");
    document.getElementById(category).classList.add("category-selected");
    new_projects = newProjects;
    updateCards(newProjects,false);
}

function updateCards(projects, onFirsttimeLoad) {
    var items = 0;
    projectContainer.innerHTML = "";
    projects.forEach((project, index) => {
        var div = document.createElement("div");
        div.dataset.animatable = "animatable";
        div.className= "project-card";
        var projectCard = `
                <div class="flex">
                    <h3 class="project-name">${project.name}</h3>
                    <span class="project-line"></span>
                </div>
                <image onclick='openModal(${index})' class="project-image" src="./assets/images/${project.image}" alt="${project.name}'s Image" />
                <p class="project-desc">${project.desc.substring(0,100)}...</p>
                <div class="project-link">
                    <a class="project-visit" href="${project.link}" target="_blank">
                        <span>VISIT <i class="fa fa-chevron-right" aria-hidden="true"></i></span>
                    </a>
                </div>
        `;
        div.innerHTML = projectCard;
        projectContainer.appendChild(div);
        items++;
        if(items === projects.length && onFirsttimeLoad){
            animate(".projects-container");
        }
    });
}

function openModal(index) {
    document.querySelector(".modal").style.display = "block";
    document.querySelector(".modal-content").classList.add("modal-animation");
    document.querySelector(".modal-content__title").innerHTML = new_projects[index].name;
    document.querySelector(".modal-content__image").src = "./assets/images/" + new_projects[index].image;
    document.querySelector(".modal-content__desc").innerHTML = new_projects[index].desc;
    document.querySelector(".modal-content__link").href = new_projects[index].link;
}

document.querySelector(".modal-close").addEventListener("click", function() {
    document.querySelector(".modal").style.display = "none";
});

updateCards(projects, true);

// Email.js


const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Student", "Learner", "Web Designer"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});