const boundOffset = 20;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

String.prototype.setChar = function(ind, char) {
    return this.substring(0, ind) + char + this.substring(ind + 1);
}

function randStr(strLen) {
    return Array(strLen).join().split(',').map(function() { return letDict.charAt(Math.floor(Math.random() * letDict.length)); }).join('');
}

if (false) {
    document.addEventListener('DOMContentLoaded', async function() {
        await sleep(3000);
        let offSet = document.getElementById("mainSection").getBoundingClientRect();
        console.log(offSet);

        let links = document.getElementsByClassName("linkText");
        links = [...links];
        links.forEach(element => {
            let rect = element.getBoundingClientRect();

            // Create the new element to be added
            const bounder = document.createElement("div");
            let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            bounder.className = "linker"
            console.log(rect);
            // bounder.style.top = String(rect.top)+"px";
            bounder.style.top = String(rect.top - offSet.top - boundOffset)+"px";
            bounder.style.left = String(rect.left - offSet.left - boundOffset) +"px";
            bounder.style.width = String(rect.right - rect.left + 2*boundOffset)+"px";
            bounder.style.height = String(rect.bottom - rect.top + 2*boundOffset)+"px";

            // bounder.style.bottom = String(rect.bottom + 20)+"px";
            // bounder.style.right = String(rect.right + 20)+"px";
            console.log(bounder);

            // Append the new element to the parent
            element.appendChild(bounder);
            console.log(bounder.getBoundingClientRect());
        });
    });
}