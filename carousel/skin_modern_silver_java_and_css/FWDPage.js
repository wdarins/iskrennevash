var pageMenu_do;
var slidersMenu_do;
var pageThumbs_do;

var body_el = null;
var playlist1_el = null;
var playlist1SingleCat_el = null;
var playlist2_el = null;
var playlist2SingleCat_el = null;
var myDiv_el = null;
var menuHolder_el = null;
var slidersHolder_el = null;
var mainSlidersHolder_el = null;
var thumbsHolder_el = null;
var logoImage_img = null;
var byFWD_img = null;

var td_els;
var mainHeader_el = null;
var menuHolder_el = null;
var whatIsMainText_el = null;
var logoImage_img = null;
var mainFeatureTableHolder_el = null;
var col1_el = null;
var col2_el = null;
var specialNotes_el = null;

var mainWidth = 940;
var carouselHeight = 538;
var gridWidth = 940;
var byFWDImageWidth = 76;
var logoImageWidth = 461;
var windowW = 0;
var windowH = 0;

var sValues = [true, 0];

var resizeHandlerId_to;
var scrollEndId_to;

//##################################//
/* initialize page */
//##################################//
function init()
{
	body_el = document.getElementsByTagName('body')[0];
	
	playlist1_el = document.getElementById("playList1");
	playlist1SingleCat_el = document.getElementById("playList2SingleCat");
	playlist2_el = document.getElementById("playList3");
	playlist2SingleCat_el = document.getElementById("playList4SingleCat");
	
	menuHolder_el = document.getElementById("menuHolder");
	thumbsHolder_el = document.getElementById("thumbsHolder");
	slidersHolder_el = document.getElementById("slidersHolder");
	mainSlidersHolder_el = document.getElementById("mainSlidersHolder");
	
	myDiv_el = document.getElementById("myDiv");
	whyBuyImage_el = document.getElementById("whyBuy");
	logoImage_img = document.getElementById("logoImage");
	
	td_els = document.getElementsByTagName("td"); 
	specialNotes_el = document.getElementById("specialNotes");
	whatIsMainText_el = document.getElementById("whatIsMainText");
	mainFeatureTableHolder_el  = document.getElementById("mainFeatureTableHolder");
	col1_el = document.getElementById("col1");
	col2_el = document.getElementById("col2");
	mainHeader_el = document.getElementById("mainHeader");
	
	byFWD_img = document.getElementById("byFWD");
	byFWD_img.style.cursor = "pointer";
	byFWD_img.onclick = function(){
		window.location.href = "http://www.webdesign-flash.ro";
	};
	
	setupMenu();
	setupThumbsHolder();
	positionStuff();

	if(window.addEventListener){
		window.addEventListener("resize", onResizeHandler);
		if(FWDR3DCarUtils.isFirefox){
			document.addEventListener("mozfullscreenchange", onFullScreenChange);
			document.removeEventListener("fullscreenchange", onFullScreenChange);
		}
	}else if(window.attachEvent){
		window.attachEvent("onresize", onResizeHandler);
	}
	
	setupCarousel();
	
	if (!FWDR3DCarUtils.isMobile && !FWDR3DCarUtils.isIEAndLessThen9 && (carousel.propsObj.showThumbnailsHtmlContent != "yes"))
	{
		carousel.addListener(FWDRoyal3DCarousel.INTRO_START, onIntroStart);
		carousel.addListener(FWDRoyal3DCarousel.INTRO_FINISH, onIntroFinish);
	}
	
	if (!FWDR3DCarUtils.isMobile && !FWDR3DCarUtils.isIEAndLessThen9 && (carousel.propsObj.showThumbnailsHtmlContent != "yes"))
	{
		mainSlidersHolder_el.style.display = "block";
		setupSliders();
	}
	else
	{
		mainSlidersHolder_el.style.display = "none";
	}
	
	setTimeout( function(){
		positionStuff();
		removePlayLists();
		}, 100);
}

