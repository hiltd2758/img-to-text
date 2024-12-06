function displayImageName(){
    const imageInput= document.getElementById('imageInput');
    const imageFileName= document.getElementById('imageFileName');
    imageFileName.textContent = imageInput.files[0] ?
    `Selected File: ${imageInput.files[0].name}`: '';

}
function convertImagetoText(){
    const imageInput= document.getElementById('imageInput').files[0];
    const imageTextResult =  document.getElementById('imageTextResult');
    if(!imageInput)
    {
        alert('Please select a file');
        return;
    }
    Tesseract.recognize(
        imageInput,
            'eng',
            {
                logger: (m) => console.log(m),
            }
    ).then(({data: {text}}) =>{
        imageTextResult.textContent = text;
    }).catch((error) =>{
        console.log(error);
        imageTextResult.textContent = 'Error extracting text from image';
    })
}

document.getElementById('convertImageBtn').addEventListener('click', convertImagetoText);