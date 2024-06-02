document.getElementById('fileInput').addEventListener('change', function() {
    const preview = document.getElementById('preview');
    preview.innerHTML = '';
    const files = this.files;
    for (const file of files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    }
});

document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const files = document.getElementById('fileInput').files;
    const formData = new FormData();
    for (const file of files) {
        formData.append('images', file);
    }
    fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("images uploaded successfully");
            } else {
                alert("image upload failed");
            }
        })
        .catch(error => {
            console.error('Error', error);
        });
});