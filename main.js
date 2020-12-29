const images = document.querySelectorAll('.main__imgContainer');
const main = document.querySelector('.main');
const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('button');
const menu__items = document.querySelector('.menu__items');
const html = document.querySelector('html');


let centerIndex;
let left;
let center;
let right;

let isMenuOpened;

html.addEventListener('click', (e) => {
    console.log(e.target.tagName);
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'LI' || e.target.tagName === 'I' ) {
        return;
    }
    if (isMenuOpened) {
        closeMenu();
    }
});
main.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        
        switch(e.target.parentNode) {
            case left:
                clickLeftImage();
                break;
            case center:
                break;
            case right:
                clickRightImage();
                break;

        }

    }
});
menuBtn.addEventListener('click', () => {
    openMenu();
});
menuBtn.addEventListener('mouseenter', (e) => {
    openMenu();
    
});
menu__items.addEventListener('mouseleave', (e) => {
    if (e.target.tagName === 'UL') {
       closeMenu();
    }
});

function openMenu() {
    menu__items.style.display = 'block';
    isMenuOpened = true;
}
function closeMenu() {
    menu__items.style.display = 'none';
    isMenuOpened = false;
}

/**
 * init image container
 */
function containerInit() {
    isMenuOpened=false;
    menu__items.style.display='none';

    centerIndex = Math.floor(images.length/2);
    left = images[centerIndex-1];
    center = images[centerIndex];
    right = images[centerIndex+1];

    left.style.display = 'inline';
    center.style.display = 'inline';
    right.style.display = 'inline';

    imgScale(left, center, right);
}

function imgScale(left, center, right) {
    left.style.transform = 'scale(0.5)';
    center.style.transform = 'scale(1)';
    right.style.transform = 'scale(0.5)';
}

/**
 * 좌우 끝에 간격을 맞추기 위한 빈 이미지 만들기
 */
function getEmptyImage() {
    const empty = document.createElement('div');
    empty.setAttribute('class', 'main__imgContainer');
    empty.innerHTML='<img/>';
    return empty;
}

/**
 * 왼쪽 이미지 클릭
 */
function clickLeftImage() {
    if(centerIndex > 0) {
        right.style.display = 'none';

        centerIndex--;
        if (centerIndex === 0 ){
            const empty = getEmptyImage();
            main.insertBefore(empty, images[centerIndex]);
            left = empty;
        }
        else {
            left = images[centerIndex-1];
        }
        
        center = images[centerIndex];
        right = images[centerIndex+1];
        left.style.display = 'inline';
        
        imgScale(left, center, right);
    }
}

/**
 * 오른쪽 이미지 클릭
 */
function clickRightImage() {
    if(centerIndex < images.length - 1) {
        left.style.display = 'none';

        centerIndex++;
        
        if(centerIndex === images.length -1) {
            const empty = getEmptyImage();
            main.appendChild(empty);
            right = empty;
        } else {
            right = images[centerIndex+1];
        }

        left = images[centerIndex-1];
        center = images[centerIndex];
        right.style.display = 'inline';

        imgScale(left, center, right);
    } 
}

containerInit();