//##################################//
/* Remove playlists for better performance */
//##################################//
function removePlayLists(){
	try{
		body_el.removeChild(playlist1_el);
	}catch(e){}
	
	try{
		body_el.removeChild(playlist1SingleCat_el);
	}catch(e){}
	
	try{
		body_el.removeChild(playlist2_el);
	}catch(e){}
	
	try{
		body_el.removeChild(playlist2SingleCat_el);
	}catch(e){}
};

//##################################//
/* Full screen change handler */
//##################################//
function onFullScreenChange(e){
	var isFullScreen = document.fullScreen || !document.mozFullScreen;
	if(isFullScreen){
		clearTimeout(resizeHandlerId_to); 
		resizeHandlerId_to = setTimeout(positionStuff, 90);
	}
}

//#####################################//
/* resize handler */
//#####################################//
function onResizeHandler(){
	if(FWDR3DCarUtils.isMobile){
		clearTimeout(resizeHandlerId_to); 
		resizeHandlerId_to = setTimeout(positionStuff, 90);
	}else{
		positionStuff();
		if(FWDR3DCarUtils.isIE){
			clearTimeout(resizeHandlerId_to); 
			resizeHandlerId_to = setTimeout(positionStuff, 90);
		}
	}
}

//#####################################//
/* position stuff */
//#####################################//
function positionStuff(){
	var viewportSize = FWDR3DCarUtils.getViewportSize();
	windowW = menuHolder_el.offsetWidth;
	windowH = viewportSize.h;
	
	positionLogoImage();
	pageMenu_do.positionAndResize(windowW);
	
	if (slidersMenu_do)
	{
		slidersMenu_do.positionAndResize(windowW);
	}
	
	pageThumbs_do.positionAndResize(windowW);
	positionText();
}

//#####################################//
/* Setup menu */
//####################################//
function setupMenu(){
	FWDR3DCarPageMenu.setPrototype();
	pageMenu_do = new FWDR3DCarPageMenu({
		disabledButton:0,
		parent:menuHolder_el,
		menuLabels:["Modern <span class=\"black\">Silver</span>", "<span class=\"blue\">Modern <span class=\"bold\">Silver</span></span>",
		            "Modern <span class=\"black\">Warm</span>", "<span class=\"blue\">Modern <span class=\"bold\">Warm</span></span>",
		            "Minimal <span class=\"black\">Classic</span>", "<span class=\"blue\">Minimal <span class=\"bold\">Classic</span></span>",
					"<span class=\"black\">Transparent</span> Images Example", "<span class=\"blue\"><span class=\"bold\">Transparent</span> Images Example</span>"],
		maxWidth:mainWidth,
		buttonNormalColor:"#999999",
		buttonSelectedColor:"#009aff",
		buttonsHolderBackgroundColor:"#DDDDDD"
	});
	
	pageMenu_do.addListener(FWDR3DCarPageMenuButton.CLICK, buttonClickHandler);
}

function buttonClickHandler(e){
	if(e.id == 0){
		window.location.href = "index.html";
	}else if(e.id == 1){
		window.location.href = "index-modern-warm.html";
	}else if(e.id == 2){
		window.location.href = "index-minimal-classic.html";
	}else if(e.id == 3){
		window.location.href = "index-transparent-images.html";
	}
};

//#####################################//
/* Setup sliders menu*/
//####################################//
function setupSliders(){
	FWDR3DCarSlidersMenu.setPrototype();
	slidersMenu_do = new FWDR3DCarSlidersMenu(slidersHolder_el, sValues);
	
	slidersMenu_do.addListener(FWDR3DCarSlidersMenu.CHANGE, onSlidersMenuChange);
	
	slidersMenu_do.disable();
}

function onSlidersMenuChange(e)
{
	carousel.update(e);
};

function onIntroStart()
{
	slidersMenu_do.disable();
};

function onIntroFinish()
{
	slidersMenu_do.enable();
};

