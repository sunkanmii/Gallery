const CLOUDINARY_PRESET = 'nwzufxhy';
const fileId = document.querySelector('#upload');
const errorP = document.querySelector('#error');
const allImgsSection = document.querySelector('.image-section');
let allImgs = document.querySelectorAll('.image-section img');
const closeButton = document.querySelector('#close-button');
const displayImgs = document.querySelector('.fullscreen-img');
let galleryView = document.querySelector('.display-all-imgs');

closeButton.addEventListener('click', () => {
    if (galleryView.classList.contains('hide') == false) {
        galleryView.classList.toggle('hide');
        closeButton.classList.add('hide');
    }
    if (displayImgs.children.length != 0) {
        displayImgs.innerHTML = "";
        displayImgs.classList.toggle('hide');
        closeButton.classList.add('hide');
    }
})

fileId.onchange = function fileChange() {
    allFiles = [...(this.files)]
    allFiles.forEach(uploadFile)
}

function uploadFile(file) {
    let url = 'https://api.cloudinary.com/v1_1/kanmi24/upload';
    let formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_PRESET);

    if (file.size > 5000000) {
        errorP.textContent = "File cannot be more than 5 MB";
        return;
    }
    errorP.textContent = "Please wait...";
    fetch(url, {
            method: 'POST',
            body: formData
        })
        .then((e) => {
            let res = e.json();
            return res;
        })
        .then((e) => {
            errorP.textContent = "Upload Successful!";
            setTimeout(() => {
                errorP.textContent = "File cannot be more than 5 MB";
            }, 4000);
            addImage(e.secure_url);
        })
        .catch((error) => {
            errorP.textContent = "Oops! Something went wrong, please try again.";
        })
}

function addImage(url) {
    let newImg = document.createElement('img');
    let newURL = document.createAttribute('src');
    let newClass = document.createAttribute('class');

    if (allImgsSection.children.length == 1) {
        newClass.value = 'blur-2';
    } else if (allImgsSection.children.length > 1) {
        newClass.value = 'blur-2 hidden';
    } else {
        newClass.value = 'show-image';
    }
    newURL.value = url;
    newImg.setAttributeNode(newURL);
    newImg.setAttributeNode(newClass);
    newImg.addEventListener('click', () => {
        displayImgs.classList.toggle('hide');
        let tempEle = newImg.cloneNode();
        tempEle.classList.toggle('view');
        displayImgs.appendChild(tempEle);
        closeButton.classList.remove('hide');
    })
    allImgsSection.appendChild(newImg);
}

function nextImage() {
    allImgs = document.querySelectorAll('.image-section img');
    for (let i = 0; i < allImgs.length; i++) {
        if (allImgs[i].classList.contains('show-image') || allImgs[i].classList.contains('show-image-left') && allImgs[i + 1] != null) {

            if (allImgs[i + 1] == null) {
                break;
            }

            if (allImgs[i - 1] != null) {
                allImgs[i - 1].classList.toggle('hidden');
            }

            allImgs[i].classList.toggle('show-image');
            allImgs[i].classList.toggle('blur-1');

            allImgs[i + 1].classList.toggle('show-image');
            allImgs[i + 1].classList.toggle('blur-2');

            if (allImgs[i + 2] != null) {
                if (allImgs[i + 2].classList.contains('blur-2') == false) {
                    allImgs[i + 2].classList.toggle('blur-2');
                }
                allImgs[i + 2].classList.toggle('hidden');
            }
            break;
        }
    }
}

function prevImage() {
    allImgs = document.querySelectorAll('.image-section img');
    for (let i = 0; i < allImgs.length; i++) {
        if (allImgs[i].classList.contains('show-image') && allImgs[i - 1] != null) {
            if (allImgs[i - 1] == null) {
                break;
            }

            if (allImgs[i + 1] != null) {
                allImgs[i + 1].classList.toggle('hidden');
            }

            allImgs[i].classList.toggle('blur-2');
            allImgs[i].classList.toggle('show-image');

            allImgs[i - 1].classList.toggle('blur-1');
            allImgs[i - 1].classList.toggle('show-image');

            if (allImgs[i - 2] != null) {
                if (allImgs[i - 2].classList.contains('blur-1') == false) {
                    allImgs[i - 2].classList.toggle('blur-1');
                }
                allImgs[i - 2].classList.toggle('hidden');
            }
            break;
        }
    }
}

function viewImgs() {
    allImgs = document.querySelectorAll('.image-section img');
    galleryView = document.querySelector('.display-all-imgs');
    if (galleryView.children[1] == null || galleryView.children[1].getAttribute('src') != allImgs[0].getAttribute('src') || galleryView.children.length - 1 != allImgs.length) {
        let imageNum = document.querySelector('#imgs-number');
        imageNum.textContent = allImgs.length;
        closeButton.classList.remove('hide');
        galleryView.classList.toggle('hide');

        allImgs.forEach(ele => {
            let tempClone = ele.cloneNode();
            tempClone.setAttribute('class', 'small-img');
            galleryView.appendChild(tempClone);
        });
    } else {
        closeButton.classList.remove('hide');
        galleryView.classList.toggle('hide');
    }
}