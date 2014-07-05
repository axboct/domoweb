(function(){
	var button = document.querySelector('#cn-button'),
    wrapper = document.querySelector('#cn-wrapper'),
    overlay = document.querySelector('#cn-overlay'),
    menuConfigure = document.querySelector('#menuConfigure'),
    menuWidgets = document.querySelector('#menuWidgets'),
    panelConfigure = document.querySelector('#panelConfigure'),
    main = document.querySelector('main');

	//open and close menu when the button is clicked
	var open = false;
	button.addEventListener('click', handler, false);
	wrapper.addEventListener('click', cnhandle, false);
	menuConfigure.addEventListener('click', configureHandler, false);
	menuWidgets.addEventListener('click', widgetsHandler, false);

	function cnhandle(e){
		e.stopPropagation();
	}

	function handler(e){
		if (!e) var e = window.event;
	 	e.stopPropagation();//so that it doesn't trigger click event on document

	  	if(!open){
	    	openNav();
	  	}
	 	else{
	    	closeNav();
	  	}
	}
	function openNav(){
		open = true;
	    button.innerHTML = "<span class='sr-only'>Close Menu</span>";
	    overlay.classList.add('on-overlay');
	    wrapper.classList.add('opened-nav');
	}
	function closeNav(){
		open = false;
		button.innerHTML = "<span class='sr-only'>Open Menu</span>";
	    overlay.classList.remove('on-overlay');
	    wrapper.classList.remove('opened-nav');
	}
	document.addEventListener('click', closeNav);

	function configureHandler(){
		var modalOverlay = document.querySelector('#modal-overlay');
		var ajax = document.querySelector('#ajax');
		ajax.setAttribute('handleAs', 'text');
		ajax.addEventListener("polymer-response",
			function(e) {
				var response = e.detail.response;
				if (response == "{success:true}") {
						modalOverlay.classList.remove('on');
					modalOverlay.innerHTML = '';
				} else {
					modalOverlay.innerHTML = response;
					var saveConfig = modalOverlay.querySelector('#saveConfig');
					var cancelConfig = modalOverlay.querySelector('#cancelConfig');
					var formConfig = modalOverlay.querySelector('#formConfig');
					saveConfig.addEventListener("click",
						function(e) {
							ajax.setAttribute('body', serialize(formConfig));
							ajax.setAttribute('method', 'POST');
							ajax.setAttribute('params', '{"action":"section", "id":"' + sectionid + '"}');
							ajax.go();
							e.preventDefault();
							e.stopPropagation();
							return false;
						});
					cancelConfig.addEventListener("click",
						function(e) {
							modalOverlay.classList.remove('on');
							modalOverlay.innerHTML = '';
							e.preventDefault();
							e.stopPropagation();
							return false;
						});

					// Preview widget
					var inputs = modalOverlay.querySelectorAll('#widgetstyle input');
					inputs = Array.prototype.slice.call(inputs);
					inputs.forEach(function(element) {
						element.addEventListener('change', onWidgetStyleChange);
					});

					// Background selector
					$("#SectionBackground").imagepicker();

					// Upload button
					var uploader = new qq.FileUploader({
                        element: document.getElementById('file-uploader-background'),
                        action: '/upload',
                        onComplete: function(id, fileName, responseJSON){
                        	$("#SectionBackground").append("<option data-img-src='/backgrounds/thumbnails/" + fileName + "' value='" + fileName + "'>" + fileName + "</option>");
                        	$("#SectionBackground").imagepicker();
                        },
                    });           

					modalOverlay.classList.add('on');
				}
			});
		ajax.setAttribute('method', 'GET');
		ajax.setAttribute('params', '{"action":"section", "id":"' + sectionid + '"}');
		ajax.go();
		closeNav();
	}

	var widgetEdit = false;
	function widgetsHandler(){
		widgetEdit = !widgetEdit;
		if (widgetEdit) {
			document.querySelector('dmw-grid-layout').setAttribute('edit', '');
		} else {
			document.querySelector('dmw-grid-layout').removeAttribute('edit');
		}
		closeNav();
	}

	function onWidgetStyleChange(e) {
		var widgetpreview = document.querySelector('#modal-overlay #widgetpreview');
		switch(e.target.id) {
		    case 'WidgetTextColor':
		    	widgetpreview.style.color = e.target.value;
		        break;
		    case 'WidgetBorderColor':
			    widgetpreview.style.borderColor = e.target.value;
		        break;
		    case 'WidgetBackgroundColor':
		    	widgetpreview.style.backgroundColor = e.target.value;
		        break;
		    case 'WidgetBorderRadius':
			    widgetpreview.style.borderRadius = e.target.value;
		        break;
		} 
	}
})();