//#####################################//
/* position logo image */
//#####################################//
function positionLogoImage(){
	var byFWDX = (windowW - byFWDImageWidth - 2);
	var logoImageX = parseInt((windowW - logoImageWidth)/2);
	
	if(byFWDX > mainWidth - byFWDImageWidth){
		byFWDX = parseInt((windowW + mainWidth)/2 - byFWDImageWidth);
	}
	
	if(windowW < 500){
		byFWD_img.style.top = "-50px";
	}else{
		byFWD_img.style.top = "64px";
	}
	
	logoImage_img.style.left = logoImageX  + "px";
	byFWD_img.style.left = byFWDX + "px";
};

//#####################################//
/* position text  */
//#####################################//
function positionText()
{
	var whatIsMainTextWidth = Math.min(mainWidth - 20, windowW - 20);
	var whatIsMainTextX = parseInt((windowW - whatIsMainTextWidth)/2);
	var colWidth = parseInt((Math.min(mainWidth, windowW) - 40)/2);
	var colHolderWidth = parseInt((Math.min(mainWidth, windowW) - 20));
	
	whatIsMainText_el.style.left = whatIsMainTextX  + "px";
	whatIsMainText_el.style.width = (whatIsMainTextWidth )  + "px";
	mainFeatureTableHolder_el.style.width = colHolderWidth + "px";
	specialNotes_el.style.left = whatIsMainTextX + "px";
	specialNotes_el.style.width = whatIsMainTextWidth + "px";
	
	for(var i=0; i<td_els.length; i++){
		if(windowW < 500){
			td_els[i].style.display = "block";
			if(i == 1){
				td_els[i].style.width = "0%";
			}else{
				td_els[i].style.width = "100%";
			}
			td_els[i].style.display = "block";
		}else{
			if(i == 0){
				td_els[i].style.width = "47%";
				td_els[i].style.display = "table-cell";
			}else if(i == 1){
				td_els[i].style.width = "6%";
				td_els[i].style.display = "table-cell";
			}else{
				td_els[i].style.width = "47%";
				td_els[i].style.display = "table-cell";
			}
		}
	}
}

//#####################################//
/* Setup page thumbs */
//####################################//
function setupThumbsHolder()
{
	FWDR3DCarPageThumbs.setPrototype();
	
	pageThumbs_do = new FWDR3DCarPageThumbs({
		parent:thumbsHolder_el,
		imagesPath:["graphics/imageFluid", 
		            "graphics/imageFixed",
					"graphics/htmlFluid",
					"graphics/htmlFixed"],
		maxWidth:mainWidth,
		thumbnailBorderColor:"#FFFFFF",
		textNormalColor:"#55595c",
		textSelectedColor:"#009aff",
		wiewSampleTextColor:"#FFFFFF",
		shadowOffsetX:2,
		shadowOffsetY:2,
		shadowOffsetW:-4,
		shadowOffsetH:-4
	});
	
	pageThumbs_do.addListener(FWDR3DCarPageThumb.CLICK, onThumbPressedHandler);
}

