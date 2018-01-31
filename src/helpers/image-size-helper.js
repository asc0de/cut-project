export function getImageSize(image) {
    const height = image.height;
    const width = image.width;
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (isMobile()) {
        let resultWidth = viewportWidth * 0.8;
        return {
            height: resultWidth,
            width: resultWidth
        }
    } else {
        let resultHeight = viewportHeight * 0.7;
        return {
            height: resultHeight,
            width: resultHeight
        }
    }
}

export function loadFileToUser(canvas, filename, onCreateBlob) {
    canvas.toBlob(file => {
        onCreateBlob(file);
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a");
            var url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    });
}

export function isMobile() {
    return window.matchMedia("(max-width: 600px)").matches;
}