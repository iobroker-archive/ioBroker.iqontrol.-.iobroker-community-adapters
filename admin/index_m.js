<html>
<head>
	<!-- iQontrol - Copyright (c) by Sebatian Bormann -->
	<!-- Please visit https://github.com/sbormann/ioBroker.iqontrol for licence-agreement and further information -->

	<!-- Load ioBroker scripts and styles-->
	<link rel="stylesheet" type="text/css" href="../../css/adapter.css" />
    <link rel="stylesheet" type="text/css" href="../../lib/css/fancytree/ui.fancytree.min.css" id="fancytreeCSSLink" />
	<link rel="stylesheet" type="text/css" href="../../lib/css/materialize.css">

	<script type="text/javascript" src="../../lib/js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="../../socket.io/socket.io.js"></script>

    <script type="text/javascript" src="../../lib/js/materialize.js"></script>
    <script type="text/javascript" src="../../lib/js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="../../lib/js/jquery.fancytree-all.min.js"></script>

    <script type="text/javascript" src="../../js/translate.js"></script>
    <script type="text/javascript" src="../../lib/js/selectID.js"></script>
    <script type="text/javascript" src="../../js/adapter-settings.js"></script>

	<!-- Load own files -->
	<link rel="stylesheet" type="text/css" href="style.css" />
	<link rel="stylesheet" type="text/css" href="./materialize-colorpicker/css/materialize-colorpicker.min.css" />
	<script type="text/javascript" src="./materialize-colorpicker/js/materialize-colorpicker.min.js"></script>
	<link rel="stylesheet" type="text/css" href="./codemirror/lib/codemirror.css" />
	<link rel="stylesheet" type="text/css" href="./codemirror/theme/material.css" />
	<script type="text/javascript" src="./codemirror/lib/codemirror.js"></script>
	<script type="text/javascript" src="./codemirror/mode/xml/xml.js"></script>
	<script type="text/javascript" src="./codemirror/mode/javascript/javascript.js"></script>
	<script type="text/javascript" src="./codemirror/mode/css/css.js"></script>
	<script type="text/javascript" src="./codemirror/mode/htmlmixed/htmlmixed.js"></script>
	<script type="text/javascript" src="./jquery.ui.touch-punch.min.js"></script>
	<script type="text/javascript" src="words.js"></script>
    <script type="text/javascript" src="type-detector.js"></script>
	<script type="text/javascript" src="index_m.js"></script>

	<style>
		.modal { max-height:85% !important; max-width:95% !important; width:95% !important; height:80% !important; overflow: visible !important;}
		.dialog-select-container {max-height: 90% !important;}
		.m .page {height: auto !important; min-height:75% !important;}
		#tableViews .dropdown-content {width: auto !important;}
		#tableDevices .dropdown-content {width: auto !important;}
		.table-values.highlight > tbody > tr:hover { background-color: rgba(0,0,0,0.04) !important; }
		.table-values.highlight > tbody > tr:nth-child(2n):hover { background-color: rgba(0,0,0,0.2) !important; }
		.validateOnlyError.valid { border-bottom: 1px solid #9e9e9e !important; box-shadow: none !important;}
		.inputClear, .selectClear, .inputEdit { display: block !important; position: absolute !important; right: 20px !important; top: 7px !important; margin: auto !important; }
		.combobox{ position: relative; }
		.comboboxDropdownTrigger{ display: block !important; position: absolute !important; right: 0px !important; top: 0px !important; margin: 0px !important; padding: 0px !important; }
		.combobox .dropdown-content { left: unset !important; width: unset !important; min-width: 100% !important;}
		.multiple-select-dropdown.dropdown-content li span, .multiple-select-dropdown.dropdown-content li span label { pointer-events: none; }
		.CodeMirror{ width: 100%; width: calc(100% - 25px); height: unset !important; position: absolute; }
		.collapsible-body .row:not(:first-child) p.sub-title{ padding-top:15px; }
		h6.heading { background: rgba(0,0,0,0.02); margin-left:-35px; padding: 5px 0 7px 40px; box-shadow: rgba(0,0,0,0.25) 1px 1px 2px 0px; }
		.headingIcon{ width:48px; height:48px; float:right; }
		.tabs { scrollbar-width: 2px; } .tabs::-webkit-scrollbar { height: 2px; }
		.scrollableTable { overflow-x: auto; }
		.scrollableTable > div { min-width: 520px; width: calc(100% - 15px); }
		.scrollableTable.wide > div { min-width: 820px; width: calc(100% - 15px); }
		.scrollableTable.xwide > div { min-width: 1020px; width: calc(100% - 15px); }
	</style>
</head>

<body>
	<!-- ++++++++++ TABS ++++++++++ -->
	<div class="m adapter-container">
		<div class="row">
			<div class="col s12 m4 l2">
				<img src="iqontrol.png" class="logo mainLink">
			</div>
			<div class="col s8 m6 l4 loadingObjects" style="display:none;">
				<p class="translate">Still loading some objects...</p>
				<div id="mainLoadingObjectsProgress" class="progress loadingObjects" style="position: absolute; bottom: -17px; left: 0px; width: 100%;"><div class="indeterminate"></div></div>
			</div>
		</div>

		<div class="row">
			<div class="col s12 tabcontainer">
				<ul class="tabs hideOnLoad" id="iQontrolTabs" style="display: none;">
					<li class="tab"><a href="#tabMain" class="translate active">Start</a></li>
					<li class="tab"><a href="#tabViews" class="translate">Views</a></li>
					<li class="tab"><a href="#tabDevices" class="translate">Devices</a></li>
					<li class="tab"><a href="#tabToolbar" class="translate">Toolbar/Panel</a></li>
					<li class="tab"><a href="#tabImages" class="translate">Images/Widgets</a></li>
					<li class="tab"><a href="#tabLists" class="translate">Lists/Counters</a></li>
					<li class="tab"><a href="#tabOptions" class="translate">Options</a></li>
				</ul>
			</div>

			<!-- ++++++++++ TAB: Main ++++++++++ -->
			<div id="tabMain"    class="col s12 page">
				<div class="row">
					<div class="col s12">
						<h6 class="translate sub-title heading">Start</h6>
					</div>
				</div>
				<div class="row showOnLoad">
					<div class="col s12">
						<p class="translate">Loading settings...</p>
						<div id="mainShowOnLoadProgress" class="progress showOnLoad" style="position: absolute; bottom: -17px; left: 0px; width: 100%; display: none;"><div class="indeterminate"></div></div>
					</div>
				</div>
				<div class="row hideOnLoad" style="display: none;">
					<div class="col s12">
						<p>
							<span class="translate">Start setting up your interface by:</span>
							<ol>
								<li><span class="translate">Start creating views.</span><br>
										<span class="translate">You can consider views as something like a page.</span></li>
								<li><span class="translate">Then create devices on these views.</span><br>
										<span class="translate">Devices have a role, that determines the function of the device, which icons are used and so on.</span><br>
										<span class="translate">Depending on that role you can link several states to the device. These will give the device its functionality.</span><br>
										<span class="translate">If you select 'Link to other view' as role you can create links to other views. I suggest skinning Links to other views with the same Background, the linked view has.</span><br>
										<span class="translate">You can also try to use the Autocreate-Function to choose an existing device from the iobroker-object-tree. Autocreate tries to find out the role and to match as many states as possible.</span></li>
								<li><span class="translate">Afterwards you can create a toolbar, which is displayed as footer.</span><br>
										<span class="translate">Toolbar-Entrys are links to views.</span><br>
										<span class="translate">The first Toolbar-Entry will be your 'Home-View' with will be loaded at start.</span></li>
								<li><span class="translate">To give everything a fancy style, you can upload your own images.</span><br>
										<span class="translate">You can use your images as background-images for views, or for devices.</span><br>
										<span class="translate">Images in the folder '/usericons' can be used as icons for devices.</span><br>
										<span class="translate">The free builtin demo-wallpapers are from www.pexels.com.</span></li>
							</ol>
						</p>
					</div>
				</div>
				<div class="row hideOnLoad" style="display: none;">
					<div class="col s12">
						<h6><i class="material-icons" style="vertical-align: middle; font-size: 1rem; margin-right: 6px;">warning</i>&nbsp;<span class="translate">Warning: make shure you have a backup!</span>&nbsp;<span class="translate">You can create backups under Options - Backup/Restore.</span></h6>
					</div>
				</div>
				
				
				
				<div class="row loadingObjects" style="display: none;">
					<div class="col s12">
						<p class="translate">Still loading some objects in the background...</p>
						<div id="mainLoadingObjectsProgress" class="progress loadingObjects" style="position: absolute; bottom: -17px; left: 0px; width: 100%; display: none;"><div class="indeterminate"></div></div>
					</div>
				</div>
				<div class="row hideOnLoad" style="display: none;">
					<div class="col s12">
						<br><br>
						<a class="waves-effect waves-light btn mainLink" target="_blank"><i class="material-icons left">open_in_new</i><span class="translate">Open iQontrol</span></a>
					</div>
				</div>
				<div class="row hideOnLoad" style="display: none;">
					<div class="col s12">
						<br>
						<p style="font-size: small;" class="translate">If you like it, please consider a donation:</p>
						<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LDHZMNPXKRX2N&source=url" target="_blank">
							<img src="https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif" alt="Paypal"></img>
						</a>
					</div>
				</div>
				<!--div class="row">
					<div class="col s12">
						<br><br>
						<p><i class="material-icons left">error</i><span class="translate">You need to activate integrated socket.IO and disable 'Force Web-Sockets' in web-adapter-settings!</span></p>
					</div>
				</div-->
				<div class="row hideOnLoad" style="display: none;">
					<div class="col s12">
						<br>
						<p style="font-size: small;">(C) Sebastian Bormann</p>
					</div>
				</div>
			</div>

			<!-- ++++++++++ TAB: Views ++++++++++ -->
			<div id="tabViews"    class="col s12 page">
				<div class="row">
					<div class="col s12">
						<img src="views.png"  class="headingIcon">
						<h6 class="translate sub-title heading">Views</h6>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<a class="waves-effect waves-light btn disabled" id="viewsAutocreateButton"><i class="material-icons left">grain</i><span class="translate">Autocreate Views</span><div id="viewsAutocreateButtonProgress" class="progress" style="position: absolute; bottom: -17px; left: 0px; width: 100%; display: none;"><div class="indeterminate"></div></div></a>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<h6 class="translate sub-title">List of Views</h6>
					</div>
				</div>
				<div class="col s12 scrollableTable" id="tableViews">
					<div class="row">
						<div class="col s2 m1 l1">
							<button title="Add" class="translateT table-button-add btn-floating waves-effect waves-light btn-small">
								<i class="material-icons">add</i>
							</button>
						</div>
					</div>
					<div class="col s12 m12 l12">
						<table class="table-values highlight" style="width: 90%;">
							<thead>
								<tr>
									<th data-name="commonName" class="translate">Name</th>
									<th data-name="nativeHideName" data-type="checkbox" class="translate" style="width:10px;">Hide Name</th>
									<th data-name="nativeBackgroundImage" class="translate">Background Image</th>
									<th data-buttons="edit delete drag_handle" style="width:135px;"></th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="col s12 center">
						<h5 id="viewsNoDuplicatesAllowed" class="translate" style="display: none; color: red;">No duplicates allowed! View Names have to be unique.</h5>
					</div>
				</div>
			</div>

			<!-- ++++++++++ TAB: Devices ++++++++++ -->
			<div id="tabDevices"    class="col s12 page">
				<div class="row">
					<div class="col s12">
						<img src="devices.png"  class="headingIcon">
						<h6 class="translate sub-title heading">Devices</h6>
					</div>
				</div>
				<div class="row">
					<div class="valign-wrapper">
						<div class="input-field col s10 m6 l4">
							<select class="value" id="devicesSelectedView">
							</select>
							<label for="devicesSelectedView" class="translate"></label>
							<span class="translate">View to edit</span>
						</div>
						<div class="col s2 m6 l8">
							<a class="waves-effect waves-light btn" data-role="prev" id="devicesPrevView"><i class="material-icons left">chevron_left</i></a>
							<a class="waves-effect waves-light btn" data-role="next" id="devicesNextView"><i class="material-icons left">chevron_right</i></a>
						</div>
					</div>
				</div>
				<div class="row divDevicesNothingSelected" style="min-height: 500px;">
					<div class="col s12">
						<h6 class="translate sub-title" style="display: none;">Please select a device to edit</h6><!-- Placeholder - needed to fix issue with unscrollable selectbox -->
					</div>
				</div>
				<div class="row divDevices" style="display:none;">
					<div class="col s12">
						<h6 class="translate sub-title">Operations</h6>
					</div>
				</div>
				<div class="row divDevices" style="display:none;">
					<div class="col s12">
						<a class="waves-effect waves-light btn" id="devicesAutocreateButton"><i class="material-icons left">check_circle</i><span class="translate">Autocreate Device</span></a>
						<a class="waves-effect waves-light btn" id="devicesCopyFromButton"><i class="material-icons left">content_copy</i><span class="translate">Copy Existing Device to this view</span></a>
						<a class="waves-effect waves-light btn" id="devicesAutocreateWidgetButton"><i class="material-icons left">widgets</i><span class="translate">Autocreate Widget</span></a>
					</div>
				</div>
				<div class="row divDevices" style="display:none;">
					<div class="col s12">
						<h6 class="translate sub-title">Devices of selected View</h6>
					</div>
				</div>
				<div class="col s12 divDevices scrollableTable" id="tableDevices">
					<div class="row">
						<div class="col s2 m1 l1">
							<button title="Add" class="translateT table-button-add btn-floating waves-effect waves-light btn-small">
								<i class="material-icons">add</i>
							</button>
						</div>
					</div>
					<div class="col s12 m12 l12">
						<table class="table-values highlight" style="width: 90%;">
							<thead>
								<tr>
									<th data-name="commonName" class="translate">Name</th>
									<th data-name="nativeNewLine" data-type="checkbox" class="translate" style="width:10px;">NL</th>
									<th data-name="nativeHeading" class="translate">Heading</th>
									<th data-name="nativeHeadingOptions" style="width:75px;"><i class="material-icons left">more_vert</i></th>
									<th data-name="nativeLinkedView" data-type="select" class="translate">Linked View</th>
									<th data-name="nativeBackgroundImage" class="translate">Background Image</th>
									<th data-name="nativeBackgroundImageActive" class="translate">Background Image Active</th>
									<th data-buttons="edit content_copy delete drag_handle" style="width:135px;"></th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
				<div class="row divDevices" style="display:none;">
					<div class="col s11" style="font-size: small;">
						<p><br></p>
						<span class="translate">NL = New Line</span>.<br>
						<br>
						<span class="translate">Heading: This is optional. If set, a new line with a new heading will be inserted.</span><br>
						<br>
						<span class="translate">A 'Linked View' can be opened by a simple click at the following roles</span>:  
						<span class="translate">Link to other view</span>, 
						<span class="translate">Window</span>, 
						<span class="translate">Door</span>, 
						<span class="translate">Fire-Sensor</span>, 
						<span class="translate">Flood-Sensor</span>, 
						<span class="translate">Temperature-Sensor</span>, 
						<span class="translate">Humidity-Sensor</span>,  
						<span class="translate">Pressure-Sensor</span>,  
						<span class="translate">Brightness-Sensor</span> 
						<span class="translate">and</span> 
						<span class="translate">Motion-Sensor</span>. 
						<span class="translate">However, this can be changed in options of the device.</span><br>
						<br>
						<span class="translate">You can use variables in headings, device-names and image-filenames</span> (<a href="https://github.com/sbormann/ioBroker.iqontrol#icons-and-background-images" target="_blank"><span class="translate">see here</span> <i class="material-icons tiny">live_help</i></a>).
					</div>
				</div>
			</div>

			<!-- ++++++++++ TAB: Toolbar ++++++++++ -->
			<div id="tabToolbar"    class="col s12 page">
				<div class="row">
					<div class="col s12">
						<img src="toolbar.png"  class="headingIcon">
						<h6 class="translate sub-title heading">Toolbar</h6>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<p class="translate sub-title">Entries:</p>
					</div>
				</div>
				<div class="row">
					<div class="col s12 scrollableTable" id="tableToolbar">
						<div class="row">
							<div class="col s2 m1 l1">
								<button title="Add" class="translateT table-button-add btn-floating waves-effect waves-light btn-small">
									<i class="material-icons">add</i>
								</button>
							</div>
						</div>
						<div class="col s12 m12 l12">
							<table class="table-values highlight" style="width: 90%;">
								<thead>
									<tr>
										<th data-name="commonName" class="translate">Name</th>
										<th data-name="nativeLinkedView" data-type="select" class="translate">Linked View</th>
										<th data-name="nativeIcon" class="translate">Icon</th>
										<th data-buttons="delete drag_handle" style="width:100px;"></th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</div>
				<div class="section">
					<div class="divider"></div>
				</div>			
				<div class="row">
					<div class="col s12">
						<img src="homepage.png" class="headingIcon">
						<h6 class="translate sub-title heading">Homepage</h6>
						<p class="translate">The first Toolbar-Entry will be your 'Home-View' with will be loaded at start.</p>
						<p><span class="translate">You can also use URL-Parameters to determine, which view or even dialog will be loaded at start</span> (<a href="https://github.com/sbormann/ioBroker.iqontrol/blob/master/README.md#url-parameters" target="_blank"><span class="translate">see here</span> <i class="material-icons tiny">live_help</i></a>).</p>
					</div>
				</div>
				<div class="section">
					<div class="divider"></div>
				</div>			
				<div class="row">
					<div class="col s12">
						<img src="panel.png" class="headingIcon">
						<h6 class="translate sub-title heading">Panel</h6>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<p class="translate sub-title">States:</p>
					</div>
				</div>
				<div class="row scrollableTable">
					<div class="col s12">
						<table class="table-values highlight" data-panel="0" style="width: 90%;">
							<thead>
								<tr>
									<th data-name="state" class="translate">State</th>
									<th data-name="commonRole" data-type="select" data-options="linkedState/State;const/Constant;array/Array" class="translate">Type</th>
									<th data-name="value" class="translate">Value</th>
									<th data-buttons="edit" style="width:45px;"></th>
								</tr>
							</thead>
							<tbody class="table-lines" style="">
								<tr data-state="BACKGROUND_VIEW">
									<td>BACKGROUND_VIEW</td>
									<td><select class="value panelStates commonRole" data-id="panelBackgroundView" id="panelBackgroundViewCommonRole" style="width: 100%"><option value="linkedState">Linked State</option><option value="const" selected>Constant</option></select></td>
									<td><input class="value panelStates val" data-id="panelBackgroundView"  id="panelBackgroundViewValue" style="width: 100%" type="text" data-name="value"></td>
									<td><a data-id="panelBackgroundView" data-command="edit" class="values-buttons btn-floating btn-small waves-effect waves-light panelStates"><i class="material-icons">edit</i></a></td>
								</tr>
								<tr data-state="BACKGROUND_URL">
									<td>BACKGROUND_URL</td>
									<td><select class="value panelStates commonRole" data-id="panelBackgroundURL" id="panelBackgroundURLCommonRole" style="width: 100%"><option value="linkedState">Linked State</option><option value="const" selected>Constant</option></select></td>
									<td><input class="value panelStates val" data-id="panelBackgroundURL" id="panelBackgroundURLValue" style="width: 100%" type="text" data-name="value"></td>
									<td><a data-id="panelBackgroundURL" data-command="edit" class="values-buttons btn-floating btn-small waves-effect waves-light panelStates"><i class="material-icons">edit</i></a></td>
								</tr>
								<tr data-state="BACKGROUND_HTML">
									<td>BACKGROUND_HTML</td>
									<td><select class="value panelStates commonRole" data-id="panelBackgroundHTML" id="panelBackgroundHTMLCommonRole" style="width: 100%"><option value="linkedState">Linked State</option><option value="const" selected>Constant</option></select></td>
									<td><input class="value panelStates val" data-id="panelBackgroundHTML"  id="panelBackgroundHTMLValue" style="width: 100%" type="text" data-name="value"></td>
									<td><a data-id="panelBackgroundHTML" data-command="edit" class="values-buttons btn-floating btn-small waves-effect waves-light panelStates"><i class="material-icons">edit</i></a></td>
								</tr>
								<tr data-state="PANEL_HIDE">
									<td>PANEL_HIDE</td>
									<td><select class="value panelStates commonRole" data-id="panelHide" id="panelHideCommonRole" style="width: 100%"><option value="linkedState">Linked State</option><option value="const" selected>Constant</option></select></td>
									<td><input class="value panelStates val" data-id="panelHide"  id="panelHideValue" style="width: 100%" type="text" data-name="value"></td>
									<td><a data-id="panelHide" data-command="edit" class="values-buttons btn-floating btn-small waves-effect waves-light panelStates"><i class="material-icons">edit</i></a></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<span class="translate">Note on the data points BACKGROUND_VIEW/URL/HTML: Only one of the three data points can be used at a time. In descending order, first BACKGROUND_VIEW, then BACKGROUND_URL and finally BACKGROUND_HTML is checked for validity and the first valid entry is displayed.</span>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<p class="translate sub-title">Options:</p>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12 m12 l12">
						<input class="value" type="checkbox" id="panelHideInvert" />
						<label for="panelHideInvert" class="translate">Invert PANEL_HIDE</label>
						<span class="helper-text"></span>
					</div>
					<div class="input-field col s12 m12 l12">
						<input class="value" type="checkbox" id="panelAllowPostMessage" checked />
						<label for="panelAllowPostMessage" class="translate">Allow postMessage-Communication for BACKGROUND_VIEW/URL/HTML</label>
						<span class="helper-text"></span>
					</div>
					<div class="input-field col s12 m6 l4">
						<select class="value" name='panelDisplay' id='panelDisplay' value="overlay">
							<option value="overlay" class="translate selected" selected="selected">Overlay</option>
							<!--option value="reveal" class="translate">Reveal</option--> <!-- because of custom restyling via css is this the same as push -->
							<option value="push" class="translate">Push</option>
						</select>
						<label for='panelDisplay' class="translate">Display-Mode:</label>
						<span class="helper-text"></span>
					</div>
					<!--div class="input-field col s12 m6 l4">
						<select class="value" name='panelPosition' id='panelPosition' value="left">
							<option value="left" class="translate selected" selected="selected">Left</option>
							<option value="right" class="translate">Right</option>
						</select>
						<label for='panelPosition' class="translate">Position:</label>
						<span class="helper-text"></span>
					</div--> <!-- jquery bug - position right is not working --> 
					<div class="input-field col s12 m12 l12">
						<input class="value" type="checkbox" id="panelDismissible" checked />
						<label for="panelDismissible" class="translate">Close panel when clicking on parent view</label>
					</div>
					<div class="input-field col s12 m12 l12">
						<input class="value" type="checkbox" id="panelNoCloseButton" />
						<label for="panelNoCloseButton" class="translate">No close-button</label>
					</div>
					<div class="input-field col s12 m6 l4">
						<input class="value validate validateOnlyError" type="number" min="200" max="10000" id="panelLargeScreenTreshold" value="600" placeholder="600">
						<label for="panelLargeScreenTreshold" class="translate">Treshold in pixel for large screen:</label>
						<span class="helper-text" data-error="200 - 10000" data-success=""></span>
					</div>
					<div class="input-field col s12 m12 l12">
						<input class="value" type="checkbox" id="panelCompressParentViewOnLargeScreens" checked />
						<label for="panelCompressParentViewOnLargeScreens" class="translate">Compress parent view on large screens (instead of pushing it to the side)</label>
					</div>
					<div class="input-field col s12 m12 l12">
						<input class="value" type="checkbox" id="panelDismissibleOnLargeScreens" checked />
						<label for="panelDismissibleOnLargeScreens" class="translate">Close panel when clicking on parent view on large screens</label>
					</div>
					<div class="input-field col s12 m12 l12">
						<input class="value" type="checkbox" id="panelNoCloseButtonOnLargeScreens" />
						<label for="panelNoCloseButtonOnLargeScreens" class="translate">No close-button on large screens</label>
					</div>
					<div class="input-field col s12 m12 l12">
						<input class="value" type="checkbox" id="panelAutoOpenOnLargeScreens" />
						<label for="panelAutoOpenOnLargeScreens" class="translate">Automatically open panel on large screens</label>
					</div>
					<div class="input-field col s12 m12 l12">
						<input class="value" type="checkbox" id="panelAutoCloseOnSmallerScreens" />
						<label for="panelAutoCloseOnSmallerScreens" class="translate">Automatically close panel on smaller screens</label>
					</div>
				</div>
			</div>

			<!-- ++++++++++ TAB: Images ++++++++++ -->
			<div id="tabImages"    class="col s12 page">
				<div class="row">
					<div class="col s12">
						<img src="images.png"  class="headingIcon">
						<h6 class="translate sub-title heading">Images</h6>
					</div>
				</div>
				<div class="row showOnLoad">
					<div class="col s12">
						<p class="translate">Loading images...</p>
					</div>
				</div>
				<div class = "row hideOnLoad">
					<div class="col s8 m6">
						<form id="imagesUploadFileForm">
							<label class="translate">Select or drop file(s) to upload here:</label>
							<div class="file-field input-field">
								<div class="btn">
									<span class="translate">Browse</span>
									<input type="file" multiple id="imagesUploadFile" name="imagesUploadFile" />
								</div>
								<div class="file-path-wrapper">
									<input class="file-path validate" type="text" />
								</div>
							</div>
							<div class="progress" id="imagesUploadFileFormProgress" style="display:none;">
								<div class="indeterminate"></div>
							</div>
						</form>
					</div>
				</div>
				<div class = "row hideOnLoad">
					<div class="col s12">
						<a class="waves-effect waves-light btn disabled" id="imagesUploadFileSubmit"><i class="material-icons left">cloud_upload</i><span class="translate">Upload file(s) here</span></a>
						<a class="waves-effect waves-light btn" id="imagesUploadCreateDir"><i class="material-icons left">create_new_folder</i><span class="translate">Create Directory</span></a>
						<a class="waves-effect waves-light btn" id="imagesUploadRenameDir"><i class="material-icons left">edit</i><span class="translate">Rename Directory</span></a>
						<a class="waves-effect waves-light btn" id="imagesUploadDeleteDir"><i class="material-icons left">delete_sweep</i><span class="translate">Delete Directory</span></a>
						<a class="waves-effect waves-light btn" id="imagesUploadRefresh"><i class="material-icons left">refresh</i><span class="translate">Refresh</span></a>
						<a class="waves-effect waves-light btn hide imagesUploadCreateFile" data-filetype="html"><i class="material-icons left">note_add</i><span class="translate">Create HTML File</span></a>
						<a class="waves-effect waves-light btn hide imagesUploadCreateFile" data-filetype="css"><i class="material-icons left">note_add</i><span class="translate">Create CSS File</span></a>
						<a class="waves-effect waves-light btn hide imagesUploadCreateFile" data-filetype="js"><i class="material-icons left">note_add</i><span class="translate">Create JS File</span></a>
						<br><br>
					</div>
				</div>
				<div class="row hideOnLoad">
					<div class="input-field col s12">
						<select class="value" id="imagesSelectedDir">
						</select>
						<label for="imagesSelectedDir" class="translate"></label>
						<span class="translate">Actual Directory</span>
					</div>
				</div>
				<div class="col s12 hideOnLoad" id="tableImages">
					<div class="col s12 m12 l12">
						<table class="table-values highlight" style="width: 90%;">
							<thead>
								<tr>
									<th data-buttons="photo" class="translate">Thumbnail</th>
									<th data-name="filename" class="translate">Filename</th>
									<th data-buttons="edit delete_forever" style="width:150px;"></th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<br><br>
						<p class="translate">Images in the folder '/usericons' can be used as icons for devices.</p>
						<p class="translate">Images in the folder '/usersymbols' can be used as symbols for states.</p>
						<p><span class="translate">You can use variables in image-filenames</span> (<a href="https://github.com/sbormann/ioBroker.iqontrol#icons-and-background-images" target="_blank"><span class="translate">see here</span> <i class="material-icons tiny">live_help</i></a>).</p>
						<p><span class="translate">The folder '/userwidgets' allows uploading of html, css and js files to create widgets, which may be displayed as BACKGROUND_URL of a tile</span> (<a href="https://github.com/sbormann/ioBroker.iqontrol#widgets" target="_blank"><span class="translate">see here</span> <i class="material-icons tiny">live_help</i></a>).</p>
						<p><span class="translate">The folder '/userfonts' allows uploading of otf, ttf, woff, woff2 and eot files which can be used as font files in options</span> (<a href="https://github.com/sbormann/ioBroker.iqontrol#fonts" target="_blank"><span class="translate">see here</span> <i class="material-icons tiny">live_help</i></a>).</p>
						<p class="translate">(You may need to create these folders first).</p>
					</div>
				</div>
				<div class = "row hideOnLoad">
					<div class="col s12">
						<br><br><br>
						<a class="waves-effect waves-light btn" id="imagesUploadDownloadDirAsZip"><i class="material-icons left" id="imagesUploadDownloadDirAsZipIcon">cloud_download</i><span class="translate">Download Directory</span><div id="imagesUploadDownloadDirAsZipProgress" class="progress" style="position: absolute; bottom: -17px; left: 0px; width: 100%; display: none;"><div class="indeterminate"></div></div></a>
					</div>
				</div>
			</div>

			<!-- ++++++++++ TAB: Lists ++++++++++ -->
			<div id="tabLists"    class="col s12 page">
				<div class="row">
					<div class="col s12">
						<img src="lists.png"  class="headingIcon">
						<h6 class="translate sub-title heading">Lists and Counters</h6>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12 m12 l12">
						<input class="value" type="checkbox" id="listsActive" />
						<label for="listsActive" class="translate" style="display: inline;">Activate Lists</label>
						<span class="helper-text translate"></span>
					</div>
				</div>
				<div class="col s12 scrollableTable" id="tableLists">
					<div class="row">
						<div class="col s2 m1 l1">
							<button title="Add" class="translateT table-button-add btn-floating waves-effect waves-light btn-small">
								<i class="material-icons">add</i>
							</button>
						</div>
					</div>
					<div class="col s12 m12 l12">
						<table class="table-values highlight" style="width: 90%;">
							<thead>
								<tr>
									<th data-name="active" data-type="checkbox" class="translate" style="width:10px;">Active</th>
									<th data-name="name" class="translate">Name</th>
									<th data-buttons="edit content_copy delete drag_handle" style="width:135px;"></th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="col s12 center">
						<h5 id="listsCheckUnallowed" class="translate" style="display: none; color: red;">No duplicates allowed! List Names have to be unique.</h5>
					</div>
				</div>
			</div>

			<!-- ++++++++++ TAB: Options ++++++++++ -->
			<div id="tabOptions"    class="col s12 page">
				<div class="row">
					<div class="col s12">
						<img src="options.png"  class="headingIcon">
						<h6 class="translate sub-title heading">Options</h6>
					</div>
				</div>
				<ul class="collapsible">
					<li>
						<div class="collapsible-header">
							<i class="material-icons">expand_more</i><h6 class="translate">Change Device-Options:</h6>
						</div>
						<div class="collapsible-body">
							<div class="row">
								<div class="col s12">
									<h6><i class="material-icons" style="vertical-align: middle; font-size: 1rem; margin-right: 6px;">warning</i>&nbsp;<span class="translate">Warning: make shure you have a backup!</span>&nbsp;<span class="translate">You can create backups under Options - Backup/Restore.</span></h6>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Change Device-Icons:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="optionsChangeDeviceOptionsIcons" type="text" id="optionsChangeDeviceOptionsIconsSource" />
									<label for="optionsChangeDeviceOptionsIconsSource" class="translate">Replace this icon...</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="optionsChangeDeviceOptionsIcons" type="text" id="optionsChangeDeviceOptionsIconsDestination" />
									<label for="optionsChangeDeviceOptionsIconsDestination" class="translate">...with this icon.</label>
									<span class="helper-text"></span>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<select multiple class="optionsChangeDeviceOptionsIcons optionsChangeDeviceOptionsRoles" id="optionsChangeDeviceOptionsIconsFilterRoles"></select>
									<label for="optionsChangeDeviceOptionsIconsFilterRoles" class="translate">Do that only for these roles...</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<select multiple class="optionsChangeDeviceOptionsIcons optionsChangeDeviceOptionsDevices" id="optionsChangeDeviceOptionsIconsFilterDevices"></select>
									<label for="optionsChangeDeviceOptionsIconsFilterDevices" class="translate">...and these devices.</label>
									<span class="helper-text"></span>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn disabled" id="optionsChangeDeviceOptionsIconsExecute"><i class="material-icons left">find_replace</i><span class="translate">Execute</span><span id="optionsChangeDeviceOptionsIconsExecuteCount"></span></a>
									<a class="waves-effect waves-light btn-flat disabled optionsChangeDeviceOptionsShowChanges" id="optionsChangeDeviceOptionsIconsShowChanges"><i class="material-icons">list</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Change Device-Options:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="optionsChangeDeviceOptions" type="text" id="optionsChangeDeviceOptionsSourceOption" />
									<label for="optionsChangeDeviceOptionsSourceOption" class="translate">Replace this option...</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="optionsChangeDeviceOptions" type="text" id="optionsChangeDeviceOptionsSourceValue" />
									<label for="optionsChangeDeviceOptionsSourceValue" class="translate">...and setting...</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="optionsChangeDeviceOptions" type="text" id="optionsChangeDeviceOptionsDestinationValue" />
									<label for="optionsChangeDeviceOptionsDestinationValue" class="translate">...with this setting.</label>
									<span class="helper-text"></span>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<select multiple class="optionsChangeDeviceOptions optionsChangeDeviceOptionsRoles" id="optionsChangeDeviceOptionsFilterRoles"></select>
									<label for="optionsChangeDeviceOptionsFilterRoles" class="translate">Do that only for these roles...</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<select multiple class="optionsChangeDeviceOptions optionsChangeDeviceOptionsDevices" id="optionsChangeDeviceOptionsFilterDevices"></select>
									<label for="optionsChangeDeviceOptionsFilterDevices" class="translate">...and these devices.</label>
									<span class="helper-text"></span>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn disabled" id="optionsChangeDeviceOptionsExecute"><i class="material-icons left">find_replace</i><span class="translate">Execute</span><span id="optionsChangeDeviceOptionsExecuteCount"></span></a>
									<a class="waves-effect waves-light btn-flat disabled optionsChangeDeviceOptionsShowChanges" id="optionsChangeDeviceOptionsShowChanges"><i class="material-icons">list</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Change Device-States:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<select multiple class="optionsChangeDeviceStates optionsChangeDeviceOptionsStates" id="optionsChangeDeviceStatesFilterStates"></select>
									<label for="optionsChangeDeviceStatesFilterStates" class="translate">For these datapoints...</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="optionsChangeDeviceStates" type="text" id="optionsChangeDeviceStatesSourceValue"  value="*"/>
									<label for="optionsChangeDeviceStatesSourceValue" class="translate">...replace this string (* = any)...</label>
									<span class="helper-text"></span>
									<a class="optionsChangeDeviceStatesEditButton inputEdit waves-effect waves-light btn-small btn-floating" data-selectidfor="optionsChangeDeviceStatesSourceValue"><i class="material-icons">edit</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="optionsChangeDeviceStates" type="text" id="optionsChangeDeviceStatesDestinationValue" value="*"/>
									<label for="optionsChangeDeviceStatesDestinationValue" class="translate">...with this string (* = no change)...</label>
									<span class="helper-text"></span>
									<a class="optionsChangeDeviceStatesEditButton inputEdit waves-effect waves-light btn-small btn-floating" data-selectidfor="optionsChangeDeviceStatesDestinationValue"><i class="material-icons">edit</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<select class="optionsChangeDeviceStates" id="optionsChangeDeviceStatesDestinationCommonRole">
										<option selected value='*'><span class="translate">Do not change type</option>
										<option value='linkedState'><span class="translate">linkedState</option>
										<option value='const'><span class="translate">const</option>
									</select>
									<label for="optionsChangeDeviceStatesDestinationCommonRole" class="translate">...and change type to this.</label>
									<span class="helper-text translate">(Arrays can't be changed)</span>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<select multiple class="optionsChangeDeviceStates optionsChangeDeviceOptionsRoles" id="optionsChangeDeviceStatesFilterRoles"></select>
									<label for="optionsChangeDeviceStatesFilterRoles" class="translate">Do that only for these roles...</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<select multiple class="optionsChangeDeviceStates optionsChangeDeviceOptionsDevices" id="optionsChangeDeviceStatesFilterDevices"></select>
									<label for="optionsChangeDeviceStatesFilterDevices" class="translate">...and these devices.</label>
									<span class="helper-text"></span>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn disabled" id="optionsChangeDeviceStatesExecute"><i class="material-icons left">find_replace</i><span class="translate">Execute</span><span id="optionsChangeDeviceStatesExecuteCount"></span></a>
									<a class="waves-effect waves-light btn-flat disabled optionsChangeDeviceOptionsShowChanges" id="optionsChangeDeviceStatesShowChanges"><i class="material-icons">list</i></a>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="collapsible-header">
							<i class="material-icons">expand_more</i><h6 class="translate">Toolbar-Layout:</h6>
						</div>
						<div class="collapsible-body">
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">General:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m12 l12">
									<input class="value" type="checkbox" id="optionsLayoutToolbarSingleLine" />
									<label for="optionsLayoutToolbarSingleLine" class="translate">Show toolbar in one single line (otherwise toolbars with more than 5 entries will be split on several lines)</label>
									<span class="helper-text"></span>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutToolbarFooterColor" placeholder="rgba(0,0,0,0)" />
									<label for="optionsLayoutToolbarFooterColor" class="translate">Overall Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value" type="number" min="0" max="1" step="0.05" id="optionsLayoutToolbarFooterOpacity" placeholder="0.9" />
									<label for="optionsLayoutToolbarFooterOpacity validate validateOnlyError" class="translate">Overall Opacity:</label>
									<span class="helper-text" data-error="0.00 - 1.00" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutToolbarBorderColor" placeholder="rgb(31,31,31)" />
									<label for="optionsLayoutToolbarBorderColor" class="translate">Border-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Unselected Elements:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutToolbarColor" placeholder="rgb(51,51,51)" />
									<label for="optionsLayoutToolbarColor" class="translate">Unselected Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutToolbarHoverColor" placeholder="rgb(55,55,55)" />
									<label for="optionsLayoutToolbarHoverColor" class="translate">Unselected Hover Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutToolbarTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutToolbarTextColor" class="translate">Unselected Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutToolbarHoverTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutToolbarHoverTextColor" class="translate">Unselected Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutToolbarTextShadowColor" placeholder="rgb(17,17,17)" />
									<label for="optionsLayoutToolbarTextShadowColor" class="translate">Unselected Text-Schadow-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutToolbarHoverTextShadowColor" placeholder="rgb(17,17,17)" />
									<label for="optionsLayoutToolbarHoverTextShadowColor" class="translate">Unselected Hover Text-Schadow-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Selected Element:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutToolbarSelectedColor" placeholder="rgb(12,80,136)" />
									<label for="optionsLayoutToolbarSelectedColor" class="translate">Selected Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutToolbarSelectedHoverColor" placeholder="rgb(12,80,136)" />
									<label for="optionsLayoutToolbarSelectedHoverColor" class="translate">Selected Hover Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutToolbarSelectedTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutToolbarSelectedTextColor" class="translate">Selected Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutToolbarSelectedHoverTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutToolbarSelectedHoverTextColor" class="translate">Selected Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutToolbarSelectedTextShadowColor" placeholder="rgb(17,17,17)" />
									<label for="optionsLayoutToolbarSelectedTextShadowColor" class="translate">Selected Text-Schadow-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutToolbarSelectedHoverTextShadowColor" placeholder="rgb(17,17,17)" />
									<label for="optionsLayoutToolbarSelectedHoverTextShadowColor" class="translate">Selected Hover Text-Schadow-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Caption:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<label for="optionsLayoutToolbarFontFamily" class="translate">Font-Family:</label>
									<input class="value optionsFontFamily" type="text" id="optionsLayoutToolbarFontFamily" placeholder="" />
									<span class="helper-text translate">Format: /userfonts/name@url. You can upload your own fonts in the Images/Widgets-Tab.</span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="1" max="100" id="optionsLayoutToolbarFontSize" placeholder="12.5px" />
									<label for="optionsLayoutToolbarFontSize" class="translate">Font-Size:</label>
									<span class="helper-text" data-error="1 - 100 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<select class="value" name='optionsLayoutToolbarFontWeight' id='optionsLayoutToolbarFontWeight'>
										<option value="" disabled selected class="translate">Choose:</option>
										<option value="lighter" class="translate">Lighter</option>
										<option value="normal" class="translate">Normal</option>
										<option value="bold" class="translate">Bold</option>
										<option value="bolder" class="translate">Bolder</option>
									</select>
									<label for='optionsLayoutToolbarFontWeight' class="translate">Font-Weight:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<select class="value" name='optionsLayoutToolbarFontStyle' id='optionsLayoutToolbarFontStyle'>
										<option value="" disabled selected class="translate">Choose:</option>
										<option value="normal" class="translate">Normal</option>
										<option value="italic" class="translate">Italic</option>
										<option value="oblique" class="translate">Oblique</option>
									</select>
									<label for='optionsLayoutToolbarFontStyle' class="translate">Font-Style:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Icons:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<select class="value" id="optionsLayoutToolbarIconPosition">
										<option value=""  class="translate"></option>
										<option value="bottom" class="translate">bottom</option>
										<option value="left" class="translate">left</option>
										<option value="right" class="translate">right</option>
										<option value="top" class="translate">top</option>
									</select>
									<label for="options.layout.toolbarIconPosition" class="translate">Icon Position:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<select class="value" id="optionsLayoutToolbarIconColor">
										<option value=""  class="translate"></option>
										<option value="white" class="translate">white</option>
										<option value="black" class="translate">black</option>
									</select>
									<label for="options.layout.toolbarIconPosition" class="translate">Icon Color:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="200" id="optionsLayoutToolbarIconSize" placeholder="14px"/>
									<label for="optionsLayoutToolbarIconSize" class="translate">Icon Size:</label>
									<span class="helper-text" data-error="0 - 200 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutToolbarIconBackgroundColor" placeholder="rgba(0,0,0,0)" />
									<label for="optionsLayoutToolbarIconBackgroundColor" class="translate">Icon Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="200" id="optionsLayoutToolbarIconBackgroundSize" placeholder="22px"/>
									<label for="optionsLayoutToolbarIconBackgroundSize" class="translate">Icon Background Size:</label>
									<span class="helper-text" data-error="0 - 200 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="100" id="optionsLayoutToolbarIconBackgroundCornerSize" placeholder="25px" />
									<label for="optionsLayoutToolbarIconBackgroundCornerSize" class="translate">Icon Background Corner-Size:</label>
									<span class="helper-text" data-error="0 - 100 [%]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="collapsible-header">
							<i class="material-icons">expand_more</i><h6 class="translate">Headers:</h6>
						</div>
						<div class="collapsible-body">
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Main-Header:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewMainHeaderColor" placeholder="rgba(0,0,0,0.15)" />
									<label for="optionsLayoutViewMainHeaderColor" class="translate">Main-Header Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewMainHeaderTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutViewMainHeaderTextColor" class="translate">Main-Header Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<label for="optionsLayoutViewMainHeaderFontFamily" class="translate">Font-Family:</label>
									<input class="value optionsFontFamily" type="text" id="optionsLayoutViewMainHeaderFontFamily" placeholder="" />
									<span class="helper-text translate">Format: /userfonts/name@url. You can upload your own fonts in the Images/Widgets-Tab.</span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="1" max="100" id="optionsLayoutViewMainHeaderFontSize" placeholder="29px"/>
									<label for="optionsLayoutViewMainHeaderFontSize" class="translate">Main-Header Font-Size:</label>
									<span class="helper-text" data-error="1 - 100 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<select class="value" name='optionsLayoutViewMainHeaderFontWeight' id='optionsLayoutViewMainHeaderFontWeight'>
										<option value="" disabled selected class="translate">Choose:</option>
										<option value="lighter" class="translate">Lighter</option>
										<option value="normal" class="translate">Normal</option>
										<option value="bold" class="translate">Bold</option>
										<option value="bolder" class="translate">Bolder</option>
									</select>
									<label for='optionsLayoutViewMainHeaderFontWeight' class="translate">Main-Header Font-Weight:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<select class="value" name='optionsLayoutViewMainHeaderFontStyle' id='optionsLayoutViewMainHeaderFontStyle'>
										<option value="" disabled selected class="translate">Choose:</option>
										<option value="normal" class="translate">Normal</option>
										<option value="italic" class="translate">Italic</option>
										<option value="oblique" class="translate">Oblique</option>
									</select>
									<label for='optionsLayoutViewMainHeaderFontStyle' class="translate">Main-Header Font-Style:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="500" id="optionsLayoutViewMainHeaderPaddingTop" placeholder="0px" />
									<label for="optionsLayoutViewMainHeaderPaddingTop" class="translate">Main-Header Padding Top:</label>
									<span class="helper-text" data-error="0 - 500 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="500" id="optionsLayoutViewMainHeaderPaddingBottom" placeholder="0px" />
									<label for="optionsLayoutViewMainHeaderPaddingBottom" class="translate">Main-Header Padding Bottom:</label>
									<span class="helper-text" data-error="0 - 500 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="500" id="optionsLayoutViewMainHeaderPaddingLeft" placeholder="7px" />
									<label for="optionsLayoutViewMainHeaderPaddingLeft" class="translate">Main-Header Padding Left:</label>
									<span class="helper-text" data-error="0 - 500 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="-500" max="500" id="optionsLayoutViewMainHeaderMarginTop" placeholder="20px" />
									<label for="optionsLayoutViewMainHeaderMarginTop" class="translate">Main-Header Margin Top:</label>
									<span class="helper-text" data-error="-500 - 500 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="-500" max="500" id="optionsLayoutViewMainHeaderMarginBottom" placeholder="20px" />
									<label for="optionsLayoutViewMainHeaderMarginBottom" class="translate">Main-Header Margin Bottom:</label>
									<span class="helper-text" data-error="-500 - 500 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="-500" max="500" id="optionsLayoutViewMainHeaderMarginLeft" placeholder="-5px" />
									<label for="optionsLayoutViewMainHeaderMarginLeft" class="translate">Main-Header Margin Left:</label>
									<span class="helper-text" data-error="-500 - 500 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="-500" max="500" id="optionsLayoutViewMainHeaderMarginRight" placeholder="-5px" />
									<label for="optionsLayoutViewMainHeaderMarginRight" class="translate">Main-Header Margin Right:</label>
									<span class="helper-text" data-error="-500 - 500 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Sub-Headers:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewSubHeaderColor" placeholder="rgba(0,0,0,0.15)" />
									<label for="optionsLayoutViewSubHeaderColor" class="translate">Sub-Headers Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewSubHeaderTextColor" placeholder="rgb(255,255,255,0)" />
									<label for="optionsLayoutViewSubHeaderTextColor" class="translate">Sub-Headers Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<label for="optionsLayoutViewSubHeaderFontFamily" class="translate">Font-Family:</label>
									<input class="value optionsFontFamily" type="text" id="optionsLayoutViewSubHeaderFontFamily" placeholder="" />
									<span class="helper-text translate">Format: /userfonts/name@url. You can upload your own fonts in the Images/Widgets-Tab.</span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="1" max="100" id="optionsLayoutViewSubHeaderFontSize" placeholder="15px" />
									<label for="optionsLayoutViewSubHeaderFontSize" class="translate">Sub-Header Font-Size:</label>
									<span class="helper-text" data-error="1 - 100 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<select class="value" name='optionsLayoutViewSubHeaderFontWeight' id='optionsLayoutViewSubHeaderFontWeight'>
										<option value="" disabled selected class="translate">Choose:</option>
										<option value="lighter" class="translate">Lighter</option>
										<option value="normal" class="translate">Normal</option>
										<option value="bold" class="translate">Bold</option>
										<option value="bolder" class="translate">Bolder</option>
									</select>
									<label for='optionsLayoutViewSubHeaderFontWeight' class="translate">Sub-Header Font-Weight:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<select class="value" name='optionsLayoutViewSubHeaderFontStyle' id='optionsLayoutViewSubHeaderFontStyle'>
										<option value="" disabled selected class="translate">Choose:</option>
										<option value="normal" class="translate">Normal</option>
										<option value="italic" class="translate">Italic</option>
										<option value="oblique" class="translate">Oblique</option>
									</select>
									<label for='optionsLayoutViewSubHeaderFontStyle' class="translate">Sub-Header Font-Style:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="500" id="optionsLayoutViewSubHeaderPaddingTop" placeholder="0px" />
									<label for="optionsLayoutViewSubHeaderPaddingTop" class="translate">Sub-Header Padding Top:</label>
									<span class="helper-text" data-error="0 - 500 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="500" id="optionsLayoutViewSubHeaderPaddingBottom" placeholder="0px" />
									<label for="optionsLayoutViewSubHeaderPaddingBottom" class="translate">Sub-Header Padding Bottom:</label>
									<span class="helper-text" data-error="0 - 500 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="500" id="optionsLayoutViewSubHeaderPaddingLeft" placeholder="7px" />
									<label for="optionsLayoutViewSubHeaderPaddingLeft" class="translate">Sub-Header Padding Left:</label>
									<span class="helper-text" data-error="0 - 500 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="-500" max="500" id="optionsLayoutViewSubHeaderMarginTop" placeholder="30px" />
									<label for="optionsLayoutViewSubHeaderMarginTop" class="translate">Sub-Header Margin Top:</label>
									<span class="helper-text" data-error="-500 - 500 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="-500" max="500" id="optionsLayoutViewSubHeaderMarginBottom" placeholder="0px" />
									<label for="optionsLayoutViewSubHeaderMarginBottom" class="translate">Sub-Header Margin Bottom:</label>
									<span class="helper-text" data-error="-500 - 500 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="-500" max="500" id="optionsLayoutViewSubHeaderMarginLeft" placeholder="-5px" />
									<label for="optionsLayoutViewSubHeaderMarginLeft" class="translate">Sub-Header Margin Left:</label>
									<span class="helper-text" data-error="-500 - 500 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="-500" max="500" id="optionsLayoutViewSubHeaderMarginRight" placeholder="-5px" />
									<label for="optionsLayoutViewSubHeaderMarginRight" class="translate">Sub-Header Margin Right:</label>
									<span class="helper-text" data-error="-500 - 500 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value" type="text" id="optionsLayoutViewSubHeaderCollapsibleLabelPlus" placeholder="+" />
									<label for="optionsLayoutViewSubHeaderCollapsibleLabelPlus" class="translate">Sub-Header, Collapsible - Label more:</label>
									<span class="helper-text" data-error="" data-success="">(&#9668; = &amp;#9668; &#9658; = &amp;#9658; &#9666; = &amp;#9666; &#9656; = &amp;#9656; &#9667; = &amp;#9667; &#9657; = &amp;#9657;)</span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value" type="text" id="optionsLayoutViewSubHeaderCollapsibleLabelMinus" placeholder="-" />
									<label for="optionsLayoutViewSubHeaderCollapsibleLabelMinus" class="translate">Sub-Header, Collapsible - Label less:</label>
									<span class="helper-text" data-error="" data-success="">(&#9660; = &amp;#9660; &#9650; = &amp;#9650; &#9662; = &amp;#9662; &#9652; = &amp;#9652; &#9663; = &amp;#9663; &#9653; = &amp;#9653;)</span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">New Line:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="500" id="optionsLayoutViewNewLineSpacing" placeholder="0px" />
									<label for="optionsLayoutViewNewLineSpacing" class="translate">New Line Spacing:</label>
									<span class="helper-text" data-error="0 - 500 [px]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="50" id="optionsLayoutViewNewSectionSpacing" placeholder="1.3em" />
									<label for="optionsLayoutViewNewSectionSpacing" class="translate">New Section Spacing:</label>
									<span class="helper-text" data-error="0 - 50 [em]" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="collapsible-header">
							<i class="material-icons">expand_more</i><h6 class="translate">Device-Tiles:</h6>
						</div>
						<div class="collapsible-body">
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">General:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value" type="checkbox" id="optionsLayoutViewTilesCentered" />
									<label for="optionsLayoutViewTilesCentered" class="translate">Tiles centered</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value" type="checkbox" id="optionsLayoutViewDeviceNameCentered" />
									<label for="optionsLayoutViewDeviceNameCentered" class="translate">Device-Name centered</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value" type="checkbox" id="optionsLayoutViewDeviceStateCentered" />
									<label for="optionsLayoutViewDeviceStateCentered" class="translate">Device-State centered</label>
									<span class="helper-text"></span>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value" type="checkbox" id="optionsLayoutViewDeviceNoZoomOnHover" />
									<label for="optionsLayoutViewDeviceNoZoomOnHover" class="translate">Disable zoom-effect on hover</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value" type="checkbox" id="optionsLayoutViewDeviceIconNoZoomOnHover" />
									<label for="optionsLayoutViewDeviceIconNoZoomOnHover" class="translate">Disable zoom-effect on hover for icon</label>
									<span class="helper-text"></span>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="25" step="1" id="optionsLayoutViewDeviceBorderRadius" placeholder="15px" />
									<label for="optionsLayoutViewDeviceBorderRadius" class="translate">Rounded Corners (Border-Radius):</label>
									<span class="helper-text" data-error="0 - 25" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="25" step="1" id="optionsLayoutViewDeviceBorderRadiusLargeScreen" placeholder="22px" />
									<label for="optionsLayoutViewDeviceBorderRadiusLargeScreen" class="translate">Rounded Corners (Border-Radius) for large Screens:</label>
									<span class="helper-text" data-error="0 - 25" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Inactive Devices:</p>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<div class="demotile inactive" style="height:150px;">
										<div class="demotile inactive wallpaper" style="position:absolute; height:150px; width:450px; background: url(demotile_wallpaper.png);">
											<div class="demotile inactive noimage nomouseover" style="position:absolute; left:10px; top:25px; height:100px; width:100px; border-radius:9px; box-shadow:0px 1px 2px 1px rgb(0 0 0 / 20%); background-color:transparent; overflow:hidden;">
												<div class="demotile inactive noimage nomouseover background" style="position:absolute; left:0px; top:0px; height:100px; width:100px; background-color:rgba(255, 255, 255, 0.6); opacity:0.99;"></div>
												<div class="demotile inactive noimage nomouseover overlay" style="position:absolute; left:0px; top:0px; height:100px; width:100px; background-color:rgb(180, 180, 180); opacity:0.5;"></div>
												<img style="position:absolute; left:2px; top:2px; height:40px; width:40px;" src="demotile_icon_off.png">
												<div class="translate" style="position:absolute; left:2px; top:50px; height:28px; width:96px; color:black; font-size:12px; font-weight:bold; text-shadow:0px 1px 2px rgb(0 0 0 / 30%);">Device without background</div>
												<div class="translate" style="position:absolute; left:2px; top:80px; height:14px; width:96px; color:black; font-size:12px; font-weight:normal; text-shadow:0px 1px 2px rgb(0 0 0 / 30%);">Inactive</div>
											</div>
											<div class="demotile inactive noimage mouseover" style="position:absolute; left:120px; top:25px; height:100px; width:100px; border-radius:9px; box-shadow:0px 1px 2px 1px rgb(0 0 0 / 20%); background-color:transparent; overflow:hidden;">
												<div class="demotile inactive noimage mouseover background" style="position:absolute; left:0px; top:0px; height:100px; width:100px; background-color:rgba(255, 255, 255, 0.6); opacity:0.99;"></div>
												<div class="demotile inactive noimage mouseover overlay" style="position:absolute; left:0px; top:0px; height:100px; width:100px; background-color:rgb(190, 190, 190); opacity:0.9;"></div>
												<img style="position:absolute; left:2px; top:2px; height:40px; width:40px;" src="demotile_icon_off.png">
												<div class="translate" style="position:absolute; left:2px; top:50px; height:28px; width:96px; color:black; font-size:12px; font-weight:bold; text-shadow:0px 1px 2px rgb(0 0 0 / 30%);">Device without background</div>
												<div class="translate" style="position:absolute; left:2px; top:80px; height:14px; width:96px; color:black; font-size:12px; font-weight:normal; text-shadow:0px 1px 2px rgb(0 0 0 / 30%);">Inactive, Mouse</div>
												<img style="position:absolute; left:65px; top:30px; height:30px; width:30px;" src="demotile_mouse.png">
											</div>
											<div class="demotile inactive image nomouseover" style="position:absolute; left:230px; top:25px; height:100px; width:100px; border-radius:9px; box-shadow:0px 1px 2px 1px rgb(0 0 0 / 20%); background-color:transparent; overflow:hidden;">
												<div class="demotile inactive image nomouseover background" style="position:absolute; left:0px; top:0px; height:100px; width:100px; background: url(demotile_background.png); background-color:rgba(255, 255, 255, 0.6); opacity:0.99;"></div>
												<div class="demotile inactive image nomouseover overlay" style="position:absolute; left:0px; top:0px; height:100px; width:100px; background-color:rgb(180, 180, 180); opacity:0.5;"></div>
												<img style="position:absolute; left:2px; top:2px; height:40px; width:40px;" src="demotile_icon_off.png">
												<div class="translate" style="position:absolute; left:2px; top:50px; height:28px; width:96px; color:black; font-size:12px; font-weight:bold; text-shadow:0px 1px 2px rgb(0 0 0 / 30%);">Device with background</div>
												<div class="translate" style="position:absolute; left:2px; top:80px; height:14px; width:96px; color:black; font-size:12px; font-weight:normal; text-shadow:0px 1px 2px rgb(0 0 0 / 30%);">Inactive</div>
											</div>
											<div class="demotile inactive image mouseover" style="position:absolute; left:340px; top:25px; height:100px; width:100px; border-radius:9px; box-shadow:0px 1px 2px 1px rgb(0 0 0 / 20%); background-color:transparent; overflow:hidden;">
												<div class="demotile inactive image mouseover background" style="position:absolute; left:0px; top:0px; height:100px; width:100px; background: url(demotile_background.png); background-color:rgba(255, 255, 255, 0.6); opacity:0.99;"></div>
												<div class="demotile inactive image mouseover overlay" style="position:absolute; left:0px; top:0px; height:100px; width:100px; background-color:rgb(190, 190, 190); opacity:0.9;"></div>
												<img style="position:absolute; left:2px; top:2px; height:40px; width:40px;" src="demotile_icon_off.png">
												<div class="translate" style="position:absolute; left:2px; top:50px; height:28px; width:96px; color:black; font-size:12px; font-weight:bold; text-shadow:0px 1px 2px rgb(0 0 0 / 30%);">Device with background</div>
												<div class="translate" style="position:absolute; left:2px; top:80px; height:14px; width:96px; color:black; font-size:12px; font-weight:normal; text-shadow:0px 1px 2px rgb(0 0 0 / 30%);">Inactive, Mouse</div>
												<img style="position:absolute; left:65px; top:30px; height:30px; width:30px;" src="demotile_mouse.png">
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Inactive Devices - Background:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError affectsDemotile" type="text" id="optionsLayoutViewDeviceColor" placeholder="rgba(255,255,255,0.6)" />
									<label for="optionsLayoutViewDeviceColor" class="translate">Inactive Devices - Background-Color:</label>
									<span class="helper-text translate">This only affects devices without a background-image</span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError affectsDemotile" type="text" id="optionsLayoutViewDeviceHoverColor" placeholder="rgba(255,255,255,0.6)" />
									<label for="optionsLayoutViewDeviceHoverColor" class="translate">Inactive Devices, Hover - Background-Color:</label>
									<span class="helper-text translate">This only affects devices without a background-image</span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError affectsDemotile" type="number" min="0" max="1" step="0.05" id="optionsLayoutViewDeviceOpacity" placeholder="0.99" />
									<label for="optionsLayoutViewDeviceOpacity" class="translate">Inactive Devices - Background-Opacity:</label>
									<span class="helper-text" data-error="0.00 - 1.00" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError affectsDemotile" type="number" min="0" max="1" step="0.05" id="optionsLayoutViewDeviceHoverOpacity" placeholder="0.99" />
									<label for="optionsLayoutViewDeviceHoverOpacity" class="translate">Inactive Devices, Hover - Background-Opacity:</label>
									<span class="helper-text" data-error="0.00 - 1.00" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Inactive Devices - Overlay:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError affectsDemotile" type="text" id="optionsLayoutViewDeviceInactiveColor" placeholder="rgba(180,180,180)" />
									<label for="optionsLayoutViewDeviceInactiveColor" class="translate">Inactive Devices - Overlay-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError affectsDemotile" type="text" id="optionsLayoutViewDeviceInactiveHoverColor" placeholder="rgba(190,190,190)" />
									<label for="optionsLayoutViewDeviceInactiveHoverColor" class="translate">Inactive Devices, Hover - Overlay-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError affectsDemotile" type="number" min="0" max="1" step="0.05" id="optionsLayoutViewDeviceInactiveOpacity" placeholder="0.5" />
									<label for="optionsLayoutViewDeviceInactiveOpacity" class="translate">Inactive Devices - Overlay-Opacity:</label>
									<span class="helper-text" data-error="0.00 - 1.00" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError affectsDemotile" type="number" min="0" max="1" step="0.05" id="optionsLayoutViewDeviceInactiveHoverOpacity" placeholder="0.9" />
									<label for="optionsLayoutViewDeviceInactiveHoverOpacity" class="translate">Inactive Devices, Hover - Overlay-Opacity:</label>
									<span class="helper-text" data-error="0.00 - 1.00" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Active Devices:</p>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<div class="demotile active" style="height:150px;">
										<div class="demotile active wallpaper" style="position:absolute; height:150px; width:450px; background: url(demotile_wallpaper.png);">
											<div class="demotile active noimage nomouseover" style="position:absolute; left:10px; top:25px; height:100px; width:100px; border-radius:9px; box-shadow:0px 1px 2px 1px rgb(0 0 0 / 20%); background-color:transparent; overflow:hidden;">
												<div class="demotile active noimage nomouseover background" style="position:absolute; left:0px; top:0px; height:100px; width:100px; background-color:rgba(255, 255, 255, 0.6); opacity:0.99;"></div>
												<div class="demotile active noimage nomouseover overlay" style="position:absolute; left:0px; top:0px; height:100px; width:100px; background-color:rgb(255, 255, 255); opacity:0.82;"></div>
												<img style="position:absolute; left:2px; top:2px; height:40px; width:40px;" src="demotile_icon_on.png">
												<div class="translate" style="position:absolute; left:2px; top:50px; height:28px; width:96px; color:black; font-size:12px; font-weight:bold; text-shadow:0px 1px 2px rgb(0 0 0 / 30%);">Device without background</div>
												<div class="translate" style="position:absolute; left:2px; top:80px; height:14px; width:96px; color:black; font-size:12px; font-weight:normal; text-shadow:0px 1px 2px rgb(0 0 0 / 30%);">Active</div>
											</div>
											<div class="demotile active noimage mouseover" style="position:absolute; left:120px; top:25px; height:100px; width:100px; border-radius:9px; box-shadow:0px 1px 2px 1px rgb(0 0 0 / 20%); background-color:transparent; overflow:hidden;">
												<div class="demotile active noimage mouseover background" style="position:absolute; left:0px; top:0px; height:100px; width:100px; background-color:rgba(255, 255, 255, 0.6); opacity:0.99;"></div>
												<div class="demotile active noimage mouseover overlay" style="position:absolute; left:0px; top:0px; height:100px; width:100px; background-color:rgb(255, 255, 255); opacity:0.95;"></div>
												<img style="position:absolute; left:2px; top:2px; height:40px; width:40px;" src="demotile_icon_on.png">
												<div class="translate" style="position:absolute; left:2px; top:50px; height:28px; width:96px; color:black; font-size:12px; font-weight:bold; text-shadow:0px 1px 2px rgb(0 0 0 / 30%);">Device without background</div>
												<div class="translate" style="position:absolute; left:2px; top:80px; height:14px; width:96px; color:black; font-size:12px; font-weight:normal; text-shadow:0px 1px 2px rgb(0 0 0 / 30%);">Active, Mouse</div>
												<img style="position:absolute; left:65px; top:30px; height:30px; width:30px;" src="demotile_mouse.png">
											</div>
											<div class="demotile active image nomouseover" style="position:absolute; left:230px; top:25px; height:100px; width:100px; border-radius:9px; box-shadow:0px 1px 2px 1px rgb(0 0 0 / 20%); background-color:transparent; overflow:hidden;">
												<div class="demotile active image nomouseover background" style="position:absolute; left:0px; top:0px; height:100px; width:100px; background: url(demotile_background.png); background-color:rgba(255, 255, 255, 0.6); opacity:0.99;"></div>
												<div class="demotile active image nomouseover overlay" style="position:absolute; left:0px; top:0px; height:100px; width:100px; background-color:rgb(255, 255, 255); opacity:0.82;"></div>
												<img style="position:absolute; left:2px; top:2px; height:40px; width:40px;" src="demotile_icon_on.png">
												<div class="translate" style="position:absolute; left:2px; top:50px; height:28px; width:96px; color:black; font-size:12px; font-weight:bold; text-shadow:0px 1px 2px rgb(0 0 0 / 30%);">Device with background</div>
												<div class="translate" style="position:absolute; left:2px; top:80px; height:14px; width:96px; color:black; font-size:12px; font-weight:normal; text-shadow:0px 1px 2px rgb(0 0 0 / 30%);">Active</div>
											</div>
											<div class="demotile active image mouseover" style="position:absolute; left:340px; top:25px; height:100px; width:100px; border-radius:9px; box-shadow:0px 1px 2px 1px rgb(0 0 0 / 20%); background-color:transparent; overflow:hidden;">
												<div class="demotile active image mouseover background" style="position:absolute; left:0px; top:0px; height:100px; width:100px; background: url(demotile_background.png); background-color:rgba(255, 255, 255, 0.6); opacity:0.99;"></div>
												<div class="demotile active image mouseover overlay" style="position:absolute; left:0px; top:0px; height:100px; width:100px; background-color:rgb(255, 255, 255); opacity:0.95;"></div>
												<img style="position:absolute; left:2px; top:2px; height:40px; width:40px;" src="demotile_icon_on.png">
												<div class="translate" style="position:absolute; left:2px; top:50px; height:28px; width:96px; color:black; font-size:12px; font-weight:bold; text-shadow:0px 1px 2px rgb(0 0 0 / 30%);">Device with background</div>
												<div class="translate" style="position:absolute; left:2px; top:80px; height:14px; width:96px; color:black; font-size:12px; font-weight:normal; text-shadow:0px 1px 2px rgb(0 0 0 / 30%);">Active, Mouse</div>
												<img style="position:absolute; left:65px; top:30px; height:30px; width:30px;" src="demotile_mouse.png">
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Active Devices - Background:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError affectsDemotile" type="text" id="optionsLayoutViewActiveDeviceColor" placeholder="rgba(255,255,255,0.6)" />
									<label for="optionsLayoutViewActiveDeviceColor" class="translate">Active Devices - Background-Color:</label>
									<span class="helper-text translate">This only affects devices without a background-image</span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError affectsDemotile" type="text" id="optionsLayoutViewActiveDeviceHoverColor" placeholder="rgba(255,255,255,0.6)" />
									<label for="optionsLayoutViewActiveDeviceHoverColor" class="translate">Active Devices, Hover - Background-Color:</label>
									<span class="helper-text translate">This only affects devices without a background-image</span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError affectsDemotile" type="number" min="0" max="1" step="0.05" id="optionsLayoutViewActiveDeviceOpacity" placeholder="0.99" />
									<label for="optionsLayoutViewActiveDeviceOpacity" class="translate">Active Devices - Background-Opacity:</label>
									<span class="helper-text" data-error="0.00 - 1.00" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError affectsDemotile" type="number" min="0" max="1" step="0.05" id="optionsLayoutViewActiveDeviceHoverOpacity" placeholder="0.99" />
									<label for="optionsLayoutViewActiveDeviceHoverOpacity" class="translate">Active Devices, Hover - Background-Opacity:</label>
									<span class="helper-text" data-error="0.00 - 1.00" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Active Devices - Overlay:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError affectsDemotile" type="text" id="optionsLayoutViewDeviceActiveColor" placeholder="rgba(255,255,255)" />
									<label for="optionsLayoutViewDeviceActiveColor" class="translate">Active Devices - Overlay-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError affectsDemotile" type="text" id="optionsLayoutViewDeviceActiveHoverColor" placeholder="rgba(255,255,255)" />
									<label for="optionsLayoutViewDeviceActiveHoverColor" class="translate">Active Devices, Hover - Overlay-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError affectsDemotile" type="number" min="0" max="1" step="0.05" id="optionsLayoutViewDeviceActiveOpacity" placeholder="0.82" />
									<label for="optionsLayoutViewDeviceActiveOpacity" class="translate">Active Devices - Overlay-Opacity:</label>
									<span class="helper-text" data-error="0.00 - 1.00" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError affectsDemotile" type="number" min="0" max="1" step="0.05" id="optionsLayoutViewDeviceActiveHoverOpacity" placeholder="0.95" />
									<label for="optionsLayoutViewDeviceActiveHoverOpacity" class="translate">Active Devices, Hover - Overlay-Opacity:</label>
									<span class="helper-text" data-error="0.00 - 1.00" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<img src='background_and_overlay.png' alt='jQuery Icons'>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="collapsible-header">
							<i class="material-icons">expand_more</i><h6 class="translate">Default Icons:</h6>
						</div>
						<div class="collapsible-body">
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Icon-Preset:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m12 l8">
									<select class="optionsLayoutDefaultIconsPreset" name='optionsLayoutDefaultIconsPreset' id='optionsLayoutDefaultIconsPreset'>
										<option value="" disabled selected class="translate">Choose:</option>
									</select>
									<label for='optionsLayoutDefaultIconsPreset' class="translate">Select a Preset (this will overwrite all icon-settings below):</label>
									<span class="helper-text"></span>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Indicator Icons:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="optionsLayoutDefaultIcons_ERROR_icon_on optionsLayoutDefaultIcons" data-role="ERROR" data-icon="errorIcon_on" type="text" id="optionsLayoutDefaultIcons_ERROR_icon_on" />
									<label for="optionsLayoutDefaultIcons_ERROR_icon_on" class="translate">ERROR</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="optionsLayoutDefaultIcons_UNREACH_icon_on optionsLayoutDefaultIcons" data-role="UNREACH" data-icon="unreachIcon_on" type="text" id="optionsLayoutDefaultIcons_UNREACH_icon_on" />
									<label for="optionsLayoutDefaultIcons_UNREACH_icon_on" class="translate">UNREACH</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="optionsLayoutDefaultIcons_BATTERY_icon_on optionsLayoutDefaultIcons" data-role="BATTERY" data-icon="batteryIcon_on" type="text" id="optionsLayoutDefaultIcons_BATTERY_icon_on" />
									<label for="optionsLayoutDefaultIcons_BATTERY_icon_on" class="translate">BATTERY</label>
									<span class="helper-text"></span>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Device Icons:</p>
								</div>
							</div>
							<div id="optionsLayoutDefaultIconsDeviceIcons">
								<!-- will be created programmatically -->
							</div>
							<div class="divider" style="margin-bottom: 10px;">
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">INFO_A, INFO_B:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value" type="checkbox" id="optionsLayoutDefaultSymbolsInfoABInvert" />
									<label for="optionsLayoutDefaultIconsInfoABInvert" class="translate">Invert Color of INFO_A and INFO_B Icons</label>
									<span class="helper-text"></span>
								</div>
							</div>
							<div class="row">								
								<div class="input-field col s12 m6 l4">
									<input class="optionsLayoutDefaultSymbols_TEMPERATURE_temperatureIcon_on optionsLayoutDefaultSymbols" data-role="TEMPERATURE" data-icon="temperatureIcon_on" type="text" id="optionsLayoutDefaultSymbols_TEMPERATURE_temperatureIcon_on" />
									<label for="optionsLayoutDefaultSymbols_TEMPERATURE_temperatureIcon_on" class="translate">TEMPERATURE</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="optionsLayoutDefaultSymbols_BRIGHTNESS_brightnessIcon_on optionsLayoutDefaultSymbols" data-role="BRIGHTNESS" data-icon="brightnessIcon_on" type="text" id="optionsLayoutDefaultSymbols_BRIGHTNESS_brightnessIcon_on" />
									<label for="optionsLayoutDefaultSymbols_BRIGHTNESS_brightnessIcon_on" class="translate">BRIGHTNESS</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="optionsLayoutDefaultSymbols_SLATS_LEVEL_slatsLevelIcon_on optionsLayoutDefaultSymbols" data-role="SLATS_LEVEL" data-icon="slatsLevelIcon_on" type="text" id="optionsLayoutDefaultSymbols_SLATS_LEVEL_slatsLevelIcon_on" />
									<label for="optionsLayoutDefaultSymbols_SLATS_LEVEL_slatsLevelIcon_on" class="translate">SLATS_LEVEL</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="optionsLayoutDefaultSymbols_VOLTAGE_voltageIcon_on optionsLayoutDefaultSymbols" data-role="VOLTAGE" data-icon="voltageIcon_on" type="text" id="optionsLayoutDefaultSymbols_VOLTAGE_voltageIcon_on" />
									<label for="optionsLayoutDefaultSymbols_VOLTAGE_voltageIcon_on" class="translate">VOLTAGE</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="optionsLayoutDefaultSymbols_COLOR_colorIcon_on optionsLayoutDefaultSymbols" data-role="COLOR" data-icon="colorIcon_on" type="text" id="optionsLayoutDefaultSymbols_COLOR_colorIcon_on" />
									<label for="optionsLayoutDefaultSymbols_COLOR_colorIcon_on" class="translate">COLOR</label> <!-- //HUE/SATURATION/COLOR_BRIGHTNESS/CT/WHITE_BRIGHTNESS/ALTERNATIVE_COLORSPACE_VALUE -->
									<span class="helper-text">HUE/SATURATION/COLOR_BRIGHTNESS/CT/WHITE_BRIGHTNESS/ALTERNATIVE_COLORSPACE_VALUE</span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="optionsLayoutDefaultSymbols_VOLUME_volumeIcon_on optionsLayoutDefaultSymbols" data-role="VOLUME" data-icon="volumeIcon_on" type="text" id="optionsLayoutDefaultSymbols_VOLUME_volumeIcon_on" />
									<label for="optionsLayoutDefaultSymbols_VOLUME_volumeIcon_on" class="translate">VOLUME</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="optionsLayoutDefaultSymbols_HUMIDITY_humidityIcon_on optionsLayoutDefaultSymbols" data-role="HUMIDITY" data-icon="humidityIcon_on" type="text" id="optionsLayoutDefaultSymbols_HUMIDITY_humidityIcon_on" />
									<label for="optionsLayoutDefaultSymbols_HUMIDITY_humidityIcon_on" class="translate">HUMIDITY</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="optionsLayoutDefaultSymbols_POWER_powerIcon_on optionsLayoutDefaultSymbols" data-role="POWER" data-icon="powerIcon_on" type="text" id="optionsLayoutDefaultSymbols_POWER_powerIcon_on" />
									<label for="optionsLayoutDefaultSymbols_POWER_powerIcon_on" class="translate">POWER</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="optionsLayoutDefaultSymbols_ELAPSED_elapsedIcon_on optionsLayoutDefaultSymbols" data-role="ELAPSED" data-icon="elapsedIcon_on" type="text" id="optionsLayoutDefaultSymbols_ELAPSED_elapsedIcon_on" />
									<label for="optionsLayoutDefaultSymbols_ELAPSED_elapsedIcon_on" class="translate">ELAPSED</label>
									<span class="helper-text"></span>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="collapsible-header">
							<i class="material-icons">expand_more</i><h6 class="translate">Device-Text:</h6>
						</div>
						<div class="collapsible-body">
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Device-Name:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceNameInactiveTextColor" placeholder="rgb(0,0,0)" />
									<label for="optionsLayoutViewDeviceNameInactiveTextColor" class="translate">Inactive Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceNameInactiveHoverTextColor" placeholder="rgb(0,0,0)" />
									<label for="optionsLayoutViewDeviceNameInactiveHoverTextColor" class="translate">Inactive Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceNameActiveTextColor" placeholder="rgb(0,0,0)" />
									<label for="optionsLayoutViewDeviceNameActiveTextColor" class="translate">Active Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceNameActiveHoverTextColor" placeholder="rgb(0,0,0)" />
									<label for="optionsLayoutViewDeviceNameActiveHoverTextColor" class="translate">Active Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceNameInactiveOnTransparentTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutViewDeviceNameInactiveOnTransparentTextColor" class="translate">Inactive on Transparent Background Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceNameInactiveOnTransparentHoverTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutViewDeviceNameInactiveOnTransparentHoverTextColor" class="translate">Inactive on Transparent Background Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceNameActiveOnTransparentTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutViewDeviceNameActiveOnTransparentTextColor" class="translate">Active on Transparent Background Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceNameActiveOnTransparentHoverTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutViewDeviceNameActiveOnTransparentHoverTextColor" class="translate">Active on Transparent Background Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<label for="optionsLayoutViewDeviceNameFontFamily" class="translate">Font-Family:</label>
									<input class="value optionsFontFamily" type="text" id="optionsLayoutViewDeviceNameFontFamily" placeholder="" />
									<span class="helper-text translate">Format: /userfonts/name@url. You can upload your own fonts in the Images/Widgets-Tab.</span>
								</div>
								<div class="input-field col s12 m6 l4">
									<select class="value" name='optionsLayoutViewDeviceNameFontWeight' id='optionsLayoutViewDeviceNameFontWeight'>
										<option value="" disabled selected class="translate">Choose:</option>
										<option value="lighter" class="translate">Lighter</option>
										<option value="normal" class="translate">Normal</option>
										<option value="bold" class="translate">Bold</option>
										<option value="bolder" class="translate">Bolder</option>
									</select>
									<label for='optionsLayoutViewDeviceNameFontWeight' class="translate">Font-Weight:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<select class="value" name='optionsLayoutViewDeviceNameFontStyle' id='optionsLayoutViewDeviceNameFontStyle'>
										<option value="" disabled selected class="translate">Choose:</option>
										<option value="normal" class="translate">Normal</option>
										<option value="italic" class="translate">Italic</option>
										<option value="oblique" class="translate">Oblique</option>
									</select>
									<label for='optionsLayoutViewDeviceNameFontStyle' class="translate">Font-Style:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">State:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceStateInactiveTextColor" placeholder="rgb(0,0,0)" />
									<label for="optionsLayoutViewDeviceStateInactiveTextColor" class="translate">Inactive Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceStateInactiveHoverTextColor" placeholder="rgb(0,0,0)" />
									<label for="optionsLayoutViewDeviceStateInactiveHoverTextColor" class="translate">Inactive Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceStateActiveTextColor" placeholder="rgb(0,0,0)" />
									<label for="optionsLayoutViewDeviceStateActiveTextColor" class="translate">Active Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceStateActiveHoverTextColor" placeholder="rgb(0,0,0)" />
									<label for="optionsLayoutViewDeviceStateActiveHoverTextColor" class="translate">Active Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceStateInactiveOnTransparentTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutViewDeviceStateInactiveOnTransparentTextColor" class="translate">Inactive on Transparent Background Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceStateInactiveOnTransparentHoverTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutViewDeviceStateInactiveOnTransparentHoverTextColor" class="translate">Inactive on Transparent Background Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceStateActiveOnTransparentTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutViewDeviceStateActiveOnTransparentTextColor" class="translate">Active on Transparent Background Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceStateActiveOnTransparentHoverTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutViewDeviceStateActiveOnTransparentHoverTextColor" class="translate">Active on Transparent Background Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<label for="optionsLayoutViewDeviceStateFontFamily" class="translate">Font-Family:</label>
									<input class="value optionsFontFamily" type="text" id="optionsLayoutViewDeviceStateFontFamily" placeholder="" />
									<span class="helper-text translate">Format: /userfonts/name@url. You can upload your own fonts in the Images/Widgets-Tab.</span>
								</div>
								<div class="input-field col s12 m6 l4">
									<select class="value" name='optionsLayoutViewDeviceStateFontWeight' id='optionsLayoutViewDeviceStateFontWeight'>
										<option value="" disabled selected class="translate">Choose:</option>
										<option value="lighter" class="translate">Lighter</option>
										<option value="normal" class="translate">Normal</option>
										<option value="bold" class="translate">Bold</option>
										<option value="bolder" class="translate">Bolder</option>
									</select>
									<label for='optionsLayoutViewDeviceStateFontWeight' class="translate">Font-Weight:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<select class="value" name='optionsLayoutViewDeviceStateFontStyle' id='optionsLayoutViewDeviceStateFontStyle'>
										<option value="" disabled selected class="translate">Choose:</option>
										<option value="normal" class="translate">Normal</option>
										<option value="italic" class="translate">Italic</option>
										<option value="oblique" class="translate">Oblique</option>
									</select>
									<label for='optionsLayoutViewDeviceStateFontStyle' class="translate">Font-Style:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">INFO_A, INFO_B:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceInfoInactiveTextColor" placeholder="rgb(0,0,0)" />
									<label for="optionsLayoutViewDeviceInfoInactiveTextColor" class="translate">Inactive Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceInfoInactiveHoverTextColor" placeholder="rgb(0,0,0)" />
									<label for="optionsLayoutViewDeviceInfoInactiveHoverTextColor" class="translate">Inactive Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceInfoActiveTextColor" placeholder="rgb(0,0,0)" />
									<label for="optionsLayoutViewDeviceInfoActiveTextColor" class="translate">Active Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceInfoActiveHoverTextColor" placeholder="rgb(0,0,0)" />
									<label for="optionsLayoutViewDeviceInfoActiveHoverTextColor" class="translate">Active Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceInfoInactiveOnTransparentTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutViewDeviceInfoInactiveOnTransparentTextColor" class="translate">Inactive on Transparent Background Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceInfoInactiveOnTransparentHoverTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutViewDeviceInfoInactiveOnTransparentHoverTextColor" class="translate">Inactive on Transparent Background Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceInfoActiveOnTransparentTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutViewDeviceInfoActiveOnTransparentTextColor" class="translate">Active on Transparent Background Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceInfoActiveOnTransparentHoverTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutViewDeviceInfoActiveOnTransparentHoverTextColor" class="translate">Active on Transparent Background Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<label for="optionsLayoutViewDeviceInfoFontFamily" class="translate">Font-Family:</label>
									<input class="value optionsFontFamily" type="text" id="optionsLayoutViewDeviceInfoFontFamily" placeholder="" />
									<span class="helper-text translate">Format: /userfonts/name@url. You can upload your own fonts in the Images/Widgets-Tab.</span>
								</div>
								<div class="input-field col s12 m6 l4">
									<select class="value" name='optionsLayoutViewDeviceInfoFontWeight' id='optionsLayoutViewDeviceInfoFontWeight'>
										<option value="" disabled selected class="translate">Choose:</option>
										<option value="lighter" class="translate">Lighter</option>
										<option value="normal" class="translate">Normal</option>
										<option value="bold" class="translate">Bold</option>
										<option value="bolder" class="translate">Bolder</option>
									</select>
									<label for='optionsLayoutViewDeviceInfoFontWeight' class="translate">Font-Weight:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<select class="value" name='optionsLayoutViewDeviceInfoFontStyle' id='optionsLayoutViewDeviceInfoFontStyle'>
										<option value="" disabled selected class="translate">Choose:</option>
										<option value="normal" class="translate">Normal</option>
										<option value="italic" class="translate">Italic</option>
										<option value="oblique" class="translate">Oblique</option>
									</select>
									<label for='optionsLayoutViewDeviceInfoFontStyle' class="translate">Font-Style:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Badge:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutViewDeviceBadgeTextColor" placeholder="rgb(255,255,255)" />
									<label for="optionsLayoutViewDeviceBadgeTextColor" class="translate">Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<label for="optionsLayoutViewDeviceBadgeFontFamily" class="translate">Font-Family:</label>
									<input class="value optionsFontFamily" type="text" id="optionsLayoutViewDeviceBadgeFontFamily" placeholder="" />
									<span class="helper-text translate">Format: /userfonts/name@url. You can upload your own fonts in the Images/Widgets-Tab.</span>
								</div>
								<div class="input-field col s12 m6 l4">
									<select class="value" name='optionsLayoutViewDeviceBadgeFontWeight' id='optionsLayoutViewDeviceBadgeFontWeight'>
										<option value="" disabled selected class="translate">Choose:</option>
										<option value="lighter" class="translate">Lighter</option>
										<option value="normal" class="translate">Normal</option>
										<option value="bold" class="translate">Bold</option>
										<option value="bolder" class="translate">Bolder</option>
									</select>
									<label for='optionsLayoutViewDeviceBadgeFontWeight' class="translate">Font-Weight:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<select class="value" name='optionsLayoutViewDeviceBadgeFontStyle' id='optionsLayoutViewDeviceBadgeFontStyle'>
										<option value="" disabled selected class="translate">Choose:</option>
										<option value="normal" class="translate">Normal</option>
										<option value="italic" class="translate">Italic</option>
										<option value="oblique" class="translate">Oblique</option>
									</select>
									<label for='optionsLayoutViewDeviceBadgeFontStyle' class="translate">Font-Style:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Marquee (Scrolling of long text):</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value" type="checkbox" id="optionsLayoutViewMarqueeDisabled" />
									<label for="optionsLayoutViewMarqueeDisabled" class="translate">Marquee disabled</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value" type="checkbox" id="optionsLayoutViewMarqueeNamesEnabled" />
									<label for="optionsLayoutViewMarqueeNamesEnabled" class="translate">Marquee for device-names enabled</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="1" max="1000" id="optionsLayoutViewMarqueeSpeed" placeholder="40" />
									<label for="optionsLayoutViewMarqueeSpeed" class="translate">Marquee Speed:</label>
									<span class="helper-text" data-error="0.00 - 1.00" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="collapsible-header">
							<i class="material-icons">expand_more</i><h6 class="translate">Dark-Mode:</h6>
						</div>
						<div class="collapsible-body">
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Settings:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m12 l12">
									<select class="value" name='optionsLayoutColorModeDarkEnable' id='optionsLayoutColorModeDarkEnable'>
										<option value='' class="translate">Automatic (depends on devices OS settings)</option>
										<option value='disabled' class="translate">Disabled</option>
										<option value='always' class="translate">Always Enabled</option>
									</select>
									<label for='optionsLayoutColorModeDarkEnable' class="translate">Enable Dark-Mode:</label>
									<span class="helper-text"></span>
									<a class="selectClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Color-Settings:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkBackgroundOverlay" placeholder="rgba(0,0,0,0.5)" />
									<label for="optionsLayoutColorModeDarkBackgroundOverlay" class="translate">Background Overlay Color:</label>
									<span class="helper-text translate">Ensure to use transparency!</span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="1000" id="optionsLayoutColorModeDarkToolbarBrightness" placeholder="66%" />
									<label for="optionsLayoutColorModeDarkToolbarBrightness" class="translate">Toolbar Brightness [%]:</label>
									<span class="helper-text" data-error="0 - 1000" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkToolbarOverlay" placeholder=" " />
									<label for="optionsLayoutColorModeDarkToolbarOverlay" class="translate">Toolbar Overlay Color:</label>
									<span class="helper-text translate">Ensure to use transparency!</span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="1000" id="optionsLayoutColorModeDarkHeadingsBrightness" placeholder="75%" />
									<label for="optionsLayoutColorModeDarkHeadingsBrightness" class="translate">Headings Brightness [%]:</label>
									<span class="helper-text" data-error="0 - 1000" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkHeadingsOverlay" placeholder=" " />
									<label for="optionsLayoutColorModeDarkHeadingsOverlay" class="translate">Headings Overlay Color:</label>
									<span class="helper-text translate">Ensure to use transparency!</span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="1000" id="optionsLayoutColorModeDarkDevicesBrightness" placeholder="80%" />
									<label for="optionsLayoutColorModeDarkDevicesBrightness" class="translate">Devices Brightness [%]:</label>
									<span class="helper-text" data-error="0 - 1000" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkDevicesOverlay" placeholder=" " />
									<label for="optionsLayoutColorModeDarkDevicesOverlay" class="translate">Devices Overlay Color:</label>
									<span class="helper-text translate">Ensure to use transparency!</span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="1000" id="optionsLayoutColorModeDarkBadgeBrightness" placeholder="80%" />
									<label for="optionsLayoutColorModeDarkBadgeBrightness" class="translate">Badge Brightness [%]:</label>
									<span class="helper-text" data-error="0 - 1000" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkBadgeOverlay" placeholder=" " />
									<label for="optionsLayoutColorModeDarkBadgeOverlay" class="translate">Badge Overlay Color:</label>
									<span class="helper-text translate">Ensure to use transparency!</span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Toolbar - General:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkToolbarFooterColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkToolbarFooterColor" class="translate">Overall Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkToolbarBorderColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkToolbarBorderColor" class="translate">Border-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Toolbar - Unselected Elements:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkToolbarColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkToolbarColor" class="translate">Unselected Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkToolbarHoverColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkToolbarHoverColor" class="translate">Unselected Hover Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkToolbarTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkToolbarTextColor" class="translate">Unselected Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkToolbarHoverTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkToolbarHoverTextColor" class="translate">Unselected Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkToolbarTextShadowColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkToolbarTextShadowColor" class="translate">Unselected Text-Schadow-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkToolbarHoverTextShadowColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkToolbarHoverTextShadowColor" class="translate">Unselected Hover Text-Schadow-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Toolbar - Selected Element:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkToolbarSelectedColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkToolbarSelectedColor" class="translate">Selected Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkToolbarSelectedHoverColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkToolbarSelectedHoverColor" class="translate">Selected Hover Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkToolbarSelectedTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkToolbarSelectedTextColor" class="translate">Selected Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkToolbarSelectedHoverTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkToolbarSelectedHoverTextColor" class="translate">Selected Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkToolbarSelectedTextShadowColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkToolbarSelectedTextShadowColor" class="translate">Selected Text-Schadow-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkToolbarSelectedHoverTextShadowColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkToolbarSelectedHoverTextShadowColor" class="translate">Selected Hover Text-Schadow-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Toolbar - Icons:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="1000" id="optionsLayoutColorModeDarkToolbarIconBrightness" placeholder=" " />
									<label for="optionsLayoutColorModeDarkToolbarIconBrightness" class="translate">Icon Brightness [%]:</label>
									<span class="helper-text" data-error="0 - 1000" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkToolbarIconBackgroundColor" placeholder=" " />
									<label for="optionsLayoutToolbarIconBackgroundColor" class="translate">Icon Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Main-Header:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewMainHeaderColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewMainHeaderColor" class="translate">Main-Header Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewMainHeaderTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewMainHeaderTextColor" class="translate">Main-Header Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Sub-Headers:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewSubHeaderColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewSubHeaderColor" class="translate">Sub-Headers Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewSubHeaderTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewSubHeaderTextColor" class="translate">Sub-Headers Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Devices - Icons:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="1000" id="optionsLayoutColorModeDarkDeviceIconBrightness" placeholder=" " />
									<label for="optionsLayoutColorModeDarkDeviceIconBrightness" class="translate">Icon Brightness [%]:</label>
									<span class="helper-text" data-error="0 - 1000" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Inactive Devices - Background:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceColor" class="translate">Inactive Devices - Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceHoverColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceHoverColor" class="translate">Inactive Devices, Hover - Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Inactive Devices - Overlay:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceInactiveColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceInactiveColor" class="translate">Inactive Devices - Overlay-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceInactiveHoverColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceInactiveHoverColor" class="translate">Inactive Devices, Hover - Overlay-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Active Devices - Background:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewActiveDeviceColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewActiveDeviceColor" class="translate">Active Devices - Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewActiveDeviceHoverColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewActiveDeviceHoverColor" class="translate">Active Devices, Hover - Background-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Active Devices - Overlay:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceActiveColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceActiveColor" class="translate">Active Devices - Overlay-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceActiveHoverColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceActiveHoverColor" class="translate">Active Devices, Hover - Overlay-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Device-Name:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceNameInactiveTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceNameInactiveTextColor" class="translate">Inactive Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceNameInactiveHoverTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceNameInactiveHoverTextColor" class="translate">Inactive Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceNameActiveTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceNameActiveTextColor" class="translate">Active Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceNameActiveHoverTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceNameActiveHoverTextColor" class="translate">Active Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceNameInactiveOnTransparentTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceNameInactiveOnTransparentTextColor" class="translate">Inactive on Transparent Background Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceNameInactiveOnTransparentHoverTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceNameInactiveOnTransparentHoverTextColor" class="translate">Inactive on Transparent Background Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceNameActiveOnTransparentTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceNameActiveOnTransparentTextColor" class="translate">Active on Transparent Background Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceNameActiveOnTransparentHoverTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceNameActiveOnTransparentHoverTextColor" class="translate">Active on Transparent Background Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">State:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceStateInactiveTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceStateInactiveTextColor" class="translate">Inactive Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceStateInactiveHoverTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceStateInactiveHoverTextColor" class="translate">Inactive Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceStateActiveTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceStateActiveTextColor" class="translate">Active Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceStateActiveHoverTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceStateActiveHoverTextColor" class="translate">Active Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceStateInactiveOnTransparentTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceStateInactiveOnTransparentTextColor" class="translate">Inactive on Transparent Background Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceStateInactiveOnTransparentHoverTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceStateInactiveOnTransparentHoverTextColor" class="translate">Inactive on Transparent Background Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceStateActiveOnTransparentTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceStateActiveOnTransparentTextColor" class="translate">Active on Transparent Background Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceStateActiveOnTransparentHoverTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceStateActiveOnTransparentHoverTextColor" class="translate">Active on Transparent Background Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">INFO_A, INFO_B:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="0" max="1000" id="optionsLayoutColorModeDarkDeviceInfoIconBrightness" placeholder=" " />
									<label for="optionsLayoutColorModeDarkDeviceInfoIconBrightness" class="translate">Icon Brightness [%]:</label>
									<span class="helper-text" data-error="0 - 1000" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceInfoInactiveTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceInfoInactiveTextColor" class="translate">Inactive Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceInfoeInactiveHoverTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceInfoeInactiveHoverTextColor" class="translate">Inactive Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceInfoActiveTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceInfoActiveTextColor" class="translate">Active Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceInfoActiveHoverTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceInfoActiveHoverTextColor" class="translate">Active Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceInfoInactiveOnTransparentTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceInfoInactiveOnTransparentTextColor" class="translate">Inactive on Transparent Background Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceInfoInactiveOnTransparentHoverTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceInfoInactiveOnTransparentHoverTextColor" class="translate">Inactive on Transparent Background Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceInfoActiveOnTransparentTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceInfoActiveOnTransparentTextColor" class="translate">Active on Transparent Background Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value MaterializeColorPicker validate validateOnlyError" type="text" id="optionsLayoutColorModeDarkViewDeviceInfoActiveOnTransparentHoverTextColor" placeholder=" " />
									<label for="optionsLayoutColorModeDarkViewDeviceInfoActiveOnTransparentHoverTextColor" class="translate">Active on Transparent Background Hover Text-Color:</label>
									<span class="helper-text"></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="collapsible-header">
							<i class="material-icons">expand_more</i><h6 class="translate">Miscellaneous:</h6>
						</div>
						<div class="collapsible-body">
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Resize Devices To Fit Screen:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value" type="checkbox" id="optionsLayoutViewResizeDevicesToFitScreenDisabled" />
									<label for="optionsLayoutViewResizeDevicesToFitScreenDisabled" class="translate">Resize disabled</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="1" max="5000" id="optionsLayoutViewResizeDevicesToFitScreenTreshold" placeholder="600" />
									<label for="optionsLayoutViewResizeDevicesToFitScreenTreshold" class="translate">Treshold in pixel (resize is disabled, if screen is bigger than this):</label>
									<span class="helper-text" data-error="1 - 5000" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value" type="checkbox" id="optionsLayoutViewResizeDevicesToFitScreenOnBigScreens" checked />
									<label for="optionsLayoutViewResizeDevicesToFitScreenOnBigScreens" class="translate">Resize even when screen is big</label>
									<span class="helper-text"></span>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Big Mode:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value" type="checkbox" id="optionsLayoutViewBigModeDisabled" />
									<label for="optionsLayoutViewBigModeDisabled" class="translate">Big Mode disabled</label>
									<span class="helper-text">Normally, tiles and labels are displayed enlarged from a screen width of 1500px</span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="900" max="5000" id="optionsLayoutViewBigModeTreshold" placeholder="1500" />
									<label for="optionsLayoutViewBigModeTreshold" class="translate">Treshold in pixel (tiles are displayed bigger, if screen is wider than this):</label>
									<span class="helper-text" data-error="900 - 5000" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Return after time:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value" type="checkbox" id="optionsLayoutViewReturnAfterTimeEnabled" />
									<label for="optionsLayoutViewReturnAfterTimeEnabled" class="translate">Enable return after time</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value validate validateOnlyError" type="number" min="60" max="86400" id="optionsLayoutViewReturnAfterTimeTreshold" placeholder="600" />
									<label for="optionsLayoutViewReturnAfterTimeTreshold" class="translate">Time in seconds (return is triggered after this time of inactivity):</label>
									<span class="helper-text" data-error="60 - 86400" data-success=""></span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
								<div class="input-field col s12 m6 l4">
									<input class="value" type="text" id="optionsLayoutViewReturnAfterTimeDestinationView" placeholder="" />
									<label for="optionsLayoutViewReturnAfterTimeDestinationView" class="translate">Return to this view (if empty the first toolbar-entry is used):</label>
									<span class="helper-text translate">Example: iqontrol.0.Views.Home</span>
									<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Swiping:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value" type="checkbox" id="optionsLayoutViewSwipingDisabled" />
									<label for="optionsLayoutViewSwipingDisabled" class="translate">Disable swiping</label>
									<span class="helper-text"></span>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m6 l4">
									<input class="value" type="checkbox" id="optionsLayoutViewHideSwipeGoals" />
									<label for="optionsLayoutViewHideSwipeGoals" class="translate">Hide swipe goals</label>
									<span class="helper-text"></span>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">CSS (Experts only):</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m12 l12">
									<textarea class="value" id="optionsLayoutCSS" style="height: 400px; min-height: 40px; min-width: 100%; scrolling: yes; background-color: #FBFBFB;"></textarea>
									<label for="optionsLayoutCSS" class="translate">Add your own CSS Code here:</label>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="collapsible-header">
							<i class="material-icons">expand_more</i><h6 class="translate">Backup/Restore:</h6>
						</div>
						<div class="collapsible-body">
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Backup:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m4 l6">
									<select multiple name='optionsBackupRestoreExportViewsSelectedSelection' id='optionsBackupRestoreExportViewsSelectedSelection'></select>
									<label for='optionsBackupRestoreExportViewsSelectedSelection' class="translate">Views:</label>
									<span class="helper-text"></span>
								</div>
								<div class="input-field col s12 m8 l6">
									<a class="waves-effect waves-light btn disabled" id="optionsBackupRestoreExportViewsSelected"><i class="material-icons left">file_download</i><i class="material-icons left">apps</i><span class="translate">Export selected Views</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn" id="optionsBackupRestoreExportViewsAll"><i class="material-icons left">file_download</i><i class="material-icons left">apps</i><span class="translate">Export all Views</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn" id="optionsBackupRestoreExportToolbar"><i class="material-icons left">file_download</i><i class="material-icons left">more_horiz</i><span class="translate">Export Toolbar</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn" id="optionsBackupRestoreExportPanel"><i class="material-icons left">file_download</i><i class="material-icons left">chrome_reader_mode</i><span class="translate">Export Panel</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn" id="optionsBackupRestoreExportLists"><i class="material-icons left">file_download</i><i class="material-icons left">format_list_bulleted</i><span class="translate">Export Lists/Counters</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn" id="optionsBackupRestoreExportOptions"><i class="material-icons left">file_download</i><i class="material-icons left">settings</i><span class="translate">Export Options</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn" id="optionsBackupRestoreExportCustoms"><i class="material-icons left">file_download</i><i class="material-icons left">build</i><span class="translate">Export Custom Datapoint-Settings</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn red" id="optionsBackupRestoreExportEverything"><i class="material-icons left">file_download</i><i class="material-icons left">blur_on</i><span class="translate">Export Everything (but userfiles)</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn orange" id="optionsBackupRestoreExportUserfiles"><i class="material-icons left" id="optionsBackupRestoreExportUserfilesIcon">file_download</i><i class="material-icons left">cloud</i><span class="translate">Export Userfiles</span><div id="optionsBackupRestoreExportUserfilesProgress" class="progress" style="position: absolute; bottom: -17px; left: 0px; width: 100%; display: none;"><div class="indeterminate"></div></div></a>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<p class="translate sub-title">Restore:</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn" id="optionsBackupRestoreImportViewsOverwrite" data-overwrite="true"><i class="material-icons left">file_upload</i><i class="material-icons left">apps</i><span class="translate">Import Views (overwrite existing views)</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn" id="optionsBackupRestoreImportViewsAppend"><i class="material-icons left">file_upload</i><i class="material-icons left">apps</i><span class="translate">Import Views (append to existing views)</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn" id="optionsBackupRestoreImportToolbarOverwrite" data-overwrite="true"><i class="material-icons left">file_upload</i><i class="material-icons left">more_horiz</i><span class="translate">Import Toolbar (overwrite exisiting toolbar)</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn" id="optionsBackupRestoreImportToolbarAppend"><i class="material-icons left">file_upload</i><i class="material-icons left">more_horiz</i><span class="translate">Import Toolbar (append to exsisting toolbar)</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn" id="optionsBackupRestoreImportPanel"><i class="material-icons left">file_upload</i><i class="material-icons left">chrome_reader_mode</i><span class="translate">Import Panel</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn" id="optionsBackupRestoreImportListsOverwrite" data-overwrite="true"><i class="material-icons left">file_upload</i><i class="material-icons left">format_list_bulleted</i><span class="translate">Import Lists/Counters (overwrite exisiting Lists/Counters)</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn" id="optionsBackupRestoreImportListsAppend"><i class="material-icons left">file_upload</i><i class="material-icons left">format_list_bulleted</i><span class="translate">Import Lists/Counters (append to exisiting Lists/Counters)</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn" id="optionsBackupRestoreImportOptions"><i class="material-icons left">file_upload</i><i class="material-icons left">settings</i><span class="translate">Import Options</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn" id="optionsBackupRestoreImportCustoms"><i class="material-icons left">file_upload</i><i class="material-icons left">build</i><span class="translate">Import Custom Datapoint-Settings</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn red" id="optionsBackupRestoreImportEverything"><i class="material-icons left">file_upload</i><i class="material-icons left">blur_on</i><span class="translate">Import Everything (but userfiles)</span></a> 
								</div>
								<div class="input-field col s12 m12 l12">
									<a class="waves-effect waves-light btn orange" style="background-color: orange !important;" disabled="disabled" id="optionsBackupRestoreImportUserfiles"><i class="material-icons left" id="optionsBackupRestoreImportUserfilesIcon">file_upload</i><i class="material-icons left">cloud</i><span class="translate">Import Userfiles</span><div id="optionsBackupRestoreImportUserfilesProgress" class="progress" style="position: absolute; bottom: -17px; left: 0px; width: 100%; display: none;"><div class="indeterminate"></div></div></a>
									<p><i class="material-icons left tiny">warning</i><span class="translate">Restoring of userfiles via zip-file is not supported. You might need to re-upload the files manually in the Images/Widgets-Tab.</span></p>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- ++++++++++ DIALOGS ++++++++++ -->
    <div class="m material-dialogs">
		<!-- DIALOG: WidgetSettings  -->
        <div id="dialogWidgetSettings" class="modal modal-fixed-footer">
            <div class="modal-content">
                <div class="row">
                    <div class="col s12">
                        <h6 class="title"><span class="translate">Widget Settings</span>:</h6>
                    </div>
                </div>
				<div class="row">
					<div class="col s12">
						<h6 class="translate sub-title">Description:</h6>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<div id="dialogWidgetSettingsDescription"></div>
					</div>
				</div>
				<div class="section">
					<div class="divider"></div>
				</div>				
				<div class="row">
					<div class="col s12">
						<h6 class="translate sub-title">Parameter:</h6>
					</div>
				</div>
				<div id="dialogWidgetSettingsUrlParameters">
				</div>
				<div class="section">
					<div class="divider"></div>
				</div>
				<div class="row">
					<div class="col s12">
						<h6 class="translate sub-title">Suggested settings for device options:</h6>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<div id="dialogWidgetSettingsOptions"></div>
					</div>
				</div>
				<div class="section dialogWidgetSettingsReplaceurl">
					<div class="divider"></div>
				</div>
				<div class="row dialogWidgetSettingsReplaceurl">
					<div class="col s12">
						<p><span class="translate">These settings include a redirection to</span>&nbsp;<span id="dialogWidgetSettingsReplaceurlDestination"></span></p>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Ok</span></a>
                <a class="modal-action modal-close waves-effect waves-green btn btn-close"><i class="large material-icons left">close</i><span class="translate">Cancel</span></a>
            </div>
        </div>

		<!-- DIALOG: viewsAutocreate -->
        <div id="dialogViewsAutocreate" class="modal modal-fixed-footer">
            <div class="modal-content"> 
                <div class="row">
                    <div class="col s12">
                        <h6 class="title" class="translate">Autocreate views</h6>
                    </div>
                </div>
				<div class="row">
					<div class="col s12">
						<h6 class="sub-title">
							<span class="translate">Select Enumeration</span>:
						</h6>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<select class="value icons" name='dialogViewsAutocreateEnumerationMain' id='dialogViewsAutocreateEnumerationMain'></select>
						<label for='dialogViewsAutocreateEnumerationMain' class="translate"></label>
						<span class="translate">Enumeration</span>
					</div>
				</div>
				<div class="section">
					<div class="divider"></div>
				</div>
				<div class="row">
					<div class="col s12 m12 l12">
						<div id="dialogViewsAutocreateEnumerationList"></div>
					</div>
				</div>
				<div class="row">
					<div class="col s12 m12 l12">
						<a class="btn chose" onclick="$('.dialogViewsAutocreateEnumerationListItem').prop('checked', true).trigger('change');"><i class="large material-icons left">check_box</i><span class="translate">All</span></a>
						<a class="btn chose" onclick="$('.dialogViewsAutocreateEnumerationListItem').prop('checked', false).trigger('change');"><i class="large material-icons left">check_box_outline_blank</i><span class="translate">None</span></a>
					</div>
				</div>
				<div class="section">
					<div class="divider"></div>
				</div>
				<div class="row">
					<div class="col s12">
						<p class="translate sub-title">A view will be created for each selected entry from this list.</p>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12 m6 l6">
						<input class="value" type="checkbox" id="dialogViewsAutocreateCreateMasterView" checked />
						<label for="dialogViewsAutocreateCreateMasterView" class="translate">Create a main view with links to the created views</label>
						<span class="helper-text"></span>
					</div>
					<div class="input-field col s12 m6 l6">
						<input class="value" type="checkbox" id="dialogViewsAutocreateCreateMasterViewToolbarEntry" checked />
						<label for="dialogViewsAutocreateCreateMasterViewToolbarEntry" class="translate">Create a toolbar-entry for this main view</label>
						<span class="helper-text"></span>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Ok</span></a>
                <a class="modal-action modal-close waves-effect waves-green btn btn-close"><i class="large material-icons left ">close</i><span class="translate">Cancel</span></a>
            </div>
        </div>		

		<!-- DIALOG: DeviceEdit -->
        <div id="dialogDeviceEdit" class="modal modal-fixed-footer">
            <div class="modal-content">
                <input type="hidden" id="dialogDeviceEditViewIndex" />
                <input type="hidden" id="dialogDeviceEditDeviceIndex" />
                <div class="row">
                    <div class="col s12">
                        <h6 class="title"><span class="translate">Edit Device:</span> <span id="dialogDeviceEditCommonName"></span></h6>
                    </div>
                </div>
				<div class="row">
					<div class="col s12">
						<h6 class="sub-title">
							<a class="btn-floating btn-small waves-effect waves-light" href="https://github.com/sbormann/ioBroker.iqontrol/blob/master/README.md#description-of-roles-and-associated-states" target="_blank"><i class="material-icons">live_help</i></a>
							<span class="translate">Select Role</span>:
						</h6>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<select class="value icons" name='dialogDeviceEditCommonRole' id='dialogDeviceEditCommonRole'></select>
						<label for='dialogDeviceEditCommonRole' class="translate"></label>
						<span class="translate">Role</span>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<h6 class="translate sub-title">Set Corresponding States</h6>
					</div>
				</div>
				<div class="col s12 scrollableTable wide" id="tableDialogDeviceEditStates">
					<div class="col s12 m12 l12">
						<table class="table-values highlight" style="width: 90%;">
							<thead>
								<tr>
									<th data-name="state" class="translate">State</th>
									<th data-name="commonRole" data-type="select" data-options="linkedState/State;const/Constant;array/Array;linkedStateArray/Array from State" class="translate">Type</th>
									<th data-name="value" class="translate">Value</th>
									<th data-buttons="edit openCustom" style="width:100px;"></th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
				<br><br>
				<div class="section">
					<div class="divider"></div>
					<div class="col s12">
						<h5 class="translate sub-title">Options</h5>
						<a class="btn-floating btn-small" id="dialogDeviceEditOptionsContentCollapsibleOpenAll"><i class="material-icons">format_line_spacing</i></a>
						<a class="btn-floating btn-small" id="dialogDeviceEditOptionsContentCollapsibleCloseAll"><i class="material-icons">drag_handle</i></a>
					</div>
				</div>
				<div id="dialogDeviceEditOptionsContent">
				</div>
				<div class="row">
					<p><br></p>
						<a class="waves-effect waves-light btn" id="dialogDeviceEditOptionsExport"><i class="material-icons left">file_download</i><span class="translate">Export Options</span></a> 
						<a class="waves-effect waves-light btn" id="dialogDeviceEditOptionsImport"><i class="material-icons left">file_upload</i><span class="translate">Import Options</span></a> 
				</div>
				<div class="row">
					<p><br></p>
					<span class="translate">You can use variables in image-filenames</span> (<a href="https://github.com/sbormann/ioBroker.iqontrol#icons-and-background-images" target="_blank"><span class="translate">see here</span> <i class="material-icons tiny">live_help</i></a>).<br>
					<span class="translate">Note on the data points BACKGROUND_VIEW/URL/HTML: Only one of the three data points can be used at a time. In descending order, first BACKGROUND_VIEW, then BACKGROUND_URL and finally BACKGROUND_HTML is checked for validity and the first valid entry is displayed.</span>
				</div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Ok</span></a>
                <a class="modal-action modal-close waves-effect waves-green btn btn-close"><i class="large material-icons left">close</i><span class="translate">Cancel</span></a>
            </div>
        </div>

		<!-- DIALOG: DeviceEditStateConstant -->
        <div id="dialogDeviceEditStateConstant" class="modal modal-fixed-footer">
            <div class="modal-content">
                <input type="hidden" id="dialogDeviceEditStateConstantIndex" />
                <div class="row" style="height: 100%; overflow: hidden; margin: 0px;">
                    <div class="col s12">
						<h6 class="title"><span class="translate">Edit Constant:</span> <span id="dialogDeviceEditStateConstantName"></span></h6>
					</div>
                    <div class="input-field col s12">
						<textarea id="dialogDeviceEditStateConstantTextarea" class="materialize-textarea" style="min-height: 85% !important; max-height: 85% !important; overflow-y: scroll; margin: 0px;"></textarea>
						<label for="dialogDeviceEditStateConstantTextarea"></label>						
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Ok</span></a>
                <a class="modal-action modal-close waves-effect waves-green btn btn-close"><i class="large material-icons left ">close</i><span class="translate">Cancel</span></a>
            </div>
        </div>

		<!-- DIALOG: DeviceEditStateArray -->
        <div id="dialogDeviceEditStateArray" class="modal modal-fixed-footer">
            <div class="modal-content">
                <input type="hidden" id="dialogDeviceEditStateArrayIndex" />
                <input type="hidden" id="dialogDeviceEditStateArrayShowAdditionalCols" />
                <div class="row">
                    <div class="col s12">
                        <h6 class="title"><span class="translate">Edit Array:</span> <span id="dialogDeviceEditStateArrayName"></span></h6>
                    </div>
                </div>
				<div class="col s12 scrollableTable xwide" id="tableDialogDeviceEditStateArray">
					<div class="col s12 m12 l12">
						<div class="row">
							<div class="col s2 m1 l1">
								<button title="Add" class="translateT table-button-add btn-floating waves-effect waves-light btn-small">
									<i class="material-icons">add</i>
								</button>
							</div>
						</div>
						<table class="table-values highlight" style="width: 90%;">
							<thead>
								<tr>
									<th data-name="name" class="translate">Name</th>
									<th data-name="hideName" data-type="checkbox" class="translate">Hide Name</th>
									<th data-name="caption" class="translate">Caption (only for Buttons)</th>
									<th data-name="heading" class="translate">Heading</th>
									<th data-name="commonRole" data-type="select" data-options="linkedState;const" class="translate">Type</th>
									<th data-name="icon" class="translate">Icon</th>
									<th data-name="role" data-type="select" data-options="/Depending on Datapoint Settings;readonly/Readonly;button/Button (if pressed, it sends its name to the datapoint)" class="translate">Role</th>
									<th data-name="value" class="translate">Value</th>
									<th data-name="halfWidth" data-type="checkbox">&frac12;&harr;</th>
									<th data-buttons="edit openCustom delete drag_handle" style="width:50px;"></th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="col s11" style="font-size: small;">
						<p><br></p>
						<span class="dialogDeviceEditStateArrayInfoHeading translate" style="display: none;">Heading: This is optional. If set, a new line with a new heading will be inserted.</span><br>
						<span class="dialogDeviceEditStateArrayInfoHeading translate" style="display: none;">&frac12;&harr;: if checked, the control will be displayed with half width.</span><br>
						<div class="dialogDeviceEditStateArrayInfoHeading" style="display: none;"><span class="translate">You can use variables in device-names, button-captions and headings</span> (<a href="https://github.com/sbormann/ioBroker.iqontrol#device-names" target="_blank"><span class="translate">see here</span> <i class="material-icons tiny">live_help</i></a>).</div><br>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Ok</span></a>
                <a class="modal-action modal-close waves-effect waves-green btn btn-close"><i class="large material-icons left">close</i><span class="translate">Cancel</span></a>
            </div>
        </div>

		<!-- DIALOG: DeviceEditStateCustom -->
        <div id="dialogDeviceEditStateCustom" class="modal modal-fixed-footer">
            <div class="modal-content">
                <input type="hidden" id="dialogDeviceEditStateCustomIndex" />
                <div class="row" style="height: 100%; overflow: hidden; margin: 0px;">
                    <div class="col s12">
						<h6 class="title"><span class="translate">Edit Custom:</span> <span id="dialogDeviceEditStateCustomName"></span></h6>
					</div>
                    <div class="input-field col s12">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Ok</span></a>
                <a class="modal-action modal-close waves-effect waves-green btn btn-close"><i class="large material-icons left ">close</i><span class="translate">Cancel</span></a>
            </div>
        </div>

		<!-- DIALOG: DeviceAutocreate  -->
        <div id="dialogDeviceAutocreate" class="modal modal-fixed-footer">
            <div class="modal-content">
                <div class="row">
                    <div class="col s12">
                        <h6 class="title"><span class="translate">Autocreate Device:</span></h6>
                    </div>
                </div>
				<div class="row">
					<div class="col s12">
						<h6 class="translate sub-title">Select device ID from ioBroker-Object-Tree:</h6>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s10">
                        <input class="value" type="text" id="dialogDeviceAutocreateSourceId" />
                        <label for="dialogDeviceAutocreateSourceId" class="translate">ID:</label>
						<span class="helper-text" id="dialogDeviceAutocreateSourceIdCommonName"></span>
					</div>
                    <div class="col s1">
                        <a id="dialogDeviceAutocreateSourceIdSelectIdButton" class="btn"><i class="material-icons">edit</i><span></span></a>
                    </div>
				</div>
				<div class="row">
					<div class="col s12">
                        <a class="waves-effect waves-light btn" id="dialogDeviceAutocreateCreatePreviewButton"><i class="material-icons left">check_circle</i><span class="translate">Try to create preview</span></a>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<h6 class="translate sub-title">Preview:</h6>
						<p class="translate">Check the device after creation and edit it to correct role and states.</p>
					</div>
				</div>
				<div class="row">
					<div class="col s6">
						<p id="dialogDeviceAutocreatePreview" style="min-height: 300px;"></p>
					</div>
					<div class="col s6">
						<p id="dialogDeviceAutocreatePreviewStates" style="min-height: 300px;"></p>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Create Device</span></a>
                <a class="modal-action modal-close waves-effect waves-green btn btn-close"><i class="large material-icons left">close</i><span class="translate">Cancel</span></a>
            </div>
        </div>

		<!-- DIALOG: DeviceCopyFrom  -->
        <div id="dialogDeviceCopyFrom" class="modal modal-fixed-footer">
            <div class="modal-content">
                <div class="row">
                    <div class="col s12">
                        <h6 class="title"><span class="translate">Copy Device:</span></h6>
                    </div>
                </div>
				<div class="row">
					<div class="col s12">
						<h6 class="translate sub-title">Select Source</h6>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12 m6">
						<select class="value" name='dialogDeviceCopyFromSourceView' id='dialogDeviceCopyFromSourceView'></select>
						<label for='dialogDeviceCopyFromSourceView' class="translate"></label>
						<span class="translate">Source-View</span>
					</div>
					<div class="input-field col s12 m6">
						<select class="value" name='dialogDeviceCopyFromSourceDevice' id='dialogDeviceCopyFromSourceDevice'></select>
						<label for='dialogDeviceCopyFromSourceDevice' class="translate"></label>
						<span class="translate">Source-Device</span>
					</div>
				</div>
				<div class="row">
					<div class="col s12 m6">
						<h6 class="sub-title"><span class="translate">The selected Device will be copied to View </span><i><span id="dialogDeviceCopyFromDestinationView"></span></i></h6>
					</div>
					<div class="col s12 m6">
						<input class="value" type="text" id="dialogDeviceCopyFromNewName" />
						<label for="dialogDeviceCopyFromNewName" class="translate">New Name</label>
						<span class="helper-text translate"></span>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12 m12 l12">
						<input class="value" type="checkbox" id="dialogDeviceCopyFromCreateSymbolicLink" />
						<label for="dialogDeviceCopyFromCreateSymbolicLink" class="translate" style="display: inline;">Create symbolic link instead of a real copy</label>
						<span class="helper-text translate">That means, if you change settings of the source device, the copy will also change</span>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<input class="value" type="checkbox" id="dialogDeviceCopyFromReplaceCheckbox" />
						<label for="dialogDeviceCopyFromReplaceCheckbox" class="translate" style="display: inline;">Replace Datapoints:</label>
						<span class="helper-text translate"></span>
					</div>
					<div class="col s12">
						<a class="waves-effect waves-light btn" id="dialogDeviceCopyFromReplaceDatapointsAdd"><i class="material-icons left">add_circle_outline</i><span class="translate">Add Replacement</span></a>
					</div>
					<div class="col s12">
						<ul id="dialogDeviceCopyFromReplaceDatapointsList" class="collection" style="overflow: visible;"></ul>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Copy this device</span></a>
                <a class="modal-action modal-close waves-effect waves-green btn btn-close"><i class="large material-icons left">close</i><span class="translate">Cancel</span></a>
            </div>
        </div>

		<!-- DIALOG: DevicesAutocreateWidget  -->
        <div id="dialogDevicesAutocreateWidget" class="modal modal-fixed-footer">
            <div class="modal-content">
                <div class="row">
                    <div class="col s12">
                        <h6 class="title"><span class="translate">Autocreate Widget:</span></h6>
                    </div>
                </div>
				<div class="row">
					<div class="input-field col s12">
						<input class="value" name='dialogDevicesAutocreateWidgetName' id='dialogDevicesAutocreateWidgetName'></select>
						<label for='dialogDevicesAutocreateWidgetName' class="translate"></label>
						<span class="translate">Widget Name</span>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<input class="value" name='dialogDevicesAutocreateWidgetSource' id='dialogDevicesAutocreateWidgetSource'></select>
						<label for='dialogDevicesAutocreateWidgetSource' class="translate"></label>
						<span class="translate">Widget Source</span>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<h6 class="translate sub-title">Preview:</h6>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<p id="dialogDevicesAutocreateWidgetDescription"></p>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<p id="dialogDevicesAutocreateWidgetUrlParameters"></p>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<p id="dialogDevicesAutocreateWidgetOptions"></p>
					</div>
				</div>
				<div class="section">
					<div class="divider"></div>
				</div>				
				<div class="row">
					<div class="col s12">
						<p><i class="material-icons" style="vertical-align: middle; font-size: 1rem; margin-right: 6px;">info_outline</i>&nbsp;<span class="translate">Technically, widgets are web pages that are included as the background of a tile. The settings of the widget can therefore be changed later in the device settings under BACKGROUND_URL.</span></p>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Autocreate Widget</span></a>
                <a class="modal-action modal-close waves-effect waves-green btn btn-close"><i class="large material-icons left">close</i><span class="translate">Cancel</span></a>
            </div>
        </div>

		<!-- DIALOG: SelectID -->
        <div id="dialogSelectId" class="modal modal-fixed-footer" style="z-index:20000 !important;">
            <div class="modal-content">
                <div class="row">
                    <div class="col s12 title"></div>
                </div>
                <div class="row">
                    <div class="col s12 dialog-content" style="max-height: 80%;">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Select</span></a>
                <a class="modal-action modal-close waves-effect waves-green btn btn-close"><i class="large material-icons left ">close</i><span class="translate">Cancel</span></a>
            </div>
        </div>

		<!-- DIALOG: optionsBackupRestoreImportCustoms -->
        <div id="dialogOptionsBackupRestoreImportCustoms" class="modal modal-fixed-footer">
            <div class="modal-content"> 
                <div class="row">
                    <div class="col s12">
                        <h6 class="title" class="translate">Import Custom Datapoint-Settings</h6>
                    </div>
                </div>
				<div class="row">
					<div class="col s12 m12 l12">
						<div id="dialogOptionsBackupRestoreImportCustomsList"></div>
					</div>
				</div>
				<div class="row">
					<div class="col s12 m12 l12">
						<a class="btn" onclick="$('.dialogOptionsBackupRestoreImportCustomsListItem').prop('checked', true);"><i class="large material-icons left">check_box</i><span class="translate">All</span></a>
						<a class="btn" onclick="$('.dialogOptionsBackupRestoreImportCustomsListItem').prop('checked', false);"><i class="large material-icons left">check_box_outline_blank</i><span class="translate">None</span></a>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Ok</span></a>
                <a class="modal-action modal-close waves-effect waves-green btn btn-close"><i class="large material-icons left ">close</i><span class="translate">Cancel</span></a>
            </div>
        </div>		

		<!-- DIALOG: optionsLayoutDefaultIconsPresetChange -->
        <div id="dialogOptionsLayoutDefaultIconsPresetChange" class="modal modal-fixed-footer">
            <div class="modal-content"> 
                <div class="row">
                    <div class="col s12">
                        <h6 class="title" class="translate">Icon-Preset:&nbsp;<span id="dialogOptionsLayoutDefaultIconsPresetChangePresetName"></span></h6>
                    </div>
                </div>
				<div class="row">
					<div class="col s12 m12 l12">
						<div id="dialogOptionsLayoutDefaultIconsPresetChangePresetDescription"></div>
					</div>
				</div>
				<div class="row">
					<div class="col s12 m12 l12">
						<div id="dialogOptionsLayoutDefaultIconsPresetChangeList"></div>
					</div>
				</div>
				<div class="row">
					<div class="col s12 m12 l12">
						<a class="btn" onclick="$('.dialogOptionsLayoutDefaultIconsPresetChangeListItem').prop('checked', true);"><i class="large material-icons left">check_box</i><span class="translate">All</span></a>
						<a class="btn" onclick="$('.dialogOptionsLayoutDefaultIconsPresetChangeListItem').prop('checked', false);"><i class="large material-icons left">check_box_outline_blank</i><span class="translate">None</span></a>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12 m12 l12">
						<input class="value" type="checkbox" id="dialogOptionsLayoutDefaultIconsPresetChangeDefaultIcons" checked="checked" />
						<label for="dialogOptionsLayoutDefaultIconsPresetChangeDefaultIcons" class="translate" style="display: inline;">Try to set all default icons to the selected icons above</label>
						<span class="helper-text translate"></span>
					</div>
					<div class="input-field col s12 m12 l12">
						<input class="value" type="checkbox" id="dialogOptionsLayoutDefaultIconsPresetChangeIconOptions" checked="checked" />
						<label for="dialogOptionsLayoutDefaultIconsPresetChangeIconOptions" class="translate" style="display: inline;">Try to set icons of all devices to the selected icons above</label>
						<span class="helper-text translate"></span>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Ok</span></a>
                <a class="modal-action modal-close waves-effect waves-green btn btn-close"><i class="large material-icons left ">close</i><span class="translate">Cancel</span></a>
            </div>
        </div>		

		<!-- DIALOG: ImagePopup -->
        <div id="dialogImagePopup" class="modal modal-fixed-footer">
            <div class="modal-content"> 
                <div class="row">
                    <div class="col s12">
                        <h6 class="title"><span class="translate">Image:</span> <span id="dialogImagePopupImageName"></span></h6>
                    </div>
                </div>
				<div class="row">
					<div class="col s12 m12 l12">
						<div id="dialogImagePopupImage"></div>
					</div>
				</div>
				<div class="row">
					<div class="col s12 m12 l12">
						<div id="dialogImagePopupImageDescription"></div>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Ok</span></a>
            </div>
        </div>
		
 		<!-- DIALOG: CodeEditor -->
        <div id="dialogCodeEditor" class="modal modal-fixed-footer">
            <div class="modal-content"> 
                <div class="row">
                    <div class="col s12">
                        <h6 class="title"><span class="translate">CodeEditor:</span> <span id="dialogCodeEditorFileName"></span> (<span id="dialogCodeEditorFileType"></span>)</h6>
                    </div>
                </div>
				<div class="row">
					<div class="col s12 m12 l12">
						<textarea id="dialogCodeEditorCode" style="width: 100%; height: 100%;"></textarea>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <a class="modal-action waves-effect waves-green btn btn-set"><i class="large material-icons left">save</i><span class="translate">Save</span></a>
                <a class="modal-action waves-effect waves-green btn btn-close"><i class="large material-icons left ">close</i><span class="translate">Close</span></a>
            </div>
        </div>

		<!-- DIALOG: ListEdit -->
        <div id="dialogListEdit" class="modal modal-fixed-footer">
            <div class="modal-content">
                <input type="hidden" id="dialogListEditListIndex" />
                <div class="row">
                    <div class="col s12">
                        <h6 class="title"><span class="translate">Edit List:</span> <span id="dialogListEditName"></span></h6>
                    </div>
                </div>
				<div class="row">
					<div class="col s12">
						<img src="lists.png"  class="headingIcon">
						<h6 class="translate sub-title heading">Selectors</h6>
					</div>
				</div>
				<div class="col s12 scrollableTable wide" id="tableDialogListEditSelectors">
					<div class="col s12 m12 l12">
						<div class="row">
							<div class="col s2 m1 l1">
								<button title="Add" class="translateT table-button-add btn-floating waves-effect waves-light btn-small">
									<i class="material-icons">add</i>
								</button>
							</div>
						</div>
						<table class="table-values highlight" style="width: 90%;">
							<thead>
								<tr>
									<th data-name="modifier" data-type="select" data-options="add/Add;remove/Remove" class="translate">Modifier</th>
									<th data-name="type" data-type="select" data-options="all/All;enum/Enumeration;enumWithChilds/Enumeration with Childs;id/ID;type/Object-Type;commonType/Type;commonRole/Role " class="translate">Type<th>
									<th data-name="operator" data-type="select" data-options="eq/is;ne/is not;c/contains;nc/contains not;bw/begins with;nbw/doens't begin with;ew/ends with;new/doesn't end with" class="translate">Operator</th>
									<th data-name="value" class="translate">Value</th>
									<th data-buttons="edit delete drag_handle" style="width:75px;"></th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12 m12 l12">
						<input class="value" type="checkbox" id="dialogListEditListFilterAliases" />
						<label for="dialogListEditListFilterAliases" class="translate" style="display: inline;">Remove items, that have an alias in this list</label>
						<span class="helper-text translate"></span>
					</div>
					<div class="input-field col s12 m12 l12">
						<input class="value" type="checkbox" id="dialogListEditCreateNamesList" />
						<label for="dialogListEditCreateNamesList" class="translate" style="display: inline;">Create a list that contains the names of the datapoints</label>
						<span class="helper-text translate"></span>
					</div>
					<div class="input-field col s12 m12 l12">
						<input class="value" type="checkbox" id="dialogListEditCreateParentNamesList" />
						<label for="dialogListEditCreateParentNamesList" class="translate" style="display: inline;">Create a list that contains the parent-names of the datapoints</label>
						<span class="helper-text translate"></span>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<p>
							<span class="translate">This list will be processed from top to bottom. At any time you can add or remove items by defining conditions. This will generate your TOTAL_LIST.</span>
							<span class="translate">Compare operators work case insensitive. You can also compare with multiple values at one time if you provide comma-separated list of arguments (for example: |remove|ID|doesn't end with|.error,.overheat| will remove all IDs that don't end with .error OR .overheat).</span>
							 <a href="https://github.com/sbormann/ioBroker.iqontrol#lists-and-counters" target="_blank"><span class="translate">See here for more informations and examples</span> <i class="material-icons tiny">live_help</i></a>.
						</p>
					</div>
				</div>
				<div class="section">
					<div class="divider"></div>
				</div>
				<div class="row">
					<div class="col s12">
						<img src="counters.png"  class="headingIcon">
						<h6 class="translate sub-title heading">Counters</h6>
					</div>
				</div>
				<div class="col s12 scrollableTable" id="tableDialogListEditCounters">
					<div class="col s12 m12 l12">
						<div class="row">
							<div class="col s2 m1 l1">
								<button title="Add" class="translateT table-button-add btn-floating waves-effect waves-light btn-small">
									<i class="material-icons">add</i>
								</button>
							</div>
						</div>
						<table class="table-values highlight" style="width: 90%;">
							<thead>
								<tr>
									<th data-name="name" class="translate">Name</th>
									<th data-name="unit" class="translate">Unit</th>
									<th data-buttons="edit delete drag_handle" style="width:75px;"></th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
					</div>
				</div>
				<div class="row">
					<div class="input-field col s11 m8 l4">
						<input class="value validate validateOnlyError" type="number" min="0" max="86400" id="dialogListEditListTriggerIntervall" placeholder="" />
						<label for="dialogListEditListTriggerIntervall" class="translate">Update counters periodically every [seconds]</label>
						<span class="helper-text" data-error="0 - 86400 [s]" data-success=""></span>
						<a class="inputClear waves-effect waves-light btn-small btn-floating" data-default=""><i class="material-icons">clear</i></a>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<p>
							<span class="translate">You can define several counters that count for given conditions in your TOTAL_LIST.</span>
							 <span class="translate">The counters update everytime a datapoint in your TOTAL_LIST is changes.</span> 
							 <span class="translate">Additionally, you can set a specific time interval at which the counter will be updated.</span> 
							 <a href="https://github.com/sbormann/ioBroker.iqontrol#lists-and-counters" target="_blank"><span class="translate">See here for more informations and examples</span> <i class="material-icons tiny">live_help</i></a>.
						</p>
					</div>
				</div>
				<div class="section">
					<div class="divider"></div>
				</div>
				<div class="row">
					<div class="col s12">
						<img src="calculations.png"  class="headingIcon">
						<h6 class="translate sub-title heading">Calculations</h6>
					</div>
				</div>
				<div class="col s12 scrollableTable" id="tableDialogListEditCalculations">
					<div class="row">
						<div class="col s2 m1 l1">
							<button title="Add" class="translateT table-button-add btn-floating waves-effect waves-light btn-small">
								<i class="material-icons">add</i>
							</button>
						</div>
					</div>
					<div class="col s12 m12 l12">
						<table class="table-values highlight" style="width: 90%;">
							<thead>
								<tr>
									<th data-name="name" class="translate">Name</th>
									<th data-name="unit" class="translate">Unit</th>
									<th data-buttons="edit delete drag_handle" style="width:135px;"></th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<p>
							<span class="translate">Calculations can be used to combine numeric datapoints and calculate for example the sum of different counters.</span>
							 <span class="translate">You can also combine objects like arrays (lists) by addition or subtraction.</span>
							 <a href="https://github.com/sbormann/ioBroker.iqontrol#lists-and-counters" target="_blank"><span class="translate">See here for more informations and examples</span> <i class="material-icons tiny">live_help</i></a>.
						</p>
					</div>
				</div>
				<div class="section">
					<div class="divider"></div>
				</div>			
				<div class="row">
					<div class="col s12">
						<img src="combinations.png"  class="headingIcon">
						<h6 class="translate sub-title heading">Combinations</h6>
					</div>
				</div>
				<div class="col s12 scrollableTable" id="tableDialogListEditCombinations">
					<div class="row">
						<div class="col s2 m1 l1">
							<button title="Add" class="translateT table-button-add btn-floating waves-effect waves-light btn-small">
								<i class="material-icons">add</i>
							</button>
						</div>
					</div>
					<div class="col s12 m12 l12">
						<table class="table-values highlight" style="width: 90%;">
							<thead>
								<tr>
									<th data-name="name" class="translate">Name</th>
									<th data-name="unit" class="translate">Unit</th>
									<th data-buttons="edit delete drag_handle" style="width:135px;"></th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<p>
							<span class="translate">Combinations can be used to combine different datapoints with text.</span>
							 <a href="https://github.com/sbormann/ioBroker.iqontrol#lists-and-counters" target="_blank"><span class="translate">See here for more informations and examples</span> <i class="material-icons tiny">live_help</i></a>.
						</p>
					</div>
				</div>
            </div>
            <div class="modal-footer">
				<span id="dialogListEditCheckUnallowed" class="translate" style="display: none; color: red;"></span>&nbsp;
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Ok</span></a>
                <a class="modal-action modal-close waves-effect waves-green btn btn-close"><i class="large material-icons left">close</i><span class="translate">Cancel</span></a>
            </div>
        </div>

		<!-- DIALOG: ListEditCounter -->
        <div id="dialogListEditCounter" class="modal modal-fixed-footer">
            <div class="modal-content">
                <input type="hidden" id="dialogListEditCounterIndex" />
                <div class="row">
                    <div class="col s12">
                        <h6 class="title"><span class="translate">Edit Counter:</span> <span id="dialogListEditCounterName"></span></h6>
                    </div>
                </div>
				<div class="row">
					<div class="col s12">
						<h6 class="sub-title">
							<span class="translate">Conditions</span>:
						</h6>
					</div>
				</div>
				<div class="col s12 scrollableTable wide" id="tableDialogListEditCounterConditions">
					<div class="col s12 m12 l12">
						<div class="row">
							<div class="col s2 m1 l1">
								<button title="Add" class="translateT table-button-add btn-floating waves-effect waves-light btn-small">
									<i class="material-icons">add</i>
								</button>
							</div>
						</div>
						<table class="table-values highlight" style="width: 90%;">
							<thead>
								<tr>
									<th data-name="modifier" data-type="select" data-options="&&/   And;||/Or" class="translate">Modifier</th>
									<th data-name="type" data-type="select" data-options="value/Value;valuelistValue/Value from valuelist;ack/Acknowledged;lc/lastchange;lcs/seconds from lastchange;ts/timestamp;tss/seconds from timestamp" class="translate">Typ</th>
									<th data-name="operator" data-type="select" data-options="eqt/is true;eqf/is false;eq/is;ne/is not;gt/is greater than;ge/is greater or equal;lt/is lower than;le/is lower or equal;c/contains;nc/contains not;bw/begins with;nbw/doens't begin with;ew/ends with;new/doesn't end with" class="translate">Operator</th>
									<th data-name="value" class="translate">Value</th>
									<th data-buttons="delete drag_handle" style="width:75px;"></th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<p>
							<span class="translate">The conditions are processed from top to bottom.</span>
							 <a href="https://github.com/sbormann/ioBroker.iqontrol#lists-and-counters" target="_blank"><span class="translate">See here for more informations and examples</span> <i class="material-icons tiny">live_help</i></a>.
						</p>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Ok</span></a>
                <a class="modal-action modal-close waves-effect waves-green btn btn-close"><i class="large material-icons left">close</i><span class="translate">Cancel</span></a>
            </div>
        </div>

		<!-- DIALOG: ListEditCalculation -->
        <div id="dialogListEditCalculation" class="modal modal-fixed-footer">
            <div class="modal-content">
                <input type="hidden" id="dialogListEditCalculationIndex" />
                <div class="row">
                    <div class="col s12">
                        <h6 class="title"><span class="translate">Edit Calculation:</span> <span id="dialogListEditCalculationName"></span></h6>
                    </div>
                </div>
				<div class="row">
					<div class="col s12">
						<h6 class="sub-title">
							<span class="translate">Calculation</span>:
						</h6>
					</div>
				</div>
				<div class="col s12 scrollableTable" id="tableDialogListEditCalculationSteps">
					<div class="col s12 m12 l12">
						<div class="row">
							<div class="col s2 m1 l1">
								<button title="Add" class="translateT table-button-add btn-floating waves-effect waves-light btn-small">
									<i class="material-icons">add</i>
								</button>
							</div>
						</div>
						<table class="table-values highlight" style="width: 90%;">
							<thead>
								<tr>
									<th data-name="operator" data-type="select" data-options="+;-;*;\/" class="translate">Operator</th>
									<th data-name="id" class="translate">ID</th>
									<th data-buttons="edit delete drag_handle" style="width:75px;"></th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<p>
							<span class="translate">Calculations can be used to combine numeric datapoints and calculate for example the sum of different counters.</span>
							 <span class="translate">You can also combine objects like arrays (lists) by addition or subtraction.</span>
							 <a href="https://github.com/sbormann/ioBroker.iqontrol#lists-and-counters" target="_blank"><span class="translate">See here for more informations and examples</span> <i class="material-icons tiny">live_help</i></a>.
						</p>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Ok</span></a>
                <a class="modal-action modal-close waves-effect waves-green btn btn-close"><i class="large material-icons left">close</i><span class="translate">Cancel</span></a>
            </div>
        </div>

		<!-- DIALOG: ListEditCombination -->
        <div id="dialogListEditCombination" class="modal modal-fixed-footer">
            <div class="modal-content">
                <input type="hidden" id="dialogListEditCombinationIndex" />
                <div class="row">
                    <div class="col s12">
                        <h6 class="title"><span class="translate">Edit Combination:</span> <span id="dialogListEditCombinationName"></span></h6>
                    </div>
                </div>
				<div class="row">
					<div class="col s12">
						<h6 class="sub-title">
							<span class="translate">Combination</span>:
						</h6>
					</div>
				</div>
				<div class="col s12 scrollableTable xwide" id="tableDialogListEditCombinationSteps">
					<div class="col s12 m12 l12">
						<div class="row">
							<div class="col s2 m1 l1">
								<button title="Add" class="translateT table-button-add btn-floating waves-effect waves-light btn-small">
									<i class="material-icons">add</i>
								</button>
							</div>
						</div>
						<table class="table-values highlight" style="width: 90%;">
							<thead>
								<tr>
									<th data-name="prefix" class="translate">Prefix</th>
									<th data-name="type" data-type="select" data-options="value/Value;valuelistValue/Value from valuelist;ack/Acknowledged;lc/lastchange;lcs/seconds from lastchange;ts/timestamp;tss/seconds from timestamp" class="translate">Typ</th>
									<th data-name="id" class="translate">ID</th>
									<th data-name="postfix" class="translate">Postfix</th>
									<th data-name="onlyIfOperator" data-type="select" data-options=";eqt/is true;eqf/is false;eq/is;ne/is not;gt/is greater than;ge/is greater or equal;lt/is lower than;le/is lower or equal;c/contains;nc/contains not;bw/begins with;nbw/doens't begin with;ew/ends with;new/doesn't end with" class="translate">Only if</th>
									<th data-name="onlyIfValue"></th>
									<th data-name="onlyIfJustPrefix" data-type="checkbox">Just Prefix</th>
									<th data-name="onlyIfElse">Else</th>
									<th data-buttons="edit delete drag_handle" style="width:75px;"></th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<p>
							<span class="translate">Combinations can be used to combine different datapoints with text.</span>
							 <span class="translate">The 'Pefix' will be placed before, the 'Postfix' after the value of the given ID.</span>
							 <span class="translate">In the 'Only If'-Section you can define a condition, if the line schould be placed or not.</span>
							 <span class="translate">You can leave the id empty, then the original id will be used.</span>
							 <span class="translate">By activating 'Just Prefix' just the prefix is placed (not the value nor the postfix), if the condition matches.</span>
							 <span class="translate">You can also specify a 'Else' text, that will be placed, if the condition doesn't match.</span>
							 <a href="https://github.com/sbormann/ioBroker.iqontrol#lists-and-counters" target="_blank"><span class="translate">See here for more informations and examples</span> <i class="material-icons tiny">live_help</i></a>.
						</p>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Ok</span></a>
                <a class="modal-action modal-close waves-effect waves-green btn btn-close"><i class="large material-icons left">close</i><span class="translate">Cancel</span></a>
            </div>
        </div>


 		<!-- DIALOG: Generic -->
        <div id="dialogGeneric" class="modal modal-fixed-footer">
            <div class="modal-content"> 
                <div class="row">
                    <div class="col s12">
                        <h6 class="title" id="dialogGenericTitle"></h6>
                    </div>
                </div>
				<div class="row">
					<div class="col s12 m12 l12">
						<div id="dialogGenericContent"></div>
					</div>
				</div>
            </div>
            <div class="modal-footer">
                <a class="modal-action modal-close waves-effect waves-green btn btn-set"><i class="large material-icons left">check</i><span class="translate">Ok</span></a>
            </div>
        </div>		
    </div>

</body>
</html>
