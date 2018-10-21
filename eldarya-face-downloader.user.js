// ==UserScript==
// @name		Eldarya Face Downloader
// @namespace	https://gitlab.com/NatoBoram/Eldarya-Face-Downloader
// @version		0.0.0
// @author		Nato Boram
// @description	Adds a button so you can download your face on Eldarya!
// @icon		https://gitlab.com/NatoBoram/Eldarya-Face-Downloader/raw/master/assets/Erika.png
// @supportURL	https://gitlab.com/NatoBoram/Eldarya-Face-Downloader/issues
//
// HTTPS
// @match		https://eldarya.com.br/*
// @match		https://eldarya.de/*
// @match		https://eldarya.es/*
// @match		https://eldarya.hu/*
// @match		https://eldarya.it/*
// @match		https://eldarya.pl/*
// @match		https://eldarya.ru/*
// @match		https://eldarya.com/*
// @match		https://eldarya.fr/*
//
// HTTPS WWW
// @match		https://www.eldarya.com.br/*
// @match		https://www.eldarya.de/*
// @match		https://www.eldarya.es/*
// @match		https://www.eldarya.hu/*
// @match		https://www.eldarya.it/*
// @match		https://www.eldarya.pl/*
// @match		https://www.eldarya.ru/*
// @match		https://www.eldarya.com/*
// @match		https://www.eldarya.fr/*
//
// @run-at		document-end
// @grant		none
// ==/UserScript==

(function() {
	'use strict';

	/**
	 * Play the game automagically!
	 */
	window.eldarya_face_downloader = {

		// Constants
		filename: "face.png",
		interval: 60 * 1000, // One minute

		/**
		 * Downloads the user's face.
		 */
		do: function() {

			// For each canvas...
			$("#playerPortraitDisplay canvas").each(function(index, canvas) {

				// Make it an image
				const image = canvas.toDataURL("image/png");

				// Create a link
				let a = document.createElement("a");

				// Make it downloadable
				a.setAttribute("href", image);
				a.setAttribute("download", eldarya_face_downloader.filename);

				// Place it on the body
				a.style.display = "none";
				document.body.appendChild(a);

				// Start the download
				a.click();

				// Remove the link
				document.body.removeChild(a);
			});
		},

		/**
		 * Adds the carousel
		 */
		add_carousel: function() {
			$(".index-carousel-slider").prepend(
				'<div class="index-carousel-slide" id="carousel-efd">' +
				'	<img class="index-carousel-picture" src="/static/img/newsCarousel/us/carousel-bienvenue.png" />' +
				'	<div class="index-carousel-side">' +
				'		<div class="index-carousel-title">Eldarya Face Downloader</div>' +
				'		<div class="index-carousel-subtitle"></div>' +
				'		<div class="index-carousel-description">Download your guardian\'s face!</div>' +
				'		<div class="index-carousel-button">' +
				'			<a class="button" onclick="eldarya_face_downloader.do();">Download</a>' +
				'		</div>' +
				'	</div>' +
				'</div>'
			);
		},
	};

	// Carousel
	setInterval(function() {

		// Check if we're on a page where there's a carousel
		if ($(".index-carousel").length === 1) {

			// Check if the carousel entry is there
			if ($("#carousel-efd").length === 0) {

				// Add it!
				eldarya_face_downloader.add_carousel();
			}
		}
	}, eldarya_face_downloader.interval);

	// Header Menu
	$("#header-menu").prepend(
		'<li>' +
		'	<a onclick="eldarya_face_downloader.do();" style="color:#34386f;">Download Face</a>' +
		'</li>'
	);

})();