function onThumbPressedHandler(e)
{
	var newY;
	
	if(e.id == 0 || e.id == 1 || e.id == 2 || e.id == 3){
		if(carousel){
			carousel.destroy();
			carousel = null;
		}
	}

	if(e.id == 0){
		body_el.appendChild(playlist1_el);
		carouselHeight = 538;
		setupCarousel();
	}else if(e.id == 1){
		body_el.appendChild(playlist1SingleCat_el);
		carouselHeight = 538;
		setupCarousel1();
	}else if(e.id == 2){
		body_el.appendChild(playlist2_el);
		carouselHeight = 538;
		setupCarousel2();
	}else if(e.id == 3){
		body_el.appendChild(playlist2SingleCat_el);
		carouselHeight = 538;
		setupCarousel3();
	}
	
	if (slidersMenu_do)
	{
		slidersMenu_do.destroy();
		slidersMenu_do = null;
	}
	
	if (!FWDR3DCarUtils.isMobile && !FWDR3DCarUtils.isIEAndLessThen9 && (carousel.propsObj.showThumbnailsHtmlContent != "yes"))
	{
		carousel.addListener(FWDRoyal3DCarousel.INTRO_START, onIntroStart);
		carousel.addListener(FWDRoyal3DCarousel.INTRO_FINISH, onIntroFinish);
	}
	
	if (!FWDR3DCarUtils.isMobile && !FWDR3DCarUtils.isIEAndLessThen9 && (carousel.propsObj.showThumbnailsHtmlContent != "yes"))
	{
		mainSlidersHolder_el.style.display = "block";
		setupSliders();
		positionStuff();
	}
	else
	{
		mainSlidersHolder_el.style.display = "none";
	}
	
	if(e.id == 0 || e.id == 1 || e.id == 2 || e.id == 3){
		pageThumbs_do.enableOrDisableThumbs(e.id);
		scale = Math.min(windowW, gridWidth)/mainWidth;	
		newY = window.pageYOffset +  myDiv_el.getBoundingClientRect().top;
		newY -=  parseInt((windowH - (carouselHeight * scale))/2);
		
		window.scrollTo(0, newY);
	}	
}

//##########################################//
/* Setup carousel's functions */
//#########################################//
function setupCarousel1(){
	carousel = new FWDRoyal3DCarousel({
		
		//required settings
		carouselHolderDivId:"myDiv",
		carouselDataListDivId:"playList2SingleCat",
		displayType:"responsive",
		autoScale:"yes",
		carouselWidth:940,
		carouselHeight:538,
		skinPath:"load/skin_modern_silver",
									
		//main settings
		backgroundColor:"#DDDDDD",
		backgroundImagePath:"load/skin_modern_silver/background.jpg",
		thumbnailsBackgroundImagePath:"load/skin_modern_silver/thumbnailsBackground.jpg",
		scrollbarBackgroundImagePath:"load/skin_modern_silver/scrollbarBackground.jpg",
		backgroundRepeat:"repeat-x",
		showDisplay2DAlways:"no",
		carouselStartPosition:"center",
		numberOfThumbnailsToDisplayLeftAndRight:4,
		slideshowDelay:5000,
		autoplay:"no",
		showPrevButton:"yes",
		showNextButton:"yes",
		showSlideshowButton:"yes",
		disableNextAndPrevButtonsOnMobile:"no",
		controlsMaxWidth:940,
		slideshowTimerColor:"#777777",
		showContextMenu:"no",
		addKeyboardSupport:"yes",
									
		//thumbnail settings
		thumbnailWidth:420,
		thumbnailHeight:286,
		thumbnailSpaceOffset3D:-22,
		thumbnailSpaceOffset2D:-22,
		thumbnailBorderSize:10,
		thumbnailBackgroundColor:"#666666",
		thumbnailBorderColor1:"#fcfdfd",
		thumbnailBorderColor2:"#e4e4e4",
		transparentImages:"no",
		maxNumberOfThumbnailsOnMobile:13,
		showThumbnailsGradient:"yes",
		showThumbnailsHtmlContent:"no",
		textBackgroundColor:"#333333",
		textBackgroundOpacity:.7,
		showText:"yes",
		showTextBackgroundImage:"yes",
		showThumbnailBoxShadow:"yes",
		thumbnailBoxShadowCss:"0px 2px 2px #555555",
		showReflection:"yes",
		reflectionHeight:60,
		reflectionDistance:0,
		reflectionOpacity:.2,
									
		//scrollbar settings
		showScrollbar:"yes",
		disableScrollbarOnMobile:"yes",
		enableMouseWheelScroll:"yes",
		scrollbarHandlerWidth:300,
		scrollbarTextColorNormal:"#777777",
		scrollbarTextColorSelected:"#000000",
									
		//combobox settings
		showComboBox:"no",
		startAtCategory:1,
		selectLabel:"SELECT CATEGORIES",
		allCategoriesLabel:"All Categories",
		showAllCategories:"no",
		comboBoxPosition:"topright",
		selectorBackgroundNormalColor1:"#fcfdfd",
		selectorBackgroundNormalColor2:"#e4e4e4",
		selectorBackgroundSelectedColor1:"#a7a7a7",
		selectorBackgroundSelectedColor2:"#8e8e8e",
		selectorTextNormalColor:"#8b8b8b",
		selectorTextSelectedColor:"#FFFFFF",
		buttonBackgroundNormalColor1:"#e7e7e7",
		buttonBackgroundNormalColor2:"#e7e7e7",
		buttonBackgroundSelectedColor1:"#a7a7a7",
		buttonBackgroundSelectedColor2:"#8e8e8e",
		buttonTextNormalColor:"#000000",
		buttonTextSelectedColor:"#FFFFFF",
		comboBoxShadowColor:"#000000",
		comboBoxHorizontalMargins:12,
		comboBoxVerticalMargins:12,
		comboBoxCornerRadius:0,
									
		//lightbox settings
		addLightBoxKeyboardSupport:"yes",
		showLightBoxNextAndPrevButtons:"yes",
		showLightBoxZoomButton:"yes",
		showLightBoxInfoButton:"yes",
		showLighBoxSlideShowButton:"yes",
		showLightBoxInfoWindowByDefault:"no",
		slideShowAutoPlay:"no",
		lightBoxVideoAutoPlay:"no",
		lightBoxVideoWidth:640,
		lightBoxVideoHeight:480,
		lightBoxIframeWidth:800,
		lightBoxIframeHeight:600,
		lightBoxBackgroundColor:"#000000",
		lightBoxInfoWindowBackgroundColor:"#FFFFFF",
		lightBoxItemBorderColor1:"#fcfdfd",
		lightBoxItemBorderColor2:"#e4e4e4",
		lightBoxItemBackgroundColor:"#333333",
		lightBoxMainBackgroundOpacity:.8,
		lightBoxInfoWindowBackgroundOpacity:.9,
		lightBoxBorderSize:5,
		lightBoxBorderRadius:0,
		lightBoxSlideShowDelay:4000
	});
}

