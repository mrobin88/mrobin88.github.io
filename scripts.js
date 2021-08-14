function Copy() {

    copyText = document.getElementById("email");
    copyText.select();
    document.execCommand("copy");
    document.getElementById("MTGAOK").style.visibility = "visible";
}