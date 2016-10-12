if (window.location.host == "www.spiegel.de") {
    spiegel();
} else if (window.location.host == "www.bergedorfer-zeitung.de") {
    bergische();
}

function spiegel() {
    document.getElementsByTagName("body")[0].className = document.getElementsByTagName("body")[0].className.replace(/\bunpurchased\b/, '');
    var texts = document.getElementsByClassName("obfuscated"),
        text_count = texts.length,
        escape,
        new_content,
        elements = document.getElementsByTagName("div"),
        intro = document.getElementsByClassName("js-spiegelplus-obfuscated-intro")[0] ? document.getElementsByClassName("js-spiegelplus-obfuscated-intro")[0] : "",
        escape = false;

    if (intro != "") {
        intro.parentNode.removeChild(intro);
    }

    for (i = 0; i < text_count; i++) {
        new_content = '';
        for (j = 0; j < texts[i].innerHTML.length; j++) {
            if (texts[i].innerHTML.charCodeAt(j) == 60 && texts[i].innerHTML.charCodeAt(j + 1) == 97) {
                escape = true;
            } else if (texts[i].innerHTML.charCodeAt(j - 1) == 62 && texts[i].innerHTML.charCodeAt(j - 2) == 97 && texts[i].innerHTML.charCodeAt(j - 3) == 47 && texts[i].innerHTML.charCodeAt(j - 4) == 60) {
                escape = false;
            }
            if (texts[i].innerHTML.charCodeAt(j) == 60 && texts[i].innerHTML.charCodeAt(j + 1) == 98) {
                escape = true;
            } else if (texts[i].innerHTML.charCodeAt(j) == 60 && texts[i].innerHTML.charCodeAt(j + 1) == 47 && texts[i].innerHTML.charCodeAt(j + 2) == 98) {
                escape = true;
            } else if (texts[i].innerHTML.charCodeAt(j - 3) == 47 && texts[i].innerHTML.charCodeAt(j - 2) == 98 && texts[i].innerHTML.charCodeAt(j - 1) == 62) {
                escape = false;
            } else if (texts[i].innerHTML.charCodeAt(j - 3) == 60 && texts[i].innerHTML.charCodeAt(j - 2) == 98 && texts[i].innerHTML.charCodeAt(j - 1) == 62) {
                escape = false;
            }
            if (escape) {
                new_content += String.fromCharCode(texts[i].innerHTML.charCodeAt(j));
            } else {
                if (texts[i].innerHTML.charCodeAt(j) != 32 && texts[i].innerHTML.charCodeAt(j) != 10) {
                    new_content += String.fromCharCode(texts[i].innerHTML.charCodeAt(j) - 1);
                } else {
                    new_content += String.fromCharCode(texts[i].innerHTML.charCodeAt(j));
                }
            }
        }

        texts[i].innerHTML = new_content;
    }
    for (i = 0; i < elements.length; i++) {
        var element = elements[i],
            style = window.getComputedStyle(element),
            position = style.getPropertyValue('position') ? style.getPropertyValue('position') : "",
            width = style.getPropertyValue('width') ? style.getPropertyValue('width') : "",
            filter = style.getPropertyValue('filter') ? style.getPropertyValue('filter') : "",
            webkitFilter = style.getPropertyValue('-webkit-filter') ? style.getPropertyValue('-webkit-filter') : "",
            textShadow = style.getPropertyValue('text-shadow') ? style.getPropertyValue('text-shadow') : "";
        if (position == "absolute" && width == "640px") {
            element.parentNode.removeChild(element);
        }
        if (filter == "blur(3px)" || webkitFilter == "blur(3px)") {
            var previousSibling = element.previousSibling,
                nextSibling = element.nextSibling;
            previousSibling.parentNode.removeChild(previousSibling);
            nextSibling.parentNode.removeChild(nextSibling);
            element.parentNode.removeAttribute("class");
            element.parentNode.parentNode.removeAttribute("class");
            element.removeAttribute("class");
        }
        if (textShadow == "0px 0px 5px #000") {
            var previousSibling = element.previousSibling,
                nextSibling = element.nextSibling;
            previousSibling.parentNode.removeChild(previousSibling);
            nextSibling.parentNode.removeChild(nextSibling);
            element.parentNode.removeAttribute("class");
            element.parentNode.parentNode.removeAttribute("class");
            element.removeAttribute("class");
        }
    }

}

function bergische() {
    texts = document.getElementsByTagName("div");
    text_count = texts.length;
    var target = 0;
    for (i = 0; i < text_count; i++) {
        if (texts[i].innerHTML == "Jetzt lesen, später zahlen") {
            target = i - 4;
            break;
        }
    }
    texts[target].innerHTML = "";
    document.getElementsByTagName("body")[0].className = document.getElementsByTagName("body")[0].className.replace(/\bunpurchased\b/, '');
}
