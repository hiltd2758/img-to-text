function displayImageName() {
    const imageInput = document.getElementById('imageInput');
    const imageFileName = document.getElementById('imageFileName');
    imageFileName.textContent = imageInput.files[0]
        ? `Selected File: ${imageInput.files[0].name}`
        : '';
}

function convertImagetoText() {
    const imageInput = document.getElementById('imageInput').files[0];
    const imageTextResult = document.getElementById('imageTextResult');
    const loadingEffect = document.getElementById('loadingEffect');

    if (!imageInput) {
        alert('Please select a file');
        return;
    }

    const imageURL = URL.createObjectURL(imageInput);

    // Hiển thị loading effect
    loadingEffect.style.display = 'inline-block';
    imageTextResult.textContent = ''; 

    Tesseract.recognize(
        imageURL,
        'eng',
        {
            logger: (m) => console.log(m),
        }
    )
        .then(({ data: { text } }) => {
            imageTextResult.textContent = text;
        })
        .catch((error) => {
            console.log(error);
            imageTextResult.textContent = 'Error extracting text from image';
        })
        .finally(() => {
            // Ẩn loading effect sau khi hoàn tất
            loadingEffect.style.display = 'none';
        });
}

document.getElementById('imageInput').addEventListener('change', displayImageName);
document.getElementById('convertImageBtn').addEventListener('click', convertImagetoText);
