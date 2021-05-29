const CLOUDINARY_PRESET = 'h6te4qr7';
const fileId = document.querySelector('#upload');
const errorP = document.querySelector("#error");
const allImgs = document.querySelectorAll("#image-section img");

fileId.onchange = function fileChange() {
    allFiles = [...(this.files)]
    allFiles.forEach(uploadFile)
}

function uploadFile(file, index) {
    let url = 'https://api.cloudinary.com/v1_1/kanmi24/upload';
    let formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_PRESET);

    if (file.size > 5000000) {
        errorP.textContent = "File cannot be more than 5 MB";
        return;
    }

    fetch(url, {
            method: 'POST',
            body: formData
        })
        .then((e) => {
            console.log(e.url);
        })
        .catch((error) => {
            console.log(error)
        })
}

function nextImage() {
    for (let i = 0; i < allImgs.length; i++) {
        if (allImgs[i].classList.contains('show-image') || allImgs[i].classList.contains('show-image-left') && allImgs[i + 1] != null) {

            if (allImgs[i + 1] == null) {
                break;
            }

            if (allImgs[i - 1] != null) {
                allImgs[i - 1].classList.toggle('hidden');
                // allImgs[i-1].classList.toggle('hidden-move-left');
                // setTimeout(() => {
                // allImgs[i-1].classList.toggle('hidden');
                // }, 300)
            }

            //remove show image from current ele

            //blur image & move to left
            // allImgs[i].classList.toggle('blur-1-left');


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
    for (let i = 0; i < allImgs.length; i++) {
        if (allImgs[i].classList.contains('show-image') && allImgs[i - 1] != null) {
            if (allImgs[i - 1] == null) {
                break;
            }

            if (allImgs[i + 1] != null) {
                allImgs[i + 1].classList.toggle('hidden');
                // allImgs[i-1].classList.toggle('hidden-move-left');
                // setTimeout(() => {
                // allImgs[i-1].classList.toggle('hidden');
                // }, 300)
            }

            //remove show image from current ele

            //blur image & move to left
            // allImgs[i].classList.toggle('blur-1-left');


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
            //     if(allImgs[i-1] != null){
            //         allImgs[i-1].classList.toggle('show-image');
            //         allImgs[i-1].classList.toggle('blur-1');
            //     }
            //     else{
            //         break;
            //     }

            //     allImgs[i].classList.toggle('show-image');
            //     allImgs[i].classList.toggle('blur-2');

            //     if(allImgs[i+1] != null){
            //         allImgs[i+1].classList.toggle('blur-2');
            //         allImgs[i+1].classList.toggle('hidden');
            //     }

            //     if(allImgs[i-2] != null){
            //         allImgs[i-2].classList.toggle('hidden');
            //         allImgs[i-2].classList.toggle('blur-1');
            //     }
            //     break;
        }
    }
}