function setupCarousel2(){
	
	carousel = new FWDRoyal3DCarousel({		
		//required settings
		carouselHolderDivId:"myDiv",
		carouselDataListDivId:"playList3",
		displayType:"fluidwidth",
		autoScale:"yes",
		carouselWidth:940,
		carouselHeight:538,
		skinPath:"load/skin_modern_silver",
									
		//main settings
		backgroundColor:"#DDDDDD",
		backgroundImagePath:"load/skin_modern_silver/background.jpg",
		thumbnailsBackgroundImagePath:"load/skin_modern_silver/thumbnailsBackground.jpg",
		scrollbarBackgroundImagePath:"load/skin_modern_silver/scrollbarBackground.jpg",
		backgroundRepeat:"repeat-x",
		showDisplay2DAlways:"no",
		carouselStartPosition:"center",
		numberOfThumbnailsToDisplayLeftAndRight:4,
		slideshowDelay:5000,
		autoplay:"no",
		showPrevButton:"yes",
		showNextButton:"yes",
		showSlideshowButton:"yes",
		disableNextAndPrevButtonsOnMobile:"no",
		controlsMaxWidth:940,
		slideshowTimerColor:"#777777",
		showContextMenu:"no",
		addKeyboardSupport:"yes",
									
		//thumbnail settings
		thumbnailWidth:400,
		thumbnailHeight:350,
		thumbnailSpaceOffset3D:70,
		thumbnailSpaceOffset2D:70,
		thumbnailBorderSize:10,
		thumbnailBackgroundColor:"#666666",
		thumbnailBorderColor1:"#fcfdfd",
		thumbnailBorderColor2:"#e4e4e4",
		transparentImages:"no",
		maxNumberOfThumbnailsOnMobile:13,
		showThumbnailsGradient:"yes",
		showThumbnailsHtmlContent:"yes",
		textBackgroundColor:"#333333",
		textBackgroundOpacity:.7,
		showText:"no",
		showTextBackgroundImage:"yes",
		showThumbnailBoxShadow:"yes",
		thumbnailBoxShadowCss:"0px 2px 2px #555555",
		showReflection:"yes",
		reflectionHeight:60,
		reflectionDistance:0,
		reflectionOpacity:.2,
									
		//scrollbar settings
		showScrollbar:"yes",
		disableScrollbarOnMobile:"yes",
		enableMouseWheelScroll:"yes",
		scrollbarHandlerWidth:300,
		scrollbarTextColorNormal:"#777777",
		scrollbarTextColorSelected:"#000000",
									
		//combobox settings
		showComboBox:"no",
		startAtCategory:1,
		selectLabel:"SELECT CATEGORIES",
		allCategoriesLabel:"All Categories",
		showAllCategories:"no",
		comboBoxPosition:"topright",
		selectorBackgroundNormalColor1:"#fcfdfd",
		selectorBackgroundNormalColor2:"#e4e4e4",
		selectorBackgroundSelectedColor1:"#a7a7a7",
		selectorBackgroundSelectedColor2:"#8e8e8e",
		selectorTextNormalColor:"#8b8b8b",
		selectorTextSelectedColor:"#FFFFFF",
		buttonBackgroundNormalColor1:"#e7e7e7",
		buttonBackgroundNormalColor2:"#e7e7e7",
		buttonBackgroundSelectedColor1:"#a7a7a7",
		buttonBackgroundSelectedColor2:"#8e8e8e",
		buttonTextNormalColor:"#000000",
		buttonTextSelectedColor:"#FFFFFF",
		comboBoxShadowColor:"#000000",
		comboBoxHorizontalMargins:12,
		comboBoxVerticalMargins:12,
		comboBoxCornerRadius:0,
									
		//lightbox settings
		addLightBoxKeyboardSupport:"yes",
		showLightBoxNextAndPrevButtons:"yes",
		showLightBoxZoomButton:"yes",
		showLightBoxInfoButton:"yes",
		showLighBoxSlideShowButton:"yes",
		showLightBoxInfoWindowByDefault:"no",
		slideShowAutoPlay:"no",
		lightBoxVideoAutoPlay:"no",
		lightBoxVideoWidth:640,
		lightBoxVideoHeight:480,
		lightBoxIframeWidth:800,
		lightBoxIframeHeight:600,
		lightBoxBackgroundColor:"#000000",
		lightBoxInfoWindowBackgroundColor:"#FFFFFF",
		lightBoxItemBorderColor1:"#fcfdfd",
		lightBoxItemBorderColor2:"#e4e4e4",
		lightBoxItemBackgroundColor:"#333333",
		lightBoxMainBackgroundOpacity:.8,
		lightBoxInfoWindowBackgroundOpacity:.9,
		lightBoxBorderSize:5,
		lightBoxBorderRadius:0,
		lightBoxSlideShowDelay:4000
	});
}

