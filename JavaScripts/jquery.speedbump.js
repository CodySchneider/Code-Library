/* Greybox Redux
* Required: http://jquery.com/
* Written by: John Resig
* Based on code by: 4mir Salihefendic (http://amix.dk)
* Additional changes by Cody Schneider
* License: LGPL (read more in LGPL.txt)
*/

var bankName = "Asheville Savings Bank";

function loadCSS() {
    var headID = document.getElementsByTagName("head")[0];
    var cssNode = document.createElement('link');
    cssNode.type = 'text/css';
    cssNode.rel = 'stylesheet';
    cssNode.href = SKINPATH + "lib/speedbump/speedbump.css";
    cssNode.media = 'screen';
    headID.appendChild(cssNode);
}

jQuery(function() {
    jQuery("a.external").click(function() {
        GB_Show(1, this.href, 250, 450);
        loadCSS();
        return false;
    });
    jQuery('a[href^="mailto:"]').click(function() {
        GB_Show(2, this.href, 200, 400);
        loadCSS();
        return false;
    });
});

var GB_ANIMATION = true;
var GB_DONE = false;
var GB_HEIGHT = 400;
var GB_WIDTH = 400;

function GB_Show(messageNumber, url, height, width) {
    GB_HEIGHT = height || 400;
    GB_WIDTH = width || 400;

    var popUpMessage = "";
    switch (messageNumber) {
        case 1: popUpMessage = "<div id='GB_frame'>" +
	        "<p>You are leaving " + bankName + "'s Web site and " +
	        "linking to a non-affiliated third party site.  Please be advised that you " +
	        "will then link to a Web site hosted by another party, where you will no " +
	        "longer be subject to, or under the protection of, the privacy and security " +
	        "policies of " + bankName + ". We recommend that you review and evaluate the privacy " +
	        "and security policies of the site that you are entering. " + bankName +
	        " assumes no liability for the content, " +
	        "information, security, policies or transactions provided by these other " +
	        "sites.</p></div>";
            var caption = "Third Party Website Disclosure";
            break;
        case 2: popUpMessage = "<div id='GB_frame'><p>Your privacy is very important to us." +
            "We would like to advise you that Internet email is not secure. Please do not submit " +
            "any information that you consider confidential. We recommend you do not include your " +
            "social security or account number or other specific identifying information.</p></div>";
            //Message Specific Pop-up Caption
            var caption = "Unsecure Email Disclosure";
            break;
    }
    if (!GB_DONE) {
        jQuery(document.body).append("<div id='GB_overlay'></div><div id='GB_window' class='Shadow'><h2 id='GB_caption'></h2>"
        + "<div class='cancel'><span class='hidden'>Close Window</span></div><div class='hook'>"
				+ "<p class='continue'></p></div></div>");
        jQuery(".cancel, .continue").click(GB_hide);
        jQuery("#GB_overlay").click(GB_hide);
        jQuery(window).resize(GB_position);
        jQuery(window).scroll(GB_position);
        GB_DONE = true;
    }

    jQuery("#GB_frame").remove();
    jQuery(".continue a").remove();
    jQuery(".hook").prepend(popUpMessage);
    jQuery(".continue").append("<a href='" + url + "' target='_blank'>Continue</a>");


    jQuery("#GB_caption").html(caption);
    jQuery("#GB_overlay").show();
    GB_position();

    if (GB_ANIMATION)
        jQuery("#GB_window").slideDown("slow");
    else
        jQuery("#GB_window").show("slow");
}

function GB_hide() {
    jQuery("#GB_window,#GB_overlay").hide();
}

function GB_position() {
    var de = document.documentElement;
    var h = self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
    var w = self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
    var iebody = (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
    var dsocleft = document.all ? iebody.scrollLeft : pageXOffset;
    var dsoctop = document.all ? iebody.scrollTop : pageYOffset;

    var height = h < GB_HEIGHT ? h - 32 : GB_HEIGHT;
    var top = (h - height) / 2 + dsoctop;

    jQuery("#GB_window").css({ width: GB_WIDTH + "px", height: height + "px",
        left: ((w - GB_WIDTH) / 2) + "px", top: top + "px"
    });
    jQuery("#GB_frame").css("height", height - 100 + "px");
    jQuery("#GB_overlay").css({ height: h, top: dsoctop + "px", width: w });
}
