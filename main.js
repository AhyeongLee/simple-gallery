const images = document.querySelectorAll('.main__imgContainer');
const main = document.querySelector('.main');


let centerIndex;
let left;
let center;
let right;

function containerInit() {

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

function getEmptyImage() {
    const empty = document.createElement('div');
    empty.setAttribute('class', 'main__imgContainer');
    empty.innerHTML='<img/>';
    return empty;
}

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

containerInit();