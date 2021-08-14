//cur_id="";
cur_id = "";
first_p = "";
first_MTGO_ID = "";
first_ch_price = "";
b_language = "en";
prev_deck = -1;
next_deck = 446568;
display = "txt";

function ShowList(cl) {
    if (cl == "top8") { o_cl = "pts"; } else { o_cl = "top8"; }
    document.getElementById(o_cl + "_list").style.display = "none";
    document.getElementById(cl + "_list").style.display = "block";

    //document.getElementById(o_cl+"_header").style.borderTop="2px white solid";
    document.getElementById(o_cl + "_header").style.borderBottom = "4px #00528b solid";
    //document.getElementById(cl+"_header").style.borderTop="2px #cccccc solid";
    document.getElementById(cl + "_header").style.borderBottom = "4px white solid";
}

//AffCard(cur_id,first_p,first_MTGO_ID,first_ch_price);

function AffCard(id, pname, MTGO_ID, ch_price) {
    if (cur_id != "") {
        if (document.getElementById('md' + cur_id)) { document.getElementById('md' + cur_id).className = 'deck_line hover_tr'; }
        if (document.getElementById('sb' + cur_id)) { document.getElementById('sb' + cur_id).className = 'deck_line hover_tr'; }
    }
    if (id != "") {
        if (document.getElementById('md' + id)) { document.getElementById('md' + id).className = 'deck_line chosen_tr'; }
        if (document.getElementById('sb' + id)) { document.getElementById('sb' + id).className = 'deck_line chosen_tr'; }
    }
    RequestContent("deck_card?gamerid=" + id + "&MTGO_ID=" + MTGO_ID + "&ch_price=" + ch_price + "&pname=" + pname, "card_div");
    //setTimeout(ShowCardLink, 500);
    cur_id = id;
}

function AffCardV(id, pname, MTGO_ID, ch_price) {
    RequestContent("deck_card?gamerid=" + id + "&MTGO_ID=" + MTGO_ID + "&ch_price=" + ch_price + "&pname=" + pname, "card_div_content");

    cur_id = id;

    if (document.documentElement && document.documentElement.scrollTop) {
        theTop = document.documentElement.scrollTop
    } else if (document.body) {
        theTop = document.body.scrollTop
    }



    newx = x - 400;

    if (newx < 20) { newx = 20; }
    if (newx + 800 > window.innerWidth) { newx = window.innerWidth - 820; }


    document.getElementById("card_div").style.left = newx + "px";
    document.getElementById("card_div").style.top = (theTop + y + 40) + "px";
    document.getElementById("card_div").style.visibility = "visible";

}

function CloseCard() {
    document.getElementById("card_div").style.visibility = "hidden";
    document.getElementById("card_div_content").innerHTML = "";
}

function ShowCardLink() {
    if (b_language == "fr") {
        document.getElementById("card_infos_link").innerHTML = "<a target=_blank href=mv_redir?c=" + cur_id + ">Plus d'informations sur cette carte<br>sur magic-ville.com</a>";
    }
}

function RequestContent(my_url, my_dest) {
    var xhr_object = null;

    if (window.XMLHttpRequest) // Firefox
        xhr_object = new XMLHttpRequest();
    else if (window.ActiveXObject) // Internet Explorer
        xhr_object = new ActiveXObject("Microsoft.XMLHTTP");


    xhr_object.open("POST", my_url, true);

    xhr_object.onreadystatechange = function() {
        if (xhr_object.readyState == 4) document.getElementById(my_dest).innerHTML = xhr_object.responseText;
    }

    xhr_object.send(null);
}

function AffArena(pref) {
    omtga = document.getElementById("MTGA_button_div");
    var r = omtga.getBoundingClientRect();

    if (document.documentElement && document.documentElement.scrollTop) { theTop = document.documentElement.scrollTop; } else if (document.body) { theTop = document.body.scrollTop; }

    document.getElementById("MTGA_tooltip").style.width = (r.right - r.left + 200) + "px";
    document.getElementById("MTGA_tooltip").style.left = (r.left - 100) + "px";
    document.getElementById("MTGA_tooltip").style.top = (theTop + r.top + 22) + "px";
    document.getElementById("MTGA_tooltip").style.visibility = "visible";
    document.getElementById("MTGA_deck").innerHTML = "<iframe style=\"display:none;width:0px;height:0px;\" src=mtgarena?d=446567>";

}

function AffCompanion(div_id) {
    omtga = document.getElementById("companion_" + div_id);
    var r = omtga.getBoundingClientRect();

    if (document.documentElement && document.documentElement.scrollTop) { theTop = document.documentElement.scrollTop; } else if (document.body) { theTop = document.body.scrollTop; }

    document.getElementById("companion_tooltip").style.left = (r.left - 100) + "px";
    document.getElementById("companion_tooltip").style.top = (theTop + r.top + 22) + "px";
    document.getElementById("companion_tooltip").style.visibility = "visible";

}

function EffCompanion() {
    document.getElementById("companion_tooltip").style.visibility = "hidden";
}

function EffArena() {
    document.getElementById("MTGA_tooltip").style.visibility = "hidden";
    document.getElementById("MTGAOK").style.visibility = "hidden";
}

function CopyMTGA(lang) {
    document.getElementById("MTGAdecklist").innerHTML = document.getElementById("MTGAdecklist" + lang).value;
    copyText = document.getElementById("MTGAdecklist");
    copyText.select();
    document.execCommand("copy");
    document.getElementById("MTGAOK").style.visibility = "visible";
}

function Tap(ref) {
    if (document.getElementById("CardScan_" + ref).className == "card_box_med_180Y") {
        document.getElementById("CardScan_" + ref).className = "card_box_med";
        document.getElementById("CardScanBack_" + ref).className = "card_box_med_180Ya";
    } else {
        document.getElementById("CardScan_" + ref).className = "card_box_med_180Y";
        document.getElementById("CardScanBack_" + ref).className = "card_box_med";
    }

}

function checkKeycode(event) {
    var keyDownEvent = event || window.event,
        keycode = (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;

    //Esc
    if (keycode == 27 & display == "visual") { ToggleDecks(); }
    //left arrow
    else if (keycode == 37 && prev_deck > 0) { window.open("event?e=31920&d=" + prev_deck + "f=ST&show_pts=", "_top"); }
    //right arrow
    else if (keycode == 39 && next_deck > 0) { window.open("event?e=31920&d=" + next_deck + "f=ST&show_pts=", "_top"); }

}

document.onkeydown = checkKeycode;