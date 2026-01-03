function openLightbox(gridItem) {
    console.log("test");
    const lightbox = document.getElementById("lightbox");
    const imgEl = gridItem.querySelector("img");
    const title = gridItem.querySelector("h3").textContent;

    document.getElementById("lightbox-img").src = imgEl.src;
    // document.getElementById("lightbox-title").textContent = title;
    document.getElementById("exifContent").innerHTML = '<div class="loading">Reading EXIF data...</div>';

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";

    // For demo images from URLs
    EXIF.getData(imgEl, function () {
        const exifData = EXIF.getAllTags(this);
        if (Object.keys(exifData).length === 0) {
            document.getElementById("exifContent").innerHTML =
                '<div class="metadata-item"><span>No EXIF data available (remote images typically have EXIF stripped). Upload your own photos to see camera information.</span></div>';
        } else {
            displayExifData(exifData);
        }
    });
}

function displayExifData(exifData) {
    const container = document.getElementById("exifContent");

    if (!exifData || Object.keys(exifData).length === 0) {
        container.innerHTML =
            '<div class="metadata-item"><span>No EXIF data found in this image.</span></div>';
        return;
    }

    let html = "";

    // Camera info
    if (exifData.Make || exifData.Model) {
        html += '<div class="metadata-item">';
        html += "<strong>Camera</strong>";
        html += `<span>${exifData.Make || ""} ${exifData.Model || ""}</span>`;
        html += "</div>";
    }

    // Exposure settings
    if (exifData.ExposureTime) {
        html += '<div class="metadata-item">';
        html += "<strong>Shutter Speed</strong>";
        html += `<span>1/${Math.round(1 / exifData.ExposureTime)} sec</span>`;
        html += "</div>";
    }

    if (exifData.FNumber) {
        html += '<div class="metadata-item">';
        html += "<strong>Aperture</strong>";
        html += `<span>f/${exifData.FNumber}</span>`;
        html += "</div>";
    }

    if (exifData.ISOSpeedRatings) {
        html += '<div class="metadata-item">';
        html += "<strong>ISO</strong>";
        html += `<span>${exifData.ISOSpeedRatings}</span>`;
        html += "</div>";
    }

    if (exifData.FocalLength) {
        html += '<div class="metadata-item">';
        html += "<strong>Focal Length</strong>";
        html += `<span>${exifData.FocalLength}mm</span>`;
        html += "</div>";
    }

    // // Date
    // if (exifData.DateTime) {
    //     html += '<div class="metadata-item">';
    //     html += "<strong>Date Taken</strong>";
    //     html += `<span>${exifData.DateTime}</span>`;
    //     html += "</div>";
    // }

    // Dimensions
    if (exifData.PixelXDimension && exifData.PixelYDimension) {
        html += '<div class="metadata-item">';
        html += "<strong>Dimensions</strong>";
        html += `<span>${exifData.PixelXDimension} × ${exifData.PixelYDimension}</span>`;
        html += "</div>";
    }

    // // GPS
    // if (exifData.GPSLatitude && exifData.GPSLongitude) {
    //     const lat = convertDMSToDD(
    //         exifData.GPSLatitude,
    //         exifData.GPSLatitudeRef
    //     );
    //     const lon = convertDMSToDD(
    //         exifData.GPSLongitude,
    //         exifData.GPSLongitudeRef
    //     );
    //     html += '<div class="metadata-item">';
    //     html += "<strong>GPS Coordinates</strong>";
    //     html += `<span>${lat.toFixed(6)}, ${lon.toFixed(6)}</span>`;
    //     html += "</div>";
    // }

    // // Software
    // if (exifData.Software) {
    //     html += '<div class="metadata-item">';
    //     html += "<strong>Software</strong>";
    //     html += `<span>${exifData.Software}</span>`;
    //     html += "</div>";
    // }

    if (html === "") {
        html =
            '<div class="metadata-item"><span>No detailed EXIF data available.</span></div>';
    }

    container.innerHTML = html;
}

function convertDMSToDD(dms, ref) {
    const degrees = dms[0];
    const minutes = dms[1];
    const seconds = dms[2];

    let dd = degrees + minutes / 60 + seconds / 3600;
    if (ref === "S" || ref === "W") {
        dd = dd * -1;
    }
    return dd;
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
}

function closeLightboxOnBackdrop(event) {
    if (event.target.id === "lightbox") {
        closeLightbox();
    }
}


window.onload = () => {
    // Add click listeners to existing items
    document.querySelectorAll(".gridImgWrap").forEach((item) => {
        item.addEventListener("click", () => openLightbox(item));
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeLightbox();
        }
    });
}