function setupCarousel3(){
	
	carousel = new FWDRoyal3DCarousel({		
		//required settings
		carouselHolderDivId:"myDiv",
		carouselDataListDivId:"playList4SingleCat",
		displayType:"responsive",
		autoScale:"yes",
		carouselWidth:940,
		carouselHeight:538,
		skinPath:"load/skin_modern_silver",
									
		//main settings
		backgroundColor:"#DDDDDD",
		backgroundImagePath:"load/skin_modern_silver/background.jpg",
		thumbnailsBackgroundImagePath:"load/skin_modern_silver/thumbnailsBackground.jpg",
		scrollbarBackgroundImagePath:"load/skin_modern_silver/scrollbarBackground.jpg",
		backgroundRepeat:"repeat-x",
		showDisplay2DAlways:"no",
		carouselStartPosition:"center",
		numberOfThumbnailsToDisplayLeftAndRight:4,
		slideshowDelay:5000,
		autoplay:"no",
		showPrevButton:"yes",
		showNextButton:"yes",
		showSlideshowButton:"yes",
		disableNextAndPrevButtonsOnMobile:"no",
		controlsMaxWidth:940,
		slideshowTimerColor:"#777777",
		showContextMenu:"no",
		addKeyboardSupport:"yes",
									
		//thumbnail settings
		thumbnailWidth:400,
		thumbnailHeight:350,
		thumbnailSpaceOffset3D:70,
		thumbnailSpaceOffset2D:70,
		thumbnailBorderSize:10,
		thumbnailBackgroundColor:"#666666",
		thumbnailBorderColor1:"#fcfdfd",
		thumbnailBorderColor2:"#e4e4e4",
		transparentImages:"no",
		maxNumberOfThumbnailsOnMobile:13,
		showThumbnailsGradient:"yes",
		showThumbnailsHtmlContent:"yes",
		textBackgroundColor:"#333333",
		textBackgroundOpacity:.7,
		showText:"no",
		showTextBackgroundImage:"yes",
		showThumbnailBoxShadow:"yes",
		thumbnailBoxShadowCss:"0px 2px 2px #555555",
		showReflection:"yes",
		reflectionHeight:60,
		reflectionDistance:0,
		reflectionOpacity:.2,
									
		//scrollbar settings
		showScrollbar:"yes",
		disableScrollbarOnMobile:"yes",
		enableMouseWheelScroll:"yes",
		scrollbarHandlerWidth:300,
		scrollbarTextColorNormal:"#777777",
		scrollbarTextColorSelected:"#000000",
									
		//combobox settings
		showComboBox:"yes",
		startAtCategory:1,
		selectLabel:"SELECT CATEGORIES",
		allCategoriesLabel:"All Categories",
		showAllCategories:"no",
		comboBoxPosition:"topright",
		selectorBackgroundNormalColor1:"#fcfdfd",
		selectorBackgroundNormalColor2:"#e4e4e4",
		selectorBackgroundSelectedColor1:"#a7a7a7",
		selectorBackgroundSelectedColor2:"#8e8e8e",
		selectorTextNormalColor:"#8b8b8b",
		selectorTextSelectedColor:"#FFFFFF",
		buttonBackgroundNormalColor1:"#e7e7e7",
		buttonBackgroundNormalColor2:"#e7e7e7",
		buttonBackgroundSelectedColor1:"#a7a7a7",
		buttonBackgroundSelectedColor2:"#8e8e8e",
		buttonTextNormalColor:"#000000",
		buttonTextSelectedColor:"#FFFFFF",
		comboBoxShadowColor:"#000000",
		comboBoxHorizontalMargins:12,
		comboBoxVerticalMargins:12,
		comboBoxCornerRadius:0,
									
		//lightbox settings
		addLightBoxKeyboardSupport:"yes",
		showLightBoxNextAndPrevButtons:"yes",
		showLightBoxZoomButton:"yes",
		showLightBoxInfoButton:"yes",
		showLighBoxSlideShowButton:"yes",
		showLightBoxInfoWindowByDefault:"no",
		slideShowAutoPlay:"no",
		lightBoxVideoAutoPlay:"no",
		lightBoxVideoWidth:640,
		lightBoxVideoHeight:480,
		lightBoxIframeWidth:800,
		lightBoxIframeHeight:600,
		lightBoxBackgroundColor:"#000000",
		lightBoxInfoWindowBackgroundColor:"#FFFFFF",
		lightBoxItemBorderColor1:"#fcfdfd",
		lightBoxItemBorderColor2:"#e4e4e4",
		lightBoxItemBackgroundColor:"#333333",
		lightBoxMainBackgroundOpacity:.8,
		lightBoxInfoWindowBackgroundOpacity:.9,
		lightBoxBorderSize:5,
		lightBoxBorderRadius:0,
		lightBoxSlideShowDelay:4000
	});

}