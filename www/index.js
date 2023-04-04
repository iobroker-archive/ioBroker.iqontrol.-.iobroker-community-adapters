//iQontrol - Copyright (c) by Sebatian Bormann
//Please visit https://github.com/sbormann/ioBroker.iqontrol for licence-agreement and further information

if(window.location.href.indexOf('#') > -1) window.location.href = window.location.href.replace(/#[^\?]*/, ''); //Fix for new socket.io, where # without an argument in url leads to connection error


//Settings
var namespace = getUrlParameter('namespace') || 'iqontrol.0';
var passphrase = getUrlParameter('passphrase');
var connectionLink = location.origin;
var configMode = getUrlParameter('mode') || 'socket';
var useCache = true;
var homeId = getUrlParameter('renderView') || '';	//If not specified, the first toolbar-entry will be used
var openDialogId = getUrlParameter('openDialog');	//If specified, this dialog will be opened (after that this will be set to null)
var isBackgroundView = getUrlParameter('isBackgroundView');
var adjustHeightToBackgroundView = getUrlParameter('adjustHeightToBackgroundView');
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
var momentToAnypickerDisplayFormatTokens = {
	yyyy:		"",
	yyy:		"",
	yy:			"",
	yo:			"",
	y:			"",
	NNNNN:		"",
	NNNN:		"",
	NNN:		"",
	NN:			"",
	N:			"",

	gggg:		"",
	gg:			"",
	ww:			"",
	wo:			"",
	w:			"",
	e:			"",
	dddd:		"DDDD",
	ddd:		"DDD",
	dd:			"DD",
	do:			"",
	d:			"",
	GGGG:		"",
	GG:			"",
	WW:			"",
	Wo:			"",
	WW:			"",
	W:			"",
	E:			"",

	YYYYYY:		"yyyy",
	YYYY:		"yyyy",
	YY:			"yy",
	Y:			"y",
	Q:			"",
	Qo:			"",
	MMMM:		"MMMM",
	MM:			"MM",
	Mo:			"M",
	MMM:		"MMM",
	M:			"M",
	DDDD:		"",
	DDD:		"",
	DD:			"dd",
	Do:			"d",
	D:			"d",
	X:			"",
	x:			"",

	LLLL:		"",
	LLL:		"",
	LTS:		"",
	LT:			"",
	LL:			"",
	L:			"",

	HH:			"HH",
	H:			"H",
	hh:			"hh",
	h:			"h",
	kk:			"HH",
	k:			"h",
	a:			"aa",
	A:			"AA",
	mm:			"mm",
	m:			"m",
	ss:			"ss",
	s:			"s",
	SSSSSSSSS:	"",
	SSSSSSSS:	"",
	SSSSSSS:	"",
	SSSSSS:		"",
	SSSSS:		"",
	SSSS:		"",
	SSS:		"",
	SS:			"",
	S:			"",
	ZZ:			"",
	Z:			""
}
var momentToDurationDisplayFormatTokens = {
	yyyy:		"",
	yyy:		"",
	yy:			"",
	yo:			"",
	y:			"",
	NNNNN:		"",
	NNNN:		"",
	NNN:		"",
	NN:			"",
	N:			"",

	gggg:		"",
	gg:			"",
	ww:			"",
	wo:			"",
	w:			"",
	e:			"",
	"dddd,":	"",
	dddd:		"",
	"ddd,":		"",
	ddd:		"",
	"dd,":		"",
	dd:			"",
	"d,":		"",
	do:			"",
	d:			"",
	GGGG:		"",
	GG:			"",
	WW:			"",
	Wo:			"",
	WW:			"",
	W:			"",
	E:			"",

	YYYYYY:		"YYYYYY",
	YYYY:		"YYYY",
	YY:			"YY",
	Y:			"Y",
	Q:			"",
	Qo:			"",
	MMMM:		"MMMM",
	MM:			"MM",
	Mo:			"M",
	MMM:		"MMM",
	M:			"M",
	DDDD:		"DDDD",
	DDD:		"DDD",
	DD:			"DD",
	Do:			"D",
	D:			"D",
	X:			"s",
	x:			"ms",

	LLLL:		"",
	LLL:		"",
	LTS:		"",
	LT:			"",
	LL:			"",
	L:			"",

	HH:			"HH",
	H:			"H",
	hh:			"hh",
	h:			"h",
	kk:			"HH",
	k:			"h",
	a:			"",
	A:			"",
	ms:			"ms",
	mm:			"mm",
	m:			"m",
	ss:			"ss",
	s:			"s",
	SSSSSSSSS:	"",
	SSSSSSSS:	"",
	SSSSSSS:	"",
	SSSSSS:		"",
	SSSSS:		"",
	SSSS:		"",
	SSS:		"",
	SS:			"",
	S:			"",
	ZZ:			"",
	Z:			""
}
var anypickerDisplayFormatToAnypickerPickerFormatTokens = {
	DDDD:		"",
	DDD:		"",
	DD:			"",
	yyyy:		"yyyy",
	yy:			"yy",
	y:			"y",
	MMMM:		"MMMM",
	MMM:		"MMM",
	MM:			"MM",
	M:			"M",
	dd:			"dd",
	d:			"d",
	HH:			"HH",
	H:			"H",
	hh:			"hh",
	h:			"h",
	aa:			"aa",
	a:			"a",
	AA:			"AA",
	A:			"A",
	mm:			"mm",
	m:			"m",
	ss:			"ss",
	s:			"s",
}
var momentRemoveDateTokens = {
	"dddd,":	"",
	dddd:		"",
	"ddd,":		"",
	ddd:		"",
	"do [of]":	"",
	do:			"",
	"dd,":		"",
	dd:			"",
	"d,":		"",
	d:			"",
	"DD.":		"",
	"DD-":		"",
	"-DD":		"",
	DD:			"",
	"Do [of]":	"",
	Do:			"",
	"D.":		"",
	"D-":		"",
	"-D":		"",
	D:			"",
	"MMMM,":	"",
	MMMM:		"",
	"MMM,":		"",
	MMM:		"",
	Mo:			"",
	"MM.":		"",
	"MM-":		"",
	"-MM":		"",
	MM:			"",
	"M.":		"",
	"M-":		"",
	"-M":		"",
	M:			"",
	YYYYYY:		"",
	".YYYY":	"",
	"YYYY-":	"",
	"-YYYY":	"",
	YYYY:		"",
	".YY":		"",
	"YY-":		"",
	"-YY":		"",
	YY:			"",
	".Y":		"",
	"Y-":		"",
	"-Y":		"",
	Y:			"",
	"E,":		"",
	E:			"",
	"e,":		"",
	e:			"",
	Qo:			"",
	Q:			"",
	ww:			"",
	wo:			"",
	w:			"",
	WW:			"",
	Wo:			"",
	W:			"",
	yo:			"",
	y:			"",
	NNNNN:		"",
	NNNN:		"",
	NNN:		"",
	NN:			"",
	N:			"",
	".gggg":	"",
	"gggg-":	"",
	"-gggg":	"",
	gggg:		"",
	".gg":		"",
	"gg-":		"",
	"-gg":		"",
	gg:			"",
	".GGGG":	"",
	"GGGG-":	"",
	"-GGGG":	"",
	GGGG:		"",
	".GG":		"",
	"GG-":		"",
	"-GG":		"",
	GG:			""
}
var iQontrolRoles = {
	"iQontrolView": {
		name: "Link to other view",
		states: ["INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon", type: "icon", typicalIconEquivalents: ["blank", "link_plain_internal", "link_chain"], default: ""}
			}},
			SECTION_GENERAL: {options: {
				readonly: "delete",
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {default: "openLinkToOtherView"},
				clickOnTileAction: {default: "openLinkToOtherView"},
			}},
			SECTION_TILE_ACTIVE_CONDITION: "delete",
			SECTION_TILE_ACTIVE: "delete",
			SECTION_TIMESTAMP: "delete",
			SECTION_DEVICESPECIFIC: "delete"
		}
	},
	"iQontrolSwitch": {
		name: "Switch",
		states: ["STATE", "POWER", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/switch_on.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["switch_on", "plug_on"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["switch_off", "plug_off"], default: ""}
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: {options: {
				showPowerAsState: {name: "Show POWER as state", type: "checkbox", default: "false"}
			}}
		}
	},
	"iQontrolButton": {
		name: "Button",
		states: ["STATE", "SET_VALUE", "OFF_SET_VALUE", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/button.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["button"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["button"], default: ""}
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: {options: {
				showState: {name: "Show State", type: "checkbox", default: "false"},
				buttonCaption: {name: "Caption for button", type: "text", default: ""},
				returnToOffSetValueAfter: {name: "Return to 'OFF_SET_VALUE' after [ms] (0 = never, toggle)", type: "number", min: "0", max: "60000", default: ""},
				closeDialogAfterExecution: {name: "Close dialog after execution", type: "checkbox", default: "false"}
			}}
		}
	},
	"iQontrolLight": {
		name: "Light",
		states: ["STATE", "LEVEL", "HUE", "SATURATION", "COLOR_BRIGHTNESS", "CT", "WHITE_BRIGHTNESS", "ALTERNATIVE_COLORSPACE_VALUE", "POWER", "EFFECT", "EFFECT_NEXT", "EFFECT_SPEED_UP", "EFFECT_SPEED_DOWN", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/light_on.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["light_on", "light_desklamp_on", "light_lampshade_on"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["light_off", "light_desklamp_off", "light_lampshade_off"], default: ""}
			}},
			SECTION_DEVICESPECIFIC: {options: {
				invertCt: {name: "Invert CT (use Kelvin instead of Mired)", type: "checkbox", default: "false"},
				alternativeColorspace: {name: "Colorspace for ALTERNATIVE_COLORSPACE_VALUE", type: "select", selectOptions: "/None;RGB/RGB;#RGB/#RGB;RGBW/RGBW;#RGBW/#RGBW;RGBWWCW/RGBWWCW;#RGBWWCW/#RGBWWCW;RGBCWWW/RGBCWWW;#RGBCWWW/#RGBCWWW;RGB_HUEONLY/RGB (Hue only);#RGB_HUEONLY/#RGB (Hue only);HUE_MILIGHT/Hue for Milight;HHSSBB_TUYA/HHSSBB for Tuya", default: ""},
				linkGlowActiveColorToHue: {name: "Use color of lamp as GLOW_ACTIVE_COLOR", type: "checkbox", default: "false"},
				linkOverlayActiveColorToHue: {name: "Use color of lamp as OVERLAY_ACTIVE_COLOR", type: "checkbox", default: "false"},
				showPowerAsState: {name: "Show POWER as state", type: "checkbox", default: "false"}
			}}
		}
	},
	"iQontrolFan": {
		name: "Fan",
		states: ["STATE", "LEVEL", "POWER", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/fan_on.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["fan_on", "kitchenhood_on"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["fan_off", "kitchenhood_off"], default: ""}
			}},
			SECTION_DEVICESPECIFIC: {options: {
				showPowerAsState: {name: "Show POWER as state", type: "checkbox", default: "false"}
			}}
		}
	},
	"iQontrolThermostat": {
		name: "Thermostat",
		states: ["SET_TEMPERATURE","TEMPERATURE", "HUMIDITY", "CONTROL_MODE", "WINDOW_OPEN_REPORTING", "VALVE_STATES", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/radiator.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon", type: "icon", typicalIconEquivalents: ["radiator_on", "heating_on", "cooling_on", "airconditioner_on"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["radiator_off", "heating_off", "cooling_off", "airconditioner_off"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
				clickOnTileAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
			}},
			SECTION_TIMESTAMP: {options: {
				stateCaption: {name: "Caption of SET_TEMPERATURE"},
				levelCaption: "delete",
				levelFavorites: {name: "Favorite values for SET_TEMPERATURE (semicolon separated list of numbers)", default: "17;19;20;21;22"}
			}},
			SECTION_DEVICESPECIFIC: {options: {
				controlModeDisabledValue: {name: "Value of CONTROL_MODE for 'disabled'", type: "text", default: ""},
				valveStatesSectionType: {name: "Appereance of VALVE_STATES", type: "select", selectOptions: "none/No collapsible section (always visible);none noCaption/No collapsible section (always visible), without caption;collapsible/Collapsible section, closed at start;collapsible open/Collapsible section, opened at start", default: "collapsible"}
			}}
		}
	},
	"iQontrolHomematicThermostat": {
		name: "Homematic-Thermostat",
		states: ["SET_TEMPERATURE", "TEMPERATURE", "HUMIDITY", "CONTROL_MODE", "BOOST_STATE", "PARTY_TEMPERATURE", "WINDOW_OPEN_REPORTING", "VALVE_STATES", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/radiator.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon", type: "icon", typicalIconEquivalents: ["radiator_on", "heating_on", "cooling_on", "airconditioner_on"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["radiator_off", "heating_off", "cooling_off", "airconditioner_off"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
				clickOnTileAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
			}},
			SECTION_TIMESTAMP: {options: {
				stateCaption: {name: "Caption of SET_TEMPERATURE"},
				levelCaption: "delete",
				levelFavorites: {name: "Favorite values for SET_TEMPERATURE (semicolon separated list of numbers)", default: "17;19;20;21;22"},
			}},
			SECTION_DEVICESPECIFIC: {options: {
				valveStatesSectionType: {name: "Appereance of VALVE_STATES", type: "select", selectOptions: "none/No collapsible section (always visible);none noCaption/No collapsible section (always visible), without caption;collapsible/Collapsible section, closed at start;collapsible open/Collapsible section, opened at start", default: "collapsible"}
			}}
		}
	},
	"iQontrolHomematicIpThermostat": {
		name: "HomematicIP-Thermostat",
		states: ["SET_TEMPERATURE", "TEMPERATURE", "HUMIDITY", "CONTROL_MODE", "BOOST_STATE", "PARTY_TEMPERATURE", "WINDOW_OPEN_REPORTING", "VALVE_STATES", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/radiator.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon", type: "icon", typicalIconEquivalents: ["radiator_on", "heating_on", "cooling_on", "airconditioner_on"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["radiator_off", "heating_off", "cooling_off", "airconditioner_off"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
				clickOnTileAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
			}},
			SECTION_TIMESTAMP: {options: {
				stateCaption: {name: "Caption of SET_TEMPERATURE"},
				levelCaption: "delete",
				levelFavorites: {name: "Favorite values for SET_TEMPERATURE (semicolon separated list of numbers)", default: "17;19;20;21;22"},
			}},
			SECTION_DEVICESPECIFIC: {options: {
				valveStatesSectionType: {name: "Appereance of VALVE_STATES", type: "select", selectOptions: "none/No collapsible section (always visible);none noCaption/No collapsible section (always visible), without caption;collapsible/Collapsible section, closed at start;collapsible open/Collapsible section, opened at start", default: "collapsible"}
			}}
		}
	},
	"iQontrolTemperature": {
		name: "Temperature-Sensor",
		states: ["STATE", "TEMPERATURE", "HUMIDITY", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/temperature.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["temperature"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["temperature"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {default: "openLinkToOtherView"},
				clickOnTileAction: {default: "openLinkToOtherView"},
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: "delete"
		}
	},
	"iQontrolHumidity": {
		name: "Humidity-Sensor",
		states: ["STATE", "TEMPERATURE", "HUMIDITY", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/humidity.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["humidity"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["humidity"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {default: "openLinkToOtherView"},
				clickOnTileAction: {default: "openLinkToOtherView"},
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: "delete"
		}
	},
	"iQontrolPressure": {
		name: "Pressure-Sensor",
		states: ["STATE", "TEMPERATURE", "HUMIDITY", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/pressure.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["pressure"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["pressure"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {default: "openLinkToOtherView"},
				clickOnTileAction: {default: "openLinkToOtherView"},
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: "delete"
		}
	},
	"iQontrolBrightness": {
		name: "Brightness-Sensor",
		states: ["STATE", "BRIGHTNESS", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/brightness_light.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["brightness_light"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["brightness_dark"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {default: "openLinkToOtherView"},
				clickOnTileAction: {default: "openLinkToOtherView"},
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: "delete"
		}
	},
	"iQontrolMotion": {
		name: "Motion-Sensor",
		states: ["STATE", "BRIGHTNESS", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/motion_on.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["motion_on"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["motion_off"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {default: "openLinkToOtherView"},
				clickOnTileAction: {default: "openLinkToOtherView"},
			}},
			SECTION_TIMESTAMP: {name: "Timestamp", type: "section", options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete",
				addTimestampToState: {default: "SE"}
			}},
			SECTION_DEVICESPECIFIC: "delete"
		}
	},
	"iQontrolDoor": {
		name: "Door",
		states: ["STATE", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/door_closed.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon opened", type: "icon", typicalIconEquivalents: ["door_opened"], default: ""},
				icon_off: {name: "Icon closed", type: "icon", typicalIconEquivalents: ["door_closed"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {default: "openLinkToOtherView"},
				clickOnTileAction: {default: "openLinkToOtherView"},
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: "delete"
		}
	},
	"iQontrolGarageDoor": {
		name: "Garage Door",
		states: ["STATE", "TOGGLE", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/garagedoor_closed.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon opened", type: "icon", typicalIconEquivalents: ["garagedoor_opened", "gate_opened"], default: ""},
				icon_off: {name: "Icon closed", type: "icon", typicalIconEquivalents: ["garagedoor_closed", "gate_closed"], default: ""}
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: {options: {
				noConfirmationForTogglingViaIcon: {name: "Don't ask for confirmation when toggling via icon", type: "checkbox", default: "false"}
			}}
		}
	},
	"iQontrolDoorWithLock": {
		name: "Door with lock",
		states: ["STATE", "LOCK_STATE", "LOCK_STATE_UNCERTAIN", "LOCK_OPEN", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/door_locked.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["door_opened"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["door_closed"], default: ""},
				icon_locked: {name: "Icon locked", type: "icon", typicalIconEquivalents: ["door_locked"], default: ""},
				icon_unlocked: {name: "Icon unlocked", type: "icon", typicalIconEquivalents: ["door_unlocked"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
				clickOnTileAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: {options: {
				stateClosedValue: {name: "Value of STATE for 'closed'", type: "text", default: ""},
				lockStateLockedValue: {name: "Value of LOCK_STATE for 'locked'", type: "text", default: ""},
				lockOpenValue: {name: "Value of LOCK_OPEN for 'open door'", type: "text", default: ""}				
			}}
		}
	},
	"iQontrolWindow": {
		name: "Window",
		states: ["STATE", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/window_closed.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon opened", type: "icon", typicalIconEquivalents: ["window_opened", "window_toplight_opened"], default: ""},
				icon_off: {name: "Icon closed", type: "icon", typicalIconEquivalents: ["window_closed", "window_toplight_closed"], default: ""},
				icon_tilted: {name: "Icon tilted", type: "icon", typicalIconEquivalents: ["window_tilted", "window_toplight_tilted"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {default: "openLinkToOtherView"},
				clickOnTileAction: {default: "openLinkToOtherView"},
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: {options: {
				stateClosedValue: {name: "Value of STATE for 'closed'", type: "text", default: ""},
				stateOpenedValue: {name: "Value of STATE for 'opened'", type: "text", default: ""},
				stateTiltedValue: {name: "Value of STATE for 'tilted'", type: "text", default: ""}
			}}
		}
	},
	"iQontrolBlind": {
		name: "Blind",
		states: ["LEVEL", "DIRECTION", "STOP", "STOP_SET_VALUE", "UP", "UP_SET_VALUE", "DOWN", "DOWN_SET_VALUE", "FAVORITE_POSITION", "FAVORITE_POSITION_SET_VALUE", "SLATS_LEVEL", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/blind_middle.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon opened", type: "icon", typicalIconEquivalents: ["blind_opened"], default: ""},
				icon_off: {name: "Icon closed", type: "icon", typicalIconEquivalents: ["blind_closed"], default: ""},
				icon_middle: {name: "Icon middle", type: "icon", typicalIconEquivalents: ["blind_middle"], default: ""},
				icon_closing: {name: "Icon closing", type: "icon", typicalIconEquivalents: ["blind_closing"], default: ""},
				icon_opening: {name: "Icon opening", type: "icon", typicalIconEquivalents: ["blind_opening"], default: ""}
			}},
			SECTION_TIMESTAMP: {options: {
				stateCaption: "delete"
			}},
			SECTION_DEVICESPECIFIC: {options: {
				invertActuatorLevel: {name: "Invert LEVEL (0 = open)", type: "checkbox", default: "false"},
				directionOpeningValue: {name: "Value of DIRECTION for 'opening'", type: "text", default: "1"},
				directionClosingValue: {name: "Value of DIRECTION for 'closing'", type: "text", default: "2"},
				directionUncertainValue: {name: "Value of DIRECTION for 'uncertain'", type: "text", default: "3"},
				favoritePositionCaption: {name: "Caption for FAVORITE_POSITION", type: "text", default: "Favorite Position"},
				upCaption: {name: "Caption for UP", type: "text", default: "Up"},
				stopCaption: {name: "Caption for STOP", type: "text", default: "Stop"},
				downCaption: {name: "Caption for DOWN", type: "text", default: "Down"}
			}}
		}
	},
	"iQontrolFire": {
		name: "Fire-Sensor",
		states: ["STATE", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/fire_on.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["fire_on", "gas_on", "firebox_on"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["fire_off", "gas_off", "firebox_off", "firebox_green"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {default: "openLinkToOtherView"},
				clickOnTileAction: {default: "openLinkToOtherView"},
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: "delete"
		}
	},
	"iQontrolFlood": {
		name: "Flood-Sensor",
		states: ["STATE", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/flood_on.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["flood_on"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["flood_off"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {default: "openLinkToOtherView"},
				clickOnTileAction: {default: "openLinkToOtherView"},
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: "delete"
		}
	},
	"iQontrolAlarm": {
		name: "Alarm",
		states: ["STATE", "CONTROL_MODE", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/alarm_on.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_triggered: {name: "Icon triggered (STATE is true)", type: "icon", typicalIconEquivalents: ["alarm_on_triggered", "alarm_on", "bell_on", "bell_ringing_on", "firebox_on", "panic_on"], default: ""},
				icon_on: {name: "Icon on (STATE is false, CONTROL_MODE is armed)", type: "icon", typicalIconEquivalents: ["alarm_on", "alarm_on_triggered", "bell_ringing_on", "bell_on", "firebox_on", "firebox_green", "panic_on"], default: ""},
				icon_off: {name: "Icon off (STATE is false, CONTROL_MODE is disarmed)", type: "icon", typicalIconEquivalents: ["alarm_off", "bell_off", "bell_ringing_off", "firebox_off", "firebox_green", "panic_off"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
				clickOnTileAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: {options: {
				controlModeDisarmedValue: {name: "Value of CONTROL_MODE for 'disarmed'", type: "text", default: "0"}
			}}
		}
	},
	"iQontrolBattery": {
		name: "Battery",
		states: ["STATE", "CHARGING", "DISCHARGING", "POWER", "VOLTAGE", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/battery_full.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon full", type: "icon", typicalIconEquivalents: ["battery_full"], default: ""},
				icon_off: {name: "Icon empty", type: "icon", typicalIconEquivalents: ["battery_empty"], default: ""},
				icon_charged75: {name: "Icon 75%", type: "icon", typicalIconEquivalents: ["battery_75"], default: ""},
				icon_charged50: {name: "Icon 50%", type: "icon", typicalIconEquivalents: ["battery_50"], default: ""},
				icon_charged25: {name: "Icon 25%", type: "icon", typicalIconEquivalents: ["battery_25"], default: ""},
				icon_charged10: {name: "Icon 10%", type: "icon", typicalIconEquivalents: ["battery_10"], default: ""},
				icon_charging: {name: "Icon charging", type: "icon", typicalIconEquivalents: ["battery_charging_overlay"], default: ""},
				icon_discharging: {name: "Icon discharging", type: "icon", typicalIconEquivalents: ["battery_discharging_overlay"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
				clickOnTileAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: "delete"
		}
	},
	"iQontrolDateAndTime":	{
		name: "Date and Time",
		states: ["STATE", "SUBJECT", "TIME", "RINGING", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/time_alarmclock_on.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["time_alarmclock_on", "time_clock_on", "time_timer_on", "time_duration_on", "time_calendar_on"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["time_alarmclock_off", "time_clock_off", "time_timer_off", "time_duration_off", "time_calendar_off"], default: ""},
				icon_ringing: {name: "Icon ringing", type: "icon", typicalIconEquivalents: ["bell_ringing_overlay"], default: ""}
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: {options: {
				subjectCaption: {name: "Caption of SUBJECT", type: "text", default: ""},
				timeCaption: {name: "Caption for TIME", type: "text", default: ""},
				timeFormat: {name: "Format of TIME (as stored in the datapoint, see readme)", type: "combobox", selectOptions: "~/Use custom datapoint settings;x/timestamp;YYYY-MM-DDTHH:mm:ss.SSSZ;ddd MMM DD YYYY HH:mm:ss ZZ;HH:mm;HH:mm:ss;DD.MM.YYYY;DD.MM.YYYY HH:mm;DD.MM.YYYY HH:mm:ss;ddd, DD.MM.YYYY;ddd, DD.MM.YYYY HH:mm;ddd, DD.MM.YYYY HH:mm:ss;dddd, DD.MM.YYYY;dddd, DD.MM.YYYY HH:mm;dddd, DD.MM.YYYY HH:mm:ss;hh:mm a;hh:mm:ss a;YYYY-MM-DD;YYYY-MM-DD hh:mm a;YYYY-MM-DD hh:mm:ss a;ddd, YYYY-MM-DD;ddd, YYYY-MM-DD hh:mm a;ddd, YYYY-MM-DD hh:mm:ss a;dddd, YYYY-MM-DD;dddd, YYYY-MM-DD hh:mm a;dddd, YYYY-MM-DD hh:mm:ss a;P/Period;Pms/Period in milliseconds;Ps/Period in seconds;Pm/Period in minutes", default: "x"},
				timeDisplayFormat: {name: "Display-Format of TIME (how it should be displayed, see readme)", type: "combobox", selectOptions: "~/Use custom datapoint settings;HH:mm;HH:mm:ss;DD.MM.YYYY;DD.MM.YYYY HH:mm;DD.MM.YYYY HH:mm:ss;ddd, DD.MM.YYYY;ddd, DD.MM.YYYY HH:mm;ddd, DD.MM.YYYY HH:mm:ss;dddd, DD.MM.YYYY;dddd, DD.MM.YYYY HH:mm;dddd, DD.MM.YYYY HH:mm:ss;hh:mm a;hh:mm:ss a;YYYY-MM-DD;YYYY-MM-DD hh:mm a;YYYY-MM-DD hh:mm:ss a;ddd, YYYY-MM-DD;ddd, YYYY-MM-DD hh:mm a;ddd, YYYY-MM-DD hh:mm:ss a;dddd, YYYY-MM-DD;dddd, YYYY-MM-DD hh:mm a;dddd, YYYY-MM-DD hh:mm:ss a;D [Day(s)], H:m:s/D [Day(s)], H:m:s (for Periods);D [Day(s)], HH:mm:ss/D [Day(s)], HH:mm:ss (for Periods)", default: "dddd, DD.MM.YYYY HH:mm:ss"},
				timeDisplayDontShowDistance: {name: "Show Distance", type: "select", selectOptions: "/Use custom datapoint settings;false/Show Distance;true/Don't Show Distance", default: ""},
				dateAndTimeTileActiveConditions: {name: "Tile is active when all selected items are true", type: "multipleSelect", selectOptions: "activeIfStateActive/If STATE is active;activeIfTimeNotZero/If TIME is not zero;activeIfTimeInFuture/If TIME is in future;activeIfTimeInPast/If TIME is in past", default: "activeIfStateActive,activeIfTimeInFuture"},
				dateAndTimeTileActiveWhenRinging: {name: "Tile is always active when RINGING is active", type: "checkbox", default: "true"},
				dateAndTimeShowInState: {name: "Show in state", type: "multipleSelect", selectOptions: "showStateIfInactive/Show STATE if inactive;showStateIfActive/Show STATE if active;showSubjectIfActive/Show SUBJECT if active;showSubjectIfInactive/Show SUBJECT if inactive;showTimeIfInactiveAndInPast/Show TIME if inactive and in past;showTimeIfInactiveAndInFuture/Show TIME if inactive and in future;showTimeIfActiveAndInPast/Show TIME if active and in past;showTimeIfActiveAndInFuture/Show TIME if active and in future;showTimeDistanceIfInactiveAndInPast/Show distance to TIME if inactive and in past;showTimeDistanceIfInactiveAndInFuture/Show distance to TIME if inactive and in future;showTimeDistanceIfActiveAndInPast/Show distance to TIME if active and in past;showTimeDistanceIfActiveAndInFuture/Show distance to TIME if active and in future", default: "showStateIfInactive,showSubjectIfActive,showTimeDistanceIfActiveAndInFuture"}
			}}
		}
	},
	"iQontrolValue": {
		name: "Value",
		states: ["STATE", "LEVEL", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/value_on.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["value_on", "info_circle_on", "info_square_on", "info_bubble_on"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["value_off", "info_circle_off", "info_square_off", "info_bubble_off"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
				clickOnTileAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
			}},
			SECTION_DEVICESPECIFIC: {options: {
				showStateAndLevelSeparatelyInTile: {name: "Show STATE and LEVEL separately in tile", type: "select", selectOptions: "/No;devidedByComma/Yes, devided by comma;devidedByComma preceedCaptions/Yes, devided by comma, preceed captions;devidedBySemicolon/Yes, devided by semicolon;devidedBySemicolon preceedCaptions/Yes, devided by semicolon, preceed captions;devidedByHyphen/Yes, devided by hyphen;devidedByHyphen preceedCaptions/Yes, devided by hyphen, preceed captions", default: "false"}
			}}
		}
	},
	"iQontrolProgram": {
		name: "Program",
		states: ["STATE", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/play_on.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["play_on"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["play"], default: ""}
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: {options: {
				showState: {name: "Show State", type: "checkbox", default: "false"},
				closeDialogAfterExecution: {name: "Close dialog after execution", type: "checkbox", default: "false"}
			}}
		}
	},
	"iQontrolScene": {
		name: "Scene",
		states: ["STATE", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/play.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["play"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["play"], default: ""}
			}},
			SECTION_TIMESTAMP: {name: "Timestamp", type: "section", options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete",
				addTimestampToState: {selectOptions: "/Nothing;T/Timestamp only;TA/Timestamp only (if active);TE/Timestamp + Elapsed;TEA/Timestamp + Elapsed (if active);TE./Timestamp + Elapsed (since);TE.A/Timestamp + Elapsed (since, if active);Te/Timestamp + Elapsed (short);TeA/Timestamp + Elapsed (short, if active);E/Elapsed only;EA/Elapsed only (if active);E./Elapsed only (since);E.A/Elapsed only (since, if active);e/Elapsed only (short);eA/Elapsed only (short, if active)"}
			}},
			SECTION_DEVICESPECIFIC: {options: {
				alwaysSendTrue: {name: "Always send 'true' (do not toggle)", type: "checkbox", default: "false"},
				closeDialogAfterExecution: {name: "Close dialog after execution", type: "checkbox", default: "false"}
			}}
		}
	},
	"iQontrolMedia": {
		name: "Media-Player / Remote Control",
		states: ["STATE", "COVER_URL", "ARTIST", "ALBUM", "TRACK_NUMBER", "TITLE", "EPISODE", "SEASON", "PREV", "REWIND", "PLAY", "PAUSE", "STOP", "FORWARD", "NEXT", "SHUFFLE", "REPEAT", "MUTE", "DURATION", "ELAPSED", "VOLUME", "SOURCE", "PLAYLIST", "PLAY_EVERYWHERE", "EJECT", "POWER_SWITCH", "REMOTE_NUMBER", "REMOTE_VOLUME_UP", "REMOTE_VOLUME_DOWN", "REMOTE_CH_UP", "REMOTE_CH_DOWN", "REMOTE_PAD_DIRECTION", "REMOTE_PAD_BACK", "REMOTE_PAD_HOME", "REMOTE_PAD_MENU", "REMOTE_COLOR", "REMOTE_CHANNELS", "REMOTE_ADDITIONAL_BUTTONS", "REMOTE_HIDE_REMOTE", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/media_on.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["media_on"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["media_off"], default: ""}
			}},
			SECTION_DEVICESPECIFIC_PLAYPAUSE: {name: "Play/Pause", type: "section", options: {
				statePlayValue: {name: "Value of STATE for 'play'", type: "text", default: "play"},
				statePauseValue: {name: "Value of STATE for 'pause'", type: "text", default: "pause"},
				stateStopValue: {name: "Value of STATE for 'stop'", type: "text", default: "stop"},
				useStateValuesForPlayPauseStop: {name: "Send these values (instead of true) when clicking on PLAY, PAUSE and STOP", type: "checkbox", default: "false"},
				hidePlayOverlay: {name: "Hide play icon", type: "checkbox", default: "false"},
				hidePauseAndStopOverlay: {name: "Hide pause and stop icon", type: "checkbox", default: "false"},
				durationIsMilliseconds: {name: "DURATION and ELAPSED are values in milliseconds", type: "checkbox", default: "false"},
				elapsedIsPercentage: {name: "ELAPSED is a value in percentage", type: "checkbox", default: "false"}
			}},
			SECTION_DEVICESPECIFIC_REPEAT: {name: "Repeat", type: "section", options: {
				repeatOffValue: {name: "Value of REPEAT for 'off'", type: "text", default: "false"},
				repeatAllValue: {name: "Value of REPEAT for 'repeat all'", type: "text", default: "true"},
				repeatOneValue: {name: "Value of REPEAT for 'repeat one'", type: "text", default: "2"}
			}},
			SECTION_DEVICESPECIFIC_REMOTE: {name: "Remote", type: "section", options: {
				remoteKeepSectionsOpen: {name: "Keep sections open", type: "checkbox", default: "false"},
				remoteSectionsStartOpened: {name: "Start with these sections initially opened", type: "multipleSelect", selectOptions: "REMOTE_PAD/Pad;REMOTE_CONTROL/Volume and Channel Control;REMOTE_ADDITIONAL_BUTTONS/Additional Buttons;REMOTE_CHANNELS/Channels;REMOTE_NUMBERS/Numbers;REMOTE_COLORS/Colors", default: ""},
				remoteShowDirectionsInsidePad: {name: "Show Vol and Ch +/- inside Pad", type: "checkbox", default: "false"},
				remoteChannelsCaption: {name: "Caption for section 'Channels'", type: "text", default: ""},
				remoteAdditionalButtonsCaption: {name: "Caption for section 'Additional Buttons'", type: "text", default: ""}
			}},
			SECTION_TIMESTAMP: {name: "Timestamp", type: "section", options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete",
				addTimestampToState: {selectOptions: "/Nothing;T/Timestamp only;TA/Timestamp only (if active);TE/Timestamp + Elapsed;TEA/Timestamp + Elapsed (if active);TE./Timestamp + Elapsed (since);TE.A/Timestamp + Elapsed (since, if active);Te/Timestamp + Elapsed (short);TeA/Timestamp + Elapsed (short, if active);E/Elapsed only;EA/Elapsed only (if active);E./Elapsed only (since);E.A/Elapsed only (since, if active);e/Elapsed only (short);eA/Elapsed only (short, if active)"}
			}},
			SECTION_DEVICESPECIFIC: {options: {
				coverImageReloadDelay: {name: "Delay reload of cover-image [ms]", type: "number", min: "0", max: "5000", default: ""},
				coverImageNoReloadOnTitleChange: {name: "No forced reload of cover-image on change of TITLE", type: "checkbox", default: "false"},
				togglePowerSwitch: {name: "Toggle POWER_SWITCH instead of STATE (for example when clicking on icon)", type: "checkbox", default: "false"}
			}}
		}
	},
	"iQontrolPopup": {
		name: "Popup",
		states: ["STATE", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/popup.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["popup", "link_square_internal", "camera_on", "camera_ptz_on"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["popup", "link_square_internal", "camera_on", "camera_ptz_on"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
				clickOnTileAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: "delete"
		}
	},
	"iQontrolExternalLink":	{
		name: "External Link",
		states: ["STATE", "URL", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/link.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["link", "link_square_external"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["link", "link_square_external"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {default: "openURLExternal"},
				clickOnTileAction: {default: "openURLExternal"},
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: "delete"
		}
	},
	"iQontrolWidget": {
		name: "Widget",
		states: ["STATE", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/widget_on.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["blank", "widget_on"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["blank", "widget_off"], default: ""}
			}},
			SECTION_TILE: {options: {
				noZoomOnHover: {default: "true"},
				hideDeviceName: {default: "true"}
			}},
			SECTION_TILE_INACTIVE: {options: {
				sizeInactive: {selectOptions: " /Normal (1x1);narrowIfInactive shortIfInactive/Just Icon (0.5x0.5);narrowIfInactive/Narrow (0.5x1);narrowIfInactive highIfInactive/Narrow High (0.5x2);narrowIfInactive xhighIfInactive/Narrow Extra High(0.5x3);shortIfInactive/Short (1x0.5);shortIfInactive wideIfInactive/Short Wide (2x0.5);shortIfInactive xwideIfInactive/Short Extra Wide (3x0.5);wideIfInactive/Wide (2x1);xwideIfInactive/Extra Wide (3x1);highIfInactive/High (1x2);xhighIfInactive/Extra High (1x3);wideIfInactive highIfInactive/Big (2x2);xwideIfInactive highIfInactive/Big Wide (3x2);wideIfInactive xhighIfInactive/Big High (2x3);xwideIfInactive xhighIfInactive/Extra Big (3x3);fullWidthIfInactive aspect-1-1IfInactive/Full Width, 1:1;fullWidthIfInactive aspect-4-3IfInactive/Full Width, 4:3;fullWidthIfInactive aspect-3-2IfInactive/Full Width, 3:2;fullWidthIfInactive aspect-16-9IfInactive/Full Width, 16:9;fullWidthIfInactive aspect-21-9IfInactive/Full Width, 21:9;fullWidthIfInactive aspect-1-1-limitedIfInactive/Full Width, 1:1 (limited to screen height);fullWidthIfInactive aspect-4-3-limitedIfInactive/Full Width, 4:3 (limited to screen height);fullWidthIfInactive aspect-3-2-limitedIfInactive/Full Width, 3:2 (limited to screen height);fullWidthIfInactive aspect-16-9-limitedIfInactive/Full Width, 16:9 (limited to screen height);fullWidthIfInactive aspect-21-9-limitedIfInactive/Full Width, 21:9 (limited to screen height);fullWidthIfInactive fullHeightIfInactive/Full Screen", default: "xwideIfInactive highIfInactive"},
				noOverlayInactive: {default: "true"},
				hideStateIfInactive: {default: "true"}
			}},
			SECTION_TILE_ACTIVE: {options: {
				sizeActive: {selectOptions: " /Normal (1x1);narrowIfActive shortIfActive/Just Icon (0.5x0.5);narrowIfActive/Narrow (0.5x1);narrowIfActive highIfActive/Narrow High (0.5x2);narrowIfActive xhighIfActive/Narrow Extra High(0.5x3);shortIfActive/Short (1x0.5);shortIfActive wideIfActive/Short Wide (2x0.5);shortIfActive xwideIfActive/Short Extra Wide (3x0.5);wideIfActive/Wide (2x1);xwideIfActive/Extra Wide (3x1);highIfActive/High (1x2);xhighIfActive/Extra High (1x3);wideIfActive highIfActive/Big (2x2);xwideIfActive highIfActive/Big Wide (3x2);wideIfActive xhighIfActive/Big High (2x3);xwideIfActive xhighIfActive/Extra Big (3x3);fullWidthIfActive aspect-1-1IfActive/Full Width, 1:1;fullWidthIfActive aspect-4-3IfActive/Full Width, 4:3;fullWidthIfActive aspect-3-2IfActive/Full Width, 3:2;fullWidthIfActive aspect-16-9IfActive/Full Width, 16:9;fullWidthIfActive aspect-21-9IfActive/Full Width, 21:9;fullWidthIfActive aspect-1-1-limitedIfActive/Full Width, 1:1 (limited to screen height);fullWidthIfActive aspect-4-3-limitedIfActive/Full Width, 4:3 (limited to screen height);fullWidthIfActive aspect-3-2-limitedIfActive/Full Width, 3:2 (limited to screen height);fullWidthIfActive aspect-16-9-limitedIfActive/Full Width, 16:9 (limited to screen height);fullWidthIfActive aspect-21-9-limitedIfActive/Full Width, 21:9 (limited to screen height);fullWidthIfActive fullHeightIfActive/Full Screen", default: "fullWidthIfActive fullHeightIfActive"},
				noOverlayActive: {default: "true"}
			}},
			SECTION_TILE_ENLARGED: {options: {
				sizeEnlarged: {selectOptions: " /Normal (1x1);narrowIfEnlarged shortIfEnlarged/Just Icon (0.5x0.5);narrowIfEnlarged/Narrow (0.5x1);narrowIfEnlarged highIfEnlarged/Narrow High (0.5x2);narrowIfEnlarged xhighIfEnlarged/Narrow Extra High(0.5x3);shortIfEnlarged/Short (1x0.5);shortIfEnlarged wideIfEnlarged/Short Wide (2x0.5);shortIfEnlarged xwideIfEnlarged/Short Extra Wide (3x0.5);wideIfEnlarged/Wide (2x1);xwideIfEnlarged/Extra Wide (3x1);highIfEnlarged/High (1x2);xhighIfEnlarged/Extra High (1x3);wideIfEnlarged highIfEnlarged/Big (2x2);xwideIfEnlarged highIfEnlarged/Big Wide (3x2);wideIfEnlarged xhighIfEnlarged/Big High (2x3);xwideIfEnlarged xhighIfEnlarged/Extra Big (3x3);fullWidthIfEnlarged aspect-1-1IfEnlarged/Full Width, 1:1;fullWidthIfEnlarged aspect-4-3IfEnlarged/Full Width, 4:3;fullWidthIfEnlarged aspect-3-2IfEnlarged/Full Width, 3:2;fullWidthIfEnlarged aspect-16-9IfEnlarged/Full Width, 16:9;fullWidthIfEnlarged aspect-21-9IfEnlarged/Full Width, 21:9;fullWidthIfEnlarged aspect-1-1-limitedIfEnlarged/Full Width, 1:1 (limited to screen height);fullWidthIfEnlarged aspect-4-3-limitedIfEnlarged/Full Width, 4:3 (limited to screen height);fullWidthIfEnlarged aspect-3-2-limitedIfEnlarged/Full Width, 3:2 (limited to screen height);fullWidthIfEnlarged aspect-16-9-limitedIfEnlarged/Full Width, 16:9 (limited to screen height);fullWidthIfEnlarged aspect-21-9-limitedIfEnlarged/Full Width, 21:9 (limited to screen height);fullWidthIfEnlarged fullHeightIfEnlarged/Full Screen", default: "fullWidthIfEnlarged fullHeightIfEnlarged"},
				tileEnlargeShowButtonInactive: {default: "true"},
				tileEnlargeShowButtonActive: {default: "true"},
				tileEnlargeShowInPressureMenuInactive: {default: "true"},
				tileEnlargeShowInPressureMenuActive: {default: "true"}
			}},
			SECTION_TIMESTAMP: {name: "Timestamp", type: "section", options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete",
				addTimestampToState: {default: "N"}
			}},
			SECTION_DEVICESPECIFIC: {options: {
				noVirtualState: {name: "Do not use a virtual datapoint for STATE (hide switch, if STATE is empty)", type: "checkbox", default: "false"}
			}}
		}
	},
	"iQontrolInfoText": {
		name: "Info-Text",
		states: ["STATE", "INFO_A", "INFO_B", "BATTERY", "UNREACH", "ERROR", "BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "ENLARGE_TILE", "BADGE", "BADGE_COLOR", "OVERLAY_INACTIVE_COLOR", "OVERLAY_ACTIVE_COLOR", "GLOW_INACTIVE_COLOR", "GLOW_ACTIVE_COLOR", "GLOW_HIDE", "URL", "HTML", "ADDITIONAL_CONTROLS", "ADDITIONAL_INFO"],
		icon: "/images/icons/info_bubble_off.png",
		deviceSpecificOptions: {
			SECTION_ICONS: {options: {
				icon_on: {name: "Icon on", type: "icon", typicalIconEquivalents: ["info_bubble_off", "info_circle_off", "info_square_off", "value_off", "info_bubble_on", "info_circle_off", "info_square_on", "value_on"], default: ""},
				icon_off: {name: "Icon off", type: "icon", typicalIconEquivalents: ["info_bubble_off", "info_circle_off", "info_square_off", "value_off", "info_bubble_on", "info_circle_off", "info_square_on", "value_on"], default: ""}
			}},
			SECTION_TILE: {options: {
				clickOnIconAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "false"},
				clickOnTileAction: {selectOptions: "openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "false"},
				noZoomOnHover: {default: "true"},
				hideDeviceName: {default: "true"}
			}},
			SECTION_TILE_INACTIVE: {options: {
				sizeInactive: {selectOptions: "/Normal (1x1);narrowIfInactive shortIfInactive/Just Icon (0.5x0.5);narrowIfInactive/Narrow (0.5x1);narrowIfInactive highIfInactive/Narrow High (0.5x2);narrowIfInactive xhighIfInactive/Narrow Extra High(0.5x3);shortIfInactive/Short (1x0.5);shortIfInactive wideIfInactive/Short Wide (2x0.5);shortIfInactive xwideIfInactive/Short Extra Wide (3x0.5);wideIfInactive/Wide (2x1);xwideIfInactive/Extra Wide (3x1);highIfInactive/High (1x2);xhighIfInactive/Extra High (1x3);wideIfInactive highIfInactive/Big (2x2);xwideIfInactive highIfInactive/Big Wide (3x2);wideIfInactive xhighIfInactive/Big High (2x3);xwideIfInactive xhighIfInactive/Extra Big (3x3);fullWidthIfInactive aspect-1-1IfInactive/Full Width, 1:1;fullWidthIfInactive aspect-4-3IfInactive/Full Width, 4:3;fullWidthIfInactive aspect-3-2IfInactive/Full Width, 3:2;fullWidthIfInactive aspect-16-9IfInactive/Full Width, 16:9;fullWidthIfInactive aspect-21-9IfInactive/Full Width, 21:9;fullWidthIfInactive aspect-1-1-limitedIfInactive/Full Width, 1:1 (limited to screen height);fullWidthIfInactive aspect-4-3-limitedIfInactive/Full Width, 4:3 (limited to screen height);fullWidthIfInactive aspect-3-2-limitedIfInactive/Full Width, 3:2 (limited to screen height);fullWidthIfInactive aspect-16-9-limitedIfInactive/Full Width, 16:9 (limited to screen height);fullWidthIfInactive aspect-21-9-limitedIfInactive/Full Width, 21:9 (limited to screen height);fullWidthIfInactive fullHeightIfInactive/Full Screen;fullWidthIfInactive shortIfInactive/Full Width, Short", default: "fullWidthIfInactive shortIfInactive"},
				stateHeightAdaptsContentInactive: {default: "true"},
				stateFillsDeviceInactive: {default: "true"},
				stateBigFontInactive: {default: "true"},
				transparentIfInactive: {default: "true"},
				noOverlayInactive: {default: "true"},
				hideBackgroundURLInactive: {default: "true"},
				hideDeviceNameIfInactive: {default: "true"},
				hideInfoAIfInactive: {default: "true"},
				hideInfoBIfInactive: {default: "true"},
				hideStateIfInactive: {default: "true"},
				hideDeviceIfInactive: {default: "true"}
			}},
			SECTION_TILE_ACTIVE: {options: {
				sizeActive: {selectOptions: "/Normal (1x1);narrowIfActive shortIfActive/Just Icon (0.5x0.5);narrowIfActive/Narrow (0.5x1);narrowIfActive highIfActive/Narrow High (0.5x2);narrowIfActive xhighIfActive/Narrow Extra High(0.5x3);shortIfActive/Short (1x0.5);shortIfActive wideIfActive/Short Wide (2x0.5);shortIfActive xwideIfActive/Short Extra Wide (3x0.5);wideIfActive/Wide (2x1);xwideIfActive/Extra Wide (3x1);highIfActive/High (1x2);xhighIfActive/Extra High (1x3);wideIfActive highIfActive/Big (2x2);xwideIfActive highIfActive/Big Wide (3x2);wideIfActive xhighIfActive/Big High (2x3);xwideIfActive xhighIfActive/Extra Big (3x3);fullWidthIfActive aspect-1-1IfActive/Full Width, 1:1;fullWidthIfActive aspect-4-3IfActive/Full Width, 4:3;fullWidthIfActive aspect-3-2IfActive/Full Width, 3:2;fullWidthIfActive aspect-16-9IfActive/Full Width, 16:9;fullWidthIfActive aspect-21-9IfActive/Full Width, 21:9;fullWidthIfActive aspect-1-1-limitedIfActive/Full Width, 1:1 (limited to screen height);fullWidthIfActive aspect-4-3-limitedIfActive/Full Width, 4:3 (limited to screen height);fullWidthIfActive aspect-3-2-limitedIfActive/Full Width, 3:2 (limited to screen height);fullWidthIfActive aspect-16-9-limitedIfActive/Full Width, 16:9 (limited to screen height);fullWidthIfActive aspect-21-9-limitedIfActive/Full Width, 21:9 (limited to screen height);fullWidthIfActive fullHeightIfActive/Full Screen;fullWidthIfActive shortIfActive/Full Width, Short", default: "fullWidthIfActive shortIfActive"},
				stateHeightAdaptsContentActive: {default: "true"},
				stateFillsDeviceActive: {default: "true"},
				stateBigFontActive: {default: "true"},
				transparentIfActive: {default: "true"},
				noOverlayActive: {default: "true"},
				hideBackgroundURLActive: {default: "true"},
				hideDeviceNameIfActive: {default: "true"},
				hideInfoAIfActive: {default: "true"},
				hideInfoBIfActive: {default: "true"}
			}},
			SECTION_TILE_ENLARGED: {options: {
				stateHeightAdaptsContentEnlarged: {default: "true"},
				stateFillsDeviceEnlarged: {default: "true"},
				stateBigFontEnlarged: {default: "true"},
				hideDeviceNameIfEnlarged: {default: "true"}
			}},
			SECTION_TIMESTAMP: {options: {
				levelCaption: "delete",
				levelFavorites: "delete",
				levelFavoritesHideSlider: "delete"
			}},
			SECTION_DEVICESPECIFIC: "delete"
		}
	}
};

var iQontrolRolesStandardOptions = {
	SECTION_ICONS: {name: "Icons", type: "section"},
	SECTION_GENERAL: { name: "General", type: "section", options: {
		readonly: {name: "Readonly", type: "checkbox", default: "false"},
		renderLinkedViewInParentInstance: {name: "Open linked view in parent instance, if this view is used as a BACKGROUND_VIEW", type: "checkbox", default: "false"},
		renderLinkedViewInParentInstanceClosesPanel: {name: "After opening linked view in parent instance, close panel (if it is dismissible)", type: "checkbox", default: "false"}
	}},
	SECTION_TILE: {name: "Tile-Behaviour (general)", type: "section", options: {
		clickOnIconAction: {name: "Click on Icon Action", type: "select", selectOptions: "toggle/Toggle;openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "toggle"},
		clickOnTileAction: {name: "Click on Tile Action", type: "select", selectOptions: "toggle/Toggle;openDialog/Open Dialog;enlarge/Enlarge Tile;openLinkToOtherView/Open Link to other View;openURLExternal/Open URL as External Link;false/Do nothing", default: "openDialog"},
		noZoomOnHover: {name: "Disable zoom-effect on hover", type: "checkbox", default: "false"},
		iconNoZoomOnHover: {name: "Disable zoom-effect on hover for icon", type: "checkbox", default: "false"},
		hideDeviceName: {name: "Hide device name", type: "checkbox", default: "false"}
	}},
	SECTION_TILE_ACTIVE_CONDITION: {name: "Conditions for an Active Tile", type: "section", options: {
		tileActiveStateId: {name: "State ID (empty = STATE/LEVEL will be used)", type: "datapoint", default: ""},
		tileActiveCondition: {name: "Condition", type: "select", selectOptions: "/Standard;at/always active;af/always inactive;eqt/is true;eqf/is false;eq/is;ne/is not;gt/is greater than;ge/is greater or equal;lt/is lower than;le/is lower or equal", default: ""},
		tileActiveConditionValue: {name: "Condition value", type: "text", default: ""}
	}},
	SECTION_TILE_INACTIVE: {name: "Tile-Behaviour if device is inactive", type: "section", options: {
		sizeInactive: {name: "Size of tile, if device is inactive", type: "select", selectOptions: "/Normal (1x1);narrowIfInactive shortIfInactive/Just Icon (0.5x0.5);narrowIfInactive/Narrow (0.5x1);narrowIfInactive highIfInactive/Narrow High (0.5x2);narrowIfInactive xhighIfInactive/Narrow Extra High(0.5x3);shortIfInactive/Short (1x0.5);shortIfInactive wideIfInactive/Short Wide (2x0.5);shortIfInactive xwideIfInactive/Short Extra Wide (3x0.5);wideIfInactive/Wide (2x1);xwideIfInactive/Extra Wide (3x1);highIfInactive/High (1x2);xhighIfInactive/Extra High (1x3);wideIfInactive highIfInactive/Big (2x2);xwideIfInactive highIfInactive/Big Wide (3x2);wideIfInactive xhighIfInactive/Big High (2x3);xwideIfInactive xhighIfInactive/Extra Big (3x3);fullWidthIfInactive aspect-1-1IfInactive/Full Width, 1:1;fullWidthIfInactive aspect-4-3IfInactive/Full Width, 4:3;fullWidthIfInactive aspect-3-2IfInactive/Full Width, 3:2;fullWidthIfInactive aspect-16-9IfInactive/Full Width, 16:9;fullWidthIfInactive aspect-21-9IfInactive/Full Width, 21:9;fullWidthIfInactive aspect-1-1-limitedIfInactive/Full Width, 1:1 (limited to screen height);fullWidthIfInactive aspect-4-3-limitedIfInactive/Full Width, 4:3 (limited to screen height);fullWidthIfInactive aspect-3-2-limitedIfInactive/Full Width, 3:2 (limited to screen height);fullWidthIfInactive aspect-16-9-limitedIfInactive/Full Width, 16:9 (limited to screen height);fullWidthIfInactive aspect-21-9-limitedIfInactive/Full Width, 21:9 (limited to screen height);fullWidthIfInactive fullHeightIfInactive/Full Screen", default: ""},
		stateHeightAdaptsContentInactive: {name: "Adapt height of STATE to its content (this overwrites the tile size, if needed), if the device is inactive", type: "checkbox", default: "false"},
		stateFillsDeviceInactive: {name: "Size of STATE fills the complete device (this may interfere with other content), if the device is inactive", type: "checkbox", default: "false"},
		stateBigFontInactive: {name: "Use big font for STATE, if the device is inactive", type: "checkbox", default: "false"},
		bigIconInactive: {name: "Show big icon, if device is inactive", type: "checkbox", default: "false"},
		iconNoPointerEventsInactive: {name: "Ignore mouse events for the icon, if device is inactive", type: "checkbox", default: "false"},
		transparentIfInactive: {name: "Make background transparent, if device is inactive", type: "checkbox", default: "false"},
		noOverlayInactive: {name: "Remove overlay of tile, if device is inactive", type: "checkbox", default: "false"},
		hideBackgroundURLInactive: {name: "Hide background from BACKGROUND_VIEW/URL/HTML, if device is inactive", type: "checkbox", default: "false"},
		hideDeviceNameIfInactive: {name: "Hide device name, if the device is inactive", type: "checkbox", default: "false"},
		hideStateIfInactive: {name: "Hide state, if the device is inactive", type: "checkbox", default: "false"},
		hideIndicatorIfInactive: {name: "Hide Indicator Icons (ERROR, UNREACH, BATTERY), if the device is inactive", type: "checkbox", default: "false"},
		hideInfoAIfInactive: {name: "Hide INFO_A, if the device is inactive", type: "checkbox", default: "false"},
		hideInfoBIfInactive: {name: "Hide INFO_B, if the device is inactive", type: "checkbox", default: "false"},
		hideDeviceIfInactive: {name: "Hide device, if it is inactive", type: "checkbox", default: "false"}
	}},
	SECTION_TILE_ACTIVE: {name: "Tile-Behaviour if device is active", type: "section", options: {
		sizeActive: {name: "Size of tile, if device is active", type: "select", selectOptions: "/Normal (1x1);narrowIfActive shortIfActive/Just Icon (0.5x0.5);narrowIfActive/Narrow (0.5x1);narrowIfActive highIfActive/Narrow High (0.5x2);narrowIfActive xhighIfActive/Narrow Extra High(0.5x3);shortIfActive/Short (1x0.5);shortIfActive wideIfActive/Short Wide (2x0.5);shortIfActive xwideIfActive/Short Extra Wide (3x0.5);wideIfActive/Wide (2x1);xwideIfActive/Extra Wide (3x1);highIfActive/High (1x2);xhighIfActive/Extra High (1x3);wideIfActive highIfActive/Big (2x2);xwideIfActive highIfActive/Big Wide (3x2);wideIfActive xhighIfActive/Big High (2x3);xwideIfActive xhighIfActive/Extra Big (3x3);fullWidthIfActive aspect-1-1IfActive/Full Width, 1:1;fullWidthIfActive aspect-4-3IfActive/Full Width, 4:3;fullWidthIfActive aspect-3-2IfActive/Full Width, 3:2;fullWidthIfActive aspect-16-9IfActive/Full Width, 16:9;fullWidthIfActive aspect-21-9IfActive/Full Width, 21:9;fullWidthIfActive aspect-1-1-limitedIfActive/Full Width, 1:1 (limited to screen height);fullWidthIfActive aspect-4-3-limitedIfActive/Full Width, 4:3 (limited to screen height);fullWidthIfActive aspect-3-2-limitedIfActive/Full Width, 3:2 (limited to screen height);fullWidthIfActive aspect-16-9-limitedIfActive/Full Width, 16:9 (limited to screen height);fullWidthIfActive aspect-21-9-limitedIfActive/Full Width, 21:9 (limited to screen height);fullWidthIfActive fullHeightIfActive/Full Screen", default: ""},
		stateHeightAdaptsContentActive: {name: "Adapt height of STATE to its content (this overwrites the tile size, if needed), if the device is active", type: "checkbox", default: "false"},
		stateFillsDeviceActive: {name: "Size of STATE fills the complete device (this may interfere with other content), if the device is active", type: "checkbox", default: "false"},
		stateBigFontActive: {name: "Use big font for STATE, if the device is active", type: "checkbox", default: "false"},
		bigIconActive: {name: "Show big icon, if device is active", type: "checkbox", default: "false"},
		iconNoPointerEventsActive: {name: "Ignore mouse events for the icon, if device is active", type: "checkbox", default: "false"},
		transparentIfActive: {name: "Make background transparent, if device is active", type: "checkbox", default: "false"},
		noOverlayActive: {name: "Remove overlay of tile, if device is active", type: "checkbox", default: "false"},
		hideBackgroundURLActive: {name: "Hide background from BACKGROUND_VIEW/URL/HTML, if device is active", type: "checkbox", default: "false"},
		hideDeviceNameIfActive: {name: "Hide device name, if the device is active", type: "checkbox", default: "false"},
		hideStateIfActive: {name: "Hide state, if the device is active", type: "checkbox", default: "false"},
		hideIndicatorIfActive: {name: "Hide Indicator Icons (ERROR, UNREACH, BATTERY), if the device is active", type: "checkbox", default: "false"},
		hideInfoAIfActive: {name: "Hide INFO_A, if the device is active", type: "checkbox", default: "false"},
		hideInfoBIfActive: {name: "Hide INFO_B, if the device is active", type: "checkbox", default: "false"},
		hideDeviceIfActive: {name: "Hide device, if it is active", type: "checkbox", default: "false"}
	}},
	SECTION_TILE_ENLARGED: {name: "Tile-Behaviour if device is enlarged", type: "section", options: {
		sizeEnlarged: {name: "Size of tile, if device is enlarged", type: "select", selectOptions: "/Normal (1x1);narrowIfEnlarged shortIfEnlarged/Just Icon (0.5x0.5);narrowIfEnlarged/Narrow (0.5x1);narrowIfEnlarged highIfEnlarged/Narrow High (0.5x2);narrowIfEnlarged xhighIfEnlarged/Narrow Extra High(0.5x3);shortIfEnlarged/Short (1x0.5);shortIfEnlarged wideIfEnlarged/Short Wide (2x0.5);shortIfEnlarged xwideIfEnlarged/Short Extra Wide (3x0.5);wideIfEnlarged/Wide (2x1);xwideIfEnlarged/Extra Wide (3x1);highIfEnlarged/High (1x2);xhighIfEnlarged/Extra High (1x3);wideIfEnlarged highIfEnlarged/Big (2x2);xwideIfEnlarged highIfEnlarged/Big Wide (3x2);wideIfEnlarged xhighIfEnlarged/Big High (2x3);xwideIfEnlarged xhighIfEnlarged/Extra Big (3x3);fullWidthIfEnlarged aspect-1-1IfEnlarged/Full Width, 1:1;fullWidthIfEnlarged aspect-4-3IfEnlarged/Full Width, 4:3;fullWidthIfEnlarged aspect-3-2IfEnlarged/Full Width, 3:2;fullWidthIfEnlarged aspect-16-9IfEnlarged/Full Width, 16:9;fullWidthIfEnlarged aspect-21-9IfEnlarged/Full Width, 21:9;fullWidthIfEnlarged aspect-1-1-limitedIfEnlarged/Full Width, 1:1 (limited to screen height);fullWidthIfEnlarged aspect-4-3-limitedIfEnlarged/Full Width, 4:3 (limited to screen height);fullWidthIfEnlarged aspect-3-2-limitedIfEnlarged/Full Width, 3:2 (limited to screen height);fullWidthIfEnlarged aspect-16-9-limitedIfEnlarged/Full Width, 16:9 (limited to screen height);fullWidthIfEnlarged aspect-21-9-limitedIfEnlarged/Full Width, 21:9 (limited to screen height);fullWidthIfEnlarged fullHeightIfEnlarged/Full Screen", default: "fullWidthIfEnlarged fullHeightIfEnlarged"},
		stateHeightAdaptsContentEnlarged: {name: "Adapt height of STATE to its content (this overwrites the tile size, if needed), if the device is enlarged", type: "checkbox", default: "false"},
		stateFillsDeviceEnlarged: {name: "Size of STATE fills the complete device (this may interfere with other content), if the device is enlarged", type: "checkbox", default: "false"},
		stateBigFontEnlarged: {name: "Use big font for STATE, if the device is enlarged", type: "checkbox", default: "false"},
		bigIconEnlarged: {name: "Show big icon, if device is enlarged", type: "checkbox", default: "true"},
		iconNoPointerEventsEnlarged: {name: "Ignore mouse events for the icon, if device is enlarged", type: "checkbox", default: "false"},
		transparentIfEnlarged: {name: "Make background transparent, if device is enlarged", type: "checkbox", default: "false"},
		noOverlayEnlarged: {name: "Remove overlay of tile, if device is enlarged", type: "checkbox", default: "false"},
		tileEnlargeStartEnlarged: {name: "Tile is enlarged on start", type: "checkbox", default: "false"},
		tileEnlargeShowButtonInactive: {name: "Show Enlarge-Button, if device is inactive", type: "checkbox", default: "false"},
		tileEnlargeShowButtonActive: {name: "Show Enlarge-Button, if device is active", type: "checkbox", default: "false"},
		tileEnlargeShowInPressureMenuInactive: {name: "Show Enlarge in Menu, if device is inactive", type: "checkbox", default: "false"},
		tileEnlargeShowInPressureMenuActive: {name: "Show Enlarge in Menu, if device is active", type: "checkbox", default: "false"},
		visibilityBackgroundURLEnlarged: {name: "Visibility of background from BACKGROUND_VIEW/URL/HTML, if device is enlarged", type: "select", selectOptions: "/No change;visibleIfEnlarged/Visible;hideIfEnlarged/Invisible", default: ""},
		hideDeviceNameIfEnlarged: {name: "Hide device name, if the device is enlarged", type: "checkbox", default: "false"},
		hideStateIfEnlarged: {name: "Hide state, if the device is enlarged", type: "checkbox", default: "false"},
		hideIndicatorIfEnlarged: {name: "Hide Indicator Icons (ERROR, UNREACH, BATTERY), if the device is enlarged", type: "checkbox", default: "false"},
		hideInfoAIfEnlarged: {name: "Hide INFO_A, if the device is enlarged", type: "checkbox", default: "false"},
		hideInfoBIfEnlarged: {name: "Hide INFO_B, if the device is enlarged", type: "checkbox", default: "false"},
		hideIconEnlarged: {name: "Hide icon, if device is enlarged", type: "checkbox", default: "false"}
	}},
	SECTION_TIMESTAMP: {name: "STATE, LEVEL and Timestamp", type: "section", options: {
		stateCaption: {name: "Caption of STATE", type: "text", default: ""},
		levelCaption: {name: "Caption of LEVEL", type: "text", default: ""},
		levelFavorites: {name: "Favorite values for LEVEL (semicolon separated list of numbers)", type: "text", default: ""},
		levelFavoritesHideSlider: {name: "Hide slider for LEVEL, if Favorite values are set", type: "checkbox", default: "false"},
		addTimestampToState: {name: "Add timestamp to state", type: "select", selectOptions: "/State only;SA/State only (if active);ST/State + Timestamp;STA/State + Timestamp (if active);SE/State + Elapsed;SEA/State + Elapsed (if active);SE./State + Elapsed (since);SE.A/State + Elapsed (since, if active);Se/State + Elapsed (short);SeA/State + Elapsed (short, if active);STE/State + Timestamp + Elapsed;STEA/State + Timestamp + Elapsed (if active);STE./State + Timestamp + Elapsed (since);STE.A/State + Timestamp + Elapsed (since, if active);STe/State + Timestamp + Elapsed (short);STeA/State + Timestamp + Elapsed (short, if active);T/Timestamp only;TA/Timestamp only (if active);TE/Timestamp + Elapsed;TEA/Timestamp + Elapsed (if active);TE./Timestamp + Elapsed (since);TE.A/Timestamp + Elapsed (since, if active);Te/Timestamp + Elapsed (short);TeA/Timestamp + Elapsed (short, if active);E/Elapsed only;EA/Elapsed only (if active);E./Elapsed only (since);E.A/Elapsed only (since, if active);e/Elapsed only (short);eA/Elapsed only (short, if active);N/Nothing (Hide state)", default: ""},
		hideStateAndLevelInDialog: {name: "Hide STATE and LEVEL in dialog", type: "checkbox", default: "false"},
		showTimestamp: {name: "Show Timestamp in dialog", type: "select", selectOptions: "/Auto;yes/Yes;no/No;always/Always;never/Never", default: ""}
	}},
	SECTION_INFO_A_B: {name: "INFO_A/B", type: "section", options: {
		infoARoundDigits: {name: "Round INFO_A to this number of digits", type: "number", min: "0", max: "10", default: "1"},
		infoBRoundDigits: {name: "Round INFO_B to this number of digits", type: "number", min: "0", max: "10", default: "1"},
		infoAShowName: {name: "Show Name of INFO_A", type: "checkbox", default: "false"},
		infoBShowName: {name: "Show Name of INFO_B", type: "checkbox", default: "false"}
	}},
	SECTION_BATTERY: {name: "BATTERY Empty Icon", type: "section", options: {
		batteryIcon_on: {name: "BATTERY Icon", type: "icon", typicalIconEquivalents: ["BATTERY"], default: ""},
		batteryActiveCondition: {name: "Condition", type: "select", selectOptions: "/Standard;at/always active;af/always inactive;eqt/is true;eqf/is false;eq/is;ne/is not;gt/is greater than;ge/is greater or equal;lt/is lower than;le/is lower or equal", default: ""},
		batteryActiveConditionValue: {name: "Condition value", type: "text", default: ""}
	}},
	SECTION_UNREACH: {name: "UNREACH Icon", type: "section", options: {
		unreachIcon_on: {name: "UNREACH Icon", type: "icon", typicalIconEquivalents: ["UNREACH"], default: ""},
		invertUnreach: {name: "Invert UNREACH (use connected instead of unreach)", type: "checkbox", default: "false"},
		hideUnreachIfInactive: {name: "Hide (resp. ignore) UNREACH, if the device is inactive", type: "checkbox", default: "false"}
	}},
	SECTION_ERROR: {name: "ERROR Icon", type: "section", options: {
		errorIcon_on: {name: "ERROR Icon", type: "icon", typicalIconEquivalents: ["ERROR"], default: ""},
		invertError: {name: "Invert ERROR (use ok instead of error)", type: "checkbox", default: "false"}
	}},
	SECTION_BACKGROUND_VIEWURLHTML: {name: "BACKGROUND_VIEW/URL/HTML", type: "section", options: {
		adjustHeightToBackgroundView: {name: "Adjust height of device tile to the size of BACKGROUND_VIEW", type: "checkbox", default: "false"},
		backgroundURLAllowAdjustHeight: {name: "Allow widget in BACKGROUND_URL to adjust height of device tile", type: "checkbox", default: "false"},
		backgroundLimitAdjustHeightToScreen: {name: "Limit adjustment of height to screen size", type: "checkbox", default: "false"},
		backgroundURLDynamicIframeZoom: {name: "Dynamic zoom for BACKGROUND_VIEW/URL/HTML (this is the zoom-level in % that would be needed, to let the content fit into a single 1x1 tile)", type: "number", step: "0.01", min: "0", max: "200", default: ""},
		backgroundURLPadding: {name: "Apply padding to BACKGROUND_VIEW/URL/HTML", type: "number", min: "0", max: "50", default: ""},
		backgroundURLAllowPostMessage: {name: "Allow postMessage-Communication for BACKGROUND_VIEW/URL/HTML", type: "checkbox", default: "false"},
		backgroundURLNoPointerEvents: {name: "Direct mouse events to the tile instead to the content of BACKGROUND_VIEW/URL/HTML", type: "checkbox", default: "false"},
		overlayAboveBackgroundURL: {name: "Position Overlay above BACKGROUND_VIEW/URL/HTML", type: "checkbox", default: "false"}
	}},
	SECTION_BADGE: {name: "BADGE", type: "section", options: {
		badgeWithoutUnit: {name: "Show badge value without unit", type: "checkbox", default: "false"},
		showBadgeIfZero: {name: "Show badge even if the value is zero", type: "checkbox", default: "false"},
	}},
	SECTION_GLOW: {name: "GLOW", type: "section", options: {
		invertGlowHide: {name: "Invert GLOW_HIDE", type: "checkbox", default: "false"}
	}},
	SECTION_URLHTML: {name: "URL/HTML", type: "section", options: {
		popupWidth: {name: "Width [px] for URL/HTML-Box", type: "number", min: "100", max: "2000", default: ""},
		popupHeight: {name: "Height [px] for URL/HTML-Box", type: "number", min: "100", max: "2000", default: ""},
		popupFixed: {name: "Fixed (not resizable)", type: "checkbox", default: "false"},
		openURLExternal: {name: "Open URL in new window (instead of showing as box in dialog)", type: "checkbox", default: "false"},
		openURLExternalCaption: {name: "Caption for Button to open URL in new window", type: "text", default: ""},
		popupAllowPostMessage: {name: "Allow postMessage-Communication for URL/HTML", type: "checkbox", default: "false"}
	}},
	SECTION_ADDITIONAL_CONTROLS: {name: "ADDITIONAL_CONTROLS", type: "section", options: {
		additionalControlsSectionType: {name: "Appereance of ADDITIONAL_CONTROLS", type: "select", selectOptions: "none/No collapsible section (always visible);none noCaption/No collapsible section (always visible), without caption;collapsible/Collapsible section, closed at start;collapsible open/Collapsible section, opened at start", default: "collapsible"},
		additionalControlsCaption: {name: "Caption for ADDITIONAL_CONTROLS", type: "text", default: "Additional Controls"},
		additionalControlsHeadingType: {name: "Appereance of ADDITIONAL_CONTROLS Headings", type: "select", selectOptions: "none/No collapsible section (always visible);collapsible/Collapsible section, closed at start;collapsible open/Collapsible section, opened at start", default: "none"},
		additionalControlsHideNameForButtons: {name: "Hide Name (with Icon) for Buttons (use caption only)", type: "checkbox", default: false}
	}},
	SECTION_ADDITIONAL_INFO: {name: "ADDITIONAL_INFO", type: "section", options: {
		additionalInfoSectionType: {name: "Appereance of ADDITIONAL_INFO", type: "select", selectOptions: "none/No collapsible section (always visible);none noCaption/No collapsible section (always visible), without caption;collapsible/Collapsible section, closed at start;collapsible open/Collapsible section, opened at start", default: "collapsible"},
		additionalInfoCaption: {name: "Caption for ADDITIONAL_INFO", type: "text", default: "Additional Infos"},
		additionalInfoListType: {name: "List type of ADDITIONAL_INFO", type: "select", selectOptions: "/Default;plain/Plain", default: ""},
		additionalInfoListColumnCount: {name: "Split the list into this number of columns", type: "select", selectOptions: "auto/Auto;1;2;3;4;5;6", default: "auto"},
		additionalInfoListColumnWidth: {name: "Do not go below this column width [px]", type: "number", min: 0, max: 1200, step: 1, default: ""}
	}},
	SECTION_DEVICESPECIFIC: {name: "Device Specific Options", type: "section"}
};

//Extend iQontrolRoles with iQontrolRolesStandardOptions
for(iQontrolRole in iQontrolRoles){
	var optionsObject = JSON.parse(JSON.stringify(iQontrolRolesStandardOptions));
	for(deviceSpecificOptionSection in iQontrolRoles[iQontrolRole].deviceSpecificOptions){
		if(iQontrolRoles[iQontrolRole].deviceSpecificOptions[deviceSpecificOptionSection] == "delete"){
			delete optionsObject[deviceSpecificOptionSection];
		} else {
			if(typeof optionsObject[deviceSpecificOptionSection] == "undefined") optionsObject[deviceSpecificOptionSection] = iQontrolRoles[iQontrolRole].deviceSpecificOptions[deviceSpecificOptionSection];
			for(deviceSpecificOption in iQontrolRoles[iQontrolRole].deviceSpecificOptions[deviceSpecificOptionSection].options){
				if(iQontrolRoles[iQontrolRole].deviceSpecificOptions[deviceSpecificOptionSection].options[deviceSpecificOption] == "delete"){
					delete optionsObject[deviceSpecificOptionSection].options[deviceSpecificOption];
				} else {
					if(typeof optionsObject[deviceSpecificOptionSection].options == "undefined") optionsObject[deviceSpecificOptionSection].options = {};
					if(typeof optionsObject[deviceSpecificOptionSection].options[deviceSpecificOption] == "undefined"){
						optionsObject[deviceSpecificOptionSection].options[deviceSpecificOption] = iQontrolRoles[iQontrolRole].deviceSpecificOptions[deviceSpecificOptionSection].options[deviceSpecificOption];
					} else {
						for(deviceSpecificOptionSetting in iQontrolRoles[iQontrolRole].deviceSpecificOptions[deviceSpecificOptionSection].options[deviceSpecificOption]){
							optionsObject[deviceSpecificOptionSection].options[deviceSpecificOption][deviceSpecificOptionSetting] = iQontrolRoles[iQontrolRole].deviceSpecificOptions[deviceSpecificOptionSection].options[deviceSpecificOption][deviceSpecificOptionSetting];
						};	
					}	
				}
			};	
		}
	};
	var optionsObjectFlat = {};
	iQontrolRoles[iQontrolRole].optionsDisplaySequence = []; 
	for(section in optionsObject){
		optionsObjectFlat[section] = {name: optionsObject[section].name, type: optionsObject[section].type};
		iQontrolRoles[iQontrolRole].optionsDisplaySequence.push(section);
		for(option in optionsObject[section].options){
			optionsObjectFlat[option] = optionsObject[section].options[option];
			iQontrolRoles[iQontrolRole].optionsDisplaySequence.push(option);
		};
	};
	iQontrolRoles[iQontrolRole].options = JSON.parse(JSON.stringify(optionsObjectFlat));	
}

//Delcarations
var socket;
var systemConfig = {};							//Contains the system config (like system language)
var systemLang = "en";							//Used for translate.js -> _(string) translates string to this language. This is only the backup-setting, if it could not be retreived from server (via config.language)
var timeshift = 0;								//Contains time difference betwen browswe and server for correcting timestamps
var zoom = 1;									//Zoom-Factor from resizeDevicesToFitScreen()
var bigMode = false;							//If bigMode is active

var config = {};								//Contains iQontrol config-object
var fetchedStates = {}; 								//Contains all used and over the time changed States in the form of {id:stateobject}
var fetchedObjects = {}; 							//Contains all used Objekte in the form of {id:object}
var waitingForObject = {};						//Contains all IDs where actual tasks to retreive the object are running
var fetchObjectBufferedCallbacks = {};			//Contains callbacks that are buffered, if fetchObject is called while already waiting for object
var getPreviewConfigCallbacks = {};				//Contains callbacks that are buffered, if fetchConfig is called while in previewMode
var preventUpdate = {};							//Contains timer-ids in the form of {ID:{timerId, stateId, deviceIdEscaped, newVal}}. When set, updating of the corresponding stateId is prevented. The contained timer-id is the id of the timer, that will set itself to null, after the time has expired.
var reconnectedShortly = false;					//Contains timer-id if the socket has reconnected shortly. After a short while it is set fo false.

var options = {};								//Contains the options (extracted from <namespace + '.Options'>)
var returnAfterTimeTimestamp = false;			//If the option ReturnAfterTime is active, this ist the timestamp of the last use of iQontrol, or null, if the treshold has been reached and the view has been switched to destinationView or false, if the eventListeners to set the timestamp have not been bound to document yet
var returnAfterTimeDestinationView = "";		//If the option ReturnAfterTime is active, this ist the destinationView wich will be shown after the time expired
var returnAfterTimeTreshold = 0;				//If the option ReturnAfterTime is active, this ist the treshold, after wich the destinationView will be loaded

var toolbarLinksToOtherViews = [];				//Will become History when clicking on a link to other view on actual view
var toolbarContextMenu = {};					//Contains Items for Context Menu in the form of toolbarContextMenu[toolbarIndex] = {linkedView, ...} linkedView is Object in the form of {name, href, target, onclick}
var toolbarContextMenuInterval = false;			//Contains the id of the running setInterval that raises the level = duration of long click of the contextMenu
var toolbarContextMenuLevel = 0;				//Contains the level = duration of long click of the contextMenu
var toolbarContextMenuIgnoreClick = false;		//Set to true, if the Click-function is temporarily disabled, for exapmple because a DeepPress has started
var toolbarContextMenuIgnoreStart = false;		//Set to true, if the toolbarContextMenu-function is temporarily disabled, for example because a click function has been called
var toolbarContextMenuLinksToOtherViews = [];	//Will become History when clicking on a Context Menu Link
var toolbarUpdateFunctions = {}; 					//Same as viewUpdateFunctions, but for panels
var toolbarAdaptHeightOrMarqueeObserver;			//Contains MutationObserver for marquee-enabled elements

var actualView = {};							//Contains the actual view as object
var actualViewId;								//Contains the ID of the actual View
var viewLinksToOtherViews = [];					//Will become History when clicking on a link to other view on actual view
var viewHistory = [];							//History for navigation between views via swipe
var viewHistoryPosition = 0;					//Position in history
var viewLinkedStateIdsToFetchAndUpdate = [];	//Contains all linkedStateIds after rendering a view, where updateFunctions were created - the corresponding updateFunctions are called after rendering the view
var viewUpdateFunctions = {};					//Used to save all in the view-page currently visible state-ids and how updates have to be handled in the form of {State-ID:[functions(State-ID)]}
var viewAdaptHeightOrMarqueeObserver;			//Contains MutationObserver for marquee-enabled elements
var viewDeviceContextMenu = {};					//Contains Items for Context Menu in the form of viewDeviceContextMenu[deviceIdEscaped] = {linkedView, externalLink, ...} linkedView and externalLink are Objects in the form of {name, href, target, onclick}
var viewDeviceContextMenuInterval = false;		//Contains the id of the running setInterval that raises the level = duration of long click of the contextMenu
var viewDeviceContextMenuLevel = 0;				//Contains the level = duration of long click of the contextMenu
var viewDeviceContextMenuIgnoreClick = false;	//Set to true, if the Click-function is temporarily disabled, for exapmple because a DeepPress has started
var viewDeviceContextMenuIgnoreStart = false;	//Set to true, if the toolbarContextMenu-function is temporarily disabled, for example because a click function has been called
var viewTimestampElapsedTimer = false; 			//Containes the timer that updates timestamps with elapsed time
var viewTimestampElapsedTimerStates = []; 		//Containes the stateIds that need to be updated periodically because they display a timestamp with elapsed time
var viewShuffleInstances = [];					//Instances of shuffle-Objects
var viewShuffleReshuffleTimeouts = {};			//Contains timouts to reshuffle
var viewShuffleResizeObserver;					//Contains MutationObserver for class changes in Devices to trigger shuffle-update
var viewShuffleApplyShuffleResizeObserverTimeoutsMarqueeDisabled = []; //Timeouts for disabling Marquee-Observer while resizing
var viewScrollToDeviceTimeout1 = false;			//Contains timeout for scrollToDevice
var viewScrollToDeviceTimeout2 = false;			//Contains timeout for scrollToDevice
var viewScrollToDeviceRunning = false;			//Is true, while scrollToDevice ist scrolling

var viewInfoASliderLength = [];					//Array of deviceIdEscaped that contains the length of InfoA-Slider-Array
var viewInfoASliderIndex = [];					//Array of deviceIdEscaped that contains the actual index of InfoA-Slider-Array
var viewInfoBSliderLength = [];					//Array of deviceIdEscaped that contains the length of InfoB-Slider-Array
var viewInfoBSliderIndex = [];					//Array of deviceIdEscaped that contains the actual index of InfoB-Slider-Array
var viewInfoSliderInterval = false;				//Running InfoSliderInterval

var actualDialogId;								//Contains the ID of the actual Dialog
var dialogStateIdsToFetch = [];					//Contains all missing stateIds after rendering a dialog - they will be fetched and if ready, the dialog ist rendered again
var dialogLinkedStateIdsToUpdate = [];			//Contains all linkedStateIds after rendering a dialog, where updateFunctions were created - the corresponding updateFunctions are called after rendering the dialog
var dialogUpdateFunctions = {}; 				//Same as viewUpdateFunctions, but for dialog-page
var dialogIdsToUpdateEverySecond = [];			//Contains IDs that schould update every second (e.g. to update a timer)
var dialogIdsToUpdateEverySecondInterval;		//Corresponding IntervalID
var dialogRenderCount = 0;						//When rendering a view from a foreign namespace there may be some datapoints that need to be fetched. The dialog is re-rendered. To avoid an endless loop, this variable contains nummer of re-rendering.

var toastStack = [];							//Contains the toast messages that are waiting in queue to be displayed

var panels = [{}];								//Contains the panel-settings (extracted from <namespace + '.panel'>)
var panelUpdateFunctions = {}; 					//Same as viewUpdateFunctions, but for panels

const udef = 'undefined';

//++++++++++ POLYFILL ++++++++++
//Object.assign
if(typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if(target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if(nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if(Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

//Object.keys
if(!Object.keys) {
	Object.keys = (function () {
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			],
			dontEnumsLength = dontEnums.length;
		return function (obj) {
			if(typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
			var result = [];
			for (var prop in obj) {
				if(hasOwnProperty.call(obj, prop)) result.push(prop);
			}
			if(hasDontEnumBug) {
				for (var i=0; i < dontEnumsLength; i++) {
					if(hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
				}
			}
			return result;
		}
	})()
};

//Array.find
if(!Array.prototype.find) {
	Array.prototype.find = function(predicate) {
		if(this == null) {
			throw new TypeError('Array.prototype.find called on null or undefined');
		}
		if(typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		}
		var list = Object(this);
		var length = list.length >>> 0;
		var thisArg = arguments[1];
		var value;
		
		for (var i = 0; i < length; i++) {
			value = list[i];
			if(predicate.call(thisArg, value, i, list)) {
				return value;
			}
		}
		return undefined;
	};
}

//Array.findIndex
if(!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if(this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if(typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if(predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    },
    configurable: true,
    writable: true
  });
}

//Array.from// Production steps of ECMA-262, Edition 6, 22.1.2.1
if(!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if(isNaN(number)) { return 0; }
      if(number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if(arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if(typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if(!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if(arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if(mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}

//String endsWith
if(typeof String.prototype.endsWith !== 'function') {
	String.prototype.endsWith = function(suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}

//Check if browser supports passive event listeners
var supportsPassive = false;
try {
	var opts = Object.defineProperty({}, 'passive', {
		get: function() {
			supportsPassive = true;
		}
	});
	window.addEventListener("testPassive", null, opts);
	window.removeEventListener("testPassive", null, opts);
} catch (e) {}

//Extend moment.js to format durations
moment.duration.fn.format = function (input) {
    var output = input || "";
    var milliseconds = this.asMilliseconds();
	if(output == "") return milliseconds;
    var totalMilliseconds = 0;
    var replaceRegexps = {
        years: /Y(?!Y)(?![^\[]*\])/g,
        months: /M(?!M)(?![^\[]*\])/g,
        weeks: /W(?!W)(?![^\[]*\])/g,
        days: /D(?!D)(?![^\[]*\])/g,
        hours: /H(?!H)(?![^\[]*\])/g,
        minutes: /m(?!m)(?![^\[]*\])/g,
        seconds: /s(?!s)(?![^\[]*\])/g,
        milliseconds: /S(?!S)(?![^\[]*\])/g
    }
    var matchRegexps = {
        years: /Y(?![^\[]*\])/g,
        months: /M(?![^\[]*\])/g,
        weeks: /W(?![^\[]*\])/g,
        days: /D(?![^\[]*\])/g,
        hours: /H(?![^\[]*\])/g,
        minutes: /m(?![^\[]*\])/g,
        seconds: /s(?![^\[]*\])/g,
        milliseconds: /S(?![^\[]*\])/g
    }
	//(?![^\[]*\]) stands for 'not inside []'
    for (var r in replaceRegexps) {
        if(replaceRegexps[r].test(output)) {
            var as = 'as'+r.charAt(0).toUpperCase() + r.slice(1);
            var value = new String(Math.floor(moment.duration(milliseconds - totalMilliseconds)[as]()));
            var replacements = output.match(matchRegexps[r]).length - value.length;
            output = output.replace(replaceRegexps[r], value);

            while (replacements > 0 && replaceRegexps[r].test(output)) {
                output = output.replace(replaceRegexps[r], '0');
                replacements--;
            }
            output = output.replace(matchRegexps[r], '');

            var temp = {};
            temp[r] = value;
            totalMilliseconds += moment.duration(temp).asMilliseconds();
        }
    }
	output = translateTextInsideBrackets(output).replace(/\[/g, "").replace(/\]/g, "");
    return output;
}

//++++++++++ SOCKET  FUNCTIONS ++++++++++
/*Initialization of socket is done at the end of the document in the $(document).ready-section*/
function getStarted(triggeredByReconnection){
	console.log("* Get started...");
	if(!isBackgroundView) $('.loader').show(); else $('.loader').hide();
	$("#ToolbarContextMenu, #ViewDeviceContextMenu, #Dialog").popup("close");
	$('#pincode').hide(150);
	fetchedStates = {};
	dialogStateIdsToFetch = [];
	viewLinkedStateIdsToFetchAndUpdate = [];
	dialogLinkedStateIdsToUpdate = [];
	fetchedObjects = {};
	waitingForObject = {};
	preventUpdate = {};
	//Fetch systemConfig
	console.log("* Fetch system config...");
	fetchSystemConfig(function(){
		console.log("* System config received.");
		systemLang = getUrlParameter('language') || systemConfig.language || systemLang;
		translateAll();
			//Fetch config
			console.log("* Fetch config...");
			fetchConfig(function(){
				console.log("* Config received.");
				console.log("* Handle passphrase...");
				if(config[namespace].passphraseEncrypted){
					for(i = 0; md5(passphrase || "") != config[namespace].passphraseEncrypted && i < 4; i++){
						if(i == 3) {
							alert(_("Too many attempts, please try again later!"));
							return;
						}
						passphrase = prompt(_("Please enter passphrase:"));
						if(passphrase == null) return;
					}
				}
				console.log("* Handle options...");
				handleOptions();
				console.log("* Options handeled.");
				console.log("* Render toolbar...");
				renderToolbar();
				console.log("* Toolbar rendered.");
				console.log("* Render actual|home view...");
				renderView(actualViewId || homeId, triggeredByReconnection);
				if(actualViewId == homeId){
					viewHistory = toolbarLinksToOtherViews;
					viewHistoryPosition = 0;
					console.log("* Home rendered.");
				} else {
					console.log("* Actual view rendered.");
				}
				initPopup();
				initPanels();
				$('.loader').hide();
				$.mobile.loading('hide');
				fetchStates([namespace + ".info.connection"]);
			}, "forceFetch");
	});
}

function fetchSystemConfig(callback){
	console.debug("[Socket] getConfig");
	socket.emit('getObject', 'system.config', function (err, _config) {
		if(_config && _config.common){
			systemConfig = _config.common;
			if(callback) callback();
		} else {
			console.log("System config could not be loaded")
			if(callback) callback(error = "SystemConfigCouldNotBeLoaded");
		}
	});
}

function fetchConfig(_namespace, callback, forceFetch){
	if(typeof _namespace == "function") {
		forceFetch = callback;
		callback = _namespace;
		_namespace = null;
	}
	if(_namespace == null) _namespace = namespace;
	if(typeof config[_namespace] == udef || forceFetch){
		if(configMode == "preview" && opener && !opener.closed){
			let getPreviewConfigCallbackId = new Date().getTime();
			getPreviewConfigCallbacks[getPreviewConfigCallbackId] = callback;
			opener.postMessage({command : "getPreviewConfig", getPreviewConfigCallbackId: getPreviewConfigCallbackId}, "*");
		} else {
			console.debug("[Socket] getObject system.adapter." + _namespace);
			socket.emit('getObject', "system.adapter." + _namespace, function (err, _object) {
				if(_object) {
					config[_namespace] = convertConfigV3(_object.native); //#####
					if(_namespace == namespace){
						createOptionsAndPanelObjectsFromConfig();
					}
					if(callback) callback();
				} else {
					console.log("Config-Object not found");
					if(callback) callback(error = "objectNotFound"); //Object not found
				}
			});
		}
	} else {
		if(callback) callback();
	}
}

function createOptionsAndPanelObjectsFromConfig(){
	console.log("* Creating options- and panel-objects");
	for (var key in config[namespace]) {
		if(key.indexOf("options") == 0) options[key.substring(7)] = config[namespace][key];
		if(key.indexOf("panel") == 0){ panels[0][key.substring(5)] = config[namespace][key]; }
	};
}

function fetchView(viewId, callback){ // fetches View configuration 
	var _namespace = getNamespace(viewId);
	if(typeof config[_namespace] == udef) {
		fetchConfig(_namespace, function(){
			var view = config[_namespace].views[getViewIndex(viewId)];
			if(callback) callback(view);
		});
	} else {
		var view = config[_namespace].views[getViewIndex(viewId)];
		if(callback) callback(view);
	}
}

function fetchObject(id, callback, bufferCallbackIfAlreadyWaitingForObject){
	if(id == "") {
		console.log("fetchObject with empty id");
		if(callback) callback(error = "emptyId");
		return;
	}
	if(fetchedObjects[id]) {
		console.log("Object was already Received: " + id);
		if(callback) callback(error = "objectWasAlreadyReceived");	//Do nothing - object is already retreived
	} else if(waitingForObject[id]){
		console.log("Already waiting for object: " + id);
		if(bufferCallbackIfAlreadyWaitingForObject){
			console.log("Buffered Callback");
			if(!fetchObjectBufferedCallbacks[id]) fetchObjectBufferedCallbacks[id] = [];
			if(callback) fetchObjectBufferedCallbacks[id].push(callback);
		} else {
			if(callback) callback(error = "alreadyWaitingForObject");	//Do nothing - there is already a task running that trys to retrieve the object
		}
	} else {
		waitingForObject[id] = [];
		console.log("Fetch object: " + id);
		console.debug("[Socket] getObject " + id);
		socket.emit('getObject', id, function (err, _object) {
			if(_object) {
				var _id = _object._id;
				delete waitingForObject._id;
				fetchedObjects[_id] = _object;
				console.log("Fetched Object: " + _id);
				if(fetchedStates[_id]) updateState(_id);
				if(callback) callback();
				if(fetchObjectBufferedCallbacks[_id]){
					fetchObjectBufferedCallbacks[_id].forEach(function(callbackFunction){
						callbackFunction();
					});
					fetchObjectBufferedCallbacks[_id] = [];
				}
			} else {
				console.log("Object not found");
				if(callback) callback(error = "objectNotFound"); //Object not found
			}
		});
	}
}

function fetchStates(ids, callback){
	var _ids = [];
	if(ids.constructor === Array) _ids = Object.assign([], ids); else _ids.push(ids);
	for(i = _ids.length -1; i >= 0; i--){
		if(!_ids[i] || fetchedStates[_ids[i]]) _ids.splice(i, 1);
	}
	if(_ids.length > 0){
		console.debug("[Socket] subscribe & getStates " + _ids);
		socket.emit('subscribe', _ids);
		socket.emit('getStates', _ids, function (err, _states) {
			if(_states){
				fetchedStates = Object.assign(_states, fetchedStates);
			}
			if(callback) callback(err);
		});
	} else {
		if(callback) callback();
	}
}

function deliverState(stateId, stateObj, callback){
	console.debug("[Socket] setState " + stateId + (stateObj && stateObj.val ? " --> val: " + stateObj.val : "") + (stateObj && stateObj.ack ? " | ack: " + stateObj.ack : ""));
	socket.emit('subscribe', stateId);
	socket.emit('setState', stateId, stateObj, function(error){
		console.log("deliverState done");
		if(callback) callback(error);
	});
}

function deliverObject(objId, obj, callback){
	console.debug("[Socket] addObject " + objId);
	socket.emit('setObject', objId, obj, function(error){
		console.log("deliverObject done");
		if(!error) fetchedObjects[objId] = obj;
		if(callback) callback(error);
	});
}

//++++++++++ HELPERS: OBJECT AND STATES-FUNCTIONS ++++++++++
function addNamespaceToViewId(viewId){
	if(viewId){
		if(viewId.indexOf("iqontrol.") == 0){
			return viewId;
		} else {
			return namespace + ".Views." + viewId;
		}
	}
}

function getNamespace(id){
	if(id && id.indexOf("iqontrol.") == 0){
		//Namespace is given
		return "iqontrol." + id.substring(9).substr(0, id.substring(9).indexOf("."));
	} else {
		//Use standard namespace
		return namespace;
	}
}

function getView(viewId){
	var _namespace = getNamespace(viewId);
	return config[_namespace].views[getViewIndex(viewId)];
}

function getViewIndex(id){
	id = addNamespaceToViewId(id); //iqontrol.n.Views.VIEW_X.devices.DEVICE_Y.STATE_Z
	var _namespace = getNamespace(id); //iqontrol.n
	var viewName = id.substring(_namespace.length + 7); //VIEW_X.devices.DEVICE_Y.STATE_Z
	if(viewName.indexOf(".") > -1) viewName = viewName.substring(0, viewName.indexOf(".")); //VIEW_X
	return config[_namespace].views.findIndex(function(element){ return (addNamespaceToViewId(element.commonName) == addNamespaceToViewId(viewName)); })
}

function getDevice(deviceId){
	//iqontrol.n.Views.VIEW_X.devices.DEVICEINDEX.STATE_Z
	var _namespace = getNamespace(deviceId); //iqontrol.n
	var viewName = deviceId.substring(_namespace.length + 7); //VIEW_X.devices.DEVICEINDEX.STATE_Z
	if(viewName.indexOf(".") > -1) viewName = viewName.substring(0, viewName.indexOf(".")); //VIEW_X
	var viewIndex = getViewIndex(deviceId);
	var deviceIdentifier = deviceId.substring(_namespace.length + 7 + viewName.length + 9); //DEVICEINDEX.STATE_Z
	if(deviceIdentifier.indexOf(".") > -1) deviceIdentifier = deviceIdentifier.substring(0, deviceIdentifier.indexOf(".")); //DEVICEINDEX
	var deviceIndex = parseInt(deviceIdentifier);
	return config[_namespace].views[viewIndex].devices[deviceIndex];
}

function getDeviceOptionValue(device, option, nullForDefault){
	var value = null;
    if(device && typeof device === "object" && typeof device.options !== udef) {
        const deviceOption = device.options.find(function(element){ return element.option === option; });
        if(deviceOption && deviceOption.value !== udef) {
			value = deviceOption.value;
		} else if(option == "clickOnTileAction" && getDeviceOptionValue(device, "clickOnTileToggles") == "true") { //Backward-Compatibility
			value = "toggle";
		} else if(option == "clickOnTileAction" && getDeviceOptionValue(device, "clickOnTileOpensDialog") == "true") { //Backward-Compatibility
			value = "openDialog";
		} else if(option == "clickOnTileAction" && device.commonRole && device.commonRole == "iQontrolExternalLink") { //Backward-Compatibility
			value = "openURLExternal";			
		} else if(option == "clickOnIconAction" && getDeviceOptionValue(device, "clickOnIconToggles") == "true") { //Backward-Compatibility
			value = "toggle";
		} else if(option == "clickOnIconAction" && getDeviceOptionValue(device, "clickOnIconOpensDialog") == "true") { //Backward-Compatibility
			value = "openDialog";
		} else if(option == "clickOnIconAction" && device.commonRole && device.commonRole == "iQontrolExternalLink") { //Backward-Compatibility
			value = "openURLExternal";			
		} else if(!nullForDefault && device.commonRole !== udef && typeof iQontrolRoles[device.commonRole] !== udef && typeof iQontrolRoles[device.commonRole].options[option] !== udef) {
			value = iQontrolRoles[device.commonRole].options[option].default || "";
        }
    }
	if(typeof value == "string" && device.commonRole !== udef && typeof iQontrolRoles[device.commonRole] !== udef && typeof iQontrolRoles[device.commonRole].options[option] !== udef && iQontrolRoles[device.commonRole].options[option].type == "multipleSelect") value = value.split(',');
    return value;
}

function getLinkedStateId(device, deviceId, state){
	var stateId = deviceId + "." + state;
	var stateObject = null;
	if(fetchedStates[stateId]){ //State exists in fetched states (maybe because its a TEMP: state. Value is stored in .val)
		stateObject = fetchedStates[stateId];
		if(typeof stateObject.val != udef){
			if(stateObject.val.substring(0, 6) == 'CONST:' || stateObject.val.substring(0, 6) == 'ARRAY:') { //role of state is 'const' or 'array'
				var linkedStateId = "CONST:" + stateId;
				var constantValue = stateObject.val.substring(6);
				var constantObject = {
					"type": "state",
					"common": {
						"name": state,
						"desc": "created by iQontrol",
						"role": "state",
						"type": "string",
						"icon": "",
						"read": true,
						"write": false,
						"def": ""
					},
					"native": {}
				};
				fetchedObjects[linkedStateId] = constantObject;
				var constantState = {
					"val": constantValue,
					"ack": true,
					"from": "iQontrol",
					"lc": 0,
					"q": 0,
					"ts": 0,
					"user": "system.user.admin"
				};
				fetchedStates[linkedStateId] = constantState;
				if(!toolbarUpdateFunctions[linkedStateId]) toolbarUpdateFunctions[linkedStateId] = [];
				if(!viewUpdateFunctions[linkedStateId]) viewUpdateFunctions[linkedStateId] = [];
				if(!dialogUpdateFunctions[linkedStateId]) dialogUpdateFunctions[linkedStateId] = [];
				if(!panelUpdateFunctions[linkedStateId]) panelUpdateFunctions[linkedStateId] = [];
				return linkedStateId;
			} else { //role of state is 'linkedState'
				var linkedStateId = stateObject.val;
				if(!toolbarUpdateFunctions[linkedStateId]) toolbarUpdateFunctions[linkedStateId] = [];
				if(!viewUpdateFunctions[linkedStateId]) viewUpdateFunctions[linkedStateId] = [];
				if(!dialogUpdateFunctions[linkedStateId]) dialogUpdateFunctions[linkedStateId] = [];
				if(!panelUpdateFunctions[linkedStateId]) panelUpdateFunctions[linkedStateId] = [];
				if(linkedStateId && typeof fetchedObjects[linkedStateId] == udef) {
					fetchObject(linkedStateId);
				}
				return linkedStateId;
			}
		}
	} else if(device && typeof device == "object" && typeof device.states != udef){ //Search if state exists in config (value ist stored in .value)
		var stateIndex = device.states.findIndex(function(element){ return (element.state == state);})
		if(stateIndex > -1){ //State exists in config
			stateObject = device.states[stateIndex];
			if(stateObject && typeof stateObject.value != udef){
				if(stateObject.commonRole == 'const' || stateObject.commonRole == 'array') { //role of state is 'const' or 'array'
					var linkedStateId = "CONST:" + stateId;
					var constantValue = stateObject.val || stateObject.value;
					var constantObject = {
						"type": "state",
						"common": {
							"name": state,
							"desc": "created by iQontrol",
							"role": "state",
							"type": "string",
							"icon": "",
							"read": true,
							"write": false,
							"def": ""
						},
						"native": {}
					};
					fetchedObjects[linkedStateId] = constantObject;
					var constantState = {
						"val": constantValue,
						"ack": true,
						"from": "iQontrol",
						"lc": 0,
						"q": 0,
						"ts": 0,
						"user": "system.user.admin"
					};
					fetchedStates[linkedStateId] = constantState;
					if(!toolbarUpdateFunctions[linkedStateId]) toolbarUpdateFunctions[linkedStateId] = [];
					if(!viewUpdateFunctions[linkedStateId]) viewUpdateFunctions[linkedStateId] = [];
					if(!dialogUpdateFunctions[linkedStateId]) dialogUpdateFunctions[linkedStateId] = [];
					if(!panelUpdateFunctions[linkedStateId]) panelUpdateFunctions[linkedStateId] = [];
					return linkedStateId;
				} else { //role of state is 'linkedState'
					var linkedStateId = stateObject.value;
					//--Special: If STATE of iQontrolWidget is empty, create VIRTUAL DP
					if(device.commonRole == "iQontrolWidget" && state == "STATE" && linkedStateId == "" &&!(getDeviceOptionValue(device, "noVirtualState") == "true")){
						linkedStateId = "VIRTUAL:boolean,switch,false";
						device.states[stateIndex] = linkedStateId;
					}
					//--If VIRTUAL DP, create TempLinkedState
					if(linkedStateId.substring(0, 8) == 'VIRTUAL:') {
						var config = (linkedStateId.substring(8) || "").split(',');
						var type = config[0] || "boolean";
						var role = config[1] || "state";
						var value = config[2] || null;
						linkedStateId = createTempLinkedState(stateId, type, role, false, value);
					}
					if(!toolbarUpdateFunctions[linkedStateId]) toolbarUpdateFunctions[linkedStateId] = [];
					if(!viewUpdateFunctions[linkedStateId]) viewUpdateFunctions[linkedStateId] = [];
					if(!dialogUpdateFunctions[linkedStateId]) dialogUpdateFunctions[linkedStateId] = [];
					if(!panelUpdateFunctions[linkedStateId]) panelUpdateFunctions[linkedStateId] = [];
					if(linkedStateId && typeof fetchedObjects[linkedStateId] == udef) {
						fetchObject(linkedStateId);
					}
					return linkedStateId;
				}
			}
		} else { //State doesn't exist
			//--Special: If state = "tileEnlarged", create VIRTUAL DP (this is valid for devices with no defined state "tileEnlarged")
			if(state == "tileEnlarged"){
				var linkedStateId = "VIRTUAL:boolean,switch," + ((getDeviceOptionValue(device, "tileEnlargeStartEnlarged") == "true") ? "true" : "false");
				device.states.push(linkedStateId);
				var config = (linkedStateId.substring(8) || "").split(',');
				var type = config[0] || "boolean";
				var role = config[1] || "state";
				var value = config[2] || null;
				linkedStateId = createTempLinkedState(stateId, type, role, false, value);
				if(!toolbarUpdateFunctions[linkedStateId]) toolbarUpdateFunctions[linkedStateId] = [];
				if(!viewUpdateFunctions[linkedStateId]) viewUpdateFunctions[linkedStateId] = [];
				if(!dialogUpdateFunctions[linkedStateId]) dialogUpdateFunctions[linkedStateId] = [];
				if(!panelUpdateFunctions[linkedStateId]) panelUpdateFunctions[linkedStateId] = [];
				if(linkedStateId && typeof fetchedObjects[linkedStateId] == udef) {
					fetchObject(linkedStateId);
				}
				return linkedStateId;
			}
		}
	}
	return null;
}

function createTempLinkedState(stateId, type, role, tempValuesStoredInObjectId, value){
	if(tempValuesStoredInObjectId && typeof fetchedObjects[tempValuesStoredInObjectId] == udef) return null;
	if(typeof fetchedStates[stateId] == udef) fetchedStates[stateId] = {};
	if(typeof fetchedStates[stateId].val == udef) fetchedStates[stateId].val = "";
	if(typeof fetchedStates[stateId] != udef && typeof fetchedStates[stateId].val != udef && fetchedStates[stateId].val == "") { //stateId is empty
		var linkedStateId = "TEMP:" + stateId;
		fetchedStates[stateId].val = linkedStateId;
		var tempType = (typeof type != udef && type) || "string";
		var tempRole = (typeof role != udef && role) || "state";
		var tempValue = (typeof value !== udef && value) || (fetchedObjects[tempValuesStoredInObjectId] && typeof fetchedObjects[tempValuesStoredInObjectId].native != udef && typeof fetchedObjects[tempValuesStoredInObjectId].native.iQontrolTempValues != udef && typeof fetchedObjects[tempValuesStoredInObjectId].native.iQontrolTempValues[stateId] != udef && fetchedObjects[tempValuesStoredInObjectId].native.iQontrolTempValues[stateId]) || (tempType == "level" ? 0 : (tempType == "boolean" ? false : ""));
		var tempObject = {
			"type": "state",
			"common": {
				"name": stateId.substring(stateId.lastIndexOf('.') + 1),
				"desc": "Temp state created by iQontrol",
				"role": tempRole,
				"type": tempType,
				"icon": "",
				"read": true,
				"write": true,
				"def": ""
			},
			"native": {
				"tempValuesStoredInObjectId": tempValuesStoredInObjectId
			}
		};
		fetchedObjects[linkedStateId] = tempObject;
		var tempState = {
			"val": tempValue,
			"ack": false,
			"from": "iQontrol",
			"lc": 0,
			"q": 0,
			"ts": 0,
			"user": "system.user.admin"
		};
		fetchedStates[linkedStateId] = tempState;
		if(!viewUpdateFunctions[linkedStateId]) viewUpdateFunctions[linkedStateId] = [];
		if(!dialogUpdateFunctions[linkedStateId]) dialogUpdateFunctions[linkedStateId] = [];
		return linkedStateId;
	}
}

function getStateObject(linkedStateId){ //Extends state with, type, readonly-attribute and plain text (that is the text from a state that is a value-list)
	if(!linkedStateId || linkedStateId == "") return;
	var result = {};
	if(typeof fetchedStates[linkedStateId] !== udef && fetchedStates[linkedStateId] !== null) {
		result = Object.assign(result, fetchedStates[linkedStateId]);
	}
	if(typeof fetchedObjects[linkedStateId] !== udef && fetchedObjects[linkedStateId] !== null) {
		//--Declare plainText
		result.plainText = null;
		//--Add custom
		result.custom = typeof fetchedObjects[linkedStateId].common.custom !== udef && fetchedObjects[linkedStateId].common.custom !== null && typeof fetchedObjects[linkedStateId].common.custom[namespace] !== udef && fetchedObjects[linkedStateId].common.custom[namespace] || {};
		//--Add unit
		result.unit = getUnit(linkedStateId);
		//--Add readonly
		if(typeof result.custom.targetValues !== udef && result.custom.targetValues !== "") result.readonly = false;
		else if(typeof result.custom.targetValueId !== udef && result.custom.targetValueId !== "") result.readonly = false;
		else if(typeof result.custom.readonly !== udef) result.readonly = result.custom.readonly;
		else if(typeof fetchedObjects[linkedStateId].native !== udef && typeof fetchedObjects[linkedStateId].native.write !== udef) result.readonly = !fetchedObjects[linkedStateId].native.write;
		else if(typeof fetchedObjects[linkedStateId].common.write !== udef) result.readonly = !fetchedObjects[linkedStateId].common.write;
		else result.readonly = false;
		//--Add min and max
		if(typeof result.custom.min !== udef && result.custom.min !== "") result.min = result.custom.min;
		else if(typeof fetchedObjects[linkedStateId].common.min !== udef) result.min = fetchedObjects[linkedStateId].common.min;
		if(typeof result.custom.max !== udef && result.custom.max !== "") result.max = result.custom.max;
		else if(typeof fetchedObjects[linkedStateId].common.max !== udef) result.max = fetchedObjects[linkedStateId].common.max;
		//--Modify min and max for HomematicIP (for temperature sensors it reports min = -3276.8 and max = 3276.7)
		if(result.min == -3276.8 && result.max == 3276.7){
			result.min = -34;
			result.max = 65;
		}
		//--Add step
		if(typeof result.custom.step !== udef && result.custom.step !== "") result.step = result.custom.step;
		else if(typeof fetchedObjects[linkedStateId].common.step !== udef) result.step = fetchedObjects[linkedStateId].common.step;
		if(!result.step && typeof result.min !== udef && !isNaN(result.min) && typeof result.max !== udef && !isNaN(result.max)) {
			var diff = result.max - result.min;
			if(diff < 1) result.step = 0.001;
			else if(diff < 10) result.step = 0.01;
			else if(diff < 100) result.step = 0.1;
			else result.step = 1;
		}
		//--Add type
		result.type = fetchedObjects[linkedStateId].common.type || "string";
		if(typeof result.custom.type !== udef && result.custom.type !== "") result.type = result.custom.type;
		//--Add role
		result.role = fetchedObjects[linkedStateId].common.role || "state";
		if(typeof result.custom.role !== udef && result.custom.role !== "") result.role = result.custom.role;
		var linkedParentId = linkedStateId.substring(0, linkedStateId.lastIndexOf("."));
		if(result.role == "state" && fetchedObjects[linkedParentId] && typeof fetchedObjects[linkedParentId].common.role != udef && fetchedObjects[linkedParentId].common.role){ //For role 'state' look if there are more informations about the role in the parentObject
			switch(parentRole = fetchedObjects[linkedParentId].common.role){
				case "switch": case "sensor.alarm": case "sensor.alarm.fire":
				result.role = parentRole;
				break;
			}
		}
		//--Add name and desc
		result.name = fetchedObjects[linkedStateId].common.name;
		result.desc = fetchedObjects[linkedStateId].common.desc;
		//--If val is not present (state is not set yet), set it - depending from the type - to 0/""
		if(typeof result.val == udef || result.val == null){
			if(result.type && result.type == "string") result.val = ""; else result.val = 0;
		}
		//--Modify typeof val to match to common.type
		switch(result.type){
			case "string":
			if(typeof result.val !== 'string') {
				result.val = result.val.toString();
				result.plainText = result.val;
			}
			break;

			case "number":
			if(typeof result.val !== 'number' && !isNaN(result.val)) result.val = parseFloat(result.val);
			//----Scale % to 0-100 if min-max=0-1
 			if(typeof result.unit !== udef && result.unit == "%" && typeof result.min !== udef && result.min == 0 && typeof result.max !== udef && result.max ==1) {
				result.val = result.val * 100;
				result.max = 100;
			}
			result.type = "level";
 			break;

			case "boolean":
			if(typeof result.val !== 'boolean'){
				if(result.val.toString().toLowerCase() == "false" || result.val == 0 || result.val == "0" || result.val == -1 || result.val == "-1" || result.val == "" || result.val == "off") result.val = false; else result.val = true;
			}
			break;
		}
		//--Modify informations depending on the role
		if(result.role) {
			switch(result.role){
				case "indicator.state":
				result.plainText = result.val;
				result.type = "string";
				result.readonly = true;
				break;

				case "value.window": case "sensor.window": case "sensor.door": case "sensor.lock":
				if(result.val) result.plainText = _("opened"); else result.plainText = _("closed");
				if(typeof result.val == 'boolean' || result.val == true || result.val.toString().toLowerCase() == "true" || result.val == false || result.val.toString().toLowerCase() == "false"){ //If bool, add a value list with boolean values
					result.valueList = {"true": _("opened"), "false": _("closed")};
					result.type = "valueList";
				} else { //If not bool set type to string
					result.type = "string";
				}
				result.readonly = true;
				break;

				case "sensor.alarm":
				if(result.val) result.plainText = _("OK"); else result.plainText = _("Alarm");
				if(typeof result.val == 'boolean' || result.val == true || result.val.toString().toLowerCase() == "true" || result.val == false || result.val.toString().toLowerCase() == "false"){ //If bool, add a value list with boolean values
					result.valueList = {"true": _("OK"), "false": _("Alarm")};
					result.type = "valueList";
				} else { //If not bool and there is no value list, set type to string
					result.type = "string";
				}
				result.readonly = true;
				break;

				case "sensor.alarm.fire": case "sensor.fire": case "sensor.alarm.flood": case "sensor.flood": case "sensor.alarm.water": case "sensor.water": case "indicator.alarm.fire": case "indicator.fire": case "indicator.alarm.flood": case "indicator.flood": case "indicator.alarm.water": case "indicator.water": case "indicator.leakage":
				if(result.val) result.plainText = _("triggered"); else result.plainText = " ";
				if(typeof result.val == 'boolean' || result.val == true || result.val.toString().toLowerCase() == "true" || result.val == false || result.val.toString().toLowerCase() == "false"){ //If bool, add a value list with boolean values
					result.valueList = {"true": _("triggered"), "false": _("OK")};
					result.type = "valueList";
				} else { //If not bool and there is no value list, set type to string
					result.type = "string";
				}
				result.readonly = true;
				break;

				case "switch": case "Switch": case "switch.light": case "switch.power": case "switch.boost": case "switch.enable": case "switch.active": case "scene.state":
				if(typeof result.val == 'string') if(result.val.toLowerCase() == "false" || result.val.toLowerCase() == "off" || result.val.toLowerCase() == "0" || result.val == "") result.val = false; else result.val = true;
				if(result.val) result.plainText = _("on"); else result.plainText = _("off");
				result.type = "switch";
				result.min = 0;
				result.max = 1;
				result.valueList = ["off", "on"];
				break;

				case "button": case "action.execute":
				if(typeof result.val == 'string') if(result.val.toLowerCase() == "false" || result.val.toLowerCase() == "off" || result.val.toLowerCase() == "0" || result.val == "") result.val = false; else result.val = true;
				if(result.val) result.plainText = _("on"); else result.plainText = _("off");
				result.type = "button";
				result.min = 0;
				result.max = 1;
				result.valueList = ["off", "on"];
				break;

				case "level": case "level.dimmer": case "level.blind":
				result.type = "level";
				break;

				case "state":
				result.type = "string";
				if(fetchedObjects[linkedStateId] && typeof fetchedObjects[linkedStateId].native != udef && fetchedObjects[linkedStateId].native.CONTROL) { //if role is not set correctly it can try to determine role from native.CONTROL
					switch(fetchedObjects[linkedStateId].native.CONTROL) {
						case "DOOR_SENSOR.STATE":
						if(result.val) result.plainText = _("opened"); else result.plainText = _("closed");
						if(typeof result.val == 'boolean' || result.val == true || result.val.toString().toLowerCase() == "true" || result.val == false || result.val.toString().toLowerCase() == "false"){ //If bool, add a value list with boolean values
							result.valueList = {"true": _("opened"), "false": _("closed")};
							result.type = "valueList";
						} else { //If not bool set type to string
							result.type = "string";
						}
						result.readonly = true;
						break;

						case "DANGER.STATE":
						if(result.val) result.plainText = _("triggered"); else result.plainText = " ";
						if(typeof result.val == 'boolean' || result.val == true || result.val.toString().toLowerCase() == "true" || result.val == false || result.val.toString().toLowerCase() == "false"){ //If bool, add a value list with boolean values
							result.valueList = {"true": _("triggered"), "false": _("OK")};
							result.type = "valueList";
						} else { //If not bool set type to string
							result.type = "string";
						}
						result.readonly = true;
						break;

						case "SWITCH.STATE":
						if(result.val) result.plainText = _("on"); else result.plainText = _("off");
						if(typeof result.val == 'boolean' || result.val == true || result.val.toString().toLowerCase() == "true" || result.val == false || result.val.toString().toLowerCase() == "false"){ //If bool, add a value list with boolean values
							result.valueList = {"true": _("on"), "false": _("off")};
							result.type = "valueList";
						} else { //If not bool set type to string
							result.type = "string";
						}
						break;

						//Weitere mögliche - aber noch nicht implementierte - Werte:
						//RHS.STATE (Rotary Handle Transceiver)
						//CLIMATECONTROL_FLOOR_TRANSCEIVER.STATE
						//GENERIC_INPUT_TRANSMITTER.STATE
						//SWITCH_TRANSMITTER.STATE
					}
				}
				break;

				case "value.time": case "value.date": case "value.datetime": case "level.timer": case "level.timer.sleep": 
				result.type = "time";
				var timeFormat = getTimeFormat(typeof result.custom.timeFormat !== udef && result.custom.timeFormat !== "" && result.custom.timeFormat || "x");
				var timeDisplayFormat = getTimeFormat(typeof result.custom.timeDisplayFormat !== udef && result.custom.timeDisplayFormat !== "" && result.custom.timeDisplayFormat || "dddd, DD.MM.YYYY HH:mm:ss");
				var nowMoment = moment(new Date());
				if(timeFormat.type == "period"){
					var timeMoment = moment.duration(result.val, timeFormat.string);
				} else {
					var timeMoment = moment(result.val, timeFormat.string);
				}
				if(result.val == "" || !timeMoment.isValid()){
					result.plainText = "";
				} else {
					if(timeFormat.type == "time" && timeMoment.format("DD.MM.YYYY") == nowMoment.format("DD.MM.YYYY")){
						timeMoment.year(1970).month(0).date(1);
					}									
					if(timeMoment.isValid()){
						if(timeMoment._isAMomentObject) result.Date = timeMoment.toDate();
						if(timeFormat.type != "period"){
							result.plainText = timeMoment.locale(systemLang).format((timeMoment.format("DD.MM.YYYY") == nowMoment.format("DD.MM.YYYY")) ? replaceTokens(timeDisplayFormat.string, momentRemoveDateTokens) : timeDisplayFormat.string);
						} else {
							result.plainText = timeMoment.locale(systemLang).format(timeDisplayFormat.string);
						}
					}
				}
				break;
			}
		}
		//--Add valueList
		var statesSet = false;
		var valueListString;
		if(typeof result.custom.states && result.custom.states){
				valueListString = result.custom.states;
				statesSet = true;
		} else if(fetchedObjects[linkedStateId] && typeof fetchedObjects[linkedStateId].native != udef && fetchedObjects[linkedStateId].native.states){
				valueListString = fetchedObjects[linkedStateId].native.states;
				statesSet = true;
		} else if(fetchedObjects[linkedStateId] && fetchedObjects[linkedStateId].common.states){
				valueListString = fetchedObjects[linkedStateId].common.states;
				statesSet = true;
		}
		if(statesSet){
			//----Check format of valueList
			if(typeof valueListString !== "object"){
				if(tryParseJSON(valueListString) == false){
					valueListString = '{"' + valueListString.replace(/;/g, ',').replace(/:/g, '":"').replace(/,/g, '","') + '"}';
					if(tryParseJSON(valueListString) == false) {
						statesSet = false;
					} else {
						valueListString = tryParseJSON(valueListString);
					}
				} else {
					valueListString = tryParseJSON(valueListString);
				}
			}
		}
		if(statesSet){
			if(Array && Array.isArray(valueListString)) { //Since Admin 5 states can be delivered as array - convert back to object
				valueListString = valueListString.reduce(function(acc, val){ acc[val] = val; return acc; }, {});
			}
			result.valueList = Object.assign({}, valueListString);
			//----Further modifications of valueList
			var val = result.val;
			if(typeof val !== udef && val !== null && (typeof val == 'boolean' || val.toString().toLowerCase() == "true" || val.toString().toLowerCase() == "false")){ //Convert valueList-Keys to boolean, if they are numbers
				for (var key in result.valueList){
					var newKey = null;
					if(key == -1 || key == 0 || key == false) newKey = "false";
					if(key == 1 || key == true) newKey = "true";
					if(newKey != null) {
						var dummy = {};
						dummy[newKey] = result.valueList[key];
						delete Object.assign(result.valueList, dummy)[key]; //This renames key to newKey
					}
				};
			}
			if(typeof val !== udef && val !== null && typeof result.valueList[val.toString()] !== udef) result.plainText = _(result.valueList[val]); //Modify plainText if val matchs a valueList-Entry
			if(((result.max != udef && result.min != udef && Object.keys(result.valueList).length == result.max - result.min + 1)
			|| (typeof fetchedObjects[linkedStateId].common.type != udef && fetchedObjects[linkedStateId].common.type == "boolean")) && result.type != "switch"
			|| result.type == 'string') { //If the valueList contains as many entrys as steps between min and max the type is a valueList
					result.type = "valueList";
			}
		}
		//--Add TargetValues
		if(typeof result.custom.targetValues != udef && result.custom.targetValues) {
			var targetValuesSet = true;
			var targetValues = result.custom.targetValues;
			//Check format of targetValues
			if(typeof targetValues !== "object"){
				if(tryParseJSON(targetValues) == false){
					targetValues = '{"' + targetValues.replace(/;/g, ',').replace(/:/g, '":"').replace(/,/g, '","') + '"}';
					if(tryParseJSON(targetValues) == false) {
						targetValuesSet = false;
					} else {
						targetValues = tryParseJSON(targetValues);
					}
				} else {
					targetValues = tryParseJSON(targetValues);
				}
			}
			if(targetValuesSet){
				result.targetValues = Object.assign({}, targetValues);
			}
		}
		//--Try to set a plainText, if it has not been set before
		if(result.plainText == null) {
			if(typeof result.val == 'string') {
				var number = result.val * 1;
				if(number.toString() == result.val) result.val = number;
			}
			if(typeof result.val == 'number'){
				result.type = "level";
				result.valFull = result.val;
				var n = (typeof result.custom.roundDigits != udef && result.custom.roundDigits !== "" ? result.custom.roundDigits : 2);
				result.val =  Math.round(result.val * Math.pow(10, n)) / Math.pow(10, n);
			} else {
				result.type = "string";
			}
			result.plainText = result.val;
		}
		if(result.type == "string" && typeof result.custom.statesAddInput && result.custom.statesAddInput){
			result.type = "valueList";
		}
	}
	//--Set valFull if not set before
	if(typeof result.valFull == udef) result.valFull = result.val;
	//--Prevent injecting of <script> tags
	if(typeof result.val == "string") {
		result.val = result.val.replace(/<script/gi,"&lt;script").replace(/<\/script/gi,"\&lt;\/script");
	}
	if(typeof result.plainText == "string") {
		result.plainText = result.plainText.replace(/<script/gi,"&lt;script").replace(/<\/script/gi,"\&lt;\/script");
	}
	return result;
}

function getUnit(linkedStateId){
	var unit = "";
	if(fetchedObjects[linkedStateId]){
		if(typeof fetchedObjects[linkedStateId].common.custom !== udef && fetchedObjects[linkedStateId].common.custom !== null && typeof fetchedObjects[linkedStateId].common.custom[namespace] !== udef && fetchedObjects[linkedStateId].common.custom[namespace] !== null && typeof fetchedObjects[linkedStateId].common.custom[namespace].unit !== udef){
			unit = _(fetchedObjects[linkedStateId].common.custom[namespace].unit);
		} else if(fetchedObjects[linkedStateId].common.unit) {
			unit = _(fetchedObjects[linkedStateId].common.unit);
		}
		if(fetchedStates[linkedStateId] && typeof fetchedStates[linkedStateId].val != udef){
			var val = fetchedStates[linkedStateId].val;
			if(val * 1 == 0){
				if(typeof fetchedObjects[linkedStateId].common.custom !== udef && fetchedObjects[linkedStateId].common.custom !== null && typeof fetchedObjects[linkedStateId].common.custom[namespace] !== udef && fetchedObjects[linkedStateId].common.custom[namespace] !== null && typeof fetchedObjects[linkedStateId].common.custom[namespace].unit_zero !== udef){
					unit = fetchedObjects[linkedStateId].common.custom[namespace].unit_zero;
				}
			}
			if(val * 1 == 1){
				if(typeof fetchedObjects[linkedStateId].common.custom !== udef && fetchedObjects[linkedStateId].common.custom !== null && typeof fetchedObjects[linkedStateId].common.custom[namespace] !== udef && fetchedObjects[linkedStateId].common.custom[namespace] !== null && typeof fetchedObjects[linkedStateId].common.custom[namespace].unit_one !== udef){
					unit = fetchedObjects[linkedStateId].common.custom[namespace].unit_one;
				}
			}
		}
	}
	if(!(unit == "°C" || unit == "°F" || unit == "%" || unit == "")) unit = "&nbsp;" + unit;
	return unit;
}

function setState(stateId, deviceIdEscaped, newValue, forceSend, callback, preventUpdateTime){
	var oldValue = "";
	if(typeof fetchedStates[stateId] !== udef && fetchedStates[stateId] !== null && typeof fetchedStates[stateId].val !== udef && fetchedStates[stateId].val != null) oldValue = fetchedStates[stateId].val;
	if(newValue.toString() !== oldValue.toString() || forceSend == true){ //For pushbuttons send command even when oldValue equals newValue
		//Confirm
		if(fetchedObjects[stateId] && typeof fetchedObjects[stateId].common !== udef && typeof fetchedObjects[stateId].common.custom !== udef && fetchedObjects[stateId].common.custom !== null && typeof fetchedObjects[stateId].common.custom[namespace] !== udef && typeof fetchedObjects[stateId].common.custom[namespace].confirm !== udef && fetchedObjects[stateId].common.custom[namespace].confirm == true) {
			if(!confirm(_("Please confirm change"))) {
				updateState(stateId, "ignorePreventUpdateForDialog");
				if(callback) callback();
				return;
			}
		}
		//PIN-Code
		if(fetchedObjects[stateId] && typeof fetchedObjects[stateId].common !== udef && typeof fetchedObjects[stateId].common.custom !== udef && fetchedObjects[stateId].common.custom !== null && typeof fetchedObjects[stateId].common.custom[namespace] !== udef && fetchedObjects[stateId].common.custom[namespace] !== null && typeof fetchedObjects[stateId].common.custom[namespace].pincode !== udef && fetchedObjects[stateId].common.custom[namespace].pincode !== "") {
			var givenPincode = fetchedObjects[stateId].common.custom[namespace].pincode;
			if(isNaN(givenPincode)){ //Alphanumeric PIN
				if(prompt(_("Please enter Code")) != givenPincode) {
					alert(_("Wrong Code"));
					updateState(stateId, "ignorePreventUpdateForDialog");
					if(callback) callback();
					return;
				}
			} else { //Numeric PIN
				pincode(givenPincode, function(){ //Right PIN callback
					setStateWithoutVerification(stateId, deviceIdEscaped, newValue, forceSend, callback, preventUpdateTime);
				}, function(){ //Wrong PIN callback
					alert(_("Wrong Code"));
					updateState(stateId, "ignorePreventUpdateForDialog");
					if(callback) callback();
				});
				return;
			}
		}
		setStateWithoutVerification(stateId, deviceIdEscaped, newValue, forceSend, callback, preventUpdateTime);
	}
}

function setStateWithoutVerification(stateId, deviceIdEscaped, newValue, forceSend, callback, preventUpdateTime){
	var oldValue = "";
	if(typeof preventUpdateTime != "number") preventUpdateTime = 5000;
	if(typeof fetchedStates[stateId] !== udef && fetchedStates[stateId] !== null && typeof fetchedStates[stateId].val !== udef && fetchedStates[stateId].val != null) oldValue= fetchedStates[stateId].val;
	if(newValue.toString() !== oldValue.toString() || forceSend == true){ //For pushbuttons send command even when oldValue equals newValue
		console.log(">>>>>> setState " + stateId + ": " + oldValue + " --> " + newValue);
		var stateType = (typeof fetchedObjects[stateId] != udef && typeof fetchedObjects[stateId].common != udef && typeof fetchedObjects[stateId].common.type != udef && fetchedObjects[stateId].common.type) || null;
		var convertTo = "";
		if(stateType == "string" || stateType == "number" || stateType == "boolean"){
			if(typeof newValue != stateType) convertTo = stateType;
		} else if(oldValue != null && (typeof oldValue == "string" || typeof oldValue == "number" || typeof oldValue == "boolean")){
			if(typeof newValue != typeof oldValue) convertTo = typeof oldValue;
		}
		if(convertTo !== ""){
			switch(convertTo){
				case "string":
				newValue = String(newValue);
				break;

				case "number":
				if(newValue.toString().toLowerCase() == "true") newValue = true;
				if(newValue.toString().toLowerCase() == "false") newValue = false;
				if(isNaN(newValue)) newValue = true;
				newValue = Number(newValue);
				break;

				case "boolean":
				if(newValue == false || newValue.toString().toLowerCase() == "false" || newValue < 1){
					newValue = false;
				} else {
					newValue = true;
				}
				break;
			}
			console.log("       converted state to " + typeof oldValue + ". New value is: " + newValue);
		}
		//Invert (iQontrol -> ioBroker - the opposite way is inside updateState-Function)
		if(fetchedObjects[stateId] && typeof fetchedObjects[stateId].common !== udef && typeof fetchedObjects[stateId].common.custom !== udef && fetchedObjects[stateId].common.custom !== null && typeof fetchedObjects[stateId].common.custom[namespace] !== udef && fetchedObjects[stateId].common.custom[namespace] !== null && typeof fetchedObjects[stateId].common.custom[namespace].invert !== udef && fetchedObjects[stateId].common.custom[namespace].invert == true) {
			switch(typeof newValue){
				case "boolean":
					console.log("       Inverting boolean value for state " + stateId + " from " + newValue + "...");
					newValue = !newValue;
					if(!fetchedStates[stateId]) fetchedStates[stateId] = {};
					fetchedStates[stateId].isInverted = false;
					console.log("       ...to " + newValue);
					break;

				case "number":
				console.log("       Inverting number value for state " + stateId + " from " + newValue + "...");
				if(typeof fetchedObjects[stateId] !== udef && typeof fetchedObjects[stateId].common.min !== udef) var min = fetchedObjects[stateId].common.min;
				if(typeof fetchedObjects[stateId] !== udef && typeof fetchedObjects[stateId].common.custom !== udef && fetchedObjects[stateId].common.custom !== null && typeof fetchedObjects[stateId].common.custom[namespace] !== udef && fetchedObjects[stateId].common.custom[namespace] !== null && typeof fetchedObjects[stateId].common.custom[namespace].min !== udef && fetchedObjects[stateId].common.custom[namespace].min !== "") var min = fetchedObjects[stateId].common.custom[namespace].min;
				if(typeof fetchedObjects[stateId] !== udef && typeof fetchedObjects[stateId].common.max !== udef) var max = fetchedObjects[stateId].common.max;
				if(typeof fetchedObjects[stateId] !== udef && typeof fetchedObjects[stateId].common.custom !== udef && fetchedObjects[stateId].common.custom !== null && typeof fetchedObjects[stateId].common.custom[namespace] !== udef && fetchedObjects[stateId].common.custom[namespace] !== null && typeof fetchedObjects[stateId].common.custom[namespace].max !== udef && fetchedObjects[stateId].common.custom[namespace].max !== "") var max = fetchedObjects[stateId].common.custom[namespace].max;
				if(typeof min !== udef && typeof max !== udef){
					newValue = max - (newValue - min);
					if(!fetchedStates[stateId]) fetchedStates[stateId] = {};
					fetchedStates[stateId].isInverted = false;
					console.log("       ...to " + newValue);
				} else {
					console.log("       ...aborted inverting, because min or max is missing");
				}
				break;

				case "string":
				console.log("       Inverting string value for state " + stateId + " is not supported!");
				break;

				default:
				console.log("       Inverting value for state " + stateId + " is impossible - type not known: " + typeof newValue);
			}
		}
		//----Scale % from 0-100 if min-max=0-1
		if(typeof newValue == "number") {
			var unit = "";
			if(typeof fetchedObjects[stateId] !== udef && typeof fetchedObjects[stateId].common !== udef && typeof fetchedObjects[stateId].common.unit !== udef) unit = fetchedObjects[stateId].common.unit;
			if(typeof fetchedObjects[stateId] !== udef && typeof fetchedObjects[stateId].common !== udef && typeof fetchedObjects[stateId].common.custom !== udef && fetchedObjects[stateId].common.custom !== null && typeof fetchedObjects[stateId].common.custom[namespace] !== udef && fetchedObjects[stateId].common.custom[namespace] !== null && typeof fetchedObjects[stateId].common.custom[namespace].unit !== udef && fetchedObjects[stateId].common.custom[namespace].unit !== "") unit = fetchedObjects[stateId].common.custom[namespace].min;
			if(unit == "%") {
				var min;
				if(typeof fetchedObjects[stateId] !== udef && typeof fetchedObjects[stateId].common.min !== udef) min = fetchedObjects[stateId].common.min;
				if(typeof fetchedObjects[stateId] !== udef && typeof fetchedObjects[stateId].common.custom !== udef && fetchedObjects[stateId].common.custom !== null && typeof fetchedObjects[stateId].common.custom[namespace] !== udef && fetchedObjects[stateId].common.custom[namespace] !== null && typeof fetchedObjects[stateId].common.custom[namespace].min !== udef && fetchedObjects[stateId].common.custom[namespace].min !== "") min = fetchedObjects[stateId].common.custom[namespace].min;
				var max;
				if(typeof fetchedObjects[stateId] !== udef && typeof fetchedObjects[stateId].common.max !== udef) max = fetchedObjects[stateId].common.max;
				if(typeof fetchedObjects[stateId] !== udef && typeof fetchedObjects[stateId].common.custom !== udef && fetchedObjects[stateId].common.custom !== null && typeof fetchedObjects[stateId].common.custom[namespace] !== udef && fetchedObjects[stateId].common.custom[namespace] !== null && typeof fetchedObjects[stateId].common.custom[namespace].max !== udef && fetchedObjects[stateId].common.custom[namespace].max !== "") max = fetchedObjects[stateId].common.custom[namespace].max;
				if(min == 0 && max == 1){
					newValue = newValue / 100;
					console.log("       Scaled %-Value to: " + newValue);
				}
			}
		}
		if(preventUpdate[stateId]) clearTimeout(preventUpdate[stateId].timerId);
		(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
			var _stateId = stateId;
			var _deviceIdEscaped = deviceIdEscaped;
			var _preventUpdateTime = preventUpdateTime;
			if(_stateId.substring(0, 6) == 'CONST:' || _stateId.substring(0, 6) == 'ARRAY:' || _stateId.substring(0, 5) == 'TEMP:') _preventUpdateTime = 200;
			$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceLoading").addClass("active");
			preventUpdate[_stateId] = {};
			preventUpdate[_stateId].stateId = _stateId;
			preventUpdate[_stateId].deviceIdEscaped = deviceIdEscaped;
			preventUpdate[_stateId].newVal = newValue;
			preventUpdate[_stateId].timerId = setTimeout(function(){
				console.log("<< preventUpdate dexpired.")
				$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceLoading").removeClass("active");
				delete preventUpdate[_stateId];
				updateState(_stateId);
			}, _preventUpdateTime);
			//Do not send (only treat locally), if state is CONST, ARRAY or TEMP:
			if(_stateId.substring(0, 6) == 'CONST:' || _stateId.substring(0, 6) == 'ARRAY:' || _stateId.substring(0, 5) == 'TEMP:') {
				console.log("       setState only local, because state ist CONST, ARRAY or TEMP");
				if(!fetchedStates[_stateId]) fetchedStates[_stateId] = {};
				fetchedStates[_stateId].val = newValue;
				fetchedStates[_stateId].ack = false;
				if(_stateId.substring(0, 5) == 'TEMP:'){ //Save TEMP Value in parent DeviceObject
					var _tempStateId = _stateId.substring(5);
					var _tempValuesStoredInObjectId = fetchedObjects[_stateId].native.tempValuesStoredInObjectId;
					if(_tempValuesStoredInObjectId) setTimeout(function(){
						var tempValuesObject = fetchedObjects[_tempValuesStoredInObjectId];
						if(typeof tempValuesObject.native == udef) tempValuesObject.native = {};
						if(typeof tempValuesObject.native.iQontrolTempValues == udef) tempValuesObject.native.iQontrolTempValues = {};
						tempValuesObject.native.iQontrolTempValues[_tempStateId] = newValue;
						deliverObject(_tempValuesStoredInObjectId, tempValuesObject, null);
					}, 200);
				}
				if(callback) callback(error);
			} else {
				//TargetValueId
				if(fetchedObjects[_stateId] && typeof fetchedObjects[_stateId].common !== udef && typeof fetchedObjects[_stateId].common.custom !== udef && fetchedObjects[_stateId].common.custom !== null && typeof fetchedObjects[_stateId].common.custom[namespace] !== udef && fetchedObjects[stateId].common.custom[namespace] !== null && typeof fetchedObjects[_stateId].common.custom[namespace].targetValueId !== udef && fetchedObjects[_stateId].common.custom[namespace].targetValueId !== "") {
					var _targetValueId = fetchedObjects[_stateId].common.custom[namespace].targetValueId;
					console.log("       Changed target datapoint id to " + _targetValueId + " because targetValueId was set.");
				} else {
					var _targetValueId = _stateId;
				}
				//TargetValues
				if(fetchedObjects[_stateId] && typeof fetchedObjects[_stateId].common !== udef && typeof fetchedObjects[_stateId].common.custom !== udef && fetchedObjects[_stateId].common.custom !== null && typeof fetchedObjects[_stateId].common.custom[namespace] !== udef && fetchedObjects[stateId].common.custom[namespace] !== null && typeof fetchedObjects[_stateId].common.custom[namespace].targetValues !== udef && fetchedObjects[_stateId].common.custom[namespace].targetValues !== "") {
					var targetValuesSet = true;
					var targetValues = fetchedObjects[_stateId].common.custom[namespace].targetValues;
					//Check format of targetValues
					if(typeof targetValues !== "object"){
						if(tryParseJSON(targetValues) == false){
							targetValues = '{"' + targetValues.replace(/;/g, ',').replace(/:/g, '":"').replace(/,/g, '","') + '"}';
							if(tryParseJSON(targetValues) == false) {
								targetValuesSet = false;
							} else {
								targetValues = tryParseJSON(targetValues);
							}
						} else {
							targetValues = tryParseJSON(targetValues);
						}
					}
					if(targetValuesSet && typeof newValue !== udef && newValue !== null){
						if(typeof targetValues[newValue.toString()] !== udef && typeof targetValues[newValue.toString()].targetValue !== udef && targetValues[newValue.toString()].targetValue !== "" && typeof targetValues[newValue.toString()].targetDatapointId !== udef && targetValues[newValue.toString()].targetDatapointId !== ""){ //Exact match
							_targetValueId = targetValues[newValue.toString()].targetDatapointId;
							newValue = targetValues[newValue.toString()].targetValue;
							console.log("       Changed target datapoint id to " + _targetValueId + " and value to " + newValue + " because key was found in targetValues List.");
						} else { //Test for wildcard-match
							for (var key in targetValues) {
								var keyWildcardPosition = key.indexOf("*");
								if(keyWildcardPosition > -1){
									var keyWildcardPreString = key.toString().substring(0, keyWildcardPosition);
									var keyWildcardPostString = key.toString().substring(keyWildcardPosition + 1);
									if(newValue.indexOf(keyWildcardPreString) == 0 && (keyWildcardPostString.length == 0 || newValue.indexOf(keyWildcardPostString) == newValue.length - keyWildcardPostString.length)){ //Wildcard match
										_targetValueId = targetValues[key].targetDatapointId;
										var targetValueWildcardPosition = targetValues[key].targetValue.indexOf("*");
										if(targetValueWildcardPosition > -1){
											var targetValueWildcardPreString = targetValues[key].targetValue.substring(0, targetValueWildcardPosition);
											var targetValueWildcardPostString = targetValues[key].targetValue.substring(targetValueWildcardPosition + 1);
											var newValueWildcardString = newValue.substr(keyWildcardPosition, newValue.length - keyWildcardPreString.length - keyWildcardPostString.length);
											newValue = targetValueWildcardPreString + newValueWildcardString + targetValueWildcardPostString;
										}
										break;
									}
								}
							}
						}
					}
				}
				//--Prevent injecting of <script> tags
				if(typeof newValue == "string") {
					newValue = newValue.replace(/<script/gi,"&lt;script").replace(/<\/script/gi,"\&lt;\/script");
				}
				deliverState(_targetValueId, {val: newValue, ack: false} , function(error){
					setTimeout(function(){
						updateState(_stateId, "ignorePreventUpdate");
					}, 200);
					if(callback) callback(error);
				});
			}
		})(); //<--End Closure
	} else {
		console.log("<<<<<< setState aborted (old Value = new Value = " + newValue.toString() + ")");
	}
}

function updateState(stateId, ignorePreventUpdate){
	//Invert (ioBroker -> iQontrol - the opposite way is inside setState-Function)
	if(fetchedObjects[stateId]  && typeof fetchedObjects[stateId].common !== udef && typeof fetchedObjects[stateId].common.custom !== udef && fetchedObjects[stateId].common.custom !== null && typeof fetchedObjects[stateId].common.custom[namespace] !== udef && fetchedObjects[stateId].common.custom[namespace] !== null && typeof fetchedObjects[stateId].common.custom[namespace].invert !== udef && fetchedObjects[stateId].common.custom[namespace].invert == true) {
		if(fetchedStates[stateId] && typeof fetchedStates[stateId].val !== udef && !fetchedStates[stateId].isInverted) switch(typeof fetchedStates[stateId].val){
			case "boolean":
			console.log("Inverting boolean state " + stateId + " from " + fetchedStates[stateId].val + "...");
			fetchedStates[stateId].val = !fetchedStates[stateId].val;
			fetchedStates[stateId].isInverted = true;
			console.log("...to " + fetchedStates[stateId].val);
			break;

			case "number":
			console.log("Inverting number state " + stateId + " from " + fetchedStates[stateId].val + "...");
			if(typeof fetchedObjects[stateId] !== udef && typeof fetchedObjects[stateId].common.min !== udef) var min = fetchedObjects[stateId].common.min;
			if(typeof fetchedObjects[stateId] !== udef && typeof fetchedObjects[stateId].common.custom !== udef && fetchedObjects[stateId].common.custom !== null && typeof fetchedObjects[stateId].common.custom[namespace] !== udef && fetchedObjects[stateId].common.custom[namespace] !== null && typeof fetchedObjects[stateId].common.custom[namespace].min !== udef && fetchedObjects[stateId].common.custom[namespace].min !== "") min = fetchedObjects[stateId].common.custom[namespace].min;
			if(typeof fetchedObjects[stateId] !== udef && typeof fetchedObjects[stateId].common.max !== udef) var max = fetchedObjects[stateId].common.max;
			if(typeof fetchedObjects[stateId] !== udef && typeof fetchedObjects[stateId].common.custom !== udef && fetchedObjects[stateId].common.custom !== null && typeof fetchedObjects[stateId].common.custom[namespace] !== udef && fetchedObjects[stateId].common.custom[namespace] !== null && typeof fetchedObjects[stateId].common.custom[namespace].max !== udef && fetchedObjects[stateId].common.custom[namespace].max !== "") max = fetchedObjects[stateId].common.custom[namespace].max;
			if(typeof min !== udef && typeof max !== udef){
				fetchedStates[stateId].val = max - (fetchedStates[stateId].val - min);
				fetchedStates[stateId].isInverted = true;
				console.log("...to " + fetchedStates[stateId].val);
			} else {
				console.log("...aborted inverting, because min or max is missing");
			}
			break;

			case "string":
			console.log("Inverting string state " + stateId + " is not supported!");
			break;

			default:
			console.log("Inverting state " + stateId + " is impossible - type not known: " + typeof fetchedStates[stateId].val);
		}
	}
	if(preventUpdate[stateId] && fetchedStates[stateId]){
		console.log(">> ack: " + fetchedStates[stateId].ack + " val: " + fetchedStates[stateId].val + " newVal: " + preventUpdate[stateId].newVal);
	}
	if(preventUpdate[stateId] && fetchedStates[stateId] && fetchedStates[stateId].ack && typeof fetchedStates[stateId].val != udef && fetchedStates[stateId].val != null && fetchedStates[stateId].val.toString() == preventUpdate[stateId].newVal.toString()) { //An ack-true value has reached the new value - preventUpdate can be cancelled
		console.log("<< ack-val reached new val: preventUpdate regular ended.");
		$("[data-iQontrol-Device-ID='" + preventUpdate[stateId].deviceIdEscaped + "'] .iQontrolDeviceLoading").removeClass("active");
		clearTimeout(preventUpdate[stateId].timerId);
		delete preventUpdate[stateId];
	}

	// ##### replaces the functions after that
	for(let collectionId in updateFunctions){
		(updateFunctions[collectionId][stateId] || []).forEach(function(updateFunction){
			if(!preventUpdate[stateId] || ignorePreventUpdate == collectionId) {
				updateFunction(stateId);
			}	
		});
	}
	// #####

	if(toolbarUpdateFunctions[stateId]) for (i = 0; i < toolbarUpdateFunctions[stateId].length; i++){
		if(!preventUpdate[stateId] || ignorePreventUpdate == "ignorePreventUpdateForToolbar") {
			toolbarUpdateFunctions[stateId][i](stateId);
		}
	}
	if(viewUpdateFunctions[stateId]) for (i = 0; i < viewUpdateFunctions[stateId].length; i++){
		if(!preventUpdate[stateId] || ignorePreventUpdate) {
			viewUpdateFunctions[stateId][i](stateId);
		}
	}
	if(dialogUpdateFunctions[stateId]) for (i = 0; i < dialogUpdateFunctions[stateId].length; i++){
		if(!preventUpdate[stateId] || ignorePreventUpdate == "ignorePreventUpdateForDialog") {
			dialogUpdateFunctions[stateId][i](stateId);
		}
	}
	if(panelUpdateFunctions[stateId]) for (i = 0; i < panelUpdateFunctions[stateId].length; i++){
		if(!preventUpdate[stateId] || ignorePreventUpdate == "ignorePreventUpdateForPanel") {
			panelUpdateFunctions[stateId][i](stateId);
		}
	}
	if(stateId == namespace + ".Popup.PERSISTENT_MESSAGES_SHOW_ID"){
		popupShowPersistentMessages(fetchedStates[stateId].val);
	}
	if(stateId == namespace + ".Popup.Message" || stateId == namespace + ".Popup.PersistentMessage"){
		var message = {};
		message.message = fetchedStates[stateId].val;
		if(stateId == namespace + ".Popup.PersistentMessage") {
			message.persistentExpires = fetchedStates[namespace + ".Popup.PersistentExpires"] && typeof fetchedStates[namespace + ".Popup.PersistentExpires"].val !== udef && fetchedStates[namespace + ".Popup.PersistentExpires"].val !== null && !isNaN(fetchedStates[namespace + ".Popup.PersistentExpires"].val) && parseInt(fetchedStates[namespace + ".Popup.PersistentExpires"].val) || 0;
			message.persistentUndismissible = fetchedStates[namespace + ".Popup.PersistentUndismissible"] && typeof fetchedStates[namespace + ".Popup.PersistentUndismissible"].val !== udef && fetchedStates[namespace + ".Popup.PersistentUndismissible"].val || false;
			message.persistentId = fetchedStates[namespace + ".Popup.PersistentId"] && typeof fetchedStates[namespace + ".Popup.PersistentId"].val !== udef && fetchedStates[namespace + ".Popup.PersistentId"].val || "";
		}
		message.duration = fetchedStates[namespace + ".Popup.Duration"] && typeof fetchedStates[namespace + ".Popup.Duration"].val !== udef && fetchedStates[namespace + ".Popup.Duration"].val !== null && !isNaN(fetchedStates[namespace + ".Popup.Duration"].val) && parseInt(fetchedStates[namespace + ".Popup.Duration"].val) || 0;
		message.clickKeepsOpen = fetchedStates[namespace + ".Popup.ClickKeepsOpen"] && typeof fetchedStates[namespace + ".Popup.ClickKeepsOpen"].val !== udef && fetchedStates[namespace + ".Popup.ClickKeepsOpen"].val || false;
		message.clickedValue = fetchedStates[namespace + ".Popup.ClickedValue"] && typeof fetchedStates[namespace + ".Popup.ClickedValue"].val !== udef && fetchedStates[namespace + ".Popup.ClickedValue"].val || "";
		message.clickedDestinationState = fetchedStates[namespace + ".Popup.ClickedDestinationState"] && typeof fetchedStates[namespace + ".Popup.ClickedDestinationState"].val !== udef && fetchedStates[namespace + ".Popup.ClickedDestinationState"].val  || "";
		message.buttonNames = fetchedStates[namespace + ".Popup.ButtonNames"] && typeof fetchedStates[namespace + ".Popup.ButtonNames"].val !== udef && fetchedStates[namespace + ".Popup.ButtonNames"].val || "";
		message.buttonValues = fetchedStates[namespace + ".Popup.ButtonValues"] && typeof fetchedStates[namespace + ".Popup.ButtonValues"].val !== udef && fetchedStates[namespace + ".Popup.ButtonValues"].val || "";
		message.buttonDestinationStates = fetchedStates[namespace + ".Popup.ButtonDestinationStates"] && typeof fetchedStates[namespace + ".Popup.ButtonDestinationStates"].val !== udef && fetchedStates[namespace + ".Popup.ButtonDestinationStates"].val || "";
		message.buttonCloses = fetchedStates[namespace + ".Popup.ButtonCloses"] && typeof fetchedStates[namespace + ".Popup.ButtonCloses"].val !== udef && fetchedStates[namespace + ".Popup.ButtonCloses"].val || "";
		message.buttonClears = fetchedStates[namespace + ".Popup.ButtonClears"] && typeof fetchedStates[namespace + ".Popup.ButtonClears"].val !== udef && fetchedStates[namespace + ".Popup.ButtonClears"].val || "";
		message.ts = null;
		toast(message);
	}
	if(stateId == namespace + ".info.connection" && fetchedStates[stateId] && fetchedStates[stateId].val){
		if(actualDialogId) openDialogId = actualDialogId;
		getStarted();
	}
}

function toggleState(linkedStateId, deviceIdEscaped, callback, preventUpdateTime){
	var state = getStateObject(linkedStateId);
	var deviceReadonly = false;
	if(getDeviceOptionValue(getDevice(unescape(deviceIdEscaped)), "readonly") == "true" && linkedStateId.substr(-12) != "tileEnlarged") deviceReadonly = true;
	if(state && state.readonly == false && deviceReadonly == false){
		switch(state.type){
			case "button":
			setState(linkedStateId, deviceIdEscaped, true, true, callback, preventUpdateTime);
			break;

			case "level":
			var oldVal = state.val;
			var min = state.min || 0;
			var max = state.max || 100;
			var newVal;
			if(oldVal > min) newVal = min; else newVal = max;
			break;

			case "valueList":
			var oldVal = state.val;
			if(oldVal == true || oldVal.toString().toLowerCase() == "true") oldVal = 1;
			if(oldVal == false || oldVal.toString().toLowerCase() == "false") oldVal = 0;
			var min = state.min || 0;
			if(typeof state.valueList !== udef && oldVal + 1 >= Object.keys(state.valueList).length) var newVal = min; else newVal = oldVal + 1;
			break;

			case "switch": default:
			var oldVal = state.val;
			var newVal;
			if(typeof oldVal == 'number'){
				if(oldVal) newVal = 0; else newVal = 1;
			} else {
				if(oldVal.toString().toLowerCase() == "true") newVal = false; else newVal = true;
			}
		}
		if(typeof newVal !== udef) setState(linkedStateId, deviceIdEscaped, newVal, false, callback, preventUpdateTime);
	}
}

function toggleActuator(linkedStateId, linkedDirectionId, linkedStopId, linkedStopSetValueId, linkedUpId, linkedUpSetValueId, linkedDownId, linkedDownSetValueId, linkedFavoritePosition, deviceIdEscaped, callback){
	var state = getStateObject(linkedStateId);
	var direction = getStateObject(linkedDirectionId);
	var stop = getStateObject(linkedStopId);
	var stopSetValue = getStateObject(linkedStopSetValueId);
	var up = getStateObject(linkedUpId);
	var upSetValue = getStateObject(linkedUpSetValueId);
	var down = getStateObject(linkedDownId);
	var downSetValue = getStateObject(linkedDownSetValueId);
	var favoritePosition = getStateObject(linkedFavoritePosition);
	var deviceReadonly = false;
	if(getDeviceOptionValue(getDevice(unescape(deviceIdEscaped)), "readonly") == "true") deviceReadonly = true;
	if(state && state.type == "level" && deviceReadonly == false){
		if(direction && direction.val > 0) { //working
			if(stop) setState(linkedStopId, deviceIdEscaped, ((stopSetValue && typeof stopSetValue.val != udef && stopSetValue.val !== "") ? stopSetValue.val : true), true, callback);
		} else { //standing still
			var oldVal = state.val;
			var min = state.min || 0;
			var max = state.max || 100;
			var newVal;
			if(oldVal > min) newVal = min; else newVal = max;
			if(up && up.type && down && down.type) {
				if(newVal === max){ //go up via up-button
					if(up.readonly == false) setState(linkedUpId, deviceIdEscaped, ((upSetValue && typeof upSetValue.val != udef && upSetValue.val !== "") ? upSetValue.val : true), true, callback);
				} else if(newVal === min) { //go down via down-button
					if(down.readonly == false) setState(linkedDownId, deviceIdEscaped, ((downSetValue && typeof downSetValue.val != udef && downSetValue.val !== "") ? downSetValue.val : true), true, callback);
				}
			} else { //go up or down via state level
				if(state.readonly == false) setState(linkedStateId, deviceIdEscaped, newVal, false, callback);
			}
		}
	} else if(callback) callback();
}

function toggleMedia(linkedStateId, deviceIdEscaped, callback){
	var deviceId = unescape(deviceIdEscaped);
	var device = getDevice(deviceId);
	if(getDeviceOptionValue(device, "togglePowerSwitch") == "true"){ //toggle POWER_SWITCH
		var linkedPowerSwitchId = getLinkedStateId(device,deviceId,"POWER_SWITCH");
		toggleState(linkedPowerSwitchId, deviceIdEscaped, callback);
	} else { //toggle STATE
		var state = getStateObject(linkedStateId);
		var statePlayValue = getDeviceOptionValue(device, "statePlayValue") || "play";
		var statePauseValue = getDeviceOptionValue(device, "statePauseValue") || "pause";
		var stateStopValue = getDeviceOptionValue(device, "stateStopValue") || "stop";
		var useStateValuesForPlayPauseStop = getDeviceOptionValue(device, "useStateValuesForPlayPauseStop") == "true";
		var deviceReadonly = (getDeviceOptionValue(device, "readonly") == "true");
		if(state && deviceReadonly == false){
			var linkedPlayId = getLinkedStateId(device, deviceId, "PLAY");
			var linkedPauseId = getLinkedStateId(device, deviceId,"PAUSE");
			var linkedStopId = getLinkedStateId(device, deviceId,"STOP");
			var statePlay = getStateObject(linkedPlayId);
			var statePause = getStateObject(linkedPauseId);
			var stateStop = getStateObject(linkedStopId);
			if(state && typeof state.val !== udef && ((typeof state.val == "boolean" && state.val) || state.val == statePlayValue)){ //Play
				if(statePause && statePause.type) {
					setState(linkedPauseId, deviceIdEscaped, (useStateValuesForPlayPauseStop ? statePauseValue : true), true);
				} else if(stateStop && stateStop.type) {
					setState(linkedStopId, deviceIdEscaped, (useStateValuesForPlayPauseStop ? stateStopValue : true), true);
				}
			} else if(state && typeof state.val !== udef && ((typeof state.val == "boolean" && !state.val) || state.val == statePauseValue)){ //Pause
				if(statePlay && statePlay.type) {
					setState(linkedPlayId, deviceIdEscaped, (useStateValuesForPlayPauseStop ? statePlayValue : true), true);
				}
			} else if(state && typeof state.val !== udef && state.val == stateStopValue){ //Stop
				if(statePlay && statePlay.type) {
					setState(linkedPlayId, deviceIdEscaped, (useStateValuesForPlayPauseStop ? statePlayValue : true), true);
				}
			} else { //Undefined
			}
		}
	}
}

function toggleScene(linkedStateId, deviceIdEscaped, callback){
	var state = getStateObject(linkedStateId);
	var deviceReadonly = false;
	if(getDeviceOptionValue(getDevice(unescape(deviceIdEscaped)), "readonly") == "true") deviceReadonly = true;
	if(state && state.readonly == false && deviceReadonly == false){
		if(getDeviceOptionValue(getDevice(unescape(deviceIdEscaped)), "alwaysSendTrue") == "true") { //Always send true enabled
			setState(linkedStateId, deviceIdEscaped, true, true, callback);
		} else if(fetchedObjects[linkedStateId] && typeof fetchedObjects[linkedStateId].native !== udef && typeof fetchedObjects[linkedStateId].native.virtualGroup !== udef && fetchedObjects[linkedStateId].native.virtualGroup == true){ //ioBroker-Virtual Group
			if(state.val.toString().toLowerCase() == "true") setState(linkedStateId, deviceIdEscaped, false, true, callback); // true -> false
			else if(state.val.toString().toLowerCase() == "false") setState(linkedStateId, deviceIdEscaped, true, true, callback); // false -> true
			else if(state.val.toString().toLowerCase() == "uncertain") setState(linkedStateId, deviceIdEscaped, false, true, callback); // uncertain -> false
			else if(typeof state.val == "number" && state.val <= 0) setState(linkedStateId, deviceIdEscaped, state.max || 100, true, callback); // 0 -> max || 100
			else if(typeof state.val == "number") setState(linkedStateId, deviceIdEscaped, state.min || 0, true, callback); // number > 0 -> min || 0
			else setState(linkedStateId, deviceIdEscaped, true, true, callback); // else -> true
		} else if(fetchedObjects[linkedStateId] && typeof fetchedObjects[linkedStateId].native !== udef && typeof fetchedObjects[linkedStateId].native.onFalse !== udef){ //ioBroker-Scene
			if(typeof fetchedObjects[linkedStateId].native.onFalse.enabled !== udef && fetchedObjects[linkedStateId].native.onFalse.enabled == true){ //ioBroker-Scene with enabled onFalse
				if(state.val.toString().toLowerCase() == "true") setState(linkedStateId, deviceIdEscaped, false, true, callback); // true -> false
				else if(state.val.toString().toLowerCase() == "false") setState(linkedStateId, deviceIdEscaped, true, true, callback); // false -> true
				else if(state.val.toString().toLowerCase() == "uncertain") setState(linkedStateId, deviceIdEscaped, false, true, callback); // uncertain -> false
				else if(typeof state.val == "number" && state.val <= 0) setState(linkedStateId, deviceIdEscaped, state.max || 100, true, callback); // 0 -> max || 100
				else if(typeof state.val == "number") setState(linkedStateId, deviceIdEscaped, state.min || 0, true, callback); // number > 0 -> min || 0
				else setState(linkedStateId, deviceIdEscaped, true, true, callback); // else -> true
			} else { //ioBroker-Scene with disabled onFalse
				if(typeof state.val == "number" && state.val <= 0) setState(linkedStateId, deviceIdEscaped, state.max || 100, true, callback); // 0 -> max || 100
				else if(typeof state.val == "number") setState(linkedStateId, deviceIdEscaped, state.min || 0, true, callback); // number > 0 -> min || 0
				else setState(linkedStateId, deviceIdEscaped, true, true, callback); // else -> true
			}
		} else { //Any other
			toggleState(linkedStateId, deviceIdEscaped, callback)
		}
	}
}

function startProgram(linkedStateId, deviceIdEscaped, callback){
	if(linkedStateId){
		setState(linkedStateId, deviceIdEscaped, true, true, callback);
	}
}

function startButton(linkedStateId, linkedSetValueId, linkedOffSetValueId, returnToOffSetValueAfter, deviceIdEscaped, callback){
	if(returnToOffSetValueAfter == 0){
		if(fetchedStates[linkedStateId].val  == (fetchedStates[linkedSetValueId] && fetchedStates[linkedSetValueId].val || true)){
			var newValue = (fetchedStates[linkedOffSetValueId] && fetchedStates[linkedOffSetValueId].val) || false;
		} else {
			var newValue = (fetchedStates[linkedSetValueId] && fetchedStates[linkedSetValueId].val) || true;
		}
		console.log("Button " + linkedStateId + " --> " + newValue);
		(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
			var _linkedStateId = linkedStateId;
			var _deviceIdEscaped = deviceIdEscaped;
			var _linkedOffSetValueId = linkedOffSetValueId;
			var _newOffSetValue = (fetchedStates[linkedOffSetValueId] && fetchedStates[linkedOffSetValueId].val) || "";
			var _returnToOffSetValueAfter = returnToOffSetValueAfter;
			setState(_linkedStateId, _deviceIdEscaped, newValue, true);
		})(); //<--End Closure
	} else {
		var newValue = fetchedStates[linkedSetValueId] && fetchedStates[linkedSetValueId].val || "";
		console.log("Button " + linkedStateId + " --> " + newValue);
		(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
			var _linkedStateId = linkedStateId;
			var _deviceIdEscaped = deviceIdEscaped;
			var _linkedOffSetValueId = linkedOffSetValueId;
			var _newOffSetValue = (fetchedStates[linkedOffSetValueId] && fetchedStates[linkedOffSetValueId].val) || "";
			var _returnToOffSetValueAfter = returnToOffSetValueAfter;
			setState(_linkedStateId, _deviceIdEscaped, newValue, true, function(){
				if(fetchedStates[_linkedOffSetValueId] && fetchedStates[_linkedOffSetValueId].val && fetchedStates[_linkedOffSetValueId].val !== "") {
					setTimeout(function(){
						console.log("Button " + _linkedStateId + " return --> " + _newOffSetValue);
						setStateWithoutVerification(_linkedStateId, _deviceIdEscaped, _newOffSetValue, false);
					}, (_returnToOffSetValueAfter || 100) * 1);
				}

			});
		})(); //<--End Closure
	}
}

//++++++++++ HELPERS: GENERAL FUNCTIONS ++++++++++
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function getUrlParameterFromUrl(url, name) {
	if(url.split('?').length != 2) return;
	var search = url.split('?')[1];
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function addCustomCSS(customCSS, customID){
	customID = customID || "default";
	$('head').append('<style class="customCSS_' + customID + '">' + customCSS + '</style>');
}

function removeCustomCSS(customID){
	customID = customID || "default";
	$('.customCSS_' + customID).remove();
}

function removeDuplicates(array) { //Removes duplicates from an array
    var seen = {};
    return array.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function md5(inputString) {
    var hc="0123456789abcdef";
    function rh(n) {var j,s="";for(j=0;j<=3;j++) s+=hc.charAt((n>>(j*8+4))&0x0F)+hc.charAt((n>>(j*8))&0x0F);return s;}
    function ad(x,y) {var l=(x&0xFFFF)+(y&0xFFFF);var m=(x>>16)+(y>>16)+(l>>16);return (m<<16)|(l&0xFFFF);}
    function rl(n,c)            {return (n<<c)|(n>>>(32-c));}
    function cm(q,a,b,x,s,t)    {return ad(rl(ad(ad(a,q),ad(x,t)),s),b);}
    function ff(a,b,c,d,x,s,t)  {return cm((b&c)|((~b)&d),a,b,x,s,t);}
    function gg(a,b,c,d,x,s,t)  {return cm((b&d)|(c&(~d)),a,b,x,s,t);}
    function hh(a,b,c,d,x,s,t)  {return cm(b^c^d,a,b,x,s,t);}
    function ii(a,b,c,d,x,s,t)  {return cm(c^(b|(~d)),a,b,x,s,t);}
    function sb(x) {
        var i;var nblk=((x.length+8)>>6)+1;var blks=new Array(nblk*16);for(i=0;i<nblk*16;i++) blks[i]=0;
        for(i=0;i<x.length;i++) blks[i>>2]|=x.charCodeAt(i)<<((i%4)*8);
        blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=x.length*8;return blks;
    }
    var i,x=sb(inputString),a=1732584193,b=-271733879,c=-1732584194,d=271733878,olda,oldb,oldc,oldd;
    for(i=0;i<x.length;i+=16) {olda=a;oldb=b;oldc=c;oldd=d;
        a=ff(a,b,c,d,x[i+ 0], 7, -680876936);d=ff(d,a,b,c,x[i+ 1],12, -389564586);c=ff(c,d,a,b,x[i+ 2],17,  606105819);
        b=ff(b,c,d,a,x[i+ 3],22,-1044525330);a=ff(a,b,c,d,x[i+ 4], 7, -176418897);d=ff(d,a,b,c,x[i+ 5],12, 1200080426);
        c=ff(c,d,a,b,x[i+ 6],17,-1473231341);b=ff(b,c,d,a,x[i+ 7],22,  -45705983);a=ff(a,b,c,d,x[i+ 8], 7, 1770035416);
        d=ff(d,a,b,c,x[i+ 9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,     -42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
        a=ff(a,b,c,d,x[i+12], 7, 1804603682);d=ff(d,a,b,c,x[i+13],12,  -40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);
        b=ff(b,c,d,a,x[i+15],22, 1236535329);a=gg(a,b,c,d,x[i+ 1], 5, -165796510);d=gg(d,a,b,c,x[i+ 6], 9,-1069501632);
        c=gg(c,d,a,b,x[i+11],14,  643717713);b=gg(b,c,d,a,x[i+ 0],20, -373897302);a=gg(a,b,c,d,x[i+ 5], 5, -701558691);
        d=gg(d,a,b,c,x[i+10], 9,   38016083);c=gg(c,d,a,b,x[i+15],14, -660478335);b=gg(b,c,d,a,x[i+ 4],20, -405537848);
        a=gg(a,b,c,d,x[i+ 9], 5,  568446438);d=gg(d,a,b,c,x[i+14], 9,-1019803690);c=gg(c,d,a,b,x[i+ 3],14, -187363961);
        b=gg(b,c,d,a,x[i+ 8],20, 1163531501);a=gg(a,b,c,d,x[i+13], 5,-1444681467);d=gg(d,a,b,c,x[i+ 2], 9,  -51403784);
        c=gg(c,d,a,b,x[i+ 7],14, 1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);a=hh(a,b,c,d,x[i+ 5], 4,    -378558);
        d=hh(d,a,b,c,x[i+ 8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16, 1839030562);b=hh(b,c,d,a,x[i+14],23,  -35309556);
        a=hh(a,b,c,d,x[i+ 1], 4,-1530992060);d=hh(d,a,b,c,x[i+ 4],11, 1272893353);c=hh(c,d,a,b,x[i+ 7],16, -155497632);
        b=hh(b,c,d,a,x[i+10],23,-1094730640);a=hh(a,b,c,d,x[i+13], 4,  681279174);d=hh(d,a,b,c,x[i+ 0],11, -358537222);
        c=hh(c,d,a,b,x[i+ 3],16, -722521979);b=hh(b,c,d,a,x[i+ 6],23,   76029189);a=hh(a,b,c,d,x[i+ 9], 4, -640364487);
        d=hh(d,a,b,c,x[i+12],11, -421815835);c=hh(c,d,a,b,x[i+15],16,  530742520);b=hh(b,c,d,a,x[i+ 2],23, -995338651);
        a=ii(a,b,c,d,x[i+ 0], 6, -198630844);d=ii(d,a,b,c,x[i+ 7],10, 1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);
        b=ii(b,c,d,a,x[i+ 5],21,  -57434055);a=ii(a,b,c,d,x[i+12], 6, 1700485571);d=ii(d,a,b,c,x[i+ 3],10,-1894986606);
        c=ii(c,d,a,b,x[i+10],15,   -1051523);b=ii(b,c,d,a,x[i+ 1],21,-2054922799);a=ii(a,b,c,d,x[i+ 8], 6, 1873313359);
        d=ii(d,a,b,c,x[i+15],10,  -30611744);c=ii(c,d,a,b,x[i+ 6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21, 1309151649);
        a=ii(a,b,c,d,x[i+ 4], 6, -145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+ 2],15,  718787259);
        b=ii(b,c,d,a,x[i+ 9],21, -343485551);a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
    }
    return rh(a)+rh(b)+rh(c)+rh(d);
}

function checkCondition(value, condition, conditionValue){
	value = value || 0;
	switch(condition){
		case "at":
		return true;
		break;

		case "af":
		return false;
		break;

		case "eqt":
		if(value.toString().toLowerCase() == "false" || value.toString().toLowerCase() == "0" || value.toString().toLowerCase() == "-1" || value.toString().toLowerCase() == ""){
			return false;
		} else {
			return true;
		}
		break;

		case "eqf":
		if(value.toString().toLowerCase() == "false" || value.toString().toLowerCase() == "0" || value.toString().toLowerCase() == "-1" || value.toString().toLowerCase() == ""){
			return true;
		} else {
			return false;
		}
		break;

		case "eq":
		if(value.toString().toLowerCase() == conditionValue.toString().toLowerCase()){
			return true;
		} else {
			return false;
		}
		break;

		case "ne":
		if(value.toString().toLowerCase() == conditionValue.toString().toLowerCase()){
			return false;
		} else {
			return true;
		}
		break;

		case "gt":
		if(!isNaN(value) && !isNaN(conditionValue) && parseFloat(value) > parseFloat(conditionValue)){
			return true;
		} else {
			return false;
		}
		break;

		case "ge":
		if(!isNaN(value) && !isNaN(conditionValue) && parseFloat(value) >= parseFloat(conditionValue)){
			return true;
		} else {
			return false;
		}
		break;

		case "lt":
		if(!isNaN(value) && !isNaN(conditionValue) && parseFloat(value) < parseFloat(conditionValue)){
			return true;
		} else {
			return false;
		}
		break;

		case "le":
		if(!isNaN(value) && !isNaN(conditionValue) && parseFloat(value) <= parseFloat(conditionValue)){
			return true;
		} else {
			return false;
		}
		break;

		default:
		return null;
	}
	return null;
}

function capitalize(string){ //Makes first char uppercase
	if(typeof string !== 'string') return '';
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function tryParseJSON(jsonString){ //Returns parsed object or false, if jsonString is not valid
	if(typeof jsonString == udef) return false;
    try {
        var o = JSON.parse(jsonString);
        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object",
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if(o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }
    return false;
};

function objectsEqual(obj1, obj2, ignoreKeys){ //Returns true, if two objects are equal (regardless of keys order)
	if(typeof ignoreKeys == udef) ignoreKeys = []; else if(!Array.isArray(ignoreKeys)) ignoreKeys = new Array(x);
	var sortedObj1 = JSON.stringify(Object.keys(obj1).filter(function(key){ return ignoreKeys.indexOf(key) == -1; }).sort().reduce(function(acc, key){
		acc[key] = obj1[key];
		return acc;
	}, {}));
	var sortedObj2 = JSON.stringify(Object.keys(obj2).filter(function(key){ return ignoreKeys.indexOf(key) == -1; }).sort().reduce(function(acc, key){
		acc[key] = obj2[key];
		return acc;
	}, {}));
	return sortedObj1 === sortedObj2;
}

function getObjectValue(obj, keyPath, defaultValue, defaultIfNull, defaultIfEmptyString){
	var keys = keyPath.split('.');
	var accumulateKeys = [];
	var last = null;
	var current = obj;
	keys.forEach(function(key, keyIndex){
		if(current === null && i < keys.length){
			return (typeof defaultValue !== udef ? defaultValue : undefined);
		} else if(typeof current == udef){
			accumulateKeys.push(key);
			current = last[accumulateKeys.join('.')];
		} else {
			accumulateKeys = [key];
			last = current;
			current = current[key];
		}
	});
	if(typeof current == udef && typeof defaultValue !== udef) return defaultValue;
	if(current === null && typeof defaultValue !== udef && defaultIfNull) return defaultValue;
	if(current === "" && typeof defaultValue !== udef && defaultIfEmptyString) return defaultValue;
	return current;
}

function isHTML(testString){
	return /<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/i.test(testString);
}

function dragElement(dragElementId, dragHandleId, cursor, resize, setMaxHeightElementId, setMaxHeightOffset) { //Makes an element draggable
	var dragElement = document.getElementById(dragElementId);
	if(!dragElement) return;
	dragHandle = document.getElementById(dragHandleId);
	if(!dragHandle) dragHandle = dragElement;
	if(cursor === true) if(resize) cursor = 'nw-resize'; else cursor = 'move';
	if(cursor) dragHandle.style.cursor = cursor;
	var posMoveX = 0, posMoveY = 0;
	var posOldX = 0, posOldY = 0;
	var posOffsetX = 0, posOffsetY = 0;
	var iframeStylePointerEvent;
	// otherwise, move the DIV from anywhere inside the DIV:
	dragHandle.addEventListener('mousedown', dragStart);
	dragHandle.addEventListener('touchstart', dragStart, (supportsPassive ? { passive: true } : false));
	function dragStart(e) {
		console.log("DRAG START");
		e = e || window.event;
		e.preventDefault();
		// Disable pointer-events for iframes
		if(dragElement.tagName = "IFRAME"){
			iframeStylePointerEvent = dragElement.style.pointerEvents;
			dragElement.style.pointerEvents = 'none';
		}
		// get the mouse cursor position at startup:
		posOldX = e.clientX || e.touches[0].clientX;
		posOldY = e.clientY || e.touches[0].clientY;
		posOffsetX = 0;
		posOffsetY = 0;
		document.addEventListener('mouseup', dragStop);
		document.addEventListener('touchend', dragStop);
		// call a function whenever the cursor moves:
		document.addEventListener('mousemove', dragMove);
		document.addEventListener('touchmove', dragMove);
	}
	function dragMove(e) {
		//console.log("DRAG MOVE");
		e = e || window.event;
		//e.preventDefault();
		if(!e.buttons && !e.touches) {
			dragStop();
			return;
		}
		// calculate the new cursor position:
		posMoveX = posOldX - (e.clientX || e.touches[0].clientX);
		posMoveY = posOldY - (e.clientY || e.touches[0].clientY);
		posOldX = e.clientX || e.touches[0].clientX;
		posOldY = e.clientY || e.touches[0].clientY;
		// set the element's new position:
		if(resize){
			if(posMoveX != 0){
				var tempPosX = dragElement.clientWidth;
				dragElement.style.width = (dragElement.clientWidth - posMoveX - posOffsetX) + "px";
				if(dragElement.clientWidth == tempPosX) posOffsetX = posOffsetX + posMoveX; else posOffsetX = 0;
			}
			if(posMoveY != 0){
				var tempPosY = dragElement.clientHeight;
				dragElement.style.height = (dragElement.clientHeight - posMoveY - posOffsetY) + "px";
				if(dragElement.clientHeight == tempPosY) posOffsetY = posOffsetY + posMoveY; else posOffsetY = 0;
			}
		} else {
			dragElement.style.left = (dragElement.offsetLeft - posMoveX) + "px";
			dragElement.style.top = (dragElement.offsetTop - posMoveY) + "px";
			if(setMaxHeightElementId) {
				var setMaxHeightElement = document.getElementById(setMaxHeightElementId);
				if(setMaxHeightElement) setMaxHeightElement.style.maxHeight = "calc(100vh - " + (dragElement.offsetTop - posMoveY - window.scrollY + setMaxHeightOffset) + "px)";
			}
		}
	}
	function dragStop() {
		// stop moving when mouse button is released:
		console.log("DRAG END");
		document.removeEventListener('mouseup', dragStop);
		document.removeEventListener('touchend', dragStop);
		document.removeEventListener('mousemove', dragMove);
		document.removeEventListener('touchmove', dragMove);
		// Reenable pointer-events for iframes
		if(dragElement.tagName = "IFRAME"){
			dragElement.style.pointerEvents = iframeStylePointerEvent;
		}
	}
}

function collapsibleAnimatedInit(){ // jQuery Tweak: Add class="collapsibleAnimated" to all divs with data-role="collapsible". For collapsible-sets use class="ui-collapsible-set" instead of data-role "collapsibleset"
	$(".collapsibleAnimated .ui-collapsible-content:not(.ui-collapsible-content-collapsed)").css('display', 'block');
	$(".collapsibleAnimated .ui-collapsible-content.ui-collapsible-content-collapsed").css('display', 'none');
	$(".collapsibleAnimated .ui-collapsible-heading-toggle").off("click").on("click", function (e) {
		var current = $(this).closest(".ui-collapsible");
		if(current.hasClass("ui-collapsible-collapsed")) {
			// collapse all others
			if(current.parent("div").hasClass("ui-collapsible-set")) current.parent("div").children(".ui-collapsible").not(".ui-collapsible-collapsed").find(".ui-collapsible-heading-toggle").click();
			// and then expand this one
			//$(".ui-collapsible-content", current).slideDown(300);
			current.children(".ui-collapsible-content").slideDown(300);
		} else {
			//$(".ui-collapsible-content", current).slideUp(300);
			current.children(".ui-collapsible-content").slideUp(300);
		}
	});
}

function secondsToHHMMSS(seconds){
	if(isNaN(seconds)) return seconds;
	var sec_num = parseInt(seconds, 10);
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);
	if(hours   < 10) {hours   = "0"+hours;}
	if(minutes < 10) {minutes = "0"+minutes;}
	if(seconds < 10) {seconds = "0"+seconds;}
	if(hours == "00") return minutes + ':' + seconds; else return hours + ':' + minutes + ':' + seconds;
}

function getTimeFromHMTimeCode(HMTimeCode){
	if(typeof HMTimeCode == udef) return udef;
	//Decodes Homematic Timecode (for example in PARTY_START_TIME)
	var HMTimeCodeTable = [0,30,60,90,120,150,180,210,240,14,44,74,104,134,164,194,224,254,28,58,88,118,148,178,208,238,268,42,72,102,132,162,192,222,252,282,56,86,116,146,176,206,236,266,296,70,100,130];
	var MinutesSinceMidnight = HMTimeCode;
	if(HMTimeCodeTable.indexOf(1 * HMTimeCode) >= 0) MinutesSinceMidnight = 30 * HMTimeCodeTable.indexOf(1 * HMTimeCode);
	var Hour = Math.floor(MinutesSinceMidnight / 60);
	var Minutes = MinutesSinceMidnight - (Hour * 60);
	return Hour + ":" + Minutes;
}

function colorTemperatureToRGB(value,  min,  max, invertCt){
	var rgbWW = {r: 255, g: 204, b: 82};
	var rgbCW = {r: 174, g: 228, b: 255};
	value = (Math.max(min, Math.min(value, max)) - min) / (max - min); //0...1
	if(invertCt) value = 1 - value;
	if(value >0.5){
		var rgb = {r: rgbWW.r + (((1-value)/0.5) * 255), g: rgbWW.g + (((1-value)/0.5) * 255), b: rgbWW.b + (((1-value)/0.5) * 255)};
	} else {
		var rgb = {r: rgbCW.r + ((value/0.5) * 255), g: rgbCW.g + ((value/0.5) * 255), b: rgbCW.b + ((value/0.5) * 255)};
	}
	return rgb;
}

function convertToAlternativeColorspace(device, linkedHueId, linkedSaturationId, linkedColorBrightnessId, linkedCtId, linkedWhiteBrightnessId, linkedAlternativeColorspaceValueId, overwrite){
	var invertCt = false;
	if(getDeviceOptionValue(device, "invertCt") == "true") invertCt = !invertCt;
	var alternativeColorspace = getDeviceOptionValue(device, "alternativeColorspace") || "";
	var alternativeColorspaceResult = convertFromAlternativeColorspace(device, linkedAlternativeColorspaceValueId, linkedHueId, linkedSaturationId, linkedColorBrightnessId, linkedCtId, linkedWhiteBrightnessId);
	var hue = null;
	var stateHue = getStateObject(linkedHueId);
	if(stateHue && typeof stateHue.val != udef) {
		var hueMin = stateHue.min || 0;
		var hueMax = stateHue.max || 359;
		hue = ((stateHue.val - hueMin) / (hueMax - hueMin)) * 359;
	} else if(alternativeColorspaceResult.hue !== null) hue = alternativeColorspaceResult.hue;
	var	saturation = null;
	var stateSaturation = getStateObject(linkedSaturationId);
	if(stateSaturation && typeof stateSaturation.val != udef) {
		var saturationMin = stateSaturation.min || 0;
		var saturationMax = stateSaturation.max || 100;
		saturation = ((stateSaturation.val - saturationMin) / (saturationMax - saturationMin)) * 100;
	} else if(alternativeColorspaceResult.saturation !== null) saturation = alternativeColorspaceResult.saturation;
	var	colorBrightness = null;
	var stateColorBrightness = getStateObject(linkedColorBrightnessId);
	if(stateColorBrightness && typeof stateColorBrightness.val != udef) {
		var colorBrightnessMin = stateColorBrightness.min || 0;
		var colorBrightnessMax = stateColorBrightness.max || 100;
		colorBrightness = ((stateColorBrightness.val - colorBrightnessMin) / (colorBrightnessMax - colorBrightnessMin)) * 100;
	} else if(alternativeColorspaceResult.colorBrightness !== null) colorBrightness = alternativeColorspaceResult.colorBrightness;
	var	ct = null;
	var stateCt = getStateObject(linkedCtId);
	if(stateCt && typeof stateCt.val != udef) {
		var ctMin = stateCt.min || 0;
		var ctMax = stateCt.max || 100;
		ct = ((stateCt.val - ctMin) / (ctMax - ctMin)) * 100;
	} else if(alternativeColorspaceResult.ct !== null) ct = alternativeColorspaceResult.ct;
	var	whiteBrightness = null;
	var stateWhiteBrightness = getStateObject(linkedWhiteBrightnessId);
	if(stateWhiteBrightness && typeof stateWhiteBrightness.val != udef) {
		var whiteBrightnessMin = stateWhiteBrightness.min || 0;
		var whiteBrightnessMax = stateWhiteBrightness.max || 100;
		whiteBrightness = ((stateWhiteBrightness.val - whiteBrightnessMin) / (whiteBrightnessMax - whiteBrightnessMin)) * 100;
	} else if(alternativeColorspaceResult.whiteBrightness !== null) whiteBrightness = alternativeColorspaceResult.whiteBrightness;
	if(overwrite && Array.isArray(overwrite)) overwrite.forEach(function(element){
		if(typeof element.type !== udef && element.val !== udef) switch(element.type){
			case "hue": hue = element.val; break;
			case "saturation": saturation = element.val; break;
			case "colorBrightness": colorBrightness = element.val; break;
			case "ct": ct = element.val; break;
			case "whiteBrightness": whiteBrightness = element.val; break;
		}
	});
	console.log("Converting H|S|B/CT|B from " + hue + "|" + saturation + "|" + colorBrightness + "/" + ct + "|" + whiteBrightness + " to " + alternativeColorspace + "...");
	var alternativeColorspaceValue = null;
	switch(alternativeColorspace){
		case "RGB": case "#RGB":
		if(hue == null) break;
		var rgb = hsvToRgb(hue, (saturation == null?100:saturation), (colorBrightness == null?100:colorBrightness));
		alternativeColorspaceValue = (("0" + Math.round(rgb.r).toString(16)).slice(-2)) + (("0" + Math.round(rgb.g).toString(16)).slice(-2)) + (("0" + Math.round(rgb.b).toString(16)).slice(-2));
		break;

		case "RGBW": case "#RGBW":
		if(hue == null) break;
		var rgb = hsvToRgb(hue, (saturation == null?100:saturation), (colorBrightness == null?100:colorBrightness));
		alternativeColorspaceValue = (("0" + Math.round(rgb.r).toString(16)).slice(-2)) + (("0" + Math.round(rgb.g).toString(16)).slice(-2)) + (("0" + Math.round(rgb.b).toString(16)).slice(-2)) + (("0" + Math.round(whiteBrightness/100 * 255).toString(16)).slice(-2));
		break;

		case "RGBCWWW": case "#RGBCWWW":
		invertCt = !invertCt;
		case "RGBWWCW": case "#RGBWWCW":
		if(hue == null || ct == null) break;
		var rgb = hsvToRgb(hue, (saturation == null?100:saturation), (colorBrightness == null?100:colorBrightness));
		if(!invertCt){
			var w1 = ct/100 * whiteBrightness/100 * 255;
			var w2 = (100-ct)/100 * whiteBrightness/100 * 255;
		} else {
			var w2 = ct/100 * whiteBrightness/100 * 255;
			var w1 = (100-ct)/100 * whiteBrightness/100 * 255;
		}
		alternativeColorspaceValue = (("0" + Math.round(rgb.r).toString(16)).slice(-2)) + (("0" + Math.round(rgb.g).toString(16)).slice(-2)) + (("0" + Math.round(rgb.b).toString(16)).slice(-2)) + (("0" + Math.round(w1).toString(16)).slice(-2)) + (("0" + Math.round(w2).toString(16)).slice(-2));
		break;

		case "RGB_HUEONLY": case "#RGB_HUEONLY":
		if(hue == null) break;
		var rgb = hsvToRgb(hue, 100, 100);
		alternativeColorspaceValue = (("0" + Math.round(rgb.r).toString(16)).slice(-2)) + (("0" + Math.round(rgb.g).toString(16)).slice(-2)) + (("0" + Math.round(rgb.b).toString(16)).slice(-2));
		break;

		case "HUE_MILIGHT":
		if(hue == null) break;
		alternativeColorspaceValue = Math.round(modulo(66 - (hue / 3.60), 100) * 2.55);
		break;

		case "HHSSBB_TUYA":
		if(hue == null) break;
		alternativeColorspaceValue = ("0000" + hue.toString(16)).slice(-4) + ("0000" + (saturation == null ? 1000 : saturation * 10).toString(16)).slice(-4) + ("0000" + (colorBrightness == null ? 1000 : colorBrightness * 10).toString(16)).slice(-4);
		break;
	}
	if(alternativeColorspaceValue !== null && alternativeColorspace.substring(0, 1) == "#") alternativeColorspaceValue = "#" + alternativeColorspaceValue;
	console.log("...result is " + alternativeColorspaceValue);
	return alternativeColorspaceValue;
}

function convertFromAlternativeColorspace(device, linkedAlternativeColorspaceValueId, linkedHueId, linkedSaturationId, linkedColorBrightnessId, linkedCtId, linkedWhiteBrightnessId){
	var alternativeColorspaceValue = fetchedStates[linkedAlternativeColorspaceValueId].val || "";
	var invertCt = false;
	if(getDeviceOptionValue(device, "invertCt") == "true") invertCt = !invertCt;
	var alternativeColorspace = getDeviceOptionValue(device, "alternativeColorspace") || "";
	console.log("Converting " + alternativeColorspace + " from " + alternativeColorspaceValue + " to H|S|B/CT|B...");
	if(alternativeColorspaceValue.toString().substring(0, 1) == "#") alternativeColorspaceValue = alternativeColorspaceValue.substring(1);
	var result = {hue: null, saturation: null, colorBrightness: null, ct: null, whiteBrightness: null};
	var r, g, b, w, ww, cw;
	switch(alternativeColorspace){
		case "RGB": case "#RGB": case "RGB_HUEONLY": case "#RGB_HUEONLY":
		if(alternativeColorspaceValue.length <= 3){
			r = +("0x" + alternativeColorspaceValue[0] + alternativeColorspaceValue[0]);
			g = +("0x" + alternativeColorspaceValue[1] + alternativeColorspaceValue[1]);
			b = +("0x" + alternativeColorspaceValue[2] + alternativeColorspaceValue[2]);
		} else {
			r = +("0x" + alternativeColorspaceValue[0] + alternativeColorspaceValue[1]);
			g = +("0x" + alternativeColorspaceValue[2] + alternativeColorspaceValue[3]);
			b = +("0x" + alternativeColorspaceValue[4] + alternativeColorspaceValue[5]);
		}
		var hsv = rgbToHsv(r, g, b);
		result.hue = hsv.h;
		result.saturation = hsv.s;
		result.colorBrightness = hsv.v;
		break;

		case "RGBW": case "#RGBW":
		if(alternativeColorspaceValue.length <= 4){
			r = +("0x" + alternativeColorspaceValue[0] + alternativeColorspaceValue[0]);
			g = +("0x" + alternativeColorspaceValue[1] + alternativeColorspaceValue[1]);
			b = +("0x" + alternativeColorspaceValue[2] + alternativeColorspaceValue[2]);
			w = +("0x" + alternativeColorspaceValue[3] + alternativeColorspaceValue[3]);
		} else {
			r = +("0x" + alternativeColorspaceValue[0] + alternativeColorspaceValue[1]);
			g = +("0x" + alternativeColorspaceValue[2] + alternativeColorspaceValue[3]);
			b = +("0x" + alternativeColorspaceValue[4] + alternativeColorspaceValue[5]);
			w = +("0x" + alternativeColorspaceValue[6] + alternativeColorspaceValue[7]);
		}
		var hsv = rgbToHsv(r, g, b);
		result.hue = hsv.h;
		result.saturation = hsv.s;
		result.colorBrightness = hsv.v;
		result.whiteBrightness = w / 2.55;
		break;

		case "RGBCWWW": case "#RGBCWWW":
		invertCt = !invertCt;
		case "RGBWWCW": case "#RGBWWCW":
		if(alternativeColorspaceValue.length <= 5){
			r = +("0x" + alternativeColorspaceValue[0] + alternativeColorspaceValue[0]);
			g = +("0x" + alternativeColorspaceValue[1] + alternativeColorspaceValue[1]);
			b = +("0x" + alternativeColorspaceValue[2] + alternativeColorspaceValue[2]);
			w1 = +("0x" + alternativeColorspaceValue[3] + alternativeColorspaceValue[3]);
			w2 = +("0x" + alternativeColorspaceValue[4] + alternativeColorspaceValue[4]);
		} else {
			r = +("0x" + alternativeColorspaceValue[0] + alternativeColorspaceValue[1]);
			g = +("0x" + alternativeColorspaceValue[2] + alternativeColorspaceValue[3]);
			b = +("0x" + alternativeColorspaceValue[4] + alternativeColorspaceValue[5]);
			w1 = +("0x" + alternativeColorspaceValue[6] + alternativeColorspaceValue[7]);
			w2 = +("0x" + alternativeColorspaceValue[8] + alternativeColorspaceValue[9]);
		}
		var hsv = rgbToHsv(r, g, b);
		result.hue = hsv.h;
		result.saturation = hsv.s;
		result.colorBrightness = hsv.v;
		result.whiteBrightness = (w1 + w2) / 2.55;
		if(!invertCt){
			result.ct = w1/2.55 / result.whiteBrightness * 100;
		} else {
			result.ct = w2/2.55 / result.whiteBrightness * 100;
		}
		break;

		case "HUE_MILIGHT":
		if(alternativeColorspaceValue == "") alternativeColorspaceValue = "0";
		result.hue = Math.round(modulo(-3.60 * (parseFloat(alternativeColorspaceValue/2.55) - 66), 360));
		break;

		case "HHSSBB_TUYA":
		result.hue = parseInt(alternativeColorspaceValue.substr(0, 4) || "0", 16);
		result.saturation = parseInt(alternativeColorspaceValue.substr(4, 4) || "0", 16) / 10;
		result.colorBrightness = parseInt(alternativeColorspaceValue.substr(8, 4) || "0", 16) / 10;
		break;
	}
	if(result.hue != null){
		var stateHue = getStateObject(linkedHueId);
		var hueMin = stateHue && stateHue.min || 0;
		var hueMax = stateHue && stateHue.max || 359;
		result.hue = Math.round((result.hue/359 * (hueMax - hueMin)) + hueMin);
	}
	if(result.saturation != null){
		var stateSaturation = getStateObject(linkedSaturationId);
		var saturationMin = stateSaturation && stateSaturation.min || 0;
		var saturationMax = stateSaturation && stateSaturation.max || 100;
		result.saturation = Math.round((result.saturation/100 * (saturationMax - saturationMin)) + saturationMin);
	}
	if(result.colorBrightness != null){
		var stateColorBrightness = getStateObject(linkedColorBrightnessId);
		var colorBrightnessMin = stateColorBrightness && stateColorBrightness.min || 0;
		var colorBrightnessMax = stateColorBrightness && stateColorBrightness.max || 100;
		result.colorBrightness = Math.round((result.colorBrightness/100 * (colorBrightnessMax - colorBrightnessMin)) + colorBrightnessMin);
	}
	if(result.ct != null){
		var stateCt = getStateObject(linkedCtId);
		var ctMin = stateCt && stateCt.min || 0;
		var ctMax = stateCt && stateCt.max || 100;
		result.ct = Math.round((result.ct/100 * (ctMax - ctMin)) + ctMin);
	}
	if(result.whiteBrightness != null){
		var stateWhiteBrightness = getStateObject(linkedWhiteBrightnessId);
		var whiteBrightnessMin = stateWhiteBrightness && stateWhiteBrightness.min || 0;
		var whiteBrightnessMax = stateWhiteBrightness && stateWhiteBrightness.max || 100;
		result.whiteBrightness = Math.round((result.whiteBrightness/100 * (whiteBrightnessMax - whiteBrightnessMin)) + whiteBrightnessMin);
	}
	console.log("...result is " + result.hue + "|" + result.saturation + "|" + result.colorBrightness + "/" + result.ct + "|" + result.whiteBrightness);
	return result;
}

function hsvToRgb(h, s, v){
	h /= 360, s /= 100, v /= 100;
	var r, g, b;
	var i = Math.floor(h * 6);
	var f = h * 6 - i;
	var p = v * (1 - s);
	var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);
	switch (i % 6) {
		case 0: r = v, g = t, b = p; break;
		case 1: r = q, g = v, b = p; break;
		case 2: r = p, g = v, b = t; break;
		case 3: r = p, g = q, b = v; break;
		case 4: r = t, g = p, b = v; break;
		case 5: r = v, g = p, b = q; break;
	}
	return {r: r * 255, g: g * 255, b: b * 255};
}

function rgbToHsv(r, g, b){
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, v = max;
	var d = max - min;
	if(v == 0) {
		console.log("...result is BLACK...");
		s = null; // black
	} else {
		s = (max == 0 ? 0 : d / max);
	}
	if(max == min) {
		console.log("...result is ACHROMATIC...");
		h = null; // achromatic
	} else {
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}
	return {h: (h == null ? null : h * 360), s: (s == null ? null : s * 100), v: v * 100};
}

function isValidColorString(colorString){
	var style = new Option().style;
	style.color = colorString;
	return (style.color && style.color !== "");
}

function modulo(n, m){
	return ((n % m) + m) %m;
}

function replaceTokens(string, tokenObject){
	string = string.replace(/\[/g, "{[").replace(/\]/g, "]}");
	for(token in tokenObject){
		var re = new RegExp(token.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + "(?![^{]*})", "g");
		//var re = new RegExp(token.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + "(?![^{|\[]*}|\])", "g");
		string = string.replace(re, "{" + tokenObject[token] + "}");
	}
	string = string.replace(/{/g, "").replace(/}/g, "");
	return string;
}

function getTimeFormat(string, anyPickerMode){
	var flagsToken = ["tb", "tn", "to"];
	var flags = [];
	string = translateTextInsideBrackets(string);
	flagsToken.forEach(function(token){
		if(string.indexOf(token) > -1){
			flags.push(token);
			var re = new RegExp(token, "g");
			string = string.replace(re, "");
		}
	});
	var type = "";
	if(anyPickerMode){
		if(string.indexOf("P") == "0"){
			type += "period";
			string = string.substr(1);
		} else {
			if(string.indexOf("y") > -1 && string.indexOf("M") > -1 && string.indexOf("d") > -1) type += "date";
			if(((string.indexOf("h") > -1 && (string.indexOf("a") > -1 || string.indexOf("A") > -1)) || string.indexOf("H") > -1) && string.indexOf("m") > -1) type += "time";
		}
	} else {
		if(string.indexOf("P") == "0"){
			type += "period";
			if(isNaN(string[1]) && string[1] != "T") string = string.substr(1); //Not ISO 8601 Format			
		} else {
			if((string.indexOf("Y") > -1 && string.indexOf("M") > -1 && string.indexOf("D") > -1) || string.indexOf("X") > -1 || string.indexOf("x") > -1 || string.indexOf("L") > -1) type += "date";
			if((((string.indexOf("h") > -1 && (string.indexOf("a") > -1 || string.indexOf("A") > -1)) || string.indexOf("H") > -1) && string.indexOf("m") > -1) || string.indexOf("X") > -1 || string.indexOf("x") > -1 || string.indexOf("LLL") > -1 || string.indexOf("LT") > -1) type += "time";
		}
	}
	return {type: type, flags: flags, string: string};
};

function translateTextInsideBrackets(string){
	return string.replace(/\[[\s\S]*?\]/, function(match){return "[" + _(match.slice(1, match.length -1)) + "]";});
}

//++++++++++ OPTIONS ++++++++++
function handleOptions(){
	if(!options) return;
	var customCSS = "";
	//Toolbar
	if(options.LayoutToolbarFooterColor) {
		customCSS += "#Toolbar.ui-footer{";
		customCSS += "	background-color: " + options.LayoutToolbarFooterColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarFooterOpacity) {
		customCSS += "#Toolbar.ui-footer{";
		customCSS += "	opacity: " + options.LayoutToolbarFooterOpacity + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarBorderColor) {
		customCSS += ".iQontrolToolbarLink.ui-btn:not(.ui-btn-active), .iQontrolToolbarLink.ui-btn.ui-btn-active, .iQontrolToolbarLink.ui-btn:not(.ui-btn-active):hover, .iQontrolToolbarLink.ui-btn.ui-btn-active:hover {";
		customCSS += "	border-color: " + options.LayoutToolbarBorderColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarColor) {
		customCSS += ".iQontrolToolbarLink.ui-btn:not(.ui-btn-active){";
		customCSS += "	background-color: " + options.LayoutToolbarColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarHoverColor) {
		customCSS += ".iQontrolToolbarLink.ui-btn:not(.ui-btn-active):hover{";
		customCSS += "	background-color: " + options.LayoutToolbarHoverColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarTextColor) {
		customCSS += ".iQontrolToolbarLink.ui-btn:not(.ui-btn-active){";
		customCSS += "	color: " + options.LayoutToolbarTextColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarHoverTextColor) {
		customCSS += ".iQontrolToolbarLink.ui-btn:not(.ui-btn-active):hover{";
		customCSS += "	color: " + options.LayoutToolbarHoverTextColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarTextShadowColor) {
		customCSS += ".iQontrolToolbarLink.ui-btn:not(.ui-btn-active){";
		customCSS += "	text-shadow: 0 1px 0 " + options.LayoutToolbarTextShadowColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarHoverTextShadowColor) {
		customCSS += ".iQontrolToolbarLink.ui-btn:not(.ui-btn-active):hover{";
		customCSS += "	text-shadow: 0 1px 0 " + options.LayoutToolbarHoverTextShadowColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarSelectedColor) {
		customCSS += ".iQontrolToolbarLink.ui-btn.ui-btn-active, .iQontrolToolbarLink.ui-btn.ui-btn-active:hover{";
		customCSS += "	background-color: " + options.LayoutToolbarSelectedColor + " !important;";
		customCSS += "	box-shadow: 0 0 12px 1px " + options.LayoutToolbarSelectedColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarSelectedHoverColor) {
		customCSS += ".iQontrolToolbarLink.ui-btn.ui-btn-active:hover{";
		customCSS += "	background-color: " + options.LayoutToolbarSelectedHoverColor + " !important;";
		customCSS += "	box-shadow: 0 0 12px 1px " + options.LayoutToolbarSelectedHoverColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarSelectedTextColor) {
		customCSS += ".iQontrolToolbarLink.ui-btn.ui-btn-active, .iQontrolToolbarLink.ui-btn.ui-btn-active:hover{";
		customCSS += "	color: " + options.LayoutToolbarSelectedTextColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarSelectedHoverTextColor) {
		customCSS += ".iQontrolToolbarLink.ui-btn.ui-btn-active:hover{";
		customCSS += "	color: " + options.LayoutToolbarSelectedHoverTextColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarSelectedTextShadowColor) {
		customCSS += ".iQontrolToolbarLink.ui-btn.ui-btn-active{";
		customCSS += "	text-shadow: 0 1px 0 " + options.LayoutToolbarSelectedTextShadowColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarSelectedHoverTextShadowColor) {
		customCSS += ".iQontrolToolbarLink.ui-btn.ui-btn-active:hover{";
		customCSS += "	text-shadow: 0 1px 0 " + options.LayoutToolbarSelectedHoverTextShadowColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarFontSize) {
		customCSS += ".iQontrolToolbarLink.ui-btn{";
		customCSS += "	font-size: " + options.LayoutToolbarFontSize + "px !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarFontFamily) {
		var fontFamily = getFontFamilyAndAddFontFace(options.LayoutToolbarFontFamily);
		customCSS += ".iQontrolToolbarLink.ui-btn{";
		customCSS += "	font-family: " + fontFamily + ";";
		customCSS += "}";
	};
	if(options.LayoutToolbarFontWeight) {
		customCSS += ".iQontrolToolbarLink.ui-btn{";
		customCSS += "	font-weight: " + options.LayoutToolbarFontWeight + ";";
		customCSS += "}";
	};
	if(options.LayoutToolbarFontStyle) {
		customCSS += ".iQontrolToolbarLink.ui-btn{";
		customCSS += "	font-style: " + options.LayoutToolbarFontStyle + ";";
		customCSS += "}";
	};
	if(options.LayoutToolbarIconSize) {
		customCSS += ".iQontrolToolbarLink.ui-btn:after{";
		customCSS += "	background-size: " + options.LayoutToolbarIconSize + "px;";
		customCSS += "}";
	};
	if(options.LayoutToolbarIconBackgroundColor) {
		customCSS += ".iQontrolToolbarLink.ui-btn:after{";
		customCSS += "	background-color: " + options.LayoutToolbarIconBackgroundColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarSelectedIconBackgroundColor) {
		customCSS += ".iQontrolToolbarLink.ui-btn-active:after{";
		customCSS += "	background-color: " + options.LayoutToolbarSelectedIconBackgroundColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutToolbarIconBackgroundSize) {
		customCSS += ".iQontrolToolbarLink.ui-btn:after{";
		customCSS += "	width: " + options.LayoutToolbarIconBackgroundSize + "px;";
		customCSS += "	height: " + options.LayoutToolbarIconBackgroundSize + "px;";
		customCSS += "	margin-left: " + (options.LayoutToolbarIconBackgroundSize / -2) + "px;";
		customCSS += "}";
	};
	if(options.LayoutToolbarIconBackgroundCornerSize) {
		customCSS += ".iQontrolToolbarLink.ui-btn:after{";
		customCSS += "	border-radius: " + (options.LayoutToolbarIconBackgroundCornerSize / 2) + "%;";
		customCSS += "}";
	};
	//Main-Header
	if(options.LayoutViewMainHeaderColor) {
		customCSS += "#ViewHeaderTitle{";
		customCSS += "	background-color: " + options.LayoutViewMainHeaderColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewMainHeaderTextColor) {
		customCSS += "#ViewHeaderTitle{";
		customCSS += "	color: " + options.LayoutViewMainHeaderTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewMainHeaderFontSize) {
		customCSS += "#ViewHeaderTitle{";
		customCSS += "	font-size: " + options.LayoutViewMainHeaderFontSize + "px;";
		customCSS += "}";
	};
	if(options.LayoutViewMainHeaderFontFamily) {
		var fontFamily = getFontFamilyAndAddFontFace(options.LayoutViewMainHeaderFontFamily);
		customCSS += "#ViewHeaderTitle{";
		customCSS += "	font-family: " + fontFamily + ";";
		customCSS += "}";
	};
	if(options.LayoutViewMainHeaderFontWeight) {
		customCSS += "#ViewHeaderTitle{";
		customCSS += "	font-weight: " + options.LayoutViewMainHeaderFontWeight + ";";
		customCSS += "}";
	};
	if(options.LayoutViewMainHeaderFontStyle) {
		customCSS += "#ViewHeaderTitle{";
		customCSS += "	font-style: " + options.LayoutViewMainHeaderFontStyle + ";";
		customCSS += "}";
	};
	if(options.LayoutViewMainHeaderPaddingTop) {
		customCSS += "#ViewHeaderTitle{";
		customCSS += "	padding-top: " + options.LayoutViewMainHeaderPaddingTop + "px;";
		customCSS += "}";
	};
	if(options.LayoutViewMainHeaderPaddingBottom) {
		customCSS += "#ViewHeaderTitle{";
		customCSS += "	padding-bottom: " + options.LayoutViewMainHeaderPaddingBottom + "px;";
		customCSS += "}";
	};
	if(options.LayoutViewMainHeaderPaddingLeft) {
		customCSS += "#ViewHeaderTitle{";
		customCSS += "	padding-left: " + options.LayoutViewMainHeaderPaddingLeft + "px;";
		customCSS += "	padding-left: calc(env(safe-area-inset-left) + " + options.LayoutViewMainHeaderPaddingLeft + "px);";
		customCSS += "}";
	};
	if(options.LayoutViewMainHeaderMarginTop) {
		customCSS += "#ViewHeaderTitle{";
		customCSS += "	margin-top: " + options.LayoutViewMainHeaderMarginTop + "px;";
		customCSS += "}";
	};
	if(options.LayoutViewMainHeaderMarginRight) {
		customCSS += "#ViewHeaderTitle{";
		customCSS += "	margin-right: " + options.LayoutViewMainHeaderMarginRight + "px;";
		customCSS += "}";
	};
	if(options.LayoutViewMainHeaderMarginBottom) {
		customCSS += "#ViewHeaderTitle{";
		customCSS += "	margin-bottom: " + options.LayoutViewMainHeaderMarginBottom + "px;";
		customCSS += "}";
	};
	if(options.LayoutViewMainHeaderMarginLeft) {
		customCSS += "#ViewHeaderTitle{";
		customCSS += "	margin-left: " + options.LayoutViewMainHeaderMarginLeft + "px;";
		customCSS += "	margin-left: calc(" + options.LayoutViewMainHeaderMarginLeft + "px - env(safe-area-inset-left));";
		customCSS += "}";
	};
	if(options.LayoutViewMainHeaderCentered) {
		customCSS += "#ViewHeaderTitle{";
		customCSS += "	padding: 0;";
		customCSS += "}";
		customCSS += "#ViewHeaderTitle div.headerText{";
		customCSS += "	width: 100vw;";
		customCSS += "	text-align: center;";
		customCSS += "}";
	};
	//Sub-Header
	if(options.LayoutViewSubHeaderColor) {
		customCSS += "#ViewContent h4{";
		customCSS += "	background-color: " + options.LayoutViewSubHeaderColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewSubHeaderTextColor) {
		customCSS += "#ViewContent h4{";
		customCSS += "	color: " + options.LayoutViewSubHeaderTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewSubHeaderFontSize) {
		customCSS += "#ViewContent h4{";
		customCSS += "	font-size: " + options.LayoutViewSubHeaderFontSize + "px;";
		customCSS += "}";
	};
	if(options.LayoutViewSubHeaderFontFamily) {
		var fontFamily = getFontFamilyAndAddFontFace(options.LayoutViewSubHeaderFontFamily);
		customCSS += "#ViewContent h4{";
		customCSS += "	font-family: " + fontFamily + ";";
		customCSS += "}";
	};
	if(options.LayoutViewSubHeaderFontWeight) {
		customCSS += "#ViewContent h4{";
		customCSS += "	font-weight: " + options.LayoutViewSubHeaderFontWeight + ";";
		customCSS += "}";
	};
	if(options.LayoutViewSubHeaderFontStyle) {
		customCSS += "#ViewContent h4{";
		customCSS += "	font-style: " + options.LayoutViewSubHeaderFontStyle + ";";
		customCSS += "}";
	};
	if(options.LayoutViewSubHeaderPaddingTop) {
		customCSS += "#ViewContent h4{";
		customCSS += "	padding-top: " + options.LayoutViewSubHeaderPaddingTop + "px;";
		customCSS += "}";
	};
	if(options.LayoutViewSubHeaderPaddingBottom) {
		customCSS += "#ViewContent h4{";
		customCSS += "	padding-bottom: " + options.LayoutViewSubHeaderPaddingBottom + "px;";
		customCSS += "}";
	};
	if(options.LayoutViewSubHeaderPaddingLeft) {
		customCSS += "#ViewContent h4{";
		customCSS += "	padding-left: " + options.LayoutViewSubHeaderPaddingLeft + "px;";
		customCSS += "	padding-left: calc(env(safe-area-inset-left) + " + options.LayoutViewSubHeaderPaddingLeft + "px);";
		customCSS += "}";
	};
	if(options.LayoutViewSubHeaderMarginTop) {
		customCSS += "#ViewContent h4{";
		customCSS += "	margin-top: " + options.LayoutViewSubHeaderMarginTop + "px;";
		customCSS += "}";
		customCSS += ".viewFirstLineNoHeadingSpacer{";
		customCSS += "	height: " + options.LayoutViewSubHeaderMarginTop + "px;";
		customCSS += "}";
	};
	if(options.LayoutViewSubHeaderMarginRight) {
		customCSS += "#ViewContent h4{";
		customCSS += "	margin-right: " + options.LayoutViewSubHeaderMarginRight + "px;";
		customCSS += "}";
	};
	if(options.LayoutViewSubHeaderMarginBottom) {
		customCSS += "#ViewContent h4{";
		customCSS += "	margin-bottom: " + options.LayoutViewSubHeaderMarginBottom + "px;";
		customCSS += "}";
		customCSS += ".viewShuffleContainer.collapsibleClosed ~ .viewNewSectionSpacer{";
		customCSS += "	margin-top: -" + options.LayoutViewSubHeaderMarginBottom + "px;";
		customCSS += "}";
	};
	if(options.LayoutViewSubHeaderMarginLeft) {
		customCSS += "#ViewContent h4{";
		customCSS += "	margin-left: " + options.LayoutViewSubHeaderMarginLeft + "px;";
		customCSS += "	margin-left: calc(" + options.LayoutViewSubHeaderMarginLeft + "px - env(safe-area-inset-left));";
		customCSS += "}";
	};
	if(options.LayoutViewSubHeaderCentered) {
		customCSS += "#ViewContent h4 div.subHeaderText{";
		customCSS += "	text-align: center;";
		customCSS += "}";
	};
	//New Line
	if(options.LayoutViewNewLineSpacing) {
		customCSS += ".viewNewLineSpacer{";
		customCSS += "	height: " + options.LayoutViewNewLineSpacing + "px;";
		customCSS += "}";
	};
	if(options.LayoutViewNewSectionSpacing) {
		customCSS += ".viewNewSectionSpacer{";
		customCSS += "	height: " + options.LayoutViewNewSectionSpacing + "em;";
		customCSS += "}";
	};
	//Devices - General
	if(options.LayoutViewDeviceNameCentered) { 
		customCSS += ".iQontrolDeviceName {";
		customCSS += "	text-align: center;";
		customCSS += "	left: 0;";
		customCSS += "	width: 100%;";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceStateCentered) {
		customCSS += ".iQontrolDeviceState {";
		customCSS += "	text-align: center;";
		customCSS += "	left: 0;";
		customCSS += "	width: 100%;";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceBorderRadius) {
		customCSS += ".iQontrolDevicePressureIndicator, .iQontrolDeviceGlow, .iQontrolDevice, .iQontrolDeviceBackgroundIframeWrapper, .iQontrolDeviceBackgroundImage, .iQontrolDeviceBackground {";
		customCSS += "	 -webkit-border-radius: " + options.LayoutViewDeviceBorderRadius + "px;";
		customCSS += "   	-moz-border-radius: " + options.LayoutViewDeviceBorderRadius + "px;";
		customCSS += "			 border-radius: " + options.LayoutViewDeviceBorderRadius + "px;";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceBorderRadiusLargeScreen) {
		customCSS += "html.bigMode .iQontrolDevicePressureIndicator, html.bigMode .iQontrolDeviceGlow, html.bigMode .iQontrolDevice, html.bigMode .iQontrolDeviceBackgroundIframeWrapper, html.bigMode .iQontrolDeviceBackgroundImage, html.bigMode .iQontrolDeviceBackground {";
		customCSS += "		 -webkit-border-radius: " + options.LayoutViewDeviceBorderRadiusLargeScreen + "px;";
		customCSS += "	   		-moz-border-radius: " + options.LayoutViewDeviceBorderRadiusLargeScreen + "px;";
		customCSS += "				 border-radius: " + options.LayoutViewDeviceBorderRadiusLargeScreen + "px;";
		customCSS += "}";
	};
	//Inactive Devices - Background
	if(options.LayoutViewDeviceColor) {
		customCSS += ".iQontrolDeviceBackgroundImage:not(.active){";
		customCSS += "	background-color: " + options.LayoutViewDeviceColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceOpacity) {
		customCSS += ".iQontrolDeviceBackgroundImage:not(.active){";
		customCSS += "	opacity: " + options.LayoutViewDeviceOpacity + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceHoverColor) {
		customCSS += ".iQontrolDeviceBackgroundImage:not(.active):hover{";
		customCSS += "	background-color: " + options.LayoutViewDeviceHoverColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceHoverOpacity) {
		customCSS += ".iQontrolDeviceBackgroundImage:not(.active):hover{";
		customCSS += "	opacity: " + options.LayoutViewDeviceHoverOpacity + ";";
		customCSS += "}";
	};
	//Inactive Devices - Overlay
	if(options.LayoutViewDeviceInactiveColor) {
		customCSS += ".iQontrolDeviceBackground:not(.active){";
		customCSS += "	background-color: " + options.LayoutViewDeviceInactiveColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceInactiveOpacity) {
		customCSS += ".iQontrolDeviceBackground:not(.active){";
		customCSS += "	opacity: " + options.LayoutViewDeviceInactiveOpacity + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceInactiveHoverColor) {
		customCSS += ".iQontrolDevice:hover .iQontrolDeviceBackground:not(.active){";
		customCSS += "	background-color: " + options.LayoutViewDeviceInactiveHoverColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceInactiveHoverOpacity) {
		customCSS += ".iQontrolDevice:hover .iQontrolDeviceBackground:not(.active){";
		customCSS += "	opacity: " + options.LayoutViewDeviceInactiveHoverOpacity + ";";
		customCSS += "}";
	};
	//Active Devices - Background
	if(options.LayoutViewActiveDeviceColor) {
		customCSS += ".iQontrolDeviceBackgroundImage.active{";
		customCSS += "	background-color: " + options.LayoutViewActiveDeviceColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewActiveDeviceOpacity) {
		customCSS += ".iQontrolDeviceBackgroundImage.active{";
		customCSS += "	opacity: " + options.LayoutViewActiveDeviceOpacity + ";";
		customCSS += "}";
	};
	if(options.LayoutViewActiveDeviceHoverColor) {
		customCSS += ".iQontrolDeviceBackgroundImage.active:hover{";
		customCSS += "	background-color: " + options.LayoutViewActiveDeviceHoverColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewActiveDeviceHoverOpacity) {
		customCSS += ".iQontrolDeviceBackgroundImage.active:hover{";
		customCSS += "	opacity: " + options.LayoutViewActiveDeviceHoverOpacity + ";";
		customCSS += "}";
	};
	//Active Devices - Overlay
	if(options.LayoutViewDeviceActiveColor) {
		customCSS += ".iQontrolDeviceBackground.active{";
		customCSS += "	background-color: " + options.LayoutViewDeviceActiveColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceActiveOpacity) {
		customCSS += ".iQontrolDeviceBackground.active{";
		customCSS += "	opacity: " + options.LayoutViewDeviceActiveOpacity + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceActiveHoverColor) {
		customCSS += ".iQontrolDevice:hover .iQontrolDeviceBackground.active{";
		customCSS += "	background-color: " + options.LayoutViewDeviceActiveHoverColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceActiveHoverOpacity) {
		customCSS += ".iQontrolDevice:hover .iQontrolDeviceBackground.active{";
		customCSS += "	opacity: " + options.LayoutViewDeviceActiveHoverOpacity + ";";
		customCSS += "}";
	};
	//Device-Name
	if(options.LayoutViewDeviceNameInactiveTextColor) {
		customCSS += ".iQontrolDevice:not(.active) .iQontrolDeviceName{";
		customCSS += "	color: " + options.LayoutViewDeviceNameInactiveTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceNameInactiveHoverTextColor) {
		customCSS += ".iQontrolDevice:not(.active):hover .iQontrolDeviceName{";
		customCSS += "	color: " + options.LayoutViewDeviceNameInactiveHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceNameActiveTextColor) {
		customCSS += ".iQontrolDevice.active .iQontrolDeviceName{";
		customCSS += "	color: " + options.LayoutViewDeviceNameActiveTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceNameActiveHoverTextColor) {
		customCSS += ".iQontrolDevice.active:hover .iQontrolDeviceName{";
		customCSS += "	color: " + options.LayoutViewDeviceNameActiveHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceNameInactiveOnTransparentTextColor) {
		customCSS += ".iQontrolDevice:not(.active).transparentIfInactive .iQontrolDeviceName{";
		customCSS += "	color: " + options.LayoutViewDeviceNameInactiveOnTransparentTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceNameInactiveOnTransparentHoverTextColor) {
		customCSS += ".iQontrolDevice:not(.active).transparentIfInactive:hover .iQontrolDeviceName{";
		customCSS += "	color: " + options.LayoutViewDeviceNameInactiveOnTransparentHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceNameActiveOnTransparentTextColor) {
		customCSS += ".iQontrolDevice.active.transparentIfActive .iQontrolDeviceName{";
		customCSS += "	color: " + options.LayoutViewDeviceNameActiveOnTransparentTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceNameActiveOnTransparentHoverTextColor) {
		customCSS += ".iQontrolDevice.active:hover.transparentIfActive .iQontrolDeviceName{";
		customCSS += "	color: " + options.LayoutViewDeviceNameActiveOnTransparentHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceNameFontFamily) {
		var fontFamily = getFontFamilyAndAddFontFace(options.LayoutViewDeviceNameFontFamily);
		customCSS += ".iQontrolDeviceName{";
		customCSS += "	font-family: " + fontFamily + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceNameFontWeight) {
		customCSS += ".iQontrolDeviceName{";
		customCSS += "	font-weight: " + options.LayoutViewDeviceNameFontWeight + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceNameFontStyle) {
		customCSS += ".iQontrolDeviceName{";
		customCSS += "	font-style: " + options.LayoutViewDeviceNameFontStyle + ";";
		customCSS += "}";
	};
	//State
	if(options.LayoutViewDeviceStateInactiveTextColor) {
		customCSS += ".iQontrolDevice:not(.active) .iQontrolDeviceState{";
		customCSS += "	color: " + options.LayoutViewDeviceStateInactiveTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceStateInactiveHoverTextColor) {
		customCSS += ".iQontrolDevice:not(.active):hover .iQontrolDeviceState{";
		customCSS += "	color: " + options.LayoutViewDeviceStateInactiveHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceStateActiveTextColor) {
		customCSS += ".iQontrolDevice.active .iQontrolDeviceState{";
		customCSS += "	color: " + options.LayoutViewDeviceStateActiveTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceStateActiveHoverTextColor) {
		customCSS += ".iQontrolDevice.active:hover .iQontrolDeviceState{";
		customCSS += "	color: " + options.LayoutViewDeviceStateActiveHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceStateInactiveOnTransparentTextColor) {
		customCSS += ".iQontrolDevice:not(.active).transparentIfInactive .iQontrolDeviceState{";
		customCSS += "	color: " + options.LayoutViewDeviceStateInactiveOnTransparentTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceStateInactiveOnTransparentHoverTextColor) {
		customCSS += ".iQontrolDevice:not(.active).transparentIfInactive:hover .iQontrolDeviceState{";
		customCSS += "	color: " + options.LayoutViewDeviceStateInactiveOnTransparentHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceStateActiveOnTransparentTextColor) {
		customCSS += ".iQontrolDevice.active.transparentIfActive .iQontrolDeviceState{";
		customCSS += "	color: " + options.LayoutViewDeviceStateActiveOnTransparentTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceStateActiveOnTransparentHoverTextColor) {
		customCSS += ".iQontrolDevice.active.transparentIfActive:hover .iQontrolDeviceState{";
		customCSS += "	color: " + options.LayoutViewDeviceStateActiveOnTransparentHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceStateFontFamily) {
		var fontFamily = getFontFamilyAndAddFontFace(options.LayoutViewDeviceStateFontFamily);
		customCSS += ".iQontrolDeviceState{";
		customCSS += "	font-family: " + fontFamily + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceStateFontWeight) {
		customCSS += ".iQontrolDeviceState{";
		customCSS += "	font-weight: " + options.LayoutViewDeviceStateFontWeight + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceStateFontStyle) {
		customCSS += ".iQontrolDeviceState{";
		customCSS += "	font-style: " + options.LayoutViewDeviceStateFontStyle + ";";
		customCSS += "}";
	};
	//Info
	if(options.LayoutViewDeviceInfoInactiveTextColor) {
		customCSS += ".iQontrolDevice:not(.active) .iQontrolDeviceInfoAText, .iQontrolDevice:not(.active) .iQontrolDeviceInfoBText{";
		customCSS += "	color: " + options.LayoutViewDeviceInfoInactiveTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceInfoInactiveHoverTextColor) {
		customCSS += ".iQontrolDevice:not(.active):hover .iQontrolDeviceInfoAText, .iQontrolDevice:not(.active):hover .iQontrolDeviceInfoBText{";
		customCSS += "	color: " + options.LayoutViewDeviceInfoInactiveHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceInfoActiveTextColor) {
		customCSS += ".iQontrolDevice.active .iQontrolDeviceInfoAText, .iQontrolDevice.active .iQontrolDeviceInfoBText{";
		customCSS += "	color: " + options.LayoutViewDeviceInfoActiveTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceInfoActiveHoverTextColor) {
		customCSS += ".iQontrolDevice.active:hover .iQontrolDeviceInfoAText, .iQontrolDevice.active:hover .iQontrolDeviceInfoBText{";
		customCSS += "	color: " + options.LayoutViewDeviceInfoActiveHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceInfoInactiveOnTransparentTextColor) {
		customCSS += ".iQontrolDevice:not(.active).transparentIfInactive .iQontrolDeviceInfoAText, .iQontrolDevice:not(.active).transparentIfInactive .iQontrolDeviceInfoBText{";
		customCSS += "	color: " + options.LayoutViewDeviceInfoInactiveOnTransparentTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceInfoInactiveOnTransparentHoverTextColor) {
		customCSS += ".iQontrolDevice:not(.active).transparentIfInactive:hover .iQontrolDeviceInfoAText, .iQontrolDevice:not(.active).transparentIfInactive:hover .iQontrolDeviceInfoBText{";
		customCSS += "	color: " + options.LayoutViewDeviceInfoInactiveOnTransparentHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceInfoActiveOnTransparentTextColor) {
		customCSS += ".iQontrolDevice.active.transparentIfActive .iQontrolDeviceInfoAText, .iQontrolDevice.active.transparentIfActive .iQontrolDeviceInfoBText{";
		customCSS += "	color: " + options.LayoutViewDeviceInfoActiveOnTransparentTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceInfoActiveOnTransparentHoverTextColor) {
		customCSS += ".iQontrolDevice.active.transparentIfActive:hover .iQontrolDeviceInfoAText, .iQontrolDevice.active.transparentIfActive:hover .iQontrolDeviceInfoBText{";
		customCSS += "	color: " + options.LayoutViewDeviceInfoActiveOnTransparentHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceInfoFontFamily) {
		var fontFamily = getFontFamilyAndAddFontFace(options.LayoutViewDeviceInfoFontFamily);
		customCSS += ".iQontrolDeviceInfoAText, .iQontrolDeviceInfoBText{";
		customCSS += "	font-family: " + fontFamily + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceInfoFontWeight) {
		customCSS += ".iQontrolDeviceInfoAText, .iQontrolDeviceInfoBText{";
		customCSS += "	font-weight: " + options.LayoutViewDeviceInfoFontWeight + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceInfoFontStyle) {
		customCSS += ".iQontrolDeviceInfoAText, .iQontrolDeviceInfoBText{";
		customCSS += "	font-style: " + options.LayoutViewDeviceInfoFontStyle + ";";
		customCSS += "}";
	};
	//Badge
	if(options.LayoutViewDeviceBadgeTextColor) {
		customCSS += ".iQontrolDeviceBadge{";
		customCSS += "	color: " + options.LayoutViewDeviceBadgeTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceBadgeFontFamily) {
		var fontFamily = getFontFamilyAndAddFontFace(options.LayoutViewDeviceBadgeFontFamily);
		customCSS += ".iQontrolDeviceBadge{";
		customCSS += "	font-family: " + fontFamily + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceBadgeFontWeight) {
		customCSS += ".iQontrolDeviceBadge{";
		customCSS += "	font-weight: " + options.LayoutViewDeviceBadgeFontWeight + ";";
		customCSS += "}";
	};
	if(options.LayoutViewDeviceBadgeFontStyle) {
		customCSS += ".iQontrolDeviceBadge{";
		customCSS += "	font-style: " + options.LayoutViewDeviceBadgeFontStyle + ";";
		customCSS += "}";
	};	
	//INFO_A/B Icons
	if(options.LayoutDefaultSymbolsInfoABInvert) {
		customCSS += ".iQontrolDeviceInfoAIcon, .iQontrolDeviceInfoBIcon{";
		customCSS += "	filter: invert(1);";
		customCSS += "}";
	};
	//Dark-Mode
	if(options.LayoutColorModeDarkBackgroundOverlay) {
		customCSS += "@media (prefers-color-scheme: dark){ body:not(.isBackgroundView):not(.backstretchLoaded):after{";
		customCSS += "	background: " + options.LayoutColorModeDarkBackgroundOverlay + ";";
		customCSS += "	content: '';";
		customCSS += "	position: absolute;";
		customCSS += "	width: 100%;";
		customCSS += "	height: 100%;";
		customCSS += "}}";
		customCSS += "html.color-mode-dark body:not(.backstretchLoaded):after, html.color-mode-dark .backstretch:after{";
		customCSS += "	background: " + options.LayoutColorModeDarkBackgroundOverlay + ";";
		customCSS += "	content: '';";
		customCSS += "	position: absolute;";
		customCSS += "	width: 100%;";
		customCSS += "	height: 100%;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarBrightness) {
		customCSS += "html.color-mode-dark #Toolbar{";
		customCSS += "	filter: brightness(" + options.LayoutColorModeDarkToolbarBrightness + "%);";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarOverlay) {
		customCSS += "html.color-mode-dark #Toolbar:after{";
		customCSS += "	background: " + options.LayoutColorModeDarkToolbarOverlay + ";";
		customCSS += "	content: '';";
		customCSS += "	position: absolute;";
		customCSS += "	top: 0px;";
		customCSS += "	left: 0px;";
		customCSS += "	width: 100%;";
		customCSS += "	height: 100%;";
		customCSS += "	pointer-events: none;";
		customCSS += "	z-index: 1000;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkHeadingsBrightness) {
		customCSS += "html.color-mode-dark #ViewHeaderTitle, html.color-mode-dark #ViewContent h4{";
		customCSS += "	filter: brightness(" + options.LayoutColorModeDarkHeadingsBrightness + "%);";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkHeadingsOverlay) {
		customCSS += "html.color-mode-dark #ViewHeaderTitle:after, html.color-mode-dark #ViewContent h4:after{";
		customCSS += "	background: " + options.LayoutColorModeDarkHeadingsOverlay + ";";
		customCSS += "	content: '';";
		customCSS += "	position: absolute;";
		customCSS += "	top: 0px;";
		customCSS += "	left: 0px;";
		customCSS += "	width: 100%;";
		customCSS += "	height: 100%;";
		customCSS += "	pointer-events: none;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkDevicesBrightness) {
		customCSS += "html.color-mode-dark .iQontrolDevice{";
		customCSS += "	filter: brightness(" + options.LayoutColorModeDarkDevicesBrightness + "%);";
		customCSS += "}";
		customCSS += "html.color-mode-dark .iQontrolDeviceBackgroundIframe.isBackgroundView{";
		customCSS += "	filter: brightness(" + Math.min(Math.round(10000 / parseInt(options.LayoutColorModeDarkDevicesBrightness)), 300) + "%);";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkDevicesOverlay) {
		customCSS += "html.color-mode-dark .iQontrolDevice:after{";
		customCSS += "	background: " + options.LayoutColorModeDarkDevicesOverlay + ";";
		customCSS += "	content: '';";
		customCSS += "	position: absolute;";
		customCSS += "	top: -10px;";
		customCSS += "	left: -10px;";
		customCSS += "	width: 200%;";
		customCSS += "	width: calc(100% + 20px);";
		customCSS += "	height: 200%;";
		customCSS += "	height: calc(100% + 20px);";
		customCSS += "	pointer-events: none;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkBadgeBrightness) {
		customCSS += "html.color-mode-dark .iQontrolDeviceBadge{";
		customCSS += "	filter: brightness(" + options.LayoutColorModeDarkBadgeBrightness + "%);";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkBadgeOverlay) {
		customCSS += "html.color-mode-dark .iQontrolDeviceBadge:after{";
		customCSS += "	background: " + options.LayoutColorModeDarkBadgeOverlay + ";";
		customCSS += "	content: '';";
		customCSS += "	position: absolute;";
		customCSS += "	top: 0px;";
		customCSS += "	left: 0px;";
		customCSS += "	width: 100%;";
		customCSS += "	height: 100%;";
		customCSS += "	pointer-events: none;";
		customCSS += "}";
	};
	//Dark-Mode - Toolbar
	if(options.LayoutColorModeDarkToolbarFooterColor) {
		customCSS += "html.color-mode-dark #Toolbar.ui-footer{";
		customCSS += "	background-color: " + options.LayoutColorModeDarkToolbarFooterColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarBorderColor) {
		customCSS += "html.color-mode-dark .iQontrolToolbarLink.ui-btn:not(.ui-btn-active){";
		customCSS += "	border-color: " + options.LayoutColorModeDarkToolbarBorderColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarColor) {
		customCSS += "html.color-mode-dark .iQontrolToolbarLink.ui-btn:not(.ui-btn-active){";
		customCSS += "	background-color: " + options.LayoutColorModeDarkToolbarColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarHoverColor) {
		customCSS += "html.color-mode-dark .iQontrolToolbarLink.ui-btn:not(.ui-btn-active):hover{";
		customCSS += "	background-color: " + options.LayoutColorModeDarkToolbarHoverColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarTextColor) {
		customCSS += "html.color-mode-dark .iQontrolToolbarLink.ui-btn:not(.ui-btn-active){";
		customCSS += "	color: " + options.LayoutColorModeDarkToolbarTextColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarHoverTextColor) {
		customCSS += "html.color-mode-dark .iQontrolToolbarLink.ui-btn:not(.ui-btn-active):hover{";
		customCSS += "	color: " + options.LayoutColorModeDarkToolbarHoverTextColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarTextShadowColor) {
		customCSS += "html.color-mode-dark .iQontrolToolbarLink.ui-btn:not(.ui-btn-active){";
		customCSS += "	text-shadow: 0 1px 0 " + options.LayoutColorModeDarkToolbarTextShadowColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarHoverTextShadowColor) {
		customCSS += "html.color-mode-dark .iQontrolToolbarLink.ui-btn:not(.ui-btn-active):hover{";
		customCSS += "	text-shadow: 0 1px 0 " + options.LayoutColorModeDarkToolbarHoverTextShadowColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarSelectedColor) {
		customCSS += "html.color-mode-dark .iQontrolToolbarLink.ui-btn.ui-btn-active, html.color-mode-dark .iQontrolToolbarLink.ui-btn.ui-btn-active:hover{";
		customCSS += "	background-color: " + options.LayoutColorModeDarkToolbarSelectedColor + " !important;";
		customCSS += "	box-shadow: 0 0 12px 1px " + options.LayoutColorModeDarkToolbarSelectedColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarSelectedHoverColor) {
		customCSS += "html.color-mode-dark .iQontrolToolbarLink.ui-btn.ui-btn-active:hover{";
		customCSS += "	background-color: " + options.LayoutColorModeDarkToolbarSelectedHoverColor + " !important;";
		customCSS += "	box-shadow: 0 0 12px 1px " + options.LayoutColorModeDarkToolbarSelectedHoverColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarSelectedTextColor) {
		customCSS += "html.color-mode-dark .iQontrolToolbarLink.ui-btn.ui-btn-active, html.color-mode-dark .iQontrolToolbarLink.ui-btn.ui-btn-active:hover{";
		customCSS += "	color: " + options.LayoutColorModeDarkToolbarSelectedTextColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarSelectedHoverTextColor) {
		customCSS += "html.color-mode-dark .iQontrolToolbarLink.ui-btn.ui-btn-active:hover{";
		customCSS += "	color: " + options.LayoutColorModeDarkToolbarSelectedHoverTextColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarSelectedTextShadowColor) {
		customCSS += "html.color-mode-dark .iQontrolToolbarLink.ui-btn.ui-btn-active{";
		customCSS += "	text-shadow: 0 1px 0 " + options.LayoutColorModeDarkToolbarSelectedTextShadowColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarSelectedHoverTextShadowColor) {
		customCSS += "html.color-mode-dark .iQontrolToolbarLink.ui-btn.ui-btn-active:hover{";
		customCSS += "	text-shadow: 0 1px 0 " + options.LayoutColorModeDarkToolbarSelectedHoverTextShadowColor + " !important;";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarIconBrightness) {
		customCSS += "html.color-mode-dark .iQontrolToolbarLink.ui-btn:after{";
		customCSS += "	filter: brightness(" + options.LayoutColorModeDarkToolbarIconBrightness + "%);";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkToolbarIconBackgroundColor) {
		customCSS += "html.color-mode-dark .iQontrolToolbarLink.ui-btn:after{";
		customCSS += "	background-color: " + options.LayoutColorModeDarkToolbarIconBackgroundColor + " !important;";
		customCSS += "}";
	};
	//Dark-Mode - Main-Header
	if(options.LayoutColorModeDarkViewMainHeaderColor) {
		customCSS += "html.color-mode-dark #ViewHeaderTitle{";
		customCSS += "	background-color: " + options.LayoutColorModeDarkViewMainHeaderColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewMainHeaderTextColor) {
		customCSS += "html.color-mode-dark #ViewHeaderTitle{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewMainHeaderTextColor + ";";
		customCSS += "}";
	};
	//Dark-Mode - Sub-Header
	if(options.LayoutColorModeDarkViewSubHeaderColor) {
		customCSS += "html.color-mode-dark #ViewContent h4{";
		customCSS += "	background-color: " + options.LayoutColorModeDarkViewSubHeaderColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewSubHeaderTextColor) {
		customCSS += "html.color-mode-dark #ViewContent h4{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewSubHeaderTextColor + ";";
		customCSS += "}";
	};
	//Dark-Mode - Devices - Icons
	if(options.LayoutColorModeDarkDeviceIconBrightness) {
		customCSS += "html.color-mode-dark .iQontrolDeviceIcon{";
		customCSS += "	filter: brightness(" + options.LayoutColorModeDarkDeviceIconBrightness + "%);";
		customCSS += "}";
	};
	//Dark-Mode - Inactive Devices - Background
	if(options.LayoutColorModeDarkViewDeviceColor) {
		customCSS += "html.color-mode-dark .iQontrolDeviceBackgroundImage:not(.active){";
		customCSS += "	background-color: " + options.LayoutColorModeDarkViewDeviceColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceHoverColor) {
		customCSS += "html.color-mode-dark .iQontrolDeviceBackgroundImage:not(.active):hover{";
		customCSS += "	background-color: " + options.LayoutColorModeDarkViewDeviceHoverColor + ";";
		customCSS += "}";
	};
	//Dark-Mode - Inactive Devices - Overlay
	if(options.LayoutColorModeDarkViewDeviceInactiveColor) {
		customCSS += "html.color-mode-dark .iQontrolDeviceBackground:not(.active){";
		customCSS += "	background-color: " + options.LayoutColorModeDarkViewDeviceInactiveColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceInactiveHoverColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice:hover .iQontrolDeviceBackground:not(.active){";
		customCSS += "	background-color: " + options.LayoutColorModeDarkViewDeviceInactiveHoverColor + ";";
		customCSS += "}";
	};
	//Dark-Mode - Active Devices - Background
	if(options.LayoutColorModeDarkViewActiveDeviceColor) {
		customCSS += "html.color-mode-dark .iQontrolDeviceBackgroundImage.active{";
		customCSS += "	background-color: " + options.LayoutColorModeDarkViewActiveDeviceColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewActiveDeviceHoverColor) {
		customCSS += "html.color-mode-dark .iQontrolDeviceBackgroundImage.active:hover{";
		customCSS += "	background-color: " + options.LayoutColorModeDarkViewActiveDeviceHoverColor + ";";
		customCSS += "}";
	};
	//Dark-Mode - Active Devices - Overlay
	if(options.LayoutColorModeDarkViewDeviceActiveColor) {
		customCSS += "html.color-mode-dark .iQontrolDeviceBackground.active{";
		customCSS += "	background-color: " + options.LayoutColorModeDarkViewDeviceActiveColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceActiveHoverColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice:hover .iQontrolDeviceBackground.active{";
		customCSS += "	background-color: " + options.LayoutColorModeDarkViewDeviceActiveHoverColor + ";";
		customCSS += "}";
	};
	//Dark-Mode - Device-Name
	if(options.LayoutColorModeDarkViewDeviceNameInactiveTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice:not(.active) .iQontrolDeviceName{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceNameInactiveTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceNameInactiveHoverTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice:not(.active):hover .iQontrolDeviceName{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceNameInactiveHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceNameActiveTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice.active .iQontrolDeviceName{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceNameActiveTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceNameActiveHoverTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice.active:hover .iQontrolDeviceName{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceNameActiveHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceNameInactiveOnTransparentTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice:not(.active).transparentIfInactive .iQontrolDeviceName{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceNameInactiveOnTransparentTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceNameInactiveOnTransparentHoverTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice:not(.active).transparentIfInactive:hover .iQontrolDeviceName{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceNameInactiveOnTransparentHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceNameActiveOnTransparentTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice.active.transparentIfActive .iQontrolDeviceName{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceNameActiveOnTransparentTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceNameActiveOnTransparentHoverTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice.active:hover.transparentIfActive .iQontrolDeviceName{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceNameActiveOnTransparentHoverTextColor + ";";
		customCSS += "}";
	};
	//Dark-Mode - State
	if(options.LayoutColorModeDarkViewDeviceStateInactiveTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice:not(.active) .iQontrolDeviceState{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceStateInactiveTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceStateInactiveHoverTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice:not(.active):hover .iQontrolDeviceState{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceStateInactiveHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceStateActiveTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice.active .iQontrolDeviceState{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceStateActiveTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceStateActiveHoverTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice.active:hover .iQontrolDeviceState{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceStateActiveHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceStateInactiveOnTransparentTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice:not(.active).transparentIfInactive .iQontrolDeviceState{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceStateInactiveOnTransparentTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceStateInactiveOnTransparentHoverTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice:not(.active).transparentIfInactive:hover .iQontrolDeviceState{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceStateInactiveOnTransparentHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceStateActiveOnTransparentTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice.active.transparentIfActive .iQontrolDeviceState{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceStateActiveOnTransparentTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceStateActiveOnTransparentHoverTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice.active.transparentIfActive:hover .iQontrolDeviceState{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceStateActiveOnTransparentHoverTextColor + ";";
		customCSS += "}";
	};
	//Dark-Mode - Info
	if(options.LayoutColorModeDarkDeviceInfoIconBrightness) {
		customCSS += "html.color-mode-dark .iQontrolDeviceInfoAIcon, html.color-mode-dark .iQontrolDeviceInfoBIcon{";
		customCSS += "	filter: brightness(" + options.LayoutColorModeDarkDeviceInfoIconBrightness + "%);";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkDeviceInfoIconInvert) {
		customCSS += "html.color-mode-dark .iQontrolDeviceInfoAIcon, html.color-mode-dark .iQontrolDeviceInfoBIcon{";
		customCSS += "	filter: invert(" + (options.LayoutDefaultSymbolsInfoABInvert ? "0" : "1") + ");";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceInfoInactiveTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice:not(.active) .iQontrolDeviceInfoAText, html.color-mode-dark .iQontrolDevice:not(.active) .iQontrolDeviceInfoBText{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceInfoInactiveTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceInfoInactiveHoverTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice:not(.active):hover .iQontrolDeviceInfoAText, html.color-mode-dark .iQontrolDevice:not(.active):hover .iQontrolDeviceInfoBText{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceInfoInactiveHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceInfoActiveTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice.active .iQontrolDeviceInfoAText, html.color-mode-dark .iQontrolDevice.active .iQontrolDeviceInfoBText{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceInfoActiveTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceInfoActiveHoverTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice.active:hover .iQontrolDeviceInfoAText, html.color-mode-dark .iQontrolDevice.active:hover .iQontrolDeviceInfoBText{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceInfoActiveHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceInfoInactiveOnTransparentTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice:not(.active).transparentIfInactive .iQontrolDeviceInfoAText, html.color-mode-dark .iQontrolDevice:not(.active).transparentIfInactive .iQontrolDeviceInfoBText{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceInfoInactiveOnTransparentTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceInfoInactiveOnTransparentHoverTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice:not(.active).transparentIfInactive:hover .iQontrolDeviceInfoAText, html.color-mode-dark .iQontrolDevice:not(.active).transparentIfInactive:hover .iQontrolDeviceInfoBText{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceInfoInactiveOnTransparentHoverTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceInfoActiveOnTransparentTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice.active.transparentIfActive .iQontrolDeviceInfoAText, html.color-mode-dark .iQontrolDevice.active.transparentIfActive .iQontrolDeviceInfoBText{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceInfoActiveOnTransparentTextColor + ";";
		customCSS += "}";
	};
	if(options.LayoutColorModeDarkViewDeviceInfoActiveOnTransparentHoverTextColor) {
		customCSS += "html.color-mode-dark .iQontrolDevice.active.transparentIfActive:hover .iQontrolDeviceInfoAText, html.color-mode-dark .iQontrolDevice.active.transparentIfActive:hover .iQontrolDeviceInfoBText{";
		customCSS += "	color: " + options.LayoutColorModeDarkViewDeviceInfoActiveOnTransparentHoverTextColor + ";";
		customCSS += "}";
	};
	//Own CSS:
	if(options.LayoutCSS) {
		customCSS += options.LayoutCSS;
	};
	//@font-face
	function getFontFamilyAndAddFontFace(option){
		var fontFamily = encodeURIComponent(option.split('@')[0].replace(/\\/g,"").replace(/\//g,"").replace(/ /g,"").replace(/\./g,""));
		if(option.indexOf("/userfonts/") == 0 && option.split('@').length > 1){
			var format = option.slice(option.lastIndexOf('.') + 1);
			switch(format){
				case "otf": format = "opentype"; break;
				case "ttf": format = "truetype"; break;
			}
			var customCSSFontFace = "@font-face{";
			customCSSFontFace += "	font-family: '" + fontFamily + "';"
			customCSSFontFace += "	src: url('" + encodeURI(option.split('@')[1].replace(/\\/g,"/")) + "') format('" + format + "');"
			customCSSFontFace += "}";
			if($('style.customCSS_default').text().indexOf(customCSSFontFace) == -1) addCustomCSS(customCSSFontFace);
			return fontFamily;
		}
		return option;
	}
	//Add customCSS
	if(customCSS) addCustomCSS(customCSS);
	//Return after time
	if(getUrlParameter('returnAfterTimeTreshold') != "0" && (getUrlParameter('returnAfterTimeTreshold') || options.LayoutViewReturnAfterTimeEnabled)) {
		returnAfterTimeDestinationView = getUrlParameter('returnAfterTimeDestinationView') || options.LayoutViewReturnAfterTimeDestinationView || homeId;
		returnAfterTimeTreshold = getUrlParameter('returnAfterTimeTreshold') || options.LayoutViewReturnAfterTimeTreshold || "600";
		if(!isNaN(returnAfterTimeTreshold)) returnAfterTimeTreshold = returnAfterTimeTreshold * 1; else returnAfterTimeTreshold = 600;
		if(returnAfterTimeTimestamp == false){ //Timestamp was not set before - add Eventlisteners to document
			$(document).on("touchstart mousedown keydown", function(){
				console.log("Return after time - timer started (treshold: " + returnAfterTimeTreshold + "s, destinationView: " + returnAfterTimeDestinationView + ")");
				returnAfterTimeTimestamp = new Date();
				//The check, if the treshold has been reached, is made in the onUpdate-Function of the WebSockets connCallbacks
			}).trigger("keydown");
		} else if(returnAfterTimeTimestamp && ((new Date().getTime() - returnAfterTimeTimestamp.getTime()) / 1000) > returnAfterTimeTreshold){ //Timer was set before and is over
			console.log("Return after time - time is over while running getStarted() - set actualView to destinationView");
			returnAfterTimeTimestamp = null;
			if((returnAfterTimeDestinationView == "" && actualViewId !== homeId) || (returnAfterTimeDestinationView !== "" && actualViewId !== returnAfterTimeDestinationView)) actualViewId = returnAfterTimeDestinationView;
		}
	}
	//Big Mode:
	if(getUrlParameter('bigModeEnabled') == "true") {
		console.log("BigModeEnabled by URL-Parameter");
		$('html').addClass('bigMode');
		bigMode = true;
	} else if(!options.LayoutViewBigModeDisabled) {
		if(window.matchMedia){
			if(window.matchMedia('screen and (min-width: ' + (options.LayoutViewBigModeTreshold || 1500) + 'px)').matches){
				$('html').addClass('bigMode');
				bigMode = true;
			}
			try{
				window.matchMedia('screen and (min-width: ' + (options.LayoutViewBigModeTreshold || 1500) + 'px)').removeEventListener('change', bigModeEventListenerFunction);
				window.matchMedia('screen and (min-width: ' + (options.LayoutViewBigModeTreshold || 1500) + 'px)').addEventListener('change', bigModeEventListenerFunction);
				function bigModeEventListenerFunction(e){
					bigMode = e.matches;
					if(bigMode) $('html').addClass('bigMode'); else $('html').removeClass('bigMode');
					document.querySelectorAll('.iQontrolDeviceBackgroundIframe').forEach(function(iframe){
						iframe.contentWindow.postMessage({ command: "parentBigModeEnabled", value: bigMode }, "*");			
					});
				}
			} catch (e) {
				console.warn("Match media not supported, error: " + JSON.stringify(e));
			}
		}
	}
	//Dark-Mode
	switch(options.LayoutColorModeDarkEnable){
		case "disabled":
		break;

		case "always":
		applyColorMode('dark');
		break;
		
		default:
		if(window.matchMedia){
			var darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
			applyColorMode(darkMode ? 'dark' : '');
			try{
				window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', darkModeEventListenerFunction);
				window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', darkModeEventListenerFunction);
				function darkModeEventListenerFunction(e){
					darkMode = e.matches;
					applyColorMode(darkMode ? 'dark' : '');
				}
			} catch (e) {
				console.warn("Match media not supported, error: " + JSON.stringify(e));
			}
		}
	}
	function applyColorMode(colorMode){
		$("html").removeClass(function(index, className){
			return (className.match (/(^|\s)color-mode-\S+/g) || []).join(' ');
		});	
		if(colorMode && colorMode != "") $("html").addClass("color-mode-" + colorMode);
	}
}

//++++++++++ PINCODE ++++++++++
function pincode(givenPincode, rightPinCallback, wrongPinCallback){
	pincodeClear();
	$('#pincode').show(150);
	$(document).one("keydown", function(event){pincodeKeydown(event.which);});
	$('#pincodeEnter').off("click").on("click", function(){
		if($('#pincodePin').val() == givenPincode){
			if(rightPinCallback) rightPinCallback();
		} else {
			if(wrongPinCallback) wrongPinCallback();
		}
		$('#pincode').hide(150);
		//setTimeout(function(){$(document).trigger("keydown");}, 250);
	});
}

function pincodeKeydown(which){
	if($('#pincode').css('display') != "none"){
		console.log("pincode Keydown: " + which);
		if(which == 13) {
			$('#pincodeEnter').trigger("click");
		} else if(which == 8){
			$("#pincodePin").val($("#pincodePin").val().slice(0, -1));
		} else if(48 <= which && which <= 57){
			pincodeAddNumber(which - 48);
		} else if(96 <= which && which <= 105){
			pincodeAddNumber(which - 96);
		}
		$(document).one("keydown", function(event){pincodeKeydown(event.which);});
	} else {
		console.log("pincode Keydown end listening");
	}
}

function pincodeAddNumber(number){
	$("#pincodePin").val($("#pincodePin").val() + number);
}

function pincodeClear(){
	$("#pincodePin").val("");
}

//++++++++++ TOOLBAR ++++++++++
function OLDrenderToolbar(){ //##########
	var toolbarItems = getObjectValue(config, namespace + ".toolbar.items", [], true, true);
	if(toolbarItems.length == 0){
		if(homeId == '') homeId = getObjectValue(config, namespace + ".views.0.commonName", "", true, true);
		return;
	}
	if(getUrlParameter('home')) config[namespace].toolbar.items[0].nativeLinkedView = getUrlParameter('home');
	if(homeId == '') homeId = addNamespaceToViewId(toolbarItems[0].nativeLinkedView);
	if(getUrlParameter('noToolbar')) return;
	removeCustomCSS("toolbarCustomIcons");
	toolbarLinksToOtherViews = [];
	var toolbarLinkedStateIdsToFetchAndUpdate = [];
	var toolbarLinkedStateIds = {};
	var toolbarContent = "<div data-role='navbar' data-iconpos='" + (typeof options.LayoutToolbarIconPosition != udef && options.LayoutToolbarIconPosition !== "" ? options.LayoutToolbarIconPosition : 'top') +  "' id='iQontrolToolbar'><ul>";
	for (var toolbarIndex = 0; toolbarIndex < toolbarItems.length; toolbarIndex++){
		var linkedViewId = addNamespaceToViewId(toolbarItems[toolbarIndex].nativeLinkedView);
		toolbarLinksToOtherViews.push(linkedViewId);
		toolbarLinkedStateIds = {};
		toolbarContent += "<li><a data-icon='" + (toolbarItems[toolbarIndex].nativeIcon ? (toolbarItems[toolbarIndex].nativeIcon.indexOf('.') == -1 ? toolbarItems[toolbarIndex].nativeIcon : "grid") : "") + "' data-index='" + toolbarIndex + "' onclick='if(!toolbarContextMenuIgnoreClick){ toolbarContextMenuEnd(); viewHistory = toolbarLinksToOtherViews; viewHistoryPosition = " + toolbarIndex + ";renderView(unescape(\"" + escape(linkedViewId) + "\"));}' class='iQontrolToolbarLink ui-nodisc-icon " + (typeof options.LayoutToolbarIconColor != udef && options.LayoutToolbarIconColor == 'black' ? 'ui-alt-icon' : '') + "' data-theme='b' id='iQontrolToolbarLink_" + toolbarIndex + "'>" + toolbarItems[toolbarIndex].commonName;
		if(toolbarItems[toolbarIndex].nativeIcon && toolbarItems[toolbarIndex].nativeIcon.indexOf('.') > -1){ //Custom icon
			customCSS = ".iQontrolToolbarLink[data-index='" + toolbarIndex + "']:after {";
			customCSS += "	background:url('" + toolbarItems[toolbarIndex].nativeIcon + "');";
			customCSS += "	background-size:" + (options.LayoutToolbarIconSize ? options.LayoutToolbarIconSize + "px;" : "cover;");
			customCSS += "	background-position:center;";
			customCSS += "	background-repeat:no-repeat;";
			customCSS += "}";
			addCustomCSS(customCSS, "toolbarCustomIcons");
		}
		//--Badge		
		var deviceId = namespace + ".Toolbar." + toolbarIndex;
		var deviceIdEscaped = escape(deviceId);
		//Get linkedStates (resp. create a constant one if role is const)
		["BADGE", "BADGE_COLOR"].forEach(function(toolbarState){
			var linkedStateId = getLinkedStateId(toolbarItems[toolbarIndex], deviceId + ".states", toolbarState);
			if(linkedStateId) { //Call updateFunction after rendering View
				toolbarLinkedStateIdsToFetchAndUpdate.push(linkedStateId);
			}
			toolbarLinkedStateIds[toolbarState] = linkedStateId;
		});
 		if(toolbarLinkedStateIds["BADGE"]){
			toolbarContent += "<div class='iQontrolToolbarBadge' data-iQontrol-Device-ID='" + deviceIdEscaped +"'></div>";
			(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
				var _deviceIdEscaped = deviceIdEscaped;
				var _linkedBadgeId = toolbarLinkedStateIds["BADGE"];
				var _linkedBadgeColorId = toolbarLinkedStateIds["BADGE_COLOR"];
				var _badgeWithoutUnit = ((toolbarItems[toolbarIndex].options || []).find(function(element){ return element.option == 'badgeWithoutUnit';}) || {}).value || false;
				var updateFunction = function(){
					var stateBadge = getStateObject(_linkedBadgeId);
					var stateBadgeColor = getStateObject(_linkedBadgeColorId);
					var colorString = stateBadgeColor && isValidColorString(stateBadgeColor.val) && stateBadgeColor.val || "rgba(255,0,0,0.8)";
					var restartActivateDelay = false;
					if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolToolbarBadge").data('background-color-string') != colorString){ //New color
						console.log("Badge - new color (" + colorString + ") - restartActivateDelay");
						restartActivateDelay = true;
						$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolToolbarBadge").css('background-color', colorString).data('background-color-string', colorString);
					}
					if(stateBadge && typeof stateBadge.val !== udef && stateBadge.val && stateBadge.plainText !== ""){ //Active
						var val = stateBadge.plainText;
						var unit = stateBadge.unit;
						if(!isNaN(val)) val = Math.round(val * 10) / 10;
						if(!_badgeWithoutUnit && stateBadge.plainText == stateBadge.val) val = val + unit;
						if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolToolbarBadge").data('val') != val){ //New val
							$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolToolbarBadge").html(val).data('val', val);
						}
						if(!$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolToolbarBadge").hasClass('active')){ //Not active until now
							if(restartActivateDelay || $("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolToolbarBadge").data('activate-delay-timeout') != "over"){ //ActivateDelay is not over
								console.log("Badge - new active - restartActivateDelay");
								restartActivateDelay = true;
							} else { //ActivateDelay is over
								console.log("Badge - new active - activateDelayTimeout is over - activate now");
								$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolToolbarBadge").addClass('active');
								stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState"));
							}
						}
					} else { //Inactive
						$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolToolbarBadge").removeClass('active');
						stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState"));
						if(!restartActivateDelay){
							clearTimeout($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolToolbarBadge").data('activate-delay-timeout'));
							$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolToolbarBadge").data('activate-delay-timeout', null);
						}
					}
					if(restartActivateDelay){
						clearTimeout($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolToolbarBadge").data('activate-delay-timeout'));
						$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolToolbarBadge").data('activate-delay-timeout', setTimeout(function(){
							console.log("Badge - activateDelay-Timeout is over - recall updateFunction");
							$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolToolbarBadge").data('activate-delay-timeout', 'over');
							updateFunction();
						}, 500));
					}
				};
				toolbarUpdateFunctions[_linkedBadgeId].push(updateFunction);
				if(_linkedBadgeColorId) toolbarUpdateFunctions[_linkedBadgeColorId].push(updateFunction);
			})(); //<--End Closure
		}
		toolbarContent += "</a></li>";
		//Create toolbarContextMenu
		toolbarContextMenu[toolbarIndex] = {};
		toolbarContextMenuLinksToOtherViews[toolbarIndex] = [];
		(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
			var _toolbarIndex = toolbarIndex;
			var _linkedViewId = linkedViewId;
			fetchView(_linkedViewId, function(){
				var view = getView(_linkedViewId);
				if(view && typeof view.devices != udef) for (var deviceIndex = 0; deviceIndex < view.devices.length; deviceIndex++){ //Go through all devices on nativeLinkedView of the toolbar
					if(typeof view.devices[deviceIndex].nativeLinkedView != udef && view.devices[deviceIndex].nativeLinkedView != null && view.devices[deviceIndex].nativeLinkedView !== "" && !view.devices[deviceIndex].nativeHide){ //Link to other view
						var deviceLinkedViewId = addNamespaceToViewId(view.devices[deviceIndex].nativeLinkedView);
						if(deviceLinkedViewId && typeof getViewIndex(deviceLinkedViewId) !== udef && typeof config[namespace].views[getViewIndex(deviceLinkedViewId)] !== udef) {
							var deviceLinkedViewName = config[namespace].views[getViewIndex(deviceLinkedViewId)].commonName;
							toolbarContextMenu[toolbarIndex][deviceLinkedViewId] = {name: _("Open %s", deviceLinkedViewName), icon:'grid', href: '', target: '', onclick: '$("#ToolbarContextMenu").popup("close"); renderView(unescape("' + escape(deviceLinkedViewId) + '")); viewHistory = toolbarContextMenuLinksToOtherViews[' + toolbarIndex + ']; viewHistoryPosition = ' + toolbarContextMenuLinksToOtherViews[toolbarIndex].length + '; $(".iQontrolToolbarLink").removeClass("ui-btn-active"); $("#iQontrolToolbarLink_' + toolbarIndex + '").addClass("ui-btn-active");'};
							toolbarContextMenuLinksToOtherViews[toolbarIndex].push(deviceLinkedViewId);
						}
					}
				};
			});
		})(); //<--End Closure
	}
	toolbarContent += "</ul></div>";
	if(options.LayoutToolbarSingleLine) {
		customCSS = "#Toolbar li {";
		customCSS += "	width: calc(100% / " + toolbarItems.length + ") !important;";
		customCSS += "	clear: none !important;";
		customCSS += "}";
		customCSS += "#Toolbar li a {";
		customCSS += "	border-top-width: 1px !important;";
		customCSS += "}";
		removeCustomCSS("toolbarSingleLine");
		addCustomCSS(customCSS, "toolbarSingleLine");
	};
	$("#ToolbarContent").html(toolbarContent);
	$("#ToolbarContent").enhanceWithin();
	applyToolbarContextMenu();
	toolbarLinkedStateIdsToFetchAndUpdate = removeDuplicates(toolbarLinkedStateIdsToFetchAndUpdate);
	fetchStates(toolbarLinkedStateIdsToFetchAndUpdate, function(){
		for (var i = 0; i < toolbarLinkedStateIdsToFetchAndUpdate.length; i++){
			if(typeof fetchedObjects[toolbarLinkedStateIdsToFetchAndUpdate[i]] == udef) {
				fetchObject(toolbarLinkedStateIdsToFetchAndUpdate[i], function(){
					updateState(toolbarLinkedStateIdsToFetchAndUpdate[i], "ignorePreventUpdateForToolbar");
				});
			} else {
				updateState(toolbarLinkedStateIdsToFetchAndUpdate[i], "ignorePreventUpdateForToolbar");
			}
		}
		toolbarLinkedStateIdsToFetchAndUpdate = [];
		applyToolbarAdaptHeightOrMarqueeObserver();
	});
}

function applyToolbarContextMenu(){
	$('.iQontrolToolbarLink.ui-btn').on('touchstart mousedown', function(event){
		//console.log("toolbarContextMenu start via TOUCHSTART/MOUSEDOWN");
		var posY = event.originalEvent.clientY || event.originalEvent.touches[0].clientY || 0;
		var saveAreaInsetBottom = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--saveAreaInsetBottom"), 10) || 0;
		if(posY > window.innerHeight - saveAreaInsetBottom){
			//console.log("toolbarContextMenu start aborted, because touch was in safe area");
			return;
		}
		toolbarContextMenuStart(event.target);
		viewDeviceContextMenuEnd();
	});
	$(window).on('touchend mouseup', function(){
		//console.log("toolbarContextMenu end via TOUCHEND/MOUSEUP");
		toolbarContextMenuEnd();
	});
	/*
	$(window).scroll(function(){
		if(!toolbarContextMenuIgnoreStart){
			console.log("toolbarContextMenu end via SCROLL");
			toolbarContextMenuEnd();
		}
	});
	*/
}

function toolbarContextMenuStart(callingElement){
	console.log("toolbarContextMenu start function");
	if(toolbarContextMenuIgnoreStart) {
		console.log("toolbarContextMenu start ignored");
		return;
	}
	$('.iQontrolToolbarLink.ui-btn, #ViewMain, .backstretch').css('filter', 'blur(0px)');
	toolbarContextMenuIgnoreClick = false;
	setTimeout(function(){
		toolbarContextMenuIgnoreClick = false;
		console.log("toolbarContextMenu ignore click ended after 100ms");
	}, 100);
	toolbarContextMenuLevel = 0;
	if(toolbarContextMenuInterval) clearInterval(toolbarContextMenuInterval);
	(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
		var _callingElement = callingElement;
		toolbarContextMenuInterval = setInterval(function(){
			toolbarContextMenuLevel += 0.05;
			var level = (toolbarContextMenuLevel - 0.2) * 1.25; //Ignore level <0.2
			if(level > 0.5 && !toolbarContextMenuIgnoreClick){
				console.log("toolbarContextMenu startDeepPress");
				toolbarContextMenuIgnoreClick = true;
			}
			if(level >= 1){ //Maximum reached
				console.log("toolbarContextMenu maximum reached");
				toolbarContextMenuIgnoreStart = true;
				openToolbarContextMenu($(_callingElement).data('index'), _callingElement);
				toolbarContextMenuEnd();
			} else if(level > 0) {
				$('.iQontrolToolbarLink.ui-btn:not(:hover), #ViewMain, .backstretch').css('filter', 'blur(' + 9 * level + 'px)');
			}
		}, 25);
	})(); //<--End Closure
}

function toolbarContextMenuEnd(dontEndIgnoreStart){
	//console.log("toolbarContextMenu end function");
	toolbarContextMenuIgnoreStart = true;
	$('.iQontrolToolbarLink.ui-btn, #ViewMain, .backstretch').css('filter', 'blur(0px)');
	if(toolbarContextMenuInterval) clearInterval(toolbarContextMenuInterval);
	setTimeout(function(){
		//console.log("toolbarContextMenu end function - find active Toolbar Index");
		var toolbarIndex = -1;
		for (var i = 0; i < config[namespace].toolbar.length; i++){
			if(addNamespaceToViewId(config[namespace].toolbar[i].nativeLinkedViaew) == actualViewId) {
				toolbarIndex = i;
				break;
			}
		}
		if(toolbarIndex >= 0) {
			$(".iQontrolToolbarLink").removeClass("ui-btn-active");
			$("#iQontrolToolbarLink_" + toolbarIndex).addClass("ui-btn-active");
		}
	}, 1);
	if(!dontEndIgnoreStart) setTimeout(function(){
		//console.log("toolbarContextMenu end function - end ignoreStart");
		toolbarContextMenuIgnoreStart = false;
		toolbarContextMenuIgnoreClick = false;
	}, 300);
}

function openToolbarContextMenu(toolbarIndex, callingElement){
	console.log("toolbarContextMenu openToolbarContextMenu");
	if(toolbarContextMenu[toolbarIndex] && Object.keys(toolbarContextMenu[toolbarIndex]).length > 0){
		console.log("toolbarContextMenu openToolbarContextMenu - open");
		$('#ToolbarContextMenuList').empty();
		for (key in toolbarContextMenu[toolbarIndex]){
			var element = toolbarContextMenu[toolbarIndex][key];
			$('#ToolbarContextMenuList').append('<li' + (typeof element.icon != udef ? ' data-icon="' + element.icon + '"' : '') + ' class="ui-nodisc-icon ui-alt-icon" style="' + (typeof element.hidden != udef && element.hidden ? 'display: none;' : '') + '"><a href="' + (typeof element.href != udef ? element.href : '') + '" target="' + (typeof element.target != udef ? element.target : '') + '" onclick=\'' + (typeof element.onclick != udef ? element.onclick : '') + '\'>' + (typeof element.name != udef ? element.name : key) + '</a></li>');
		};
		$('#ToolbarContextMenuList').listview('refresh');
		$("#ToolbarContextMenu").data('closeable', 'false').popup("open", {transition: "pop", positionTo: $(callingElement)});
		toolbarContextMenuEnd(true);
	} else { //callingElement has no contextMenu
		console.log("toolbarContextMenu openToolbarContextMenu - calling Element has no contextMenu");
		toolbarContextMenuIgnoreClick = false;
		$(callingElement).click();
		$('.iQontrolToolbarLink.ui-btn, #ViewMain, .backstretch').css('filter', 'blur(0px)');
	}
}

function applyToolbarAdaptHeightOrMarqueeObserver(){
	console.log("Starting toolbarAdaptHeightOrMarqueeObserver");
	if(toolbarAdaptHeightOrMarqueeObserver){
		toolbarAdaptHeightOrMarqueeObserver.disconnect();
	} else {
		toolbarAdaptHeightOrMarqueeObserver = new MutationObserver(function(mutationList){
			if(typeof mutationList[0] == udef || typeof mutationList[0].addedNodes[0] == udef || typeof mutationList[0].addedNodes[0].className == udef || mutationList[0].addedNodes[0].className != "js-marquee"){ //check if the mutation is fired by marquee itself
				if(!($(mutationList[0].target).data('marquee-disabled') == "true")) adaptHeightOrStartMarqueeOnOverflow($(mutationList[0].target));
			}
		});
	}
	$('.iQontrolToolbarBadge').each(function(){
		toolbarAdaptHeightOrMarqueeObserver.observe(this, {attributes: false, childList: true, subtree: false});
		adaptHeightOrStartMarqueeOnOverflow($(this));
	});
}

//++++++++++ VIEW ++++++++++
function renderView(viewId, triggeredByReconnection){ return; //###########
	console.log("renderView " + viewId + ", triggeredByReconnection: " + !!triggeredByReconnection);
	if(!viewId){ viewId = homeId; console.log("Set viewId to homeId: " + viewId); }
	if(!viewId){ console.log("No viewId to render!"); return; }
	if(actualViewId != addNamespaceToViewId(viewId)) triggeredByReconnection = false;
	actualViewId = addNamespaceToViewId(viewId).split('#')[0];
	//Mark actual view on toolbar
	var toolbarIndex = -1;
	if(config[namespace] && config[namespace].toolbar) for (var i = 0; i < config[namespace].toolbar.length; i++){
		if(addNamespaceToViewId(config[namespace].toolbar[i].nativeLinkedView) == actualViewId) {
			toolbarIndex = i;
			break;
		}
	}
	if(toolbarIndex >= 0) {
		$(".iQontrolToolbarLink").removeClass("ui-btn-active");
		$("#iQontrolToolbarLink_" + toolbarIndex).addClass("ui-btn-active");
	}
	//Show or hide homeButton
	if(isBackgroundView && actualViewId != homeId){
		$(".viewHomeButton").show();
	} else {
		$(".viewHomeButton").hide();
	}
	//Fetch view
	fetchView(actualViewId, function(){
		actualView = getView(actualViewId);
		if(!actualView) return;
		viewUpdateFunctions = {};
		viewUpdateFunctions["UPDATE_ONCE"] = [];
		viewLinkedStateIdsToFetchAndUpdate = [];
		viewLinksToOtherViews = [];
		if(viewTimestampElapsedTimer){
			clearInterval(viewTimestampElapsedTimer);
			viewTimestampElapsedTimer = false;
		}
		viewTimestampElapsedTimerStates = [];
		if(viewInfoSliderInterval) clearInterval(viewInfoSliderInterval);
		viewInfoASliderLength = [];
		viewInfoASliderIndex = [];
		viewInfoBSliderLength = [];
		viewInfoBSliderIndex = [];
		//Change Background
		if(actualView.nativeBackgroundImage) {
			changeViewBackground(encodeURI(actualView.nativeBackgroundImage));
		} else {
			changeViewBackground();
		}
		//Render View
		if(!triggeredByReconnection) {
			setTimeout(function(){window.scrollTo(0, 0);}, 100);
			removeCustomCSS('addViewPaddingBottomAfterMinimizingTile');
		}
		var viewContent = "<div class='viewShuffleContainer'><div class='iQontrolDeviceShuffleSizer'></div>";
		if(actualView.devices) for (var deviceIndex = 0; deviceIndex < actualView.devices.length; deviceIndex++){
			var deviceId = actualViewId + ".devices." + deviceIndex;
			var deviceIdEscaped = escape(deviceId);
			var device = actualView.devices[deviceIndex];
			//New Line & Heading
			if(device.nativeHeading) {
				var variablename = encodeURI(device.nativeHeading.split('|').slice(1).join('|'));
				viewContent += "</div>" + (deviceIndex > 0 ? "<div class='viewNewSectionSpacer'></div>" : "") + "<h4>";
				if(device.nativeHeadingOptions && (device.nativeHeadingOptions == "CO" || device.nativeHeadingOptions == "CC" || device.nativeHeadingOptions == "COC" || device.nativeHeadingOptions == "CCC")) {
					viewContent += "<div class='iQontrolSubheaderCollapsible fullScreenWidth" + (device.nativeHeadingOptions == "CC" || device.nativeHeadingOptions == "CCC" ? " collapsibleClosed" : "") + (device.nativeHeadingOptions == "COC" || device.nativeHeadingOptions == "CCC" ? " collapsibleClosesWhenOthersOpen" : "") + "' style='position: absolute; top:0; padding-top: inherit; height: 100%;' data-iQontrol-Device-ID='" + deviceIdEscaped + "'>";
					viewContent += "	<div class='iQontrolSubheadingCollapsibleIcon plus'><span>" + (options && options.LayoutViewSubHeaderCollapsibleLabelPlus || "&plus;") + "</span></div>";
					viewContent += "	<div class='iQontrolSubheadingCollapsibleIcon minus'><span>" + (options && options.LayoutViewSubHeaderCollapsibleLabelMinus || "&minus;") + "</span></div>";
					viewContent += "</div>";
				}
				viewContent += "<div class='subHeaderText fullScreenWidth'" + (variablename  ? " data-variablename='" + variablename + "' " : "") + ">" + device.nativeHeading.split('|')[0] + "</div></h4><div class='viewShuffleContainer" + (device.nativeHeadingOptions == "CC" || device.nativeHeadingOptions == "CCC" ? " collapsibleClosed collapsibleContentClosed" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "'><div class='iQontrolDeviceShuffleSizer'></div>";
			} else if(device.nativeNewLine) {
				viewContent += "</div><div class='viewNewLineSpacer'></div><div class='viewShuffleContainer'><div class='iQontrolDeviceShuffleSizer'></div>";
			} else if(deviceIndex == 0) {
				viewContent += "</div><div class='viewFirstLineNoHeadingSpacer'></div><div class='viewShuffleContainer'><div class='iQontrolDeviceShuffleSizer'></div>";
			}
			//Render Device
			if(device.nativeHide) continue;
			var deviceContent = "";
			//--Get linked States
			//  While getting the LinkedStateId the correspondig usedObject is also fetched
			var deviceLinkedStateIds = {};
			if(device.commonRole && iQontrolRoles[device.commonRole] && typeof iQontrolRoles[device.commonRole].states != udef){
				iQontrolRoles[device.commonRole].states.forEach(function(roleState){
					var linkedStateId = getLinkedStateId(device, deviceId, roleState);
					if(linkedStateId) { //Call updateFunction after rendering View
						viewLinkedStateIdsToFetchAndUpdate.push(linkedStateId);
					}
					deviceLinkedStateIds[roleState] = linkedStateId;
				});
			}
			//--Special: the option tileActiveStateId is transferred to deviceLinkedStateIds["tileActiveStateId"] and fetched
			var linkedTileActiveStateId = getDeviceOptionValue(device, "tileActiveStateId");
			if(linkedTileActiveStateId) { //Call updateFunction after rendering View
				if(!viewUpdateFunctions[linkedTileActiveStateId]) viewUpdateFunctions[linkedTileActiveStateId] = [];
				viewLinkedStateIdsToFetchAndUpdate.push(linkedTileActiveStateId);
			}
			deviceLinkedStateIds["tileActiveStateId"] = linkedTileActiveStateId;
			//--viewDeviceContextMenu
			viewDeviceContextMenu[deviceIdEscaped] = {};
			viewDeviceContextMenu[deviceIdEscaped].dialog = {name: _("Properties..."), icon: 'comment', href: '', target: '', onclick: '$("#ViewDeviceContextMenu").popup("close"); setTimeout(function(){renderDialog("' + deviceIdEscaped + '"); $("#Dialog").popup("open", {transition: "pop", positionTo: "window"});}, 400);'};
			var onclick = "$(\"#ViewDeviceContextMenu\").popup(\"close\"); toggleState(unescape(\"" + escape(deviceLinkedStateIds["tileEnlarged"]) + "\"), \"" + deviceIdEscaped + "\");";
			viewDeviceContextMenu[deviceIdEscaped].enlarge = {name: _("Enlarge"), icon:'arrow-u-r', href: '', target: '', onclick: onclick, hidden: true};
			viewDeviceContextMenu[deviceIdEscaped].reduce = {name: _("Reduce"), icon:'arrow-d-l', href: '', target: '', onclick: onclick, hidden: true};
			//--Get viewLinksToOtherViews
			if(device.nativeLinkedView && device.nativeLinkedView !== "") { //Link to other view
				var deviceLinkedViewId = addNamespaceToViewId(device.nativeLinkedView);
				if(deviceLinkedViewId && typeof getView(deviceLinkedViewId.split("#")[0]) !== udef && getView(deviceLinkedViewId.split("#")[0]) && typeof getView(deviceLinkedViewId.split("#")[0]).commonName !== udef){
					var deviceLinkedViewName = getView(deviceLinkedViewId.split("#")[0]).commonName;
					if(isBackgroundView && getDeviceOptionValue(device, "renderLinkedViewInParentInstance") == "true"){ // renderLinkedViewInParentInstance
						var closePanel = (getDeviceOptionValue(device, "renderLinkedViewInParentInstanceClosesPanel") == "true");
						viewDeviceContextMenu[deviceIdEscaped].linkedView = {name: _("Open %s", deviceLinkedViewName), icon:'grid', href: '', target: '', onclick: '$("#ViewDeviceContextMenu").popup("close"); renderViewInParentInstance(unescape("' + escape(deviceLinkedViewId) + '"), ' + closePanel + ');'};
					} else {
						viewLinksToOtherViews.push(deviceLinkedViewId);
						viewDeviceContextMenu[deviceIdEscaped].linkedView = {name: _("Open %s", deviceLinkedViewName), icon:'grid', href: '', target: '', onclick: '$("#ViewDeviceContextMenu").popup("close"); viewHistory = viewLinksToOtherViews; viewHistoryPosition = ' + (viewLinksToOtherViews.length - 1) + '; renderView(unescape("' + escape(deviceLinkedViewId) + '"));'};
					}
				}
			}
			//--PressureIndicator
			viewContent += "<div data-groups='" + device.commonRole + "' class='viewShuffleTile iQontrolDevicePressureIndicator" + ((getDeviceOptionValue(device, "hideDeviceIfInactive") == "true")?" hideDeviceIfInactive":"") + ((getDeviceOptionValue(device, "hideDeviceIfActive") == "true")?" hideDeviceIfActive":"") + "' " + (((getDeviceOptionValue(device, "hideDeviceIfInactive") == "true") || (getDeviceOptionValue(device, "hideDeviceIfActive") == "true"))?"style='visibility: hidden; height:0px;' ":"") + "data-iQontrol-Device-ID='" + deviceIdEscaped + "'>";
				//--Hide
				/* if(deviceLinkedStateIds["HIDE"]){
					(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
						var _device = device;
						var _deviceIdEscaped = deviceIdEscaped;
						var _linkedHideId = deviceLinkedStateIds["HIDE"];
						var updateFunction = function(){
							var stateHide = getStateObject(_linkedGlowHideId);
							var invertHide = (getDeviceOptionValue(_device, "invertHide") == "true");
							var hide = !(stateHide && stateHide.val || false);
							if(invertHide) hide = !hide;
							if(hide){
								$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").addClass("hideDevice");
							} else {
								$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").removeClass("hideDevice");
							}
						};
						viewUpdateFunctions[_linkedHideId].push(updateFunction);
					})(); //<--End Closure
				} */
				//--Glow
				if(deviceLinkedStateIds["GLOW_INACTIVE_COLOR"]){
					viewContent += "<div class='iQontrolDeviceGlow' data-iQontrol-Device-ID='" + deviceIdEscaped + "'></div>";
					(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
						var _device = device;
						var _deviceIdEscaped = deviceIdEscaped;
						var _linkedGlowInactiveColorId = deviceLinkedStateIds["GLOW_INACTIVE_COLOR"];
						var _linkedGlowHideId = deviceLinkedStateIds["GLOW_HIDE"];
						var updateFunction = function(){
							var stateGlowInactiveColor = getStateObject(_linkedGlowInactiveColorId);
							var stateGlowHide = getStateObject(_linkedGlowHideId);
							var invertGlowHide = (getDeviceOptionValue(_device, "invertGlowHide") == "true");
							var glow = !(stateGlowHide && stateGlowHide.val || false);
							if(invertGlowHide) glow = !glow;
							var colorString = stateGlowInactiveColor && isValidColorString(stateGlowInactiveColor.val) && stateGlowInactiveColor.val || null;
							if(glow && colorString){
								$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceGlow:not(.active)").css('box-shadow', colorString + " 0 0 10px 2px");
							} else {
								$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceGlow:not(.active)").css('box-shadow', "none");
							}
						};
						viewUpdateFunctions[_linkedGlowInactiveColorId].push(updateFunction);
						if(_linkedGlowHideId) viewUpdateFunctions[_linkedGlowHideId].push(updateFunction);
					})(); //<--End Closure
				}
				//--Glow active
				var linkGlowActiveColorToHue = (getDeviceOptionValue(device, "linkGlowActiveColorToHue") == "true");
				if(deviceLinkedStateIds["GLOW_ACTIVE_COLOR"] || linkGlowActiveColorToHue){
					viewContent += "<div class='iQontrolDeviceGlow active' data-iQontrol-Device-ID='" + deviceIdEscaped + "'></div>";
					(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
						var _device = device;
						var _deviceId = deviceId;
						var _deviceIdEscaped = deviceIdEscaped;
						var _linkedGlowActiveColorId = deviceLinkedStateIds["GLOW_ACTIVE_COLOR"];
						var _linkedGlowHideId = deviceLinkedStateIds["GLOW_HIDE"];
						var _linkGlowActiveColorToHue = linkGlowActiveColorToHue;
						var _linkedHueId = deviceLinkedStateIds["HUE"];
						var _linkedSaturationId = deviceLinkedStateIds["SATURATION"];
						var _linkedAlternativeColorspaceValueId = deviceLinkedStateIds["ALTERNATIVE_COLORSPACE_VALUE"];
						var updateFunction = function(){
							var stateGlowActiveColor = getStateObject(_linkedGlowActiveColorId);
							var stateGlowHide = getStateObject(_linkedGlowHideId);
							var invertGlowHide = (getDeviceOptionValue(_device, "invertGlowHide") == "true");
							var glow = !(stateGlowHide && stateGlowHide.val || false);
							if(invertGlowHide) glow = !glow;
							if(!_linkedHueId && _linkedAlternativeColorspaceValueId) _linkedHueId = "TEMP:" + _deviceId + ".HUE";
							var stateHue = getStateObject(_linkedHueId);
							if(_linkGlowActiveColorToHue && stateHue && stateHue.val !== ""){
								var hueMin = stateHue.min || 0;
								var hueMax = stateHue.max || 359;
								var hue = ((stateHue.val - hueMin) / (hueMax - hueMin)) * 359;
								var	saturation = 100;
								var stateSaturation = getStateObject(_linkedSaturationId);
								if(stateSaturation && typeof stateSaturation.val != udef) {
									var saturationMin = stateSaturation.min || 0;
									var saturationMax = stateSaturation.max || 100;
									saturation = ((stateSaturation.val - saturationMin) / (saturationMax - saturationMin)) * 100;
								}
								var colorString = "hsl(" + hue + ", 100%," + (100-(saturation/2)) + "%)";
							} else if(_linkGlowActiveColorToHue){
								var colorString = "rgb(255,245,157)";
							} else {
								var colorString = stateGlowActiveColor && isValidColorString(stateGlowActiveColor.val) && stateGlowActiveColor.val || null;
							}
							if(glow && colorString){
								$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceGlow.active").css('box-shadow', colorString + " 0 0 10px 2px");
							} else {
								$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceGlow.active").css('box-shadow', "none");
							}
						};
						if(_linkedGlowActiveColorId) viewUpdateFunctions[_linkedGlowActiveColorId].push(updateFunction);
						if(_linkedGlowHideId) viewUpdateFunctions[_linkedGlowHideId].push(updateFunction);
						if(_linkGlowActiveColorToHue && _linkedHueId) viewUpdateFunctions[_linkedHueId].push(updateFunction);
						if(_linkGlowActiveColorToHue && !_linkedHueId && _linkedAlternativeColorspaceValueId) viewUpdateFunctions[_linkedAlternativeColorspaceValueId].push(updateFunction);
						if(_linkGlowActiveColorToHue && !_linkedHueId) viewUpdateFunctions["UPDATE_ONCE"].push(updateFunction);
						if(_linkGlowActiveColorToHue && _linkedSaturationId) viewUpdateFunctions[_linkedSaturationId].push(updateFunction);
					})(); //<--End Closure
				}
				//--Badge
				if(deviceLinkedStateIds["BADGE"]){
					viewContent += "<div class='iQontrolDeviceBadge' data-iQontrol-Device-ID='" + deviceIdEscaped + "'></div>";
					(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
						var _device = device;
						var _deviceIdEscaped = deviceIdEscaped;
						var _linkedBadgeId = deviceLinkedStateIds["BADGE"];
						var _linkedBadgeColorId = deviceLinkedStateIds["BADGE_COLOR"];
						var updateFunction = function(){
							var stateBadge = getStateObject(_linkedBadgeId);
							var stateBadgeColor = getStateObject(_linkedBadgeColorId);
							var badgeWithoutUnit = (getDeviceOptionValue(_device, "badgeWithoutUnit") == "true");
							var showBadgeIfZero = (getDeviceOptionValue(_device, "showBadgeIfZero") == "true");
							var colorString = stateBadgeColor && isValidColorString(stateBadgeColor.val) && stateBadgeColor.val || "rgba(255,0,0,0.8)";
							var restartActivateDelay = false;
							if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBadge").data('background-color-string') != colorString){ //New color
								console.log("Badge - new color (" + colorString + ") - restartActivateDelay");
								restartActivateDelay = true;
								$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBadge").css('background-color', colorString).data('background-color-string', colorString);
							}
							if(stateBadge && typeof stateBadge.val !== udef && (showBadgeIfZero || stateBadge.val) && stateBadge.plainText !== ""){ //Active
								var val = stateBadge.plainText;
								var unit = stateBadge.unit;
								if(!isNaN(val)) val = Math.round(val * 10) / 10;
								if(!badgeWithoutUnit && stateBadge.plainText == stateBadge.val) val = val + unit;
								if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBadge").data('val') != val){ //New val
									$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBadge").html(val).data('val', val);
								}
								if(!$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBadge").hasClass('active')){ //Not active until now
									if(restartActivateDelay || $("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBadge").data('activate-delay-timeout') != "over"){ //ActivateDelay is not over
										console.log("Badge - new active - restartActivateDelay");
										restartActivateDelay = true;
									} else { //ActivateDelay is over
										console.log("Badge - new active - activateDelayTimeout is over - activate now");
										$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBadge").addClass('active');
										stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState"));
									}
								}
							} else { //Inactive
								$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBadge").removeClass('active');
								stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState"));
								if(!restartActivateDelay){
									clearTimeout($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBadge").data('activate-delay-timeout'));
									$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBadge").data('activate-delay-timeout', null);
								}
							}
							if(restartActivateDelay){
								clearTimeout($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBadge").data('activate-delay-timeout'));
								$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBadge").data('activate-delay-timeout', setTimeout(function(){
									console.log("Badge - activateDelay-Timeout is over - recall updateFunction");
									$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBadge").data('activate-delay-timeout', 'over');
									updateFunction();
								}, 500));
							}
						};
						viewUpdateFunctions[_linkedBadgeId].push(updateFunction);
						if(_linkedBadgeColorId) viewUpdateFunctions[_linkedBadgeColorId].push(updateFunction);
					})(); //<--End Closure
				}
				//--Device
				var linkedTileEnlargedId = deviceLinkedStateIds["tileEnlarged"];
				var stateEnlarged = getStateObject(linkedTileEnlargedId);
				var enlarged = stateEnlarged && stateEnlarged.val;
				if(enlarged == null) enlarged = (getDeviceOptionValue(device, "tileEnlargeStartEnlarged") == "true");
				var stateHeightAdaptsContentInactive = (getDeviceOptionValue(device, "stateHeightAdaptsContentInactive") == "true");
				var stateHeightAdaptsContentActive = (getDeviceOptionValue(device, "stateHeightAdaptsContentActive") == "true");
				var stateHeightAdaptsContentEnlarged = (getDeviceOptionValue(device, "stateHeightAdaptsContentEnlarged") == "true");
				viewContent += "<div class='iQontrolDevice" + ((getDeviceOptionValue(device, "transparentIfInactive") == "true") ? " transparentIfInactive" : "") + ((getDeviceOptionValue(device, "transparentIfActive") == "true") ? " transparentIfActive" : "") + ((getDeviceOptionValue(device, "transparentIfEnlarged") == "true") ? " transparentIfEnlarged" : "") + (getDeviceOptionValue(device, "sizeInactive") ? " " + getDeviceOptionValue(device, "sizeInactive") : "") + (getDeviceOptionValue(device, "sizeActive") ? " " + getDeviceOptionValue(device, "sizeActive") : "") + (getDeviceOptionValue(device, "sizeEnlarged") ? " " + getDeviceOptionValue(device, "sizeEnlarged") : "") + (enlarged ? " enlarged": "") + (stateHeightAdaptsContentInactive ? " adaptsHeightIfInactive" : "") + (stateHeightAdaptsContentActive ? " adaptsHeightIfActive" : "") + (stateHeightAdaptsContentEnlarged ? " adaptsHeightIfEnlarged" : "") + ((getDeviceOptionValue(device, "bigIconInactive") == "true") ? " bigIconIfInactive" : "") + ((getDeviceOptionValue(device, "bigIconActive") == "true") ? " bigIconIfActive" : "") + ((getDeviceOptionValue(device, "bigIconEnlarged") != "false") ? " bigIconIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "'>";
					//--Link (clickOnTileAction)
					var clickOnTileAction = getDeviceOptionValue(device, "clickOnTileAction");
					if(clickOnTileAction == "toggle") { //clickOnTile: toggle
						deviceContent += "<div class='iQontrolDeviceLink toggle' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-onclick='if(viewDeviceContextMenu[\"" + deviceIdEscaped + "\"] && viewDeviceContextMenu[\"" + deviceIdEscaped + "\"].toggle && viewDeviceContextMenu[\"" + deviceIdEscaped + "\"].toggle.onclick){new Function(viewDeviceContextMenu[\"" + deviceIdEscaped + "\"].toggle.onclick)();}'>";
					} else if(clickOnTileAction == "openDialog") { //clickOnTile: openDialog
						deviceContent += "<div class='iQontrolDeviceLink dialog' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-onclick='renderDialog(\"" + deviceIdEscaped + "\"); $(\"#Dialog\").popup(\"open\", {transition: \"pop\", positionTo: \"window\"});'>";
					} else if(clickOnTileAction == "enlarge") { //clickOnTile: enlarge
						deviceContent += "<div class='iQontrolDeviceLink enlarge' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-onclick='event.stopPropagation(); toggleState(unescape(\"" + escape(deviceLinkedStateIds["tileEnlarged"]) + "\"), \"" + deviceIdEscaped + "\", null, 0);'>";
					} else if(clickOnTileAction == "false") { //clickOnTile: false (do nothing)
						deviceContent += "<div class='iQontrolDeviceLink noLink' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-onclick=''>";
					} else if(clickOnTileAction == "openURLExternal") { //clickOnTile: openURLExternal
						if(deviceLinkedStateIds["URL"]){
							deviceContent += "<a class='iQontrolDeviceLink externalLink' data-iQontrol-Device-ID='" + deviceIdEscaped + "' target='_blank'>";
						}
					} else { //clickOnTile: openLinkToOtherView (default)
						if(typeof device.nativeLinkedView !== udef && device.nativeLinkedView !== "") { //Link to other view
							if(isBackgroundView && getDeviceOptionValue(device, "renderLinkedViewInParentInstance") == "true"){ // renderLinkedViewInParentInstance
								var closePanel = (getDeviceOptionValue(device, "renderLinkedViewInParentInstanceClosesPanel") == "true");
								deviceContent += "<div class='iQontrolDeviceLink linkedView' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-onclick='renderViewInParentInstance(unescape(\"" + escape(device.nativeLinkedView) + "\"), " + closePanel + ");'>";
							} else { //Normal Link to other view
								deviceContent += "<div class='iQontrolDeviceLink linkedView' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-onclick='viewHistory = viewLinksToOtherViews; viewHistoryPosition = " + (viewLinksToOtherViews.length - 1) + "; renderView(unescape(\"" + escape(device.nativeLinkedView) + "\"));'>";
							}
						} else { //No Link to other view present
							deviceContent += "<div class='iQontrolDeviceLink noLink' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-onclick=''>";
						}
					}
					if(deviceLinkedStateIds["URL"]){
						viewDeviceContextMenu[deviceIdEscaped].externalLink = {name: _("Open External Link"), icon: 'action', href: '', target: '_blank', onclick: '$("#ViewDeviceContextMenu").popup("close");', hidden: true};
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _device = device;
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedUrlId = deviceLinkedStateIds["URL"];
							viewUpdateFunctions[_linkedUrlId].push(function(){
								var href = getStateObject(_linkedUrlId);
								if(href && href.val){
									viewDeviceContextMenu[_deviceIdEscaped].externalLink.href = href.val;
									viewDeviceContextMenu[_deviceIdEscaped].externalLink.hidden = false
									if(_device.commonRole == "iQontrolExternalLink") $("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].externalLink").attr('href', href.val);
								} else {
									viewDeviceContextMenu[_deviceIdEscaped].externalLink.href = "";
									viewDeviceContextMenu[_deviceIdEscaped].externalLink.hidden = true;
									if(_device.commonRole == "iQontrolExternalLink") $("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].externalLink").attr('href', '');
								}
							});
						})(); //<--End Closure
					}
						//--BackgroundImage
						var noZoomOnHover = (getDeviceOptionValue(device, "noZoomOnHover") == "true") || (options && options.LayoutViewDeviceNoZoomOnHover);
						var url = "";
						var variableurl = null;
						if(device.nativeBackgroundImage){
							url = encodeURI(device.nativeBackgroundImage.split('|')[0]);
							variableurl = encodeURI(device.nativeBackgroundImage.split('|').slice(1).join('|'));
						}
						deviceContent += "<div class='iQontrolDeviceBackgroundImage" + (noZoomOnHover ? " noZoomOnHover" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' " + (variableurl ? "data-variablebackgroundimage='" + variableurl + "' " : "") + "style='background-image:url(" + url + ");'></div>";
						//--BackgroundImageActive
						url = "";
						variableurl = null;
						if(device.nativeBackgroundImageActive){
							url = encodeURI(device.nativeBackgroundImageActive.split('|')[0]);
							variableurl = encodeURI(device.nativeBackgroundImageActive.split('|').slice(1).join('|'));
						}
						deviceContent += "<div class='iQontrolDeviceBackgroundImage active" + (noZoomOnHover ? " noZoomOnHover" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' " + (variableurl ? "data-variablebackgroundimage='" + variableurl + "' " : "") + "style='background-image:url(" + url + ");'></div>";
						var overlayAboveBackgroundURL = (getDeviceOptionValue(device, "overlayAboveBackgroundURL") == "true");
						if(!overlayAboveBackgroundURL){
							//--Background (Overlay) (if option overlayAboveBackgroundURL is not set)
							if(!(getDeviceOptionValue(device, "noOverlayInactive") == "true")){
								deviceContent += "<div class='iQontrolDeviceBackground" + (getDeviceOptionValue(device, "noOverlayEnlarged") == "true" ? " hideIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "'></div>";
							}
							//--BackgroundActive (OverlayActive) (if option overlayAboveBackgroundURL is not set)
							if(!(getDeviceOptionValue(device, "noOverlayActive") == "true")){
								deviceContent += "<div class='iQontrolDeviceBackground active" + (getDeviceOptionValue(device, "noOverlayEnlarged") == "true" ? " hideIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "'></div>";
							}
						}
						//--BackgroundIframe (BACKGROUND_VIEW/URL/HTML)
						if(deviceLinkedStateIds["BACKGROUND_VIEW"] || deviceLinkedStateIds["BACKGROUND_URL"] || deviceLinkedStateIds["BACKGROUND_URL"]){
							var hideBackgroundURLInactive = (getDeviceOptionValue(device, "hideBackgroundURLInactive") == "true");
							var hideBackgroundURLActive = (getDeviceOptionValue(device, "hideBackgroundURLActive") == "true");
							var visibilityBackgroundURLEnlarged = (getDeviceOptionValue(device, "visibilityBackgroundURLEnlarged") ? " " + getDeviceOptionValue(device, "visibilityBackgroundURLEnlarged") : "");
							deviceContent += "<div class='iQontrolDeviceBackgroundIframeWrapper" + (hideBackgroundURLInactive ? " hideIfInactive" : "") + (hideBackgroundURLActive ? " hideIfActive" : "") + visibilityBackgroundURLEnlarged + (noZoomOnHover ? " noZoomOnHover" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' style='opacity: 0;" + ((getDeviceOptionValue(device, "backgroundURLNoPointerEvents") == "true") ? " pointer-events:none !important;" : "") + "'></div>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _device = device;
								var _linkedBackgroundViewId = deviceLinkedStateIds["BACKGROUND_VIEW"];
								var _linkedBackgroundURLId = deviceLinkedStateIds["BACKGROUND_URL"];
								var _linkedBackgroundHTMLId = deviceLinkedStateIds["BACKGROUND_HTML"];
								var updateFunction = function(){
									var stateBackgroundView = getStateObject(_linkedBackgroundViewId);
									var stateBackgroundURL = getStateObject(_linkedBackgroundURLId);
									var stateBackgroundHTML = getStateObject(_linkedBackgroundHTMLId);
									if((stateBackgroundView && typeof stateBackgroundView.val !== udef && stateBackgroundView.val !== "") || (stateBackgroundURL && typeof stateBackgroundURL.val !== udef && stateBackgroundURL.val !== "")){ //View or URL
										if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundIframeWrapper").html() == ""){ //create iframe
											var padding = parseInt(getDeviceOptionValue(_device, "backgroundURLPadding")) || 0;
											var paddingStyleString = (padding > 0 ? "style='margin: " + padding + "px; width: calc(100% - " + (2 * padding) + "px); min-height: calc(100% - " + (2 * padding) + "px);'" : "");
											var dynamicIframeZoomLevel = parseFloat(getDeviceOptionValue(_device, "backgroundURLDynamicIframeZoom")) || 0;
											var backgroundLimitAdjustHeightToScreen = (getDeviceOptionValue(_device, "backgroundLimitAdjustHeightToScreen") == "true");
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundIframeWrapper").html("<iframe class='iQontrolDeviceBackgroundIframe" + (dynamicIframeZoomLevel > 0 ? " dynamicIframeZoom" : "") + (backgroundLimitAdjustHeightToScreen ? " limitAdjustHeightToScreen" : "") + "' id='iQontrolDeviceBackgroundIframe_" + _deviceIdEscaped + "' data-iQontrol-Device-ID='" + _deviceIdEscaped + "'" + ((getDeviceOptionValue(_device, "backgroundURLAllowPostMessage") == "true") ? " data-allow-post-message='true'" : "") + paddingStyleString + (dynamicIframeZoomLevel > 0 ? " data-dynamic-iframe-zoom='" + dynamicIframeZoomLevel + "'" : "") + "></iframe>");
										}
										setTimeout(function(){
											var iframe = document.getElementById("iQontrolDeviceBackgroundIframe_" + _deviceIdEscaped);
											if(stateBackgroundView && typeof stateBackgroundView.val !== udef && stateBackgroundView.val !== "") { //View
												var adjustHeightToBackgroundView = (getDeviceOptionValue(_device, "adjustHeightToBackgroundView") == "true");
												$(iframe).data('allow-adjust-height', adjustHeightToBackgroundView).addClass('isBackgroundView').parent('.iQontrolDeviceBackgroundIframeWrapper').removeClass('adjustHeight').parent('.iQontrolDeviceLink').parent('.iQontrolDevice').removeClass('adjustHeight');
												iframe.src = location.href.split('?')[0] + "?renderView=" + encodeURI(stateBackgroundView.val) + "&isBackgroundView=true&noToolbar=true" + (getUrlParameter("namespace") ? "&namespace=" + getUrlParameter("namespace") : "") + (adjustHeightToBackgroundView ? "&adjustHeightToBackgroundView=true" : "") + (bigMode ? "&bigModeEnabled=true" : "") + (passphrase ? "&passphrase=" + passphrase : "");
												var timeout = 2900;
											} else { //URL
												var url = stateBackgroundURL.val;
												var widgetReplaceurl = getUrlParameterFromUrl(stateBackgroundURL.val, 'widgetReplaceurl');
												var backgroundURLAllowAdjustHeight = (getDeviceOptionValue(_device, "backgroundURLAllowAdjustHeight") == "true");
												$(iframe).data('allow-adjust-height', backgroundURLAllowAdjustHeight).removeClass('isBackgroundView').parent('.iQontrolDeviceBackgroundIframeWrapper').removeClass('adjustHeight').parent('.iQontrolDeviceLink').parent('.iQontrolDevice').removeClass('adjustHeight');
												if(widgetReplaceurl) {
													if(getUrlParameterFromUrl(stateBackgroundURL.val, 'widgetReplaceurlAbsolute')) {
														url = url.replace(url.split('?')[0], widgetReplaceurl);
													} else {
														url = url.replace(url.split('?')[0].substring(url.split('?')[0].lastIndexOf('/') + 1), widgetReplaceurl);														
													}
												}
												if(backgroundURLAllowAdjustHeight) {
													url = url + (url.split('?').length > 1 ? "&" : "?") + "allowAdjustHeight=true";
												}
												iframe.src = url;
												var timeout = 500;
											}
											if(iframe.onload == null) {
												iframe.onload = function(){
													setTimeout(function(e){
														if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundIframeWrapper").css('opacity') == '0' && $("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundIframeWrapper").html() !== "") $("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundIframeWrapper").css('opacity', '');
													}, timeout);
												}
											}
											setTimeout(function(){ //Fallback if load event is not triggered
												if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundIframeWrapper").css('opacity') == '0' && $("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundIframeWrapper").html() !== "") $("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundIframeWrapper").css('opacity', '');
											},3000);
										}, (isFirefox?100:0));
									} else if(stateBackgroundHTML && typeof stateBackgroundHTML.valFull !== udef && stateBackgroundHTML.valFull !== ""){ //HTML
										if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundIframeWrapper").html() == ""){ //create iframe
											var padding = parseInt(getDeviceOptionValue(_device, "backgroundURLPadding")) || 0;
											var paddingStyleString = (padding > 0 ? "style='margin: " + padding + "px; width: calc(100% - " + (2 * padding) + "px); min-height: calc(100% - " + (2 * padding) + "px);'" : "");
											var dynamicIframeZoomLevel = parseInt(getDeviceOptionValue(_device, "backgroundURLDynamicIframeZoom")) || 0;
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundIframeWrapper").html("<iframe class='iQontrolDeviceBackgroundIframe" + (dynamicIframeZoomLevel > 0 ? " dynamicIframeZoom" : "") + "' id='iQontrolDeviceBackgroundIframe_" + _deviceIdEscaped + "' data-iQontrol-Device-ID='" + _deviceIdEscaped + "'" + ((getDeviceOptionValue(_device, "backgroundURLAllowPostMessage") == "true") ? " data-allow-post-message='true'" : "") + paddingStyleString + (dynamicIframeZoomLevel > 0 ? " data-dynamic-iframe-zoom='" + dynamicIframeZoomLevel + "'" : "") + "></iframe>");
										}
										setTimeout(function(){
											var html = stateBackgroundHTML.valFull;
											if(/\.png$|\.jpg$|\.gif$/ig.test(html.split('?')[0])) { //html contains only a image file
												html = "<html><head></head><body style='margin: 0;'><img style='width: 100%;' src='" + html + "'></body></html>"; 
											}
											var iframe = document.getElementById("iQontrolDeviceBackgroundIframe_" + _deviceIdEscaped);
											$(iframe).data('allow-adjust-height', false).removeClass('isBackgroundView').parent('.iQontrolDeviceBackgroundIframeWrapper').removeClass('adjustHeight').parent('.iQontrolDeviceLink').parent('.iQontrolDevice').removeClass('adjustHeight');
											var iframedoc = iframe.contentDocument || iframe.contentWindow.document;
											iframedoc.open();
											iframedoc.write(html.replace(/\\n/g, String.fromCharCode(13)));
											$(iframedoc).find('body').css('font-family', 'sans-serif');
											iframedoc.close();
											setTimeout(function(){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundIframeWrapper").css('opacity', '');
											}, 500);
										}, (isFirefox?100:0));
									} else { //Nothing
										$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundIframeWrapper").css('opacity', '0');
										$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundIframeWrapper").html("");
									}
								};
								if(_linkedBackgroundViewId) viewUpdateFunctions[_linkedBackgroundViewId].push(updateFunction);
								if(_linkedBackgroundURLId) viewUpdateFunctions[_linkedBackgroundURLId].push(updateFunction);
								if(_linkedBackgroundHTMLId) viewUpdateFunctions[_linkedBackgroundHTMLId].push(updateFunction);
							})(); //<--End Closure
						}
						if(overlayAboveBackgroundURL){
							//--Background (Overlay) (if option overlayAboveBackgroundURL is set)
							if(!(getDeviceOptionValue(device, "noOverlayInactive") == "true")){
								deviceContent += "<div class='iQontrolDeviceBackground" + (getDeviceOptionValue(device, "noOverlayEnlarged") == "true" ? " hideIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "'></div>";
							}
							//--BackgroundActive (OverlayActive) (if option overlayAboveBackgroundURL is set)
							if(!(getDeviceOptionValue(device, "noOverlayActive") == "true")){
								deviceContent += "<div class='iQontrolDeviceBackground active" + (getDeviceOptionValue(device, "noOverlayEnlarged") == "true" ? " hideIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "'></div>";
							}
						}
						//--Background (Overlay) InactiveColor
						if(deviceLinkedStateIds["OVERLAY_INACTIVE_COLOR"]){
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedOverlayInactiveColorId = deviceLinkedStateIds["OVERLAY_INACTIVE_COLOR"];
								var updateFunction = function(){
									var stateOverlayInactiveColor = getStateObject(_linkedOverlayInactiveColorId);
									var colorString = stateOverlayInactiveColor && isValidColorString(stateOverlayInactiveColor.val) && stateOverlayInactiveColor.val || null;
									if(colorString){
										$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundImage:not(.active)").css('background-color', colorString);
									} else {
										$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundImage:not(.active)").css('background-color', '');
									}
								};
								viewUpdateFunctions[_linkedOverlayInactiveColorId].push(updateFunction);
							})(); //<--End Closure
						}
						//--Background (Overlay) ActiveColor
						var linkOverlayActiveColorToHue = (getDeviceOptionValue(device, "linkOverlayActiveColorToHue") == "true");
						if(deviceLinkedStateIds["OVERLAY_ACTIVE_COLOR"] || linkOverlayActiveColorToHue){
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceId = deviceId;
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedOverlayActiveColorId = deviceLinkedStateIds["OVERLAY_ACTIVE_COLOR"];
								var _linkOverlayActiveColorToHue = linkOverlayActiveColorToHue;
								var _linkedHueId = deviceLinkedStateIds["HUE"];
								var _linkedSaturationId = deviceLinkedStateIds["SATURATION"];
								var _linkedAlternativeColorspaceValueId = deviceLinkedStateIds["ALTERNATIVE_COLORSPACE_VALUE"];
								var updateFunction = function(){
									var stateOverlayActiveColor = getStateObject(_linkedOverlayActiveColorId);
									if(!_linkedHueId && _linkedAlternativeColorspaceValueId) _linkedHueId = "TEMP:" + _deviceId + ".HUE";
									var stateHue = getStateObject(_linkedHueId);
									if(_linkOverlayActiveColorToHue && stateHue && stateHue.val !== ""){
										var hueMin = stateHue.min || 0;
										var hueMax = stateHue.max || 359;
										var hue = ((stateHue.val - hueMin) / (hueMax - hueMin)) * 359;
										var	saturation = 100;
										var stateSaturation = getStateObject(_linkedSaturationId);
										if(stateSaturation && typeof stateSaturation.val != udef) {
											var saturationMin = stateSaturation.min || 0;
											var saturationMax = stateSaturation.max || 100;
											saturation = ((stateSaturation.val - saturationMin) / (saturationMax - saturationMin)) * 100;
										}
										var colorString = "hsl(" + hue + ", 100%," + (100-(saturation/2)) + "%)";
									} else if(_linkOverlayActiveColorToHue){
										var colorString = "rgb(255,245,157)";
									} else {
										var colorString = stateOverlayActiveColor && isValidColorString(stateOverlayActiveColor.val) && stateOverlayActiveColor.val || null;
									}
									if(colorString){
										$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundImage.active").css('background-color', colorString);
									} else {
										$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundImage.active").css('background-color', '');
									}
								};
								if(_linkedOverlayActiveColorId) viewUpdateFunctions[_linkedOverlayActiveColorId].push(updateFunction);
								if(_linkOverlayActiveColorToHue && _linkedHueId) viewUpdateFunctions[_linkedHueId].push(updateFunction);
								if(_linkOverlayActiveColorToHue && !_linkedHueId && _linkedAlternativeColorspaceValueId) viewUpdateFunctions[_linkedAlternativeColorspaceValueId].push(updateFunction);
								if(_linkOverlayActiveColorToHue && !_linkedHueId) viewUpdateFunctions["UPDATE_ONCE"].push(updateFunction);
								if(_linkOverlayActiveColorToHue && _linkedSaturationId) viewUpdateFunctions[_linkedSaturationId].push(updateFunction);
							})(); //<--End Closure
						}
						//--Icon with Link to Switch
						var linkContent = "";
						var iconContent = "";
						var onclick = "";
						var clickOnIconAction = getDeviceOptionValue(device, "clickOnIconAction");
						var icons = {};
						var variableSrc = {};
						if(iQontrolRoles[device.commonRole]) for (roleOption in iQontrolRoles[device.commonRole].options){
							if(roleOption.substring(0, 5).toLowerCase() == "icon_"){
								var iconClass = roleOption.substring(5);
								icons[iconClass] = options.LayoutDefaultIcons && options.LayoutDefaultIcons[device.commonRole] && options.LayoutDefaultIcons[device.commonRole][roleOption];
							}
						}
						if(typeof device.options != udef){
							for (var optionIndex = 0; optionIndex < device.options.length; optionIndex++) {
								var option = device.options[optionIndex];
								if(option.option && option.option.substring(0, 5).toLowerCase() == "icon_"){
									var iconClass = option.option.substring(5);
									if(iconClass && typeof device.options[optionIndex].value != udef && device.options[optionIndex].value != null && device.options[optionIndex].value != "") {
										var src = device.options[optionIndex].value;
										icons[iconClass] = encodeURI(src.split('|')[0]);
										variableSrc[iconClass] = encodeURI(src.split('|').slice(1).join('|'));
									}
								}
							}
						}
						var hideIconEnlarged = (getDeviceOptionValue(device, "hideIconEnlarged") == "true");
						var iconNoZoomOnHover = (getDeviceOptionValue(device, "iconNoZoomOnHover") == "true") || (options && options.LayoutViewDeviceIconNoZoomOnHover);
						var iconNoPointerEventsActive = (getDeviceOptionValue(device, "iconNoPointerEventsActive") == "true");
						var iconNoPointerEventsInactive = (getDeviceOptionValue(device, "iconNoPointerEventsInactive") == "true");
						var iconNoPointerEventsEnlarged = (getDeviceOptionValue(device, "iconNoPointerEventsEnlarged") == "true");
						switch(device.commonRole){
							case "iQontrolView": case "":
							if(icons["on"] && icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/blank.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["on"] && icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/blank.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							break;

							case "iQontrolSwitch":
							if(deviceLinkedStateIds["STATE"]) onclick = "toggleState(\"" + deviceLinkedStateIds["STATE"] + "\", \"" + deviceIdEscaped + "\");";
							linkContent += "<a class='iQontrolDeviceLinkToToggle' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='" + onclick + "'>";
								if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/switch_on.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
								if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/switch_off.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolButton":
							if(deviceLinkedStateIds["STATE"] && deviceLinkedStateIds["SET_VALUE"]){
								var returnToOffSetValueAfter = getDeviceOptionValue(device, "returnToOffSetValueAfter") || "100";
								onclick = "startButton(\"" + deviceLinkedStateIds["STATE"] + "\", \"" + deviceLinkedStateIds["SET_VALUE"] + "\", \"" + deviceLinkedStateIds["OFF_SET_VALUE"] + "\", \"" + returnToOffSetValueAfter + "\", \"" + deviceIdEscaped + "\");";
							}
							linkContent += "<a class='iQontrolDeviceLinkToToggle' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='" + onclick + "'>";
								if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/button.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
								if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/button.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolLight":
							if(deviceLinkedStateIds["LEVEL"]) onclick = "toggleState(\"" + deviceLinkedStateIds["LEVEL"] + "\", \"" + deviceIdEscaped + "\");";
							if(deviceLinkedStateIds["STATE"]) onclick = "toggleState(\"" + deviceLinkedStateIds["STATE"] + "\", \"" + deviceIdEscaped + "\");";
							linkContent += "<a class='iQontrolDeviceLinkToToggle' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='" + onclick + "'>";
								if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/light_on.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
								if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/light_off.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolFan":
							if(deviceLinkedStateIds["STATE"]) onclick = "toggleState(\"" + deviceLinkedStateIds["STATE"] + "\", \"" + deviceIdEscaped + "\");";
							linkContent += "<a class='iQontrolDeviceLinkToToggle' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='" + onclick + "'>";
								if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/fan_on.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
								if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/fan_off.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolThermostat": case "iQontrolHomematicThermostat": case "iQontrolHomematicIpThermostat":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/radiator.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/radiator.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolTemperature":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/temperature.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/temperature.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolHumidity":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/humidity.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/humidity.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolPressure":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/pressure.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/pressure.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolBrightness":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/brightness_light.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/brightness_dark.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolMotion":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/motion_on.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/motion_off.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolDoor":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon opened on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/door_opened.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon closed off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/door_closed.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							if(icons["tilted"] !== "none") iconContent += "<image class='iQontrolDeviceIcon tilted" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["tilted"] || "./images/icons/door_opened.png") + "' " + (variableSrc["tilted"] ? "data-variablesrc='" + variableSrc["tilted"] + "' " : "") + "/>";
							break;

							case "iQontrolGarageDoor":
							var noConfirmationForTogglingViaIcon = (getDeviceOptionValue(device, "noConfirmationForTogglingViaIcon") == "true");
							if(deviceLinkedStateIds["TOGGLE"]) onclick = (noConfirmationForTogglingViaIcon ? "" : "if(confirm(_(\"Toggle?\"))) ") + "startProgram(\"" + deviceLinkedStateIds["TOGGLE"] + "\", \"" + deviceIdEscaped + "\");";
							linkContent += "<a class='iQontrolDeviceLinkToToggle' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='" + onclick + "'>";
								if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon opened on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/garagedoor_opened.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
								if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon closed off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/garagedoor_closed.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
								if(icons["tilted"] !== "none") iconContent += "<image class='iQontrolDeviceIcon tilted" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["tilted"] || "./images/icons/garagedoor_opened.png") + "' " + (variableSrc["tilted"] ? "data-variablesrc='" + variableSrc["tilted"] + "' " : "") + "/>";
							break;

							case "iQontrolDoorWithLock":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon opened on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/door_opened.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon closed off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/door_closed.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							if(icons["locked"] !== "none") iconContent += "<image class='iQontrolDeviceIcon locked" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["locked"] || "./images/icons/door_locked.png") + "' " + (variableSrc["locked"] ? "data-variablesrc='" + variableSrc["locked"] + "' " : "") + "/>";
							if(icons["unlocked"] !== "none") iconContent += "<image class='iQontrolDeviceIcon unlocked" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["unlocked"] || "./images/icons/door_unlocked.png") + "' " + (variableSrc["unlocked"] ? "data-variablesrc='" + variableSrc["unlocked"] + "' " : "") + "/>";
							break;

							case "iQontrolWindow":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/window_opened.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/window_closed.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							if(icons["tilted"] !== "none") iconContent += "<image class='iQontrolDeviceIcon tilted" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["tilted"] || "./images/icons/window_tilted.png") + "' " + (variableSrc["tilted"] ? "data-variablesrc='" + variableSrc["tilted"] + "' " : "") + "/>";
							break;

							case "iQontrolBlind":
							if(deviceLinkedStateIds["LEVEL"] || (deviceLinkedStateIds["UP"] && deviceLinkedStateIds["DOWN"])) onclick = "toggleActuator(\"" + (deviceLinkedStateIds["LEVEL"] || "") + "\", \"" + (deviceLinkedStateIds["DIRECTION"] || "") + "\", \"" + (deviceLinkedStateIds["STOP"] || "") + "\", \"" + (deviceLinkedStateIds["STOP_SET_VALUE"] || "") + "\", \"" + (deviceLinkedStateIds["UP"] || "") + "\", \"" + (deviceLinkedStateIds["UP_SET_VALUE"] || "") + "\", \"" + (deviceLinkedStateIds["DOWN"] || "") + "\", \"" + (deviceLinkedStateIds["DOWN_SET_VALUE"] || "") + "\", \"" + (deviceLinkedStateIds["FAVORITE_POSITION"] || "") + "\", \"" + deviceIdEscaped + "\");";
							linkContent += "<a class='iQontrolDeviceLinkToToggle' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='" + onclick + "'>";
								if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon opened on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/blind_opened.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
								if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon closed off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/blind_closed.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
								if(icons["middle"] !== "none") iconContent += "<image class='iQontrolDeviceIcon middle" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["middle"] || "./images/icons/blind_middle.png") + "' " + (variableSrc["middle"] ? "data-variablesrc='" + variableSrc["middle"] + "' " : "") + "/>";
								if(icons["closing"] !== "none") iconContent += "<image class='iQontrolDeviceIcon closing" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["closing"] || "./images/icons/blind_closing.png") + "' " + (variableSrc["closing"] ? "data-variablesrc='" + variableSrc["closing"] + "' " : "") + "/>";
								if(icons["opening"] !== "none") iconContent += "<image class='iQontrolDeviceIcon opening" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["opening"] || "./images/icons/blind_opening.png") + "' " + (variableSrc["opening"] ? "data-variablesrc='" + variableSrc["opening"] + "' " : "") + "/>";
							break;

							case "iQontrolFire":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/fire_on.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/fire_off.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolFlood":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/flood_on.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/flood_off.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolAlarm":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/alarm_on.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/alarm_off.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							if(icons["triggered"] !== "none") iconContent += "<image class='iQontrolDeviceIcon triggered" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["triggered"] || "./images/icons/alarm_on_triggered.png") + "' " + (variableSrc["triggered"] ? "data-variablesrc='" + variableSrc["triggered"] + "' " : "") + "/>";
							break;

							case "iQontrolBattery":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon full on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/battery_full.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon empty off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/battery_empty.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							if(icons["charged75"] !== "none") iconContent += "<image class='iQontrolDeviceIcon charged75" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["charged75"] || "./images/icons/battery_75.png") + "' " + (variableSrc["charged75"] ? "data-variablesrc='" + variableSrc["charged75"] + "' " : "") + "/>";
							if(icons["charged50"] !== "none") iconContent += "<image class='iQontrolDeviceIcon charged50" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["charged50"] || "./images/icons/battery_50.png") + "' " + (variableSrc["charged50"] ? "data-variablesrc='" + variableSrc["charged50"] + "' " : "") + "/>";
							if(icons["charged25"] !== "none") iconContent += "<image class='iQontrolDeviceIcon charged25" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["charged25"] || "./images/icons/battery_25.png") + "' " + (variableSrc["charged25"] ? "data-variablesrc='" + variableSrc["charged25"] + "' " : "") + "/>";
							if(icons["charged10"] !== "none") iconContent += "<image class='iQontrolDeviceIcon charged10" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["charged10"] || "./images/icons/battery_10.png") + "' " + (variableSrc["charged10"] ? "data-variablesrc='" + variableSrc["charged10"] + "' " : "") + "/>";
							if(icons["charging"] !== "none") iconContent += "<image class='iQontrolDeviceIcon charging overlay" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["charging"] || "./images/icons/battery_charging_overlay.png") + "' " + (variableSrc["charging"] ? "data-variablesrc='" + variableSrc["charging"] + "' " : "") + "/>";
							if(icons["discharging"] !== "none") iconContent += "<image class='iQontrolDeviceIcon discharging overlay" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["discharging"] || "./images/icons/battery_discharging_overlay.png") + "' " + (variableSrc["discharging"] ? "data-variablesrc='" + variableSrc["discharging"] + "' " : "") + "/>";
							break;

							case "iQontrolDateAndTime":
							if(deviceLinkedStateIds["STATE"]) onclick = "toggleState(\"" + deviceLinkedStateIds["STATE"] + "\", \"" + deviceIdEscaped + "\");";
							linkContent += "<a class='iQontrolDeviceLinkToToggle' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='" + onclick + "'>";
								if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/time_alarmclock_on.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
								if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/time_alarmclock_off.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
								if(icons["ringing"] !== "none") iconContent += "<image class='iQontrolDeviceIcon ringing overlay" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["ringing"] || "./images/icons/bell_ringing_overlay.png") + "' " + (variableSrc["ringing"] ? "data-variablesrc='" + variableSrc["ringing"] + "' " : "") + "/>";
							break;

							case "iQontrolValue":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/value_on.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/value_off.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolProgram":
							if(deviceLinkedStateIds["STATE"]) onclick = "startProgram(\"" + deviceLinkedStateIds["STATE"] + "\", \"" + deviceIdEscaped + "\");";
							linkContent += "<a class='iQontrolDeviceLinkToToggle' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='" + onclick + "'>";
								if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/play_on.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
								if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/play.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolScene":
							if(deviceLinkedStateIds["STATE"]) onclick = "toggleScene(\"" + deviceLinkedStateIds["STATE"] + "\", \"" + deviceIdEscaped + "\");";
							linkContent += "<a class='iQontrolDeviceLinkToToggle' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='" + onclick + "'>";
								if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/play.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
								if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/play.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolMedia":
							if(deviceLinkedStateIds["STATE"]) onclick = "toggleMedia(\"" + deviceLinkedStateIds["STATE"] + "\", \"" + deviceIdEscaped + "\");";
							linkContent += "<a class='iQontrolDeviceLinkToToggle' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='" + onclick + "'>";
								if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/media_on.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
								if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/media_off.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
								if(getDeviceOptionValue(device, "hidePlayOverlay") !== "true") iconContent += "<image class='iQontrolDeviceIcon play overlay" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='./images/icons/media_play_overlay.png' />";
								if(getDeviceOptionValue(device, "hidePauseAndStopOverlay") !== "true") iconContent += "<image class='iQontrolDeviceIcon pause overlay" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='./images/icons/media_pause_overlay.png' />";
								if(getDeviceOptionValue(device, "hidePauseAndStopOverlay") !== "true") iconContent += "<image class='iQontrolDeviceIcon stop overlay" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='./images/icons/media_stop_overlay.png' />";
							break;

							case "iQontrolPopup":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/popup.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/popup.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolExternalLink":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/link.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/link.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolWidget":
							if(deviceLinkedStateIds["STATE"]) onclick = "toggleState(\"" + deviceLinkedStateIds["STATE"] + "\", \"" + deviceIdEscaped + "\");";
							linkContent += "<a class='iQontrolDeviceLinkToToggle' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='" + onclick + "'>";
								if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/blank.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
								if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/blank.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							case "iQontrolInfoText":
							if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/info_bubble_off.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
							if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off active" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/blank.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
							break;

							default:
							if(deviceLinkedStateIds["STATE"]) onclick = "toggleState(\"" + deviceLinkedStateIds["STATE"] + "\", \"" + deviceIdEscaped + "\");";
							linkContent += "<a class='iQontrolDeviceLinkToToggle' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='" + onclick + "'>";
								if(icons["on"] !== "none") iconContent += "<image class='iQontrolDeviceIcon on" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["on"] || "./images/icons/switch_on.png") + "' " + (variableSrc["on"] ? "data-variablesrc='" + variableSrc["on"] + "' " : "") + "/>";
								if(icons["off"] !== "none") iconContent += "<image class='iQontrolDeviceIcon off activ" + (hideIconEnlarged ? " hideIfEnlarged" : "") + (iconNoZoomOnHover ? " noZoomOnHover" : "") + (iconNoPointerEventsActive ? " noPointerEventsIfActive" : "") + (iconNoPointerEventsInactive ? " noPointerEventsIfInactive" : "") + (iconNoPointerEventsEnlarged ? " noPointerEventsIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + (icons["off"] || "./images/icons/switch_off.png") + "' " + (variableSrc["off"] ? "data-variablesrc='" + variableSrc["off"] + "' " : "") + "/>";
						}
						//--Link (clickOnTileAction)
						if(clickOnIconAction == "toggle" && linkContent !== ""){ //clickOnIcon: toggle
							deviceContent += linkContent + iconContent + "</a>";
						} else if(clickOnIconAction == "openDialog"){ //clickOnIcon: openDialog
							linkContent = "<a class='iQontrolDeviceLinkToToggle dialog' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='renderDialog(\"" + deviceIdEscaped + "\"); $(\"#Dialog\").popup(\"open\", {transition: \"pop\", positionTo: \"window\"});'>";
							deviceContent += linkContent + iconContent + "</a>";
						} else if(clickOnIconAction == "enlarge"){ //clickOnIcon: enlarge
							linkContent = "<a class='iQontrolDeviceLinkToToggle enlarge' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='event.stopPropagation(); toggleState(unescape(\"" + escape(deviceLinkedStateIds["tileEnlarged"]) + "\"), \"" + deviceIdEscaped + "\", null, 0);'>";
							deviceContent += linkContent + iconContent + "</a>";
						} else if(clickOnIconAction == "false"){ //clickOnIcon: false (do nothing)
							deviceContent += iconContent;
						} else if(clickOnIconAction == "openURLExternal"){ //clickOnIcon: openURLExternal
							if(deviceLinkedStateIds["URL"]){
								linkContent = "<a class='iQontrolDeviceLinkToToggle externalLink' data-iQontrol-Device-ID='" + deviceIdEscaped + "' target='_blank'>";
								deviceContent += linkContent + iconContent + "</a>";
							}
						} else { //clickOnIcon: openLinkToOtherView (default)
							if(typeof device.nativeLinkedView !== udef && device.nativeLinkedView !== "") { //Link to other view
								if(isBackgroundView && getDeviceOptionValue(device, "renderLinkedViewInParentInstance") == "true"){ // renderLinkedViewInParentInstance
									var closePanel = (getDeviceOptionValue(device, "renderLinkedViewInParentInstanceClosesPanel") == "true");
									linkContent = "<a class='iQontrolDeviceLinkToToggle linkedView' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='renderViewInParentInstance(unescape(\"" + escape(device.nativeLinkedView) + "\"), " + closePanel + ");'>";
								} else { //Normal Link to other view
									linkContent = "<a class='iQontrolDeviceLinkToToggle linkedView' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='viewHistory = viewLinksToOtherViews; viewHistoryPosition = " + (viewLinksToOtherViews.length - 1) + "; renderView(unescape(\"" + escape(device.nativeLinkedView) + "\"));'>";
								}
							} else { //No Link to other view
								linkContent = "<a class='iQontrolDeviceLinkToToggle noLink' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick=''>";
							}
							deviceContent += linkContent + iconContent + "</a>";
						}
						if(onclick !== "") viewDeviceContextMenu[deviceIdEscaped].toggle = {name: _("Toggle"), icon:'power', href: '', target: '', onclick: onclick + ' $("#ViewDeviceContextMenu").popup("close");'};
						//--IconLoading
						deviceContent += "<image class='iQontrolDeviceLoading' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='./images/loading.gif'/>";
						//--IconError
						var errorIcon_on = getDeviceOptionValue(device, "errorIcon_on") || (options.LayoutDefaultIcons && options.LayoutDefaultIcons["ERROR"] && options.LayoutDefaultIcons["ERROR"]["errorIcon_on"]) || "./images/error.png";
						var errorIcon_onIcon = encodeURI(errorIcon_on.split('|')[0]);
						var errorIcon_onVariableSrc = encodeURI(errorIcon_on.split('|').slice(1).join('|'));
						deviceContent += "<image class='iQontrolDeviceError" + ((getDeviceOptionValue(device, "hideIndicatorIfInactive") == "true") ? " hideIfInactive" : "") + ((getDeviceOptionValue(device, "hideIndicatorIfActive") == "true") ? " hideIfActive" : "") + ((getDeviceOptionValue(device, "hideIndicatorIfEnlarged") == "true") ? " hideIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + errorIcon_onIcon + "' " + (errorIcon_onVariableSrc ? "data-variablesrc='" + errorIcon_onVariableSrc + "' " : "") + " />";
						if(deviceLinkedStateIds["ERROR"]){
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _device = device;
								var _linkedErrorId = deviceLinkedStateIds["ERROR"];
								viewUpdateFunctions[_linkedErrorId].push(function(){
									var invertError = (getDeviceOptionValue(_device, "invertError") == "true");
									var stateError = getStateObject(_linkedErrorId);
									if(typeof stateError !== udef && ((!invertError && stateError.val) || (invertError && !stateError.val))) {
										$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceError").addClass("active");
									} else {
										$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceError").removeClass("active");
									}
								});
							})(); //<--End Closure
						}
						//--IconUnreach
						var unreachIcon_on = getDeviceOptionValue(device, "unreachIcon_on") || (options.LayoutDefaultIcons && options.LayoutDefaultIcons["UNREACH"] && options.LayoutDefaultIcons["UNREACH"]["unreachIcon_on"]) || "./images/unreach.png";
						var unreachIcon_onIcon = encodeURI(unreachIcon_on.split('|')[0]);
						var unreachIcon_onVariableSrc = encodeURI(unreachIcon_on.split('|').slice(1).join('|'));
						deviceContent += "<image class='iQontrolDeviceUnreach" + ((getDeviceOptionValue(device, "hideIndicatorIfInactive") == "true") ? " hideIfInactive" : "") + ((getDeviceOptionValue(device, "hideIndicatorIfActive") == "true") ? " hideIfActive" : "") + ((getDeviceOptionValue(device, "hideIndicatorIfEnlarged") == "true") ? " hideIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + unreachIcon_onIcon + "' " + (unreachIcon_onVariableSrc ? "data-variablesrc='" + unreachIcon_onVariableSrc + "' " : "") + " />";
						if(deviceLinkedStateIds["UNREACH"]){
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _device = device;
								var _linkedUnreachId = deviceLinkedStateIds["UNREACH"];
								viewUpdateFunctions[_linkedUnreachId].push(function(){
									var invertUnreach = (getDeviceOptionValue(_device, "invertUnreach") == "true");
									var hideUnreachIfInactive = (getDeviceOptionValue(_device, "hideUnreachIfInactive") == "true");
									if(hideUnreachIfInactive) {
										$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceUnreach").addClass("hideUnreachIfInactive");
									}
									var stateUnreach = getStateObject(_linkedUnreachId);
									if(typeof stateUnreach !== udef && ((!invertUnreach && stateUnreach.val) || (invertUnreach && !stateUnreach.val))) {
										$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceUnreach").addClass("active");
									} else {
										$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceUnreach").removeClass("active");
									}
								});
							})(); //<--End Closure
						}
						//--IconBattery
						var batteryIcon_on = getDeviceOptionValue(device, "batteryIcon_on") || (options.LayoutDefaultIcons && options.LayoutDefaultIcons["BATTERY"] && options.LayoutDefaultIcons["BATTERY"]["batteryIcon_on"]) || "./images/battery.png";
						var batteryIcon_onIcon = encodeURI(batteryIcon_on.split('|')[0]);
						var batteryIcon_onVariableSrc = encodeURI(batteryIcon_on.split('|').slice(1).join('|'));
						deviceContent += "<image class='iQontrolDeviceBattery" + ((getDeviceOptionValue(device, "hideIndicatorIfInactive") == "true") ? " hideIfInactive" : "") + ((getDeviceOptionValue(device, "hideIndicatorIfActive") == "true") ? " hideIfActive" : "") + ((getDeviceOptionValue(device, "hideIndicatorIfEnlarged") == "true") ? " hideIfEnlarged" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' src='" + batteryIcon_onIcon + "' " + (batteryIcon_onVariableSrc ? "data-variablesrc='" + batteryIcon_onVariableSrc + "' " : "") + " />";
						if(deviceLinkedStateIds["BATTERY"] && deviceLinkedStateIds["BATTERY"] !== ""){
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _device = device;
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedBatteryId = deviceLinkedStateIds["BATTERY"];
								viewUpdateFunctions[_linkedBatteryId].push(function(){
									var stateBattery = getStateObject(_linkedBatteryId);
									if(typeof stateBattery !== udef){
										var batteryActiveCondition = getDeviceOptionValue(_device, "batteryActiveCondition");
										var batteryActiveConditionValue = getDeviceOptionValue(_device, "batteryActiveConditionValue");
										var batteryActiveValue = stateBattery.val || 0;
										var batteryActive = checkCondition(batteryActiveValue, batteryActiveCondition, batteryActiveConditionValue);
										if(batteryActive == null){
											batteryActive = false;
											if(stateBattery.type == "level") {
												var min = stateBattery.min || 0;
												var max = stateBattery.max || 100;
												if(typeof stateBattery.val !== udef && stateBattery.val <= (min + ((max-min) * 0.10)) && !(typeof stateBattery.min == udef && typeof stateBattery.max == udef && stateBattery.val == 0) ){ //<10%
													batteryActive = true;
												}
											} else if(stateBattery.val) {
												batteryActive = true;
											}
										}
										if(batteryActive){
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBattery").addClass("active");
										} else {
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBattery").removeClass("active");
										}
									}
								});
							})(); //<--End Closure
						}
						//--tileEnlargeButton
						if(deviceLinkedStateIds["tileEnlarged"] || deviceLinkedStateIds["ENLARGE_TILE"]){
							deviceContent += "<div class='iQontrolDeviceEnlargeButton" + ((getDeviceOptionValue(device, "tileEnlargeShowButtonActive") == "true") ? " showIfActive" : "") + ((getDeviceOptionValue(device, "tileEnlargeShowButtonInactive") == "true") ? " showIfInactive" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' onclick='event.stopPropagation(); toggleState(unescape(\"" + escape(deviceLinkedStateIds["tileEnlarged"]) + "\"), \"" + deviceIdEscaped + "\", null, 0);'></div>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _device = device;
								var _linkedTileEnlargedId = deviceLinkedStateIds["tileEnlarged"];
								var _linkedEnlargeTileId = deviceLinkedStateIds["ENLARGE_TILE"];
								viewUpdateFunctions[_linkedTileEnlargedId].push(function(){
									var stateTileEnlarged = getStateObject(_linkedTileEnlargedId);
									if(typeof stateTileEnlarged !== udef && stateTileEnlarged.val) {
										$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").addClass("enlarged");
										viewDeviceContextMenu[_deviceIdEscaped].enlarge.hidden = true;
										if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").hasClass("active")){
											if(getDeviceOptionValue(_device, "tileEnlargeShowInPressureMenuActive") == "true") viewDeviceContextMenu[_deviceIdEscaped].reduce.hidden = false;
										} else {
											if(getDeviceOptionValue(_device, "tileEnlargeShowInPressureMenuInactive") == "true") viewDeviceContextMenu[_deviceIdEscaped].reduce.hidden = false;
										}
									} else {
										$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").removeClass("enlarged");
										viewDeviceContextMenu[_deviceIdEscaped].reduce.hidden = true;
										if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").hasClass("active")){
											if(getDeviceOptionValue(_device, "tileEnlargeShowInPressureMenuActive") == "true") viewDeviceContextMenu[_deviceIdEscaped].enlarge.hidden = false;
										} else {
											if(getDeviceOptionValue(_device, "tileEnlargeShowInPressureMenuInactive") == "true") viewDeviceContextMenu[_deviceIdEscaped].enlarge.hidden = false;
										}
									}
								});
								if(_linkedEnlargeTileId) viewUpdateFunctions[_linkedEnlargeTileId].push(function(){
									var stateTileEnlarged = getStateObject(_linkedTileEnlargedId);
									var stateEnlargeTile = getStateObject(_linkedEnlargeTileId);
									if(typeof stateEnlargeTile !== udef && stateEnlargeTile.type) {
										switch(stateEnlargeTile.type){
											case "button":
											if(stateEnlargeTile.ts && new Date() - stateEnlargeTile.ts < 100) toggleState(_linkedTileEnlargedId, _deviceIdEscaped, null, 0);
											break;

											default:
											var val = stateEnlargeTile.plainText.toString();
											if(stateEnlargeTile.val == false || val == "0" || val == "-1" || val == "false" || val == _("false") || val == _("closed") || val == _("OK") || val == _("off")) val = false; else val = true;
											setState(_linkedTileEnlargedId, _deviceIdEscaped, val, true, null, 0);
										}
									}
								});
							})(); //<--End Closure
						}
						//--Info A
						var hideIfClasses = (getDeviceOptionValue(device, "hideInfoAIfInactive") == "true" ? " hideIfInactive" : "") + (getDeviceOptionValue(device, "hideInfoAIfActive") == "true" ? " hideIfActive" : "") + (getDeviceOptionValue(device, "hideInfoAIfEnlarged") == "true" ? " hideIfEnlarged" : "");
						viewInfoASliderLength[deviceIdEscaped] = 0;
						viewInfoASliderIndex[deviceIdEscaped] = 0;
						deviceContent += "<div class='iQontrolDeviceInfoA' data-iQontrol-Device-ID='" + deviceIdEscaped + "'>";
						switch(device.commonRole){
							case "iQontrolThermostat": case "iQontrolHomematicThermostat": case "iQontrolHomematicIpThermostat": case "iQontrolTemperature": case "iQontrolHumidity": case "iQontrolPressure":
							if(deviceLinkedStateIds["TEMPERATURE"]){
								sliderIndex = viewInfoASliderLength[deviceIdEscaped];
								viewInfoASliderLength[deviceIdEscaped]++;
								deviceContent += "<image class='iQontrolDeviceInfoAIcon" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + "' src='" + (options.LayoutDefaultSymbols && options.LayoutDefaultSymbols["TEMPERATURE"] && options.LayoutDefaultSymbols["TEMPERATURE"]["temperatureIcon_on"] || "./images/symbols/temperature.png") + "'>";
								deviceContent += "<div class='iQontrolDeviceInfoAText" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + "'></div>";
								(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
									var _deviceIdEscaped = deviceIdEscaped;
									var _device = device;
									var _linkedTemperatureId = deviceLinkedStateIds["TEMPERATURE"];
									var _sliderIndex = sliderIndex;
									viewUpdateFunctions[_linkedTemperatureId].push(function(){
										var stateTemperature = getStateObject(_linkedTemperatureId);
										if(stateTemperature && typeof stateTemperature.val !== udef && stateTemperature.val !== ""){
											var val = stateTemperature.plainText;
											var unit = stateTemperature.unit;
											var digits = getDeviceOptionValue(_device, "infoARoundDigits") || 1;
											if(!isNaN(val)) val = Math.round(stateTemperature.valFull * Math.pow(10, digits)) / Math.pow(10, digits);
											if(stateTemperature.plainText == stateTemperature.val) val = val + unit;
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAIcon").show();
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAText").html(val);
										} else {
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAIcon").hide();
										}
									});
								})(); //<--End Closure
							}
							break;

							case "iQontrolBrightness": case "iQontrolMotion":
							if(deviceLinkedStateIds["BRIGHTNESS"]){
								sliderIndex = viewInfoASliderLength[deviceIdEscaped];
								viewInfoASliderLength[deviceIdEscaped]++;
								deviceContent += "<image class='iQontrolDeviceInfoAIcon" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + "' src='" + (options.LayoutDefaultSymbols && options.LayoutDefaultSymbols["BRIGHTNESS"] && options.LayoutDefaultSymbols["BRIGHTNESS"]["brightnessIcon_on"] || "./images/symbols/brightness.png") + "'>";
								deviceContent += "<div class='iQontrolDeviceInfoAText" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + "'></div>";
								(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
									var _deviceIdEscaped = deviceIdEscaped;
									var _device = device;
									var _linkedBrightnessId = deviceLinkedStateIds["BRIGHTNESS"];
									var _sliderIndex = sliderIndex;
									viewUpdateFunctions[_linkedBrightnessId].push(function(){
										var stateBrightness = getStateObject(_linkedBrightnessId);
										if(stateBrightness && typeof stateBrightness.val !== udef && stateBrightness.val !== ""){
											var val = stateBrightness.plainText;
											var unit = stateBrightness.unit;
											var digits = getDeviceOptionValue(_device, "infoARoundDigits") || 1;
											if(!isNaN(val)) val = Math.round(stateBrightness.valFull * Math.pow(10, digits)) / Math.pow(10, digits);
											if(stateBrightness.plainText == stateBrightness.val) val = val + unit;
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAIcon").show();
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAText").html(val);
										} else {
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAIcon").hide();
										}
									});
								})(); //<--End Closure
							}
							break;

							case "iQontrolBlind":
							if(deviceLinkedStateIds["SLATS_LEVEL"]){
								sliderIndex = viewInfoASliderLength[deviceIdEscaped];
								viewInfoASliderLength[deviceIdEscaped]++;
								deviceContent += "<image class='iQontrolDeviceInfoAIcon" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + "' src='" + (options.LayoutDefaultSymbols && options.LayoutDefaultSymbols["SLATS_LEVEL"] && options.LayoutDefaultSymbols["SLATS_LEVEL"]["slatsLevelIcon_on"] || "./images/symbols/slats.png") + "'>";
								deviceContent += "<div class='iQontrolDeviceInfoAText" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + "'></div>";
								(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
									var _deviceIdEscaped = deviceIdEscaped;
									var _device = device;
									var _linkedSlatsLevelId = deviceLinkedStateIds["SLATS_LEVEL"];
									var _sliderIndex = sliderIndex;
									viewUpdateFunctions[_linkedSlatsLevelId].push(function(){
										var stateSlatsLevel = getStateObject(_linkedSlatsLevelId);
										if(stateSlatsLevel && typeof stateSlatsLevel.val !== udef && stateSlatsLevel.val !== ""){
											var val = stateSlatsLevel.plainText;
											var unit = stateSlatsLevel.unit;
											var digits = getDeviceOptionValue(_device, "infoARoundDigits") || 1;
											if(!isNaN(val)) val = Math.round(stateSlatsLevel.valFull * Math.pow(10, digits)) / Math.pow(10, digits);
											if(stateSlatsLevel.plainText == stateSlatsLevel.val) val = val + unit;
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAIcon").show();
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAText").html(val);
										} else {
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAIcon").hide();
										}
									});
								})(); //<--End Closure
							}
							break;

							case "iQontrolBattery":
							if(deviceLinkedStateIds["VOLTAGE"]) {
								sliderIndex = viewInfoASliderLength[deviceIdEscaped];
								viewInfoASliderLength[deviceIdEscaped]++;
								deviceContent += "<image class='iQontrolDeviceInfoAIcon" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + " display: none;' src='" + (options.LayoutDefaultSymbols && options.LayoutDefaultSymbols["VOLTAGE"] && options.LayoutDefaultSymbols["VOLTAGE"]["voltageIcon_on"] || "./images/symbols/power.png") + "'>";
								deviceContent += "<div class='iQontrolDeviceInfoAText" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + "'></div>";
								(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
									var _deviceIdEscaped = deviceIdEscaped;
									var _device = device;
									var _linkedVoltageId = deviceLinkedStateIds["VOLTAGE"];
									var _sliderIndex = sliderIndex;
									viewUpdateFunctions[_linkedVoltageId].push(function(){
										var stateVoltage = getStateObject(_linkedVoltageId);
										if(stateVoltage && typeof stateVoltage.val !== udef && stateVoltage.val !== ""){
											var val = stateVoltage.plainText;
											var unit = stateVoltage.unit;
											var digits = getDeviceOptionValue(_device, "infoARoundDigits") || 1;
											if(!isNaN(val)) val = Math.round(stateVoltage.valFull * Math.pow(10, digits)) / Math.pow(10, digits);
											if(stateVoltage.plainText == stateVoltage.val) val = val + unit;
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAIcon").show();
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAText").html(val);
										} else {
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAIcon").hide();
										}
									});
								})(); //<--End Closure
							}
							break;

							case "iQontrolLight":
							if(deviceLinkedStateIds["HUE"] || deviceLinkedStateIds["CT"] || deviceLinkedStateIds["ALTERNATIVE_COLORSPACE_VALUE"]){
								sliderIndex = viewInfoASliderLength[deviceIdEscaped];
								viewInfoASliderLength[deviceIdEscaped]++;
								deviceContent += "<image class='iQontrolDeviceInfoAIcon" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + " display:none;' src='" + (options.LayoutDefaultSymbols && options.LayoutDefaultSymbols["COLOR"] && options.LayoutDefaultSymbols["COLOR"]["colorIcon_on"] || "./images/symbols/color.png") + "'>";
								deviceContent += "<div class='iQontrolDeviceInfoAText" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + "'><div class='iQontrolDeviceInfoATextHue' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='display:none; width:1.2em; height:1.2em; margin-left:0.2em; margin-right:0.2em; float:left;'></div><div class='iQontrolDeviceInfoATextCt' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='display:none; width:1.2em; height:1.2em; margin-left:0.2em; margin-right:0.2em; float:left;'></div></div>";
								//Create temp-datapoints for datapoints that are only mapped via alternative colorspace
								(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
									var _deviceId = deviceId;
									var _deviceIdEscaped = deviceIdEscaped;
									var _device = device;
									var _linkedAlternativeColorspaceValueId = deviceLinkedStateIds["ALTERNATIVE_COLORSPACE_VALUE"];
									var _linkedCtId = deviceLinkedStateIds["CT"];
									var _linkedWhiteBrightnessId = deviceLinkedStateIds["WHITE_BRIGHTNESS"];
									var _linkedSaturationId = deviceLinkedStateIds["SATURATION"];
									var _linkedColorBrightnessId = deviceLinkedStateIds["COLOR_BRIGHTNESS"];
									var _linkedHueId = deviceLinkedStateIds["HUE"];
									var _alternativeColorspace = getDeviceOptionValue(_device, "alternativeColorspace") || "";
									var _sliderIndex = sliderIndex;
									var _createColouredLightFunction = function(){
										var _deviceLinkedStateIdsToFetchAndUpdate = [];
										if(_linkedAlternativeColorspaceValueId) switch(_alternativeColorspace){
											case "RGBCWWW": case "#RGBCWWW": case "RGBWWCW": case "#RGBWWCW":
											if(_linkedCtId == ""){
												_linkedCtId = createTempLinkedState(_deviceId + ".CT", "level", "state", _linkedAlternativeColorspaceValueId);
											}

											case "RGBW": case "#RGBW":
											if(_linkedWhiteBrightnessId == ""){
												_linkedWhiteBrightnessId = createTempLinkedState(_deviceId + ".WHITE_BRIGHTNESS", "level", "state", _linkedAlternativeColorspaceValueId);
											}

											case "RGB": case "#RGB": case "HHSSBB_TUYA":
											if(_linkedSaturationId == ""){
												_linkedSaturationId = createTempLinkedState(_deviceId + ".SATURATION", "level", "state", _linkedAlternativeColorspaceValueId);
											}
											if(_linkedColorBrightnessId == ""){
												_linkedColorBrightnessId = createTempLinkedState(_deviceId + ".COLOR_BRIGHTNESS", "level", "state", _linkedAlternativeColorspaceValueId);
											}

											case "RGB_HUEONLY": case "#RGB_HUEONLY": case "HUE_MILIGHT":
											if(_linkedHueId == ""){
												_linkedHueId = createTempLinkedState(_deviceId + ".HUE", "level", "state", _linkedAlternativeColorspaceValueId);
											}
											_deviceLinkedStateIdsToFetchAndUpdate.push(_linkedAlternativeColorspaceValueId);
											break;
										}
										_deviceLinkedStateIdsToFetchAndUpdate.push(_linkedCtId);
										_deviceLinkedStateIdsToFetchAndUpdate.push(_linkedWhiteBrightnessId);
										_deviceLinkedStateIdsToFetchAndUpdate.push(_linkedSaturationId);
										_deviceLinkedStateIdsToFetchAndUpdate.push(_linkedColorBrightnessId);
										_deviceLinkedStateIdsToFetchAndUpdate.push(_linkedHueId);
										if(_linkedHueId){
											var updateFunction = function(){
												var stateHue = getStateObject(_linkedHueId);
												if(stateHue && stateHue.val !== ""){
													var hueMin = stateHue.min || 0;
													var hueMax = stateHue.max || 359;
													var hue = ((stateHue.val - hueMin) / (hueMax - hueMin)) * 359;
													var	saturation = 100;
													var stateSaturation = getStateObject(_linkedSaturationId);
													if(stateSaturation && typeof stateSaturation.val != udef) {
														var saturationMin = stateSaturation.min || 0;
														var saturationMax = stateSaturation.max || 100;
														saturation = ((stateSaturation.val - saturationMin) / (saturationMax - saturationMin)) * 100;
													}
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAIcon").show()
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoATextHue").show().css("background-color", "hsl(" + hue + ", 100%," + (100-(saturation/2)) + "%)");
												}
											};
											if(_linkedHueId) viewUpdateFunctions[_linkedHueId].push(updateFunction);
											if(_linkedSaturationId) viewUpdateFunctions[_linkedSaturationId].push(updateFunction);
										}
										if(_linkedCtId){
											var updateFunction = function(){
												var stateCt = getStateObject(_linkedCtId);
												if(stateCt  && typeof stateCt.val !== udef){
													var ctMin = stateCt.min || 0;
													var ctMax = stateCt.max || 100;
													var ct = stateCt.val;
													var invertCt = false;
													if(getDeviceOptionValue(_device, "invertCt") == "true") invertCt = !invertCt;
													var rgb = colorTemperatureToRGB(ct, ctMin, ctMax, invertCt);
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAIcon").show()
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoATextCt").show().css("background-color", "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")");
												}
											};
											if(_linkedCtId) viewUpdateFunctions[_linkedCtId].push(updateFunction);
										}
										if(_linkedAlternativeColorspaceValueId){
											var updateFunction = function(callingStateId){ //ConvertToAlternativeColorspace
												if(fetchedStates[_linkedAlternativeColorspaceValueId] && fetchedStates[callingStateId] && typeof fetchedStates[callingStateId].val !== udef && fetchedStates[callingStateId].val !== ""){
													var ack = fetchedStates[callingStateId].ack;
													var alternativeColorspace = getDeviceOptionValue(_device, "alternativeColorspace") || "";
													var alternativeColorspaceValue = convertToAlternativeColorspace(_device, _linkedHueId, _linkedSaturationId, _linkedColorBrightnessId, _linkedCtId, _linkedWhiteBrightnessId, _linkedAlternativeColorspaceValueId)
													if(alternativeColorspaceValue) {
														if((callingStateId == _linkedCtId || callingStateId == _linkedWhiteBrightnessId) && (alternativeColorspace == "RGB" || alternativeColorspace == "#RGB" || alternativeColorspace == "RGB_HUEONLY" || alternativeColorspace == "#RGB_HUEONLY" || alternativeColorspace == "HUE_MILIGHT")){
															console.log("Not sending state, because a white value was changed, but AlternativeColorspace is without white");
														} else {
															if(typeof fetchedStates[_linkedAlternativeColorspaceValueId].val == "string" && fetchedStates[_linkedAlternativeColorspaceValueId].val == fetchedStates[_linkedAlternativeColorspaceValueId].val.toUpperCase()) alternativeColorspaceValue = alternativeColorspaceValue.toUpperCase();
															setState(_linkedAlternativeColorspaceValueId, _deviceIdEscaped, alternativeColorspaceValue, ack);
														}
													}
												}
											};
											if(_linkedHueId) viewUpdateFunctions[_linkedHueId].push(updateFunction);
											if(_linkedSaturationId) viewUpdateFunctions[_linkedSaturationId].push(updateFunction);
											if(_linkedColorBrightnessId) viewUpdateFunctions[_linkedColorBrightnessId].push(updateFunction);
											if(_linkedCtId) viewUpdateFunctions[_linkedCtId].push(updateFunction);
											if(_linkedWhiteBrightnessId) viewUpdateFunctions[_linkedWhiteBrightnessId].push(updateFunction);
											var updateFunction = function(){ //ConvertFromAlternativeColorspace
												if(fetchedStates[_linkedAlternativeColorspaceValueId]){
													var ack = fetchedStates[_linkedAlternativeColorspaceValueId].ack;
													var result = convertFromAlternativeColorspace(_device, _linkedAlternativeColorspaceValueId, _linkedHueId, _linkedSaturationId, _linkedColorBrightnessId, _linkedCtId, _linkedWhiteBrightnessId);
													if(typeof fetchedObjects[_linkedAlternativeColorspaceValueId] == udef) fetchedObjects[_linkedAlternativeColorspaceValueId] = {};
													fetchedObjects[_linkedAlternativeColorspaceValueId].result = {};
													//To avoid a converting-loop by rounding-differences the state is only updated, if difference between old an new value is > 1
													if(result.hue != null){
														if(_linkedHueId && _linkedHueId !== "" && (!fetchedStates[_linkedHueId] || (fetchedStates[_linkedHueId] && typeof fetchedStates[_linkedHueId].val != udef && Math.abs(fetchedStates[_linkedHueId].val - result.hue) > 1))) setState(_linkedHueId, _deviceIdEscaped, result.hue, ack, null, 100);
													}
													if(result.saturation != null){
														if(_linkedSaturationId && _linkedSaturationId !== "" && (!fetchedStates[_linkedSaturationId] || (fetchedStates[_linkedSaturationId] && typeof fetchedStates[_linkedSaturationId].val != udef && Math.abs(fetchedStates[_linkedSaturationId].val - result.saturation) > 1))) setState(_linkedSaturationId, _deviceIdEscaped, result.saturation, ack, null, 100);
													}
													if(result.colorBrightness != null){
														if(_linkedColorBrightnessId && _linkedColorBrightnessId !== "" && (!fetchedStates[_linkedColorBrightnessId] || (fetchedStates[_linkedColorBrightnessId] && typeof fetchedStates[_linkedColorBrightnessId].val != udef && Math.abs(fetchedStates[_linkedColorBrightnessId].val - result.colorBrightness) > 1))) setState(_linkedColorBrightnessId, _deviceIdEscaped, result.colorBrightness, ack, null, 100);
													}
													if(result.ct != null){
														if(_linkedCtId && _linkedCtId !== "" && (!fetchedStates[_linkedCtId] || (fetchedStates[_linkedCtId] && typeof fetchedStates[_linkedCtId].val != udef && Math.abs(fetchedStates[_linkedCtId].val - result.ct) > 1))) setState(_linkedCtId, _deviceIdEscaped, result.ct, ack, null, 100);
													}
													if(result.whiteBrightness != null){
														if(_linkedWhiteBrightnessId && _linkedWhiteBrightnessId !== "" && (!fetchedStates[_linkedWhiteBrightnessId] || (fetchedStates[_linkedWhiteBrightnessId] && typeof fetchedStates[_linkedWhiteBrightnessId].val != udef && Math.abs(fetchedStates[_linkedWhiteBrightnessId].val - result.whiteBrightness) > 1))) setState(_linkedWhiteBrightnessId, _deviceIdEscaped, result.whiteBrightness, ack, null, 100);
													}
												}
											};
											if(_linkedAlternativeColorspaceValueId) viewUpdateFunctions[_linkedAlternativeColorspaceValueId].push(updateFunction);
										}
										_deviceLinkedStateIdsToFetchAndUpdate = removeDuplicates(_deviceLinkedStateIdsToFetchAndUpdate);
										fetchStates(_deviceLinkedStateIdsToFetchAndUpdate, function(){
											for (var i = 0; i < _deviceLinkedStateIdsToFetchAndUpdate.length; i++){
												if(typeof fetchedObjects[_deviceLinkedStateIdsToFetchAndUpdate[i]] == udef) {
													fetchObject(_deviceLinkedStateIdsToFetchAndUpdate[i], function(){
														updateState(_deviceLinkedStateIdsToFetchAndUpdate[i], "ignorePreventUpdateForView");
													});
												} else {
													updateState(_deviceLinkedStateIdsToFetchAndUpdate[i], "ignorePreventUpdateForView");
												}
											}
											_deviceLinkedStateIdsToFetchAndUpdate = [];
										});
									};
									if(_linkedAlternativeColorspaceValueId) fetchObject(_linkedAlternativeColorspaceValueId, _createColouredLightFunction, true); else _createColouredLightFunction();
								})(); //<--End Closure
							}
							break;

							case "iQontrolMedia":
							if(deviceLinkedStateIds["VOLUME"]) {
								sliderIndex = viewInfoASliderLength[deviceIdEscaped];
								viewInfoASliderLength[deviceIdEscaped]++;
								deviceContent += "<image class='iQontrolDeviceInfoAIcon" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + " display: none;' src='" + (options.LayoutDefaultSymbols && options.LayoutDefaultSymbols["VOLUME"] && options.LayoutDefaultSymbols["VOLUME"]["volumeIcon_on"] || "./images/symbols/volume.png") + "'>";
								deviceContent += "<div class='iQontrolDeviceInfoAText" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + "'></div>";
								(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
									var _deviceIdEscaped = deviceIdEscaped;
									var _device = device;
									var _linkedVolumeId = deviceLinkedStateIds["VOLUME"];
									var _sliderIndex = sliderIndex;
									var updateFunction = function(){
										var stateVolume = getStateObject(_linkedVolumeId);
										if(stateVolume && typeof stateVolume.val !== udef && stateVolume.val !== ""){
											var val = stateVolume.plainText;
											var unit = stateVolume.unit;
											var digits = getDeviceOptionValue(_device, "infoARoundDigits") || 1;
											if(!isNaN(val)) {
												if(val < -100 || val > 100) val = Math.round(val); else val = Math.round(stateVolume.valFull * Math.pow(10, digits)) / Math.pow(10, digits);
											}
											if(stateVolume.plainText == stateVolume.val) val = val + unit;
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAIcon").show();
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAText").html(val);
										} else {
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAIcon").hide();
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAText").html("");
										}
									};
									viewUpdateFunctions[_linkedVolumeId].push(updateFunction);
								})(); //<--End Closure
							}
							break;

							default:
							//Do nothing
						}
						if(deviceLinkedStateIds["INFO_A"]) {
							//Special: INFO_A is an Array: [{"type":"LinkedState", "value":"LinkedStateId", icon:"url"}, ...]
							var stateInfoA = getStateObject(deviceLinkedStateIds["INFO_A"]);
							var infoAArray = tryParseJSON(stateInfoA && stateInfoA.val || "");
							var infoAArrayValid = false;
							if(Array.isArray(infoAArray) && typeof infoAArray == 'object') infoAArray.forEach(function(element){
								if(typeof element.value !== udef && element.value !== udef){
									infoAArrayValid = true;
								}
							});
							if(infoAArrayValid){
								infoAArray.forEach(function(element){
									sliderIndex = viewInfoASliderLength[deviceIdEscaped];
									viewInfoASliderLength[deviceIdEscaped]++;
									deviceContent += "<image class='iQontrolDeviceInfoAIcon" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + " display: none;' src='" + (element.icon && element.icon !== "" ? element.icon : "./images/symbols/info.png") + "'>";
									deviceContent += "<div class='iQontrolDeviceInfoAText" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + "'></div>";
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _deviceIdEscaped = deviceIdEscaped;
										var _device = device;
										var _linkedElementId = element.value;
										var _linkedElementCaption = (getDeviceOptionValue(device, "infoAShowName") == "true" ? element.name : "");
										var _sliderIndex = sliderIndex;
										var updateFunction = function(){
											var stateElement = getStateObject(_linkedElementId);
											if(stateElement && typeof stateElement.val !== udef && stateElement.val !== ""){
												var val = stateElement.plainText;
												var unit = stateElement.unit;
												var digits = getDeviceOptionValue(_device, "infoARoundDigits") || 1;
												if(!isNaN(val)) {
													if(val < -100 || val > 100) val = Math.round(val); else val = Math.round(stateElement.valFull * Math.pow(10, digits)) / Math.pow(10, digits);
												}
												if(stateElement.plainText == stateElement.val) val = val + unit;
												if(_linkedElementCaption) val = _linkedElementCaption + "&nbsp;" + val;
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAIcon").show();
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAText").html(val);
											} else {
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAIcon").hide();
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoAText").html("");
											}
										};
										if(typeof viewUpdateFunctions[_linkedElementId] == udef) viewUpdateFunctions[_linkedElementId] = [];
										viewUpdateFunctions[_linkedElementId].push(updateFunction);
									})(); //<--End Closure
									viewLinkedStateIdsToFetchAndUpdate.push(element.value);
								});
							}
						}
						deviceContent += "</div>";

						//--Info B
						var hideIfClasses = (getDeviceOptionValue(device, "hideInfoBIfInactive") == "true" ? " hideIfInactive" : "") + (getDeviceOptionValue(device, "hideInfoBIfActive") == "true" ? " hideIfActive" : "") + (getDeviceOptionValue(device, "hideInfoBIfEnlarged") == "true" ? " hideIfEnlarged" : "");
						viewInfoBSliderLength[deviceIdEscaped] = 0;
						viewInfoBSliderIndex[deviceIdEscaped] = 0;
						deviceContent += "<div class='iQontrolDeviceInfoB' data-iQontrol-Device-ID='" + deviceIdEscaped + "'>";
						switch(device.commonRole){
							case "iQontrolThermostat": case "iQontrolHomematicThermostat": case "iQontrolHomematicIpThermostat": case "iQontrolTemperature": case "iQontrolHumidity": case "iQontrolPressure":
							if(deviceLinkedStateIds["HUMIDITY"]) {
								sliderIndex = viewInfoBSliderLength[deviceIdEscaped];
								viewInfoBSliderLength[deviceIdEscaped]++;
								deviceContent += "<image class='iQontrolDeviceInfoBIcon" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + " display: none;' src='" + (options.LayoutDefaultSymbols && options.LayoutDefaultSymbols["HUMIDITY"] && options.LayoutDefaultSymbols["HUMIDITY"]["humidityIcon_on"] || "./images/symbols/humidity.png") + "'>";
								deviceContent += "<div class='iQontrolDeviceInfoBText" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + "'></div>";
								(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
									var _deviceIdEscaped = deviceIdEscaped;
									var _device = device;
									var _linkedHumidityId = deviceLinkedStateIds["HUMIDITY"];
									var _sliderIndex = sliderIndex;
									viewUpdateFunctions[_linkedHumidityId].push(function(){
										var stateHumidity = getStateObject(_linkedHumidityId);
										if(stateHumidity && typeof stateHumidity.val !== udef && stateHumidity.val !== ""){
											var val = stateHumidity.plainText;
											var unit = stateHumidity.unit;
											var digits = getDeviceOptionValue(_device, "infoBRoundDigits") || 1;
											if(!isNaN(val)) val = Math.round(stateHumidity.valFull * Math.pow(10, digits)) / Math.pow(10, digits);
											if(stateHumidity.plainText == stateHumidity.val) val = val + unit;
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoBIcon").show();
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoBText").html(val);
										} else {
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoBIcon").hide();
										}
									});
								})(); //<--End Closure
							}
							break;

							case "iQontrolSwitch": case "iQontrolFan": case "iQontrolLight": case "iQontrolBattery":
							if(deviceLinkedStateIds["POWER"] && (getDeviceOptionValue(device, "showPowerAsState") != "true")) {
								sliderIndex = viewInfoBSliderLength[deviceIdEscaped];
								viewInfoBSliderLength[deviceIdEscaped]++;
								deviceContent += "<image class='iQontrolDeviceInfoBIcon" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + " display: none;' src='" + (options.LayoutDefaultSymbols && options.LayoutDefaultSymbols["POWER"] && options.LayoutDefaultSymbols["POWER"]["powerIcon_on"] || "./images/symbols/power.png") + "'>";
								deviceContent += "<div class='iQontrolDeviceInfoBText" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + "'></div>";
								(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
									var _deviceIdEscaped = deviceIdEscaped;
									var _device = device;
									var _linkedPowerId = deviceLinkedStateIds["POWER"];
									var _sliderIndex = sliderIndex;
									viewUpdateFunctions[_linkedPowerId].push(function(){
										var statePower = getStateObject(_linkedPowerId);
										if(statePower && typeof statePower.val !== udef && statePower.val !== ""){
											var val = statePower.plainText;
											var unit = statePower.unit;
											var digits = getDeviceOptionValue(_device, "infoBRoundDigits") || 1;
											if(!isNaN(val)) {
												if(val < -100 || val > 100) val = Math.round(statePower.valFull * Math.pow(10, digits)) / Math.pow(10, digits);
											}
											if(statePower.plainText == statePower.val) val = val + unit;
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoBIcon").show();
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoBText").html(val);
										} else {
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoBIcon").hide();
										}
									});
								})(); //<--End Closure
							}
							break;

							case "iQontrolMedia":
							if(deviceLinkedStateIds["ELAPSED"]) {
								sliderIndex = viewInfoBSliderLength[deviceIdEscaped];
								viewInfoBSliderLength[deviceIdEscaped]++;
								deviceContent += "<image class='iQontrolDeviceInfoBIcon" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + " display: none;' src='" + (options.LayoutDefaultSymbols && options.LayoutDefaultSymbols["ELAPSED"] && options.LayoutDefaultSymbols["ELAPSED"]["elapsedIcon_on"] || "./images/symbols/time.png") + "'>";
								deviceContent += "<div class='iQontrolDeviceInfoBText" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + "'></div>";
								(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
									var _deviceIdEscaped = deviceIdEscaped;
									var _device = device;
									var _linkedStateId = deviceLinkedStateIds["STATE"];
									var _linkedElapsedId = deviceLinkedStateIds["ELAPSED"];
									var _linkedDurationId = deviceLinkedStateIds["DURATION"];
									var _sliderIndex = sliderIndex;
									var updateFunction = function(){
										var stateElapsed = getStateObject(_linkedElapsedId);
										var stateDuration = getStateObject(_linkedDurationId);
										var active = $("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").hasClass("active");
										if(active && stateElapsed && typeof stateElapsed.val !== udef && stateElapsed.val !== "" && !isNaN(stateElapsed.val)){
											var divider = (getDeviceOptionValue(_device, "durationIsMilliseconds") == "true" ? 1000 : 1);
											var elapsedIsPercentage = (getDeviceOptionValue(_device, "elapsedIsPercentage") == "true");
											if(elapsedIsPercentage){
												let percentageDivider = (stateElapsed.val > 1 ? 100 : 1);
												if(stateDuration && stateDuration.val && !isNaN(stateDuration.val)){
													var val = secondsToHHMMSS(stateElapsed.val / percentageDivider * stateDuration.val / divider);
												} else {
													var val = (stateElapsed.val / percentageDivider) + "%";
												}
											} else {
												var val = secondsToHHMMSS(stateElapsed.val / divider);
											}
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoBIcon").show();
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoBText").html(val);
										} else {
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoBIcon").hide();
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoBText").html("");
										}
									};
									viewUpdateFunctions[_linkedElapsedId].push(updateFunction);
									if(_linkedStateId) viewUpdateFunctions[_linkedStateId].push(updateFunction);
								})(); //<--End Closure
							}
							break;

							default:
							//Do nothing
						}
						if(deviceLinkedStateIds["INFO_B"]) {
							//Special: INFO_B is an Array: [{"type":"LinkedState", "value":"LinkedStateId", icon:"url"}, ...]
							var stateInfoB = getStateObject(deviceLinkedStateIds["INFO_B"]);
							var infoBArray = tryParseJSON(stateInfoB && stateInfoB.val || "");
							var infoBArrayValid = false;
							if(Array.isArray(infoBArray) && typeof infoBArray == 'object') infoBArray.forEach(function(element){
								if(typeof element.value !== udef && element.value !== udef){
									infoBArrayValid = true;
								}
							});
							if(infoBArrayValid){
								infoBArray.forEach(function(element){
									sliderIndex = viewInfoBSliderLength[deviceIdEscaped];
									viewInfoBSliderLength[deviceIdEscaped]++;
									deviceContent += "<image class='iQontrolDeviceInfoBIcon" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + " display: none;' src='" + (element.icon && element.icon !== "" ? element.icon : "./images/symbols/info.png") + "'>";
									deviceContent += "<div class='iQontrolDeviceInfoBText" + hideIfClasses + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-slider-index='" + sliderIndex + "' style='" + (sliderIndex > 0 ? "opacity: 0;" : "opacity: 1;") + "'></div>";
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _deviceIdEscaped = deviceIdEscaped;
										var _device = device;
										var _linkedElementId = element.value;
										var _linkedElementCaption = (getDeviceOptionValue(device, "infoBShowName") == "true" ? element.name : "");
										var _sliderIndex = sliderIndex;
										var updateFunction = function(){
											var stateElement = getStateObject(_linkedElementId);
											if(stateElement && typeof stateElement.val !== udef && stateElement.val !== ""){
												var val = stateElement.plainText;
												var unit = stateElement.unit;
												var digits = getDeviceOptionValue(_device, "infoBRoundDigits") || 1;
												if(!isNaN(val)) {
													if(val < -100 || val > 100) val = Math.round(val); else val = Math.round(stateElement.valFull * Math.pow(10, digits)) / Math.pow(10, digits);
												}
												if(stateElement.plainText == stateElement.val) val = val + unit;
												if(_linkedElementCaption) val = _linkedElementCaption + "&nbsp;" + val;
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoBIcon").show();
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoBText").html(val);
											} else {
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoBIcon").hide();
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'][data-slider-index='" + _sliderIndex + "'].iQontrolDeviceInfoBText").html("");
											}
										};
										if(typeof viewUpdateFunctions[_linkedElementId] == udef) viewUpdateFunctions[_linkedElementId] = [];
										viewUpdateFunctions[_linkedElementId].push(updateFunction);
									})(); //<--End Closure
									viewLinkedStateIdsToFetchAndUpdate.push(element.value);
								});
							}
						}
						deviceContent += "</div>";
						//--Name
						var name = device.commonName.split('|')[0];
						var variablename = encodeURI(device.commonName.split('|').slice(1).join('|'));
						var hideDeviceName = (getDeviceOptionValue(device, "hideDeviceName") == "true");
						deviceContent += "<div class='iQontrolDeviceName" + ((getDeviceOptionValue(device, "hideDeviceNameIfInactive") == "true")?" hideIfInactive":"") + ((getDeviceOptionValue(device, "hideDeviceNameIfActive") == "true")?" hideIfActive":"") + ((getDeviceOptionValue(device, "hideDeviceNameIfEnlarged") == "true")?" hideIfEnlarged":"") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' " + ((variablename && !hideDeviceName) ? "data-variablename='" + variablename + "' " : "") + ">";
							if(!hideDeviceName){
								deviceContent += name;
							}
						deviceContent += "</div>";
						//--State
						deviceContent += "<div class='iQontrolDeviceState" + ((getDeviceOptionValue(device, "stateBigFontInactive") == "true")?" bigFontIfInactive":"") + ((getDeviceOptionValue(device, "stateBigFontActive") == "true")?" bigFontIfActive":"") + ((getDeviceOptionValue(device, "stateBigFontEnlarged") == "true")?" bigFontIfEnlarged":"") + ((getDeviceOptionValue(device, "hideStateIfInactive") == "true")?" hideIfInactive":"") + ((getDeviceOptionValue(device, "hideStateIfActive") == "true")?" hideIfActive":"") + ((getDeviceOptionValue(device, "hideStateIfEnlarged") == "true")?" hideIfEnlarged":"") + (stateHeightAdaptsContentInactive ? " adaptsHeightIfInactive" : "") + (stateHeightAdaptsContentActive ? " adaptsHeightIfActive" : "") + (stateHeightAdaptsContentEnlarged ? " adaptsHeightIfEnlarged" : "") + ((getDeviceOptionValue(device, "stateFillsDeviceInactive") == "true")?" stateFillsDeviceIfInactive":"") + ((getDeviceOptionValue(device, "stateFillsDeviceActive") == "true")?" stateFillsDeviceIfActive":"") + ((getDeviceOptionValue(device, "stateFillsDeviceEnlarged") == "true")?" stateFillsDeviceIfEnlarged":"") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "'>";
							switch(device.commonRole){
								case "iQontrolView":
								//Do nothing
								break;

								case "iQontrolButton": case "iQontrolProgram":
								if(deviceLinkedStateIds["STATE"] || deviceLinkedStateIds["tileActiveStateId"] || getDeviceOptionValue(device, "tileActiveCondition")){
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _deviceIdEscaped = deviceIdEscaped;
										var _device = device;
										var _linkedStateId = deviceLinkedStateIds["STATE"];
										var _linkedTileActiveStateId = deviceLinkedStateIds["tileActiveStateId"];
										var updateFunction = function(){
											var state = getStateObject(_linkedStateId);
											var tileActiveStateId = getStateObject(_linkedTileActiveStateId);
											var showState = (getDeviceOptionValue(_device, "showState") == "true") || false;
											var result;
											var resultText = "";
											if(state && typeof state.val !== udef ){
												if(typeof state.plainText == 'number'){	//STATE = number (= level)
													result = state.val;
													resultText = result + state.unit;
												} else { 								//STATE = bool or text
													result = state.val;
													resultText = state.plainText;
												}
												if(resultText == "0%") resultText = _("off");
												resultText = unescape(resultText);
											}
											var tileActiveCondition = getDeviceOptionValue(_device, "tileActiveCondition");
											var tileActiveConditionValue = getDeviceOptionValue(_device, "tileActiveConditionValue");
											var tileActiveValue = result || false;
											if(tileActiveStateId && typeof tileActiveStateId.val != udef){
												tileActiveValue = tileActiveStateId.val;
											}
											var tileActive = checkCondition(tileActiveValue, tileActiveCondition, tileActiveConditionValue);
											var tileActiveStandard;
											if(tileActive == null){
												if(tileActiveValue.toString().toLowerCase() == "false" || tileActiveValue.toString().toLowerCase() == "0" || tileActiveValue.toString().toLowerCase() == "-1" || tileActiveValue.toString().toLowerCase() == ""){
													tileActiveStandard = false;
												} else {
													tileActiveStandard = true;
												}
											}
											if(showState || tileActive != null){
												if(tileActive == null) tileActive = tileActiveStandard;
												if(tileActive){
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").addClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").addClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").addClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
												} else {
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").addClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
												}
											}
											if(showState){
												resultText = addTimestamp(resultText, [state], [_linkedStateId], _device, tileActive);
												if(typeof result !== udef && $("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value') !== resultText){
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value', resultText);
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").html(resultText);
												}
											}
											viewShuffleFilterHideDeviceIfInactive();
											stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState"));
										};
										if(_linkedStateId) viewUpdateFunctions[_linkedStateId].push(updateFunction);
										if(_linkedTileActiveStateId) viewUpdateFunctions[_linkedTileActiveStateId].push(updateFunction);
										if(!_linkedStateId && !_linkedTileActiveStateId && getDeviceOptionValue(_device, "tileActiveCondition")) viewUpdateFunctions["UPDATE_ONCE"].push(updateFunction);
									})(); //<--End Closure
								}
								break;

								case "iQontrolScene":
								if(deviceLinkedStateIds["STATE"] || deviceLinkedStateIds["tileActiveStateId"] || getDeviceOptionValue(device, "tileActiveCondition")){
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _device = device;
										var _deviceIdEscaped = deviceIdEscaped;
										var _linkedStateId = deviceLinkedStateIds["STATE"];
										var _linkedTileActiveStateId = deviceLinkedStateIds["tileActiveStateId"];
										var updateFunction = function(){
											var state = getStateObject(_linkedStateId);
											var tileActiveStateId = getStateObject(_linkedTileActiveStateId);
											var result;
											var resultText = "";
											if(state && typeof state.val !== udef && state.val !== "false" && state.val !== false && state.val !== 0 && state.val !== "" && state.val !== -1) {
												result = true;
											} else {
												result = false;
											}
											var tileActiveCondition = getDeviceOptionValue(_device, "tileActiveCondition");
											var tileActiveConditionValue = getDeviceOptionValue(_device, "tileActiveConditionValue");
											var tileActiveValue = result;
											if(tileActiveStateId && typeof tileActiveStateId.val != udef){
												tileActiveValue = tileActiveStateId.val;
											}
											var tileActive = checkCondition(tileActiveValue, tileActiveCondition, tileActiveConditionValue);
											var tileActiveStandard = result || false;
											if(tileActive == null) tileActive = tileActiveStandard;
											if(tileActive){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
											} else {
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
											}
											resultText = addTimestamp(resultText, [state], [_linkedStateId], _device, tileActive);
											if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value') !== resultText){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value', resultText);
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").html(resultText);
											}
											viewShuffleFilterHideDeviceIfInactive();
											stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState"));
										};
										if(_linkedStateId) viewUpdateFunctions[_linkedStateId].push(updateFunction);
										if(_linkedTileActiveStateId) viewUpdateFunctions[_linkedTileActiveStateId].push(updateFunction);
										if(!_linkedStateId && !_linkedTileActiveStateId && getDeviceOptionValue(_device, "tileActiveCondition")) viewUpdateFunctions["UPDATE_ONCE"].push(updateFunction);
									})(); //<--End Closure
								}
								break;

								case "iQontrolThermostat": case "iQontrolHomematicThermostat": case "iQontrolHomematicIpThermostat":
								if(deviceLinkedStateIds["SET_TEMPERATURE"] || deviceLinkedStateIds["CONTROL_MODE"] || deviceLinkedStateIds["tileActiveStateId"] || getDeviceOptionValue(device, "tileActiveCondition")){
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _device = device;
										var _deviceIdEscaped = deviceIdEscaped;
										var _linkedSetTemperatureId = deviceLinkedStateIds["SET_TEMPERATURE"];
										var _linkedControlModeId = deviceLinkedStateIds["CONTROL_MODE"];
										var linkedParentId = (_linkedControlModeId || "").substring(0, (_linkedControlModeId || "").lastIndexOf("."));
										var _linkedBoostModeId = linkedParentId + ".BOOST_MODE"; //Only for HmIP
										var _linkedPartyTemperatureId = deviceLinkedStateIds["PARTY_TEMPERATURE"];
										var _linkedWindowOpenReportingId = deviceLinkedStateIds["WINDOW_OPEN_REPORTING"];
										var _linkedTileActiveStateId = deviceLinkedStateIds["tileActiveStateId"];
										var updateFunction = function(){
											var setTemperature = getStateObject(_linkedSetTemperatureId);
											var controlMode = getStateObject(_linkedControlModeId);
											var boostMode = getStateObject(_linkedBoostModeId); //Only for HmIP
											var tileActiveStateId = getStateObject(_linkedTileActiveStateId);
											var min = setTemperature && setTemperature.min || 0;
											var max = setTemperature && setTemperature.max || 100;
											var result = setTemperature && setTemperature.val || "";
											var unit = setTemperature && setTemperature.unit || "";
											var mode = "";
											var modeText = "";
											var resultText = "";
											var controlModeDisabledValue = getDeviceOptionValue(_device, "controlModeDisabledValue") || "";
											if(_linkedControlModeId) {
												if(controlMode && typeof controlMode.val !== udef) {
													mode = controlMode.val;
													modeText = controlMode.plainText;
													if(device.commonRole == "iQontrolHomematicIpThermostat") { //For HmIP valueList is not provided
														if(!controlMode.valueList){
															controlMode.valueList = {};
															controlMode.valueList[0] = "AUTO-MODE";
															controlMode.valueList[1] = "MANU-MODE";
															controlMode.valueList[2] = "PARTY-MODE";
															controlMode.valueList[3] = "BOOST-MODE";
															var plainText = _(controlMode.valueList[controlMode.val]);
															if(plainText) modeText = plainText;
															if(boostMode && boostMode.val) modeText = _("BOOST-MODE");
														}														
													}
												}
											}
											if(result !== "") modeText = "<span class='small'>&nbsp;" + modeText + "</span>";
											resultText = result + unit + modeText;
											var tileActiveCondition = getDeviceOptionValue(_device, "tileActiveCondition");
											var tileActiveConditionValue = getDeviceOptionValue(_device, "tileActiveConditionValue");
											var tileActiveValue = result;
											if(tileActiveStateId && typeof tileActiveStateId.val != udef){
												tileActiveValue = tileActiveStateId.val;
											}
											var tileActive = checkCondition(tileActiveValue, tileActiveCondition, tileActiveConditionValue);
											var tileActiveStandard;
											if((mode !== "" && controlModeDisabledValue !== "" && mode == controlModeDisabledValue) || (tileActiveValue !== "" && (tileActiveValue <= min || tileActiveValue >= max))) {
												tileActiveStandard = false;
											} else {
												tileActiveStandard = true;
											}
											if(tileActive == null) tileActive = tileActiveStandard;
											if(tileActive){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
											} else {
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").addClass("active");
											}
											resultText = addTimestamp(resultText, [setTemperature, controlMode], [_linkedSetTemperatureId, _linkedControlModeId], _device, tileActive);
											if(device.commonRole != "iQontrolHomematicIpThermostat" && _linkedPartyTemperatureId && typeof fetchedStates[_linkedPartyTemperatureId] !== udef && typeof fetchedStates[_linkedPartyTemperatureId].val !== udef && fetchedStates[_linkedPartyTemperatureId].val >= 6) resultText += "&nbsp;<image src='./images/party.png' style='width:12px; height:12px;' />";
											if(_linkedWindowOpenReportingId && typeof fetchedStates[_linkedWindowOpenReportingId] !== udef && fetchedStates[_linkedWindowOpenReportingId] !== null && typeof fetchedStates[_linkedWindowOpenReportingId].val !== udef && fetchedStates[_linkedWindowOpenReportingId].val) resultText += "&nbsp;<image src='./images/wot.png' style='width:12px; height:12px;' />";
											if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value') !== resultText){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value', resultText);
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").html(resultText);
											}
											viewShuffleFilterHideDeviceIfInactive();
											stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState"));
										};
										if(_linkedSetTemperatureId) viewUpdateFunctions[_linkedSetTemperatureId].push(updateFunction);
										if(_linkedControlModeId) viewUpdateFunctions[_linkedControlModeId].push(updateFunction);
										if(_linkedPartyTemperatureId) viewUpdateFunctions[_linkedPartyTemperatureId].push(updateFunction);
										if(_linkedWindowOpenReportingId) viewUpdateFunctions[_linkedWindowOpenReportingId].push(updateFunction);
										if(_linkedTileActiveStateId) viewUpdateFunctions[_linkedTileActiveStateId].push(updateFunction);
										if(!_linkedSetTemperatureId && !_linkedControlModeId && !_linkedPartyTemperatureId && !_linkedWindowOpenReportingId && !_linkedTileActiveStateId && getDeviceOptionValue(_device, "tileActiveCondition")) viewUpdateFunctions["UPDATE_ONCE"].push(updateFunction);
									})(); //<--End Closure
								}
								break;

								case "iQontrolDoor": case "iQontrolGarageDoor": case "iQontrolWindow":
								if(deviceLinkedStateIds["STATE"] || deviceLinkedStateIds["tileActiveStateId"] || getDeviceOptionValue(device, "tileActiveCondition")){
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _device = device;
										var _deviceIdEscaped = deviceIdEscaped;
										var _linkedStateId = deviceLinkedStateIds["STATE"];
										var _linkedTileActiveStateId = deviceLinkedStateIds["tileActiveStateId"];
										var updateFunction = function(){
											var state = getStateObject(_linkedStateId);
											var stateClosedValue = getDeviceOptionValue(_device, "stateClosedValue") || _("closed");
											var stateTiltedValue = getDeviceOptionValue(_device, "stateTiltedValue") || _("tilted");
											var stateOpenedValue = getDeviceOptionValue(_device, "stateOpenedValue") || _("opened");
											var tileActiveStateId = getStateObject(_linkedTileActiveStateId);
											var result;
											var resultText;
											if(state && typeof state.plainText == 'number'){		//STATE = number
												result = state.val;
												resultText = result + state.unit;
												if(result > 0){ //show as opened
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").addClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.tilted").removeClass("active");
												} else { //show as closed
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").addClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.tilted").removeClass("active");
												}
											} else if(state){ 										//STATE = bool or text
												result = state.val;
												if(typeof result == 'boolean') {					//STATE = bool -> force to opened or closed
													if(result) { //opened
														resultText = _("opened");
														$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").addClass("active");
														$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
														$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.tilted").removeClass("active");
													} else { //closed
														resultText = _("closed");
														$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
														$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").addClass("active");
														$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.tilted").removeClass("active");
													}
												} else {											//STATE = text
													resultText = state.plainText;
													switch (resultText) {
														case stateClosedValue: case _(stateClosedValue): case capitalize(stateClosedValue): case capitalize(_(stateClosedValue)): //closed
														result = false;
														$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
														$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").addClass("active");
														$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.tilted").removeClass("active");
														break;

														case stateTiltedValue: case _(stateTiltedValue): case capitalize(stateTiltedValue): case capitalize(_(stateTiltedValue)): //tilted
														result = true;
														$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
														$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
														$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.tilted").addClass("active");
														break;

														case stateOpenedValue: case _(stateOpenedValue): case capitalize(stateOpenedValue): case capitalize(_(stateOpenedValue)): //opened
														result = true;
														$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").addClass("active");
														$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
														$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.tilted").removeClass("active");
														break;

														default: 										//free text or undefined state
														if(typeof result == udef || result == 0 || result == false) { //show as closed
															$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
															$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").addClass("active");
															$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.tilted").removeClass("active");
														} else { //show as opened
															$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").addClass("active");
															$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
															$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.tilted").removeClass("active");
														}
														break;
													}
												}
											}
											var tileActiveCondition = getDeviceOptionValue(_device, "tileActiveCondition");
											var tileActiveConditionValue = getDeviceOptionValue(_device, "tileActiveConditionValue");
											var tileActiveValue = result;
											if(tileActiveStateId && typeof tileActiveStateId.val != udef){
												tileActiveValue = tileActiveStateId.val;
											}
											var tileActive = checkCondition(tileActiveValue, tileActiveCondition, tileActiveConditionValue);
											var tileActiveStandard = tileActiveValue || false;
											if(tileActive == null) tileActive = tileActiveStandard;
											if(tileActive){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").addClass("active");
											} else {
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").removeClass("active");
											}
											resultText = unescape(resultText);
											resultText = addTimestamp(resultText, [state], [_linkedStateId], _device, tileActive);
											if(typeof result !== udef && $("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value') !== resultText){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value', resultText);
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").html(resultText);
											}
											viewShuffleFilterHideDeviceIfInactive();
											stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState"));
										};
										if(_linkedStateId) viewUpdateFunctions[_linkedStateId].push(updateFunction);
										if(_linkedTileActiveStateId) viewUpdateFunctions[_linkedTileActiveStateId].push(updateFunction);
										if(!_linkedStateId && !_linkedTileActiveStateId && getDeviceOptionValue(_device, "tileActiveCondition")) viewUpdateFunctions["UPDATE_ONCE"].push(updateFunction);
									})(); //<--End Closure
								}
								break;

								case "iQontrolDoorWithLock":
								if(deviceLinkedStateIds["STATE"] || deviceLinkedStateIds["LOCK_STATE"] || deviceLinkedStateIds["tileActiveStateId"] || getDeviceOptionValue(device, "tileActiveCondition")){
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _device = device;
										var _deviceIdEscaped = deviceIdEscaped;
										var _linkedStateId = deviceLinkedStateIds["STATE"];
										var _linkedLockStateId = deviceLinkedStateIds["LOCK_STATE"];
										var _linkedLockStateUncertainId = deviceLinkedStateIds["LOCK_STATE_UNCERTAIN"];
										var _linkedLockOpenId = deviceLinkedStateIds["LOCK_OPEN"];
										var _linkedTileActiveStateId = deviceLinkedStateIds["tileActiveStateId"];
										var updateFunction = function(){
											var state = getStateObject(_linkedStateId);
											var stateClosedValue = getDeviceOptionValue(_device, "stateClosedValue") || "false";
											var lockStateLockedValue = getDeviceOptionValue(_device, "lockStateLockedValue") || "false";
											var lockState = getStateObject(_linkedLockStateId);
											var lockStateUncertain = getStateObject(_linkedLockStateUncertainId);
											var lockOpen = getStateObject(_linkedLockOpenId);
											var tileActiveStateId = getStateObject(_linkedTileActiveStateId);
											var result;
											var resultText = "";
											if(state 
												&& typeof state.val !== udef 
												&& (
													(state.plainText == stateClosedValue || state.plainText == _(stateClosedValue) || state.plainText == capitalize(stateClosedValue) || state.plainText == capitalize(_(stateClosedValue)))
													|| (typeof state.val == "boolean" && state.val.toString() == stateClosedValue)
												)
											){ //Closed
												if(lockState 
													&& typeof lockState.val !== udef 
													&& (
														(lockState.plainText == lockStateLockedValue || lockState.plainText == _(lockStateLockedValue) || lockState.plainText == capitalize(lockStateLockedValue) || lockState.plainText == capitalize(_(lockStateLockedValue)))
														|| (typeof lockState.val == "boolean" && lockState.val.toString() == lockStateLockedValue)
													)
												) { //Closed and locked
													result = false;
													resultText = _("locked");
													if(lockStateUncertain && typeof lockStateUncertain.val !== udef && lockStateUncertain.val) resultText = "<i>" + resultText + "</i>";
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.locked").addClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.unlocked").removeClass("active");
												} else if(lockState && typeof lockState.val !== udef) { //Closed, but unlocked
													result = true;
													resultText = _("unlocked");
													if(lockStateUncertain && typeof lockStateUncertain.val !== udef && lockStateUncertain.val) resultText = "<i>" + resultText + "<i>";
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.locked").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.unlocked").addClass("active");
												} else { //Closed (and lockState not set)
													result = false;
													resultText = _("closed");
													if(lockStateUncertain && typeof lockStateUncertain.val !== udef && lockStateUncertain.val) resultText = "<i>" + resultText + "</i>";
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").addClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.locked").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.unlocked").removeClass("active");
												}
											} else { //Opened
												result = true;
												resultText = _("opened");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.locked").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.unlocked").removeClass("active");
											}
											var tileActiveCondition = getDeviceOptionValue(_device, "tileActiveCondition");
											var tileActiveConditionValue = getDeviceOptionValue(_device, "tileActiveConditionValue");
											var tileActiveValue = result;
											if(tileActiveStateId && typeof tileActiveStateId.val != udef){
												tileActiveValue = tileActiveStateId.val;
											}
											var tileActive = checkCondition(tileActiveValue, tileActiveCondition, tileActiveConditionValue);
											var tileActiveStandard = tileActiveValue || false;
											if(tileActive == null) tileActive = tileActiveStandard;
											if(tileActive){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").addClass("active");
 											} else {
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").removeClass("active");
											}
											resultText = addTimestamp(resultText, [state, lockState, lockStateUncertain, lockOpen], [_linkedStateId, _linkedLockStateId, _linkedLockStateUncertainId, _linkedLockOpenId], _device, tileActive);
											if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value') !== resultText){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value', resultText);
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").html(resultText);
											}
											viewShuffleFilterHideDeviceIfInactive();
											stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState"));
										};
										if(_linkedStateId) viewUpdateFunctions[_linkedStateId].push(updateFunction);
										if(_linkedLockStateId) viewUpdateFunctions[_linkedLockStateId].push(updateFunction);
										if(_linkedLockStateUncertainId) viewUpdateFunctions[_linkedLockStateUncertainId].push(updateFunction);
										if(_linkedTileActiveStateId) viewUpdateFunctions[_linkedTileActiveStateId].push(updateFunction);
										if(!_linkedStateId && !_linkedLockStateId && !_linkedLockStateUncertainId && !_linkedTileActiveStateId && getDeviceOptionValue(_device, "tileActiveCondition")) viewUpdateFunctions["UPDATE_ONCE"].push(updateFunction);
									})(); //<--End Closure
								}
								break;

								case "iQontrolBlind":
								if(deviceLinkedStateIds["LEVEL"] || deviceLinkedStateIds["DIRECTION"] || deviceLinkedStateIds["tileActiveStateId"] || getDeviceOptionValue(device, "tileActiveCondition")){
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _device = device;
										var _deviceIdEscaped = deviceIdEscaped;
										var _linkedLevelId = deviceLinkedStateIds["LEVEL"];
										var _linkedDirectionId = deviceLinkedStateIds["DIRECTION"];
										var _linkedTileActiveStateId = deviceLinkedStateIds["tileActiveStateId"];
										var updateFunction = function(){
											var level = getStateObject(_linkedLevelId);
											var tileActiveStateId = getStateObject(_linkedTileActiveStateId);
											var min = level.min || 0;
											var max = level.max || 100;
											var val = level.val;
											var invertActuatorLevel = false;
											if(getDeviceOptionValue(_device, "invertActuatorLevel") == "true") invertActuatorLevel = !invertActuatorLevel;
											if(invertActuatorLevel){ // 0 = open
												val = max - (level.val - min);
											}
											var direction = getStateObject(_linkedDirectionId);
											var directionOpeningValue = getDeviceOptionValue(_device, "directionOpeningValue") || 1;
											var directionClosingValue = getDeviceOptionValue(_device, "directionClosingValue") || 2;
											var directionUncertainValue = getDeviceOptionValue(_device, "directionUncertainValue") || 3;
											var result;
											var resultText = "";
											var tileActiveStandard = false;
											if(level && typeof level.plainText == 'number'){
												result = level.val;
												resultText = result + level.unit;
											} else if(level){
												result = level.val;
												resultText = level.plainText;
											}
											if(direction && typeof direction.val !== udef && direction.val.toString() == directionOpeningValue.toString()){ //Middle, but opening
												tileActiveStandard = true;
												resultText = _("opening");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.middle").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.opening").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.closing").removeClass("active");
											} else if(direction && typeof direction.val !== udef && direction.val.toString() == directionClosingValue.toString()){ //Middle, but closing
												tileActiveStandard = true;
												resultText = _("closing");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.middle").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.opening").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.closing").addClass("active");
											} else if(level && typeof level.val !== udef && val == min){ //Closed
												tileActiveStandard = false;
												if(level && typeof level.plainText == 'number') resultText = _("closed");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.middle").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.opening").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.closing").removeClass("active");
											} else if(level && typeof level.val !== udef && val == max){ //Opened
												tileActiveStandard = true;
												if(level && typeof level.plainText == 'number') resultText = _("opened");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.middle").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.opening").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.closing").removeClass("active");
											} else { //Middle with no movement
												tileActiveStandard = true;
												if(direction && typeof direction.val !== udef && direction.val.toString() == directionUncertainValue.toString()) resultText = "<i>" + resultText + "</i>";
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.middle").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.opening").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.closing").removeClass("active");
											}
											var tileActiveCondition = getDeviceOptionValue(_device, "tileActiveCondition");
											var tileActiveConditionValue = getDeviceOptionValue(_device, "tileActiveConditionValue");
											var tileActiveValue = result || 0;
											if(tileActiveStateId && typeof tileActiveStateId.val != udef){
												tileActiveValue = tileActiveStateId.val;
											}
											var tileActive = checkCondition(tileActiveValue, tileActiveCondition, tileActiveConditionValue);
											if(tileActive == null) tileActive = tileActiveStandard;
											if(tileActive){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").addClass("active");
											} else {
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").removeClass("active");
											}
											resultText = addTimestamp(resultText, [level, direction], [_linkedLevelId, _linkedDirectionId], _device, tileActive);
											if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value') !== resultText){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value', resultText);
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").html(resultText);
											}
											viewShuffleFilterHideDeviceIfInactive();
											stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState"));
										};
										if(_linkedLevelId) viewUpdateFunctions[_linkedLevelId].push(updateFunction);
										if(_linkedDirectionId) viewUpdateFunctions[_linkedDirectionId].push(updateFunction);
										if(_linkedTileActiveStateId) viewUpdateFunctions[_linkedTileActiveStateId].push(updateFunction);
										if(!_linkedLevelId && !_linkedDirectionId && !_linkedTileActiveStateId && getDeviceOptionValue(_device, "tileActiveCondition")) viewUpdateFunctions["UPDATE_ONCE"].push(updateFunction);
									})(); //<--End Closure
								}
								break;

								case "iQontrolAlarm":
								if(deviceLinkedStateIds["STATE"] || deviceLinkedStateIds["CONTROL_MODE"] || deviceLinkedStateIds["tileActiveStateId"] || getDeviceOptionValue(device, "tileActiveCondition")){
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _deviceIdEscaped = deviceIdEscaped;
										var _device = device;
										var _linkedStateId = deviceLinkedStateIds["STATE"];
										var _linkedControlModeId = deviceLinkedStateIds["CONTROL_MODE"];
										var _linkedTileActiveStateId = deviceLinkedStateIds["tileActiveStateId"];
										var updateFunction = function(){
											var state = getStateObject(_linkedStateId);
											var controlMode = getStateObject(_linkedControlModeId);
											var tileActiveStateId = getStateObject(_linkedTileActiveStateId);
											var controlModeDisarmedValue = getDeviceOptionValue(_device, "controlModeDisarmedValue") || 0;
											var result;
											var resultText = "";
											if(state && typeof state.val !== udef && state.val != 0){ //Triggered
												result = true;
												resultText = state.plainText;
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.triggered").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
											} else { //Not triggered (or STATE not defined)
												if(controlMode && typeof controlMode.val != udef && controlMode.val != controlModeDisarmedValue){ //Armed
													result = true;
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.triggered").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").addClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
												} else { //Disarmed (or CONTROL_MODE not defined)
													result = false;
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.triggered").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").addClass("active");
												}
											}
											var tileActiveCondition = getDeviceOptionValue(_device, "tileActiveCondition");
											var tileActiveConditionValue = getDeviceOptionValue(_device, "tileActiveConditionValue");
											var tileActiveValue = result;
											if(tileActiveStateId && typeof tileActiveStateId.val != udef){
												tileActiveValue = tileActiveStateId.val;
											}
											var tileActive = checkCondition(tileActiveValue, tileActiveCondition, tileActiveConditionValue);
											var tileActiveStandard = tileActiveValue || false;
											if(tileActive == null) tileActive = tileActiveStandard;
											if(tileActive){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").addClass("active");
											} else {
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").removeClass("active");
											}
											if(controlMode && controlMode.plainText){
												if(resultText == ""){
													resultText = controlMode.plainText;
												} else {
													resultText += ", " + controlMode.plainText;
												}
											}
											resultText = addTimestamp(resultText, [state, controlMode], [_linkedStateId, _linkedControlModeId], _device, tileActive);
											if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value') !== resultText){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value', resultText);
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").html(resultText);
											}
											viewShuffleFilterHideDeviceIfInactive();
											stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState"));
										};
										if(_linkedStateId) viewUpdateFunctions[_linkedStateId].push(updateFunction);
										if(_linkedControlModeId) viewUpdateFunctions[_linkedControlModeId].push(updateFunction);
										if(_linkedTileActiveStateId) viewUpdateFunctions[_linkedTileActiveStateId].push(updateFunction);
										if(!_linkedStateId && !_linkedControlModeId && !_linkedTileActiveStateId && getDeviceOptionValue(_device, "tileActiveCondition")) viewUpdateFunctions["UPDATE_ONCE"].push(updateFunction);
									})(); //<--End Closure
								}
								break;

								case "iQontrolBattery":
								if(deviceLinkedStateIds["STATE"] || deviceLinkedStateIds['CHARGING'] || deviceLinkedStateIds['DISCHARGING'] || deviceLinkedStateIds["tileActiveStateId"] || getDeviceOptionValue(device, "tileActiveCondition")){
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _device = device;
										var _deviceIdEscaped = deviceIdEscaped;
										var _linkedStateId = deviceLinkedStateIds["STATE"];
										var _linkedChargingId = deviceLinkedStateIds["CHARGING"];
										var _linkedDischargingId = deviceLinkedStateIds["DISCHARGING"];
										var _linkedTileActiveStateId = deviceLinkedStateIds["tileActiveStateId"];
										var updateFunction = function(){
											var state = getStateObject(_linkedStateId);
											var charging = getStateObject(_linkedChargingId);
											var discharging = getStateObject(_linkedDischargingId);
											var tileActiveStateId = getStateObject(_linkedTileActiveStateId);
											var result;
											var resultText;
											var tileActiveStandard = false;
											var min =  state.min || 0;
											var max =  state.max || 100;
											if(state && typeof state.plainText == 'number'){
												result = state.val;
												resultText = result + state.unit;
											} else if(state){
												result = state.val;
												resultText = state.plainText;
											}
											if(state && typeof state.val !== udef && state.val == min){ //Empty
												tileActiveStandard = false;
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.full").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged75").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged50").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged25").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged10").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.empty").addClass("active");
											} else if(state && typeof state.val !== udef && state.val <= (min + ((max-min) * 0.10))){ //<10%
												tileActiveStandard = true;
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.full").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged75").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged50").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged25").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged10").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.empty").removeClass("active");
											} else if(state && typeof state.val !== udef && state.val <= (min + ((max-min) * 0.25))){ //<25%
												tileActiveStandard = true;
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.full").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged75").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged50").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged25").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged10").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.empty").removeClass("active");
											} else if(state && typeof state.val !== udef && state.val <= (min + ((max-min) * 0.50))){ //<50%
												tileActiveStandard = true;
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.full").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged75").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged50").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged25").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged10").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.empty").removeClass("active");
											} else if(state && typeof state.val !== udef && state.val <= (min + ((max-min) * 0.75))){ //<75%
												tileActiveStandard = true;
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.full").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged75").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged50").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged25").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged10").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.empty").removeClass("active");
											} else if(state && typeof state.val !== udef){ //>75%
												tileActiveStandard = true;
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.full").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged75").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged50").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged25").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charged10").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.empty").removeClass("active");
											}
											var tileActiveCondition = getDeviceOptionValue(_device, "tileActiveCondition");
											var tileActiveConditionValue = getDeviceOptionValue(_device, "tileActiveConditionValue");
											var tileActiveValue = result || 0;
											if(tileActiveStateId && typeof tileActiveStateId.val != udef){
												tileActiveValue = tileActiveStateId.val;
											}
											var tileActive = checkCondition(tileActiveValue, tileActiveCondition, tileActiveConditionValue);
											if(tileActive == null) tileActive = tileActiveStandard;
											if(tileActive){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").addClass("active");
											} else {
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").removeClass("active");
											}
											resultText = addTimestamp(resultText, [state, charging, discharging], [_linkedStateId, _linkedDischargingId], _device, tileActive);
											if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value') !== resultText){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value', resultText);
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").html(resultText);
											}
											if(charging && typeof charging.val !== udef && charging.val){ //Charging
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charging").addClass("active");
											} else {
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.charging").removeClass("active");
											}
											if(discharging && typeof discharging.val !== udef && discharging.val){ //Discharging
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.discharging").addClass("active");
											} else {
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.discharging").removeClass("active");
											}
											viewShuffleFilterHideDeviceIfInactive();
											stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState"));
										};
										if(_linkedStateId) viewUpdateFunctions[_linkedStateId].push(updateFunction);
										if(_linkedChargingId) viewUpdateFunctions[_linkedChargingId].push(updateFunction);
										if(_linkedDischargingId) viewUpdateFunctions[_linkedDischargingId].push(updateFunction);
										if(_linkedTileActiveStateId) viewUpdateFunctions[_linkedTileActiveStateId].push(updateFunction);
										if(!_linkedStateId && !_linkedChargingId && !_linkedDischargingId && !_linkedTileActiveStateId && getDeviceOptionValue(_device, "tileActiveCondition")) viewUpdateFunctions["UPDATE_ONCE"].push(updateFunction);
									})(); //<--End Closure
								}
								break;
								
								case "iQontrolDateAndTime":
								if(deviceLinkedStateIds["STATE"] || deviceLinkedStateIds['SUBJECT'] || deviceLinkedStateIds['TIME'] || deviceLinkedStateIds['RINGING'] || deviceLinkedStateIds["tileActiveStateId"] || getDeviceOptionValue(device, "tileActiveCondition")){
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _device = device;
										var _deviceIdEscaped = deviceIdEscaped;
										var _linkedStateId = deviceLinkedStateIds["STATE"];
										var _linkedSubjectId = deviceLinkedStateIds["SUBJECT"];
										var _linkedTimeId = deviceLinkedStateIds["TIME"];
										var _linkedRingingId = deviceLinkedStateIds["RINGING"];
										var _linkedTileActiveStateId = deviceLinkedStateIds["tileActiveStateId"];
										var updateFunction = function(){
											var state = getStateObject(_linkedStateId);
											var subject = getStateObject(_linkedSubjectId);
											var time = getStateObject(_linkedTimeId);
											var ringing = getStateObject(_linkedRingingId);
											var tileActiveStateId = getStateObject(_linkedTileActiveStateId);
											var _timeFormat = getTimeFormat((getDeviceOptionValue(_device, "timeFormat", true) != "~" && getDeviceOptionValue(_device, "timeFormat", true)) || (time.custom && time.custom.timeFormat) || "x");
											var _timeDisplayFormat = getTimeFormat((getDeviceOptionValue(_device, "timeDisplayFormat", true) != "~" && getDeviceOptionValue(_device, "timeDisplayFormat", true)) || (time.custom && time.custom.timeDisplayFormat) || "dddd, DD.MM.YYYY HH:mm:ss");
											var _periodDisplayFormat = getTimeFormat(replaceTokens(_timeDisplayFormat.string, momentToDurationDisplayFormatTokens));
											var _anypickerTimeDisplayFormat = getTimeFormat(replaceTokens("" + _timeDisplayFormat.string, momentToAnypickerDisplayFormatTokens), "AnyPickerMode");
											var _anypickerTimePickerFormat = getTimeFormat(replaceTokens("" + _anypickerTimeDisplayFormat.string, anypickerDisplayFormatToAnypickerPickerFormatTokens), "AnyPickerMode");
											var result = true;
											var resultText;
											//state
											if(state){
												if(state && typeof state.plainText == 'number'){
													result = state.val;
													resultText = result + state.unit;
												} else if(state){
													result = state.val;
													resultText = state.plainText;
												}
											}
											var tileActiveCondition = getDeviceOptionValue(_device, "tileActiveCondition");
											var tileActiveConditionValue = getDeviceOptionValue(_device, "tileActiveConditionValue");
											var tileActiveValue = result || 0;
											if(tileActiveStateId && typeof tileActiveStateId.val != udef){
												tileActiveValue = tileActiveStateId.val;
											}
											var tileActive = checkCondition(tileActiveValue, tileActiveCondition, tileActiveConditionValue);
											//time
											var nowMoment = moment(new Date());
											if(!(time && typeof time.val != udef)) time = {val: 0};
											if(_timeFormat.type == "period"){
												var timeMoment = moment.duration(time.val, _timeFormat.string);
											} else {
												var timeMoment = moment(time.val, _timeFormat.string);
											}
											if(!timeMoment.isValid()) timeMoment = moment(0);
											if(_timeFormat.type == "time" && timeMoment.format("DD.MM.YYYY") == nowMoment.format("DD.MM.YYYY")){
												timeMoment.year(1970).month(0).date(1);
											}									
											//distance
											var distanceText = "";
											var distanceSeconds = 0;
											if(_timeFormat.type != "period"){
												if(time.val != 0){
													var timeDistanceMoment = timeMoment.clone();
													if(_anypickerTimeDisplayFormat.type == "time" && timeDistanceMoment.toDate().getTime() <= 86400000){
														timeDistanceMoment.year(nowMoment.year()).month(nowMoment.month()).date(nowMoment.date()).add(1, 'd');
													}
													var distanceMoment = moment.duration(timeDistanceMoment.diff(nowMoment));
													distanceSeconds = distanceMoment.asSeconds();
													distanceText = distanceMoment.locale(systemLang).humanize(true);
												}
											} else { //period
												distanceSeconds = timeMoment.asSeconds();
												distanceText = timeMoment.locale(systemLang).humanize();
											}
											//tileActive
											if(tileActive == null){
												var dateAndTimeTileActiveConditions = getDeviceOptionValue(_device, "dateAndTimeTileActiveConditions") || [];
												tileActive = true;
												if(dateAndTimeTileActiveConditions.length == 0) tileActive = false;
												if(dateAndTimeTileActiveConditions.indexOf("activeIfStateActive") > -1) tileActive = !(tileActiveValue == false);
												if(dateAndTimeTileActiveConditions.indexOf("activeIfTimeNotZero") > -1 && time.val == 0) tileActive = false;
												if(dateAndTimeTileActiveConditions.indexOf("activeIfTimeInFuture") > -1 && distanceSeconds <= 0) tileActive = false;
												if(dateAndTimeTileActiveConditions.indexOf("activeIfTimeInPast") > -1 && distanceSeconds > 0) tileActive = false;
												var dateAndTimeTileActiveWhenRinging = getDeviceOptionValue(_device, "dateAndTimeTileActiveWhenRinging");
												if(dateAndTimeTileActiveWhenRinging && ringing && typeof ringing.val !== udef && ringing.val) tileActive = true;
											}
											if(tileActive){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
											} else {
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
											}
											//resultText
											var resultTextParts = [];
											var dateAndTimeShowInState = getDeviceOptionValue(_device, "dateAndTimeShowInState") || "";
											//--state
											if(resultText && 
											((tileActive && dateAndTimeShowInState.indexOf("showStateIfActive") > -1) 
											|| (!tileActive && dateAndTimeShowInState.indexOf("showStateIfInactive") > -1))) resultTextParts.push(resultText);
											//--time
											if(timeMoment.isValid() &&
											((tileActive && distanceSeconds > 0 && dateAndTimeShowInState.indexOf("showTimeIfActiveAndInFuture") > -1) 
											|| (tileActive && distanceSeconds <= 0 && dateAndTimeShowInState.indexOf("showTimeIfActiveAndInPast") > -1)
											|| (!tileActive && distanceSeconds > 0 && dateAndTimeShowInState.indexOf("showTimeIfInactiveAndInFuture") > -1)
											|| (!tileActive && distanceSeconds <= 0 && dateAndTimeShowInState.indexOf("showTimeIfInactiveAndInPast") > -1)
											)){
												if(_timeFormat.type != "period"){
													resultTextParts.push(timeMoment.locale(systemLang).format(_timeDisplayFormat.string));
												} else {
													resultTextParts.push(timeMoment.locale(systemLang).format(_periodDisplayFormat.string));
												}
											}
											//--distance
											if(distanceText &&
											((tileActive && distanceSeconds > 0 && dateAndTimeShowInState.indexOf("showTimeDistanceIfActiveAndInFuture") > -1) 
											|| (tileActive && distanceSeconds <= 0 && dateAndTimeShowInState.indexOf("showTimeDistanceIfActiveAndInPast") > -1)
											|| (!tileActive && distanceSeconds > 0 && dateAndTimeShowInState.indexOf("showTimeDistanceeIfInactiveAndInFuture") > -1)
											|| (!tileActive && distanceSeconds <= 0 && dateAndTimeShowInState.indexOf("showTimeDistanceIfInactiveAndInPast") > -1)
											)){
												resultTextParts.push(distanceText);
												if(_linkedTimeId && viewTimestampElapsedTimerStates.indexOf(_linkedTimeId) == -1){
													viewTimestampElapsedTimerStates.push(_linkedTimeId);
												}
											}
											//--subject
											var subjectText;
											if(subject){
												if(subject && typeof subject.plainText == 'number'){
													subjectText = result + subject.unit;
												} else if(subject){
													subjectText = subject.plainText;
												}
												if(subjectText && ((tileActive && dateAndTimeShowInState.indexOf("showSubjectIfActive") > -1) || (!tileActive && dateAndTimeShowInState.indexOf("showSubjectIfInactive") > -1))) resultTextParts.push(subjectText);
											}
											resultText = resultTextParts.join(' - ');
											resultText = addTimestamp(resultText, [state, ringing, subject], [_linkedStateId, _linkedRingingId, _linkedSubjectId], _device, tileActive);
											if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value') !== resultText){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value', resultText);
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").html(resultText);
											}
											if(ringing && typeof ringing.val !== udef && ringing.val){ //Ringing
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.ringing").addClass("active");
											} else {
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.ringing").removeClass("active");
											}
											viewShuffleFilterHideDeviceIfInactive();
											stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState"));
										};
										if(_linkedStateId) viewUpdateFunctions[_linkedStateId].push(updateFunction);
										if(_linkedSubjectId) viewUpdateFunctions[_linkedSubjectId].push(updateFunction);
										if(_linkedTimeId) viewUpdateFunctions[_linkedTimeId].push(updateFunction);
										if(_linkedRingingId) viewUpdateFunctions[_linkedRingingId].push(updateFunction);
										if(_linkedTileActiveStateId) viewUpdateFunctions[_linkedTileActiveStateId].push(updateFunction);
										if(!_linkedStateId && !_linkedRingingId && !_linkedTileActiveStateId && getDeviceOptionValue(_device, "tileActiveCondition")) viewUpdateFunctions["UPDATE_ONCE"].push(updateFunction);
									})(); //<--End Closure
								}
								break;

								case "iQontrolMedia":
								if(deviceLinkedStateIds["STATE"] || deviceLinkedStateIds["POWER_SWITCH"] || deviceLinkedStateIds["ARTIST"] || deviceLinkedStateIds["ALBUM"] || deviceLinkedStateIds["TITLE"] || deviceLinkedStateIds["SEASON"] || deviceLinkedStateIds["EPISODE"] || deviceLinkedStateIds["PLAYLIST"] || deviceLinkedStateIds["SOURCE"] || deviceLinkedStateIds["COVER_URL"] || deviceLinkedStateIds["tileActiveStateId"] || getDeviceOptionValue(device, "tileActiveCondition")){
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _device = device;
										var _deviceIdEscaped = deviceIdEscaped;
										var _linkedStateId = deviceLinkedStateIds["STATE"];
										var _linkedPowerSwitchId = deviceLinkedStateIds["POWER_SWITCH"];
										var _linkedArtistId = deviceLinkedStateIds["ARTIST"];
										var _linkedAlbumId = deviceLinkedStateIds["ALBUM"];
										var _linkedTitleId = deviceLinkedStateIds["TITLE"];
										var _linkedSeasonId = deviceLinkedStateIds["SEASON"];
										var _linkedEpisodeId = deviceLinkedStateIds["EPISODE"];
										var _linkedPlaylistId = deviceLinkedStateIds["PLAYLIST"];
										var _linkedSourceId = deviceLinkedStateIds["SOURCE"];
										var _linkedCoverUrlId = deviceLinkedStateIds["COVER_URL"];
										var _linkedTileActiveStateId = deviceLinkedStateIds["tileActiveStateId"];
										var updateFunction = function(sourceId){
											var state = getStateObject(_linkedStateId);
											var statePlayValue = getDeviceOptionValue(_device, "statePlayValue") || "play";
											var statePauseValue = getDeviceOptionValue(_device, "statePauseValue") || "pause";
											var stateStopValue = getDeviceOptionValue(_device, "stateStopValue") || "stop";
											var coverImageReloadDelay = 50 + (parseInt(getDeviceOptionValue(_device, "coverImageReloadDelay") || "0") || 0);
											var coverImageNoReloadOnTitleChange = (getDeviceOptionValue(_device, "coverImageNoReloadOnTitleChange") == "true");
											var statePowerSwitch = getStateObject(_linkedPowerSwitchId);
											var artist = getStateObject(_linkedArtistId);
											var album = getStateObject(_linkedAlbumId);
											var title = getStateObject(_linkedTitleId);
											var season = getStateObject(_linkedSeasonId);
											var episode = getStateObject(_linkedEpisodeId);
											var playlist = getStateObject(_linkedPlaylistId);
											var source = getStateObject(_linkedSourceId);
											var coverUrl = getStateObject(_linkedCoverUrlId);
											var tileActiveStateId = getStateObject(_linkedTileActiveStateId);
											var result;
											var resultText;
											var tileActiveStandard = false;
											if(state && typeof state.val !== udef) result = state.val;
											if(state && typeof state.val !== udef && ((typeof state.val == "boolean" && state.val) || state.val == statePlayValue)){ //Play
												tileActiveStandard = true;
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.play").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.pause").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.stop").removeClass("active");
											} else if(state && typeof state.val !== udef && ((typeof state.val == "boolean" && !state.val) || state.val == statePauseValue)){ //Pause
												if(statePowerSwitch && typeof statePowerSwitch.val !== udef && statePowerSwitch.val) { //Power on
													tileActiveStandard = true;
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").addClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
												} else { //Power off
													tileActiveStandard = false;
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").addClass("active");
												}
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.play").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.pause").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.stop").removeClass("active");
											} else if(state && typeof state.val !== udef && state.val == stateStopValue){ //Stop
												if(statePowerSwitch && typeof statePowerSwitch.val !== udef && statePowerSwitch.val) { //Power on
													tileActiveStandard = true;
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").addClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
												} else { //Power off
													tileActiveStandard = false;
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").addClass("active");
												}
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.play").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.pause").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.stop").addClass("active");
											} else { //Undefined
												if(statePowerSwitch && typeof statePowerSwitch.val !== udef && statePowerSwitch.val) { //Power on
													tileActiveStandard = true;
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").addClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
												} else { //Power off
													tileActiveStandard = false;
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
													$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").addClass("active");
												}
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.play").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.pause").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.stop").removeClass("active");
											}
											var tileActiveCondition = getDeviceOptionValue(_device, "tileActiveCondition");
											var tileActiveConditionValue = getDeviceOptionValue(_device, "tileActiveConditionValue");
											var tileActiveValue = result;
											if(tileActiveStateId && typeof tileActiveStateId.val != udef){
												tileActiveValue = tileActiveStateId.val;
											}
											var tileActive = checkCondition(tileActiveValue, tileActiveCondition, tileActiveConditionValue);
											if(tileActive == null) tileActive = tileActiveStandard;
											if(tileActive){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").addClass("active");
											} else {
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").removeClass("active");
											}
											var resultTextParts = [];
											if(artist && typeof artist.plainText !== udef && artist.plainText !== null && artist.plainText !== "") resultTextParts.push("<b>" + artist.plainText + "</b>");
											if(album && typeof album.plainText !== udef && album.plainText !== null && album.plainText !== "") resultTextParts.push(album.plainText);
											if(title && typeof title.plainText !== udef && title.plainText !== null && title.plainText !== "") resultTextParts.push("<i>" + title.plainText + "</i>");
											if(season && typeof season.plainText !== udef && season.plainText !== null && season.plainText !== "") resultTextParts.push(season.plainText);
											if(episode && typeof episode.plainText !== udef && episode.plainText !== null && episode.plainText !== "") resultTextParts.push(episode.plainText	);
											resultText = resultTextParts.join(" - ");
											if(resultText == "") {
												if(playlist && typeof playlist.plainText !== udef && playlist.plainText !== null && playlist.plainText !== "") {
													resultText = playlist.plainText;
												} else if(source && typeof source.plainText !== udef && source.plainText !== null && source.plainText !== "") {
													resultText = source.plainText;
												}
											}
											resultText = addTimestamp(resultText, [state], [_linkedStateId], _device, tileActive);
											if($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value') !== resultText){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value', resultText);
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").html(resultText);
											}
											viewShuffleFilterHideDeviceIfInactive();
											stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState"));
											//Special: Also update viewUpdate-Functions with _linkedCoverUrlId datapoint (to update icons and background images that are updated via variable)
											if(typeof viewUpdateFunctions[_linkedCoverUrlId] != udef && !(coverImageNoReloadOnTitleChange && sourceId == _linkedTitleId)) viewUpdateFunctions[_linkedCoverUrlId].forEach(function(viewUpdateFunction){
												setTimeout(function(){ viewUpdateFunction(_linkedCoverUrlId, "forceReloadOfImage"); }, coverImageReloadDelay);
											});
											//Special: Also update icons and background-images, that contain the coverUrl and that are _not_ updated via variable
											if(coverUrl && typeof coverUrl.plainText !== udef && coverUrl.plainText !== null && coverUrl.plainText !== ""){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon:not([data-variablesrc])").each(function(){
													if($(this).attr('src').indexOf(coverUrl.plainText) == 0){
														console.log("Force reload of media player icon");
														var newSrc = coverUrl.plainText + "?forceReload = " + Math.floor(new Date().getTime() / 100);
														$(this).attr('src', newSrc);
													}
												});
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceBackgroundImage:not([data-variablebackgroundimage])").each(function(){
													if($(this).css('background-image').indexOf("url:(" + coverUrl.plainText) == 0){
														console.log("Force reload of media player background image");
														var newSrc = "url:(" + coverUrl.plainText + "?forceReload = " + Math.floor(new Date().getTime() / 100) + ")";
														$(this).css('background-image', newSrc);
													}
												});
											}
										};
										if(_linkedStateId) viewUpdateFunctions[_linkedStateId].push(updateFunction);
										if(_linkedPowerSwitchId) viewUpdateFunctions[_linkedPowerSwitchId].push(updateFunction);
										if(_linkedArtistId) viewUpdateFunctions[_linkedArtistId].push(updateFunction);
										if(_linkedAlbumId) viewUpdateFunctions[_linkedAlbumId].push(updateFunction);
										if(_linkedTitleId) viewUpdateFunctions[_linkedTitleId].push(updateFunction);
										if(_linkedSeasonId) viewUpdateFunctions[_linkedSeasonId].push(updateFunction);
										if(_linkedEpisodeId) viewUpdateFunctions[_linkedEpisodeId].push(updateFunction);
										if(_linkedTileActiveStateId) viewUpdateFunctions[_linkedTileActiveStateId].push(updateFunction);
										if(!_linkedStateId && !_linkedTileActiveStateId && getDeviceOptionValue(_device, "tileActiveCondition")) viewUpdateFunctions["UPDATE_ONCE"].push(updateFunction);
									})(); //<--End Closure
								}
								break;

								default:
								if(deviceLinkedStateIds["STATE"] || deviceLinkedStateIds["LEVEL"] || deviceLinkedStateIds["POWER"] || deviceLinkedStateIds["tileActiveStateId"] || getDeviceOptionValue(device, "tileActiveCondition")){
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _device = device;
										var _deviceIdEscaped = deviceIdEscaped;
										var _linkedStateId = deviceLinkedStateIds["STATE"];
										var _linkedLevelId = deviceLinkedStateIds["LEVEL"];
										var _linkedPowerId = deviceLinkedStateIds["POWER"];
										var _linkedTileActiveStateId = deviceLinkedStateIds["tileActiveStateId"];
										var updateFunction = function(){
											var state = getStateObject(_linkedStateId);
											var level = getStateObject(_linkedLevelId);
											var power = getStateObject(_linkedPowerId);
											var tileActiveStateId = getStateObject(_linkedTileActiveStateId);
											var showStateAndLevelSeparatelyInTile = getDeviceOptionValue(_device, "showStateAndLevelSeparatelyInTile") || "";
											var showPowerAsState = (getDeviceOptionValue(_device, "showPowerAsState") == "true");
											var result;
											var resultText;
											if(!level || typeof level == udef || typeof level.val == udef){
												if(state && typeof state.plainText == 'number'){							//STATE = number (= level); LEVEL = nothing
													result = state.val;
													resultText = result + state.unit;
												} else if(state){ 															//STATE = bool or text; LEVEL = nothing
													result = state.val;
													resultText = state.plainText;
												}
											} else if(level && level.type == 'valueList'){
												if(state && typeof state.val !== udef && typeof state.val !== 'string'){ 	//STATE = bool (or level - but that makes no sense); LEVEL = value-list
													if(state.val) {
														result = level.val;
														resultText = level.plainText;
													} else {
														result = state.val;
														resultText = state.plainText;
													}
												} else if(level) {															//STATE = undefined (or string - but that makes no sense); LEVEL = value-list
													result = level.val;
													resultText = level.plainText;
												}
											} else {
												if(state && typeof state.val !== udef && typeof state.val !== 'string'){ 	//STATE = bool (or level - but that makes no sense); LEVEL = level
													result = state.val * level.val;
													resultText = result + level.unit;
												} else if(level) {															//STATE = undefined (or string - but that makes no sense); LEVEL = level
													result = level.val;
													resultText = result + level.unit;
												}
											}
											if(showPowerAsState && power && power.type){ 
												state = power;
												var val = state.plainText;
												var unit = state.unit;
												if(state.plainText == state.val) val = val + unit;
												resultText = val;
											}												
											if(showStateAndLevelSeparatelyInTile.indexOf('devidedBy') != -1){
												resultText = "";
												if(state && typeof state != udef && state.val != udef){
													var val = state.plainText;
													var unit = state.unit;
													if(state.plainText == state.val) val = val + unit;
													if(showStateAndLevelSeparatelyInTile.indexOf('preceedCaptions') != -1){
														var type = getDeviceOptionValue(_device, "stateCaption");
														if(!type) switch(state.type){
															case "switch": type = "Switch"; break;
															case "button": type = "Button"; break;
															case "level": type = "Level"; break;
															case "valueList": type = "Selection"; break;
															case "string": type = "Text"; break;
															case "time": type = "Time"; break;
															default: type = "State"; break;
														}
														resultText += _(type) + ":&nbsp;";
													}
													resultText += val;
												}
												if(level && typeof level != udef && level.val != udef){
													var val = level.plainText;
													var unit = level.unit;
													if(level.plainText == level.val) val = val + unit;
													if(resultText != ""){
														if(showStateAndLevelSeparatelyInTile.indexOf('devidedByComma') != -1) resultText += ", ";
														else if(showStateAndLevelSeparatelyInTile.indexOf('devidedBySemicolon') != -1) resultText += "; ";
														else if(showStateAndLevelSeparatelyInTile.indexOf('devidedByHyphen') != -1) resultText += "&nbsp;- ";
													}
													if(showStateAndLevelSeparatelyInTile.indexOf('preceedCaptions') != -1){
														var type = getDeviceOptionValue(_device, "levelCaption");
														if(!type) switch(level.type){
															case "switch": type = "Switch"; break;
															case "button": type = "Button"; break;
															case "level": type = "Level"; break;
															case "valueList": type = "Selection"; break;
															case "string": type = "Text"; break;
															case "time": type = "Time"; break;
															default: type = "State"; break;
														}
														resultText += _(type) + ":&nbsp;";
													}
													resultText += val;
												}
											}
											var tileActiveCondition = getDeviceOptionValue(_device, "tileActiveCondition");
											var tileActiveConditionValue = getDeviceOptionValue(_device, "tileActiveConditionValue");
											var tileActiveValue = result;
											if(tileActiveStateId && typeof tileActiveStateId.val != udef){
												tileActiveValue = tileActiveStateId.val;
											}
											var tileActive = checkCondition(tileActiveValue, tileActiveCondition, tileActiveConditionValue);
											if(tileActive == false || (tileActive == null && tileActiveValue == 0)) {
												tileActive = false;
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").removeClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").removeClass("active");
											} else {
												tileActive = true;
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevice").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDevicePressureIndicator").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.on").addClass("active");
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceIcon.off").removeClass("active");
											}
											if(resultText == "0%") resultText = _("off");
											resultText = unescape(resultText);
											resultText = addTimestamp(resultText, [state, level], [_linkedStateId, _linkedLevelId], _device, tileActive);
											if(typeof result !== udef && $("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value') !== resultText){
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").data('old-value', resultText);
												$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState").html(resultText);
											}
											viewShuffleFilterHideDeviceIfInactive();
											stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].iQontrolDeviceState"));
										};
										if(_linkedStateId) viewUpdateFunctions[_linkedStateId].push(updateFunction);
										if(_linkedLevelId) viewUpdateFunctions[_linkedLevelId].push(updateFunction);
										if(_linkedPowerId && (getDeviceOptionValue(_device, "showPowerAsState") == "true")) viewUpdateFunctions[_linkedPowerId].push(updateFunction);
										if(_linkedTileActiveStateId) viewUpdateFunctions[_linkedTileActiveStateId].push(updateFunction);
										if(!_linkedStateId && !_linkedLevelId && !_linkedTileActiveStateId && getDeviceOptionValue(_device, "tileActiveCondition")) viewUpdateFunctions["UPDATE_ONCE"].push(updateFunction);
									})(); //<--End Closure
								}
							}
						deviceContent += "</div>";
					if(device.commonRole == "iQontrolExternalLink" && deviceLinkedStateIds["URL"]) { //.iQontrolDeviceLink was an external link and therefore an <a>
						deviceContent += "</a>";
					} else { //.iQontrolDeviceLink was not an external link and therefore a <div>
						deviceContent += "</div>";
					}
				viewContent += deviceContent + "</div>";
			viewContent += "</div>";
		}
		viewContent += "</div>";
		//Place content
		var variablename = encodeURI(actualView.commonName.split('|').slice(1).join('|'));
		$("#ViewHeaderTitle").html("<div class='headerText'" + (variablename  ? " data-variablename='" + variablename + "' " : "") + ">" + actualView.commonName + "</div>");
		if(actualView.nativeHideName) $("#ViewHeaderTitle").hide(); else $("#ViewHeaderTitle").show();
		$("#ViewContent").html(viewContent);
		resizeDevicesToFitScreen();
		//Activate Shuffle
		if(!options.LayoutViewShuffleDisabled) {
			viewShuffleInstances = [];
			var viewShuffleContainers = document.querySelectorAll('.viewShuffleContainer');
			for(i = 0; i < viewShuffleContainers.length; i++){
				viewShuffleInstances[i] = new Shuffle(viewShuffleContainers[i], {
					itemSelector: '.viewShuffleTile',
					delimiter: ',',
					speed: 750,
					sizer: '.iQontrolDeviceShuffleSizer',
					isCentered: options.LayoutViewTilesCentered || false
				});
			};
			viewShuffleFilterHideDeviceIfInactive();
			viewShuffleApplyShuffleResizeObserver();
		}
		//scroll to device or heading if anchor present in viewId
		if(viewScrollToDeviceTimeout1) clearTimeout(viewScrollToDeviceTimeout1);
		if(viewScrollToDeviceTimeout2) clearTimeout(viewScrollToDeviceTimeout2);
		let scrollToDevice = viewId.split('#')[1];
		if(scrollToDevice){
			(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
				var _scrollToDeviceId = actualViewId + ".devices." + scrollToDevice
				viewScrollToDevice(_scrollToDeviceId);
				viewScrollToDeviceTimeout1 = setTimeout(function(){
					console.log("scrollToDevice (timeout 1): " + _scrollToDeviceId);
					viewScrollToDevice(_scrollToDeviceId);
				}, 1500);
				viewScrollToDeviceTimeout2 = setTimeout(function(){
					console.log("scrollToDevice (timeout 2): " + _scrollToDeviceId);
					viewScrollToDevice(_scrollToDeviceId);
				}, 3000);
			})(); //<--End Closure
		}
		//if isBackgroundView tell parent, that it has loaded (to make it visible)
		if(isBackgroundView) window.parent.postMessage({ command: "backgroundViewLoaded" , value: true}, "*");
		//Find variablesrc in images
		$("img[data-variablesrc]").each(function(){ // { and } are escaped by %7B and %7D, and | is escaped by %7C
			var that = $(this);
			var variableSrc = that.data('variablesrc');
			var a = variableSrc.indexOf('%7B'), b = variableSrc.lastIndexOf('%7D');
			if(a > -1 && a < b) {
				var variable = variableSrc.substring(a + 3, b).split('%7C'); //Text between { and }, split by |
				var linkedStateId = variable[0];
				linkedStateId = decodeURI(linkedStateId);
				var placeholder = null;
				if(variable.length > 1) placeholder = variable[1];
				(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
					var _that = that;
					var _variableSrc = variableSrc;
					var _a = a;
					var _b = b;
					var _linkedStateId = linkedStateId;
					var _placeholder = placeholder;
					var updateFunction = function(stateId, forceReloadOfImage){
						var state = getStateObject(_linkedStateId);
						var replacement = null;
						if(state && typeof state.val !== udef) {
							//Replace by value
							replacement = state.val;
						} else if(_placeholder) {
							//Replace by placeholder
							replacement = _placeholder;
						}
						if(replacement != null){
							var newSrc = _variableSrc.substring(_variableSrc.indexOf('?') + 1, _a) + replacement + _variableSrc.substring(_b + 3);
							if(newSrc && forceReloadOfImage){
								console.log("Force reload of image");
								if(newSrc.indexOf('?') == -1) {
									newSrc += "?forceReload = " + Math.floor(new Date().getTime() / 100);
								} else {
									newSrc += "&forceReload = " + Math.floor(new Date().getTime() / 100);
								}
							}
							if($(_that).attr('src') != newSrc){
								console.log("Set new variable image: " + newSrc);
								if($(_that).attr('src').substring(0, 5).toLowerCase() !== "data:") $(_that).fadeTo(0,0);
								setTimeout(function(){
									$(_that).attr('src', newSrc).on('load', function(){
										if($(_that).hasClass('active')) $(_that).fadeTo(0,1); else $(_that).css('opacity', '');
									});
								}, 250);
							}
						}
					};
					if(!viewUpdateFunctions[_linkedStateId]) viewUpdateFunctions[_linkedStateId] = [];
					viewUpdateFunctions[_linkedStateId].push(updateFunction);
				})(); //<--End Closure
				viewLinkedStateIdsToFetchAndUpdate.push(linkedStateId);
			}
		});
		//Find variablebackgroundimage in Divs
		$("div[data-variablebackgroundimage]").each(function(){ // { and } are escaped by %7B and %7D, and | is escaped by %7C
			var that = $(this);
			var variablebackgroundimage = that.data('variablebackgroundimage');
			var a = variablebackgroundimage.indexOf('%7B'), b = variablebackgroundimage.lastIndexOf('%7D');
			if(a > -1 && a < b) {
				var variable = variablebackgroundimage.substring(a + 3, b).split('%7C'); //Text between { and }, split by |
				var linkedStateId = variable[0];
				linkedStateId = decodeURI(linkedStateId);
				var placeholder = null;
				if(variable.length > 1) placeholder = variable[1];
				(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
					var _that = that;
					var _variablebackgroundimage = variablebackgroundimage;
					var _a = a;
					var _b = b;
					var _linkedStateId = linkedStateId;
					var _placeholder = placeholder;
					var updateFunction = function(stateId, forceReloadOfImage){
						var state = getStateObject(_linkedStateId);
						var replacement = null;
						if(state && typeof state.val !== udef) {
							//Replace by value
							replacement = state.val;
						} else if(_placeholder) {
							//Replace by placeholder
							replacement = _placeholder;
						}
						if(replacement != null){
							var newSrc = _variablebackgroundimage.substring(_variablebackgroundimage.indexOf('?') + 1, _a) + replacement + _variablebackgroundimage.substring(_b + 3);
							if(newSrc && forceReloadOfImage){
								console.log("Force reload of image");
								if(newSrc.indexOf('?') == -1) {
									newSrc += "?forceReload = " + Math.floor(new Date().getTime() / 100);
								} else {
									newSrc += "&forceReload = " + Math.floor(new Date().getTime() / 100);
								}
							}
							var newBackgroundimage = "url(\"" + newSrc + "\")";
							if($(_that).css('background-image') != newBackgroundimage){
								console.log("Set new variable Background-image: " + newBackgroundimage);
								var $newBackgroundimageFile = $(new Image());
								$newBackgroundimageFile.on('load', function(){ //Preloading the image
									var oldCssTransition = null;
									if(newSrc.substring(0, 5).toLowerCase() == "data:"){ //Bugfix for transition in background-size for SVGs
										oldCssTransition = $(_that).css('transition');
										$(_that).css('transition', 'background-size 0s');
									}
									$(_that).css('background-image', "url(\"" + $newBackgroundimageFile.attr('src') + "\")");
									if(oldCssTransition !== null) setTimeout(function(){ $(_that).css('transition', oldCssTransition); }, 10);
								}).attr('src', newSrc);
							}
						}
					};
					if(!viewUpdateFunctions[_linkedStateId]) viewUpdateFunctions[_linkedStateId] = [];
					viewUpdateFunctions[_linkedStateId].push(updateFunction);
				})(); //<--End Closure
				viewLinkedStateIdsToFetchAndUpdate.push(linkedStateId);
			}
		});
		//Find variablename in Divs
		$("div[data-variablename]").each(function(){ // { and } are escaped by %7B and %7D, and | is escaped by %7C
			var that = $(this);
			var variablename = that.data('variablename');
			var a = variablename.indexOf('%7B'), b = variablename.lastIndexOf('%7D');
			if(a > -1 && a < b) {
				var variable = variablename.substring(a + 3, b).split('%7C'); //Text between { and }, split by |
				var linkedStateId = variable[0];
				var noUnit = false;
				if(linkedStateId.substr(0, 3) == "%5B" && linkedStateId.substr(-3) == "%5D"){ // [ and ] are escaped by %5B and %5D
					linkedStateId = linkedStateId.substring(3, linkedStateId.length - 3);
					noUnit = true;
				}
				linkedStateId = decodeURI(linkedStateId);
				var placeholder = null;
				if(variable.length > 1) placeholder = variable[1];
				(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
					var _that = that;
					var _variablename = variablename;
					var _noUnit = noUnit;
					var _a = a;
					var _b = b;
					var _linkedStateId = linkedStateId;
					var _placeholder = placeholder;
					var updateFunction = function(){
						var state = getStateObject(_linkedStateId);
						var replacement = null;
						//Replace by value
						if(state && typeof state.val !== udef) {
							if(typeof state.plainText == 'number' && !_noUnit){			//STATE = number
								replacement = state.val + state.unit;
							} else {														//STATE = bool or text
								replacement = state.plainText;
							}
						} else if(_placeholder) {
							//Replace by placeholder
							replacement = _placeholder;
						}
						if(replacement != null){
							var newName = decodeURI(_variablename.substring(_variablename.indexOf('?') + 1, _a) + replacement + _variablename.substring(_b + 3));
							if($(_that).html() != newName){
								console.log("Set new Name: " + newName);
								$(_that).html(newName);
							}
						}
					};
					if(!viewUpdateFunctions[_linkedStateId]) viewUpdateFunctions[_linkedStateId] = [];
					viewUpdateFunctions[_linkedStateId].push(updateFunction);
				})(); //<--End Closure
				viewLinkedStateIdsToFetchAndUpdate.push(linkedStateId);
			}
		});
		//Fetch and update States
		viewLinkedStateIdsToFetchAndUpdate = removeDuplicates(viewLinkedStateIdsToFetchAndUpdate);
		fetchStates(viewLinkedStateIdsToFetchAndUpdate, function(){
			for (var i = 0; i < viewLinkedStateIdsToFetchAndUpdate.length; i++){
				if(typeof fetchedObjects[viewLinkedStateIdsToFetchAndUpdate[i]] == udef) {
					fetchObject(viewLinkedStateIdsToFetchAndUpdate[i], function(){
						updateState(viewLinkedStateIdsToFetchAndUpdate[i], "ignorePreventUpdateForView");
					});
				} else {
					updateState(viewLinkedStateIdsToFetchAndUpdate[i], "ignorePreventUpdateForView");
				}
			}
			viewLinkedStateIdsToFetchAndUpdate = [];
			applyViewAdaptHeightOrMarqueeObserver();
			applyViewDeviceContextMenu();
			dynamicIframeZoom();
			//Show ViewSwipeGoals
			if(!options.LayoutViewHideSwipeGoals && !options.LayoutViewSwipingDisabled && viewHistoryPosition > 0 && getView(viewHistory[viewHistoryPosition - 1]) && getView(viewHistory[viewHistoryPosition - 1]).commonName){
				$("#ViewSwipeGoalLeft").html(getView(viewHistory[viewHistoryPosition - 1]).commonName);
				$(".viewSwipeGoal.left").css('visibility', 'visible');
			} else {
				$(".viewSwipeGoal.left").css('visibility', 'hidden');
			}
			if(!options.LayoutViewHideSwipeGoals && !options.LayoutViewSwipingDisabled && viewHistoryPosition < viewHistory.length - 1 && getView(viewHistory[viewHistoryPosition + 1]) && getView(viewHistory[viewHistoryPosition + 1]).commonName){
				$("#ViewSwipeGoalRight").html(getView(viewHistory[viewHistoryPosition + 1]).commonName);
				$(".viewSwipeGoal.right").css('visibility', 'visible');
			} else {
				$(".viewSwipeGoal.right").css('visibility', 'hidden');
			}
			setTimeout(function(){ if($('#Toolbar').hasClass('ui-fixed-hidden')) $('#Toolbar').toolbar('show'); }, 200);
			//Open Dialog by URL-Parameter
			if(openDialogId != null){
				renderDialog(openDialogId);
				setTimeout(function(){$("#Dialog").popup("open", {transition: "pop", positionTo: "window"});}, 250);
				openDialogId = null;
			}
		});
		//Start timer that updates timestamps with elapsed time
		if(viewTimestampElapsedTimer){
			clearInterval(viewTimestampElapsedTimer);
			viewTimestampElapsedTimer = false;
		}
		viewTimestampElapsedTimer = setInterval(function(){
			console.log("viewTimestampElapsedTimer for " + viewTimestampElapsedTimerStates.length + " states");
			viewTimestampElapsedTimerStates.forEach(function(state){
				updateState(state);
			})
		}, 60000);
		//Call UPDATE_ONCE Functions
		viewUpdateFunctions["UPDATE_ONCE"].forEach(function(viewUpdateFunction){
			viewUpdateFunction();
		});
		//Enhance iQontrolSubheadingCollapsibles
		var iQontrolSubheaderCollapsibleDblclickTimeout = false;
		$('.iQontrolSubheaderCollapsible').on('click', function(){
			var dblclick = false;
			if(iQontrolSubheaderCollapsibleDblclickTimeout)	dblclick = true;
			iQontrolSubheaderCollapsibleDblclickTimeout = setTimeout(function(){ iQontrolSubheaderCollapsibleDblclickTimeout = false; }, 400);
			var collapsibleDeviceIdEscaped = $(this).data('iqontrolDeviceId');
			var $openThese;
			var $closeThese;
			if($(this).hasClass('collapsibleClosed')){
				$closeThese = $(".iQontrolSubheaderCollapsible.collapsibleClosesWhenOthersOpen").not(".collapsibleClosed").not(this);
				if(dblclick && $closeThese.length == 0) {
					$openThese = $(".iQontrolSubheaderCollapsible");
				} else {
					$openThese = $(this);
				}
			} else {
				if(!dblclick) $closeThese = $(this);
			}
			if($openThese) $openThese.removeClass('collapsibleClosed').each(function(){
				$("[data-iQontrol-Device-ID='" + $(this).data('iqontrolDeviceId') + "'].viewShuffleContainer").removeClass('collapsibleClosed');
				iQontrolSubheadingCollapsiblesRefresh($(this));
			});
			if($closeThese) $closeThese.addClass('collapsibleClosed').each(function(){
				$("[data-iQontrol-Device-ID='" + $(this).data('iqontrolDeviceId') + "'].viewShuffleContainer").addClass('collapsibleClosed');
				iQontrolSubheadingCollapsiblesRefresh($(this));
			});
		});
		$('.iQontrolSubheaderCollapsible').each(function(){
			iQontrolSubheadingCollapsiblesRefresh($(this));
		});
		function iQontrolSubheadingCollapsiblesRefresh($collapsible){
			var collapsibleDeviceIdEscaped = $collapsible.data('iqontrolDeviceId')	;
			if($collapsible.hasClass('collapsibleClosed')){
				if(!$("[data-iQontrol-Device-ID='" + collapsibleDeviceIdEscaped + "'].viewShuffleContainer").hasClass('collapsibleContentClosed')){
					(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
						var _$collapsible = $collapsible;
						var _collapsibleDeviceIdEscaped = collapsibleDeviceIdEscaped;
						clearTimeout(_$collapsible.data('animationtimeout'));
						clearTimeout(_$collapsible.data('resizetimeout'));
						if(!options.LayoutViewShuffleDisabled) viewShuffleInstances.forEach(function(shuffleInstance, i){ shuffleInstance.disable(); });
						$("[data-iQontrol-Device-ID='" + _collapsibleDeviceIdEscaped + "'].viewShuffleContainer").addClass('collapsibleAnimationRunning').stop(true, false).animate({'height': '0px'}, 250, 'linear');
						var animationTimeoutId = setTimeout(function(){
							$("[data-iQontrol-Device-ID='" + _collapsibleDeviceIdEscaped + "'].viewShuffleContainer").addClass('collapsibleContentClosed');
							viewShuffleReshuffle();
							var resizeTimeoutId = setTimeout(resizeDevicesToFitScreen, 1750);
							_$collapsible.data('resizetimeout', resizeTimeoutId);
						}, 750);
						_$collapsible.data('animationtimeout', animationTimeoutId);
					})(); //<--End Closure
				}
			} else {
				(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
					var _$collapsible = $collapsible;
					var _collapsibleDeviceIdEscaped = collapsibleDeviceIdEscaped;
					clearTimeout(_$collapsible.data('animationtimeout'));
					clearTimeout(_$collapsible.data('resizetimeout'));
					$("[data-iQontrol-Device-ID='" + _collapsibleDeviceIdEscaped + "'].viewShuffleContainer").addClass('collapsibleAnimationRunning').stop(true, false).removeClass('collapsibleContentClosed'); 
					$("[data-iQontrol-Device-ID='" + _collapsibleDeviceIdEscaped + "'].viewShuffleContainer .viewShuffleTile").stop(true, false).slideDown(500);
					viewShuffleReshuffle();
					var resizeTimeoutId = setTimeout(resizeDevicesToFitScreen, 1750);
					_$collapsible.data('resizetimeout', resizeTimeoutId);
					var animationTimeoutId = setTimeout(function(){
						$("[data-iQontrol-Device-ID='" + _collapsibleDeviceIdEscaped + "'].viewShuffleContainer").removeClass('collapsibleAnimationRunning');
					}, 1000);
					_$collapsible.data('animationtimeout', animationTimeoutId);
				})(); //<--End Closure
			}			
		}
		//Start viewInfoSliderInterval
		viewInfoSliderInterval = setInterval(function(){
			for (sliderDeviceIdEscaped in viewInfoASliderIndex){
				if(viewInfoASliderLength[sliderDeviceIdEscaped] < 2) continue;
				var i = 0;
				do {
					i++;
					viewInfoASliderIndex[sliderDeviceIdEscaped] = (viewInfoASliderIndex[sliderDeviceIdEscaped] + 1) % viewInfoASliderLength[sliderDeviceIdEscaped];
				} while (i < viewInfoASliderLength[sliderDeviceIdEscaped] && $("[data-iQontrol-Device-ID='" + sliderDeviceIdEscaped + "'][data-slider-index='" + viewInfoASliderIndex[sliderDeviceIdEscaped] + "'].iQontrolDeviceInfoAIcon").css('display') == 'none' && $("[data-iQontrol-Device-ID='" + sliderDeviceIdEscaped + "'][data-slider-index='" + viewInfoASliderIndex[sliderDeviceIdEscaped] + "'].iQontrolDeviceInfoAText").html() == '')
				var sliderIndex = viewInfoASliderIndex[sliderDeviceIdEscaped];
				console.log("InfoASlider " + sliderDeviceIdEscaped + ": " + sliderIndex);
				$("[data-iQontrol-Device-ID='" + sliderDeviceIdEscaped + "'][data-slider-index='" + sliderIndex + "'].iQontrolDeviceInfoAIcon").css('opacity', '1');
				$("[data-iQontrol-Device-ID='" + sliderDeviceIdEscaped + "'][data-slider-index='" + sliderIndex + "'].iQontrolDeviceInfoAText").css('opacity', '1');
				$("[data-iQontrol-Device-ID='" + sliderDeviceIdEscaped + "'][data-slider-index!='" + sliderIndex + "'].iQontrolDeviceInfoAIcon").css('opacity', '0');
				$("[data-iQontrol-Device-ID='" + sliderDeviceIdEscaped + "'][data-slider-index!='" + sliderIndex + "'].iQontrolDeviceInfoAText").css('opacity', '0');
			}
			for (sliderDeviceIdEscaped in viewInfoBSliderIndex){
				if(viewInfoBSliderLength[sliderDeviceIdEscaped] < 2) continue;
				var i = 0;
				do {
					i++;
					viewInfoBSliderIndex[sliderDeviceIdEscaped] = (viewInfoBSliderIndex[sliderDeviceIdEscaped] + 1) % viewInfoBSliderLength[sliderDeviceIdEscaped];
				} while (i < viewInfoBSliderLength[sliderDeviceIdEscaped] && $("[data-iQontrol-Device-ID='" + sliderDeviceIdEscaped + "'][data-slider-index='" + viewInfoBSliderIndex[sliderDeviceIdEscaped] + "'].iQontrolDeviceInfoBIcon").css('display') == 'none' && $("[data-iQontrol-Device-ID='" + sliderDeviceIdEscaped + "'][data-slider-index='" + viewInfoBSliderIndex[sliderDeviceIdEscaped] + "'].iQontrolDeviceInfoBText").html() == '')
				var sliderIndex = viewInfoBSliderIndex[sliderDeviceIdEscaped];
				console.log("InfoBSlider " + sliderDeviceIdEscaped + ": " + sliderIndex);
				$("[data-iQontrol-Device-ID='" + sliderDeviceIdEscaped + "'][data-slider-index='" + sliderIndex + "'].iQontrolDeviceInfoBIcon").css('opacity', '1');
				$("[data-iQontrol-Device-ID='" + sliderDeviceIdEscaped + "'][data-slider-index='" + sliderIndex + "'].iQontrolDeviceInfoBText").css('opacity', '1');
				$("[data-iQontrol-Device-ID='" + sliderDeviceIdEscaped + "'][data-slider-index!='" + sliderIndex + "'].iQontrolDeviceInfoBIcon").css('opacity', '0');
				$("[data-iQontrol-Device-ID='" + sliderDeviceIdEscaped + "'][data-slider-index!='" + sliderIndex + "'].iQontrolDeviceInfoBText").css('opacity', '0');
			}
		}, 5000);
	});
}

function viewShuffleFilterHideDeviceIfInactive(){
	viewShuffleInstances.forEach(function(shuffleInstance, i){
		shuffleInstance.filter(function(shuffleElement){
			return !(
				($(shuffleElement).hasClass('hideDeviceIfInactive') && !$(shuffleElement).hasClass('active'))
				|| ($(shuffleElement).hasClass('hideDeviceIfActive') && $(shuffleElement).hasClass('active'))
				|| $(shuffleElement).hasClass('hideDevice')
			);
		});
	});
	//Hide subheadings, if no tile is visible
	$('#ViewContent h4').each(function(){ 
		if($(this).nextAll('.viewShuffleContainer').find('.shuffle-item').hasClass('shuffle-item--visible')) $(this).show(500); else $(this).hide(500); 
	});
}

function viewShuffleApplyShuffleResizeObserver(){
	console.log("Starting shuffle resize observer");
	var viewShuffleApplyShuffleResizeObserverTimeout1 = false;
	var viewShuffleApplyShuffleResizeObserverTimeout2 = false;
	if(viewShuffleResizeObserver){
		viewShuffleResizeObserver.disconnect();
	} else {
		viewShuffleResizeObserver = new MutationObserver(function(mutationList){
			mutationList.forEach(function(mutation){
				if(mutation.attributeName === 'class'){
					var oldClasses = mutation.oldValue.split(' ');
					var newClasses = mutation.target.className.split(' ');
					var added = newClasses.filter(function(x){ return oldClasses.indexOf(x) == -1;});
					var removed = oldClasses.filter(function(x){ return newClasses.indexOf(x) == -1;});
					var changed = added.concat(removed);
					var oldAndNew = oldClasses.concat(newClasses);
					if(
						(changed.indexOf('narrow') != -1 || changed.indexOf('wide') != -1 || changed.indexOf('xwide') != -1 || changed.indexOf('fullWidth') != -1 || changed.indexOf('short') != -1 || changed.indexOf('high') != -1 || changed.indexOf('xhigh') != -1 || changed.indexOf('fullHeight') != -1)
						|| (changed.indexOf('active') != -1 && (oldAndNew.indexOf('narrowIfInactive') != -1 || oldAndNew.indexOf('wideIfInactive') != -1 || oldAndNew.indexOf('xwideIfInactive') != -1 || oldAndNew.indexOf('fullWidthIfInactive') != -1 || oldAndNew.indexOf('shortIfInactive') != -1 || oldAndNew.indexOf('highIfInactive') != -1 || oldAndNew.indexOf('xhighIfInactive') != -1 || oldAndNew.indexOf('fullHeightIfInactive') != -1
																||  oldAndNew.indexOf('narrowIfActive') != -1 || oldAndNew.indexOf('wideIfActive') != -1 || oldAndNew.indexOf('xwideIfActive') != -1 || oldAndNew.indexOf('fullWidthIfActive') != -1 || oldAndNew.indexOf('shortIfActive') != -1 || oldAndNew.indexOf('highIfActive') != -1 || oldAndNew.indexOf('xhighIfActive') != -1 || oldAndNew.indexOf('fullHeightIfActive') != -1 ))
						|| (changed.indexOf('enlarged') != -1 && (oldAndNew.indexOf('narrowIfEnlarged') != -1 || oldAndNew.indexOf('wideIfEnlarged') != -1 || oldAndNew.indexOf('xwideIfEnlarged') != -1 || oldAndNew.indexOf('fullWidthIfEnlarged') != -1 || oldAndNew.indexOf('shortIfEnlarged') != -1 || oldAndNew.indexOf('highIfEnlarged') != -1 || oldAndNew.indexOf('xhighIfEnlarged') != -1 || oldAndNew.indexOf('fullHeightIfEnlarged') != -1 || oldAndNew.indexOf('normalIfEnlarged') != -1 ))
					){ //height or width changed
						console.log(changed);
						dynamicIframeZoom();
						stateFillsDeviceCheckForIconToFloat($(mutation.target).find('.iQontrolDeviceState'));
						//Disable Marquee and re-enable it after change-animation
						if(!options.LayoutViewMarqueeDisabled ){
							var deviceID = $(mutation.target).find('.iQontrolDeviceState').data('iqontrolDeviceId');
							var $marqueeObjects = $(mutation.target).find('.iQontrolDeviceState, .iQontrolDeviceInfoAText, .iQontrolDeviceInfoBText');
							if(viewShuffleApplyShuffleResizeObserverTimeoutsMarqueeDisabled[deviceID]) clearTimeout(viewShuffleApplyShuffleResizeObserverTimeoutsMarqueeDisabled[deviceID]);
							$marqueeObjects.data('marquee-disabled', 'true').marquee('destroy').attr('style', '');
							viewShuffleApplyShuffleResizeObserverTimeoutsMarqueeDisabled[deviceID] = setTimeout(function(){
								var _$marqueeObjects = $marqueeObjects;
								if(!options.LayoutViewMarqueeDisabled ){
									_$marqueeObjects.data('marquee-disabled', 'false');
									adaptHeightOrStartMarqueeOnOverflow(_$marqueeObjects);
								}
							}, 1500);
						}
						//Shuffle two times
						viewShuffleReshuffle([100, 1250]);
						if(
							added.indexOf('fullHeight') != -1
							|| (added.indexOf('active') != -1 && oldAndNew.indexOf('fullHeightIfActive') != -1)
							|| (removed.indexOf('active') != -1 && oldAndNew.indexOf('fullHeightIfInactive') != -1)
							|| (added.indexOf('enlarged') != -1 && oldAndNew.indexOf('fullHeightIfEnlarged') != -1)
						){ //fullHeight activated
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								console.log("fullHeight activated");
								addCustomCSS("#ViewContent { padding-bottom: 100vh; }", "addViewPaddingBottomAfterMinimizingTile");
								var _$target = $(mutation.target);
								var _targetDeviceId = _$target.parent('.iQontrolDevicePressureIndicator').data('iqontrolDeviceId');
								var _targetShuffleInstanceIndex = null;
								var _targetShuffleItemIndex = null;
								for(var i = 0; i < viewShuffleInstances.length; i++){
									for(var j = 0; j < viewShuffleInstances[i].items.length; j++){
										if(viewShuffleInstances[i].items[j].element.dataset.iqontrolDeviceId == _targetDeviceId){
											_targetShuffleInstanceIndex = i;
											_targetShuffleItemIndex = j;
											break;
										}
									}
									if(_targetShuffleInstanceIndex != null) break;
								}
								if(_targetShuffleInstanceIndex != null){
									console.log("fullHeight activated - deviceId: " + _targetDeviceId + " | Shuffle instance/item: " + _targetShuffleInstanceIndex + "/" + _targetShuffleItemIndex);
									if(viewShuffleApplyShuffleResizeObserverTimeout1) clearTimeout(viewShuffleApplyShuffleResizeObserverTimeout1);
									if(viewShuffleApplyShuffleResizeObserverTimeout2) clearTimeout(viewShuffleApplyShuffleResizeObserverTimeout2);
									viewShuffleApplyShuffleResizeObserverTimeout2 = setTimeout(function(){
										var scrollTop = $(viewShuffleInstances[_targetShuffleInstanceIndex].element).offset().top + (viewShuffleInstances[_targetShuffleInstanceIndex].items[_targetShuffleItemIndex].point.y * zoom) - 5;
										console.log("fullHeight activated - scroll to " + scrollTop);
										$('html,body').animate({
											scrollTop: scrollTop
										}, 1000);
									}, 1300);
									viewShuffleApplyShuffleResizeObserverTimeout1 = setTimeout(function(){
										resizeDevicesToFitScreen();
										removeCustomCSS("addViewPaddingBottomAfterMinimizingTile");
									}, 2300);
								}
							})(); //<--End Closure
						} else if(
							removed.indexOf('fullHeight') != -1
							|| (removed.indexOf('active') != -1 && oldAndNew.indexOf('fullHeightIfActive') != -1)
							|| (added.indexOf('active') != -1 && oldAndNew.indexOf('fullHeightIfInactive') != -1)
							|| (removed.indexOf('enlarged') != -1 && oldAndNew.indexOf('fullHeightIfEnlarged') != -1)
						){ //fullHeight deactivated
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								console.log("fullHeight deactivated");
								removeCustomCSS("addViewPaddingBottomAfterMinimizingTile");
								addCustomCSS("#ViewContent { padding-bottom: 90vh; padding-bottom: calc(100vh - 200px); }", "addViewPaddingBottomAfterMinimizingTile");
								var _$target = $(mutation.target);
								var _targetDeviceId = _$target.parent('.iQontrolDevicePressureIndicator').data('iqontrolDeviceId');
								var _targetShuffleInstanceIndex = null;
								var _targetShuffleItemIndex = null;
								for(var i = 0; i < viewShuffleInstances.length; i++){
									for(var j = 0; j < viewShuffleInstances[i].items.length; j++){
										if(viewShuffleInstances[i].items[j].element.dataset.iqontrolDeviceId == _targetDeviceId){
											_targetShuffleInstanceIndex = i;
											_targetShuffleItemIndex = j;
											break;
										}
									}
									if(_targetShuffleInstanceIndex != null) break;
								}
								if(_targetShuffleInstanceIndex != null){
									console.log("fullHeight deactivated - deviceId: " + _targetDeviceId + " | Shuffle instance/item: " + _targetShuffleInstanceIndex + "/" + _targetShuffleItemIndex);
									if(viewShuffleApplyShuffleResizeObserverTimeout1) clearTimeout(viewShuffleApplyShuffleResizeObserverTimeout1);
									if(viewShuffleApplyShuffleResizeObserverTimeout2) clearTimeout(viewShuffleApplyShuffleResizeObserverTimeout2);
									viewShuffleApplyShuffleResizeObserverTimeout1 = setTimeout(function(){
										var scrollTop = $(viewShuffleInstances[_targetShuffleInstanceIndex].element).offset().top + (viewShuffleInstances[_targetShuffleInstanceIndex].items[_targetShuffleItemIndex].point.y * zoom) - 5;
										console.log("fullHeight deactivated - scroll to " + scrollTop);
										$('html,body').animate({
											scrollTop: scrollTop
										}, 1000);
									}, 1300);
								}
							})(); //<--End Closure
						}
					}
				}
			});
		});
	}
	$('.iQontrolDevice').each(function(){
		viewShuffleResizeObserver.observe(this, {attributes: true, attributeOldValue: true, childList: false, subtree: false});
	});
}

function viewShuffleReshuffle(delays){
	console.log("viewShuffleReshuffle " + JSON.stringify(viewShuffleReshuffleTimeouts));
	if(options.LayoutViewShuffleDisabled) return;
	if(!Array.isArray(delays)) delays = [(delays || 0)];
	var delay = delays.shift();
	var now = new Date().getTime();
	var destinationTime = now + delay;
	var nearbyTimer = false;
	for(id in viewShuffleReshuffleTimeouts){
		var diff = viewShuffleReshuffleTimeouts[id].destinationTime - destinationTime;
		console.log("viewShuffleReshuffle: searching for nearby ReshuffleTimers - id: " + id + " - diff: " + diff);			
		if(diff >= 0 && diff < 500) {
			console.log("viewShuffleReshuffle: Found nearby ReshuffleTimer in future (id " + id + " - setting of the new timer is ignored");
			nearbyTimer = true;
		} else if(diff < 0 && diff > -500) {
			console.log("viewShuffleReshuffle: Found nearby ReshuffleTimer in past - deleting found timer id " + id);
			clearInterval(id);
			delete viewShuffleReshuffleTimeouts[id];
		}
	}	
	if(!nearbyTimer){
		(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
			var _id = setTimeout(function(){ 
				console.log("viewShuffleReshuffle: Shuffle! id: " + _id); 
				viewShuffleInstances.forEach(function(shuffleInstance, i){ 
					if(shuffleInstance.isEnabled) shuffleInstance.update(); else shuffleInstance.enable(); 
				}); 
				delete viewShuffleReshuffleTimeouts[_id]; 
			}, delay);
			viewShuffleReshuffleTimeouts[_id] = {destinationTime: destinationTime};
			console.log("viewShuffleReshuffle: set timer id " + _id + " to destinationTime " + destinationTime);
		})(); //<--End Closure
	}
	if(delays.length > 0) viewShuffleReshuffle(delays);
}

function addTimestamp(stateString, states, linkedStates, device, active){
	//console.log("Add timestamp to " + device.commonName + " with value " + stateString);
	var addTimestampToState = getDeviceOptionValue(device, "addTimestampToState");
	if(addTimestampToState == null || addTimestampToState == "" || addTimestampToState == "S") return stateString;
	if(addTimestampToState == "N") return "";
	if(addTimestampToState == "SA") {
		if(active) return stateString; else return "";
	}
	if(addTimestampToState.substr(-1) == "A" && !active) return stateString;
	var now = new Date();
	var lc = 0;
	var lcString = "";
	var elapsedString = "";
	var elapsedStringSince = "";
	var elapsedStringShort = "";
	var linkedStateIdToUpdateViewTimestampElapsedTimer;
	states.forEach(function(state, index){
		if(state && state.lc > lc) {
			lc = state.lc;
			linkedStateIdToUpdateViewTimestampElapsedTimer = linkedStates[index];
		}
	});
	if(lc > 0) {
		lc = new Date(lc + timeshift);
		if(now.getFullYear() != lc.getFullYear() || now.getMonth() != lc.getMonth() || now.getDate() != lc.getDate()){
			lcString = ('0' + lc.getDate()).slice(-2) + "." + ('0' + (lc.getMonth() + 1)).slice(-2) + "." + lc.getFullYear();
		} else {
			lcString = ('0' + lc.getHours()).slice(-2) + ":" + ('0' + lc.getMinutes()).slice(-2);
		}
		var difference = now - lc;
		if(difference < 1000 * 60) {
			//elapsedString = _("%s seconds ago", Math.floor(difference/1000));
			elapsedString = _("<1 minute ago");
			elapsedStringSince = _("since <1 minute");
			elapsedStringShort = _("<1 m");
		} else if(difference < 1000 * 60 * 60) {
			if(Math.floor(difference/(1000 * 60)) == 1) {
				elapsedString = _("1 minute ago");
				elapsedStringSince = _("since %s minute", 1);
			} else {
				elapsedString = _("%s minutes ago", Math.floor(difference/(1000 * 60)));
				elapsedStringSince = _("since %s minutes", Math.floor(difference/(1000 * 60)));
			}
			elapsedStringShort = _("%s m", Math.floor(difference/(1000 * 60)));
		} else if(difference < 1000 * 60 * 60 * 24) {
			if(Math.floor(difference/(1000 * 60 * 60)) == 1){
				elapsedString = _("1 hour ago");
				elapsedStringSince = _("since %s hour", 1);
			} else {
				elapsedString = _("%s hours ago", Math.floor(difference/(1000 * 60 * 60)));
				elapsedStringSince = _("since %s hours", Math.floor(difference/(1000 * 60 * 60)));
			}
			elapsedStringShort = _("%s h", Math.floor(difference/(1000 * 60 * 60)));
		} else {
			if(Math.floor(difference/(1000 * 60 * 60 * 24)) == 1){
				elapsedString = _("1 day ago");
				elapsedStringSince = _("since %s day", 1);
			} else {
				elapsedString = _("%s days ago", Math.floor(difference/(1000 * 60 * 60 * 24)));
				elapsedStringSince = _("since %s days", Math.floor(difference/(1000 * 60 * 60 * 24)));
			}
			elapsedStringShort = _("%s d", Math.floor(difference/(1000 * 60 * 60 * 24)));
		}
	}
	switch (addTimestampToState){
		case "ST": case "STA":
		stateString = stateString + " (" + lcString + ")";
		linkedStateIdToUpdateViewTimestampElapsedTimer = null;
		break;

		case "SE": case "SEA":
		stateString = stateString + " (" + elapsedString + ")";
		break;

		case "SE.": case "SE.A":
		stateString = stateString + " (" + elapsedStringSince + ")";
		break;

		case "Se": case "SeA":
		stateString = stateString + " (" + elapsedStringShort + ")";
		break;

		case "STE": case "STE":
		stateString = stateString + " (" + lcString + " - " + elapsedString + ")";
		break;

		case "STE.": case "STE.A":
		stateString = stateString + " (" + lcString + " - " + elapsedStringSince + ")";
		break;

		case "STe": case "STeA":
		stateString = stateString + " (" + lcString + " - " + elapsedStringShort + ")";
		break;

		case "T": case "TA":
		stateString = lcString;
		linkedStateIdToUpdateViewTimestampElapsedTimer = null;
		break;

		case "TE": case "TEA":
		stateString = lcString + " - " + elapsedString;
		break;

		case "TE.": case "TE.A":
		stateString = lcString + " - " + elapsedStringSince;
		break;

		case "Te": case "TeA":
		stateString = lcString + " - " + elapsedStringShort;
		break;

		case "E": case "EA":
		stateString = elapsedString;
		break;

		case "E.": case "E.A":
		stateString = elapsedStringSince;
		break;

		case "e": case "eA":
		stateString = elapsedStringShort;
		break;
	}
	if(linkedStateIdToUpdateViewTimestampElapsedTimer && viewTimestampElapsedTimerStates.indexOf(linkedStateIdToUpdateViewTimestampElapsedTimer) == -1){
		viewTimestampElapsedTimerStates.push(linkedStateIdToUpdateViewTimestampElapsedTimer);
	}
	return stateString;
}

function applyViewAdaptHeightOrMarqueeObserver(){
	console.log("Starting viewAdaptHeightOrMarqueeObserver");
	if(viewAdaptHeightOrMarqueeObserver){
		viewAdaptHeightOrMarqueeObserver.disconnect();
	} else {
		viewAdaptHeightOrMarqueeObserver = new MutationObserver(function(mutationList){
			if(typeof mutationList[0] == udef || typeof mutationList[0].addedNodes[0] == udef || typeof mutationList[0].addedNodes[0].className == udef || mutationList[0].addedNodes[0].className != "js-marquee"){ //check if the mutation is fired by marquee itself
				if(!($(mutationList[0].target).data('marquee-disabled') == "true")) adaptHeightOrStartMarqueeOnOverflow($(mutationList[0].target));
			}
		});
	}
	$('.iQontrolDeviceState, .iQontrolDeviceInfoAText, .iQontrolDeviceInfoBText, .iQontrolDeviceBadge').each(function(){
		viewAdaptHeightOrMarqueeObserver.observe(this, {attributes: false, childList: true, subtree: false});
		adaptHeightOrStartMarqueeOnOverflow($(this));
	});
	if(!options.LayoutViewMarqueeDisabled && options.LayoutViewMarqueeNamesEnabled){
		$('.iQontrolDeviceName').each(function(){
			viewAdaptHeightOrMarqueeObserver.observe(this, {attributes: false, childList: true, subtree: false});
			adaptHeightOrStartMarqueeOnOverflow($(this));
		});
	}
}

function adaptHeightOrStartMarqueeOnOverflow(element){
	if(!element || !element[0]) return;
	var $element = $(element);
	if($element.hasClass('iQontrolDeviceState')) stateFillsDeviceCheckForIconToFloat($element);
	if($element.hasClass('adaptsHeightIfEnlarged') || $element.hasClass('adaptsHeightIfEnlarged') || $element.hasClass('adaptsHeightIfEnlarged')){ //adapt height
		console.log("adaptHeight");
		//Shuffle two times
		viewShuffleReshuffle([100, 1250]);
	} else if(!options.LayoutViewMarqueeDisabled && (element[0].scrollHeight > element.innerHeight() || element[0].scrollWidth > element.innerWidth())) { //element has overflowing content
		console.log("Starting marquee");
		var direction = 'left';
		var speed = (Number(options.LayoutViewMarqueeSpeed) || 40);
		if($element.innerHeight() > 2 * (parseInt($element.css('line-height'), 10) || 25)){
			direction = 'up';
			speed /= 2;
		}
		element.marquee('destroy');
		element.marquee({
			speed: speed,
			gap: 40,
			delayBeforeStart: 2000,
			direction: direction,
			duplicated: true,
			pauseOnHover: true,
			startVisible: true
		});
	}
}

function viewScrollToDevice(scrollToDeviceId){ //add "h" to scrollToDeviceId to scroll to the corresponding heading
	let scrollToHeading = false;
	let scrollTop;
	if(scrollToDeviceId.substr(-1).toLowerCase() == "h"){ //scroll to heading
		scrollToDeviceId = scrollToDeviceId.substring(0, scrollToDeviceId.length - 1);
		$heading = $("[data-iQontrol-Device-ID='" + scrollToDeviceId + "'].viewShuffleTile").parent('.viewShuffleContainer').prev('h4');
		if($heading.length){
			scrollToHeading = true;
			scrollTop = $heading.offset().top;
			console.log("scrollToDevice heading of " + scrollToDeviceId + ": " + scrollTop);
		}
	} 
	if(!scrollToHeading){ //scroll to device
		let scrollToShuffleInstanceIndex = null;
		let targetShuffleItemIndex = null;
		for(let i = 0; i < viewShuffleInstances.length; i++){
			for(let j = 0; j < viewShuffleInstances[i].items.length; j++){
				if(viewShuffleInstances[i].items[j].element.dataset.iqontrolDeviceId == scrollToDeviceId){
					scrollToShuffleInstanceIndex = i;
					scrollToShuffleItemIndex = j;
					break;
				}
			}
			if(scrollToShuffleInstanceIndex != null) break;
		}
		if(scrollToShuffleInstanceIndex != null){
			 scrollTop = $(viewShuffleInstances[scrollToShuffleInstanceIndex].element).offset().top + (viewShuffleInstances[scrollToShuffleInstanceIndex].items[scrollToShuffleItemIndex].point.y * zoom) - 5;
			console.log("scrollToDevice " + scrollToDeviceId + ": " + scrollTop);
		}
	}
	if(scrollTop){
		viewScrollToDeviceRunning = true;
		$('html,body').animate({
			scrollTop: scrollTop
		}, 1000, function(){
			setTimeout(function(){ viewScrollToDeviceRunning = false; }, 100);
		});
	}
}

function stateFillsDeviceCheckForIconToFloat($iQontrolDeviceState){
	if(!$iQontrolDeviceState) return;
	if(!$iQontrolDeviceState.hasClass('iQontrolDeviceState')) return;
	var active = $iQontrolDeviceState.parents('.iQontrolDevice').hasClass('active');
	var enlarged = $iQontrolDeviceState.parents('.iQontrolDevice').hasClass('enlarged');
	var deviceIdEscaped = $iQontrolDeviceState.data('iqontrolDeviceId');
	if(((!active && $iQontrolDeviceState.hasClass('stateFillsDeviceIfInactive')) || (active && $iQontrolDeviceState.hasClass('stateFillsDeviceIfActive')) || (enlarged && $iQontrolDeviceState.hasClass('stateFillsDeviceIfEnlarged')))
		&& !((($("[data-iQontrol-Device-ID='" + deviceIdEscaped + "'].iQontrolDeviceIcon.active").prop('src') || "").endsWith('/images/icons/blank.png')) || (enlarged && $iQontrolDeviceState.prevAll('.iQontrolDeviceIcon' + (active ? '.active' : '')).hasClass('hideIfEnlarged')))){ //stateFillsDevice && Icon is visible
		console.log("stateFillsDevice and icon is visible - add iQontrolDeviceStateIconFloatPlaceholder");
		if($iQontrolDeviceState.children('.iQontrolDeviceStateIconFloatPlaceholder').length == 0) $iQontrolDeviceState.html("<div class='iQontrolDeviceStateIconFloatPlaceholder'></div>" + $iQontrolDeviceState.html());
	} else if($iQontrolDeviceState.children('.iQontrolDeviceStateIconFloatPlaceholder').length > 0) { //state does not fillDevice or Icon is invisible (blank.png or hidden) and iQontrolDeviceStateIconFloatPlaceholder is present
		console.log("!stateFillsDevice or icon is invisible (blank or hidden) - remove iQontrolDeviceStateIconFloatPlaceholder");
		 $iQontrolDeviceState.children('.iQontrolDeviceStateIconFloatPlaceholder').remove();
	}
	if(((!active && $iQontrolDeviceState.hasClass('stateFillsDeviceIfInactive')) || (active && $iQontrolDeviceState.hasClass('stateFillsDeviceIfActive')) || (enlarged && $iQontrolDeviceState.hasClass('stateFillsDeviceIfEnlarged')))
		&& $("[data-iQontrol-Device-ID='" + deviceIdEscaped + "'].iQontrolDeviceBadge").hasClass("active")) { //stateFillsDevice && Badge is visible
		console.log("stateFillsDevice and badge is visible - add padding-top");
		$iQontrolDeviceState.css('padding-top', '7px');
	} else { 
		console.log("!stateFillsDevice or badge is invisible - remove padding-top");
		$iQontrolDeviceState.css('padding-top', '0px');
	}
}

function dynamicIframeZoom(){
	$('iframe.dynamicIframeZoom').each(function(){
		var deviceIdEscaped = $(this).data('iqontrolDeviceId');
		if(deviceIdEscaped){
			var zoom = parseFloat($(this).data('dynamic-iframe-zoom') || 33);
			var $dummy = $("[data-iQontrol-Device-ID='" + deviceIdEscaped + "'].iQontrolDevice").clone().css('display','none').css('transition', 'none').appendTo('#ViewMain'); //Create a dummy without transition to get the goal-width
			var width = parseFloat($dummy.css('max-width') || 104) + (2 * parseFloat($dummy.css('padding-left') || 6));
			$dummy.remove();
			var factor = (zoom/100) * (width/104);
			console.log(width);
			$(this).css('transition', 'all 1s');
			$(this).css('transform-origin', '0 0');
			$(this).css('transform', 'scale(' + factor + ')');
			$(this).css('width', (100 / factor) + '%');
			$(this).css('min-height', (100 / factor) + '%');
		}
	});
}

function applyViewDeviceContextMenu(){
	//In former versions the context menu was called pressure menu - therefore there are some elements with old names like pressureIndicator
	$('.iQontrolDeviceLink').off('click').on('click', function(event){
		console.log("viewDeviceContextMenu device CLICK");
		if(!viewDeviceContextMenuIgnoreClick){
			viewDeviceContextMenuEnd();
			var onclick = $(this).data('onclick');
			var that = this;
			if(onclick) new Function('that', onclick)(that);
		} else {
			console.log("viewDeviceContextMenu device CLICK ignored");
		}
	});
	$('.iQontrolDeviceLinkToToggle').off('click').on('click', function(event){
		console.log("viewDeviceContextMenu device CLICK TOGGLE");
		event.stopPropagation();
		viewDeviceContextMenuIgnoreStart = true;
	});
	$('.iQontrolDeviceLink').on('touchstart mousedown', function(event){
		//console.log("viewDeviceContextMenu start via TOUCHSTART/MOUSEDOWN");
		var posY = event.originalEvent.clientY || event.originalEvent.touches[0].clientY || 0;
		var saveAreaInsetBottom = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--saveAreaInsetBottom"), 10) || 0;
		if(posY > window.innerHeight - saveAreaInsetBottom){
			//console.log("viewDeviceContextMenu start aborted, because touch was in safe area");
			return;
		}
		viewDeviceContextMenuStart(event.target);
		toolbarContextMenuEnd();
	});
	$(window).on('touchend mouseup', function(){
		//console.log("viewDeviceContextMenu end via TOUCHEND/MOUSEUP");
		viewDeviceContextMenuEnd();
	});
	$(window).scroll(function(event){
		if(!viewDeviceContextMenuIgnoreStart){
			//console.log("viewDeviceContextMenu end via SCROLL");
			viewDeviceContextMenuEnd();
		}
	});
}

function viewDeviceContextMenuStart(callingElement){
	console.log("viewDeviceContextMenu start function");
	if(viewDeviceContextMenuIgnoreStart) {
		console.log("viewDeviceContextMenu start ignored");
		return;
	}
	$('.iQontrolDevicePressureIndicator').css('box-shadow', '0px 0px 0px 0px rgba(175,175,175,0.85)');
	viewDeviceContextMenuIgnoreClick = false;
	setTimeout(function(){
		viewDeviceContextMenuIgnoreClick = false;
		console.log("viewDeviceContextMenu ignore click ended after 100ms");
	}, 100);
	viewDeviceContextMenuLevel = 0;
	if(viewDeviceContextMenuInterval) clearInterval(viewDeviceContextMenuInterval);
	(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
		var _callingElement = callingElement;
		viewDeviceContextMenuInterval = setInterval(function(){
			if($('#ViewMain').data('plugin_ptrLight').spinnerRotation){ //Stop on pull to reresh (ptrLight)
				console.log("viewDeviceContextMenu end via ptrLight");
				viewDeviceContextMenuEnd();
			}
			viewDeviceContextMenuLevel += 0.05;
			var level = (viewDeviceContextMenuLevel - 0.2) * 1.25; //Ignore level <0.2
			if(level > 0.5 && !viewDeviceContextMenuIgnoreClick){
				console.log("viewDeviceContextMenu startDeepPress");
				viewDeviceContextMenuIgnoreClick = true;
			}
			if(level >= 1){ //Maximum reached
				console.log("viewDeviceContextMenu maximum reached");
				viewDeviceContextMenuIgnoreStart = true;
				openViewDeviceContextMenu($(_callingElement).data('iqontrolDeviceId'), _callingElement);
				viewDeviceContextMenuEnd();
			} else if(level > 0) {
				$(_callingElement).parents('.iQontrolDevicePressureIndicator').css('box-shadow', '0px 0px 0px ' + 10 * level + 'px rgba(175,175,175,0.85)');
			}
		}, 25);
	})(); //<--End Closure
}

function viewDeviceContextMenuEnd(dontEndIgnoreStart){
	console.log("viewDeviceContextMenu end function");
	viewDeviceContextMenuIgnoreStart = true;
	$('.iQontrolDevicePressureIndicator').css('box-shadow', '0px 0px 0px 0px rgba(175,175,175,0.85)');
	if(viewDeviceContextMenuInterval) clearInterval(viewDeviceContextMenuInterval);
	if(!dontEndIgnoreStart) setTimeout(function(){
		console.log("viewDeviceContextMenu end function - end ignoreStart");
		viewDeviceContextMenuIgnoreStart = false;
		viewDeviceContextMenuIgnoreClick = false;
	}, 300);
}

function openViewDeviceContextMenu(deviceIdEscaped, callingElement){
	console.log("viewDeviceContextMenu openViewDeviceContextMenu");
	if(viewDeviceContextMenu[deviceIdEscaped]){
		console.log("viewDeviceContextMenu openViewDeviceContextMenu - open");
		$('#ViewDeviceContextMenuList').empty();
		for (key in viewDeviceContextMenu[deviceIdEscaped]){
			var element = viewDeviceContextMenu[deviceIdEscaped][key];
			$('#ViewDeviceContextMenuList').append('<li' + (typeof element.icon != udef ? ' data-icon="' + element.icon + '"' : '') + ' class="ui-nodisc-icon ui-alt-icon" style="' + (typeof element.hidden != udef && element.hidden ? 'display: none;' : '') + '"><a href="' + (typeof element.href != udef ? element.href : '') + '" target="' + (typeof element.target != udef ? element.target : '') + '" onclick=\'' + (typeof element.onclick != udef ? element.onclick : '') + '\'>' + (typeof element.name != udef ? element.name : key) + '</a></li>');
		};
		$('#ViewDeviceContextMenuList').listview('refresh');
		$("#ViewDeviceContextMenu").data('closeable', 'false').popup("open", {transition: "pop", positionTo: $(callingElement)});
		viewDeviceContextMenuEnd(true);
	}
}

function changeViewBackground(url){
	if(!url || url == "") { 
		$('body').removeClass('backstretchLoaded');
		$.backstretch({url: "./images/icons/blank.png", isVideo: false, loop: true, mute: true}, {fade: 300});
	} else {
		var isVideo = false;
		var extention = url.substring(url.lastIndexOf('.'));
		if(extention == ".avi" || extention == ".mov" || extention == ".mp4") isVideo = true;
		$.backstretch({url: url, isVideo: isVideo, loop: true, mute: true}, {fade: 300});
		$('body').addClass('backstretchLoaded');
	}
}

function viewSwipe(direction){
	if(direction == "right") {
		if(viewHistoryPosition > 0){
			viewHistoryPosition--;
			renderView(viewHistory[viewHistoryPosition]);
		}
	} else if(direction == "left"){
		if(viewHistoryPosition < viewHistory.length - 1){
			viewHistoryPosition++;
			renderView(viewHistory[viewHistoryPosition]);
		}
	}
}

function renderViewInParentInstance(viewId, closePanel){
	window.parent.postMessage({ command: "renderView" + (closePanel ? "ClosePanel" : ""), value: viewId }, "*");
}

//++++++++++ DIALOG ++++++++++
function renderDialog(deviceIdEscaped){
	console.log("renderDialog " + deviceIdEscaped);
	if(typeof deviceIdEscaped == udef || deviceIdEscaped == "") return;
	var deviceId = unescape(deviceIdEscaped);
	$("#DialogContent").html("");
	fetchConfig(getNamespace(deviceId), function(){
		var device = getDevice(deviceId);
		actualDialogId = deviceId;
		dialogUpdateFunctions = {};
		dialogStateIdsToFetch = [];
		dialogLinkedStateIdsToUpdate = [];
		var dialogReadonly = false;
		if(getDeviceOptionValue(device, "readonly") == "true") dialogReadonly = true;
		//Render Dialog
		var dialogContent = "";
		var dialogContentCountAfterHR = 0;
		var dialogBindingFunctions = [];
		dialogContent += "<form class='fullWidthSlider'>";
		dialogContent += "<button id='DialogAutofocusElement' onclick='event.stopPropagation(); event.preventDefault();' style='position:absolute; top:0px; left:-100000px; opacity:0; width:0px !important; height:0px !important;'></button>"; //jQuery fix for autofocus on first input when clicking on popup (the element is actively positioned to mouse cursor height)
			//--Get linked States & States
			//  While getting the LinkedStateId the correspondig usedObject is also fetched
			var dialogLinkedStateIds = {};
			var dialogLinkedStateIdsToFetch = [];
			var dialogStates = {};
			if(device.commonRole && typeof iQontrolRoles[device.commonRole].states != udef){
				iQontrolRoles[device.commonRole].states.forEach(function(elementState){
					var linkedStateId = getLinkedStateId(device, deviceId, elementState);
					if(linkedStateId) { //Call updateFunction after rendering Dialog
						dialogLinkedStateIdsToUpdate.push(linkedStateId);
						if(!fetchedStates[linkedStateId]) dialogLinkedStateIdsToFetch.push(linkedStateId);
					}
					dialogLinkedStateIds[elementState] = linkedStateId;
				});
			}
			console.info(dialogLinkedStateIdsToFetch);
			fetchStates(dialogLinkedStateIdsToFetch, function(){
				for (elementState in dialogLinkedStateIds) {
					if(dialogLinkedStateIds[elementState] && !fetchedObjects[dialogLinkedStateIds[elementState]]) { //If a dialog is rendered without the view being rendered before, there might be some objects that are beeing fetched at this moment. If this is the case, the dialog is re-rendered after a little delay.
						console.log("Render Dialog - Missing Object: " + elementState + " | " + dialogLinkedStateIds[elementState]);
						if(dialogRenderCount < 20){
							dialogRenderCount++;
							console.log("Re-Render Dialog");
							setTimeout(function(){ renderDialog(deviceIdEscaped); }, 50);
							return;
						} else {
							console.log("Re-Rendered Dialog 20 times - aborting");
						}
					}
					dialogStates[elementState] = getStateObject(dialogLinkedStateIds[elementState]);
				}
				dialogRenderCount = 0;
				//!--State & Level
				if(!(getDeviceOptionValue(device, "hideStateAndLevelInDialog") == "true")) switch(device.commonRole){
					case "iQontrolButton":
					if(dialogLinkedStateIds["STATE"]){
						dialogContentCountAfterHR++;
						var type = getDeviceOptionValue(device, "stateCaption") || "Button";
						var buttonCaption = getDeviceOptionValue(device, "buttonCaption") || "push";
						dialogContent += "<label for='DialogStateButton' ><image src='./images/symbols/program.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
						dialogContent += "<a data-role='button' data-mini='false' class='iQontrolDialogButton" + ((dialogStates["STATE"].readonly || dialogReadonly) ? " ui-state-disabled'" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogStateButton' id='DialogStateButton'>" + _(buttonCaption) + "</a>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _device = device;
							var _linkedStateId = dialogLinkedStateIds["STATE"];
							var _linkedSetValueId = dialogLinkedStateIds["SET_VALUE"] || "";
							var _linkedOffSetValueId = dialogLinkedStateIds["OFF_SET_VALUE"] || "";
							var _returnToOffSetValueAfter = getDeviceOptionValue(_device, "returnToOffSetValueAfter") || "100";
							var _closeDialogAfterExecution = getDeviceOptionValue(_device, "closeDialogAfterExecution") || "false";
							var bindingFunction = function(){
								$('#DialogStateButton').on('click', function(e) {
									startButton(_linkedStateId, _linkedSetValueId, _linkedOffSetValueId, _returnToOffSetValueAfter, _deviceIdEscaped);
									dialogUpdateTimestamp(fetchedStates[_linkedStateId]);
									if(_closeDialogAfterExecution == "true") $('#Dialog').popup('close');
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}
					break;

					case "iQontrolThermostat": case "iQontrolHomematicThermostat": case "iQontrolHomematicIpThermostat":
					if(dialogStates["SET_TEMPERATURE"]){
						dialogContentCountAfterHR++;
						var type = getDeviceOptionValue(device, "stateCaption") || "Goal-Temperature";
						var min = dialogStates["SET_TEMPERATURE"].min || 6;
						var max = dialogStates["SET_TEMPERATURE"].max || 30;
						var step = "0.5";
						if(fetchedObjects[dialogLinkedStateIds["SET_TEMPERATURE"]] && typeof fetchedObjects[dialogLinkedStateIds["SET_TEMPERATURE"]].common !== udef && typeof fetchedObjects[dialogLinkedStateIds["SET_TEMPERATURE"]].common.custom !== udef &&  fetchedObjects[dialogLinkedStateIds["SET_TEMPERATURE"]].common.custom !== null && typeof fetchedObjects[dialogLinkedStateIds["SET_TEMPERATURE"]].common.custom[namespace] !== udef && fetchedObjects[dialogLinkedStateIds["SET_TEMPERATURE"]].common.custom[namespace] !== null && typeof fetchedObjects[dialogLinkedStateIds["SET_TEMPERATURE"]].common.custom[namespace].step !== udef && fetchedObjects[dialogLinkedStateIds["SET_TEMPERATURE"]].common.custom[namespace].step !== "") step = fetchedObjects[dialogLinkedStateIds["SET_TEMPERATURE"]].common.custom[namespace].step.toString();
						var unit = dialogStates["SET_TEMPERATURE"].unit || "";
						if(unit != "" && unit != "°C" && unit != "%") unit = "&nbsp;" + unit;
						dialogContent += "<label for='DialogStateSlider' ><image src='./images/symbols/slider.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
						dialogContent += "<input type='number' data-type='range' class='iQontrolDialogSlider' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["SET_TEMPERATURE"].readonly || dialogReadonly).toString() + "' data-highlight='true' data-popup-enabled='true' data-show-value='true' name='DialogStateSlider' id='DialogStateSlider' min='" + min + "' max='" + max + "' step='" + step + "'/>";
						var levelFavorites = (getDeviceOptionValue(device, "levelFavorites") || "").split(";");
						var levelFavoritesHideSlider = (getDeviceOptionValue(device, "levelFavoritesHideSlider") == "true");
						if(levelFavorites.length > 0 && levelFavorites[0] != "") {
							dialogContent += "<fieldset data-role='controlgroup' data-type='horizontal' style='text-align: center; padding-bottom: 15px;'>"
								for(index in levelFavorites){
									let val = levelFavorites[index];
									dialogContent += "<input type='radio' class='iQontrolDialogCheckboxradio DialogLevelFavoritesCheckboxradio' " + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogLevelFavoritesCheckboxradio' id='DialogLevelFavoritesCheckboxradio_" + index + "' value='" + val + "' data-mini='true'/>";
									dialogContent += "<label for='DialogLevelFavoritesCheckboxradio_" + index + "'>" + val + unit + "</label>";
								}
							dialogContent += "</fieldset>";
						}
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedSetTemperatureId = dialogLinkedStateIds["SET_TEMPERATURE"];
							var _confirm = (fetchedObjects[_linkedSetTemperatureId] && typeof fetchedObjects[_linkedSetTemperatureId].common !== udef && typeof fetchedObjects[_linkedSetTemperatureId].common.custom !== udef && fetchedObjects[_linkedSetTemperatureId].common.custom !== null && typeof fetchedObjects[_linkedSetTemperatureId].common.custom[namespace] !== udef && fetchedObjects[_linkedSetTemperatureId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedSetTemperatureId].common.custom[namespace].confirm !== udef && fetchedObjects[_linkedSetTemperatureId].common.custom[namespace].confirm == true);
							var _pincodeSet = (fetchedObjects[_linkedSetTemperatureId] && typeof fetchedObjects[_linkedSetTemperatureId].common !== udef && typeof fetchedObjects[_linkedSetTemperatureId].common.custom !== udef && fetchedObjects[_linkedSetTemperatureId].common.custom !== null && typeof fetchedObjects[_linkedSetTemperatureId].common.custom[namespace] !== udef && fetchedObjects[_linkedSetTemperatureId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedSetTemperatureId].common.custom[namespace].pincode !== udef && fetchedObjects[_linkedSetTemperatureId].common.custom[namespace].pincode !== "");
							var _levelFavorites = levelFavorites;
							var _levelFavoritesHideSlider = levelFavoritesHideSlider;
							var DialogStateSliderReadoutTimer;
							var updateFunction = function(){
								var stateSetTemperature = getStateObject(_linkedSetTemperatureId);
								if(stateSetTemperature){
									$("#DialogStateSlider").val(stateSetTemperature.val);
									$("#DialogStateSlider").slider('refresh');
									dialogUpdateTimestamp(fetchedStates[_linkedSetTemperatureId]);
								}
								if(_levelFavorites.length > 0 && levelFavorites[0] != "") {
									if(_levelFavoritesHideSlider && _levelFavorites.indexOf(stateSetTemperature.val.toString()) > -1) $('#DialogStateSlider').parents('div.ui-slider').hide();
									$(".DialogLevelFavoritesCheckboxradio").removeProp("checked");
									$("#DialogLevelFavoritesCheckboxradio_" + _levelFavorites.indexOf(stateSetTemperature.val.toString())).prop("checked", true);
									$(".DialogLevelFavoritesCheckboxradio").checkboxradio('refresh');
								}
							};
							dialogUpdateFunctions[_linkedSetTemperatureId].push(updateFunction);
							var bindingFunction = function(){
								$('#DialogStateSlider').slider({
									start: function(event, ui){
										clearInterval(DialogStateSliderReadoutTimer);
										if(!_confirm && !_pincodeSet){
											DialogStateSliderReadoutTimer = setInterval(function(){
												setState(_linkedSetTemperatureId, _deviceIdEscaped, $("#DialogStateSlider").val() * 1);
												dialogUpdateTimestamp(fetchedStates[_linkedSetTemperatureId]);
											}, 5000);
										}
									},
									stop: function(event, ui) {
										clearInterval(DialogStateSliderReadoutTimer);
										if(_levelFavorites.length > 0 && levelFavorites[0] != "") {
											$(".DialogLevelFavoritesCheckboxradio").removeProp("checked");
											$("#DialogLevelFavoritesCheckboxradio_" + _levelFavorites.indexOf($("#DialogStateSlider").val())).prop("checked", true);
											$(".DialogLevelFavoritesCheckboxradio").checkboxradio('refresh');
										}
										setState(_linkedSetTemperatureId, _deviceIdEscaped, $("#DialogStateSlider").val() * 1);
										dialogUpdateTimestamp(fetchedStates[_linkedSetTemperatureId]);
									}
								});
								if(levelFavorites.length > 0 && levelFavorites[0] != "") {
									$("input[name='DialogLevelFavoritesCheckboxradio']").on('click', function(e) {
										clearInterval(DialogStateSliderReadoutTimer);
										$("#DialogStateSlider").val($("input[name='DialogLevelFavoritesCheckboxradio']:checked").val() * 1);
										$("#DialogStateSlider").slider('refresh');
										setState(_linkedSetTemperatureId, _deviceIdEscaped, $("input[name='DialogLevelFavoritesCheckboxradio']:checked").val() * 1);
										dialogUpdateTimestamp(fetchedStates[_linkedSetTemperatureId]);
									});	
								}
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}
					break;

					case "iQontrolDoorWithLock":
					if(dialogStates["STATE"]){
						dialogContentCountAfterHR++;
						var type = getDeviceOptionValue(device, "stateCaption") || "Door";
						dialogContent += "<label for='DialogStateValue'><image src='./images/symbols/door.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
						dialogContent += "<input type='button' class='iQontrolDialogValue DialogStateValue' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='true' name='DialogStateValue' id='DialogStateValue' value='' />";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedStateId = dialogLinkedStateIds["STATE"];
							var updateFunction = function(){
								var state = getStateObject(_linkedStateId);
								if(state){
									if(state.val) $("#DialogStateValue").val(_("opened")); else $("#DialogStateValue").val(_("closed"));
									$("#DialogStateValue").button('refresh');
									dialogUpdateTimestamp(fetchedStates[_linkedStateId]);
								}
							};
							dialogUpdateFunctions[_linkedStateId].push(updateFunction);
							var bindingFunction = function(){
								$('.DialogStateValueList').on('change', function(e) {
									setState(_linkedStateId, _deviceIdEscaped, $("#DialogStateValueList option:selected").val());
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}
					break;

					case "iQontrolScene":
					var type = getDeviceOptionValue(device, "stateCaption") || "Scene";
					if(dialogStates["STATE"] && !dialogStates["STATE"].readonly && !dialogReadonly){
						dialogContentCountAfterHR++;
						dialogContent += "<label for='DialogStateButton' ><image src='./images/symbols/program.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
						dialogContent += "<a data-role='button' data-mini='false' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogStateButton' id='DialogStateButton'>" + _("execute") + "</a>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _device = device;
							var _linkedStateId = dialogLinkedStateIds["STATE"];
							var _closeDialogAfterExecution = getDeviceOptionValue(_device, "closeDialogAfterExecution") || "false";
							var bindingFunction = function(){
								$('#DialogStateButton').on('click', function(e) {
									toggleScene(_linkedStateId, _deviceIdEscaped);
									dialogUpdateTimestamp(fetchedStates[_linkedStateId]);
									if(_closeDialogAfterExecution == "true") $('#Dialog').popup('close');
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}
					break;

					case "iQontrolProgram":
					var type = getDeviceOptionValue(device, "stateCaption") || "Program";
					if(dialogStates["STATE"] && !dialogStates["STATE"].readonly && !dialogReadonly){
						dialogContentCountAfterHR++;
						dialogContent += "<label for='DialogStateButton' ><image src='./images/symbols/program.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
						dialogContent += "<a data-role='button' data-mini='false' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogStateButton' id='DialogStateButton'>" + _("execute") + "</a>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _device = device;
							var _linkedStateId = dialogLinkedStateIds["STATE"];
							var _closeDialogAfterExecution = getDeviceOptionValue(_device, "closeDialogAfterExecution") || "false";
							var bindingFunction = function(){
								$('#DialogStateButton').on('click', function(e) {
									startProgram(_linkedStateId, _deviceIdEscaped);
									dialogUpdateTimestamp(fetchedStates[_linkedStateId]);
									if(_closeDialogAfterExecution == "true") $('#Dialog').popup('close');
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}
					break;

					case "iQontrolMedia":
					//DoNothing
					break;

					default:
					//----Default State
					if(dialogStates["STATE"]){
						switch(dialogStates["STATE"].type){
							case "switch":
							dialogContentCountAfterHR++;
							var type = "Switch";
							if(device.commonRole == "iQontrolMotion") type = "Motion";
							if(device.commonRole == "iQontrolAlarm") type = "Alarm";
							if(device.commonRole == "iQontrolDateAndTime") type = "Status";
							if(device.commonRole == "iQontrolWidget") type = "Enlarge";
							type = getDeviceOptionValue(device, "stateCaption") || type;
							dialogContent += "<label for='DialogStateSwitch' ><image src='./images/symbols/switch.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
							dialogContent += "<select data-role='flipswitch' data-mini='false' class='iQontrolDialogSwitch' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["STATE"].readonly || dialogReadonly).toString() + "' name='DialogStateSwitch' id='DialogStateSwitch'>";
								dialogContent += "<option value='false'>0</option>";
								dialogContent += "<option value='true'>I</option>";
							dialogContent += "</select>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedStateId = dialogLinkedStateIds["STATE"];
								var updateFunction = function(){
									var state = getStateObject(_linkedStateId);
									if(state){
										var index = 0;
										if(typeof state.val != udef && (state.val.toString().toLowerCase() == "true" || state.val.toString() > 0)) index = 1; else index = 0;
										$("#DialogStateSwitch")[0].selectedIndex = index;
										$("#DialogStateSwitch").flipswitch('refresh');
										dialogUpdateTimestamp(fetchedStates[_linkedStateId]);
									}
								};
								dialogUpdateFunctions[_linkedStateId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogStateSwitch').on('change', function(e) {
										var newVal = $("#DialogStateSwitch option:selected").val();
										var state = getStateObject(_linkedStateId);
										if(typeof state.val == 'number'){
											if(newVal == true) newVal = 1; else newVal = 0;
										}
										setState(_linkedStateId, _deviceIdEscaped, newVal);
										dialogUpdateTimestamp(fetchedStates[_linkedStateId]);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
							break;

							case "button":
							dialogContentCountAfterHR++;
							var type = getDeviceOptionValue(device, "stateCaption") || "Button";
							if(dialogLinkedStateIds["STATE"]){
								var buttonCaption = getDeviceOptionValue(device, "buttonCaption") || "push";
								dialogContent += "<label for='DialogStateButton' ><image src='./images/symbols/program.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
								dialogContent += "<a data-role='button' data-mini='false' class='iQontrolDialogButton" + ((dialogStates["STATE"].readonly || dialogReadonly) ? " ui-state-disabled'" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogStateButton' id='DialogStateButton'>" + _(buttonCaption) + "</a>";
								(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
									var _deviceIdEscaped = deviceIdEscaped;
									var _device = device;
									var _linkedStateId = dialogLinkedStateIds["STATE"];
									var _linkedSetValueId = dialogLinkedStateIds["SET_VALUE"] || "";
									var _linkedOffSetValueId = dialogLinkedStateIds["OFF_SET_VALUE"] || "";
									var _returnToOffSetValueAfter = getDeviceOptionValue(_device, "returnToOffSetValueAfter") || "100";
									var _closeDialogAfterExecution = getDeviceOptionValue(_device, "closeDialogAfterExecution") || "false";
									var bindingFunction = function(){
										$('#DialogStateButton').on('click', function(e) {
											startButton(_linkedStateId, _linkedSetValueId, _linkedOffSetValueId, _returnToOffSetValueAfter, _deviceIdEscaped);
											dialogUpdateTimestamp(fetchedStates[_linkedStateId]);
											if(_closeDialogAfterExecution == "true") $('#Dialog').popup('close');
										});
									};
									dialogBindingFunctions.push(bindingFunction);
								})(); //<--End Closure
							}
							break;

							case "level":
							dialogContentCountAfterHR++;
							var min = dialogStates["STATE"].min || 0;
							var max = dialogStates["STATE"].max || 100;
							var step = dialogStates["STATE"].step || 1;
							var type = "Level";
							var sliderSendRate = 500;
							if(device.commonRole == "iQontrolLight") {
								type = "Dimmer";
							}
							if(device.commonRole == "iQontrolBlind") {
								type = "Height";
								sliderSendRate = 5000;
							}
							type = getDeviceOptionValue(device, "stateCaption") || type;
							dialogContent += "<label for='DialogStateSlider' ><image src='./images/symbols/slider.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
							dialogContent += "<input type='number' data-type='range' class='iQontrolDialogSlider' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["STATE"].readonly || dialogReadonly).toString() + "' data-highlight='true' data-popup-enabled='true' data-show-value='true' name='DialogStateSlider' id='DialogStateSlider' min='" + min + "' max='" + max + "' step='" + step + "'/>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedStateId = dialogLinkedStateIds["STATE"];
								var _sliderSendRate = sliderSendRate;
								var _confirm = (fetchedObjects[_linkedStateId] && typeof fetchedObjects[_linkedStateId].common !== udef && typeof fetchedObjects[_linkedStateId].common.custom !== udef && fetchedObjects[_linkedStateId].common.custom !== null && typeof fetchedObjects[_linkedStateId].common.custom[namespace] !== udef && fetchedObjects[_linkedStateId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedStateId].common.custom[namespace].confirm !== udef && fetchedObjects[_linkedStateId].common.custom[namespace].confirm == true);
								var _pincodeSet = (fetchedObjects[_linkedStateId] && typeof fetchedObjects[_linkedStateId].common !== udef && typeof fetchedObjects[_linkedStateId].common.custom !== udef && fetchedObjects[_linkedStateId].common.custom !== null && typeof fetchedObjects[_linkedStateId].common.custom[namespace] !== udef && fetchedObjects[_linkedStateId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedStateId].common.custom[namespace].pincode !== udef && fetchedObjects[_linkedStateId].common.custom[namespace].pincode !== "");
								var DialogStateSliderReadoutTimer;
								var updateFunction = function(){
									var state = getStateObject(_linkedStateId);
									if(state){
										$("#DialogStateSlider").val(state.val);
										$("#DialogStateSlider").slider('refresh');
										dialogUpdateTimestamp(fetchedStates[_linkedStateId]);
									}
								};
								dialogUpdateFunctions[_linkedStateId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogStateSlider').slider({
										start: function(event, ui){
											clearInterval(DialogStateSliderReadoutTimer);
											if(!_confirm && !_pincodeSet){
												DialogStateSliderReadoutTimer = setInterval(function(){
													setState(_linkedStateId, _deviceIdEscaped, $("#DialogStateSlider").val());
													dialogUpdateTimestamp(fetchedStates[_linkedStateId]);
												}, _sliderSendRate);
											}
										},
										stop: function(event, ui) {
											clearInterval(DialogStateSliderReadoutTimer);
											setState(_linkedStateId, _deviceIdEscaped, $("#DialogStateSlider").val());
											dialogUpdateTimestamp(fetchedStates[_linkedStateId]);
										}
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
							break;

							case "valueList":
							dialogContentCountAfterHR++;
							var type = "Selection";
							if(device.commonRole == "iQontrolMotion") type = "Motion";
							if(device.commonRole == "iQontrolAlarm") type = "Alarm";
							type = getDeviceOptionValue(device, "stateCaption") || type;
							dialogContent += "<label for='DialogStateValueList' ><image src='./images/symbols/variable.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
							dialogContent += "<select  class='iQontrolDialogValueList DialogStateValueList' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["STATE"].readonly || dialogReadonly).toString() + "' name='DialogStateValueList' id='DialogStateValueList' data-native-menu='false'>";
							for(val in dialogStates["STATE"].valueList){
								if(dialogStates["STATE"].targetValues && dialogStates["STATE"].custom.showOnlyTargetValues && !dialogStates["STATE"].targetValues.hasOwnProperty(val)) continue; //Show only targetValues
								dialogContent += "<option value='" + val + "'>" + _(dialogStates["STATE"].valueList[val]) + "</option>";
							}
							if(dialogStates["STATE"].custom.statesAddInput) {
								dialogContent += "<option value='[INPUT]'>" + (dialogStates["STATE"].custom.statesAddInputCaption || _("Enter other value...")) + "</option>";
							}
							dialogContent += "</select>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedStateId = dialogLinkedStateIds["STATE"];
								var updateFunction = function(){
									var state = getStateObject(_linkedStateId);
									if(state){
										if(typeof state.val != udef) {
											var val = state.val.toString();
											$("#DialogStateValueList").val(val).selectmenu('refresh');
											if($("#DialogStateValueList").val() !== val){ //val is not in option-list
												if(state.valueList && typeof state.valueList[val] !== udef){
													$("#DialogStateValueList").prev("span").html(state.valueList[val]);
												} else {
													$("#DialogStateValueList").prev("span").html(val + "&nbsp;");
												}
											}
										}
										dialogUpdateTimestamp(fetchedStates[_linkedStateId]);
									}
								};
								dialogUpdateFunctions[_linkedStateId].push(updateFunction);
								var bindingFunction = function(){
									$('.DialogStateValueList').on('change', function(e) {
										var val = $("#DialogStateValueList option:selected").val();
										if(val == "[INPUT]") {
											val = prompt((dialogStates["STATE"].custom.statesAddInputCaption || _("Enter other value...")));
											if(val == null) {
												updateState(_linkedStateId);
												return;
											}
											$("#DialogStateValueList").prev("span").html(val + "&nbsp;");
										}
										setState(_linkedStateId, _deviceIdEscaped, val);
										dialogUpdateTimestamp(fetchedStates[_linkedStateId]);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
							break;

							case "string":
							dialogContentCountAfterHR++;
							var type = getDeviceOptionValue(device, "stateCaption") || "Text";
							dialogContent += "<label for='DialogStateString' ><image src='./images/symbols/variable.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
							dialogContent += "<textarea class='iQontrolDialogString State' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["STATE"].readonly || dialogReadonly).toString() + "' name='DialogStateString' id='DialogStateString'></textarea>";
							if(!dialogStates["STATE"].readonly && !dialogReadonly) {
								dialogContent += "<a data-role='button' data-mini='false' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogStateStringSubmit' id='DialogStateStringSubmit'>" + _("Submit") + "</a>";
							}
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedStateId = dialogLinkedStateIds["STATE"];
								var updateFunction = function(){
									var state = getStateObject(_linkedStateId);
									if(state){
										if($("#DialogStateString").parent('.jqte_source').length == 0){
											$("#DialogStateString").val(state.val);
											$("#DialogStateString").textinput('refresh');
										} else {
											$("#DialogStateString").jqteVal(state.val);
										}
										dialogUpdateTimestamp(fetchedStates[_linkedStateId]);
									}
								};
								dialogUpdateFunctions[_linkedStateId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogStateStringSubmit').on('click', function(e) {
										setState(_linkedStateId, _deviceIdEscaped, $("#DialogStateString").val(), true);
										dialogUpdateTimestamp(fetchedStates[_linkedStateId]);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
							break;

							case "time":
							dialogContentCountAfterHR++;
							var timeFormat = getTimeFormat((dialogStates["STATE"].custom && dialogStates["STATE"].custom.timeFormat) || "x");
							var timeDisplayFormat = getTimeFormat((dialogStates["STATE"].custom && dialogStates["STATE"].custom.timeDisplayFormat) || "dddd, DD.MM.YYYY HH:mm:ss");
							var isPeriod = (timeFormat.type == "period")
							var type = getDeviceOptionValue(device, "stateCaption") || (isPeriod ? "Duration" : "Time");
							dialogContent += "<label for='DialogStateTimeString' ><image src='./images/symbols/time.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
							dialogContent += "<input class='iQontrolDialogTime' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["STATE"].readonly || dialogReadonly).toString() + "' name='DialogStateTimeString' id='DialogStateTimeString' readonly/>";
							dialogContent += "<div class='iQontrolDialogTimeDistance small' data-iQontrol-Device-ID='" + deviceIdEscaped + "' id='DialogStateTimeDistance'></div>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _device = device;
								var _linkedTimeId = dialogLinkedStateIds["STATE"];
								var _timeFormat = timeFormat;
								var _timeDisplayFormat = timeDisplayFormat;
								var _periodDisplayFormat = getTimeFormat(replaceTokens(_timeDisplayFormat.string, momentToDurationDisplayFormatTokens));
								var _anypickerTimeDisplayFormat = getTimeFormat(replaceTokens(_timeDisplayFormat.string, momentToAnypickerDisplayFormatTokens), "AnyPickerMode");
								var _anypickerTimePickerFormat = getTimeFormat(replaceTokens(_anypickerTimeDisplayFormat.string, anypickerDisplayFormatToAnypickerPickerFormatTokens), "AnyPickerMode");
								if(_timeFormat.type == "date") _anypickerTimePickerFormat.string = _anypickerTimePickerFormat.string.replace(/[hHaAms]/g, "");
								if(_timeFormat.type == "time") _anypickerTimePickerFormat.string = _anypickerTimePickerFormat.string.replace(/[yMd]/g, "");
								var _anypickerModifyDateOutput = function(oldMoment, newMoment){
									var nowMoment = moment();
									if(_timeFormat.type == "date"){
										newMoment.hour(0).minute(0).second(0).millisecond(0);
									} else if(_timeFormat.type == "time"){
										newMoment.year(1970).month(0).date(1); //Unix: 01.01.1970 = timestamp 0
									} else if(_timeFormat.type == "datetime" && _anypickerTimeDisplayFormat.flags.indexOf("to") == -1){
										if(_anypickerTimeDisplayFormat.type == "date"){
											if(_anypickerTimeDisplayFormat.flags.indexOf("tn") > -1){
												newMoment.hour(nowMoment.hour()).minute(nowMoment.minute()).second(nowMoment.second()).millisecond(0);
											} else {
												newMoment.hour(0).minute(0).second(0).millisecond(0);
											}
										} else if(_anypickerTimeDisplayFormat.type == "time"){
											if(_anypickerTimePickerFormat.flags.indexOf("tb") > -1) {
												newMoment.year(1970).month(0).date(1); //Unix: 01.01.1970 = timestamp 0
											} else if(_anypickerTimePickerFormat.flags.indexOf("tn") > -1) {
												newMoment.year(nowMoment.year()).month(nowMoment.month()).date(nowMoment.date()).add(1, 'd');
											} else if(oldMoment.toDate().getTime() > 86400000) {
												newMoment.year(nowMoment.year()).month(nowMoment.month()).date(nowMoment.date()).add(1, 'd');
											} else {
												newMoment.year(1970).month(0).date(1); //Unix: 01.01.1970 = timestamp 0
											}										
										}
									}
									return newMoment;
								}
								var updateFunction = function(_stateId, _onlyUpdateDistance){
									var time = getStateObject(_linkedTimeId);
									var startDistanceTimer = false;
									if(time){
										var nowMoment = moment(new Date());
										if(!(time && typeof time.val != udef)) time = {val: 0};
										if(_timeFormat.type == "period"){
											var timeMoment = moment.duration(time.val, _timeFormat.string);
										} else {
											var timeMoment = moment(time.val, _timeFormat.string);
										}
										if(!timeMoment.isValid()) timeMoment = moment(0);
										if(_timeFormat.type == "time" && timeMoment.format("DD.MM.YYYY") == nowMoment.format("DD.MM.YYYY")){
											timeMoment.year(1970).month(0).date(1);
										}									
										if(!_onlyUpdateDistance){
											if(typeof $("#DialogStateTimeString").data('anypicker') == udef){ //Init AnyPicker
												if(_timeFormat.type != "period"){
													$("#DialogStateTimeString").data('moment', timeMoment);
													$("#DialogStateTimeString").AnyPicker({ 
														mode: "datetime",
														rowsNavigation: "scroller",
														showComponentLabel: true,
														theme: "iOS", // "Default", "iOS", "Android", "Windows"
														lang: systemLang,
														onInit: function(){ 
															$("#DialogStateTimeString").data('anypicker', this); 
														},
														dateTimeFormat: _anypickerTimePickerFormat.string,
														inputDateTimeFormat: _anypickerTimeDisplayFormat.string,
														selectedDate: timeMoment.toDate(),
														formatOutput: function (selectedValues){
															var newMoment = _anypickerModifyDateOutput($("#DialogStateTimeString").data('moment'), moment(selectedValues.date));
															$("#DialogStateTimeString").data('moment', newMoment);
															return this.formatOutputDates(newMoment.toDate());
														},
														onSetOutput: function(label, selectedValues){ 
															$("#DialogStateTimeString").trigger('change'); 
														},
														nowButton: {
															markup: "<a id='ap-button-now' class='ap-button'>Now</a>",
															markupContentWindows: "<span class='ap-button-icon ap-icon-now'></span><span class='ap-button-text'>now</span>",
															type: "Button",
															action: function(){ 
																var newMoment = _anypickerModifyDateOutput($("#DialogStateTimeString").data('moment'), moment());
																$("#DialogStateTimeString").data('moment', newMoment);
																$("#DialogStateTimeString").data('anypicker').setSelectedDate(newMoment.toDate());
																$("#DialogStateTimeString").data('anypicker').showOrHidePicker();
																$("#DialogStateTimeString").trigger('change'); 
															}
														},
														viewSections: {
															header: [],
															contentTop: [],
															contentBottom: [],
															footer: ["cancelButton", "nowButton", "setButton"]
														}
													});
													startDistanceTimer = true;
												} else { //period
													$("#DialogStateTimeString").data('moment', timeMoment);
													$("#DialogStateTimeString").val(timeMoment.format(_periodDisplayFormat.string));
													var anypickerDataSourceArray = [[],[],[],[]];
													for(var i = 0; i < 365; i++){ anypickerDataSourceArray[0].push({ label: i.toString(), val: i.toString() }) };
													for(var i = 0; i < 24; i++){ anypickerDataSourceArray[1].push({ label: ("00" + i).slice(-2), val: ("00" + i).slice(-2) }) };
													for(var i = 0; i < 60; i++){ anypickerDataSourceArray[2].push({ label: ("00" + i).slice(-2), val: ("00" + i).slice(-2) }) };
													for(var i = 0; i < 60; i++){ anypickerDataSourceArray[3].push({ label: ("00" + i).slice(-2), val: ("00" + i).slice(-2) }) };
													$("#DialogStateTimeString").AnyPicker({ 
														mode: "select",
														rowsNavigation: "scroller",
														showComponentLabel: true,
														theme: "iOS", // "Default", "iOS", "Android", "Windows"
														lang: systemLang,
														onInit: function(){ 
															$("#DialogStateTimeString").data('anypicker', this); 
														},
														components: [
															{ component: 0,	name: "days", label: _("Days"),	width: "40%", textAlign: "left" }, 
															{ component: 1, name: "hours", label: _("Hours"), width: "20%", textAlign: "right" },
															{ component: 2, name: "minutes", label: _("Minutes"), width: "20%", textAlign: "center" },
															{ component: 3, name: "seconds", label: _("Seconds"), width: "20%", textAlign: "left" }
														],
														dataSource: [
															{ compontent: 0, data: anypickerDataSourceArray[0] },
															{ compontent: 1, data: anypickerDataSourceArray[1] },
															{ compontent: 1, data: anypickerDataSourceArray[2] },
															{ compontent: 1, data: anypickerDataSourceArray[3] }
														],
														parseInput: function(elementValue){
															var elementMoment = $("#DialogStateTimeString").data('moment');
															return [Math.floor(elementMoment.asDays()).toString(), ("00" + elementMoment.hours()).slice(-2), ("00" + elementMoment.minutes()).slice(-2), ("00" + elementMoment.seconds()).slice(-2)];
														},
														formatOutput: function (selectedValues){
															var newMoment = moment.duration({
																days: selectedValues.values[0].val || 0,
																hours: selectedValues.values[1].val || 0,
																minutes: selectedValues.values[2].val || 0,
																seconds: selectedValues.values[3].val || 0
															});
															$("#DialogStateTimeString").data('moment', newMoment);
															return newMoment.format(_periodDisplayFormat.string);
														},
														onSetOutput: function(label, selectedValues){ 
															$("#DialogStateTimeString").trigger('change'); 
														},
														zeroButton: {
															markup: "<a id='ap-button-zero' class='ap-button'>&gt;0&lt;</a>",
															markupContentWindows: "<span class='ap-button-icon ap-icon-now'></span><span class='ap-button-text'>&gt;0&lt;</span>",
															type: "Button",
															action: function(){ 
																var newMoment = moment.duration(0);
																$("#DialogStateTimeString").data('moment', newMoment);
																$("#DialogStateTimeString").val(newMoment.format(_periodDisplayFormat.string));
																$("#DialogStateTimeString").data('anypicker').showOrHidePicker();
																$("#DialogStateTimeString").trigger('change'); 
															}
														},
														viewSections: {
															header: [],
															contentTop: [],
															contentBottom: [],
															footer: ["cancelButton", "zeroButton", "setButton"]
														}
													});
												}
											} else { //Only update time (AnyPicker is already initialized)
												if(_timeFormat.type != "period"){
													$("#DialogStateTimeString").data('moment', timeMoment);
													$("#DialogStateTimeString").data('anypicker').setSelectedDate(timeMoment.toDate());
												} else { //period
													$("#DialogStateTimeString").data('moment', timeMoment);
													$("#DialogStateTimeString").val(timeMoment.format(_periodDisplayFormat.string));
												}
											}
										}									
										//Distance
										var distanceText = "";
										var distanceSeconds = 0;
										if(_timeFormat.type != "period"){
											if(time.val != 0){
												var timeDistanceMoment = $("#DialogStateTimeString").data('moment');
												if(_anypickerTimeDisplayFormat.type == "time" && timeDistanceMoment.toDate().getTime() <= 86400000){
													timeDistanceMoment.year(nowMoment.year()).month(nowMoment.month()).date(nowMoment.date()).add(1, 'd');
												}
												var distanceMoment = moment.duration(timeDistanceMoment.diff(nowMoment));
												distanceSeconds = distanceMoment.asSeconds();
												if(distanceSeconds >= 86400 || distanceSeconds < 0){
													distanceText += distanceMoment.locale(systemLang).humanize(true);
												} else {
													distanceText += distanceMoment.locale(systemLang).humanize(true);
													distanceText += ": " + distanceMoment.format("HH:mm:ss");
												}
											}
										} else {
											distanceSeconds = timeMoment.asSeconds();
										}
										if(distanceText) $("#DialogStateTimeDistance").html("(" + distanceText + ")"); else $("#DialogStateTimeDistance").html("");
										if(_onlyUpdateDistance || startDistanceTimer){ 
											//Special: Call itsself periodicyally to update distance
											if(dialogIdsToUpdateEverySecond.indexOf(_linkedTimeId) == -1) dialogIdsToUpdateEverySecond.push(_linkedTimeId);
										}
										dialogUpdateTimestamp(fetchedStates[_linkedTimeId]);
									}
								};
								dialogUpdateFunctions[_linkedTimeId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogStateTimeString').on('change', function(e) {
										var timeMoment = $("#DialogStateTimeString").data('moment');
										setState(_linkedTimeId, _deviceIdEscaped, timeMoment.format(_timeFormat.string), true);
										dialogUpdateTimestamp(fetchedStates[_linkedTimeId]);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
							break;
						}
					}
					//----Default Level
					if(dialogStates["LEVEL"]){
						switch(dialogStates["LEVEL"].type){
							case "level":
							dialogContentCountAfterHR++;
							var min = dialogStates["LEVEL"].min || 0;
							var max = dialogStates["LEVEL"].max || 100;
							var step = dialogStates["LEVEL"].step || 1;
							var unit = dialogStates["LEVEL"].unit || "";
							if(unit != "" && unit != "°C" && unit != "%") unit = "&nbsp;" + unit;
							var type = "Level";
							var sliderSendRate = 500;
							if(device.commonRole == "iQontrolLight") {
								type = "Dimmer";
							}
							if(device.commonRole == "iQontrolBlind") {
								type = "Height";
								sliderSendRate = 5000;
							}
							type = getDeviceOptionValue(device, "levelCaption") || type;
							dialogContent += "<label for='DialogLevelSlider' ><image src='./images/symbols/slider.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
							dialogContent += "<input type='number' data-type='range' class='iQontrolDialogSlider' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["LEVEL"].readonly || dialogReadonly).toString() + "' data-highlight='true' data-popup-enabled='true' data-show-value='true' name='DialogLevelSlider' id='DialogLevelSlider' min='" + min + "' max='" + max + "' step='" + step + "'/>";
							var levelFavorites = (getDeviceOptionValue(device, "levelFavorites") || "").split(";");
							var levelFavoritesHideSlider = (getDeviceOptionValue(device, "levelFavoritesHideSlider") == "true");
							if(levelFavorites.length > 0 && levelFavorites[0] != "") {
								dialogContent += "<fieldset data-role='controlgroup' data-type='horizontal' style='text-align: center; padding-bottom: 15px;'>"
									for(index in levelFavorites){
										let val = levelFavorites[index];
										dialogContent += "<input type='radio' class='iQontrolDialogCheckboxradio DialogLevelFavoritesCheckboxradio' " + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogLevelFavoritesCheckboxradio' id='DialogLevelFavoritesCheckboxradio_" + index + "' value='" + val + "' data-mini='true'/>";
										dialogContent += "<label for='DialogLevelFavoritesCheckboxradio_" + index + "'>" + val + unit + "</label>";
									}
								dialogContent += "</fieldset>";
							}
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedLevelId = dialogLinkedStateIds["LEVEL"];
								var _sliderSendRate = sliderSendRate;
								var _confirm = (fetchedObjects[_linkedLevelId] && typeof fetchedObjects[_linkedLevelId].common !== udef && typeof fetchedObjects[_linkedLevelId].common.custom !== udef && fetchedObjects[_linkedLevelId].common.custom !== null && typeof fetchedObjects[_linkedLevelId].common.custom[namespace] !== udef && fetchedObjects[_linkedLevelId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedLevelId].common.custom[namespace].confirm !== udef && fetchedObjects[_linkedLevelId].common.custom[namespace].confirm == true);
								var _pincodeSet = (fetchedObjects[_linkedLevelId] && typeof fetchedObjects[_linkedLevelId].common !== udef && typeof fetchedObjects[_linkedLevelId].common.custom !== udef && fetchedObjects[_linkedLevelId].common.custom !== null && typeof fetchedObjects[_linkedLevelId].common.custom[namespace] !== udef && fetchedObjects[_linkedLevelId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedLevelId].common.custom[namespace].pincode !== udef && fetchedObjects[_linkedLevelId].common.custom[namespace].pincode !== "");
								var _levelFavorites = levelFavorites;
								var _levelFavoritesHideSlider = levelFavoritesHideSlider;
								var DialogLevelSliderReadoutTimer;
								var updateFunction = function(){
									var stateLevel = getStateObject(_linkedLevelId);
									if(stateLevel){
										$("#DialogLevelSlider").val(stateLevel.val);
										$("#DialogLevelSlider").slider('refresh');
										dialogUpdateTimestamp(fetchedStates[_linkedLevelId]);
									}
									if(_levelFavorites.length > 0 && levelFavorites[0] != "") {
										if(_levelFavoritesHideSlider && _levelFavorites.indexOf(stateLevel.val.toString()) > -1) $('#DialogStateSlider').parents('div.ui-slider').hide();
										$(".DialogLevelFavoritesCheckboxradio").removeProp("checked");
										$("#DialogLevelFavoritesCheckboxradio_" + _levelFavorites.indexOf(stateLevel.val.toString())).prop("checked", true);
										$(".DialogLevelFavoritesCheckboxradio").checkboxradio('refresh');
									}
								};
								dialogUpdateFunctions[_linkedLevelId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogLevelSlider').slider({
										start: function(event, ui){
											clearInterval(DialogLevelSliderReadoutTimer);
											if(!_confirm && !_pincodeSet) {
												DialogLevelSliderReadoutTimer = setInterval(function(){
													setState(_linkedLevelId, _deviceIdEscaped, $("#DialogLevelSlider").val());
													dialogUpdateTimestamp(fetchedStates[_linkedLevelId]);
												}, _sliderSendRate);
											}
										},
										stop: function(event, ui) {
											clearInterval(DialogLevelSliderReadoutTimer);
											if(_levelFavorites.length > 0 && levelFavorites[0] != "") {
												$(".DialogLevelFavoritesCheckboxradio").removeProp("checked");
												$("#DialogLevelFavoritesCheckboxradio_" + _levelFavorites.indexOf($("#DialogLevelSlider").val())).prop("checked", true);
												$(".DialogLevelFavoritesCheckboxradio").checkboxradio('refresh');
											}
											setState(_linkedLevelId, _deviceIdEscaped, $("#DialogLevelSlider").val());
											dialogUpdateTimestamp(fetchedStates[_linkedLevelId]);
										}
									});
									if(levelFavorites.length > 0 && levelFavorites[0] != "") {
										$("input[name='DialogLevelFavoritesCheckboxradio']").on('change', function(e) {
											clearInterval(DialogLevelSliderReadoutTimer);
											$("#DialogLevelSlider").val($("input[name='DialogLevelFavoritesCheckboxradio']:checked").val() * 1);
											$("#DialogLevelSlider").slider('refresh');
											setState(_linkedLevelId, _deviceIdEscaped, $("input[name='DialogLevelFavoritesCheckboxradio']:checked").val() * 1);
											dialogUpdateTimestamp(fetchedStates[_linkedLevelId]);
										});	
									}
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
							break;

							case "valueList":
							dialogContentCountAfterHR++;
							var type = getDeviceOptionValue(device, "levelCaption") || "Selection";
							dialogContent += "<label for='DialogLevelValueList' ><image src='./images/symbols/variable.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
							dialogContent += "<select  class='iQontrolDialogValueList DialogLevelValueList' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["LEVEL"].readonly || dialogReadonly).toString() + "' name='DialogLevelValueList' id='DialogLevelValueList' data-native-menu='false'>";
							for(val in dialogStates["LEVEL"].valueList){
								if(dialogStates["LEVEL"].targetValues && dialogStates["LEVEL"].custom.showOnlyTargetValues && !dialogStates["LEVEL"].targetValues.hasOwnProperty(val)) continue; //Show only targetValues
								dialogContent += "<option value='" + val + "'>" + _(dialogStates["LEVEL"].valueList[val]) + "</option>";
							}
							if(dialogStates["LEVEL"].custom.statesAddInput) {
								dialogContent += "<option value='[INPUT]'>" + (dialogStates["LEVEL"].custom.statesAddInputCaption || _("Enter other value...")) + "</option>";
							}
							dialogContent += "</select>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedLevelId = dialogLinkedStateIds["LEVEL"];
								var updateFunction = function(){
									var level = getStateObject(_linkedLevelId);
									if(level){
										if(typeof level.val != udef) {
											var val = level.val.toString();
											$("#DialogLevelValueList").val(val).selectmenu('refresh');
											if($("#DialogLevelValueList").val() !== val){ //val is not in option-list
												if(level.valueList && typeof level.valueList[val] !== udef){
													$("#DialogLevelValueList").prev("span").html(level.valueList[val]);
												} else {
													$("#DialogLevelValueList").prev("span").html(val + "&nbsp;");
												}
											}
										}
										dialogUpdateTimestamp(fetchedStates[_linkedLevelId]);
									}
								};
								dialogUpdateFunctions[_linkedLevelId].push(updateFunction);
								var bindingFunction = function(){
									$('.DialogLevelValueList').on('change', function(e) {
										var val = $("#DialogLevelValueList option:selected").val();
										if(val == "[INPUT]") {
											val = prompt((dialogStates["LEVEL"].custom.statesAddInputCaption || _("Enter other value...")));
											if(val == null) {
												updateState(_linkedLevelId);
												return;
											}
											$("#DialogLevelValueList").prev("span").html(val + "&nbsp;");
										}
										setState(_linkedLevelId, _deviceIdEscaped, val);
										dialogUpdateTimestamp(fetchedStates[_linkedLevelId]);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
							break;
						}
					}
				}
				//----Timestamp
				dialogContent += "<img class='iQontrolDialogTimestampSwitch show' style='display:none' src='./images/timestamp_show.png'>";
				dialogContent += "<img class='iQontrolDialogTimestampSwitch hide' style='display:none' src='./images/timestamp_hide.png'>";
				dialogContent += "<div id='DialogTimestamp' style='display: none;' data-timestamp='' data-iQontrol-Device-ID='" + deviceIdEscaped + "'>";
				dialogContent += "	<span class='small'>" + _("Last change:") + "&nbsp;</span><span id='DialogTimestampText' class='small' data-iQontrol-Device-ID='" + deviceIdEscaped + "'></span>";
				dialogContent += "</div>"; //The Timestamp itself is updated via the dialogUpdateTimestamp-Function

				//--Additional Content
				switch(device.commonRole){
					case "iQontrolDateAndTime":
					//----Subject
					if(dialogStates["SUBJECT"]){
						switch(dialogStates["SUBJECT"].type){
							case "valueList":
							dialogContentCountAfterHR++;
							var type = getDeviceOptionValue(device, "subjectCaption") || "Description";
							dialogContent += "<br>";
							dialogContent += "<label for='DialogSubjectValueList' ><image src='./images/symbols/variable.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
							dialogContent += "<select  class='iQontrolDialogValueList DialogSubjectValueList' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["SUBJECT"].readonly || dialogReadonly).toString() + "' name='DialogSubjectValueList' id='DialogSubjectValueList' data-native-menu='false'>";
							for(val in dialogStates["SUBJECT"].valueList){
								if(dialogStates["SUBJECT"].targetValues && dialogStates["SUBJECT"].custom.showOnlyTargetValues && !dialogStates["SUBJECT"].targetValues.hasOwnProperty(val)) continue; //Show only targetValues
								dialogContent += "<option value='" + val + "'>" + _(dialogStates["SUBJECT"].valueList[val]) + "</option>";
							}
							if(dialogStates["SUBJECT"].custom.statesAddInput) {
								dialogContent += "<option value='[INPUT]'>" + (dialogStates["SUBJECT"].custom.statesAddInputCaption || _("Enter other value...")) + "</option>";
							}
							dialogContent += "</select>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedSubjectId = dialogLinkedStateIds["SUBJECT"];
								var updateFunction = function(){
									var subject = getStateObject(_linkedSubjectId);
									if(subject){
										if(typeof subject.val != udef) {
											var val = subject.val.toString();
											$("#DialogSubjectValueList").val(val).selectmenu('refresh');
											if($("#DialogSubjectValueList").val() !== val){ //val is not in option-list
												if(subject.valueList && typeof subject.valueList[val] !== udef){
													$("#DialogSubjectValueList").prev("span").html(subject.valueList[val]);
												} else {
													$("#DialogSubjectValueList").prev("span").html(val + "&nbsp;");
												}
											}
										}
										dialogUpdateTimestamp(fetchedStates[_linkedSubjectId]);
									}
								};
								dialogUpdateFunctions[_linkedSubjectId].push(updateFunction);
								var bindingFunction = function(){
									$('.DialogSubjectValueList').on('change', function(e) {
										var val = $("#DialogSubjectValueList option:selected").val();
										if(val == "[INPUT]") {
											val = prompt((dialogStates["SUBJECT"].custom.statesAddInputCaption || _("Enter other value...")));
											if(val == null) {
												updateState(_linkedSubjectId);
												return;
											}
											$("#DialogSubjectValueList").prev("span").html(val + "&nbsp;");
										}
										setState(_linkedSubjectId, _deviceIdEscaped, val);
										dialogUpdateTimestamp(fetchedStates[_linkedSubjectId]);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
							break;

							case "string": default:
							dialogContentCountAfterHR++;
							var type = getDeviceOptionValue(device, "subjectCaption") || "Description";
							dialogContent += "<br>";
							dialogContent += "<label for='DialogSubjectString' ><image src='./images/symbols/variable.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
							dialogContent += "<textarea class='iQontrolDialogString' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["SUBJECT"].readonly || dialogReadonly).toString() + "' name='DialogSubjectString' id='DialogSubjectString'></textarea>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedSubjectId = dialogLinkedStateIds["SUBJECT"];
								var updateFunction = function(){
									var subject = getStateObject(_linkedSubjectId);
									if(subject){
										if($("#DialogSubjectString").parent('.jqte_source').length == 0){
											$("#DialogSubjectString").val(subject.val);
											$("#DialogSubjectString").textinput('refresh');
										} else {
											$("#DialogSubjectString").jqteVal(subject.val);
										}
										dialogUpdateTimestamp(fetchedStates[_linkedSubjectId]);
									}
								};
								dialogUpdateFunctions[_linkedSubjectId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogSubjectString').on('change', function(e) {
										setState(_linkedSubjectId, _deviceIdEscaped, $("#DialogSubjectString").val(), true);
										dialogUpdateTimestamp(fetchedStates[_linkedSubjectId]);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
							break;
						}
					}
					//----Time
					if(dialogStates["TIME"]){
						var timeFormat = getTimeFormat((getDeviceOptionValue(device, "timeFormat", true) != "~" && getDeviceOptionValue(device, "timeFormat", true)) || (dialogStates["TIME"].custom && dialogStates["TIME"].custom.timeFormat) || "x");
						var timeDisplayFormat = getTimeFormat((getDeviceOptionValue(device, "timeDisplayFormat", true) != "~" && getDeviceOptionValue(device, "timeDisplayFormat", true)) || (dialogStates["TIME"].custom && dialogStates["TIME"].custom.timeDisplayFormat) || "dddd, DD.MM.YYYY HH:mm:ss");
						var timeDisplayDontShowDistance = ((getDeviceOptionValue(device, "timeDisplayDontShowDistance", true) || (dialogStates["TIME"].custom && dialogStates["TIME"].custom.timeDisplayDontShowDistance ? "true" : "false")) == "true");
						var isPeriod = (timeFormat.type == "period");
						var type = getDeviceOptionValue(device, "timeCaption") || (isPeriod ? "Duration" : (dialogStates["SECOND_TIME"] ? "Start-Time" : "Time"));
						if(dialogContentCountAfterHR > 0) dialogContent += "<hr>";
						dialogContentCountAfterHR++;
						dialogContent += "<label for='DialogTimeString' ><image src='./images/symbols/time.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
						dialogContent += "<input class='iQontrolDialogTime' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["TIME"].readonly || dialogReadonly).toString() + "' name='DialogTimeString' id='DialogTimeString' readonly/>";
						dialogContent += "<div class='iQontrolDialogTimeDistance small' data-iQontrol-Device-ID='" + deviceIdEscaped + "' id='DialogTimeDistance'></div>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _device = device;
							var _linkedTimeId = dialogLinkedStateIds["TIME"];
							var _timeFormat = timeFormat;
							var _timeDisplayFormat = timeDisplayFormat;
							var _periodDisplayFormat = getTimeFormat(replaceTokens(_timeDisplayFormat.string, momentToDurationDisplayFormatTokens));
							var _anypickerTimeDisplayFormat = getTimeFormat(replaceTokens(_timeDisplayFormat.string, momentToAnypickerDisplayFormatTokens), "AnyPickerMode");
							var _anypickerTimePickerFormat = getTimeFormat(replaceTokens(_anypickerTimeDisplayFormat.string, anypickerDisplayFormatToAnypickerPickerFormatTokens), "AnyPickerMode");
							if(_timeFormat.type == "date") _anypickerTimePickerFormat.string = _anypickerTimePickerFormat.string.replace(/[hHaAms]/g, "");
							if(_timeFormat.type == "time") _anypickerTimePickerFormat.string = _anypickerTimePickerFormat.string.replace(/[yMd]/g, "");
							var _anypickerModifyDateOutput = function(oldMoment, newMoment){
								var nowMoment = moment();
								if(_timeFormat.type == "date"){
									newMoment.hour(0).minute(0).second(0).millisecond(0);
								} else if(_timeFormat.type == "time"){
									newMoment.year(1970).month(0).date(1); //Unix: 01.01.1970 = timestamp 0
								} else if(_timeFormat.type == "datetime" && _anypickerTimeDisplayFormat.flags.indexOf("to") == -1){
									if(_anypickerTimeDisplayFormat.type == "date"){
										if(_anypickerTimeDisplayFormat.flags.indexOf("tn") > -1){
											newMoment.hour(nowMoment.hour()).minute(nowMoment.minute()).second(nowMoment.second()).millisecond(0);
										} else {
											newMoment.hour(0).minute(0).second(0).millisecond(0);
										}
									} else if(_anypickerTimeDisplayFormat.type == "time"){
										if(_anypickerTimePickerFormat.flags.indexOf("tb") > -1) {
											newMoment.year(1970).month(0).date(1); //Unix: 01.01.1970 = timestamp 0
										} else if(_anypickerTimePickerFormat.flags.indexOf("tn") > -1) {
											newMoment.year(nowMoment.year()).month(nowMoment.month()).date(nowMoment.date()).add(1, 'd');
										} else if(oldMoment.toDate().getTime() > 86400000) {
											newMoment.year(nowMoment.year()).month(nowMoment.month()).date(nowMoment.date()).add(1, 'd');
										} else {
											newMoment.year(1970).month(0).date(1); //Unix: 01.01.1970 = timestamp 0
										}										
									}
								}
								return newMoment;
							}
							var updateFunction = function(_stateId, _onlyUpdateDistance){
								var time = getStateObject(_linkedTimeId);
								var startDistanceTimer = false;
								if(time){
									var nowMoment = moment(new Date());
									if(!(time && typeof time.val != udef)) time = {val: 0};
									if(_timeFormat.type == "period"){
										var timeMoment = moment.duration(time.val, _timeFormat.string);
									} else {
										var timeMoment = moment(time.val, _timeFormat.string);
									}
									if(!timeMoment.isValid()) timeMoment = moment(0);
									if(_timeFormat.type == "time" && timeMoment.format("DD.MM.YYYY") == nowMoment.format("DD.MM.YYYY")){
										timeMoment.year(1970).month(0).date(1);
									}									
									if(!_onlyUpdateDistance){
										if(typeof $("#DialogTimeString").data('anypicker') == udef){ //Init AnyPicker
											if(_timeFormat.type != "period"){
												$("#DialogTimeString").data('moment', timeMoment);
												$("#DialogTimeString").AnyPicker({ 
													mode: "datetime",
													rowsNavigation: "scroller",
													showComponentLabel: true,
													theme: "iOS", // "Default", "iOS", "Android", "Windows"
													lang: systemLang,
													onInit: function(){ 
														$("#DialogTimeString").data('anypicker', this); 
													},
													dateTimeFormat: _anypickerTimePickerFormat.string,
													inputDateTimeFormat: _anypickerTimeDisplayFormat.string,
													selectedDate: timeMoment.toDate(),
													formatOutput: function (selectedValues){
														var newMoment = _anypickerModifyDateOutput($("#DialogTimeString").data('moment'), moment(selectedValues.date));
														$("#DialogTimeString").data('moment', newMoment);
														return this.formatOutputDates(newMoment.toDate());
													},
													onSetOutput: function(label, selectedValues){ 
														$("#DialogTimeString").trigger('change'); 
													},
													nowButton: {
														markup: "<a id='ap-button-now' class='ap-button'>Now</a>",
														markupContentWindows: "<span class='ap-button-icon ap-icon-now'></span><span class='ap-button-text'>now</span>",
														type: "Button",
														action: function(){ 
															var newMoment = _anypickerModifyDateOutput($("#DialogTimeString").data('moment'), moment());
															$("#DialogTimeString").data('moment', newMoment);
															$("#DialogTimeString").data('anypicker').setSelectedDate(newMoment.toDate());
															$("#DialogTimeString").data('anypicker').showOrHidePicker();
															$("#DialogTimeString").trigger('change'); 
														}
													},
													viewSections: {
														header: [],
														contentTop: [],
														contentBottom: [],
														footer: ["cancelButton", "nowButton", "setButton"]
													}
												});
												startDistanceTimer = true;
											} else { //period
												$("#DialogTimeString").data('moment', timeMoment);
												$("#DialogTimeString").val(timeMoment.format(_periodDisplayFormat.string));
												var anypickerDataSourceArray = [[],[],[],[]];
												for(var i = 0; i < 365; i++){ anypickerDataSourceArray[0].push({ label: i.toString(), val: i.toString() }) };
												for(var i = 0; i < 24; i++){ anypickerDataSourceArray[1].push({ label: ("00" + i).slice(-2), val: ("00" + i).slice(-2) }) };
												for(var i = 0; i < 60; i++){ anypickerDataSourceArray[2].push({ label: ("00" + i).slice(-2), val: ("00" + i).slice(-2) }) };
												for(var i = 0; i < 60; i++){ anypickerDataSourceArray[3].push({ label: ("00" + i).slice(-2), val: ("00" + i).slice(-2) }) };
												$("#DialogTimeString").AnyPicker({ 
													mode: "select",
													rowsNavigation: "scroller",
													showComponentLabel: true,
													theme: "iOS", // "Default", "iOS", "Android", "Windows"
													lang: systemLang,
													onInit: function(){ 
														$("#DialogTimeString").data('anypicker', this); 
													},
													components: [
														{ component: 0,	name: "days", label: _("Days"),	width: "40%", textAlign: "left" }, 
														{ component: 1, name: "hours", label: _("Hours"), width: "20%", textAlign: "right" },
														{ component: 2, name: "minutes", label: _("Minutes"), width: "20%", textAlign: "center" },
														{ component: 3, name: "seconds", label: _("Seconds"), width: "20%", textAlign: "left" }
													],
													dataSource: [
														{ compontent: 0, data: anypickerDataSourceArray[0] },
														{ compontent: 1, data: anypickerDataSourceArray[1] },
														{ compontent: 1, data: anypickerDataSourceArray[2] },
														{ compontent: 1, data: anypickerDataSourceArray[3] }
													],
													parseInput: function(elementValue){
														var elementMoment = $("#DialogTimeString").data('moment');
														return [Math.floor(elementMoment.asDays()).toString(), ("00" + elementMoment.hours()).slice(-2), ("00" + elementMoment.minutes()).slice(-2), ("00" + elementMoment.seconds()).slice(-2)];
													},
													formatOutput: function (selectedValues){
														var newMoment = moment.duration({
															days: selectedValues.values[0].val || 0,
															hours: selectedValues.values[1].val || 0,
															minutes: selectedValues.values[2].val || 0,
															seconds: selectedValues.values[3].val || 0
														});
														$("#DialogTimeString").data('moment', newMoment);
														return newMoment.format(_periodDisplayFormat.string);
													},
													onSetOutput: function(label, selectedValues){ 
														$("#DialogTimeString").trigger('change'); 
													},
													zeroButton: {
														markup: "<a id='ap-button-zero' class='ap-button'>&gt;0&lt;</a>",
														markupContentWindows: "<span class='ap-button-icon ap-icon-now'></span><span class='ap-button-text'>&gt;0&lt;</span>",
														type: "Button",
														action: function(){ 
															var newMoment = moment.duration(0);
															$("#DialogTimeString").data('moment', newMoment);
															$("#DialogTimeString").val(newMoment.format(_periodDisplayFormat.string));
															$("#DialogTimeString").data('anypicker').showOrHidePicker();
															$("#DialogTimeString").trigger('change'); 
														}
													},
													viewSections: {
														header: [],
														contentTop: [],
														contentBottom: [],
														footer: ["cancelButton", "zeroButton", "setButton"]
													}
												});
											}
										} else { //Only update time (AnyPicker is already initialized)
											if(_timeFormat.type != "period"){
												$("#DialogTimeString").data('moment', timeMoment);
												$("#DialogTimeString").data('anypicker').setSelectedDate(timeMoment.toDate());
											} else { //period
												$("#DialogTimeString").data('moment', timeMoment);
												$("#DialogTimeString").val(timeMoment.format(_periodDisplayFormat.string));
											}
										}
									}									
									//Distance
									var distanceText = "";
									var distanceSeconds = 0;
									if(_timeFormat.type != "period"){
										if(time.val != 0){
											var timeDistanceMoment = $("#DialogTimeString").data('moment');
											if(_anypickerTimeDisplayFormat.type == "time" && timeDistanceMoment.toDate().getTime() <= 86400000){
												timeDistanceMoment.year(nowMoment.year()).month(nowMoment.month()).date(nowMoment.date()).add(1, 'd');
											}
											var distanceMoment = moment.duration(timeDistanceMoment.diff(nowMoment));
											distanceSeconds = distanceMoment.asSeconds();
											if(distanceSeconds >= 86400 || distanceSeconds < 0){
												distanceText += distanceMoment.locale(systemLang).humanize(true);
											} else {
												distanceText += distanceMoment.locale(systemLang).humanize(true);
												distanceText += ": " + distanceMoment.format("HH:mm:ss");
											}
										}
									} else {
										distanceSeconds = timeMoment.asSeconds();
									}
									if(distanceText && !timeDisplayDontShowDistance) $("#DialogTimeDistance").html("(" + distanceText + ")"); else $("#DialogTimeDistance").html("");
									if(_onlyUpdateDistance || startDistanceTimer){ 
										//Special: Call itsself periodicyally to update distance
										if(dialogIdsToUpdateEverySecond.indexOf(_linkedTimeId) == -1) dialogIdsToUpdateEverySecond.push(_linkedTimeId);
									}
									dialogUpdateTimestamp(fetchedStates[_linkedTimeId]);
								}
							};
							dialogUpdateFunctions[_linkedTimeId].push(updateFunction);
							var bindingFunction = function(){
								$('#DialogTimeString').on('change', function(e) {
									var timeMoment = $("#DialogTimeString").data('moment');
									setState(_linkedTimeId, _deviceIdEscaped, timeMoment.format(_timeFormat.string), true);
									dialogUpdateTimestamp(fetchedStates[_linkedTimeId]);
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}
					break;

					case "iQontrolLight":
					//----ColorPicker
					var alternativeColorspace = getDeviceOptionValue(device, "alternativeColorspace") || null;
					if(dialogStates["HUE"] && typeof dialogStates["HUE"].val !== udef){
						var min = dialogStates["HUE"] && dialogStates["HUE"].min || 0;
						var max = dialogStates["HUE"] && dialogStates["HUE"].max || 359;
						var step = dialogStates["HUE"] && dialogStates["HUE"].step || 1;
						if(dialogContentCountAfterHR > 0) dialogContent += "<hr>";
						dialogContentCountAfterHR++;
						dialogContent += "<label for='DialogHueSlider' ><image src='./images/symbols/color.png' / style='width:16px; height:16px;'>&nbsp;" + _("Color") + ":</label>";
						dialogContent += "<input type='number' data-type='range' class='iQontrolDialogSlider colorPicker' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + ((dialogStates["HUE"] && dialogStates["HUE"].readonly) || (dialogStates["ALTERNATIVE_COLORSPACE_VALUE"] && dialogStates["ALTERNATIVE_COLORSPACE_VALUE"].readonly) || dialogReadonly).toString() + "' data-highlight='false' data-popup-enabled='true' data-show-value='true' name='DialogHueSlider' id='DialogHueSlider' min='" + min + "' max='" + max + "' step='" + step + "'/>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedHueId = dialogLinkedStateIds["HUE"];
							var _confirm = (fetchedObjects[_linkedHueId] && typeof fetchedObjects[_linkedHueId].common !== udef && typeof fetchedObjects[_linkedHueId].common.custom !== udef && fetchedObjects[_linkedHueId].common.custom !== null && typeof fetchedObjects[_linkedHueId].common.custom[namespace] !== udef && typeof fetchedObjects[_linkedHueId].common.custom[namespace].confirm !== udef && fetchedObjects[_linkedHueId].common.custom[namespace].confirm !== null && fetchedObjects[_linkedHueId].common.custom[namespace].confirm == true);
							var _pincodeSet = (fetchedObjects[_linkedHueId] && typeof fetchedObjects[_linkedHueId].common !== udef && typeof fetchedObjects[_linkedHueId].common.custom !== udef && fetchedObjects[_linkedHueId].common.custom !== null && typeof fetchedObjects[_linkedHueId].common.custom[namespace] !== udef && typeof fetchedObjects[_linkedHueId].common.custom[namespace].pincode !== udef && fetchedObjects[_linkedHueId].common.custom[namespace].confirm !== null && fetchedObjects[_linkedHueId].common.custom[namespace].pincode !== "");
							var DialogHueSliderReadoutTimer;
							var DialogHueSliderReadoutTimer2;
							var updateFunction = function(){
								var stateHue = getStateObject(_linkedHueId);
								if(stateHue && typeof stateHue.val !== udef){
									$("#DialogHueSlider").val(stateHue.val);
									$("#DialogHueSlider").slider('refresh');
								}
							};
							if(_linkedHueId) dialogUpdateFunctions[_linkedHueId].push(updateFunction);
							var bindingFunction = function(){
								$('#DialogHueSlider').slider({
									start: function(event, ui){
										clearInterval(DialogHueSliderReadoutTimer);
										clearInterval(DialogHueSliderReadoutTimer2);
										if(!_confirm && !_pincodeSet){
											DialogHueSliderReadoutTimer = setInterval(function(){
												if(_linkedHueId && _linkedHueId !== ""){
													setState(_linkedHueId, _deviceIdEscaped, $("#DialogHueSlider").val());
												}
											}, 500);
										}
										//Update ColorSaturationPicker-Slider linear-gradient immediatly
										DialogHueSliderReadoutTimer2 = setInterval(function(){
											var hueMin = dialogStates["HUE"] && dialogStates["HUE"].min || 0;
											var hueMax = dialogStates["HUE"] && dialogStates["HUE"].max || 359;
											var hue = (($("#DialogHueSlider").val() - hueMin) / (hueMax - hueMin)) * 359;
											$("#DialogSaturationSlider + .ui-slider-track").attr('style', 'background-image: linear-gradient(to right, white, hsl(' + parseInt(hue) + ', 100%, 50%)) !important;');
										}, 50);
									},
									stop: function(event, ui) {
										clearInterval(DialogHueSliderReadoutTimer);
										clearInterval(DialogHueSliderReadoutTimer2);
										if(_linkedHueId && _linkedHueId !== ""){
											setState(_linkedHueId, _deviceIdEscaped, $("#DialogHueSlider").val());
										}
									}
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}
					//----ColorSaturationPicker
					if(dialogStates["SATURATION"] && typeof dialogStates["SATURATION"].val !== udef && dialogStates["HUE"] && typeof dialogStates["HUE"].val !== udef){
						dialogContentCountAfterHR++;
						var min = dialogStates["SATURATION"] && dialogStates["SATURATION"].min || 0;
						var max = dialogStates["SATURATION"] && dialogStates["SATURATION"].max || 100;
						var step = dialogStates["SATURATION"] && dialogStates["SATURATION"].step || 1;
						dialogContent += "<label for='DialogSaturationSlider' ><image src='./images/symbols/saturation.png' / style='width:16px; height:16px;'>&nbsp;" + _("Saturation") + ":</label>";
						dialogContent += "<input type='number' data-type='range' class='iQontrolDialogSlider colorSaturationPicker' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + ((dialogStates["SATURATION"] && dialogStates["SATURATION"].readonly) || (dialogStates["ALTERNATIVE_COLORSPACE_VALUE"] && dialogStates["ALTERNATIVE_COLORSPACE_VALUE"].readonly) || dialogReadonly).toString() + "' data-highlight='false' data-popup-enabled='true' data-show-value='true' name='DialogSaturationSlider' id='DialogSaturationSlider' min='" + min + "' max='" + max + "' step='1'/>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedHueId = dialogLinkedStateIds["HUE"];
							var _linkedSaturationId = dialogLinkedStateIds["SATURATION"];
							var _confirm = (fetchedObjects[_linkedSaturationId] && typeof fetchedObjects[_linkedSaturationId].common !== udef && typeof fetchedObjects[_linkedSaturationId].common.custom !== udef && fetchedObjects[_linkedSaturationId].common.custom !== null && typeof fetchedObjects[_linkedSaturationId].common.custom[namespace] !== udef && fetchedObjects[_linkedSaturationId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedSaturationId].common.custom[namespace].confirm !== udef && fetchedObjects[_linkedSaturationId].common.custom[namespace].confirm == true);
							var _pincodeSet = (fetchedObjects[_linkedSaturationId] && typeof fetchedObjects[_linkedSaturationId].common !== udef && typeof fetchedObjects[_linkedSaturationId].common.custom !== udef && fetchedObjects[_linkedSaturationId].common.custom !== null && typeof fetchedObjects[_linkedSaturationId].common.custom[namespace] !== udef && fetchedObjects[_linkedSaturationId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedSaturationId].common.custom[namespace].pincode !== udef && fetchedObjects[_linkedSaturationId].common.custom[namespace].pincode !== "");
							var DialogSaturationSliderReadoutTimer;
							var updateFunction = function(){
								var stateSaturation = getStateObject(_linkedSaturationId);
								if(stateSaturation && typeof stateSaturation.val !== udef){
									$("#DialogSaturationSlider").val(stateSaturation.val);
									$("#DialogSaturationSlider").slider('refresh');
								}
							};
							if(_linkedSaturationId) dialogUpdateFunctions[_linkedSaturationId].push(updateFunction);
							var updateHueFunction = function(){
								var stateHue = getStateObject(_linkedHueId);
								var hueMin = stateHue && stateHue.min || 0;
								var hueMax = stateHue && stateHue.max || 359;
								if(stateHue && typeof stateHue.val !== udef){
									var hue = ((stateHue.val - hueMin) / (hueMax - hueMin)) * 359;
									$("#DialogSaturationSlider + .ui-slider-track").attr('style', 'background-image: linear-gradient(to right, white, hsl(' + parseInt(hue) + ', 100%, 50%)) !important;');
								} else {
									$("#DialogSaturationSlider + .ui-slider-track").attr('style', '');
								}
							};
							if(_linkedHueId) dialogUpdateFunctions[_linkedHueId].push(updateHueFunction);
							var bindingFunction = function(){
								$('#DialogSaturationSlider').slider({
									start: function(event, ui){
										clearInterval(DialogSaturationSliderReadoutTimer);
										if(!_confirm && !_pincodeSet){
											DialogSaturationSliderReadoutTimer = setInterval(function(){
												if(_linkedSaturationId && _linkedSaturationId !== ""){
													setState(_linkedSaturationId, _deviceIdEscaped, $("#DialogSaturationSlider").val());
												}
											}, 500);
										}
									},
									stop: function(event, ui) {
										clearInterval(DialogSaturationSliderReadoutTimer);
										if(_linkedSaturationId && _linkedSaturationId !== ""){
											setState(_linkedSaturationId, _deviceIdEscaped, $("#DialogSaturationSlider").val());
										}
									}
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}
					//----ColorBrightness
					if(dialogStates["COLOR_BRIGHTNESS"] && typeof dialogStates["COLOR_BRIGHTNESS"].val !== udef  && ((dialogStates["WHITE_BRIGHTNESS"] && typeof dialogStates["WHITE_BRIGHTNESS"].val !== udef) || (!dialogStates["LEVEL"] || typeof dialogStates["LEVEL"].val == udef))){ //brightness is only necessary, if the light has color and white brightness or if .LEVEL absent - otherwise the level ist regulated via .LEVEL
						dialogContentCountAfterHR++;
						var min = dialogStates["COLOR_BRIGHTNESS"] && dialogStates["COLOR_BRIGHTNESS"].min || 0;
						var max = dialogStates["COLOR_BRIGHTNESS"] && dialogStates["COLOR_BRIGHTNESS"].max || 100;
						var step = dialogStates["COLOR_BRIGHTNESS"] && dialogStates["COLOR_BRIGHTNESS"].step || 1;
						dialogContent += "<label for='DialogColorBrightnessSlider' ><image src='./images/symbols/slider.png' / style='width:16px; height:16px;'>&nbsp;" + _("Brightness of color") + ":</label>";
						dialogContent += "<input type='number' data-type='range' class='iQontrolDialogSlider' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + ((dialogStates["COLOR_BRIGHTNESS"] && dialogStates["COLOR_BRIGHTNESS"].readonly) || (dialogStates["ALTERNATIVE_COLORSPACE_VALUE"] && dialogStates["ALTERNATIVE_COLORSPACE_VALUE"].readonly) || dialogReadonly).toString() + "' data-highlight='true' data-popup-enabled='true' data-show-value='true' name='DialogColorBrightnessSlider' id='DialogColorBrightnessSlider' min='" + min + "' max='" + max + "' step='1'/>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedColorBrightnessId = dialogLinkedStateIds["COLOR_BRIGHTNESS"];
							var _confirm = (fetchedObjects[_linkedColorBrightnessId] && typeof fetchedObjects[_linkedColorBrightnessId].common !== udef && typeof fetchedObjects[_linkedColorBrightnessId].common.custom !== udef && fetchedObjects[_linkedColorBrightnessId].common.custom !== null && typeof fetchedObjects[_linkedColorBrightnessId].common.custom[namespace] !== udef && fetchedObjects[_linkedColorBrightnessId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedColorBrightnessId].common.custom[namespace].confirm !== udef && fetchedObjects[_linkedColorBrightnessId].common.custom[namespace].confirm == true);
							var _pincodeSet = (fetchedObjects[_linkedColorBrightnessId] && typeof fetchedObjects[_linkedColorBrightnessId].common !== udef && typeof fetchedObjects[_linkedColorBrightnessId].common.custom !== udef && fetchedObjects[_linkedColorBrightnessId].common.custom !== null && typeof fetchedObjects[_linkedColorBrightnessId].common.custom[namespace] !== udef && fetchedObjects[_linkedColorBrightnessId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedColorBrightnessId].common.custom[namespace].pincode !== udef && fetchedObjects[_linkedColorBrightnessId].common.custom[namespace].pincode !== "");
							var DialogColorBrightnessSliderReadoutTimer;
							var updateFunction = function(){
								var stateColorBrightness = getStateObject(_linkedColorBrightnessId);
								if(stateColorBrightness && typeof stateColorBrightness.val !== udef){
									$("#DialogColorBrightnessSlider").val(stateColorBrightness.val);
									$("#DialogColorBrightnessSlider").slider('refresh');
								}
							};
							if(_linkedColorBrightnessId) dialogUpdateFunctions[_linkedColorBrightnessId].push(updateFunction);
							var bindingFunction = function(){
								$('#DialogColorBrightnessSlider').slider({
									start: function(event, ui){
										clearInterval(DialogColorBrightnessSliderReadoutTimer);
										if(!_confirm && !_pincodeSet){
											DialogColorBrightnessSliderReadoutTimer = setInterval(function(){
												if(_linkedColorBrightnessId && _linkedColorBrightnessId !== ""){
													setState(_linkedColorBrightnessId, _deviceIdEscaped, $("#DialogColorBrightnessSlider").val());
												}
											}, 500);
										}
									},
									stop: function(event, ui) {
										clearInterval(DialogColorBrightnessSliderReadoutTimer);
										if(_linkedColorBrightnessId && _linkedColorBrightnessId !== ""){
											setState(_linkedColorBrightnessId, _deviceIdEscaped, $("#DialogColorBrightnessSlider").val());
										}
									}
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}
					//----ColorTemperaturePicker
					if(dialogStates["CT"]  && typeof dialogStates["CT"].val !== udef){
						var min = dialogStates["CT"] && dialogStates["CT"].min || 0;
						var max = dialogStates["CT"] && dialogStates["CT"].max || 100;
						var step = dialogStates["CT"] && dialogStates["CT"].step || 1;
						var invertCt = false;
						if(getDeviceOptionValue(device, "invertCt") == "true") invertCt = !invertCt;
						if(dialogContentCountAfterHR > 0) dialogContent += "<hr>";
						dialogContentCountAfterHR++;
						dialogContent += "<label for='DialogCtSlider' ><image src='./images/symbols/colortemperature.png' / style='width:16px; height:16px;'>&nbsp;" + _("Color-Temperature") + ":</label>";
						dialogContent += "<input type='number' data-type='range' class='iQontrolDialogSlider colorTemperaturePicker" + (invertCt?" invert":"") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + ((dialogStates["CT"] && dialogStates["CT"].readonly) || (dialogStates["ALTERNATIVE_COLORSPACE_VALUE"] && dialogStates["ALTERNATIVE_COLORSPACE_VALUE"].readonly) || dialogReadonly).toString() + "' data-highlight='false' data-popup-enabled='true' data-show-value='true' name='DialogCtSlider' id='DialogCtSlider' min='" + min + "' max='" + max + "' step='1'/>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedCtId = dialogLinkedStateIds["CT"];
							var _confirm = (fetchedObjects[_linkedCtId] && typeof fetchedObjects[_linkedCtId].common !== udef && typeof fetchedObjects[_linkedCtId].common.custom !== udef && fetchedObjects[_linkedCtId].common.custom !== null && typeof fetchedObjects[_linkedCtId].common.custom[namespace] !== udef && fetchedObjects[_linkedCtId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedCtId].common.custom[namespace].confirm !== udef && fetchedObjects[_linkedCtId].common.custom[namespace].confirm == true);
							var _pincodeSet = (fetchedObjects[_linkedCtId] && typeof fetchedObjects[_linkedCtId].common !== udef && typeof fetchedObjects[_linkedCtId].common.custom !== udef && fetchedObjects[_linkedCtId].common.custom !== null && typeof fetchedObjects[_linkedCtId].common.custom[namespace] !== udef && fetchedObjects[_linkedCtId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedCtId].common.custom[namespace].pincode !== udef && fetchedObjects[_linkedCtId].common.custom[namespace].pincode !== "");
							var DialogCtSliderReadoutTimer;
							var updateFunction = function(){
								var stateCt = getStateObject(_linkedCtId);
								if(stateCt && typeof stateCt.val !== udef){
									$("#DialogCtSlider").val(stateCt.val);
									$("#DialogCtSlider").slider('refresh');
								}
							};
							if(_linkedCtId) dialogUpdateFunctions[_linkedCtId].push(updateFunction);
							var bindingFunction = function(){
								$('#DialogCtSlider').slider({
									start: function(event, ui){
										clearInterval(DialogCtSliderReadoutTimer);
										if(!_confirm && !_pincodeSet){
											DialogCtSliderReadoutTimer = setInterval(function(){
												if(_linkedCtId && _linkedCtId !== ""){
													setState(_linkedCtId, _deviceIdEscaped, $("#DialogCtSlider").val());
												}
											}, 500);
										}
									},
									stop: function(event, ui) {
										clearInterval(DialogCtSliderReadoutTimer);
										if(_linkedCtId && _linkedCtId !== ""){
											setState(_linkedCtId, _deviceIdEscaped, $("#DialogCtSlider").val());
										}
									}
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}
					//----WhiteBrightness
					if(dialogStates["WHITE_BRIGHTNESS"] && typeof dialogStates["WHITE_BRIGHTNESS"].val !== udef  && ((dialogStates["HUE"] && typeof dialogStates["HUE"].val !== udef) || (!dialogStates["LEVEL"] || typeof dialogStates["LEVEL"].val == udef))){ //brightness is only necessary, if the light has color and white or if .LEVEL absent - otherwise the level ist regulated via .LEVEL
						dialogContentCountAfterHR++;
						var min = dialogStates["WHITE_BRIGHTNESS"] && dialogStates["WHITE_BRIGHTNESS"].min || 0;
						var max = dialogStates["WHITE_BRIGHTNESS"] && dialogStates["WHITE_BRIGHTNESS"].max || 100;
						var step = dialogStates["WHITE_BRIGHTNESS"] && dialogStates["WHITE_BRIGHTNESS"].step || 1;
						dialogContent += "<label for='DialogWhiteBrightnessSlider' ><image src='./images/symbols/slider.png' / style='width:16px; height:16px;'>&nbsp;" + _("Brightness of white") + ":</label>";
						dialogContent += "<input type='number' data-type='range' class='iQontrolDialogSlider' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + ((dialogStates["WHITE_BRIGHTNESS"] && dialogStates["WHITE_BRIGHTNESS"].readonly) || (dialogStates["ALTERNATIVE_COLORSPACE_VALUE"] && dialogStates["ALTERNATIVE_COLORSPACE_VALUE"].readonly) || dialogReadonly).toString() + "' data-highlight='true' data-popup-enabled='true' data-show-value='true' name='DialogWhiteBrightnessSlider' id='DialogWhiteBrightnessSlider' min='" + min + "' max='" + max + "' step='1'/>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedWhiteBrightnessId = dialogLinkedStateIds["WHITE_BRIGHTNESS"];
							var _confirm = (fetchedObjects[_linkedWhiteBrightnessId] && typeof fetchedObjects[_linkedWhiteBrightnessId].common !== udef && typeof fetchedObjects[_linkedWhiteBrightnessId].common.custom !== udef && fetchedObjects[_linkedWhiteBrightnessId].common.custom !== null && typeof fetchedObjects[_linkedWhiteBrightnessId].common.custom[namespace] !== udef && fetchedObjects[_linkedWhiteBrightnessId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedWhiteBrightnessId].common.custom[namespace].confirm !== udef && fetchedObjects[_linkedWhiteBrightnessId].common.custom[namespace].confirm == true);
							var _pincodeSet = (fetchedObjects[_linkedWhiteBrightnessId] && typeof fetchedObjects[_linkedWhiteBrightnessId].common !== udef && typeof fetchedObjects[_linkedWhiteBrightnessId].common.custom !== udef && fetchedObjects[_linkedWhiteBrightnessId].common.custom !== null && typeof fetchedObjects[_linkedWhiteBrightnessId].common.custom[namespace] !== udef && fetchedObjects[_linkedWhiteBrightnessId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedWhiteBrightnessId].common.custom[namespace].pincode !== udef && fetchedObjects[_linkedWhiteBrightnessId].common.custom[namespace].pincode !== "");
							var DialogWhiteBrightnessSliderReadoutTimer;
							var updateFunction = function(){
								var stateWhiteBrightness = getStateObject(_linkedWhiteBrightnessId);
								if(stateWhiteBrightness && typeof stateWhiteBrightness.val !== udef){
									$("#DialogWhiteBrightnessSlider").val(stateWhiteBrightness.val);
									$("#DialogWhiteBrightnessSlider").slider('refresh');
								}
							};
							if(_linkedWhiteBrightnessId) dialogUpdateFunctions[_linkedWhiteBrightnessId].push(updateFunction);
							var bindingFunction = function(){
								$('#DialogWhiteBrightnessSlider').slider({
									start: function(event, ui){
										clearInterval(DialogWhiteBrightnessSliderReadoutTimer);
										if(!_confirm && !_pincodeSet){
											DialogWhiteBrightnessSliderReadoutTimer = setInterval(function(){
												if(_linkedWhiteBrightnessId && _linkedWhiteBrightnessId !== ""){
													setState(_linkedWhiteBrightnessId, _deviceIdEscaped, $("#DialogWhiteBrightnessSlider").val());
												}
											}, 500);
										}
									},
									stop: function(event, ui) {
										clearInterval(DialogWhiteBrightnessSliderReadoutTimer);
										if(_linkedWhiteBrightnessId && _linkedWhiteBrightnessId !== ""){
											setState(_linkedWhiteBrightnessId, _deviceIdEscaped, $("#DialogWhiteBrightnessSlider").val());
										}
									}
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}
					//----EffectMode
					if(dialogStates["EFFECT"] && dialogStates["EFFECT"].type){
						if(dialogContentCountAfterHR > 0) dialogContent += "<hr>";
						dialogContentCountAfterHR++;
						dialogContent += "<label for='DialogEffectValueList' ><image src='./images/symbols/variable.png' / style='width:16px; height:16px;'>&nbsp;" + _("Effect") + ":</label>";
						dialogContent += "<select  class='iQontrolDialogValueList DialogEffectValueList' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["EFFECT"].readonly || dialogReadonly).toString() + "' name='DialogEffectValueList' id='DialogEffectValueList' data-native-menu='false'>";
						for(val in dialogStates["EFFECT"].valueList){
							if(dialogStates["EFFECT"].targetValues && dialogStates["EFFECT"].custom.showOnlyTargetValues && !dialogStates["EFFECT"].targetValues.hasOwnProperty(val)) continue; //Show only targetValues
							dialogContent += "<option value='" + val + "'>" + _(dialogStates["EFFECT"].valueList[val]) + "</option>";
						}
							if(dialogStates["EFFECT"].custom.statesAddInput) {
								dialogContent += "<option value='[INPUT]'>" + (dialogStates["EFFECT"].custom.statesAddInputCaption || _("Enter other value...")) + "</option>";
							}
						dialogContent += "</select>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedEffectId = dialogLinkedStateIds["EFFECT"];
							var updateFunction = function(){
								var stateEffect = getStateObject(_linkedEffectId);
								if(stateEffect){
									var val = stateEffect.val.toString();
									$("#DialogEffectValueList").val(val).selectmenu('refresh');
									if($("#DialogEffectValueList").val() !== val){ //val is not in option-list
										if(stateEffect.valueList && typeof stateEffect.valueList[val] !== udef){
											$("#DialogEffectValueList").prev("span").html(stateEffect.valueList[val]);
										} else {
											$("#DialogEffectValueList").prev("span").html(val + "&nbsp;");
										}
									}
								}
							};
							dialogUpdateFunctions[_linkedEffectId].push(updateFunction);
							var bindingFunction = function(){
								$('.DialogEffectValueList').on('change', function(e) {
									var val = $("#DialogEffectValueList option:selected").val();
									if(val == "[INPUT]") {
										val = prompt((dialogStates["EFFECT"].custom.statesAddInputCaption || _("Enter other value...")));
										if(val == null) {
											updateState(_linkedEffectId);
											return;
										}
										$("#DialogEffectValueList").prev("span").html(val + "&nbsp;");
									}
									setState(_linkedEffectId, _deviceIdEscaped, val);
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}
					if(dialogStates["EFFECT_NEXT"] && dialogStates["EFFECT_NEXT"].type && !dialogStates["EFFECT_NEXT"].readonly && !dialogReadonly){
						if(dialogContentCountAfterHR > 0) dialogContent += "<hr>";
						dialogContentCountAfterHR++;
						dialogContent += "<label for='DialogEffectNextButton' ><image src='./images/symbols/variable.png' / style='width:16px; height:16px;'>&nbsp;" + _("Effect") + ":</label>";
						dialogContent += "<a data-role='button' data-mini='false' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogEffectNextButton' id='DialogEffectNextButton'>" + _("Next") + "</a>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedEffectNextId = dialogLinkedStateIds["EFFECT_NEXT"];
							var bindingFunction = function(){
								$('#DialogEffectNextButton').on('click', function(e) {
									startProgram(_linkedEffectNextId, _deviceIdEscaped);
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}
					if(((dialogStates["EFFECT_SPEED_DOWN"] && dialogStates["EFFECT_SPEED_DOWN"].type) || (dialogStates["EFFECT_SPEED_UP"] && dialogStates["EFFECT_SPEED_UP"].type)) && !dialogStates["EFFECT_SPEED_UP"].readonly && !dialogStates["EFFECT_SPEED_UP"].readonly && !dialogReadonly){
						dialogContentCountAfterHR++;
						dialogContent += "<div data-role='controlgroup' data-type='horizontal'>";
						if(dialogStates["EFFECT_SPEED_DOWN"] && dialogStates["EFFECT_SPEED_DOWN"].type){
							dialogContent += "<a data-role='button' data-mini='false' data-icon='minus' data-iconpos='left' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogEffectSpeedDownButton' id='DialogEffectSpeedDownButton'>" + _("Slower") + "</a>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedEffectSpeedDownId = dialogLinkedStateIds["EFFECT_SPEED_DOWN"];
								var bindingFunction = function(){
									$('#DialogEffectSpeedDownButton').on('click', function(e) {
										startProgram(_linkedEffectSpeedDownId, _deviceIdEscaped);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						if(dialogStates["EFFECT_SPEED_UP"] && dialogStates["EFFECT_SPEED_UP"].type){
							dialogContent += "<a data-role='button' data-mini='false' data-icon='plus' data-iconpos='right' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogEffectSpeedUpButton' id='DialogEffectSpeedUpButton'>" + _("Faster") + "</a>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedEffectSpeedUpId = dialogLinkedStateIds["EFFECT_SPEED_UP"];
								var bindingFunction = function(){
									$('#DialogEffectSpeedUpButton').on('click', function(e) {
										startProgram(_linkedEffectSpeedUpId, _deviceIdEscaped);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						dialogContent += "</div>";
					}
					break;

					case "iQontrolThermostat":
					//----Thermostat (but NOT Homematic!) Control Mode
					if(dialogStates["CONTROL_MODE"]){
						switch(dialogStates["CONTROL_MODE"].type){
							case "switch":
							dialogContentCountAfterHR++;
							var type = "Mode";
							dialogContent += "<label for='DialogThermostatControlModeSwitch' ><image src='./images/symbols/config.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
							dialogContent += "<select data-role='flipswitch' data-mini='false' class='iQontrolDialogSwitch' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["CONTROL_MODE"].readonly || dialogReadonly).toString() + "' name='DialogThermostatControlModeSwitch' id='DialogThermostatControlModeSwitch'>";
								dialogContent += "<option value='false'>0</option>";
								dialogContent += "<option value='true'>I</option>";
							dialogContent += "</select>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedControlModeId = dialogLinkedStateIds["CONTROL_MODE"];
								var updateFunction = function(){
									var stateControlMode = getStateObject(_linkedControlModeId);
									if(stateControlMode){
										var index = 0;
										if(typeof stateControlMode.val != udef && (stateControlMode.val.toString().toLowerCase() == "true" || stateControlMode.val.toString() > 0)) index = 1; else index = 0;
										$("#DialogThermostatControlModeSwitch")[0].selectedIndex = index;
										$("#DialogThermostatControlModeSwitch").flipswitch('refresh');
									}
								};
								dialogUpdateFunctions[_linkedControlModeId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogThermostatControlModeSwitch').on('change', function(e) {
										var newVal = $("#DialogThermostatControlModeSwitch option:selected").val();
										var stateControlMode = getStateObject(_linkedControlModeId);
										if(typeof stateControlMode.val == 'number'){
											if(newVal == true) newVal = 1; else newVal = 0;
										}
										setState(_linkedControlModeId, _deviceIdEscaped, newVal);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
							break;

							case "valueList":
							dialogContentCountAfterHR++;
							var type = "Mode";
							dialogContent += "<fieldset data-role='controlgroup' data-type='horizontal'>"
								dialogContent += "<legend><image src='./images/symbols/config.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</legend>";
								for(val in dialogStates["CONTROL_MODE"].valueList){
									if(dialogStates["CONTROL_MODE"].targetValues && dialogStates["CONTROL_MODE"].custom.showOnlyTargetValues && !dialogStates["CONTROL_MODE"].targetValues.hasOwnProperty(val)) continue; //Show only targetValues
									dialogContent += "<input type='radio' class='iQontrolDialogCheckboxradio DialogThermostatControlModeCheckboxradio' " + ((dialogStates["CONTROL_MODE"].readonly || dialogReadonly)?"disabled='disabled'":"") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogThermostatControlModeCheckboxradio' id='DialogThermostatControlModeCheckboxradio_" + val + "' value='" + val + "' />";
									dialogContent += "<label for='DialogThermostatControlModeCheckboxradio_" + val + "'>" + _(dialogStates["CONTROL_MODE"].valueList[val]) + "</label>";
								}
							dialogContent += "</fieldset>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedControlModeId = dialogLinkedStateIds["CONTROL_MODE"];
								var _valueList = dialogStates["CONTROL_MODE"].valueList;
								var updateFunction = function(){
									var stateControlMode = getStateObject(_linkedControlModeId);
									if(stateControlMode){
										$("#DialogThermostatControlModeCheckboxradio_" + stateControlMode.val).prop("checked", true);
										$(".DialogThermostatControlModeCheckboxradio").checkboxradio('refresh');
									}
								};
								dialogUpdateFunctions[_linkedControlModeId].push(updateFunction);
								var bindingFunction = function(){
									$("input[name='DialogThermostatControlModeCheckboxradio']").on('click', function(e) {
										var value = $("input[name='DialogThermostatControlModeCheckboxradio']:checked").val();
										setState(_linkedControlModeId, _deviceIdEscaped, value, true);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
							break;
						}
					}
					break;

					case "iQontrolHomematicThermostat": case "iQontrolHomematicIpThermostat": 
					//----Homematic-Thermostat (ONLY Homematic!)
					//------Control Mode
					//get additional linkedStates for HomematicThermostat:
					//these are not part of the configured States in the adapter, but rather
					//they are generated from parentId of linkedControlModeId - so they are direct linked states
					//thats why getLinkedState could not be used! State and Object must be fetched manually
					if(dialogLinkedStateIds["CONTROL_MODE"]){
						var linkedParentId = dialogLinkedStateIds["CONTROL_MODE"].substring(0, dialogLinkedStateIds["CONTROL_MODE"].lastIndexOf("."));
						var additionalLinkedStates = [];
						if(device.commonRole == "iQontrolHomematicThermostat"){
							additionalLinkedStates.push(linkedParentId + ".MANU_MODE");
							additionalLinkedStates.push(linkedParentId + ".AUTO_MODE");
							additionalLinkedStates.push(linkedParentId + ".BOOST_MODE");
						} else if(device.commonRole == "iQontrolHomematicIpThermostat") {
							additionalLinkedStates.push(linkedParentId + ".SET_POINT_MODE");
							additionalLinkedStates.push(linkedParentId + ".BOOST_MODE");
						}
						for(var i = 0; i < additionalLinkedStates.length; i++){
							if(typeof fetchedStates[additionalLinkedStates[i]] == udef) {
								dialogStateIdsToFetch.push(additionalLinkedStates[i]);
							}
							if(typeof fetchedObjects[additionalLinkedStates[i]] == udef) {
								(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
									var _additionalLinkedState = additionalLinkedStates[i];
									fetchObject(_additionalLinkedState, function(error){ updateState(_additionalLinkedState, "ignorePreventUpdateForDialog"); });
								})(); //<--End Closure
							}
						}
					}
					if(dialogStates["CONTROL_MODE"]){
						var type = "Mode";
						if(device.commonRole == "iQontrolHomematicIpThermostat") { //For HmIP valueList is not provided
							if(!dialogStates["CONTROL_MODE"].valueList) dialogStates["CONTROL_MODE"].valueList = {};
							dialogStates["CONTROL_MODE"].valueList[0] = "AUTO-MODE";
							dialogStates["CONTROL_MODE"].valueList[1] = "MANU-MODE";
							dialogStates["CONTROL_MODE"].valueList[2] = "PARTY-MODE";
							dialogStates["CONTROL_MODE"].valueList[3] = "BOOST-MODE";
						}
						dialogContentCountAfterHR++;
						dialogContent += "<fieldset data-role='controlgroup' data-type='horizontal'>"
							dialogContent += "<legend><image src='./images/symbols/config.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</legend>";
							for(val in dialogStates["CONTROL_MODE"].valueList){
								if(dialogStates["CONTROL_MODE"].valueList[val] == "PARTY-MODE") continue;
								dialogStates["CONTROL_MODE"].readonly = false; //SPECIAL: Homematic control mode IS readonly, because it writes to another targetValueId but the new targetValueId-Feature is not yet implemented for Homematic-Themostats. Therefore - as workaround - the readonly-mode is disabled here.
								dialogContent += "<input type='radio' class='iQontrolDialogCheckboxradio DialogThermostatControlModeCheckboxradio' " + ((dialogStates["CONTROL_MODE"].readonly || dialogReadonly)?"disabled='disabled'":"") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogThermostatControlModeCheckboxradio' id='DialogThermostatControlModeCheckboxradio_" + val + "' value='" + val + "' />";
								dialogContent += "<label for='DialogThermostatControlModeCheckboxradio_" + val + "'>" + _(dialogStates["CONTROL_MODE"].valueList[val]) + "</label>";
							}
						dialogContent += "</fieldset>";
						dialogContent += "<div class='DialogThermostatControlModeText' data-iQontrol-Device-ID='" + deviceIdEscaped + "'></div>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							if(device.commonRole == "iQontrolHomematicThermostat"){
								var _linkedControlModeId = dialogLinkedStateIds["CONTROL_MODE"];
								var _linkedBoostModeId = false;
							} else if(device.commonRole == "iQontrolHomematicIpThermostat") {
								var linkedParentId = dialogLinkedStateIds["CONTROL_MODE"].substring(0, dialogLinkedStateIds["CONTROL_MODE"].lastIndexOf("."));
								var _linkedBoostModeId = linkedParentId + ".BOOST_MODE";
								var _linkedControlModeId = linkedParentId + ".SET_POINT_MODE";
							}
							var _linkedBoostStateId = dialogLinkedStateIds["BOOST_STATE"];
							var _valueList = dialogStates["CONTROL_MODE"].valueList;
							var updateFunction = function(){
								var stateBoostMode = getStateObject(_linkedBoostModeId);
								var stateControlMode = getStateObject(_linkedControlModeId);
								if(stateBoostMode && stateBoostMode.val && _valueList && typeof Object.keys(_valueList).find(function(key){ return _valueList[key] === "BOOST-MODE"; }) != udef) {
									$("#DialogThermostatControlModeCheckboxradio_" + Object.keys(_valueList).find(function(key){ return _valueList[key] === "BOOST-MODE"; })).prop("checked", true);
									$(".DialogThermostatControlModeCheckboxradio").checkboxradio('refresh');
								} else if(stateControlMode){
									$("#DialogThermostatControlModeCheckboxradio_" + stateControlMode.val).prop("checked", true);
									$(".DialogThermostatControlModeCheckboxradio").checkboxradio('refresh');
								}
							};
							if(_linkedBoostModeId){
								if(typeof dialogUpdateFunctions[_linkedBoostModeId] == udef) dialogUpdateFunctions[_linkedBoostModeId] = [];
								dialogUpdateFunctions[_linkedBoostModeId].push(updateFunction);
							}
							if(typeof dialogUpdateFunctions[_linkedControlModeId] == udef) dialogUpdateFunctions[_linkedControlModeId] = [];
							dialogUpdateFunctions[_linkedControlModeId].push(updateFunction);
							var updateFunction = function(){
								var value = $("input[name='DialogThermostatControlModeCheckboxradio']:checked").val();
								if(_valueList && typeof _valueList[value] !== udef && _valueList[value] == "BOOST-MODE"){
									var unit = getUnit(_linkedBoostStateId);
									if(fetchedStates[_linkedBoostStateId] && typeof fetchedStates[_linkedBoostStateId].val != udef){
										var val = fetchedStates[_linkedBoostStateId].val;
										if(device.commonRole == "iQontrolHomematicIpThermostat" && !unit) {
											val = Math.floor(val/60) + 1;
											unit = " " + _("minutes");
										}
										$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].DialogThermostatControlModeText").html("<span class='small'>" + _("Remaining Boost Time") + ": " + val + unit + "</span>");
									}
								} else {
									$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].DialogThermostatControlModeText").html("");
								}
							};
							if(!dialogUpdateFunctions[_linkedBoostStateId]) dialogUpdateFunctions[_linkedBoostStateId] = [];
							dialogUpdateFunctions[_linkedBoostStateId].push(updateFunction);
							dialogUpdateFunctions[_linkedControlModeId].push(updateFunction);
							if(_linkedBoostModeId) dialogUpdateFunctions[_linkedBoostModeId].push(updateFunction);
							var bindingFunction = function(){
								$("input[name='DialogThermostatControlModeCheckboxradio']").on('click', function(e) {
									var value = $("input[name='DialogThermostatControlModeCheckboxradio']:checked").val();
									var linkedParentId = _linkedControlModeId.substring(0, _linkedControlModeId.lastIndexOf("."));
									var setValues = [];
									var modeStateIds = [];
									var SET_TEMPERATURE = $("#DialogStateSlider").val() * 1;
									if(device.commonRole == "iQontrolHomematicThermostat"){
										if(_valueList[value] == "AUTO-MODE")  { modeStateIds.push(linkedParentId + ".AUTO_MODE");  	setValues.push(true); }
										if(_valueList[value] == "MANU-MODE")  { modeStateIds.push(linkedParentId + ".MANU_MODE");  	setValues.push(SET_TEMPERATURE); }
										if(_valueList[value] == "BOOST-MODE") { modeStateIds.push(linkedParentId + ".BOOST_MODE"); 	setValues.push(true); }
									} else if(device.commonRole == "iQontrolHomematicIpThermostat") {
										if(_valueList[value] == "AUTO-MODE")  { modeStateIds.push(linkedParentId + ".CONTROL_MODE"); 	setValues.push(0); 		modeStateIds.push(linkedParentId + ".BOOST_MODE"); 	 setValues.push(false);}
										if(_valueList[value] == "MANU-MODE")  { modeStateIds.push(linkedParentId + ".CONTROL_MODE"); 	setValues.push(1); 		modeStateIds.push(linkedParentId + ".BOOST_MODE"); 	 setValues.push(false);}
										if(_valueList[value] == "BOOST-MODE") { modeStateIds.push(linkedParentId + ".BOOST_MODE"); 	setValues.push(true); }
									}
									modeStateIds.forEach(function(modeStateId, index){
										var setValue = (typeof setValues[index] == udef ? true : setValues[index]);
										if(typeof fetchedObjects[modeStateId] == udef) { modeStateId = _linkedControlModeId; setValue = value; }; //If additionalLinkedState not exists, write it directly to CONTROL_MODE
										setState(modeStateId, _deviceIdEscaped, setValue, true);
									});
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
						dialogContent += "<br>";

						//------Party-Mode
						var now = new Date();
						var year = now.getFullYear() - 2000;
						var	dialogThermostatPartyModeCollapsibleExpanded = false;
						if(device.commonRole != "iQontrolHomematicIpThermostat" && dialogStates["PARTY_TEMPERATURE"]){
							dialogContentCountAfterHR++;
							dialogContent += "<div data-role='collapsible' class='collapsibleAnimated' data-iconpos='right' data-inset='true' id='DialogThermostatPartyModeCollapsible' class=''>";
								dialogContent += "<h4><image src='./images/symbols/party.png' / style='width:16px; height:16px;'>&nbsp;" + _("Party-Mode") + ": <span id='DialogThermostatPartyModeText' class='small'></span></h4>";
								dialogContent += "<div id='DialogThermostatPartyModeContent'>";
									dialogContent += "<legend>" + _("Start") + ":</legend>";
									dialogContent += "<fieldset data-role='controlgroup' data-mini='true' data-type='horizontal'>";
										dialogContent += "<select class='DialogThermostatPartyModeMomentSelect' data-disabled='" + dialogReadonly.toString() + "' name='DialogThermostatPartyModeStartDay' id='DialogThermostatPartyModeStartDay' data-inline='true'>";
											for(var i=1; i<=31; i++){
												dialogContent += "<option>" + i + ".</option>";
											}
										dialogContent += "</select>";
										dialogContent += "<select class='DialogThermostatPartyModeMomentSelect' data-disabled='" + dialogReadonly.toString() + "' name='DialogThermostatPartyModeStartMonth' id='DialogThermostatPartyModeStartMonth' data-inline='true'>";
											for(var i=1; i<=12; i++){
												dialogContent += "<option>" + i + ".</option>";
											}
										dialogContent += "</select>";
										dialogContent += "<select class='DialogThermostatPartyModeMomentSelect' data-disabled='" + dialogReadonly.toString() + "' name='DialogThermostatPartyModeStartYear' id='DialogThermostatPartyModeStartYear' data-inline='true'>";
											for(var i=year; i <= year + 5; i++){
												var iString = "20" + i;
												dialogContent += "<option>" + iString + "</option>";
											}
										dialogContent += "</select>";
									dialogContent += "</fieldset>";
									dialogContent += "<fieldset data-role='controlgroup' data-mini='true' data-type='horizontal'>";
										dialogContent += "<select class='DialogThermostatPartyModeMomentSelect' data-disabled='" + dialogReadonly.toString() + "' name='DialogThermostatPartyModeStartHour' id='DialogThermostatPartyModeStartHour' data-inline='true'>";
											for(var i=0; i<=23; i++){
												if(i<10) var iString = "0" + i; else var iString = i;
												dialogContent += "<option>" + iString + ":</option>";
											}
										dialogContent += "</select>";
										dialogContent += "<select class='DialogThermostatPartyModeMomentSelect' data-disabled='" + dialogReadonly.toString() + "' name='DialogThermostatPartyModeStartMin' id='DialogThermostatPartyModeStartMin' data-inline='true'>";
											for(var i=0; i<=59; i=i+30){
												if(i<10) var iString = "0" + i; else var iString = i;
												dialogContent += "<option>" + iString + "</option>";
											}
										dialogContent += "</select>";
									dialogContent += "</fieldset>";
									dialogContent += "<div id='DialogThermostatPartyModeStartMomentError' style='display:none'><img src='./images/error.png' style='width: 16px; height: 16px;'><span class='small'>&nbsp;" + _("Must not lay in past") + "</span></img></div><br>"
									dialogContent += "<legend>" + _("End") + ":</legend>";
									dialogContent += "<fieldset data-role='controlgroup' data-mini='true' data-type='horizontal'>";
										dialogContent += "<select class='DialogThermostatPartyModeMomentSelect' data-disabled='" + dialogReadonly.toString() + "' name='DialogThermostatPartyModeStopDay' id='DialogThermostatPartyModeStopDay' data-inline='true'>";
											for(var i=1; i<=31; i++){
												dialogContent += "<option>" + i + ".</option>";
											}
										dialogContent += "</select>";
										dialogContent += "<select class='DialogThermostatPartyModeMomentSelect' data-disabled='" + dialogReadonly.toString() + "' name='DialogThermostatPartyModeStopMonth' id='DialogThermostatPartyModeStopMonth' data-inline='true'>";
											for(var i=1; i<=12; i++){
												dialogContent += "<option>" + i + ".</option>";
											}
										dialogContent += "</select>";
										dialogContent += "<select class='DialogThermostatPartyModeMomentSelect' data-disabled='" + dialogReadonly.toString() + "' name='DialogThermostatPartyModeStopYear' id='DialogThermostatPartyModeStopYear' data-inline='true'>";
											for(var i=year; i <= year + 5; i++){
												var iString = "20" + i;
												dialogContent += "<option>" + iString + "</option>";
											}
										dialogContent += "</select>";
									dialogContent += "</fieldset>";
									dialogContent += "<fieldset data-role='controlgroup' data-mini='true' data-type='horizontal'>";
										dialogContent += "<select class='DialogThermostatPartyModeMomentSelect' data-disabled='" + dialogReadonly.toString() + "' name='DialogThermostatPartyModeStopHour' id='DialogThermostatPartyModeStopHour' data-inline='true'>";
											for(var i=0; i<=23; i++){
												if(i<10) var iString = "0" + i; else var iString = i;
												dialogContent += "<option>" + iString + ":</option>";
											}
										dialogContent += "</select>";
										dialogContent += "<select class='DialogThermostatPartyModeMomentSelect' data-disabled='" + dialogReadonly.toString() + "' name='DialogThermostatPartyModeStopMin' id='DialogThermostatPartyModeStopMin' data-inline='true'>";
											for(var i=0; i<=59; i=i+30){
												if(i<10) var iString = "0" + i; else var iString = i;
												dialogContent += "<option>" + iString + "</option>";
											}
										dialogContent += "</select>";
									dialogContent += "</fieldset>";
									dialogContent += "<div id='DialogThermostatPartyModeStopMomentError' style='display:none'><img src='./images/error.png' style='width: 16px; height: 16px;'><span class='small'>&nbsp;" + _("Has to be after start") + "</span></img></div><br>"
									dialogContent += "<label for='DialogThermostatPartyModeTemperature' >" + _("Goal-Temperature") + ":</label>";
									dialogContent += "<input type='number' data-type='range' class='iQontrolDialogSlider' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-highlight='true' data-popup-enabled='true' data-show-value='true' name='DialogThermostatPartyModeTemperature' id='DialogThermostatPartyModeTemperature' min='5' max='30' step='0.5'/><br>";
									if(!dialogReadonly){
										dialogContent += "<div class='ui-grid-a'>";
											dialogContent += "<div class='ui-block-a'><input type='button' value='" + _("Save") + "' name='DialogThermostatPartyModeSave'></div>";
											dialogContent += "<div class='ui-block-b'><input type='button' value='" + _("Delete") + "' name='DialogThermostatPartyModeDelete'></div>";
										dialogContent += "</div>";
									}
								dialogContent += "</div>";
							dialogContent += "</div>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedStateId = dialogLinkedStateIds["PARTY_TEMPERATURE"];
								var _linkedParentId = _linkedStateId.substring(0, _linkedStateId.lastIndexOf("."));
								var updateFunction = function(){
									if(fetchedStates[_linkedStateId]){
										state = getStateObject(_linkedStateId);
										var partyModeTemperature = state.val;
										if(partyModeTemperature >= 6.0){ //Party-Mode active
											$("#DialogThermostatPartyModeText").html("<br>" + _("programmed to") + " " + partyModeTemperature + state.unit);
											var partyModeStartTimeObject = getStateObject(_linkedParentId + ".PARTY_START_TIME");
											if(partyModeStartTimeObject.val) {
												var partyModeStartTime = getTimeFromHMTimeCode(partyModeStartTimeObject.val);
												var partyModeStartHour = partyModeStartTime.split(":")[0];
												var partyModeStartMin = partyModeStartTime.split(":")[1];
											} else {
												dialogStateIdsToFetch.push(_linkedParentId + ".PARTY_START_TIME");
											}
											var partyModeStartDayObject = getStateObject(_linkedParentId + ".PARTY_START_DAY")
											if(partyModeStartDayObject.val) var partyModeStartDay = partyModeStartDayObject.val; else dialogStateIdsToFetch.push(_linkedParentId + ".PARTY_START_DAY");
											var partyModeStartMonthObject = getStateObject(_linkedParentId + ".PARTY_START_MONTH")
											if(partyModeStartMonthObject.val) var partyModeStartMonth = partyModeStartMonthObject.val; else dialogStateIdsToFetch.push(_linkedParentId + ".PARTY_START_MONTH");
											var partyModeStartYEARObject = getStateObject(_linkedParentId + ".PARTY_START_YEAR")
											if(partyModeStartYEARObject.val) var partyModeStartYEAR = partyModeStartYEARObject.val; else dialogStateIdsToFetch.push(_linkedParentId + ".PARTY_START_YEAR");
											var partyModeStopTimeObject = getStateObject(_linkedParentId + ".PARTY_STOP_TIME");
											if(partyModeStopTimeObject.val) {
												var partyModeStopTime = getTimeFromHMTimeCode(partyModeStopTimeObject.val);
												var partyModeStopHour = partyModeStopTime.split(":")[0];
												var partyModeStopMin = partyModeStopTime.split(":")[1];
											} else {
												dialogStateIdsToFetch.push(_linkedParentId + ".PARTY_STOP_TIME");
											}
											var partyModeStopDayObject = getStateObject(_linkedParentId + ".PARTY_STOP_DAY")
											if(partyModeStopDayObject.val) var partyModeStopDay = partyModeStopDayObject.val; else dialogStateIdsToFetch.push(_linkedParentId + ".PARTY_STOP_DAY");
											var partyModeStopMonthObject = getStateObject(_linkedParentId + ".PARTY_STOP_MONTH")
											if(partyModeStopMonthObject.val) var partyModeStopMonth = partyModeStopMonthObject.val; else dialogStateIdsToFetch.push(_linkedParentId + ".PARTY_STOP_MONTH");
											var partyModeStopYEARObject = getStateObject(_linkedParentId + ".PARTY_STOP_YEAR")
											if(partyModeStopYEARObject.val) var partyModeStopYEAR = partyModeStopYEARObject.val; else dialogStateIdsToFetch.push(_linkedParentId + ".PARTY_STOP_YEAR");
										} else { //Party-Mode inactive
											$("#DialogThermostatPartyModeText").html("<br>" + _("inactive"));
											partyModeTemperature = "21";
											var	partyModeStartHour  = now.getHours()
											var partyModeStartMin = Math.floor(now.getMinutes() / 30) * 30;
											var partyModeStartDay = now.getDate();
											var partyModeStartMonth = now.getMonth() + 1;
											var partyModeStartYear = year;
											var	partyModeStopHour  = now.getHours()
											var partyModeStopMin = Math.floor(now.getMinutes() / 30) * 30;
											var partyModeStopDay = now.getDate();
											var partyModeStopMonth = now.getMonth() + 1;
											var partyModeStopYear = year;
										}
										if(!dialogThermostatPartyModeCollapsibleExpanded && $("#DialogThermostatPartyModeCollapsible").length > 0){
											$("#DialogThermostatPartyModeTemperature").val(partyModeTemperature);
											$("#DialogThermostatPartyModeTemperature").slider('refresh');
											$("#DialogThermostatPartyModeStartDay")[0].selectedIndex = partyModeStartDay - 1;
											$("#DialogThermostatPartyModeStartDay").selectmenu('refresh');
											$("#DialogThermostatPartyModeStartMonth")[0].selectedIndex = partyModeStartMonth - 1;
											$("#DialogThermostatPartyModeStartMonth").selectmenu('refresh');
											$("#DialogThermostatPartyModeStartYear")[0].selectedIndex = partyModeStartYear - year;
											$("#DialogThermostatPartyModeStartYear").selectmenu('refresh');
											$("#DialogThermostatPartyModeStartHour")[0].selectedIndex = partyModeStartHour;
											$("#DialogThermostatPartyModeStartHour").selectmenu('refresh');
											$("#DialogThermostatPartyModeStartMin")[0].selectedIndex = partyModeStartMin / 30;
											$("#DialogThermostatPartyModeStartMin").selectmenu('refresh');
											$("#DialogThermostatPartyModeStopDay")[0].selectedIndex = partyModeStopDay - 1;
											$("#DialogThermostatPartyModeStopDay").selectmenu('refresh');
											$("#DialogThermostatPartyModeStopMonth")[0].selectedIndex = partyModeStopMonth - 1;
											$("#DialogThermostatPartyModeStopMonth").selectmenu('refresh');
											$("#DialogThermostatPartyModeStopYear")[0].selectedIndex = partyModeStopYear - year;
											$("#DialogThermostatPartyModeStopYear").selectmenu('refresh');
											$("#DialogThermostatPartyModeStopHour")[0].selectedIndex = partyModeStopHour;
											$("#DialogThermostatPartyModeStopHour").selectmenu('refresh');
											$("#DialogThermostatPartyModeStopMin")[0].selectedIndex = partyModeStopMin / 30;
											$("#DialogThermostatPartyModeStopMin").selectmenu('refresh');
											dialogThermostatPartyModeCheckConsistency();
										}
									}
								};
								dialogUpdateFunctions[_linkedStateId].push(updateFunction);
								var bindingFunction = function(){
									$("#DialogThermostatPartyModeCollapsible").on('collapsibleexpand', function() {
										dialogThermostatPartyModeCollapsibleExpanded = true;
									}).on('collapsiblecollapse', function() {
										dialogThermostatPartyModeCollapsibleExpanded = false;
									});
									$(".DialogThermostatPartyModeMomentSelect").on('change', dialogThermostatPartyModeCheckConsistency);
									$("input[name='DialogThermostatPartyModeDelete']").on('click', function(e) {
										$("#DialogThermostatPartyModeTemperature").val(5.0);
										$("#DialogThermostatPartyModeTemperature").slider('refresh');
										$("input[name='DialogThermostatPartyModeSave']").click();
									});
									$("input[name='DialogThermostatPartyModeSave']").on('click', function(e) {
										//Save Party-Mode
										var now = new Date();
										var year = now.getFullYear() - 2000;
										var partyModeTemperature = $("#DialogThermostatPartyModeTemperature").val();
										var partyModeStartTime = ($("#DialogThermostatPartyModeStartHour")[0].selectedIndex * 60) +  ($("#DialogThermostatPartyModeStartMin")[0].selectedIndex * 30);
										var partyModeStartDay = $("#DialogThermostatPartyModeStartDay")[0].selectedIndex + 1;
										var partyModeStartMonth = $("#DialogThermostatPartyModeStartMonth")[0].selectedIndex + 1;
										var partyModeStartYear = $("#DialogThermostatPartyModeStartYear")[0].selectedIndex + year;
										var partyModeStopTime = ($("#DialogThermostatPartyModeStopHour")[0].selectedIndex * 60) +  ($("#DialogThermostatPartyModeStopMin")[0].selectedIndex * 30);
										var partyModeStopDay = $("#DialogThermostatPartyModeStopDay")[0].selectedIndex + 1;
										var partyModeStopMonth = $("#DialogThermostatPartyModeStopMonth")[0].selectedIndex + 1;
										var partyModeStopYear = $("#DialogThermostatPartyModeStopYear")[0].selectedIndex + year;
										// The Value for PARTY_MODE_SUBMIT consists of the following: Temperature,Start_Time,Day,Month,Year,Stop_Time,Day,Month,Year
										if(partyModeTemperature >= 6.0){
											var partyModeSubmitValue = partyModeTemperature + "," + partyModeStartTime + "," + partyModeStartDay + "," + partyModeStartMonth + "," + partyModeStartYear + "," + partyModeStopTime + "," + partyModeStopDay + "," + partyModeStopMonth + "," + partyModeStopYear;
										} else {
											partyModeSubmitValue = "0,0,0,0,0,0,0,0,0";
										}
										setState(_linkedParentId + ".PARTY_MODE_SUBMIT", _deviceIdEscaped, partyModeSubmitValue, true);
										$("#DialogThermostatPartyModeCollapsible").collapsible("collapse");
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
					}
					//------Valve States
					//Special: VALVE_STATES is an Array: [{"name":"ValveName", "type":"LinkedState", "value":"LinkedStateId"}, ...]
					var linkedValveStateIds;
					if(dialogStates["VALVE_STATES"] && typeof dialogStates["VALVE_STATES"].val != udef) linkedValveStateIds = tryParseJSON(dialogStates["VALVE_STATES"].val);
					var linkedValveStateIdsAreValid = false;
					if(Array.isArray(linkedValveStateIds) && typeof linkedValveStateIds == 'object') linkedValveStateIds.forEach(function(element){
						if(typeof element.name !== udef && element.name !== udef){
							linkedValveStateIdsAreValid = true;
						}
					});
					if(linkedValveStateIdsAreValid){
						//get additional linkedStates from Array:
						linkedValveStateIds.forEach(function(element){
							if(typeof fetchedStates[element.value] == udef) {
								dialogStateIdsToFetch.push(element.value);
							}
							if(typeof fetchedObjects[element.value] == udef) {
								(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
									var _elementValue = element.value;
									fetchObject(_elementValue, function(error){ updateState(_elementValue, "ignorePreventUpdateForDialog"); });
								})(); //<--End Closure
							}
							dialogLinkedStateIdsToUpdate.push(element.value);
						});
						var valveStatesSectionType = getDeviceOptionValue(device, "valveStatesSectionType") || "collapsible";
						dialogContentCountAfterHR++;
						dialogContent += "<div" + (valveStatesSectionType.indexOf("collapsible") == -1 ? "" : " data-role='collapsible' class='collapsibleAnimated'") + (valveStatesSectionType.indexOf("open") == -1 ? "" : " data-collapsed='false'") + " data-iconpos='right' data-inset='true'>";
							dialogContent += (valveStatesSectionType.indexOf("noCaption") == -1 ? "<h4><image src='./images/symbols/setpoint.png' style='width:16px; height:16px;'>&nbsp;" + _("Heating-Valves") + ":</h4>" : "<hr>");
							dialogContent += "<div id='DialogThermostatValveStatesContent'" + (valveStatesSectionType.indexOf("collapsible") == -1 ? " style='padding-left:10px;'" : "") + ">";
								dialogContent += "<ul class='iQontrolDialogAdditionalInfoList' id='DialogThermostatValveStatesContentList' data-iQontrol-Device-ID='" + deviceIdEscaped + "'></ul>";
							dialogContent += "</div>";
						dialogContent += "</div>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _linkedStateIds = linkedValveStateIds;
							var updateFunction = function(){
								$("#DialogThermostatValveStatesContentList").html("");
								_linkedStateIds.forEach(function(_element){
									var state = getStateObject(_element.value);
									if(state) $("#DialogThermostatValveStatesContentList").append("<li>" + _element.name + ": " + state.val + state.unit || "" + "</li>");
								});
							};
							_linkedStateIds.forEach(function(_element){
								if(!dialogUpdateFunctions[_element.value]) dialogUpdateFunctions[_element.value] = [];
								dialogUpdateFunctions[_element.value].push(updateFunction);
							});
						})(); //<--End Closure
					}
					break;

					case "iQontrolGarageDoor":
					if(dialogStates["TOGGLE"] && !dialogStates["TOGGLE"].readonly && !dialogReadonly){
						dialogContentCountAfterHR++;
						dialogContent += "<a data-role='button' data-mini='false' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogToggleButton' id='DialogToggleButton'>" + _("Toggle") + "</a>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedToggleId = dialogLinkedStateIds["TOGGLE"];
							var bindingFunction = function(){
								$('#DialogToggleButton').on('click', function(e) {
									startProgram(_linkedToggleId, _deviceIdEscaped);
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}

					case "iQontrolDoorWithLock":
					//----DoorWithLock
					if(dialogStates["LOCK_STATE"] || (dialogStates["LOCK_OPEN"] && !dialogStates["LOCK_OPEN"].readonly && !dialogReadonly)){
							dialogContent += "<legend><image src='./images/symbols/door_lock.png' / style='width:16px; height:16px;'>&nbsp;" + _("Doorlock") + ":</legend>";
					}
					if(dialogStates["LOCK_OPEN"] && !dialogStates["LOCK_OPEN"].readonly && !dialogReadonly){
						dialogContentCountAfterHR++;
						dialogContent += "<a data-role='button' data-mini='false' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogLockOpenButton' id='DialogLockOpenButton'>" + _("Open Door") + "</a>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _device = device;
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedLockOpenId = dialogLinkedStateIds["LOCK_OPEN"];
							var _lockOpenValue = getDeviceOptionValue(_device, "lockOpenValue") || true;
							var bindingFunction = function(){
								$('#DialogLockOpenButton').on('click', function(e) {
									if(confirm(_("Open Door") + "?")) setState(_linkedLockOpenId, _deviceIdEscaped, _lockOpenValue, true);;
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}
					if(dialogStates["LOCK_STATE"]){
						dialogContentCountAfterHR++;
						dialogContent += "<fieldset data-role='controlgroup' data-type='horizontal'>"
							dialogContent += "<input type='radio' class='iQontrolDialogCheckboxradio DialogLockStateCheckboxradio' " + ((dialogStates["LOCK_STATE"].readonly || dialogReadonly)?"disabled='disabled'":"") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogLockStateCheckboxradio' id='DialogLockStateCheckboxradio_false' value='false' />";
							dialogContent += "<label for='DialogLockStateCheckboxradio_false'>" + _("locked") + "</label>";
							dialogContent += "<input type='radio' class='iQontrolDialogCheckboxradio DialogLockStateCheckboxradio' " + ((dialogStates["LOCK_STATE"].readonly || dialogReadonly)?"disabled='disabled'":"") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogLockStateCheckboxradio' id='DialogLockStateCheckboxradio_true' value='true' />";
							dialogContent += "<label for='DialogLockStateCheckboxradio_true'>" + _("unlocked") + "</label>";
						dialogContent += "</fieldset>";
						dialogContent += "<div class='DialogLockStateUncertainText' data-iQontrol-Device-ID='" + deviceIdEscaped + "'></div>";
						if(dialogLinkedStateIds["STATE"]){
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedStateId = dialogLinkedStateIds["STATE"];
								var updateFunction = function(){
									var state = getStateObject(_linkedStateId);
									if(state){
										if(state.val || dialogStates["LOCK_STATE"].readonly || dialogReadonly){ //Door opened - deactivate Doorlock
											$("input[name=DialogLockStateCheckboxradio]").attr("disabled", true);
										} else {
											$("input[name=DialogLockStateCheckboxradio]").attr("disabled", false);
										}
										$(".DialogLockStateCheckboxradio").checkboxradio('refresh');
									}
								};
								dialogUpdateFunctions[_linkedStateId].push(updateFunction);
							})(); //<--End Closure
						}
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _device = device;
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedLockStateId = dialogLinkedStateIds["LOCK_STATE"];
							var _lockStateLockedValue = getDeviceOptionValue(_device, "lockStateLockedValue") || "false";
							var updateFunction = function(){
								var stateLockState = getStateObject(_linkedLockStateId);
								if(stateLockState){
									if(
										(stateLockState.plainText == _lockStateLockedValue || stateLockState.plainText == _(_lockStateLockedValue) || stateLockState.plainText == capitalize(_lockStateLockedValue) || stateLockState.plainText == capitalize(_(_lockStateLockedValue)))
										|| (typeof stateLockState.val == "boolean" && stateLockState.val.toString() == _lockStateLockedValue)
									) {
//									if(stateLockState.val == false || stateLockState.val.toString().toLowerCase() == "false" || stateLockState.val == 0 || stateLockState.val == "0"){ //Locked
										$("#DialogLockStateCheckboxradio_false").prop("checked", true);
									} else { //Unlocked
										$("#DialogLockStateCheckboxradio_true").prop("checked", true);
									}
									$(".DialogLockStateCheckboxradio").checkboxradio('refresh');
								}
							};
							dialogUpdateFunctions[_linkedLockStateId].push(updateFunction);
							var bindingFunction = function(){
								$("input[name='DialogLockStateCheckboxradio']").on('click', function(e) {
									var value = $("input[name='DialogLockStateCheckboxradio']:checked").val();
									if(value == false && _lockStateLockedValue != "false") value = _lockStateLockedValue;
									setState(_linkedLockStateId, _deviceIdEscaped, value, true, function(){}, 15000);
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
						if(dialogLinkedStateIds["LOCK_STATE_UNCERTAIN"]){
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedLockStateUncertainId = dialogLinkedStateIds["LOCK_STATE_UNCERTAIN"];
								var updateFunction = function(){
								var stateLockStateUncertain = getStateObject(_linkedLockStateUncertainId);
									if(stateLockStateUncertain){
										if(stateLockStateUncertain.val == false || stateLockStateUncertain.val.toString().toLowerCase() == "false" || stateLockStateUncertain.val == 0 || stateLockStateUncertain == "0"){ //State certain
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].DialogLockStateUncertainText").html("");
										} else { //State Uncertain
											$("[data-iQontrol-Device-ID='" + _deviceIdEscaped + "'].DialogLockStateUncertainText").html("<span class='small'>" + _("Exact position uncertain") + "</span>");
										}
									}
								};
								dialogUpdateFunctions[_linkedLockStateUncertainId].push(updateFunction);
							})(); //<--End Closure
						}
					}
					break;

					case "iQontrolBlind":
					//----Actuator
					if(!dialogReadonly && (dialogStates["FAVORITE_POSITION"] && dialogStates["FAVORITE_POSITION"].type)){
						dialogContentCountAfterHR++;
						var favoritePositionCaption = getDeviceOptionValue(device, "favoritePositionCaption") || "Favorite Position";
						dialogContent += "<a data-role='button' data-mini='true' data-icon='star' data-iconpos='left' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogStateFavoritePositionButton' id='DialogStateFavoritePositionButton'>" + _(favoritePositionCaption) + "</a>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedFavoritePositionId = dialogLinkedStateIds["FAVORITE_POSITION"];
							var _linkedFavoritePositionSetValueId = dialogLinkedStateIds["FAVORITE_POSITION_SET_VALUE"];
							var bindingFunction = function(){
								$('#DialogStateFavoritePositionButton').on('click', function(e) {
									var favoritePositionSetValue = getStateObject(_linkedFavoritePositionSetValueId);
									setState(_linkedFavoritePositionId, _deviceIdEscaped, ((favoritePositionSetValue && favoritePositionSetValue.val) || true), true);
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}
					if(!dialogReadonly && ((dialogStates["DOWN"] && dialogStates["DOWN"].type) || (dialogStates["STOP"] && dialogStates["STOP"].type) || (dialogStates["UP"] && dialogStates["UP"].type))){
						dialogContentCountAfterHR++;
						dialogContent += "<center><div data-role='controlgroup' data-type='horizontal'>";
						if(dialogStates["DOWN"] && dialogStates["DOWN"].type){
							var downCaption = getDeviceOptionValue(device, "downCaption") || "Down";
							dialogContent += "<a data-role='button' data-mini='false' data-icon='carat-d' data-iconpos='left' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogStateDownButton' id='DialogStateDownButton'>" + _(downCaption) + "</a>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedDownId = dialogLinkedStateIds["DOWN"];
								var _linkedDownSetValueId = dialogLinkedStateIds["DOWN_SET_VALUE"];
								var bindingFunction = function(){
									$('#DialogStateDownButton').on('click', function(e) {
										var downSetValue = getStateObject(_linkedDownSetValueId);
										setState(_linkedDownId, _deviceIdEscaped, ((downSetValue && typeof downSetValue.val !== udef && downSetValue.val !== "") ? downSetValue.val : true), true);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						if(dialogStates["STOP"] && dialogStates["STOP"].type){
							var stopCaption = getDeviceOptionValue(device, "stopCaption") || "Stop";
							dialogContent += "<a data-role='button' data-mini='false' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogStateStopButton' id='DialogStateStopButton'>" + _(stopCaption) + "</a>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedStopId = dialogLinkedStateIds["STOP"];
								var _linkedStopSetValueId = dialogLinkedStateIds["STOP_SET_VALUE"];
								var bindingFunction = function(){
									$('#DialogStateStopButton').on('click', function(e) {
										var stopSetValue = getStateObject(_linkedStopSetValueId);
										setState(_linkedStopId, _deviceIdEscaped, ((stopSetValue && typeof stopSetValue.val !== udef && stopSetValue.val !== "") ? stopSetValue.val : true), true);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						if(dialogStates["UP"] && dialogStates["UP"].type){
							var upCaption = getDeviceOptionValue(device, "upCaption") || "Up";
							dialogContent += "<a data-role='button' data-mini='false' data-icon='carat-u' data-iconpos='right'  class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogStateUPButton' id='DialogStateUPButton'>" + _(upCaption) + "</a>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedUpId = dialogLinkedStateIds["UP"];
								var _linkedUpSetValueId = dialogLinkedStateIds["UP_SET_VALUE"];
								var bindingFunction = function(){
									$('#DialogStateUPButton').on('click', function(e) {
										var upSetValue = getStateObject(_linkedUpSetValueId);
										setState(_linkedUpId, _deviceIdEscaped, ((upSetValue && typeof upSetValue.val !== udef && upSetValue.val !== "") ? upSetValue.val : true), true);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						if(!(dialogStates["DOWN"] && dialogStates["DOWN"].type) && !(dialogStates["UP"] && dialogStates["UP"].type) && dialogStates["LEVEL"]){
							var onclick = "toggleActuator(\"" + (dialogLinkedStateIds["LEVEL"] || "") + "\", \"" + (dialogLinkedStateIds["DIRECTION"] || "") + "\", \"" + (dialogLinkedStateIds["STOP"] || "") + "\", \"" + (dialogLinkedStateIds["STOP_SET_VALUE"] || "") + "\", \"" + (dialogLinkedStateIds["UP"] || "") + "\", \"" + (dialogLinkedStateIds["UP_SET_VALUE"] || "") + "\", \"" + (dialogLinkedStateIds["DOWN"] || "") + "\", \"" + (dialogLinkedStateIds["DOWN_SET_VALUE"] || "") + "\", \"" + (dialogLinkedStateIds["FAVORITE_POSITION"] || "") + "\", \"" + deviceIdEscaped + "\");";
							dialogContent += "<a data-role='button' data-mini='false' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogStateToggleButton' id='DialogStateToggleButton' onclick='" + onclick + "'>" + _("Toggle") + "</a>";
						}
						dialogContent += "</div></center>";
					}
					//----Slats
					if(dialogStates["SLATS_LEVEL"]){
						if(dialogStates["SLATS_LEVEL"].type == "level"){
							dialogContentCountAfterHR++;
							var min = dialogStates["SLATS_LEVEL"].min || 0;
							var max = dialogStates["SLATS_LEVEL"].max || 100;
							var step = dialogStates["SLATS_LEVEL"].step || 1;
							var type = "Slats";
							dialogContent += "<label for='DialogSlatsLevelSlider' ><image src='./images/symbols/slats.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
							dialogContent += "<input type='number' data-type='range' class='iQontrolDialogSlider' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["SLATS_LEVEL"].readonly || dialogReadonly).toString() + "' data-highlight='true' data-popup-enabled='true' data-show-value='true' name='DialogSlatsLevelSlider' id='DialogSlatsLevelSlider' min='" + min + "' max='" + max + "' step='" + step + "'/>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedSlatsLevelId = dialogLinkedStateIds["SLATS_LEVEL"];
								var _confirm = (fetchedObjects[_linkedSlatsLevelId] && typeof fetchedObjects[_linkedSlatsLevelId].common !== udef && typeof fetchedObjects[_linkedSlatsLevelId].common.custom !== udef && fetchedObjects[_linkedSlatsLevelId].common.custom !== null && typeof fetchedObjects[_linkedSlatsLevelId].common.custom[namespace] !== udef && fetchedObjects[_linkedSlatsLevelId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedSlatsLevelId].common.custom[namespace].confirm !== udef && fetchedObjects[_linkedSlatsLevelId].common.custom[namespace].confirm == true);
								var _pincodeSet = (fetchedObjects[_linkedSlatsLevelId] && typeof fetchedObjects[_linkedSlatsLevelId].common !== udef && typeof fetchedObjects[_linkedSlatsLevelId].common.custom !== udef && fetchedObjects[_linkedSlatsLevelId].common.custom !== null && typeof fetchedObjects[_linkedSlatsLevelId].common.custom[namespace] !== udef && fetchedObjects[_linkedSlatsLevelId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedSlatsLevelId].common.custom[namespace].pincode !== udef && fetchedObjects[_linkedSlatsLevelId].common.custom[namespace].pincode !== "");
								var DialogSlatsLevelSliderReadoutTimer;
								var updateFunction = function(){
									var stateSlatsLevel = getStateObject(_linkedSlatsLevelId);
									if(stateSlatsLevel){
										$("#DialogSlatsLevelSlider").val(stateSlatsLevel.val);
										$("#DialogSlatsLevelSlider").slider('refresh');
										dialogUpdateTimestamp(fetchedStates[_linkedSlatsLevelId]);
									}
								};
								dialogUpdateFunctions[_linkedSlatsLevelId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogSlatsLevelSlider').slider({
										start: function(event, ui){
											clearInterval(DialogSlatsLevelSliderReadoutTimer);
											if(!_confirm && !_pincodeSet) {
												DialogSlatsLevelSliderReadoutTimer = setInterval(function(){
													setState(_linkedSlatsLevelId, _deviceIdEscaped, $("#DialogSlatsLevelSlider").val());
													dialogUpdateTimestamp(fetchedStates[_linkedSlatsLevelId]);
												}, 500);
											}
										},
										stop: function(event, ui) {
											clearInterval(DialogSlatsLevelSliderReadoutTimer);
											setState(_linkedSlatsLevelId, _deviceIdEscaped, $("#DialogSlatsLevelSlider").val());
											dialogUpdateTimestamp(fetchedStates[_linkedSlatsLevelId]);
										}
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
					}
					break;

					case "iQontrolAlarm":
					if(dialogStates["CONTROL_MODE"]){
						dialogContentCountAfterHR++;
						dialogContent += "<label for='DialogControlModeValueList' ><image src='./images/symbols/variable.png' style='width:16px; height:16px;' />&nbsp;" + _("Operation Mode") + ":</label>";
						dialogContent += "<select class='iQontrolDialogValueList DialogControlModeValueList' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["CONTROL_MODE"].readonly || dialogReadonly).toString() + "' name='DialogControlModeValueList' id='DialogControlModeValueList' data-native-menu='false'>";
						for(val in dialogStates["CONTROL_MODE"].valueList){
							if(dialogStates["CONTROL_MODE"].targetValues && dialogStates["CONTROL_MODE"].custom.showOnlyTargetValues && !dialogStates["CONTROL_MODE"].targetValues.hasOwnProperty(val)) continue; //Show only targetValues
							dialogContent += "<option value='" + val + "'>" + _(dialogStates["CONTROL_MODE"].valueList[val]) + "</option>";
						}
						if(dialogStates["CONTROL_MODE"].custom.statesAddInput) {
							dialogContent += "<option value='[INPUT]'>" + (dialogStates["CONTROL_MODE"].custom.statesAddInputCaption || _("Enter other value...")) + "</option>";
						}
						dialogContent += "</select>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedControlModeId = dialogLinkedStateIds["CONTROL_MODE"];
							var updateFunction = function(){
								var stateControlMode = getStateObject(_linkedControlModeId);
								if(stateControlMode){
									if(typeof stateControlMode.val != udef) {
										var val = stateControlMode.val.toString();
										$("#DialogControlModeValueList").val(val).selectmenu('refresh');
										if($("#DialogControlModeValueList").val() !== val){ //val is not in option-list
											if(stateControlMode.valueList && typeof stateControlMode.valueList[val] !== udef){
												$("#DialogControlModeValueList").prev("span").html(stateControlMode.valueList[val]);
											} else {
												$("#DialogControlModeValueList").prev("span").html(val + "&nbsp;");
											}
										}
									}
									dialogUpdateTimestamp(fetchedStates[_linkedControlModeId]);
								}
							};
							dialogUpdateFunctions[_linkedControlModeId].push(updateFunction);
							var bindingFunction = function(){
								$('.DialogControlModeValueList').on('change', function(e) {
									var val = $("#DialogControlModeValueList option:selected").val();
									if(val == "[INPUT]") {
										val = prompt((dialogStates["CONTROL_MODE"].custom.statesAddInputCaption || _("Enter other value...")));
										if(val == null) {
											updateState(_linkedControlModeId);
											return;
										}
										$("#DialogControlModeValueList").prev("span").html(val + "&nbsp;");
									}
									setState(_linkedControlModeId, _deviceIdEscaped, val);
									dialogUpdateTimestamp(fetchedStates[_linkedControlModeId]);
								});
							};
							dialogBindingFunctions.push(bindingFunction);
						})(); //<--End Closure
					}
					break;

					case "iQontrolMedia":
					//----Cover Image
					if(dialogStates["COVER_URL"]){
						dialogContentCountAfterHR++;
						dialogContent += "<img src='' style='max-width:150px; max-height:150px' class='iQontrolDialogMediaImage DialogMediaCoverImage' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogMediaCoverImage' id='DialogMediaCoverImage'>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _device = device;
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedCoverUrlId = dialogLinkedStateIds["COVER_URL"];
							var _linkedArtistId = dialogLinkedStateIds["ARTIST"];
							var _linkedAlbumId = dialogLinkedStateIds["ALBUM"];
							var _linkedTitleId = dialogLinkedStateIds["TITLE"];
							var _linkedTrackId = dialogLinkedStateIds["TRACK"];
							var _linkedSeasonId = dialogLinkedStateIds["SEASON"];
							var _linkedEpisodeId = dialogLinkedStateIds["EPISODE"];
							var dialogMediaCoverImageChangeTimeout;
							var updateFunction = function(){
								var coverImageReloadDelay = 100 + (parseInt(getDeviceOptionValue(_device, "coverImageReloadDelay") || "0") || 0);
								if(!dialogMediaCoverImageChangeTimeout) dialogMediaCoverImageChangeTimeout = setTimeout(function(){
									var stateCoverUrl = getStateObject(_linkedCoverUrlId);
									var stateArtist = getStateObject(_linkedArtistId);
									var stateAlbum = getStateObject(_linkedAlbumId);
									var stateTitle = getStateObject(_linkedTitleId);
									var stateTrack = getStateObject(_linkedTrackId);
									var stateSeason = getStateObject(_linkedSeasonId);
									var stateEpisode = getStateObject(_linkedEpisodeId);
									if(stateCoverUrl && stateCoverUrl.val && stateCoverUrl.val !== ""){
										var newSrc = stateCoverUrl.val;
										var AATTSE = encodeURI((stateArtist && stateArtist.val || "") + (stateAlbum && stateAlbum.val || "") + (stateTitle && stateTitle.val || "") + (stateTrack && stateTrack.val || "") + (stateSeason && stateSeason.val || "") + (stateEpisode && stateEpisode.val || ""));
										if(newSrc.indexOf('?') == -1) {
											newSrc += "?AATTSE = " + AATTSE;
										} else {
											newSrc += "&AATTSE = " + AATTSE;
										}
										if($("#DialogMediaCoverImage").attr('src') != newSrc){
											console.log("Changing DialogMediaCoverImage to " + newSrc);
											$("#DialogMediaCoverImage").fadeTo(0,0);
											setTimeout(function(){
												$("#DialogMediaCoverImage").attr('src', newSrc).on('load', function(){
													$("#DialogMediaCoverImage").fadeTo(0,1);
												});
											}, 250);
											$("#DialogMediaCoverImage").slideDown();
											dialogUpdateTimestamp(fetchedStates[_linkedCoverUrlId]);
										}
									} else {
										$("#DialogMediaCoverImage").slideUp(500).removeAttr('src');
									}
									dialogMediaCoverImageChangeTimeout = false;
								}, coverImageReloadDelay);
							};
							dialogUpdateFunctions[_linkedCoverUrlId].push(updateFunction);
							//Because some devices always use the same cover-url but change the image itsself it should be reloaded when artist, album, track,... changes:
							if(dialogLinkedStateIds["ARTIST"]) dialogUpdateFunctions[dialogLinkedStateIds["ARTIST"]].push(updateFunction);
							if(dialogLinkedStateIds["ALBUM"]) dialogUpdateFunctions[dialogLinkedStateIds["ALBUM"]].push(updateFunction);
							if(dialogLinkedStateIds["TITLE"]) dialogUpdateFunctions[dialogLinkedStateIds["TITLE"]].push(updateFunction);
							if(dialogLinkedStateIds["TRACK"]) dialogUpdateFunctions[dialogLinkedStateIds["TRACK"]].push(updateFunction);
							if(dialogLinkedStateIds["SEASON"]) dialogUpdateFunctions[dialogLinkedStateIds["SEASON"]].push(updateFunction);
							if(dialogLinkedStateIds["EPISODE"]) dialogUpdateFunctions[dialogLinkedStateIds["EPISODE"]].push(updateFunction);
						})(); //<--End Closure
					}
					//----Artist
					if(dialogStates["ARTIST"]){
						dialogContentCountAfterHR++;
						dialogContent += "<span class='iQontrolDialogMediaText artist' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogMediaArtist' id='DialogMediaArtist'></span>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedArtistId = dialogLinkedStateIds["ARTIST"];
							var updateFunction = function(){
								var stateArtist = getStateObject(_linkedArtistId);
								if(stateArtist){
									$("#DialogMediaArtist").html("<br>" + stateArtist.plainText);
									if(stateArtist.plainText == "") $("#DialogMediaArtist").hide(); else $("#DialogMediaArtist").show();
									dialogUpdateTimestamp(fetchedStates[_linkedArtistId]);
								}
							};
							dialogUpdateFunctions[_linkedArtistId].push(updateFunction);
						})(); //<--End Closure
					}
					//----Album
					if(dialogStates["ALBUM"]){
						dialogContentCountAfterHR++;
						dialogContent += "<span class='iQontrolDialogMediaText album' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogMediaAlbum' id='DialogMediaAlbum'></span>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedAlbumId = dialogLinkedStateIds["ALBUM"];
							var updateFunction = function(){
								var stateAlbum = getStateObject(_linkedAlbumId);
								if(stateAlbum){
									$("#DialogMediaAlbum").html("<br>" + stateAlbum.plainText);
									if(stateAlbum.plainText == "") $("#DialogMediaAlbum").hide(); else $("#DialogMediaAlbum").show();
									dialogUpdateTimestamp(fetchedStates[_linkedAlbumId]);
								}
							};
							dialogUpdateFunctions[_linkedAlbumId].push(updateFunction);
						})(); //<--End Closure
					}
					//----Title
					if(dialogStates["TITLE"]){
						dialogContentCountAfterHR++;
						dialogContent += "<span class='iQontrolDialogMediaText title' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogMediaTitle' id='DialogMediaTitle'></span>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedTitleId = dialogLinkedStateIds["TITLE"];
							var updateFunction = function(){
								var stateTitle = getStateObject(_linkedTitleId);
								if(stateTitle){
									$("#DialogMediaTitle").html("<br>" + stateTitle.plainText);
									if(stateTitle.plainText == "") $("#DialogMediaTitle").hide(); else $("#DialogMediaTitle").show();
									dialogUpdateTimestamp(fetchedStates[_linkedTitleId]);
								}
							};
							dialogUpdateFunctions[_linkedTitleId].push(updateFunction);
						})(); //<--End Closure
					}
					//----Track
					if(dialogStates["TRACK"]){
						dialogContentCountAfterHR++;
						dialogContent += "<span class='iQontrolDialogMediaText track small' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogMediaTrack' id='DialogMediaTrack'></span>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedTrackId = dialogLinkedStateIds["TITLE"];
							var updateFunction = function(){
								var stateTrack = getStateObject(_linkedTrackId);
								if(stateTrack){
									$("#DialogMediaTrack").html("<br>" + _("Track") + "&nbsp;" + stateTrack.plainText);
									if(stateTrack.plainText == "") $("#DialogMediaTrack").hide(); else $("#DialogMediaTrack").show();
									dialogUpdateTimestamp(fetchedStates[_linkedTrackId]);
								}
							};
							dialogUpdateFunctions[_linkedTitleId].push(updateFunction);
						})(); //<--End Closure
					}
					//----Season
					if(dialogStates["SEASON"]){
						dialogContentCountAfterHR++;
						dialogContent += "<span class='iQontrolDialogMediaText season' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogMediaSeason' id='DialogMediaSeason'></span>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedSeasonId = dialogLinkedStateIds["SEASON"];
							var updateFunction = function(){
								var stateSeason = getStateObject(_linkedSeasonId);
								if(stateSeason){
									$("#DialogMediaSeason").html("<br>" + stateSeason.plainText);
									if(stateSeason.plainText == "") $("#DialogMediaSeason").hide(); else $("#DialogMediaSeason").show();
									dialogUpdateTimestamp(fetchedStates[_linkedSeasonId]);
								}
							};
							dialogUpdateFunctions[_linkedSeasonId].push(updateFunction);
						})(); //<--End Closure
					}
					//----Episode
					if(dialogStates["EPISODE"]){
						dialogContentCountAfterHR++;
						dialogContent += "<span class='iQontrolDialogMediaText episode' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogMediaEpisode' id='DialogMediaEpisode'></span>";
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _linkedEpisodeId = dialogLinkedStateIds["EPISODE"];
							var updateFunction = function(){
								var stateEpisode = getStateObject(_linkedEpisodeId);
								if(stateEpisode){
									$("#DialogMediaEpisode").html("<br>" + stateEpisode.plainText);
									if(stateEpisode.plainText == "") $("#DialogMediaEpisode").hide(); else $("#DialogMediaEpisode").show();
									dialogUpdateTimestamp(fetchedStates[_linkedEpisodeId]);
								}
							};
							dialogUpdateFunctions[_linkedEpisodeId].push(updateFunction);
						})(); //<--End Closure
					}
					//----Seekbar
					if(dialogStates["ELAPSED"]){
						if(dialogStates["ELAPSED"].type == "level"){
							dialogContentCountAfterHR++;
							var min = dialogStates["ELAPSED"].min || 0;
							var max = dialogStates["ELAPSED"].max || 200;
							var step = dialogStates["ELAPSED"].step || 1;
							dialogContent += "<input type='number' data-type='range' class='iQontrolDialogSlider small' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["ELAPSED"].readonly || dialogReadonly).toString() + "' data-highlight='true' data-popup-enabled='false' data-show-value='false' data-mini='true' name='DialogElapsedLevelSlider' id='DialogElapsedLevelSlider' min='" + min + "' max='" + max + "' step='" + step + "'/>";
							dialogContent += "<div class='ui-grid-a' style='margin: -11px 8px 10px 3px;'><div class='ui-block-a'><span class='small' data-iQontrol-Device-ID='" + deviceIdEscaped + "' id='DialogElapsedSpan'></span></div><div class='ui-block-b' style='text-align: right;'><span class='small' data-iQontrol-Device-ID='" + deviceIdEscaped + "' id='DialogDurationSpan'></span></div></div>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _device = device;
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedElapsedLevelId = dialogLinkedStateIds["ELAPSED"];
								var _linkedDurationLevelId = dialogLinkedStateIds["DURATION"];
								var _confirm = (fetchedObjects[_linkedElapsedLevelId] && typeof fetchedObjects[_linkedElapsedLevelId].common !== udef && typeof fetchedObjects[_linkedElapsedLevelId].common.custom !== udef && fetchedObjects[_linkedElapsedLevelId].common.custom !== null && typeof fetchedObjects[_linkedElapsedLevelId].common.custom[namespace] !== udef && fetchedObjects[_linkedElapsedLevelId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedElapsedLevelId].common.custom[namespace].confirm !== udef && fetchedObjects[_linkedElapsedLevelId].common.custom[namespace].confirm == true);
								var _pincodeSet = (fetchedObjects[_linkedElapsedLevelId] && typeof fetchedObjects[_linkedElapsedLevelId].common !== udef && typeof fetchedObjects[_linkedElapsedLevelId].common.custom !== udef && fetchedObjects[_linkedElapsedLevelId].common.custom !== null && typeof fetchedObjects[_linkedElapsedLevelId].common.custom[namespace] !== udef && fetchedObjects[_linkedElapsedLevelId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedElapsedLevelId].common.custom[namespace].pincode !== udef && fetchedObjects[_linkedElapsedLevelId].common.custom[namespace].pincode !== "");
								var DialogElapsedLevelSliderReadoutTimer;
								var updateFunction = function(){
									var stateElapsedLevel = getStateObject(_linkedElapsedLevelId);
									var stateDurationLevel = getStateObject(_linkedDurationLevelId);
									var divider = (getDeviceOptionValue(_device, "durationIsMilliseconds") == "true" ? 1000 : 1);
									var elapsedIsPercentage = (getDeviceOptionValue(_device, "elapsedIsPercentage") == "true");
									if(stateDurationLevel && stateDurationLevel.val && !isNaN(stateDurationLevel.val)){
										$("#DialogElapsedLevelSlider").prop('max', stateDurationLevel.val / divider);
										$("#DialogElapsedLevelSlider").slider('refresh');
										$("#DialogDurationSpan").html(secondsToHHMMSS(stateDurationLevel.val / divider));
									} else {
										if(elapsedIsPercentage) $("#DialogElapsedLevelSlider").prop('max', 100);
										$("#DialogDurationSpan").html("");
									}
									if(stateElapsedLevel && stateElapsedLevel.val && !isNaN(stateElapsedLevel.val)){
										if(elapsedIsPercentage){
											let percentageDivider = (stateElapsedLevel.val > 1 ? 100 : 1);
											if(stateDurationLevel && stateDurationLevel.val && !isNaN(stateDurationLevel.val)){
												$("#DialogElapsedLevelSlider").val(stateElapsedLevel.val / percentageDivider * stateDurationLevel.val / divider);
												$("#DialogElapsedSpan").html(secondsToHHMMSS(stateElapsedLevel.val / percentageDivider * stateDurationLevel.val / divider));												
											} else {
												$("#DialogElapsedLevelSlider").val(stateElapsedLevel.val / percentageDivider);
												$("#DialogElapsedSpan").html((stateElapsedLevel.val / percentageDivider) + "%");
											}
										} else {
											$("#DialogElapsedLevelSlider").val(stateElapsedLevel.val / divider);
											$("#DialogElapsedSpan").html(secondsToHHMMSS(stateElapsedLevel.val / divider));											
										}
										$("#DialogElapsedLevelSlider").slider('refresh');
										$("#DialogElapsedLevelSlider").parent("div").show(500);
										$("#DialogElapsedSpan").show();
										$("#DialogDurationSpan").show();
									} else {
										$("#DialogElapsedLevelSlider").parent("div").hide(1000);
										$("#DialogElapsedSpan").hide();
										$("#DialogDurationSpan").hide();
									}
								};
								dialogUpdateFunctions[_linkedElapsedLevelId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogElapsedLevelSlider').slider({
										start: function(event, ui){
											clearInterval(DialogElapsedLevelSliderReadoutTimer);
											if(!_confirm && !_pincodeSet) {
												DialogElapsedLevelSliderReadoutTimer = setInterval(function(){
													setState(_linkedElapsedLevelId, _deviceIdEscaped, $("#DialogElapsedLevelSlider").val());
												}, 500);
											}
										},
										stop: function(event, ui) {
											clearInterval(DialogElapsedLevelSliderReadoutTimer);
											setState(_linkedElapsedLevelId, _deviceIdEscaped, $("#DialogElapsedLevelSlider").val());
										}
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
					}
					//----Media-Control (PREV, REWIND, PLAY, PAUSE, STOP, FORWARD, NEXT)
					if(!dialogReadonly && ((dialogStates["PREV"] && dialogStates["PREV"].type) || (dialogStates["REWIND"] && dialogStates["REWIND"].type) || (dialogStates["PLAY"] && dialogStates["PLAY"].type) || (dialogStates["PAUSE"] && dialogStates["PAUSE"].type) || (dialogStates["STOP"] && dialogStates["STOP"].type) || (dialogStates["FORWARD"] && dialogStates["FORWARD"].type) || (dialogStates["NEXT"] && dialogStates["NEXT"].type))){
						dialogContentCountAfterHR++;
						dialogContent += "<fieldset data-role='controlgroup' data-type='horizontal'>";
						if(dialogStates["PREV"] && dialogStates["PREV"].type){
							dialogContent += "<input type='checkbox' data-mini='true' class='iQontrolDialogCheckboxradio' data-iQontrol-Device-ID='" + deviceIdEscaped +"' name='DialogMediaControlPrevCheckbox' id='DialogMediaControlPrevCheckbox'>";
							dialogContent += "<label for='DialogMediaControlPrevCheckbox'><img src='./images/symbols/media_prev.png' alt='Previous' style='width:18px; height:18px; margin: 3px 0px -3px 0px;'></label>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedButtonId = dialogLinkedStateIds["PREV"];
								var updateFunction = function(){
									var buttonState = getStateObject(_linkedButtonId);
									if(buttonState){
										if(buttonState.readonly || dialogReadonly){
											$("input[name=DialogMediaControlPrevCheckbox]").attr("disabled", true);
										} else {
											$("input[name=DialogMediaControlPrevCheckbox]").attr("disabled", false);
										}
									}
									$("#DialogMediaControlPrevCheckbox").checkboxradio('refresh');
								};
								dialogUpdateFunctions[_linkedButtonId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogMediaControlPrevCheckbox').on('click', function(e) {
										setState(_linkedButtonId, _deviceIdEscaped, true, true);
										$("#DialogMediaControlPrevCheckbox").prop("checked", false);
										$("#DialogMediaControlPrevCheckbox").checkboxradio('refresh');
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						if(dialogStates["REWIND"] && dialogStates["REWIND"].type){
							dialogContent += "<input type='checkbox' data-mini='true' class='iQontrolDialogCheckboxradio' data-iQontrol-Device-ID='" + deviceIdEscaped +"' name='DialogMediaControlRewindCheckbox' id='DialogMediaControlRewindCheckbox'>";
							dialogContent += "<label for='DialogMediaControlRewindCheckbox'><img src='./images/symbols/media_rewind.png' alt='Previous' style='width:18px; height:18px; margin: 3px 0px -3px 0px;'></label>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedButtonId = dialogLinkedStateIds["REWIND"];
								var updateFunction = function(){
									var buttonState = getStateObject(_linkedButtonId);
									if(buttonState){
										if(buttonState.readonly || dialogReadonly){
											$("input[name=DialogMediaControlRewindCheckbox]").attr("disabled", true);
										} else {
											$("input[name=DialogMediaControlRewindCheckbox]").attr("disabled", false);
										}
									}
									$("#DialogMediaControlRewindCheckbox").checkboxradio('refresh');
								};
								dialogUpdateFunctions[_linkedButtonId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogMediaControlRewindCheckbox').on('click', function(e) {
										setState(_linkedButtonId, _deviceIdEscaped, true, true);
										$("#DialogMediaControlRewindCheckbox").prop("checked", false);
										$("#DialogMediaControlRewindCheckbox").checkboxradio('refresh');
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						if(dialogStates["PLAY"] && dialogStates["PLAY"].type){
							dialogContent += "<input type='checkbox' data-mini='true' class='iQontrolDialogCheckboxradio' data-iQontrol-Device-ID='" + deviceIdEscaped +"' name='DialogMediaControlPlayCheckbox' id='DialogMediaControlPlayCheckbox'>";
							dialogContent += "<label for='DialogMediaControlPlayCheckbox'><img src='./images/symbols/media_play.png' alt='Play' style='width:18px; height:18px; margin: 3px 0px -3px 0px;'></label>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _device = device;
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedButtonId = dialogLinkedStateIds["PLAY"];
								var _linkedStateId = dialogLinkedStateIds["STATE"];
								var _statePlayValue = getDeviceOptionValue(_device, "statePlayValue") || "play";
								var _statePauseValue = getDeviceOptionValue(_device, "statePauseValue") || "pause";
								var _stateStopValue = getDeviceOptionValue(_device, "stateStopValue") || "stop";
								var _useStateValuesForPlayPauseStop = getDeviceOptionValue(_device, "useStateValuesForPlayPauseStop") == "true";
								var updateFunction = function(){
									var buttonState = getStateObject(_linkedButtonId);
									var state = getStateObject(_linkedStateId);
									if(buttonState){
										if(buttonState.readonly || dialogReadonly){
											$("input[name=DialogMediaControlPlayCheckbox]").attr("disabled", true);
										} else {
											$("input[name=DialogMediaControlPlayCheckbox]").attr("disabled", false);
										}
									}
									if(state && typeof state.val !== udef && ((typeof state.val == "boolean" && state.val) || state.val == _statePlayValue)){ //Play
										$("#DialogMediaControlPlayCheckbox").prop("checked", true);
									} else if(state && typeof state.val !== udef && ((typeof state.val == "boolean" && !state.val) || state.val == _statePauseValue)){ //Pause
										$("#DialogMediaControlPlayCheckbox").prop("checked", false);
									} else if(state && typeof state.val !== udef && state.val == _stateStopValue){ //Stop
										$("#DialogMediaControlPlayCheckbox").prop("checked", false);
									} else { //Undefined
										$("#DialogMediaControlPlayCheckbox").prop("checked", false);
									}
									$("#DialogMediaControlPlayCheckbox").checkboxradio('refresh');
								};
								dialogUpdateFunctions[_linkedButtonId].push(updateFunction);
								dialogUpdateFunctions[_linkedStateId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogMediaControlPlayCheckbox').on('click', function(e) {
										setState(_linkedButtonId, _deviceIdEscaped, (_useStateValuesForPlayPauseStop ? _statePlayValue : true), true);
										$("#DialogMediaControlPlayCheckbox").prop("checked", false);
										$("#DialogMediaControlPlayCheckbox").checkboxradio('refresh');
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						if(dialogStates["PAUSE"] && dialogStates["PAUSE"].type){
							dialogContent += "<input type='checkbox' data-mini='true' class='iQontrolDialogCheckboxradio' data-iQontrol-Device-ID='" + deviceIdEscaped +"' name='DialogMediaControlPauseCheckbox' id='DialogMediaControlPauseCheckbox'>";
							dialogContent += "<label for='DialogMediaControlPauseCheckbox'><img src='./images/symbols/media_pause.png' alt='Pause' style='width:18px; height:18px; margin: 3px 0px -3px 0px;'></label>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _device = device;
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedButtonId = dialogLinkedStateIds["PAUSE"];
								var _linkedStateId = dialogLinkedStateIds["STATE"];
								var _statePlayValue = getDeviceOptionValue(_device, "statePlayValue") || "play";
								var _statePauseValue = getDeviceOptionValue(_device, "statePauseValue") || "pause";
								var _stateStopValue = getDeviceOptionValue(_device, "stateStopValue") || "stop";
								var _useStateValuesForPlayPauseStop = getDeviceOptionValue(_device, "useStateValuesForPlayPauseStop") == "true";
								var updateFunction = function(){
									var buttonState = getStateObject(_linkedButtonId);
									var state = getStateObject(_linkedStateId);
									if(buttonState){
										if(buttonState.readonly || dialogReadonly){
											$("input[name=DialogMediaControlPauseCheckbox]").attr("disabled", true);
										} else {
											$("input[name=DialogMediaControlPauseCheckbox]").attr("disabled", false);
										}
									}
									if(state && typeof state.val !== udef && ((typeof state.val == "boolean" && state.val) || state.val == _statePlayValue)){ //Play
										$("#DialogMediaControlPauseCheckbox").prop("checked", false);
									} else if(state && typeof state.val !== udef && ((typeof state.val == "boolean" && !state.val) || state.val == _statePauseValue)){ //Pause
										$("#DialogMediaControlPauseCheckbox").prop("checked", true);
									} else if(state && typeof state.val !== udef && state.val == _stateStopValue){ //Stop
										$("#DialogMediaControlPauseCheckbox").prop("checked", false);
									} else { //Undefined
										$("#DialogMediaControlPauseCheckbox").prop("checked", false);
									}
									$("#DialogMediaControlPauseCheckbox").checkboxradio('refresh');
								};
								dialogUpdateFunctions[_linkedButtonId].push(updateFunction);
								dialogUpdateFunctions[_linkedStateId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogMediaControlPauseCheckbox').on('click', function(e) {
										setState(_linkedButtonId, _deviceIdEscaped, (_useStateValuesForPlayPauseStop ? _statePauseValue : true), true);
										$("#DialogMediaControlPauseCheckbox").prop("checked", false);
										$("#DialogMediaControlPauseCheckbox").checkboxradio('refresh');
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						if(dialogStates["STOP"] && dialogStates["STOP"].type){
							dialogContent += "<input type='checkbox' data-mini='true' class='iQontrolDialogCheckboxradio' data-iQontrol-Device-ID='" + deviceIdEscaped +"' name='DialogMediaControlStopCheckbox' id='DialogMediaControlStopCheckbox'>";
							dialogContent += "<label for='DialogMediaControlStopCheckbox'><img src='./images/symbols/media_stop.png' alt='Stop' style='width:18px; height:18px; margin: 3px 0px -3px 0px;'></label>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _device = device;
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedButtonId = dialogLinkedStateIds["STOP"];
								var _linkedStateId = dialogLinkedStateIds["STATE"];
								var _statePlayValue = getDeviceOptionValue(_device, "statePlayValue") || "play";
								var _statePauseValue = getDeviceOptionValue(_device, "statePauseValue") || "pause";
								var _stateStopValue = getDeviceOptionValue(_device, "stateStopValue") || "stop";
								var _useStateValuesForPlayPauseStop = getDeviceOptionValue(_device, "useStateValuesForPlayPauseStop") == "true";
								var updateFunction = function(){
									var buttonState = getStateObject(_linkedButtonId);
									var state = getStateObject(_linkedStateId);
									if(buttonState){
										if(buttonState.readonly || dialogReadonly){
											$("input[name=DialogMediaControlStopCheckbox]").attr("disabled", true);
										} else {
											$("input[name=DialogMediaControlStopCheckbox]").attr("disabled", false);
										}
									}
									if(state && typeof state.val !== udef && ((typeof state.val == "boolean" && state.val) || state.val == _statePlayValue)){ //Play
										$("#DialogMediaControlStopCheckbox").prop("checked", false);
									} else if(state && typeof state.val !== udef && ((typeof state.val == "boolean" && !state.val) || state.val == _statePauseValue)){ //Pause
										$("#DialogMediaControlStopCheckbox").prop("checked", false);
									} else if(state && typeof state.val !== udef && state.val == _stateStopValue){ //Stop
										$("#DialogMediaControlStopCheckbox").prop("checked", true);
									} else { //Undefined
										$("#DialogMediaControlStopCheckbox").prop("checked", false);
									}
									$("#DialogMediaControlStopCheckbox").checkboxradio('refresh');
								};
								dialogUpdateFunctions[_linkedButtonId].push(updateFunction);
								dialogUpdateFunctions[_linkedStateId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogMediaControlStopCheckbox').on('click', function(e) {
										setState(_linkedButtonId, _deviceIdEscaped, (_useStateValuesForPlayPauseStop ? _stateStopValue : true), true);
										$("#DialogMediaControlStopCheckbox").prop("checked", false);
										$("#DialogMediaControlStopCheckbox").checkboxradio('refresh');
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						if(dialogStates["FORWARD"] && dialogStates["FORWARD"].type){
							dialogContent += "<input type='checkbox' data-mini='true' class='iQontrolDialogCheckboxradio' data-iQontrol-Device-ID='" + deviceIdEscaped +"' name='DialogMediaControlForwardCheckbox' id='DialogMediaControlForwardCheckbox'>";
							dialogContent += "<label for='DialogMediaControlForwardCheckbox'><img src='./images/symbols/media_forward.png' alt='Forward' style='width:18px; height:18px; margin: 3px 0px -3px 0px;'></label>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedButtonId = dialogLinkedStateIds["FORWARD"];
								var updateFunction = function(){
									var buttonState = getStateObject(_linkedButtonId);
									if(buttonState){
										if(buttonState.readonly || dialogReadonly){
											$("input[name=DialogMediaControlForwardCheckbox]").attr("disabled", true);
										} else {
											$("input[name=DialogMediaControlForwardCheckbox]").attr("disabled", false);
										}
									}
									$("#DialogMediaControlForwardCheckbox").checkboxradio('refresh');
								};
								dialogUpdateFunctions[_linkedButtonId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogMediaControlForwardCheckbox').on('click', function(e) {
										setState(_linkedButtonId, _deviceIdEscaped, true, true);
										$("#DialogMediaControlForwardCheckbox").prop("checked", false);
										$("#DialogMediaControlForwardCheckbox").checkboxradio('refresh');
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						if(dialogStates["NEXT"] && dialogStates["NEXT"].type){
							dialogContent += "<input type='checkbox' data-mini='true' class='iQontrolDialogCheckboxradio' data-iQontrol-Device-ID='" + deviceIdEscaped +"' name='DialogMediaControlNextCheckbox' id='DialogMediaControlNextCheckbox'>";
							dialogContent += "<label for='DialogMediaControlNextCheckbox'><img src='./images/symbols/media_next.png' alt='Next' style='width:18px; height:18px; margin: 3px 0px -3px 0px;'></label>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedButtonId = dialogLinkedStateIds["NEXT"];
								var updateFunction = function(){
									var buttonState = getStateObject(_linkedButtonId);
									if(buttonState){
										if(buttonState.readonly || dialogReadonly){
											$("input[name=DialogMediaControlNextCheckbox]").attr("disabled", true);
										} else {
											$("input[name=DialogMediaControlNextCheckbox]").attr("disabled", false);
										}
									}
									$("#DialogMediaControlNextCheckbox").checkboxradio('refresh');
								};
								dialogUpdateFunctions[_linkedButtonId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogMediaControlNextCheckbox').on('click', function(e) {
										setState(_linkedButtonId, _deviceIdEscaped, true, true);
										$("#DialogMediaControlNextCheckbox").prop("checked", false);
										$("#DialogMediaControlNextCheckbox").checkboxradio('refresh');
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						dialogContent += "</fieldset>";
					}
					//----Media-Control (SHUFFLE, REPEAT, MUTE, PLAY_EVERYWHERE EJECT, POWER_SWITCH)
					if(!dialogReadonly && ((dialogStates["SHUFFLE"] && dialogStates["SHUFFLE"].type) || (dialogStates["REPEAT"] && dialogStates["REPEAT"].type) || (dialogStates["MUTE"] && dialogStates["MUTE"].type) || (dialogStates["PLAY_EVERYWHERE"] && dialogStates["PLAY_EVERYWHERE"].type) || (dialogStates["EJECT"] && dialogStates["EJECT"].type) || (dialogStates["POWER_SWITCH"] && dialogStates["POWER_SWITCH"].type))){
						dialogContentCountAfterHR++;
						dialogContent += "<fieldset data-role='controlgroup' data-type='horizontal'>";
						if(dialogStates["SHUFFLE"] && dialogStates["SHUFFLE"].type){
							dialogContent += "<input type='checkbox' data-mini='true' class='iQontrolDialogCheckboxradio' data-iQontrol-Device-ID='" + deviceIdEscaped +"' name='DialogMediaControlShuffleCheckbox' id='DialogMediaControlShuffleCheckbox'>";
							dialogContent += "<label for='DialogMediaControlShuffleCheckbox' style='padding:7px 9px 7px 9px;'><img src='./images/symbols/media_shuffle.png' alt='Shuffle' style='width:15px; height:15px; margin:0px 0px -4px 0px;'></label>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedButtonId = dialogLinkedStateIds["SHUFFLE"];
								var updateFunction = function(){
									var buttonState = getStateObject(_linkedButtonId);
									if(buttonState){
										if(buttonState.readonly || dialogReadonly){
											$("input[name=DialogMediaControlShuffleCheckbox]").attr("disabled", true);
										} else {
											$("input[name=DialogMediaControlShuffleCheckbox]").attr("disabled", false);
										}
										if(buttonState.val == false || buttonState.val.toString().toLowerCase() == "false" || buttonState.val == 0 || buttonState.val == "0"){
											$("#DialogMediaControlShuffleCheckbox").prop("checked", false);
										} else {
											$("#DialogMediaControlShuffleCheckbox").prop("checked", true);
										}
										$("#DialogMediaControlShuffleCheckbox").checkboxradio('refresh');
									}
								};
								dialogUpdateFunctions[_linkedButtonId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogMediaControlShuffleCheckbox').on('click', function(e) {
										var checked = $("#DialogMediaControlShuffleCheckbox").prop("checked");
										setState(_linkedButtonId, _deviceIdEscaped, checked, true);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						if(dialogStates["REPEAT"] && dialogStates["REPEAT"].type){
							dialogContent += "<input type='checkbox' data-mini='true' class='iQontrolDialogCheckboxradio' data-iQontrol-Device-ID='" + deviceIdEscaped +"' name='DialogMediaControlRepeatCheckbox' id='DialogMediaControlRepeatCheckbox'>";
							dialogContent += "<label for='DialogMediaControlRepeatCheckbox' style='padding:7px 9px 7px 9px;'><img src='./images/symbols/media_repeat.png' alt='Repeat' style='width:15px; height:15px; margin:0px 0px -4px 0px;' id='DialogMediaControlRepeatCheckboxRepeatAllImage'><img src='./images/media_repeat_one.png' alt='Repeat 1' style='display:none; width:15px; height:15px; margin:0px 0px -4px 0px;' id='DialogMediaControlRepeatCheckboxRepeatOneImage'></label>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _device = device;
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedButtonId = dialogLinkedStateIds["REPEAT"];
								var updateFunction = function(){
									var buttonState = getStateObject(_linkedButtonId);
									var repeatAllValue = getDeviceOptionValue(_device, "repeatAllValue") || "true";
									var repeatOneValue = getDeviceOptionValue(_device, "repeatOneValue") || "2";
									if(buttonState){
										if(buttonState.readonly || dialogReadonly){
											$("input[name=DialogMediaControlRepeatCheckbox]").attr("disabled", true);
										} else {
											$("input[name=DialogMediaControlRepeatCheckbox]").attr("disabled", false);
										}
										if(buttonState.val.toString() == repeatAllValue){
											$("#DialogMediaControlRepeatCheckbox").prop("checked", true);
											$("#DialogMediaControlRepeatCheckbox").data("repeat-one", "false");
											$("#DialogMediaControlRepeatCheckboxRepeatAllImage").show();
											$("#DialogMediaControlRepeatCheckboxRepeatOneImage").hide();
										} else if(buttonState.val.toString() == repeatOneValue){
											$("#DialogMediaControlRepeatCheckbox").prop("checked", true);
											$("#DialogMediaControlRepeatCheckbox").data("repeat-one", "true");
											$("#DialogMediaControlRepeatCheckboxRepeatAllImage").hide();
											$("#DialogMediaControlRepeatCheckboxRepeatOneImage").show();
										} else {
											if(buttonState.val == true || buttonState.val.toString().toLowerCase() == "true" || buttonState.val == 1 || buttonState.val == "1"){
												$("#DialogMediaControlRepeatCheckbox").prop("checked", true);
												$("#DialogMediaControlRepeatCheckbox").data("repeat-one", "false");
												$("#DialogMediaControlRepeatCheckboxRepeatAllImage").show();
												$("#DialogMediaControlRepeatCheckboxRepeatOneImage").hide();
											} else {
												$("#DialogMediaControlRepeatCheckbox").prop("checked", false);
												$("#DialogMediaControlRepeatCheckbox").data("repeat-one", "false");
												$("#DialogMediaControlRepeatCheckboxRepeatAllImage").show();
												$("#DialogMediaControlRepeatCheckboxRepeatOneImage").hide();
											}
										}
										$("#DialogMediaControlRepeatCheckbox").checkboxradio('refresh');
									}
								};
								dialogUpdateFunctions[_linkedButtonId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogMediaControlRepeatCheckbox').on('click', function(e) {
										var buttonState = getStateObject(_linkedButtonId);
										var repeatOffValue = getDeviceOptionValue(_device, "repeatOffValue") || "false";
										var repeatAllValue = getDeviceOptionValue(_device, "repeatAllValue") || "true";
										var repeatOneValue = getDeviceOptionValue(_device, "repeatOneValue") || "2";
										var checked = $("#DialogMediaControlRepeatCheckbox").prop("checked");
										var repeatOne = $("#DialogMediaControlRepeatCheckbox").data("repeat-one") || "false";
										var result = false;
										if(!checked && repeatOne == "false" && ((buttonState.type == "valueList" && buttonState.valueList.length > 2) || typeof buttonState.val == "string")){
											result = repeatOneValue;
											$("#DialogMediaControlRepeatCheckbox").prop("checked", true);
											$("#DialogMediaControlRepeatCheckbox").data("repeat-one", "true");
											$("#DialogMediaControlRepeatCheckboxRepeatAllImage").hide();
											$("#DialogMediaControlRepeatCheckboxRepeatOneImage").show();
										} else if(!checked) {
											result = repeatOffValue;
											$("#DialogMediaControlRepeatCheckbox").data("repeat-one", "false");
											$("#DialogMediaControlRepeatCheckboxRepeatAllImage").show();
											$("#DialogMediaControlRepeatCheckboxRepeatOneImage").hide();
										} else {
											result = repeatAllValue;
											$("#DialogMediaControlRepeatCheckbox").data("repeat-one", "false");
											$("#DialogMediaControlRepeatCheckboxRepeatAllImage").show();
											$("#DialogMediaControlRepeatCheckboxRepeatOneImage").hide();
										}
										setState(_linkedButtonId, _deviceIdEscaped, result, true);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						if(dialogStates["MUTE"] && dialogStates["MUTE"].type){
							dialogContent += "<input type='checkbox' data-mini='true' class='iQontrolDialogCheckboxradio' data-iQontrol-Device-ID='" + deviceIdEscaped +"' name='DialogMediaControlMuteCheckbox' id='DialogMediaControlMuteCheckbox'>";
							dialogContent += "<label for='DialogMediaControlMuteCheckbox' style='padding:7px 9px 7px 9px;'><img src='./images/symbols/media_mute.png' alt='Mute' style='width:15px; height:15px; margin:0px 0px -4px 0px;'></label>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedButtonId = dialogLinkedStateIds["MUTE"];
								var updateFunction = function(){
									var buttonState = getStateObject(_linkedButtonId);
									if(buttonState){
										if(buttonState.readonly || dialogReadonly){
											$("input[name=DialogMediaControlMuteCheckbox]").attr("disabled", true);
										} else {
											$("input[name=DialogMediaControlMuteCheckbox]").attr("disabled", false);
										}
										if(buttonState.val == false || buttonState.val.toString().toLowerCase() == "false" || buttonState.val == 0 || buttonState.val == "0"){
											$("#DialogMediaControlMuteCheckbox").prop("checked", false);
										} else {
											$("#DialogMediaControlMuteCheckbox").prop("checked", true);
										}
										$("#DialogMediaControlMuteCheckbox").checkboxradio('refresh');
									}
								};
								dialogUpdateFunctions[_linkedButtonId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogMediaControlMuteCheckbox').on('click', function(e) {
										var checked = $("#DialogMediaControlMuteCheckbox").prop("checked");
										setState(_linkedButtonId, _deviceIdEscaped, checked, true);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						if(dialogStates["PLAY_EVERYWHERE"] && dialogStates["PLAY_EVERYWHERE"].type){
							dialogContent += "<input type='checkbox' data-mini='true' class='iQontrolDialogCheckboxradio' data-iQontrol-Device-ID='" + deviceIdEscaped +"' name='DialogMediaControlPlayEverywhereCheckbox' id='DialogMediaControlPlayEverywhereCheckbox'>";
							dialogContent += "<label for='DialogMediaControlPlayEverywhereCheckbox' style='padding:7px 9px 7px 9px;'><img src='./images/symbols/media_playeverywhere.png' alt='Play Everywhere' style='width:15px; height:15px; margin:0px 0px -4px 0px;'></label>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedButtonId = dialogLinkedStateIds["PLAY_EVERYWHERE"];
								var updateFunction = function(){
									var buttonState = getStateObject(_linkedButtonId);
									if(buttonState){
										if(buttonState.readonly || dialogReadonly){
											$("input[name=DialogMediaControlPlayEverywhereCheckbox]").attr("disabled", true);
										} else {
											$("input[name=DialogMediaControlPlayEverywhereCheckbox]").attr("disabled", false);
										}
										if(buttonState.val == false || buttonState.val.toString().toLowerCase() == "false" || buttonState.val == 0 || buttonState.val == "0"){
											$("#DialogMediaControlPlayEverywhereCheckbox").prop("checked", false);
										} else {
											$("#DialogMediaControlPlayEverywhereCheckbox").prop("checked", true);
										}
										$("#DialogMediaControlPlayEverywhereCheckbox").checkboxradio('refresh');
									}
								};
								dialogUpdateFunctions[_linkedButtonId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogMediaControlPlayEverywhereCheckbox').on('click', function(e) {
										var checked = $("#DialogMediaControlPlayEverywhereCheckbox").prop("checked");
										setState(_linkedButtonId, _deviceIdEscaped, checked, true);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						if(dialogStates["EJECT"] && dialogStates["EJECT"].type){
							dialogContent += "<input type='checkbox' data-mini='true' class='iQontrolDialogCheckboxradio' data-iQontrol-Device-ID='" + deviceIdEscaped +"' name='DialogMediaControlEjectCheckbox' id='DialogMediaControlEjectCheckbox'>";
							dialogContent += "<label for='DialogMediaControlEjectCheckbox' style='padding:7px 9px 7px 9px;'><img src='./images/symbols/media_eject.png' alt='Eject' style='width:15px; height:15px; margin:0px 0px -4px 0px;'></label>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedButtonId = dialogLinkedStateIds["EJECT"];
								var updateFunction = function(){
									var buttonState = getStateObject(_linkedButtonId);
									if(buttonState){
										if(buttonState.readonly || dialogReadonly){
											$("input[name=DialogMediaControlEjectCheckbox]").attr("disabled", true);
										} else {
											$("input[name=DialogMediaControlEjectCheckbox]").attr("disabled", false);
										}
										if(buttonState.val == false || buttonState.val.toString().toLowerCase() == "false" || buttonState.val == 0 || buttonState.val == "0"){
											$("#DialogMediaControlEjectCheckbox").prop("checked", false);
										} else {
											$("#DialogMediaControlEjectCheckbox").prop("checked", true);
										}
										$("#DialogMediaControlEjectCheckbox").checkboxradio('refresh');
									}
								};
								dialogUpdateFunctions[_linkedButtonId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogMediaControlEjectCheckbox').on('click', function(e) {
										var checked = $("#DialogMediaControlEjectCheckbox").prop("checked");
										setState(_linkedButtonId, _deviceIdEscaped, checked, true);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						if(dialogStates["POWER_SWITCH"] && dialogStates["POWER_SWITCH"].type){
							dialogContent += "<input type='checkbox' data-mini='true' class='iQontrolDialogCheckboxradio' data-iQontrol-Device-ID='" + deviceIdEscaped +"' name='DialogMediaControlPowerSwitchCheckbox' id='DialogMediaControlPowerSwitchCheckbox'>";
							dialogContent += "<label for='DialogMediaControlPowerSwitchCheckbox' style='padding:7px 9px 7px 9px;'><img src='./images/symbols/media_power.png' alt='Power' style='width:15px; height:15px; margin:0px 0px -4px 0px;'></label>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedButtonId = dialogLinkedStateIds["POWER_SWITCH"];
								var updateFunction = function(){
									var buttonState = getStateObject(_linkedButtonId);
									if(buttonState){
										if(buttonState.readonly || dialogReadonly){
											$("input[name=DialogMediaControlPowerSwitchCheckbox]").attr("disabled", true);
										} else {
											$("input[name=DialogMediaControlPowerSwitchCheckbox]").attr("disabled", false);
										}
										if(buttonState.val == false || buttonState.val.toString().toLowerCase() == "false" || buttonState.val == 0 || buttonState.val == "0"){
											$("#DialogMediaControlPowerSwitchCheckbox").prop("checked", false);
										} else {
											$("#DialogMediaControlPowerSwitchCheckbox").prop("checked", true);
										}
										$("#DialogMediaControlPowerSwitchCheckbox").checkboxradio('refresh');
									}
								};
								dialogUpdateFunctions[_linkedButtonId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogMediaControlPowerSwitchCheckbox').on('click', function(e) {
										var checked = $("#DialogMediaControlPowerSwitchCheckbox").prop("checked");
										setState(_linkedButtonId, _deviceIdEscaped, checked, true);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						dialogContent += "</fieldset>";
					}
					//----Volume
					if(dialogStates["VOLUME"]){
						if(dialogStates["VOLUME"].type == "level"){
							var min = dialogStates["VOLUME"].min || 0;
							var max = dialogStates["VOLUME"].max || 100;
							var step = dialogStates["VOLUME"].step || 1;
							var type = "Volume";
							if(dialogContentCountAfterHR > 0) dialogContent += "<hr>";
							dialogContentCountAfterHR++;
							dialogContent += "<label for='DialogVolumeLevelSlider' ><image src='./images/symbols/slider.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
							dialogContent += "<input type='number' data-type='range' class='iQontrolDialogSlider' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["VOLUME"].readonly || dialogReadonly).toString() + "' data-highlight='true' data-popup-enabled='true' data-show-value='true' name='DialogVolumeLevelSlider' id='DialogVolumeLevelSlider' min='" + min + "' max='" + max + "' step='" + step + "'/>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedVolumeLevelId = dialogLinkedStateIds["VOLUME"];
								var _confirm = (fetchedObjects[_linkedVolumeLevelId] && typeof fetchedObjects[_linkedVolumeLevelId].common !== udef && typeof fetchedObjects[_linkedVolumeLevelId].common.custom !== udef && fetchedObjects[_linkedVolumeLevelId].common.custom !== null && typeof fetchedObjects[_linkedVolumeLevelId].common.custom[namespace] !== udef && fetchedObjects[_linkedVolumeLevelId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedVolumeLevelId].common.custom[namespace].confirm !== udef && fetchedObjects[_linkedVolumeLevelId].common.custom[namespace].confirm == true);
								var _pincodeSet = (fetchedObjects[_linkedVolumeLevelId] && typeof fetchedObjects[_linkedVolumeLevelId].common !== udef && typeof fetchedObjects[_linkedVolumeLevelId].common.custom !== udef && fetchedObjects[_linkedVolumeLevelId].common.custom !== null && typeof fetchedObjects[_linkedVolumeLevelId].common.custom[namespace] !== udef && fetchedObjects[_linkedVolumeLevelId].common.custom[namespace] !== null && typeof fetchedObjects[_linkedVolumeLevelId].common.custom[namespace].pincode !== udef && fetchedObjects[_linkedVolumeLevelId].common.custom[namespace].pincode !== "");
								var DialogVolumeLevelSliderReadoutTimer;
								var updateFunction = function(){
									var stateVolumeLevel = getStateObject(_linkedVolumeLevelId);
									if(stateVolumeLevel){
										$("#DialogVolumeLevelSlider").val(stateVolumeLevel.val);
										$("#DialogVolumeLevelSlider").slider('refresh');
										dialogUpdateTimestamp(fetchedStates[_linkedVolumeLevelId]);
									}
								};
								dialogUpdateFunctions[_linkedVolumeLevelId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogVolumeLevelSlider').slider({
										start: function(event, ui){
											clearInterval(DialogVolumeLevelSliderReadoutTimer);
											if(!_confirm && !_pincodeSet) {
												DialogVolumeLevelSliderReadoutTimer = setInterval(function(){
													setState(_linkedVolumeLevelId, _deviceIdEscaped, $("#DialogVolumeLevelSlider").val());
													dialogUpdateTimestamp(fetchedStates[_linkedVolumeLevelId]);
												}, 500);
											}
										},
										stop: function(event, ui) {
											clearInterval(DialogVolumeLevelSliderReadoutTimer);
											setState(_linkedVolumeLevelId, _deviceIdEscaped, $("#DialogVolumeLevelSlider").val());
											dialogUpdateTimestamp(fetchedStates[_linkedVolumeLevelId]);
										}
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
					}

					//----RemoteControl
					if((dialogStates["REMOTE_NUMBER"] && dialogStates["REMOTE_NUMBER"].type) || (dialogStates["REMOTE_VOLUME_UP"] && dialogStates["REMOTE_VOLUME_UP"].type) || (dialogStates["REMOTE_VOLUME_DOWN"] && dialogStates["REMOTE_VOLUME_DOWN"].type) || (dialogStates["REMOTE_CH_UP"] && dialogStates["REMOTE_CH_UP"].type) || (dialogStates["REMOTE_CH_DOWN"] && dialogStates["REMOTE_CH_DOWN"].type) || (dialogStates["REMOTE_PAD_DIRECTION"] && dialogStates["REMOTE_PAD_DIRECTION"].type) || (dialogStates["REMOTE_PAD_BACK"] && dialogStates["REMOTE_PAD_BACK"].type) || (dialogStates["REMOTE_PAD_HOME"] && dialogStates["REMOTE_PAD_HOME"].type) || (dialogStates["REMOTE_PAD_MENU"] && dialogStates["REMOTE_PAD_MENU"].type) || (dialogStates["REMOTE_COLOR"] && dialogStates["REMOTE_COLOR"].type) || (dialogStates["REMOTE_ADDITIONAL_BUTTONS"] && typeof dialogStates["REMOTE_ADDITIONAL_BUTTONS"].val != udef && dialogStates["REMOTE_ADDITIONAL_BUTTONS"].val != "[]") || (dialogStates["REMOTE_CHANNELS"] && typeof dialogStates["REMOTE_CHANNELS"].val != udef && dialogStates["REMOTE_CHANNELS"].val != "[]")){
						var type = "Remote Control";
						dialogContent += "<div id='DialogRemote'>";
						if(dialogContentCountAfterHR > 0) dialogContent += "<hr>";
						dialogContentCountAfterHR++;
						dialogContent += "<label for='' ><image src='./images/symbols/buttongrid.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
						dialogContent += "<div" + (getDeviceOptionValue(device, "remoteKeepSectionsOpen") == "true" ? "" : " class='ui-collapsible-set'") + ">";
						var remoteSectionsStartOpened = getDeviceOptionValue(device, "remoteSectionsStartOpened") || "";
						//----RemoteControl Pad
						if(     ((dialogStates["REMOTE_PAD_DIRECTION"] && dialogStates["REMOTE_PAD_DIRECTION"].type) || (dialogStates["REMOTE_PAD_BACK"] && dialogStates["REMOTE_PAD_BACK"].type) || (dialogStates["REMOTE_PAD_HOME"] && dialogStates["REMOTE_PAD_HOME"].type) || (dialogStates["REMOTE_PAD_MENU"] && dialogStates["REMOTE_PAD_MENU"].type))
								|| ((getDeviceOptionValue(device, "remoteShowDirectionsInsidePad") == "true") && ((dialogStates["REMOTE_VOLUME_UP"] && dialogStates["REMOTE_VOLUME_UP"].type) || (dialogStates["REMOTE_VOLUME_DOWN"] && dialogStates["REMOTE_VOLUME_DOWN"].type) || (dialogStates["REMOTE_CH_UP"] && dialogStates["REMOTE_CH_UP"].type) || (dialogStates["REMOTE_CH_DOWN"] && dialogStates["REMOTE_CH_DOWN"].type)))
						   ){
							var remoteShowDirectionsInsidePad = (getDeviceOptionValue(device, "remoteShowDirectionsInsidePad") == "true");
							dialogContent += "<div data-role='collapsible' class='collapsibleAnimated'" + (remoteSectionsStartOpened.indexOf("REMOTE_PAD") == -1 ? "" : " data-collapsed='false'") + " data-iconpos='right' data-inset='true'>";
								dialogContent += "<h4><image src='./images/symbols/buttongrid.png' style='width:16px; height:16px;'>&nbsp;" + _("Pad") + ":</h4>";
								dialogContent += "<div class='ui-grid-b DialogRemotePadArea' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogRemotePadArea' id='DialogRemotePadArea' style='max-width:250px; border-style:dashed; border-color:lightgrey; border-width:1px; border-radius:5px; background-color:#f6f6f6; box-shadow: 0 1px 3px rgba(0,0,0,.15); touch-action: none;'>";
									if(remoteShowDirectionsInsidePad && dialogStates["REMOTE_VOLUME_UP"] && dialogStates["REMOTE_VOLUME_UP"].type){
										dialogContent += "<div class='ui-block-a DialogRemotePadButton preventClick' id='DialogRemotePadButtonVolumeUp' data-remote-pad-button='volumeUp' style='opacity: 0.7; height: 45px; background-image: url(\"./images/symbols/media_pad_vol_u.png\"); background-position: center; background-size: 16px 16px; background-repeat: no-repeat;'></div>";
									} else {
										dialogContent += "<div class='ui-block-a'></div>";
									}
									if(dialogStates["REMOTE_PAD_DIRECTION"] && dialogStates["REMOTE_PAD_DIRECTION"].type){
										dialogContent += "<div class='ui-block-b DialogRemotePadButton preventClick' id='DialogRemotePadButtonUp' data-remote-pad-button='up' style='height: 45px; background-image: url(\"./images/symbols/media_pad_carat_u.png\"); background-position: center; background-size: 16px 16px; background-repeat: no-repeat;'></div>";
									} else {
										dialogContent += "<div class='ui-block-b'></div>";
									}
									if(remoteShowDirectionsInsidePad && dialogStates["REMOTE_CH_UP"] && dialogStates["REMOTE_CH_UP"].type){
										dialogContent += "<div class='ui-block-c DialogRemotePadButton preventClick' id='DialogRemotePadButtonChUp' data-remote-pad-button='chUp' style='opacity: 0.7; height: 45px; background-image: url(\"./images/symbols/media_pad_ch_u.png\"); background-position: center; background-size: 16px 16px; background-repeat: no-repeat;'></div>";
									} else {
										dialogContent += "<div class='ui-block-c'></div>";
									}
									if(dialogStates["REMOTE_PAD_DIRECTION"] && dialogStates["REMOTE_PAD_DIRECTION"].type){
										dialogContent += "<div class='ui-block-a DialogRemotePadButton preventClick' id='DialogRemotePadButtonLeft' data-remote-pad-button='left' style='height: 45px; background-image: url(\"./images/symbols/media_pad_carat_l.png\"); background-position: center; background-size: 16px 16px; background-repeat: no-repeat;'></div>";
									} else {
										dialogContent += "<div class='ui-block-a'></div>";
									}
									if(dialogStates["REMOTE_PAD_DIRECTION"] && dialogStates["REMOTE_PAD_DIRECTION"].type){
										dialogContent += "<div class='ui-block-b DialogRemotePadButton preventClick' id='DialogRemotePadButtonOK' data-remote-pad-button='ok' style='height: 45px; background-image: url(\"./images/symbols/media_pad_ok.png\"); background-position: center; background-size: 16px 16px; background-repeat: no-repeat;'></div>";
									} else {
										dialogContent += "<div class='ui-block-b'></div>";
									}
									if(dialogStates["REMOTE_PAD_DIRECTION"] && dialogStates["REMOTE_PAD_DIRECTION"].type){
										dialogContent += "<div class='ui-block-c DialogRemotePadButton preventClick' id='DialogRemotePadButtonRight' data-remote-pad-button='right' style='height: 45px; background-image: url(\"./images/symbols/media_pad_carat_r.png\"); background-position: center; background-size: 16px 16px; background-repeat: no-repeat;'></div>";
									} else {
										dialogContent += "<div class='ui-block-c'></div>";
									}
									if(remoteShowDirectionsInsidePad && dialogStates["REMOTE_VOLUME_DOWN"] && dialogStates["REMOTE_VOLUME_DOWN"].type){
										dialogContent += "<div class='ui-block-a DialogRemotePadButton preventClick' id='DialogRemotePadButtonVolumeDown' data-remote-pad-button='volumeDown' style='opacity: 0.7; height: 45px; background-image: url(\"./images/symbols/media_pad_vol_d.png\"); background-position: center; background-size: 16px 16px; background-repeat: no-repeat;'></div>";
									} else {
										dialogContent += "<div class='ui-block-a'></div>";
									}
									if(dialogStates["REMOTE_PAD_DIRECTION"] && dialogStates["REMOTE_PAD_DIRECTION"].type){
										dialogContent += "<div class='ui-block-b DialogRemotePadButton preventClick' id='DialogRemotePadButtonDown' data-remote-pad-button='down' style='height: 45px; background-image: url(\"./images/symbols/media_pad_carat_d.png\"); background-position: center; background-size: 16px 16px; background-repeat: no-repeat;'></div>";
									} else {
										dialogContent += "<div class='ui-block-b'></div>";
									}
									if(remoteShowDirectionsInsidePad && dialogStates["REMOTE_CH_DOWN"] && dialogStates["REMOTE_CH_DOWN"].type){
										dialogContent += "<div class='ui-block-c DialogRemotePadButton preventClick' id='DialogRemotePadButtonChDown' data-remote-pad-button='chDown' style='opacity: 0.7; height: 45px; background-image: url(\"./images/symbols/media_pad_ch_d.png\"); background-position: center; background-size: 16px 16px; background-repeat: no-repeat;'></div>";
									} else {
										dialogContent += "<div class='ui-block-c'></div>";
									}
								dialogContent += "</div>";
								dialogContent += "<div class='ui-grid-b ui-nodisc-icon ui-alt-icon' style='max-width:258px; margin: 0px -3px 0px -3px;'>";
									dialogContent += "<div class='ui-block-a'>" + ((dialogStates["REMOTE_PAD_BACK"] && dialogStates["REMOTE_PAD_BACK"].type) ? "<a href='' class='DialogRemotePadButton' id='DialogRemotePadButtonBack' data-remote-pad-button='back' data-role='button' data-mini='true'><image src='./images/symbols/media_pad_back.png' style='width:16px; height:16px;'></a>" : "") + "</div>";
									dialogContent += "<div class='ui-block-b'>" + ((dialogStates["REMOTE_PAD_HOME"] && dialogStates["REMOTE_PAD_HOME"].type) ? "<a href='' class='DialogRemotePadButton' id='DialogRemotePadButtonHome' data-remote-pad-button='home' data-role='button' data-mini='true'><image src='./images/symbols/media_pad_home.png' style='width:16px; height:16px;'></a>" : "") + "</div>";
									dialogContent += "<div class='ui-block-c'>" + ((dialogStates["REMOTE_PAD_MENU"] && dialogStates["REMOTE_PAD_MENU"].type) ? "<a href='' class='DialogRemotePadButton' id='DialogRemotePadButtonMenu' data-remote-pad-button='menu' data-role='button' data-mini='true'><image src='./images/symbols/media_pad_menu.png' style='width:16px; height:16px;'></a>" : "") + "</div>";
								dialogContent += "</div>";
							dialogContent += "</div>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedRemotePadDirectionId = dialogLinkedStateIds["REMOTE_PAD_DIRECTION"];
								var _linkedRemotePadBackId = dialogLinkedStateIds["REMOTE_PAD_BACK"];
								var _linkedRemotePadHomeId = dialogLinkedStateIds["REMOTE_PAD_HOME"];
								var _linkedRemotePadMenuId = dialogLinkedStateIds["REMOTE_PAD_MENU"];
								var _linkedRemoteVolumeUpId = dialogLinkedStateIds["REMOTE_VOLUME_UP"];
								var _linkedRemoteVolumeDownId = dialogLinkedStateIds["REMOTE_VOLUME_DOWN"];
								var _linkedRemoteProgramUpId = dialogLinkedStateIds["REMOTE_CH_UP"];
								var _linkedRemoteProgramDownId = dialogLinkedStateIds["REMOTE_CH_DOWN"];
								var bindingFunction = function(){
									var swipeElement = document.getElementById('DialogRemotePadArea');
									if(!swipeElement) return;
									var startX = 0, startY = 0;
									var nowX = 0, nowY = 0;
									var dirX = "", dirY = "";
									var preventClick = false;
									var preventClickTreshold = 10;
									var initialTreshold = 50;
									var followingTreshold = 25;
									swipeElement.addEventListener('mousedown', swipeStart);
									swipeElement.addEventListener('touchstart', swipeStart);
									function swipeStart(e) {
										console.log("PAD SWIPE START");
										e = e || window.event;
										e.preventDefault();
										e.stopPropagation();
										startX = e.clientX || e.touches[0].clientX;
										startY = e.clientY || e.touches[0].clientY;
										nowX = startX;
										nowY = startY;
										dirX = "";
										dirY = "";
										tresholdX = initialTreshold;
										tresholdY = initialTreshold;
										document.addEventListener('mousemove', swipeMove);
										document.addEventListener('touchmove', swipeMove);
										document.addEventListener('mouseup', swipeEnd);
										document.addEventListener('touchend', swipeEnd);
									}
									function swipeMove(e) {
										e = e || window.event;
										e.preventDefault();
										e.stopPropagation();
										nowX = e.clientX || e.touches[0].clientX;
										nowY = e.clientY || e.touches[0].clientY;
										//console.log("   SWIPE MOVE: " + nowX + "|" + nowY);
										if(nowX - startX > 0 && dirX != "right") { dirX = "right"; startX = nowX; }
										if(nowX - startX < 0 && dirX != "left") { dirX = "left"; startX = nowX; }
										if(nowX - startX > preventClickTreshold || startX - nowX > preventClickTreshold) { preventClick = true;}
										if(nowX - startX > tresholdX) { console.log("      PAD SWIPE RIGHT >>>>"); $("#DialogRemotePadButtonRight").trigger('click'); startX = nowX; tresholdX = followingTreshold; preventClick = true;}
										if(startX - nowX > tresholdX) { console.log("      PAD SWIPE <<<<< LEFT"); $("#DialogRemotePadButtonLeft").trigger('click'); startX = nowX; tresholdX = followingTreshold; preventClick = true;}
										if(nowY - startY > 0 && dirY != "down") { dirY = "down"; startY = nowY; }
										if(nowY - startY < 0 && dirY != "up") { dirY = "up"; startY = nowY; }
										if(nowY - startY > preventClickTreshold || startY - nowY > preventClickTreshold) { preventClick = true;}
										if(nowY - startY > tresholdY) { console.log("      PAD SWIPE \\\\ DOWN //"); $("#DialogRemotePadButtonDown").trigger('click'); startY = nowY; tresholdY = followingTreshold; preventClick = true;}
										if(startY - nowY > tresholdY) { console.log("      PAD SWIPE /// UP \\\\\\"); $("#DialogRemotePadButtonUp").trigger('click'); startY = nowY; tresholdY = followingTreshold; preventClick = true;}
									}
									function swipeEnd(e) {
										console.log("PAD SWIPE END");
										e = e || window.event;
										e.preventDefault();
										e.stopPropagation();
										document.removeEventListener('mousemove', swipeMove);
										document.removeEventListener('touchmove', swipeMove);
										document.removeEventListener('mouseup', swipeEnd);
										document.removeEventListener('touchend', swipeEnd);
										var now = new Date();
										if(!preventClick) { console.log("     PAD |||||| KLICK ||||||"); $(document.elementFromPoint(nowX, nowY)).trigger('click');};
										preventClick = false;
									}
									$(".DialogRemotePadButton").on('click', function(e){
										e.preventDefault();
										e.stopPropagation();
										if($(this).hasClass('preventClick') && !e.isTrigger) return;
										var val = $(this).data("remote-pad-button");
										switch(val){
											case "back":
											setState(_linkedRemotePadBackId, _deviceIdEscaped, val, true);
											break;

											case "home":
											setState(_linkedRemotePadHomeId, _deviceIdEscaped, val, true);
											break;

											case "menu":
											setState(_linkedRemotePadMenuId, _deviceIdEscaped, val, true);
											break;

											case "volumeUp":
											setState(_linkedRemoteVolumeUpId, _deviceIdEscaped, val, true);
											break;

											case "volumeDown":
											setState(_linkedRemoteVolumeDownId, _deviceIdEscaped, val, true);
											break;

											case "chUp":
											setState(_linkedRemoteProgramUpId, _deviceIdEscaped, val, true);
											break;

											case "chDown":
											setState(_linkedRemoteProgramDownId, _deviceIdEscaped, val, true);
											break;

											default:
											setState(_linkedRemotePadDirectionId, _deviceIdEscaped, val, true);
										}
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}

						//----RemoteControl Control
						if(!(getDeviceOptionValue(device, "remoteShowDirectionsInsidePad") == "true") && ((dialogStates["REMOTE_VOLUME_UP"] && dialogStates["REMOTE_VOLUME_UP"].type) || (dialogStates["REMOTE_VOLUME_DOWN"] && dialogStates["REMOTE_VOLUME_DOWN"].type) || (dialogStates["REMOTE_CH_UP"] && dialogStates["REMOTE_CH_UP"].type) || (dialogStates["REMOTE_CH_DOWN"] && dialogStates["REMOTE_CH_DOWN"].type))){
							dialogContent += "<div data-role='collapsible' class='collapsibleAnimated'" + (remoteSectionsStartOpened.indexOf("REMOTE_CONTROL") == -1 ? "" : " data-collapsed='false'") + " data-iconpos='right' data-inset='true'>";
								dialogContent += "<h4><image src='./images/symbols/buttongrid.png' style='width:16px; height:16px;'>&nbsp;" + _("Control") + ":</h4>";
								dialogContent += "<div class='ui-grid-b' style='max-width:250px;'>";
									dialogContent += "<div class='ui-block-a'>" + ((dialogStates["REMOTE_VOLUME_UP"] && dialogStates["REMOTE_VOLUME_UP"].type) ? "<a href='' class='DialogRemoteControlButton ui-nodisc-icon ui-alt-icon' id='DialogRemoteControlButtonVolumeUp' data-remote-control-button='volumeUp' data-role='button' data-mini='true' data-icon='carat-u' data-iconpos='top'>VOL</a>" : "") + "</div>";
									dialogContent += "<div class='ui-block-b'></div>";
									dialogContent += "<div class='ui-block-c'>" + ((dialogStates["REMOTE_CH_UP"] && dialogStates["REMOTE_CH_UP"].type) ? "<a href='' class='DialogRemoteControlButton ui-nodisc-icon ui-alt-icon' id='DialogRemoteControlButtonChUp' data-remote-control-button='chUp' data-role='button' data-mini='true' data-icon='carat-u' data-iconpos='top'>CH</a>" : "") + "</div>";
									dialogContent += "<div class='ui-block-a'>" + ((dialogStates["REMOTE_VOLUME_DOWN"] && dialogStates["REMOTE_VOLUME_DOWN"].type) ? "<a href='' class='DialogRemoteControlButton ui-nodisc-icon ui-alt-icon' id='DialogRemoteControlButtonVolumeDown' data-remote-control-button='volumeDown' data-role='button' data-mini='true' data-icon='carat-d' data-iconpos='bottom'>VOL</a>" : "") + "</div>";
									dialogContent += "<div class='ui-block-b'></div>";
									dialogContent += "<div class='ui-block-c'>" + ((dialogStates["REMOTE_CH_DOWN"] && dialogStates["REMOTE_CH_DOWN"].type) ? "<a href='' class='DialogRemoteControlButton ui-nodisc-icon ui-alt-icon' id='DialogRemoteControlButtonChDown' data-remote-control-button='chDown' data-role='button' data-mini='true' data-icon='carat-d' data-iconpos='bottom'>CH</a>" : "") + "</div>";
								dialogContent += "</div>";
							dialogContent += "</div>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedRemoteVolumeUpId = dialogLinkedStateIds["REMOTE_VOLUME_UP"];
								var _linkedRemoteVolumeDownId = dialogLinkedStateIds["REMOTE_VOLUME_DOWN"];
								var _linkedRemoteProgramUpId = dialogLinkedStateIds["REMOTE_CH_UP"];
								var _linkedRemoteProgramDownId = dialogLinkedStateIds["REMOTE_CH_DOWN"];
								var bindingFunction = function(){
									$(".DialogRemoteControlButton").on('click', function(e){
										var val = $(this).data("remote-control-button");
										switch(val){
											case "volumeUp":
											setState(_linkedRemoteVolumeUpId, _deviceIdEscaped, val, true);
											break;

											case "volumeDown":
											setState(_linkedRemoteVolumeDownId, _deviceIdEscaped, val, true);
											break;

											case "chUp":
											setState(_linkedRemoteProgramUpId, _deviceIdEscaped, val, true);
											break;

											case "chDown":
											setState(_linkedRemoteProgramDownId, _deviceIdEscaped, val, true);
											break;
										}
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						//----RemoteControl Additional Buttons
						//Special: REMOTE_ADDITIONAL_BUTTONS is an Array: [{"name":"Name", "type":"LinkedState", "value":"LinkedStateId"}, ...]
						var linkedRemoteAdditionalButtonsIds;
						if(dialogStates["REMOTE_ADDITIONAL_BUTTONS"] && typeof dialogStates["REMOTE_ADDITIONAL_BUTTONS"].val != udef) linkedRemoteAdditionalButtonsIds = tryParseJSON(dialogStates["REMOTE_ADDITIONAL_BUTTONS"].val);
						var linkedRemoteAdditionalButtonsIdsAreValid = false;
						if(Array.isArray(linkedRemoteAdditionalButtonsIds) && typeof linkedRemoteAdditionalButtonsIds == 'object') linkedRemoteAdditionalButtonsIds.forEach(function(element){
							if(typeof element.name !== udef && element.name !== udef){
								linkedRemoteAdditionalButtonsIdsAreValid = true;
							}
						});
						if(linkedRemoteAdditionalButtonsIdsAreValid){
							//get additional linkedStates from Array:
							linkedRemoteAdditionalButtonsIds.forEach(function(element){
								if(typeof fetchedStates[element.value] == udef) {
									dialogStateIdsToFetch.push(element.value);
								}
								if(typeof fetchedObjects[element.value] == udef) {
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _elementValue = element.value;
										fetchObject(_elementValue, function(error){ updateState(_elementValue, "ignorePreventUpdateForDialog"); });
									})(); //<--End Closure
								}
								dialogLinkedStateIdsToUpdate.push(element.value);
							});
							dialogContentCountAfterHR++;
							var type = getDeviceOptionValue(device, "remoteAdditionalButtonsCaption") || _("Additional Buttons");
							dialogContent += "<div data-role='collapsible' class='collapsibleAnimated'" + (remoteSectionsStartOpened.indexOf("REMOTE_ADDITIONAL_BUTTONS") == -1 ? "" : " data-collapsed='false'") + " data-iconpos='right' data-inset='true'>";
								dialogContent += "<h4><image src='./images/symbols/buttongrid.png' style='width:16px; height:16px;'>&nbsp;" + type + ":</h4>";
								dialogContent += "<div class='ui-grid-a' style='max-width:400px;' id='DialogRemoteAdditionalButtonsContent'>";
								dialogContent += "</div>";
							dialogContent += "</div>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedRemoteAdditionalButtonsId = dialogLinkedStateIds["REMOTE_ADDITIONAL_BUTTONS"];
								var _linkedRemoteAdditionalButtonsIds = linkedRemoteAdditionalButtonsIds;
								var createRemoteAdditionalButtonsFunction = function(){
									$("#DialogRemoteAdditionalButtonsContent").html("");
									_linkedRemoteAdditionalButtonsIds.forEach(function(_element){
										var state = getStateObject(_element.value);
										if(state){
											$("#DialogRemoteAdditionalButtonsContent").append("<div class='ui-block-b'><a href='' class='DialogRemoteAdditionalButtonsButton' data-remote-additional-buttons-button='" + _element.name + "' data-remote-additional-buttons-linked-state-id='" + _element.value + "' data-role='button' data-mini='true'>" + (_element.icon ? "<image src='" + _element.icon + "' / style='width:24px; height:24px; margin:-2px 0px -6px 0px;'>&nbsp;" : "" ) + (_element.hideName ? "" : _element.name) + "</a></div>");
										}
										$("#DialogRemoteAdditionalButtonsContent").enhanceWithin();
									});
									$(".DialogRemoteAdditionalButtonsButton").on('click', function(e){
										setState($(this).data("remote-additional-buttons-linked-state-id"), _deviceIdEscaped, $(this).data("remote-additional-buttons-button"), true);
									});
								};
								dialogUpdateFunctions[_linkedRemoteAdditionalButtonsId].push(createRemoteAdditionalButtonsFunction);
							})(); //<--End Closure
						}
						//----RemoteControl Channels
						//Special: REMOTE_CHANNELS is an Array: [{"name":"Name", "type":"LinkedState", "value":"LinkedStateId"}, ...]
						var linkedRemoteChannelsIds;
						if(dialogStates["REMOTE_CHANNELS"] && typeof dialogStates["REMOTE_CHANNELS"].val != udef) linkedRemoteChannelsIds = tryParseJSON(dialogStates["REMOTE_CHANNELS"].val);
						var linkedRemoteChannelsIdsAreValid = false;
						if(Array.isArray(linkedRemoteChannelsIds) && typeof linkedRemoteChannelsIds == 'object') linkedRemoteChannelsIds.forEach(function(element){
							if(typeof element.name !== udef && element.name !== udef){
								linkedRemoteChannelsIdsAreValid = true;
							}
						});
						if(linkedRemoteChannelsIdsAreValid){
							//get additional linkedStates from Array:
							linkedRemoteChannelsIds.forEach(function(element){
								if(typeof fetchedStates[element.value] == udef) {
									dialogStateIdsToFetch.push(element.value);
								}
								if(typeof fetchedObjects[element.value] == udef) {
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _elementValue = element.value;
										fetchObject(_elementValue, function(error){ updateState(_elementValue, "ignorePreventUpdateForDialog"); });
									})(); //<--End Closure
								}
								dialogLinkedStateIdsToUpdate.push(element.value);
							});
							dialogContentCountAfterHR++;
							var type = getDeviceOptionValue(device, "remoteChannelsCaption") || _("Channels");
							dialogContent += "<div data-role='collapsible' class='collapsibleAnimated'" + (remoteSectionsStartOpened.indexOf("REMOTE_CHANNELS") == -1 ? "" : " data-collapsed='false'") + " data-iconpos='right' data-inset='true'>";
								dialogContent += "<h4><image src='./images/symbols/buttongrid.png' style='width:16px; height:16px;'>&nbsp;" + type + ":</h4>";
								dialogContent += "<div class='ui-grid-a' style='max-width:400px;' id='DialogRemoteChannelsContent'>";
								dialogContent += "</div>";
							dialogContent += "</div>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedRemoteChannelsId = dialogLinkedStateIds["REMOTE_CHANNELS"];
								var _linkedRemoteChannelsIds = linkedRemoteChannelsIds;
								var createRemoteChannelsFunction = function(){
									$("#DialogRemoteChannelsContent").html("");
									_linkedRemoteChannelsIds.forEach(function(_element){
										var state = getStateObject(_element.value);
										if(state){
											$("#DialogRemoteChannelsContent").append("<div class='ui-block-b'><a href='' class='DialogRemoteChannelsButton' data-remote-additional-buttons-button='" + _element.name + "' data-remote-additional-buttons-linked-state-id='" + _element.value + "' data-role='button' data-mini='false'>" + (_element.icon ? "<image src='" + _element.icon + "' / style='max-width:94px; height:32px; margin:-6px 0px -11px 0px;'>&nbsp;" : "" ) + (_element.hideName ? "" : _element.name) + "</a></div>");
										}
										$("#DialogRemoteChannelsContent").enhanceWithin();
									});
									$(".DialogRemoteChannelsButton").on('click', function(e){
										setState($(this).data("remote-additional-buttons-linked-state-id"), _deviceIdEscaped, $(this).data("remote-additional-buttons-button"), true);
									});
								};
								dialogUpdateFunctions[_linkedRemoteChannelsId].push(createRemoteChannelsFunction);
							})(); //<--End Closure
						}
						//----RemoteControl Numbers
						if(dialogStates["REMOTE_NUMBER"] && dialogStates["REMOTE_NUMBER"].type){
							dialogContentCountAfterHR++;
							dialogContent += "<div data-role='collapsible' class='collapsibleAnimated'" + (remoteSectionsStartOpened.indexOf("REMOTE_NUMBERS") == -1 ? "" : " data-collapsed='false'") + " data-iconpos='right' data-inset='true'>";
								dialogContent += "<h4><image src='./images/symbols/buttongrid.png' style='width:16px; height:16px;'>&nbsp;" + _("Numbers") + ":</h4>";
								dialogContent += "<div class='ui-grid-b' style='max-width:250px;'>";
									dialogContent += "<div class='ui-block-a'><a href='' class='DialogRemoteNumberButton' id='DialogRemoteNumberButton1' data-remote-number-button='1' data-role='button' data-mini='true'>1</a></div>";
									dialogContent += "<div class='ui-block-b'><a href='' class='DialogRemoteNumberButton' id='DialogRemoteNumberButton2' data-remote-number-button='2' data-role='button' data-mini='true'>2</a></div>";
									dialogContent += "<div class='ui-block-c'><a href='' class='DialogRemoteNumberButton' id='DialogRemoteNumberButton3' data-remote-number-button='3' data-role='button' data-mini='true'>3</a></div>";
									dialogContent += "<div class='ui-block-a'><a href='' class='DialogRemoteNumberButton' id='DialogRemoteNumberButton4' data-remote-number-button='4' data-role='button' data-mini='true'>4</a></div>";
									dialogContent += "<div class='ui-block-b'><a href='' class='DialogRemoteNumberButton' id='DialogRemoteNumberButton5' data-remote-number-button='5' data-role='button' data-mini='true'>5</a></div>";
									dialogContent += "<div class='ui-block-c'><a href='' class='DialogRemoteNumberButton' id='DialogRemoteNumberButton6' data-remote-number-button='6' data-role='button' data-mini='true'>6</a></div>";
									dialogContent += "<div class='ui-block-a'><a href='' class='DialogRemoteNumberButton' id='DialogRemoteNumberButton7' data-remote-number-button='7' data-role='button' data-mini='true'>7</a></div>";
									dialogContent += "<div class='ui-block-b'><a href='' class='DialogRemoteNumberButton' id='DialogRemoteNumberButton8' data-remote-number-button='8' data-role='button' data-mini='true'>8</a></div>";
									dialogContent += "<div class='ui-block-c'><a href='' class='DialogRemoteNumberButton' id='DialogRemoteNumberButton9' data-remote-number-button='9' data-role='button' data-mini='true'>9</a></div>";
									dialogContent += "<div class='ui-block-a'></div>";
									dialogContent += "<div class='ui-block-b'><a href='' class='DialogRemoteNumberButton' id='DialogRemoteNumberButton0' data-remote-number-button='0' data-role='button' data-mini='true'>0</a></div>";
									dialogContent += "<div class='ui-block-c'></div>";
								dialogContent += "</div>";
							dialogContent += "</div>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedRemoteNumberId = dialogLinkedStateIds["REMOTE_NUMBER"];
								var bindingFunction = function(){
									$(".DialogRemoteNumberButton").on('click', function(e){
										setState(_linkedRemoteNumberId, _deviceIdEscaped, $(this).data("remote-number-button"), true);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						//----RemoteControl Colors
						if(dialogStates["REMOTE_COLOR"] && dialogStates["REMOTE_COLOR"].type){
							dialogContentCountAfterHR++;
							dialogContent += "<div data-role='collapsible' class='collapsibleAnimated'" + (remoteSectionsStartOpened.indexOf("REMOTE_COLORS") == -1 ? "" : " data-collapsed='false'") + " data-iconpos='right' data-inset='true'>";
								dialogContent += "<h4><image src='./images/symbols/buttongrid.png' style='width:16px; height:16px;'>&nbsp;" + _("Color-Buttons") + ":</h4>";
								dialogContent += "<div class='ui-grid-c' style='max-width:250px;'>";
									dialogContent += "<div class='ui-block-a'><a href='' class='DialogRemoteColorButton' id='DialogRemoteColorButtonRed' data-remote-color-button='red' data-role='button' data-mini='true' style='background-color: red;'>&nbsp;</a></div>";
									dialogContent += "<div class='ui-block-b'><a href='' class='DialogRemoteColorButton' id='DialogRemoteColorButtonGreen' data-remote-color-button='green' data-role='button' data-mini='true' style='background-color: green;'>&nbsp;</a></div>";
									dialogContent += "<div class='ui-block-c'><a href='' class='DialogRemoteColorButton' id='DialogRemoteColorButtonYellow' data-remote-color-button='yellow' data-role='button' data-mini='true' style='background-color: gold;'>&nbsp;</a></div>";
									dialogContent += "<div class='ui-block-d'><a href='' class='DialogRemoteColorButton' id='DialogRemoteColorButtonBlut' data-remote-color-button='blue' data-role='button' data-mini='true' style='background-color: darkblue;'>&nbsp;</a></div>";
								dialogContent += "</div>";
							dialogContent += "</div>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedRemoteColorId = dialogLinkedStateIds["REMOTE_COLOR"];
								var bindingFunction = function(){
									$(".DialogRemoteColorButton").on('click', function(e){
										setState(_linkedRemoteColorId, _deviceIdEscaped, $(this).data("remote-color-button"), true);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
						}
						//----RemoteControl Hide
						dialogContent += "</div>";
						dialogContent += "</div>";
						if(dialogStates["REMOTE_HIDE_REMOTE"] && dialogStates["REMOTE_HIDE_REMOTE"].type){
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedRemoteHideRemoteId = dialogLinkedStateIds["REMOTE_HIDE_REMOTE"];
								var updateFunction = function(){
									var remoteHideRemote = getStateObject(_linkedRemoteHideRemoteId);
									if(remoteHideRemote){
										if(typeof remoteHideRemote.val != udef && remoteHideRemote.val.toString() == "true") {
											$("#DialogRemote").hide(1000);
										} else {
											$("#DialogRemote").show(500);
										}
									}
								};
								dialogUpdateFunctions[_linkedRemoteHideRemoteId].push(updateFunction);
							})(); //<--End Closure
						}
					}

					//----Source
					if((dialogStates["SOURCE"] && dialogStates["SOURCE"].type) || (dialogStates["PLAYLIST"] && dialogStates["PLAYLIST"].type)) dialogContent += "<hr>";
					if(dialogStates["SOURCE"]){
						switch(dialogStates["SOURCE"].type){
							case "valueList":
							dialogContentCountAfterHR++;
							var type = "Source";
							dialogContent += "<label for='DialogSourceValueList' ><image src='./images/symbols/variable.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
							dialogContent += "<select  class='iQontrolDialogValueList DialogSourceValueList' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["SOURCE"].readonly || dialogReadonly).toString() + "' name='DialogSourceValueList' id='DialogSourceValueList' data-native-menu='false'>";
							for(val in dialogStates["SOURCE"].valueList){
								if(dialogStates["SOURCE"].targetValues && dialogStates["SOURCE"].custom.showOnlyTargetValues && !dialogStates["SOURCE"].targetValues.hasOwnProperty(val)) continue; //Show only targetValues
								dialogContent += "<option value='" + val + "'>" + _(dialogStates["SOURCE"].valueList[val]) + "</option>";
							}
							if(dialogStates["SOURCE"].custom.statesAddInput) {
								dialogContent += "<option value='[INPUT]'>" + (dialogStates["SOURCE"].custom.statesAddInputCaption || _("Enter other value...")) + "</option>";
							}
							dialogContent += "</select>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedSourceId = dialogLinkedStateIds["SOURCE"];
								var updateFunction = function(){
									var source = getStateObject(_linkedSourceId);
									if(source){
										if(typeof source.val != udef) {
											var val = source.val.toString();
											$("#DialogSourceValueList").val(val).selectmenu('refresh');
											if($("#DialogSourceValueList").val() !== val){ //val is not in option-list
												if(source.valueList && typeof source.valueList[val] !== udef){
													$("#DialogSourceValueList").prev("span").html(source.valueList[val]);
												} else {
													$("#DialogSourceValueList").prev("span").html(val + "&nbsp;");
												}
											}
										}
									}
								};
								dialogUpdateFunctions[_linkedSourceId].push(updateFunction);
								var bindingFunction = function(){
									$('.DialogSourceValueList').on('change', function(e) {
										var val = $("#DialogSourceValueList option:selected").val();
										if(val == "[INPUT]") {
											val = prompt((dialogStates["SOURCE"].custom.statesAddInputCaption || _("Enter other value...")));
											if(val == null) {
												updateState(_linkedSourceId);
												return;
											}
											$("#DialogSourceValueList").prev("span").html(val + "&nbsp;");
										}
										setState(_linkedSourceId, _deviceIdEscaped, val);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
							break;

							case "string":
							dialogContentCountAfterHR++;
							var type = "Source";
							dialogContent += "<label for='DialogSourceString' ><image src='./images/symbols/variable.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
							dialogContent += "<textarea class='iQontrolDialogString Source' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["SOURCE"].readonly || dialogReadonly).toString() + "' name='DialogSourceString' id='DialogSourceString'></textarea>";
							if(!dialogStates["SOURCE"].readonly && !dialogReadonly) {
								dialogContent += "<a data-role='button' data-mini='false' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogSourceStringSubmit' id='DialogSourceStringSubmit'>" + _("Submit") + "</a>";
							}
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedSourceId = dialogLinkedStateIds["SOURCE"];
								var updateFunction = function(){
									var source = getStateObject(_linkedSourceId);
									if(source){
										if($("#DialogSourceString").parent('.jqte_source').length == 0){
											$("#DialogSourceString").val(source.val);
											$("#DialogSourceString").textinput('refresh');
										} else {
											$("#DialogSourceString").jqteVal(source.val);
										}
									}
								};
								dialogUpdateFunctions[_linkedSourceId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogSourceStringSubmit').on('click', function(e) {
										setState(_linkedSourceId, _deviceIdEscaped, $("#DialogSourceString").val(), true);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
							break;
						}
					}
					//----Playlist
					if(dialogStates["PLAYLIST"]){
						switch(dialogStates["PLAYLIST"].type){
							case "valueList":
							dialogContentCountAfterHR++;
							var type = "Playlist";
							dialogContent += "<label for='DialogPlaylistValueList' ><image src='./images/symbols/variable.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
							dialogContent += "<select  class='iQontrolDialogValueList DialogPlaylistValueList' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["PLAYLIST"].readonly || dialogReadonly).toString() + "' name='DialogPlaylistValueList' id='DialogPlaylistValueList' data-native-menu='false'>";
							for(val in dialogStates["PLAYLIST"].valueList){
								if(dialogStates["PLAYLIST"].targetValues && dialogStates["PLAYLIST"].custom.showOnlyTargetValues && !dialogStates["PLAYLIST"].targetValues.hasOwnProperty(val)) continue; //Show only targetValues
								dialogContent += "<option value='" + val + "'>" + _(dialogStates["PLAYLIST"].valueList[val]) + "</option>";
							}
							if(dialogStates["PLAYLIST"].custom.statesAddInput) {
								dialogContent += "<option value='[INPUT]'>" + (dialogStates["PLAYLIST"].custom.statesAddInputCaption || _("Enter other value...")) + "</option>";
							}
							dialogContent += "</select>";
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedPlaylistId = dialogLinkedStateIds["PLAYLIST"];
								var updateFunction = function(){
									var playlist = getStateObject(_linkedPlaylistId);
									if(playlist){
										if(typeof playlist.val != udef) {
											var val = playlist.val.toString();
											$("#DialogPlaylistValueList").val(val).selectmenu('refresh');
											if($("#DialogPlaylistValueList").val() !== val){ //val is not in option-list
												if(playlist.valueList && typeof playlist.valueList[val] !== udef){
													$("#DialogPlaylistValueList").prev("span").html(playlist.valueList[val]);
												} else {
													$("#DialogPlaylistValueList").prev("span").html(val + "&nbsp;");
												}
											}
										}
									}
								};
								dialogUpdateFunctions[_linkedPlaylistId].push(updateFunction);
								var bindingFunction = function(){
									$('.DialogPlaylistValueList').on('change', function(e) {
										var val = $("#DialogPlaylistValueList option:selected").val();
										if(val == "[INPUT]") {
											val = prompt((dialogStates["PLAYLIST"].custom.statesAddInputCaption || _("Enter other value...")));
											if(val == null) {
												updateState(_linkedPlaylistId);
												return;
											}
											$("#DialogPlaylistValueList").prev("span").html(val + "&nbsp;");
										}
										setState(_linkedPlaylistId, _deviceIdEscaped, val);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
							break;

							case "string":
							dialogContentCountAfterHR++;
							var type = "Playlist";
							dialogContent += "<label for='DialogPlaylistString' ><image src='./images/symbols/variable.png' / style='width:16px; height:16px;'>&nbsp;" + _(type) + ":</label>";
							dialogContent += "<textarea class='iQontrolDialogString Playlist' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (dialogStates["PLAYLIST"].readonly || dialogReadonly).toString() + "' name='DialogPlaylistString' id='DialogPlaylistString'></textarea>";
							if(!dialogStates["PLAYLIST"].readonly && !dialogReadonly) {
								dialogContent += "<a data-role='button' data-mini='false' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogPlaylistStringSubmit' id='DialogPlaylistStringSubmit'>" + _("Submit") + "</a>";
							}
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _deviceIdEscaped = deviceIdEscaped;
								var _linkedPlaylistId = dialogLinkedStateIds["PLAYLIST"];
								var updateFunction = function(){
									var playlist = getStateObject(_linkedPlaylistId);
									if(playlist){
										if($("#DialogPlaylistString").parent('.jqte_source').length == 0){
											$("#DialogPlaylistString").val(playlist.val);
											$("#DialogPlaylistString").textinput('refresh');
										} else {
											$("#DialogPlaylistString").jqteVal(playlist.val);
										}
									}
								};
								dialogUpdateFunctions[_linkedPlaylistId].push(updateFunction);
								var bindingFunction = function(){
									$('#DialogPlaylistStringSubmit').on('click', function(e) {
										setState(_linkedPlaylistId, _deviceIdEscaped, $("#DialogPlaylistString").val(), true);
									});
								};
								dialogBindingFunctions.push(bindingFunction);
							})(); //<--End Closure
							break;
						}
					}
					break;

					default:
					//Nothing to do
				}

				//--Universal additional Content
				//----Additional Controls
				//Special: ADDITIONAL_CONTROLS is an Array: [{"name":"Name", "type":"LinkedState", role:"|readonly|button", icon:"url", "value":"LinkedStateId", "heading":"Caption"}, ...]
				var linkedAdditionalControls;
				if(dialogStates["ADDITIONAL_CONTROLS"] && typeof dialogStates["ADDITIONAL_CONTROLS"].val != udef) linkedAdditionalControls = tryParseJSON(dialogStates["ADDITIONAL_CONTROLS"].val);
				var linkedAdditionalControlsAreValid = false;
				if(Array.isArray(linkedAdditionalControls) && typeof linkedAdditionalControls == 'object') linkedAdditionalControls.forEach(function(element){
					if(typeof element.name !== udef && element.name !== udef){
						linkedAdditionalControlsAreValid = true;
					}
				});
				if(linkedAdditionalControlsAreValid){
					var type = _(getDeviceOptionValue(device, "additionalControlsCaption") || "Additional Controls");
					var additionalControlsSectionType = getDeviceOptionValue(device, "additionalControlsSectionType") || "collapsible";
					var additionalControlsHeadingType = getDeviceOptionValue(device, "additionalControlsHeadingType") || "none";
					var additionalControlsHideNameForButtons = (getDeviceOptionValue(device, "additionalControlsHideNameForButtons") == "true");
					dialogContent += (additionalControlsSectionType.indexOf("collapsible") == -1 && dialogContentCountAfterHR > 0 ? "<hr>" : "");
					dialogContentCountAfterHR++;
					dialogContent += "<div" + (additionalControlsSectionType.indexOf("collapsible") == -1 ? "" : " data-role='collapsible' class='collapsibleAnimated'") + (additionalControlsSectionType.indexOf("open") == -1 ? "" : " data-collapsed='false'") + " data-iconpos='right' data-inset='true'  style='margin: 0; padding: 5px 0 5px 0;'>";
						dialogContent += (additionalControlsSectionType.indexOf("noCaption") == -1 ? "<h4" + (additionalControlsSectionType.indexOf("collapsible") == -1 ? " style='margin-top: 0;'" : "") + "><image src='./images/symbols/buttongrid.png' style='width:16px; height:16px;'>&nbsp;" + type + ":</h4>" : "");
						dialogContent += "<div id='DialogAdditionalControlsContent' style='overflow:auto;" + ((additionalControlsSectionType.indexOf("collapsible") == -1) ? " margin: 0 -5px 0px -5px; padding: 0 0 5px 0;" : " margin: 0 -15px 0 -15px; padding: 5px 5px 5px 5px;") + "'>";
						dialogContent += "</div>";
					dialogContent += "</div>";
					var createDialogAdditionalControlsFunction;
					(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
						var _deviceIdEscaped = deviceIdEscaped;
						var _linkedAdditionalControls = linkedAdditionalControls;
						createDialogAdditionalControlsFunction = function(){
							$("#DialogAdditionalControlsContent").html("");
							var dialogAdditionalControlsBindingFunctions = [];
							var dialogAdditionalControlsLinkedStateIdsToUpdate = [];
							var dialogAdditionalControlsLinkedStateIdsToFetchAndUpdate = [];
							var dialogAdditionalControlsContent = "";
							var headingIndex = -1;
							var lastElementWasHalfWidth = false;
							_linkedAdditionalControls.forEach(function(_element, _index){ // --- Loop through all additionalControls ---
								if(_element.heading) {
									var heading = _(_element.heading.split('|')[0] || "");
									var variableheading = encodeURI(_element.heading.split('|').slice(1).join('|'));
									if(headingIndex > -1) dialogAdditionalControlsContent += "</div></div>"; //Close last heading section
									dialogAdditionalControlsContent += "<div" + (additionalControlsHeadingType.indexOf("collapsible") == -1 ? "" : " data-role='collapsible' class='collapsibleAnimated'") + (additionalControlsHeadingType.indexOf("open") == -1 ? "" : " data-collapsed='false'") + " data-iconpos='right' data-inset='true' style='margin: 0; padding: 0 5px 0 5px; clear: left;'>";
									dialogAdditionalControlsContent += (additionalControlsHeadingType.indexOf("noCaption") == -1 ? "<h4><image src='./images/symbols/buttongrid.png' style='width:16px; height:16px;'>&nbsp;<span" + (variableheading ? " data-variablehtml='" + variableheading + "'" : "") + ">" + heading + "</span>:</h4>" : "");
									dialogAdditionalControlsContent += "<div style='overflow:auto;" + (additionalControlsHeadingType.indexOf("collapsible") == -1 ? " margin: 0; padding 0;" : " margin: 0 -20px 0 -20px; padding: 0 5px 0 5px;") + "'>";
									headingIndex = 0;
									lastElementWasHalfWidth = false;
								} else if(headingIndex > -1) {
									headingIndex++;
								}
								var linkedStateId = _element.value;
								if(typeof dialogUpdateFunctions[linkedStateId] == udef) dialogUpdateFunctions[linkedStateId] = [];
								var stateValue = getStateObject(_element.value);
								if(stateValue){
									if(((_index > 0 && headingIndex > 0) || (_index == 0 && additionalControlsSectionType.indexOf("noCaption") != -1 && additionalControlsSectionType.indexOf("collapsible") != -1))
										&& !(lastElementWasHalfWidth && _element.halfWidth)
										&& dialogContentCountAfterHR > 1){
										dialogAdditionalControlsContent += "<hr style='clear: left;'>";
									} 
									if(_element.halfWidth) {
										lastElementWasHalfWidth = true;
									} else {
										lastElementWasHalfWidth = false;
									}
 									dialogAdditionalControlsContent += "<div style='float: left; margin: 0; padding:0 5px 0 5px; box-sizing:border-box; min-height: 83px;" + (_element.halfWidth ? " width: 50%;" : " width: 100%;") + "'>";
									var readonly = false;
									switch(_element.role || ""){
										case "button":
										var type = _(_element.name.split('|')[0] || "Button");
										var variabletype = encodeURI(_element.name.split('|').slice(1).join('|'));
										var buttonCaption = _(_element.caption.split('|')[0] || "push");
										var variablebuttonCaption = encodeURI(_element.caption.split('|').slice(1).join('|'));
										if(!additionalControlsHideNameForButtons) dialogAdditionalControlsContent += "<label for='DialogAdditionalControlsButton_" + _index + "' ><image src='" + (_element.icon || "./images/symbols/program.png") + "' / style='width:16px; height:16px;'>&nbsp;<span" + (variabletype ? " data-variablehtml='" + variabletype + "'" : "") + ">" + type + "</span>:</label>";
										dialogAdditionalControlsContent += "<a data-role='button' data-mini='false' class='iQontrolDialogButton" + (dialogReadonly ? " ui-state-disabled'" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogAdditionalControlsButton_" + _index + "' id='DialogAdditionalControlsButton_" + _index + "'><span" + (variablebuttonCaption ? " data-variablehtml='" + variablebuttonCaption + "'" : "") + ">" + buttonCaption + "</span></a>";
										(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
											var _deviceIdEscaped = deviceIdEscaped;
											var _device = device;
											var _linkedStateId = linkedStateId;
											var _name = _element.name.split('|')[0];
											var bindingFunction = function(){
												$("#DialogAdditionalControlsButton_" + _index).on('click', function(e) {
													setState(_linkedStateId, _deviceIdEscaped, (_name || true), true);
												});
											};
											dialogAdditionalControlsBindingFunctions.push(bindingFunction);
										})(); //<--End Closure
										break;

										case "readonly":
										readonly = true;

										default:
										readonly = readonly || stateValue.readonly || false;
										switch(stateValue.type){
											case "switch":
											var type = _(_element.name.split('|')[0] || "Switch");
											var variabletype = encodeURI(_element.name.split('|').slice(1).join('|'));
											dialogAdditionalControlsContent += "<label for='DialogAdditionalControlsSwitch_" + _index + "' ><image src='" + (_element.icon || "./images/symbols/switch.png") + "' style='width:16px; height:16px;'>&nbsp;<span" + (variabletype ? " data-variablehtml='" + variabletype + "'" : "") + ">" + type + "</span>:</label>";
											dialogAdditionalControlsContent += "<select data-role='flipswitch' data-mini='false' class='iQontrolDialogSwitch' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (readonly || dialogReadonly).toString() + "' name='DialogAdditionalControlsSwitch_" + _index + "' id='DialogAdditionalControlsSwitch_" + _index + "'>";
												dialogAdditionalControlsContent += "<option value='false'>0</option>";
												dialogAdditionalControlsContent += "<option value='true'>I</option>";
											dialogAdditionalControlsContent += "</select>";
											(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
												var _deviceIdEscaped = deviceIdEscaped;
												var _linkedStateId = linkedStateId;
												var updateFunction = function(){
													var state = getStateObject(_linkedStateId);
													if(state){
														var index = 0;
														if(typeof state.val != udef && (state.val.toString().toLowerCase() == "true" || state.val.toString() > 0)) index = 1; else index = 0;
														$("#DialogAdditionalControlsSwitch_" + _index)[0].selectedIndex = index;
														$("#DialogAdditionalControlsSwitch_" + _index).flipswitch('refresh');
													}
												};
												dialogUpdateFunctions[_linkedStateId].push(updateFunction);
												var bindingFunction = function(){
													$("#DialogAdditionalControlsSwitch_" + _index).on('change', function(e) {
														var newVal = $("#DialogAdditionalControlsSwitch_" + _index + " option:selected").val();
														var state = getStateObject(_linkedStateId);
														if(typeof state.val == 'number'){
															if(newVal == true) newVal = 1; else newVal = 0;
														}
														setState(_linkedStateId, _deviceIdEscaped, newVal);
													});
												};
												dialogAdditionalControlsBindingFunctions.push(bindingFunction);
											})(); //<--End Closure
											break;

											case "button":
											var type = _(_element.name.split('|')[0] || "Button");
											var variabletype = encodeURI(_element.name.split('|').slice(1).join('|'));
											var buttonCaption = _(_element.caption.split('|')[0] || "push");
											var variablebuttonCaption = encodeURI(_element.caption.split('|').slice(1).join('|'));
											if(!additionalControlsHideNameForButtons) dialogAdditionalControlsContent += "<label for='DialogAdditionalControlsButton_" + _index + "' ><image src='" + (_element.icon || "./images/symbols/program.png") + "' / style='width:16px; height:16px;'>&nbsp;<span" + (variabletype ? " data-variablehtml='" + variabletype + "'" : "") + ">" + type + "</span>:</label>";
											dialogAdditionalControlsContent += "<a data-role='button' data-mini='false' class='iQontrolDialogButton" + ((readonly || dialogReadonly) ? " ui-state-disabled'" : "") + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogAdditionalControlsButton_" + _index + "' id='DialogAdditionalControlsButton_" + _index + "'><span" + (variablebuttonCaption ? " data-variablehtml='" + variablebuttonCaption + "'" : "") + ">" + buttonCaption + "</span></a>";
											(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
												var _deviceIdEscaped = deviceIdEscaped;
												var _device = device;
												var _linkedStateId = linkedStateId;
												var bindingFunction = function(){
													$("#DialogAdditionalControlsButton_" + _index).on('click', function(e) {
														setState(_linkedStateId, _deviceIdEscaped, true, true);
													});
												};
												dialogAdditionalControlsBindingFunctions.push(bindingFunction);
											})(); //<--End Closure
											break;

											case "level":
											var min = stateValue.min || 0;
											var max = stateValue.max || 100;
											var step = stateValue.step || 1;
											var type = _(_element.name.split('|')[0] || "Level");
											var variabletype = encodeURI(_element.name.split('|').slice(1).join('|'));
											var sliderSendRate = 500;
											dialogAdditionalControlsContent += "<label for='DialogAdditionalControlsSlider_" + _index + "' ><image src='" + (_element.icon || "./images/symbols/slider.png") + "' / style='width:16px; height:16px;'>&nbsp;<span" + (variabletype ? " data-variablehtml='" + variabletype + "'" : "") + ">" + type + "</span>:</label>";
											dialogAdditionalControlsContent += "<input type='number' data-type='range' class='iQontrolDialogSlider' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (readonly || dialogReadonly).toString() + "' data-highlight='true' data-popup-enabled='true' data-show-value='true' name='DialogAdditionalControlsSlider_" + _index + "' id='DialogAdditionalControlsSlider_" + _index + "' min='" + min + "' max='" + max + "' step='" + step + "'/>";
											(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
												var _deviceIdEscaped = deviceIdEscaped;
												var _linkedStateId = linkedStateId;
												var _sliderSendRate = sliderSendRate;
												var _confirm = stateValue.custom && stateValue.custom.confirm || false;
												var _pincodeSet = stateValue.custom && stateValue.custom.pincode || false;
												var DialogAdditionalControlsSliderReadoutTimer;
												var updateFunction = function(){
													var state = getStateObject(_linkedStateId);
													if(state){
														$("#DialogAdditionalControlsSlider_" + _index).val(state.val);
														$("#DialogAdditionalControlsSlider_" + _index).slider('refresh');
													}
												};
												dialogUpdateFunctions[_linkedStateId].push(updateFunction);
												var bindingFunction = function(){
													$("#DialogAdditionalControlsSlider_" + _index).slider({
														start: function(event, ui){
															clearInterval(DialogAdditionalControlsSliderReadoutTimer);
															if(!_confirm && !_pincodeSet){
																DialogAdditionalControlsSliderReadoutTimer = setInterval(function(){
																	setState(_linkedStateId, _deviceIdEscaped, $("#DialogAdditionalControlsSlider_" + _index).val());
																}, _sliderSendRate);
															}
														},
														stop: function(event, ui) {
															clearInterval(DialogAdditionalControlsSliderReadoutTimer);
															setState(_linkedStateId, _deviceIdEscaped, $("#DialogAdditionalControlsSlider_" + _index).val());
														}
													});
												};
												dialogAdditionalControlsBindingFunctions.push(bindingFunction);
											})(); //<--End Closure
											break;

											case "valueList":
											var type = _(_element.name.split('|')[0] || "Selection");
											var variabletype = encodeURI(_element.name.split('|').slice(1).join('|'));
											dialogAdditionalControlsContent += "<label for='DialogAdditionalControlsValueList_" + _index + "' ><image src='" + (_element.icon || "./images/symbols/variable.png") + "' / style='width:16px; height:16px;'>&nbsp;<span" + (variabletype ? " data-variablehtml='" + variabletype + "'" : "") + ">" + type + "</span>:</label>";
											dialogAdditionalControlsContent += "<select  class='iQontrolDialogValueList DialogAdditionalControlsValueList_" + _index + "' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (readonly || dialogReadonly).toString() + "' name='DialogAdditionalControlsValueList_" + _index + "' id='DialogAdditionalControlsValueList_" + _index + "' data-native-menu='false'>";
											for(val in stateValue.valueList){
												if(stateValue.targetValues && stateValue.custom.showOnlyTargetValues && !stateValue.targetValues.hasOwnProperty(val)) continue; //Show only targetValues
												dialogAdditionalControlsContent += "<option value='" + val + "'>" + _(stateValue.valueList[val]) + "</option>";
											}
											if(stateValue.custom.statesAddInput) {
												dialogAdditionalControlsContent += "<option value='[INPUT]'>" + (stateValue.custom.statesAddInputCaption || _("Enter other value...")) + "</option>";
											}
											dialogAdditionalControlsContent += "</select>";
											(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
												var _deviceIdEscaped = deviceIdEscaped;
												var _linkedStateId = linkedStateId;
												var updateFunction = function(){
													var state = getStateObject(_linkedStateId);
													if(state){
														if(typeof state.val != udef) {
															var val = state.val.toString();
															$("#DialogAdditionalControlsValueList_" + _index).val(val).selectmenu('refresh');
															if($("#DialogAdditionalControlsValueList_" + _index).val() !== val){ //val is not in option-list
																if(state.valueList && typeof state.valueList[val] !== udef){
																	$("#DialogAdditionalControlsValueList_" + _index).prev("span").html(state.valueList[val]);
																} else {
																	$("#DialogAdditionalControlsValueList_" + _index).prev("span").html(val + "&nbsp;");
																}
															}
														}
													}
												};
												dialogUpdateFunctions[_linkedStateId].push(updateFunction);
												var bindingFunction = function(){
													$(".DialogAdditionalControlsValueList_" + _index).on('change', function(e) {
														var val = $("#DialogAdditionalControlsValueList_" + _index + " option:selected").val();
														if(val == "[INPUT]") {
															val = prompt((stateValue.custom.statesAddInputCaption || _("Enter other value...")));
															if(val == null) {
																updateState(_linkedStateId);
																return;
															}
															$("#DialogAdditionalControlsValueList_" + _index).prev("span").html(val + "&nbsp;");
														}
														setState(_linkedStateId, _deviceIdEscaped, val);
													});
												};
												dialogAdditionalControlsBindingFunctions.push(bindingFunction);
											})(); //<--End Closure
											break;

											case "string":
											var type = _(_element.name.split('|')[0] || "Text");
											var variabletype = encodeURI(_element.name.split('|').slice(1).join('|'));
											var buttonCaption = _(_element.caption.split('|')[0] || "Submit");
											var variablebuttonCaption = encodeURI(_element.caption.split('|').slice(1).join('|'));
											dialogAdditionalControlsContent += "<label for='DialogAdditionalControlsString_" + _index + "' ><image src='" + (_element.icon || "./images/symbols/variable.png") + "' / style='width:16px; height:16px;'>&nbsp;<span" + (variabletype ? " data-variablehtml='" + variabletype + "'" : "") + ">" + type + "</span>:</label>";
											dialogAdditionalControlsContent += "<textarea class='iQontrolDialogString DialogAdditionalControlsString' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (readonly || dialogReadonly).toString() + "' name='DialogAdditionalControlsString_" + _index + "' id='DialogAdditionalControlsString_" + _index + "'></textarea>";
											if(!readonly && !dialogReadonly) {
												dialogAdditionalControlsContent += "<a data-role='button' data-mini='false' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogAdditionalControlsString_" + _index + "Submit' id='DialogAdditionalControlsString_" + _index + "Submit'><span" + (variablebuttonCaption ? " data-variablehtml='" + variablebuttonCaption + "'" : "") + ">" + buttonCaption + "</span></a>";
											}
											(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
												var _deviceIdEscaped = deviceIdEscaped;
												var _linkedStateId = linkedStateId;
												var updateFunction = function(){
													var state = getStateObject(_linkedStateId);
													if(state){
														if($("#DialogAdditionalControlsString_" + _index).parent('.jqte_source').length == 0){
															$("#DialogAdditionalControlsString_" + _index).val(state.val);
															$("#DialogAdditionalControlsString_" + _index).textinput('refresh');
														} else {
															$("#DialogAdditionalControlsString_" + _index).jqteVal(state.val);
														}
													}
												};
												dialogUpdateFunctions[_linkedStateId].push(updateFunction);
												var bindingFunction = function(){
													$("#DialogAdditionalControlsString_" + _index + "Submit").on('click', function(e) {
														setState(_linkedStateId, _deviceIdEscaped, $("#DialogAdditionalControlsString_" + _index).val(), true);
													});
												};
												dialogAdditionalControlsBindingFunctions.push(bindingFunction);
											})(); //<--End Closure
											break;

											case "time":
											var type = _(_element.name.split('|')[0] || "Time");
											var variabletype = encodeURI(_element.name.split('|').slice(1).join('|'));
											dialogAdditionalControlsContent += "<label for='DialogAdditionalControlsTimeString_" + _index + "' ><image src='./images/symbols/time.png' / style='width:16px; height:16px;'>&nbsp;<span" + (variabletype ? " data-variablehtml='" + variabletype + "'" : "") + ">" + type + "</span>:</label>";
											dialogAdditionalControlsContent += "<input class='iQontrolDialogTime' data-iQontrol-Device-ID='" + deviceIdEscaped + "' data-disabled='" + (readonly || dialogReadonly).toString() + "' name='DialogAdditionalControlsTimeString_" + _index + "' id='DialogAdditionalControlsTimeString_" + _index + "' readonly/>";
											dialogAdditionalControlsContent += "<div class='iQontrolDialogTimeDistance small' data-iQontrol-Device-ID='" + deviceIdEscaped + "' id='DialogAdditionalControlsTimeDistance_" + _index + "'></div>";
											(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
												var _deviceIdEscaped = deviceIdEscaped;
												var _linkedTimeId = linkedStateId;
												var updateFunction = function(_stateId, _onlyUpdateDistance){
													var time = getStateObject(_linkedTimeId);
													var _timeFormat = getTimeFormat((time.custom && time.custom.timeFormat) || "x");
													var _timeDisplayFormat = getTimeFormat((time.custom && time.custom.timeDisplayFormat) || "dddd, DD.MM.YYYY HH:mm:ss");
													var _timeDisplayDontShowDistance = (time.custom && time.custom.timeDisplayDontShowDistance ? true : false);
													var _periodDisplayFormat = getTimeFormat(replaceTokens(_timeDisplayFormat.string, momentToDurationDisplayFormatTokens));
													var _anypickerTimeDisplayFormat = getTimeFormat(replaceTokens(_timeDisplayFormat.string, momentToAnypickerDisplayFormatTokens), "AnyPickerMode");
													var _anypickerTimePickerFormat = getTimeFormat(replaceTokens(_anypickerTimeDisplayFormat.string, anypickerDisplayFormatToAnypickerPickerFormatTokens), "AnyPickerMode");
													if(_timeFormat.type == "date") _anypickerTimePickerFormat.string = _anypickerTimePickerFormat.string.replace(/[hHaAms]/g, "");
													if(_timeFormat.type == "time") _anypickerTimePickerFormat.string = _anypickerTimePickerFormat.string.replace(/[yMd]/g, "");
													var _anypickerModifyDateOutput = function(oldMoment, newMoment){
														var nowMoment = moment();
														if(_timeFormat.type == "date"){
															newMoment.hour(0).minute(0).second(0).millisecond(0);
														} else if(_timeFormat.type == "time"){
															newMoment.year(1970).month(0).date(1); //Unix: 01.01.1970 = timestamp 0
														} else if(_timeFormat.type == "datetime" && _anypickerTimeDisplayFormat.flags.indexOf("to") == -1){
															if(_anypickerTimeDisplayFormat.type == "date"){
																if(_anypickerTimeDisplayFormat.flags.indexOf("tn") > -1){
																	newMoment.hour(nowMoment.hour()).minute(nowMoment.minute()).second(nowMoment.second()).millisecond(0);
																} else {
																	newMoment.hour(0).minute(0).second(0).millisecond(0);
																}
															} else if(_anypickerTimeDisplayFormat.type == "time"){
																if(_anypickerTimePickerFormat.flags.indexOf("tb") > -1) {
																	newMoment.year(1970).month(0).date(1); //Unix: 01.01.1970 = timestamp 0
																} else if(_anypickerTimePickerFormat.flags.indexOf("tn") > -1) {
																	newMoment.year(nowMoment.year()).month(nowMoment.month()).date(nowMoment.date()).add(1, 'd');
																} else if(oldMoment.toDate().getTime() > 86400000) {
																	newMoment.year(nowMoment.year()).month(nowMoment.month()).date(nowMoment.date()).add(1, 'd');
																} else {
																	newMoment.year(1970).month(0).date(1); //Unix: 01.01.1970 = timestamp 0
																}										
															}
														}
														return newMoment;
													}
													var startDistanceTimer = false;
													if(time){
														var nowMoment = moment(new Date());
														if(!(time && typeof time.val != udef)) time = {val: 0};
														if(_timeFormat.type == "period"){
															var timeMoment = moment.duration(time.val, _timeFormat.string);
														} else {
															var timeMoment = moment(time.val, _timeFormat.string);
														}
														if(!timeMoment.isValid()) timeMoment = moment(0);
														if(_timeFormat.type == "time" && timeMoment.format("DD.MM.YYYY") == nowMoment.format("DD.MM.YYYY")){
															timeMoment.year(1970).month(0).date(1);
														}									
														if(!_onlyUpdateDistance){
															if(typeof $("#DialogAdditionalControlsTimeString_" + _index).data('anypicker') == udef){ //Init AnyPicker
																if(_timeFormat.type != "period"){
																	$("#DialogAdditionalControlsTimeString_" + _index).data('moment', timeMoment);
																	$("#DialogAdditionalControlsTimeString_" + _index).AnyPicker({ 
																		mode: "datetime",
																		rowsNavigation: "scroller",
																		showComponentLabel: true,
																		theme: "iOS", // "Default", "iOS", "Android", "Windows"
																		lang: systemLang,
																		onInit: function(){ 
																			$("#DialogAdditionalControlsTimeString_" + _index).data('anypicker', this); 
																		},
																		dateTimeFormat: _anypickerTimePickerFormat.string,
																		inputDateTimeFormat: _anypickerTimeDisplayFormat.string,
																		selectedDate: timeMoment.toDate(),
																		formatOutput: function (selectedValues){
																			var newMoment = _anypickerModifyDateOutput($("#DialogAdditionalControlsTimeString_" + _index).data('moment'), moment(selectedValues.date));
																			$("#DialogAdditionalControlsTimeString_" + _index).data('moment', newMoment);
																			return this.formatOutputDates(newMoment.toDate());
																		},
																		onSetOutput: function(label, selectedValues){ 
																			$("#DialogAdditionalControlsTimeString_" + _index).trigger('change'); 
																		},
																		nowButton: {
																			markup: "<a id='ap-button-now' class='ap-button'>Now</a>",
																			markupContentWindows: "<span class='ap-button-icon ap-icon-now'></span><span class='ap-button-text'>now</span>",
																			type: "Button",
																			action: function(){ 
																				var newMoment = _anypickerModifyDateOutput($("#DialogAdditionalControlsTimeString_" + _index).data('moment'), moment());
																				$("#DialogAdditionalControlsTimeString_" + _index).data('moment', newMoment);
																				$("#DialogAdditionalControlsTimeString_" + _index).data('anypicker').setSelectedDate(newMoment.toDate());
																				$("#DialogAdditionalControlsTimeString_" + _index).data('anypicker').showOrHidePicker();
																				$("#DialogAdditionalControlsTimeString_" + _index).trigger('change'); 
																			}
																		},
																		viewSections: {
																			header: [],
																			contentTop: [],
																			contentBottom: [],
																			footer: ["cancelButton", "nowButton", "setButton"]
																		}
																	});
																	startDistanceTimer = true;
																} else { //period
																	$("#DialogAdditionalControlsTimeString_" + _index).data('moment', timeMoment);
																	$("#DialogAdditionalControlsTimeString_" + _index).val(timeMoment.format(_periodDisplayFormat.string));
																	var anypickerDataSourceArray = [[],[],[],[]];
																	for(var i = 0; i < 365; i++){ anypickerDataSourceArray[0].push({ label: i.toString(), val: i.toString() }) };
																	for(var i = 0; i < 24; i++){ anypickerDataSourceArray[1].push({ label: ("00" + i).slice(-2), val: ("00" + i).slice(-2) }) };
																	for(var i = 0; i < 60; i++){ anypickerDataSourceArray[2].push({ label: ("00" + i).slice(-2), val: ("00" + i).slice(-2) }) };
																	for(var i = 0; i < 60; i++){ anypickerDataSourceArray[3].push({ label: ("00" + i).slice(-2), val: ("00" + i).slice(-2) }) };
																	$("#DialogAdditionalControlsTimeString_" + _index).AnyPicker({ 
																		mode: "select",
																		rowsNavigation: "scroller",
																		showComponentLabel: true,
																		theme: "iOS", // "Default", "iOS", "Android", "Windows"
																		lang: systemLang,
																		onInit: function(){ 
																			$("#DialogAdditionalControlsTimeString_" + _index).data('anypicker', this); 
																		},
																		components: [
																			{ component: 0,	name: "days", label: _("Days"),	width: "40%", textAlign: "left" }, 
																			{ component: 1, name: "hours", label: _("Hours"), width: "20%", textAlign: "right" },
																			{ component: 2, name: "minutes", label: _("Minutes"), width: "20%", textAlign: "center" },
																			{ component: 3, name: "seconds", label: _("Seconds"), width: "20%", textAlign: "left" }
																		],
																		dataSource: [
																			{ compontent: 0, data: anypickerDataSourceArray[0] },
																			{ compontent: 1, data: anypickerDataSourceArray[1] },
																			{ compontent: 1, data: anypickerDataSourceArray[2] },
																			{ compontent: 1, data: anypickerDataSourceArray[3] }
																		],
																		parseInput: function(elementValue){
																			var elementMoment = $("#DialogAdditionalControlsTimeString_" + _index).data('moment');
																			return [Math.floor(elementMoment.asDays()).toString(), ("00" + elementMoment.hours()).slice(-2), ("00" + elementMoment.minutes()).slice(-2), ("00" + elementMoment.seconds()).slice(-2)];
																		},
																		formatOutput: function (selectedValues){
																			var newMoment = moment.duration({
																				days: selectedValues.values[0].val || 0,
																				hours: selectedValues.values[1].val || 0,
																				minutes: selectedValues.values[2].val || 0,
																				seconds: selectedValues.values[3].val || 0
																			});
																			$("#DialogAdditionalControlsTimeString_" + _index).data('moment', newMoment);
																			return newMoment.format(_periodDisplayFormat.string);
																		},
																		onSetOutput: function(label, selectedValues){ 
																			$("#DialogAdditionalControlsTimeString_" + _index).trigger('change'); 
																		},
																		zeroButton: {
																			markup: "<a id='ap-button-zero' class='ap-button'>&gt;0&lt;</a>",
																			markupContentWindows: "<span class='ap-button-icon ap-icon-now'></span><span class='ap-button-text'>&gt;0&lt;</span>",
																			type: "Button",
																			action: function(){ 
																				var newMoment = moment.duration(0);
																				$("#DialogAdditionalControlsTimeString_" + _index).data('moment', newMoment);
																				$("#DialogAdditionalControlsTimeString_" + _index).val(newMoment.format(_periodDisplayFormat.string));
																				$("#DialogAdditionalControlsTimeString_" + _index).data('anypicker').showOrHidePicker();
																				$("#DialogAdditionalControlsTimeString_" + _index).trigger('change'); 
																			}
																		},
																		viewSections: {
																			header: [],
																			contentTop: [],
																			contentBottom: [],
																			footer: ["cancelButton", "zeroButton", "setButton"]
																		}
																	});
																}
															} else { //Only update time (AnyPicker is already initialized)
																if(_timeFormat.type != "period"){
																	$("#DialogAdditionalControlsTimeString_" + _index).data('moment', timeMoment);
																	$("#DialogAdditionalControlsTimeString_" + _index).data('anypicker').setSelectedDate(timeMoment.toDate());
																} else { //period
																	$("#DialogAdditionalControlsTimeString_" + _index).data('moment', timeMoment);
																	$("#DialogAdditionalControlsTimeString_" + _index).val(timeMoment.format(_periodDisplayFormat.string));
																}
															}
														}									
														//Distance
														var distanceText = "";
														var distanceSeconds = 0;
														if(_timeFormat.type != "period"){
															if(time.val != 0){
																var timeDistanceMoment = $("#DialogAdditionalControlsTimeString_" + _index).data('moment');
																if(_anypickerTimeDisplayFormat.type == "time" && timeDistanceMoment.toDate().getTime() <= 86400000){
																	timeDistanceMoment.year(nowMoment.year()).month(nowMoment.month()).date(nowMoment.date()).add(1, 'd');
																}
																var distanceMoment = moment.duration(timeDistanceMoment.diff(nowMoment));
																distanceSeconds = distanceMoment.asSeconds();
																if(distanceSeconds >= 86400 || distanceSeconds < 0){
																	distanceText += distanceMoment.locale(systemLang).humanize(true);
																} else {
																	distanceText += distanceMoment.locale(systemLang).humanize(true);
																	distanceText += ": " + distanceMoment.format("HH:mm:ss");
																}
															}
														} else {
															distanceSeconds = timeMoment.asSeconds();
														}
														if(distanceText && !_timeDisplayDontShowDistance) $("#DialogAdditionalControlsTimeDistance_" + _index).html("(" + distanceText + ")"); else $("#DialogAdditionalControlsTimeDistance_" + _index).html("");
														if(_onlyUpdateDistance || startDistanceTimer){ 
															//Special: Call itsself periodicyally to update distance
															if(dialogIdsToUpdateEverySecond.indexOf(_linkedTimeId) == -1) dialogIdsToUpdateEverySecond.push(_linkedTimeId);
														}
														dialogUpdateTimestamp(fetchedStates[_linkedTimeId]);
													}
												};
												dialogUpdateFunctions[_linkedTimeId].push(updateFunction);
												var bindingFunction = function(){
													$("#DialogAdditionalControlsTimeString_" + _index).on('change', function(e) {
														var time = getStateObject(_linkedTimeId);
														var _timeFormat = getTimeFormat((time.custom && time.custom.timeFormat) || "x");
														var timeMoment = $("#DialogAdditionalControlsTimeString_" + _index).data('moment');
														setState(_linkedTimeId, _deviceIdEscaped, timeMoment.format(_timeFormat.string), true);
														dialogUpdateTimestamp(fetchedStates[_linkedTimeId]);
													});
												};
												dialogAdditionalControlsBindingFunctions.push(bindingFunction);
											})(); //<--End Closure
											break;
										}
									}
									dialogAdditionalControlsContent += "</div>";
									dialogAdditionalControlsLinkedStateIdsToUpdate.push(linkedStateId);
								}
							});
							if(headingIndex > -1) dialogAdditionalControlsContent += "</div></div>"; //Close last heading section
							if(dialogAdditionalControlsContent.length > 0) $("#DialogAdditionalControlsContent").append(dialogAdditionalControlsContent);
							$("#DialogAdditionalControlsContent").enhanceWithin();
							collapsibleAnimatedInit();
							setTimeout(function(){ $('#Dialog').popup('reposition', {positionTo: 'window'}); }, 20);
							for(var i = 0; i < dialogAdditionalControlsBindingFunctions.length; i++){ dialogAdditionalControlsBindingFunctions[i](); }
							for(var i = 0; i < dialogAdditionalControlsLinkedStateIdsToUpdate.length; i++){ updateState(dialogAdditionalControlsLinkedStateIdsToUpdate[i]); }
							//Enhance Textareas with jqte
							enhanceTextareasWithJqte('.DialogAdditionalControlsString');
							//Reposition to window
							setTimeout(function(){ $("#Dialog").popup("reposition", {positionTo: 'window'}); }, 500);
							setTimeout(function(){ $("#Dialog").popup("reposition", {positionTo: 'window'}); }, 750);
							//Find variablehtml in spans
							$("span[data-variablehtml]").each(function(){ // { and } are escaped by %7B and %7D, and | is escaped by %7C
								var that = $(this);
								var variablehtml = that.data('variablehtml');
								var a = variablehtml.indexOf('%7B'), b = variablehtml.lastIndexOf('%7D');
								if(a > -1 && a < b) {
									var variable = variablehtml.substring(a + 3, b).split('%7C'); //Text between { and }, split by |
									var linkedStateId = variable[0];
									var noUnit = false;
									if(linkedStateId.substr(0, 3) == "%5B" && linkedStateId.substr(-3) == "%5D"){ // [ and ] are escaped by %5B and %5D
										linkedStateId = linkedStateId.substring(3, linkedStateId.length - 3);
										noUnit = true;
									}
									linkedStateId = decodeURI(linkedStateId);
									var placeholder = null;
									if(variable.length > 1) placeholder = variable[1];
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _that = that;
										var _variablehtml = variablehtml;
										var _noUnit = noUnit;
										var _a = a;
										var _b = b;
										var _linkedStateId = linkedStateId;
										var _placeholder = placeholder;
										var updateFunction = function(){
											var state = getStateObject(_linkedStateId);
											var replacement = null;
											//Replace by value
											if(state && typeof state.val !== udef) {
												if(typeof state.plainText == 'number' && !_noUnit){			//STATE = number
													replacement = state.val + state.unit;
												} else {													//STATE = bool or text
													replacement = state.plainText;
												}
											} else if(_placeholder) {
												//Replace by placeholder
												replacement = _placeholder;
											}
											if(replacement != null){
												var newName = decodeURI(_variablehtml.substring(_variablehtml.indexOf('?') + 1, _a) + replacement + _variablehtml.substring(_b + 3));
												if($(_that).html() != newName){
													console.log("Set new Name: " + newName);
													$(_that).html(newName);
												}
											}
										};
										if(!dialogUpdateFunctions[_linkedStateId]) dialogUpdateFunctions[_linkedStateId] = [];
										dialogUpdateFunctions[_linkedStateId].push(updateFunction);
									})(); //<--End Closure
									dialogAdditionalControlsLinkedStateIdsToFetchAndUpdate.push(linkedStateId);
								}
							});
							dialogAdditionalControlsLinkedStateIdsToFetchAndUpdate.forEach(function(id){
								fetchStates(id, function(){
									if(typeof fetchedObjects[id] == udef) {
										(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
											var _id = id;
											fetchObject(_id, function(error){
												updateState(_id);
											});
										})(); //<--End Closure
									} else {
										updateState(id);
									}
								});
							});
						};
						//Fetch additional linkedStates from Array and then call createDialogAdditionalControlsFunction:
						var createDialogAdditionalControlsNumberOfStatesToFetch = _linkedAdditionalControls.length;
						_linkedAdditionalControls.forEach(function(element){
							fetchStates(element.value, function(){
								if(typeof fetchedObjects[element.value] == udef) {
									(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
										var _elementValue = element.value;
										fetchObject(_elementValue, function(error){
											createDialogAdditionalControlsNumberOfStatesToFetch--;
											if(createDialogAdditionalControlsNumberOfStatesToFetch == 0){
												if($("#DialogAdditionalControlsContent").length == 0) { //Dialog is not rendered - therefore push the createDialogAdditionalControlsFunction to the dialogBindingFunctions, which will be executed after rendering the dialog
													dialogBindingFunctions.push(createDialogAdditionalControlsFunction);
												} else {
													createDialogAdditionalControlsFunction();
												}
											}
										});
									})(); //<--End Closure
								} else {
									createDialogAdditionalControlsNumberOfStatesToFetch--;
									if(createDialogAdditionalControlsNumberOfStatesToFetch == 0) {
										if($("#DialogAdditionalControlsContent").length == 0) { //Dialog is not rendered - therefore push the createDialogAdditionalControlsFunction to the dialogBindingFunctions, which will be executed after rendering the dialog
											dialogBindingFunctions.push(createDialogAdditionalControlsFunction);
										} else {
											createDialogAdditionalControlsFunction();
										}										
									}
								}
							});
						});
					})(); //<--End Closure
				}

				//----External Link with url
				if(dialogStates["URL"] && (device.commonRole == "iQontrolExternalLink" || getDeviceOptionValue(device, "openURLExternal") == "true")){
					var type = _(getDeviceOptionValue(device, "openURLExternalCaption") || "Open External Link");
					dialogContentCountAfterHR++;
					dialogContent += "<a href='' target='_blank' data-role='button' data-mini='false' data-icon='action' data-iconpos='left' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogExternalLinkButton' id='DialogExternalLinkButton'>" + type + "</a>";
					(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
						var _deviceIdEscaped = deviceIdEscaped;
						var _linkedUrlId = dialogLinkedStateIds["URL"];
						var updateFunction = function(){
							if(fetchedStates[_linkedUrlId] && fetchedStates[_linkedUrlId].val && fetchedStates[_linkedUrlId].val !== "") {
								$('#DialogExternalLinkButton').attr('href', fetchedStates[_linkedUrlId].val);
							}
						}
						if(_linkedUrlId) dialogUpdateFunctions[_linkedUrlId].push(updateFunction);
					})(); //<--End Closure
				}

				//----Popup with url or html
				if((dialogStates["URL"] && !(device.commonRole == "iQontrolExternalLink" || getDeviceOptionValue(device, "openURLExternal") == "true")) || dialogStates["HTML"]){
					dialogContentCountAfterHR++;
					var style = "display: none; ";
					var popupWidth = getDeviceOptionValue(device, "popupWidth");
					if(popupWidth){
						style += "width: " + popupWidth + "px !important; ";
						if(popupWidth < 300) style += "min-width: " + popupWidth + "px !important; ";
					} else if(device.commonRole !== "iQontrolPopup" && device.commonRole !== "iQontrolWidget") {
						style += "width: unset !important; "
					}
					var popupHeight = getDeviceOptionValue(device, "popupHeight");
					if(popupHeight) {
						style += "height: " + popupHeight + "px !important; ";
					} else if(device.commonRole !== "iQontrolPopup" && device.commonRole !== "iQontrolWidget") {
						style += "height: unset !important; "
					}
					dialogContent += "<div class='iQontrolDialogIframeWrapper' id='DialogPopupIframeWrapper' style='" + style + "'>";
					dialogContent += "	<iframe class='iQontrolDialogIframe' data-iQontrol-Device-ID='" + deviceIdEscaped + "' id='DialogPopupIframe' scrolling='auto'" + ((getDeviceOptionValue(device, "popupAllowPostMessage") == "true") ? " data-allow-post-message='true'" : "") + ">" + _("Content not available") + "</iframe>";
					dialogContent += "	<div id='DialogPopupIframeHandle' style='" + ((getDeviceOptionValue(device, "popupFixed") == "true") ? "display: none; " : "") + "position: absolute; width: 20px; height: 25px; bottom: -11px; right: -8px; background: repeating-linear-gradient(to right, darkgrey, darkgrey 1px, transparent, transparent 25%); transform: rotate(45deg);'></div>";
					dialogContent += "</div>";
					(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
						var _device = device;
						var _deviceIdEscaped = deviceIdEscaped;
						var _linkedUrlId = dialogLinkedStateIds["URL"];
						var _linkedHtmlId = dialogLinkedStateIds["HTML"];
						var updateFunction = function(){
							setTimeout(function(){
								var iframe = document.getElementById('DialogPopupIframe');
								if(fetchedStates[_linkedUrlId] && fetchedStates[_linkedUrlId].val && fetchedStates[_linkedUrlId].val !== "" && getDeviceOptionValue(_device, "openURLExternal") != "true") {
									iframe.src = fetchedStates[_linkedUrlId].val;
									if(iframe.onload == null) {
										iframe.onload = function(){
											this.onload = function(){};
											$('.iQontrolDialogIframeWrapper').show();
											setTimeout(function(){ $('#Dialog').popup('reposition', {positionTo: 'window'}); }, 250);
											setTimeout(function(){ $('#Dialog').popup('reposition', {positionTo: 'window'}); }, 500);
										}
									}
								} else if(fetchedStates[_linkedHtmlId] && fetchedStates[_linkedHtmlId].val && fetchedStates[_linkedHtmlId].val !== "") {
									var iframedoc = iframe.contentDocument || iframe.contentWindow.document;
									if(iframe.onload == null) {
										iframe.onload = function(){
											this.onload = function(){};
											$('.iQontrolDialogIframeWrapper').show();
											setTimeout(function(){ $('#Dialog').popup('reposition', {positionTo: 'window'}); }, 250);
											setTimeout(function(){ $('#Dialog').popup('reposition', {positionTo: 'window'}); }, 500);
										}
									}
									iframedoc.open();
									iframedoc.write(fetchedStates[_linkedHtmlId].val.replace(/\\n/g, String.fromCharCode(13)));
									$(iframedoc).find('body').css('font-family', 'sans-serif');
									iframedoc.close();
								} else {
									$('.iQontrolDialogIframeWrapper').hide();
								}
							}, (isFirefox?100:0));
						}
						if(_linkedUrlId) dialogUpdateFunctions[_linkedUrlId].push(updateFunction);
						if(_linkedHtmlId) dialogUpdateFunctions[_linkedHtmlId].push(updateFunction);
					})(); //<--End Closure
				}

				//----Additional Info
				//Special: ADDITIONAL_INFO is an Array: [{"name":"Name", "type":"LinkedState", "value":"LinkedStateId"}, ...]
				var linkedAdditionalInfoIds;
				if(dialogStates["ADDITIONAL_INFO"] && typeof dialogStates["ADDITIONAL_INFO"].val != udef) linkedAdditionalInfoIds = tryParseJSON(dialogStates["ADDITIONAL_INFO"].val);
				var linkedAdditionalInfoIdsAreValid = false;
				if(Array.isArray(linkedAdditionalInfoIds) && typeof linkedAdditionalInfoIds == 'object') linkedAdditionalInfoIds.forEach(function(element){
					if(typeof element.name !== udef && element.name !== udef){
						linkedAdditionalInfoIdsAreValid = true;
					}
				});
				if(linkedAdditionalInfoIdsAreValid){
					//get additional linkedStates from Array:
					linkedAdditionalInfoIds.forEach(function(element){
						if(typeof fetchedStates[element.value] == udef) {
							dialogStateIdsToFetch.push(element.value);
						}
						if(typeof fetchedObjects[element.value] == udef) {
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _elementValue = element.value;
								fetchObject(_elementValue, function(error){ updateState(_elementValue, "ignorePreventUpdateForDialog"); });
							})(); //<--End Closure
						}
						dialogLinkedStateIdsToUpdate.push(element.value);
					});
					dialogContentCountAfterHR++;
					var type = _(getDeviceOptionValue(device, "additionalInfoCaption") || "Additional Infos");
					var additionalInfoSectionType = getDeviceOptionValue(device, "additionalInfoSectionType") || "collapsible";
					var additionalInfoListType = getDeviceOptionValue(device, "additionalInfoListType") || "";
					var additionalInfoListColumnCount = getDeviceOptionValue(device, "additionalInfoListColumnCount") || "auto";
					var additionalInfoListColumnWidth = parseInt(getDeviceOptionValue(device, "additionalInfoListColumnWidth") || "0");
					dialogContent += "<div" + (additionalInfoSectionType.indexOf("collapsible") == -1 ? "" : " data-role='collapsible' class='collapsibleAnimated iQontrolDialogAdditionalInfoCollapsible'") + (additionalInfoSectionType.indexOf("open") == -1 ? "" : " data-collapsed='false'") + " data-iconpos='right' data-inset='true'>";
						dialogContent += (additionalInfoSectionType.indexOf("noCaption") == -1 ? "<h4><image src='./images/symbols/variable.png' style='width:16px; height:16px;'>&nbsp;" + type + ":</h4>" : (additionalInfoListType == "plain" && dialogContentCountAfterHR > 0 ? "<hr>" : ""));
						dialogContent += "<div class='adjustToDialogWidthOffset50' id='DialogAdditionalInfosContent'" + (additionalInfoSectionType.indexOf("collapsible") == -1 ? " style='padding-left:16px; margin-bottom:16px;'" : "") + ">";
							dialogContent += "<ul class='iQontrolDialogAdditionalInfoList' id='DialogAdditionalInfosContentList'" + (additionalInfoListType == "plain" ? "" : " data-role='listview'") + " data-iQontrol-Device-ID='" + deviceIdEscaped + "' style='columns: " + additionalInfoListColumnCount + (additionalInfoListColumnWidth ? " " + additionalInfoListColumnWidth + "px" : "") + ";'></ul>";
						dialogContent += "</div>";
					dialogContent += "</div>";
					(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
						var _linkedStateIds = linkedAdditionalInfoIds;
						var _additionalInfoListType = additionalInfoListType;
						var updateFunction = function(){
							$("#DialogAdditionalInfosContentList").html("");
							_linkedStateIds.forEach(function(_element){
								var state = getStateObject(_element.value);
								var resultText = "";
								if(state && typeof state.plainText == 'number'){							//STATE = number (= level); LEVEL = nothing
									result = state.val;
									resultText = result + state.unit;
								} else if(state){ 															//STATE = bool or text; LEVEL = nothing
									result = state.val;
									resultText = state.plainText;
								}
								if(state) $("#DialogAdditionalInfosContentList").append("<li><b>" + _element.name + ":</b> " + resultText + "</li>");
							});
							if(_additionalInfoListType != "plain") $("#DialogAdditionalInfosContentList").listview('refresh');
						};
						_linkedStateIds.forEach(function(_element){
							if(!dialogUpdateFunctions[_element.value]) dialogUpdateFunctions[_element.value] = [];
							dialogUpdateFunctions[_element.value].push(updateFunction);
						});
					})(); //<--End Closure
				}
				//----LinkedView
				if(typeof device.nativeLinkedView != udef && device.nativeLinkedView !== "") { //Link to other view
					var linkedView = device.nativeLinkedView;
					var linkedViewName = linkedView.substring(linkedView.lastIndexOf('.') + 1);
					var linkedViewHistoryPosition = viewLinksToOtherViews.indexOf(device.nativeLinkedView);
					if(dialogContentCountAfterHR > 0) dialogContent += "<hr>";
					dialogContentCountAfterHR++;
					dialogContent += "<label for='DialogLinkedViewButton' ><image src='./images/symbols/view.png' / style='width:16px; height:16px;'>&nbsp;" + _("Link to other view") + ":</label>";
					dialogContent += "<a data-role='button' data-mini='false' class='iQontrolDialogButton' data-iQontrol-Device-ID='" + deviceIdEscaped + "' name='DialogLinkedViewButton' id='DialogLinkedViewButton' onclick='$(\"#DialogContent\").empty(); setTimeout(function(){$(\"#Dialog\").popup(\"close\"); setTimeout(function(){viewHistory = viewLinksToOtherViews; viewHistoryPosition = " + linkedViewHistoryPosition + "; renderView(unescape(\"" + escape(linkedView) + "\"));}, 200);}, 200);'>" + _("Open %s", linkedViewName.split("#")[0]) + "</a>";
				}
			dialogContent += "</form>";
			$("#DialogContent").html(dialogContent);
			//--Name
			var name = encodeURI(device.commonName.split('|')[0]);
			var variablename = encodeURI(device.commonName.split('|').slice(1).join('|'));
			$("#DialogHeaderTitle").html((name != "" ? decodeURI(name) + ":" : ""));
			var a = variablename.indexOf('%7B'), b = variablename.lastIndexOf('%7D');
			if(a > -1 && a < b) {
				var variable = variablename.substring(a + 3, b).split('%7C'); //Text between { and }, split by |
				var linkedStateId = variable[0];
				var noUnit = false;
				if(linkedStateId.substr(0, 3) == "%5B" && linkedStateId.substr(-3) == "%5D"){ // [ and ] are escaped by %5B and %5D
					linkedStateId = linkedStateId.substring(3, linkedStateId.length - 3);
					noUnit = true;
				}
				linkedStateId = decodeURI(linkedStateId);
				var placeholder = null;
				if(variable.length > 1) placeholder = variable[1];
				(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
					var _variablename = variablename;
					var _noUnit = noUnit;
					var _a = a;
					var _b = b;
					var _linkedStateId = linkedStateId;
					var _placeholder = placeholder;
					var updateFunction = function(){
						var state = getStateObject(_linkedStateId);
						var replacement = null;
							//Replace by value
						if(state && typeof state.val !== udef) {
							if(typeof state.plainText == 'number' && !_noUnit){				//STATE = number
								replacement = state.val + state.unit;
							} else {														//STATE = bool or text
								replacement = state.plainText;
							}
						} else if(_placeholder) {
							//Replace by placeholder
							replacement = _placeholder;
						}
						if(replacement != null){
							var newName = decodeURI(_variablename.substring(_variablename.indexOf('?') + 1, _a) + replacement + _variablename.substring(_b + 3)) + ":";
							if($("#DialogHeaderTitle").html() != newName){
								console.log("Set new Name: " + newName);
								$("#DialogHeaderTitle").html(newName);
							}
						}
					};
					if(!dialogUpdateFunctions[_linkedStateId]) dialogUpdateFunctions[_linkedStateId] = [];
					dialogUpdateFunctions[_linkedStateId].push(updateFunction);
				})(); //<--End Closure
				dialogStateIdsToFetch.push(linkedStateId);
				dialogLinkedStateIdsToUpdate.push(linkedStateId);
			}
			//Enhance Dialog
			$("#Dialog").enhanceWithin();
			// CollapsibleAnimated initialisieren
			collapsibleAnimatedInit();		
			// Make iFrame resizable
			dragElement('DialogPopupIframeWrapper', 'DialogPopupIframeHandle', true, true);
			//Fit slider popup size to text-length
			$('.iQontrolDialogSlider').on('change', function(){
				if($(this).val() < 9999) {
					$(this).prev('div.ui-slider-popup').removeClass('longText').removeClass('extraLongText');
				} else if($(this).val() < 99999) {
					$(this).prev('div.ui-slider-popup').addClass('longText').removeClass('extraLongText');
				} else {
					$(this).prev('div.ui-slider-popup').removeClass('longText').addClass('extraLongText');
				}
			});
			for(var i = 0; i < dialogBindingFunctions.length; i++){ dialogBindingFunctions[i](); }
			dialogBindingFunctions = [];
			dialogLinkedStateIdsToUpdate = removeDuplicates(dialogLinkedStateIdsToUpdate);
			for (var i = 0; i < dialogLinkedStateIdsToUpdate.length; i++){updateState(dialogLinkedStateIdsToUpdate[i], "ignorePreventUpdateForDialog");}
			dialogLinkedStateIdsToUpdate = [];
			dialogStateIdsToFetch = removeDuplicates(dialogStateIdsToFetch);
			if(dialogStateIdsToFetch.length > 0) fetchStates(dialogStateIdsToFetch, function(){
				console.log(dialogStateIdsToFetch.length + " additional states fetched while rendering dialog.");
				(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
					var _dialogStateIdsToFetch = dialogStateIdsToFetch;
					for (var i = 0; i < _dialogStateIdsToFetch.length; i++){
						if(typeof fetchedObjects[_dialogStateIdsToFetch[i]] == udef) {
							fetchObject(_dialogStateIdsToFetch[i], function(){
								updateState(_dialogStateIdsToFetch[i], "ignorePreventUpdateForDialog");
							});
						} else {
							updateState(_dialogStateIdsToFetch[i], "ignorePreventUpdateForDialog");
						}
					}
				})(); //<--End Closure
			});
			//Enhance Textareas with jqte
			enhanceTextareasWithJqte('.iQontrolDialogString');
			//Show or hide Timestamp
			var showTimestamp = null;
			var dialogShowTimestamp = getDeviceOptionValue(device, "showTimestamp") || ""; //possible values: "" = auto, "yes", "no", "always", "never"
			switch(dialogShowTimestamp){
				case "yes":
				$('.iQontrolDialogTimestampSwitch.hide').show();
				case "always":
				showTimestamp = true;
				break;

				case "no":
				$('.iQontrolDialogTimestampSwitch.show').show();
				case "never":
				showTimestamp = false;
				break;

				default:
				switch(device.commonRole){
					case "iQontrolView": case "iQontrolWindow": case "iQontrolDoor": case "iQontrolGarageDoor": case "iQontrolFire": case "iQontrolFlood": case "iQontrolTemperature": case "iQontrolHumidity": case "iQontrolPressure": case "iQontrolBrightness": case "iQontrolMotion":
					showTimestamp = true;
					$('.iQontrolDialogTimestampSwitch.hide').show();
					break;

					default:
					showTimestamp = false;
					$('.iQontrolDialogTimestampSwitch.show').show();
				}
			}
			if(showTimestamp){
				$('#DialogTimestamp').show();
			}
			$('.iQontrolDialogTimestampSwitch.show').on('click', function(){
				$('#DialogTimestamp').show();
				$('.iQontrolDialogTimestampSwitch.show').hide();
				$('.iQontrolDialogTimestampSwitch.hide').show();
			});
			$('.iQontrolDialogTimestampSwitch.hide').on('click', function(){
				$('#DialogTimestamp').hide();
				$('.iQontrolDialogTimestampSwitch.show').show();
				$('.iQontrolDialogTimestampSwitch.hide').hide();
			});
			//Reposition to window
			setTimeout(function(){ $("#Dialog").popup("reposition", {positionTo: 'window'}); }, 250);
			setTimeout(function(){ $("#Dialog").popup("reposition", {positionTo: 'window'}); }, 350);
			//Start dialogIdsToUpdateEverySecondInterval
			if(dialogIdsToUpdateEverySecondInterval) clearInterval(dialogIdsToUpdateEverySecondInterval);
			dialogIdsToUpdateEverySecondInterval = setInterval(function(){
				dialogIdsToUpdateEverySecond.forEach(function(id){
					if(typeof dialogUpdateFunctions[id] != udef) dialogUpdateFunctions[id].forEach(function(dialogUpdateFunction){
						dialogUpdateFunction(id, "updateEverySecond");
					});
				});
			}, 1000);
		});
	});
}

function dialogUpdateTimestamp(state){
	if(typeof state != udef && state !== null && typeof state.lc != udef && state.lc !== ""){
		if(state.lc > parseInt($('#DialogTimestamp').data('timestamp') || 0)){
			$('#DialogTimestamp').data('timestamp', state.lc);
			var timestamp = new Date(state.lc + timeshift) ;
			var timestampText = ('0' + timestamp.getHours()).slice(-2) + ":" + ('0' + timestamp.getMinutes()).slice(-2);
			var now = new Date();
			if(now.getFullYear() != timestamp.getFullYear() || now.getMonth() != timestamp.getMonth() || now.getDate() != timestamp.getDate()){
				timestampText = ('0' + timestamp.getDate()).slice(-2) + "." + ('0' + (timestamp.getMonth() + 1)).slice(-2) + "." + timestamp.getFullYear() + ", " + timestampText;
			}
			$('#DialogTimestampText').html(timestampText);
		}
	}
}

function dialogThermostatPartyModeCheckConsistency(){
	var now = new Date();
	var year = now.getFullYear() - 2000;
	var partyModeStartHour = $("#DialogThermostatPartyModeStartHour")[0].selectedIndex;
	var partyModeStartMin = $("#DialogThermostatPartyModeStartMin")[0].selectedIndex * 30;
	var partyModeStartDay = $("#DialogThermostatPartyModeStartDay")[0].selectedIndex + 1;
	var partyModeStartMonth = $("#DialogThermostatPartyModeStartMonth")[0].selectedIndex + 1;
	var partyModeStartYear = $("#DialogThermostatPartyModeStartYear")[0].selectedIndex + year;
	var partyModeStartMoment = new Date(partyModeStartYear + 2000, partyModeStartMonth - 1, partyModeStartDay, partyModeStartHour, partyModeStartMin);
	var partyModeStopHour = $("#DialogThermostatPartyModeStopHour")[0].selectedIndex;
	var partyModeStopMin = $("#DialogThermostatPartyModeStopMin")[0].selectedIndex * 30;
	var partyModeStopDay = $("#DialogThermostatPartyModeStopDay")[0].selectedIndex + 1;
	var partyModeStopMonth = $("#DialogThermostatPartyModeStopMonth")[0].selectedIndex + 1;
	var partyModeStopYear = $("#DialogThermostatPartyModeStopYear")[0].selectedIndex + year;
	var partyModeStopMoment = new Date(partyModeStopYear + 2000, partyModeStopMonth - 1, partyModeStopDay, partyModeStopHour, partyModeStopMin);
	var error = false;
	if(partyModeStartMoment < now) { $('#DialogThermostatPartyModeStartMomentError').show(); error = true; } else { $('#DialogThermostatPartyModeStartMomentError').hide(); }
	if(partyModeStopMoment <= partyModeStartMoment) { $('#DialogThermostatPartyModeStopMomentError').show(); error = true; } else { $('#DialogThermostatPartyModeStopMomentError').hide(); }
	if(error) $("input[name='DialogThermostatPartyModeSave']").attr("disabled", "disabled"); else $("input[name='DialogThermostatPartyModeSave']").attr("disabled", false);
}

function enhanceTextareasWithJqte(selector){
	var selectorClass = selector.replace('.', '').replace('#', '');
	$(selector).each(function(){
		if($(this).parent('.jqte_source').length == 0 && isHTML($(this).val())){
			if($(this).data('disabled') == true){ //readonly
				var displayToolbar = "none";
				$(this).jqte({
					css: "jqte",
					b: false,
					br: false,
					center: false,
					color: false,
					fsize: false,
					format: false,
					i: false,
					indent: false,
					link: false,
					left: false,
					ol: false,
					outdent: false,
					p: false,
					remove: false,
					right: false,
					rule: false,
					source: true,
					sub: false,
					strike: false,
					sup: false,
					title: true,
					titletext: [{title:"Format"},{title:"Schriftgr&ouml;&szlig;e"},{title:"Farbe"},{title:"Fett",hotkey:"B"},{title:"Kursiv",hotkey:"I"},{title:"Unterstrichen",hotkey:"U"},{title:"Nummeriert",hotkey:"."},{title:"Aufz&auml;hlung",hotkey:","},{title:"Tiefgestellt",hotkey:"down arrow"},{title:"Hochgestellt",hotkey:"up arrow"},{title:"Einzug verkleinern",hotkey:"left arrow"},{title:"Einzug vergr&ouml;&szlig;ern",hotkey:"right arrow"},{title:"Linksb&uuml;ndig"},{title:"Zentriert"},{title:"Rechtsb&uuml;ndig"},{title:"Durchgestrichen",hotkey:"K"},{title:"Link hinzuf&uuml;gen",hotkey:"L"},{title:"Link entfernen",hotkey:""},{title:"Style entfernen",hotkey:"Delete"},{title:"Horizontale Linie",hotkey:"H"},{title:"HTML",hotkey:""}],
					u: false,
					ul: false,
					unlink: false
				}).prop('readonly', 'true').removeClass('ui-state-disabled').parents('.jqte_source').prevAll('.jqte_editor').prop('contenteditable','false').prevAll('.jqte_toolbar').css('display',displayToolbar).parent().addClass(selectorClass);
			} else { //editable
				$(this).jqte({
					css: "jqte",
					fsize: true,
					fsizes: ['6','8','10','12','14','16','18','20','24','28','36'],
					funit: "px",
					format: true,
					formats: [['p','Normal'],['h1','Ebene 1'],['h2','Ebene 2'],['h3','Ebene 3'],['h4','Ebene 4'],['h5','Ebene 5'],['h6','Ebene 6'],['pre','Vorformatiert']],
					link: true,
					strike: false,
					title: true,
					titletext: [{title:"Format"},{title:"Schriftgr&ouml;&szlig;e"},{title:"Farbe"},{title:"Fett",hotkey:"B"},{title:"Kursiv",hotkey:"I"},{title:"Unterstrichen",hotkey:"U"},{title:"Nummeriert",hotkey:"."},{title:"Aufz&auml;hlung",hotkey:","},{title:"Tiefgestellt",hotkey:"down arrow"},{title:"Hochgestellt",hotkey:"up arrow"},{title:"Einzug verkleinern",hotkey:"left arrow"},{title:"Einzug vergr&ouml;&szlig;ern",hotkey:"right arrow"},{title:"Linksb&uuml;ndig"},{title:"Zentriert"},{title:"Rechtsb&uuml;ndig"},{title:"Durchgestrichen",hotkey:"K"},{title:"Link hinzuf&uuml;gen",hotkey:"L"},{title:"Link entfernen",hotkey:""},{title:"Style entfernen",hotkey:"Delete"},{title:"Horizontale Linie",hotkey:"H"},{title:"HTML",hotkey:""}]
				}).parents('.jqte_source').prevAll('.jqte_toolbar').parent().addClass(selectorClass);
				//Fix for safari z-index-bug jqte_fontsizes jqte_cpalette
				$('#Dialog').append($('.jqte_formats'));
				$('.jqte_formats').css('top', $('.jqte_tool_1').position().top + $('.jqte_tool_1').outerHeight()).css('left', $('.jqte_tool_1').position().left);
				$('#Dialog').append($('.jqte_fontsizes'));
				$('.jqte_fontsizes').css('top', $('.jqte_tool_2').position().top + $('.jqte_tool_2').outerHeight()).css('left', $('.jqte_tool_2').position().left);
				$('#Dialog').append($('.jqte_cpalette'));
				$('.jqte_cpalette').css('top', $('.jqte_tool_3').position().top + $('.jqte_tool_3').outerHeight()).css('left', $('.jqte_tool_3').position().left);
			}
		}
	});
}

function dialogResized(){
	var width = $('#DialogContent').innerWidth();
	$('.adjustToDialogWidthOffset50').css('width', (width - 50) + "px");
}

//++++++++++ POPUP (TOAST) ++++++++++
function initPopup(){
	if(!isBackgroundView) fetchStates([namespace + '.Popup.Message', namespace + '.Popup.PersistentMessage', namespace + '.Popup.PersistentExpires', namespace + '.Popup.PersistentUndismissible', namespace + '.Popup.PersistentId', namespace + '.Popup.PERSISTENT_MESSAGES_SHOW_ID', namespace + '.Popup.Duration', namespace + '.Popup.PERSISTENT_MESSAGES_PENDING', namespace + '.Popup.ClickKeepsOpen', namespace + '.Popup.ClickedValue', namespace + '.Popup.ClickedDestinationState', namespace + '.Popup.ButtonNames', namespace + '.Popup.ButtonValues', namespace + '.Popup.ButtonDestinationStates', namespace + '.Popup.ButtonCloses', namespace + '.Popup.ButtonClears'], function(){
		popupShowPersistentMessages();
	});
}

function popupShowPersistentMessages(id){
	if(isBackgroundView) return;
	if(typeof id == udef || id == "null") id = null;
	var persistentMessagesPendingId = namespace + ".Popup.PERSISTENT_MESSAGES_PENDING" 
	var statePersistentMessagesPending = getStateObject(persistentMessagesPendingId);
	var persistentMessagesPending = statePersistentMessagesPending && statePersistentMessagesPending.val || [];
	if(!Array.isArray(persistentMessagesPending)) persistentMessagesPending = [];
	persistentMessagesPending.forEach(function(message){
		if(message.message && (id == null || typeof message.id == udef || message.id == id)){
			let now = Math.floor(new Date().getTime()/1000);
			let expires = message.persistentExpires;
			if(expires.toString().length === 13) expires = Math.floor(expires/1000);
			if(expires
				&& ((expires > 31536000 && expires < now)
					|| (expires <= 31536000 && expires < now - message.ts))){
				toastRemovePersistentMessagePending(message);
			} else {
				toast(message);
			}
		}
	});	
}

function toast(message){
	if(isBackgroundView) return;
	console.log("set toast");
	if(message.message && (toastStack.length == 0 || toastStack[toastStack.length - 1].message !== message.message)){
		let equalMessages = toastStack.filter(function(item){
			return objectsEqual(item, message);
		}) || [];
		if(equalMessages.length == 0){
			toastStack.push(message);
			if(toastStack.length == 1) toastShowNext(); else $(".toastMessageQueue").html("+" + (toastStack.length - 1).toString());
		}
	}
}

function toastShowNext(){
	console.log("toastShowNext");
	if(toastStack.length > 0) {
		var toast = toastStack[0];
		toast.message = toast.message || "";
		toast.persistentExpires = toast.persistentExpires || 0;
		toast.persistentUndismissible = toast.persistentUndismissible || false;
		toast.persistentId = toast.persistentId || "";
		toast.duration = toast.duration || 0;
		toast.clickKeepsOpen = toast.clickKeepsOpen || false;
		toast.clickedValue = toast.clickedValue || "";
		toast.clickedDestinationState = toast.clickedDestinationState || "";
		toast.buttonNames = toast.buttonNames || "";
		toast.buttonValues = toast.buttonValues || "";
		toast.buttonDestinationStates = toast.buttonDestinationStates || "";
		toast.buttonCloses = toast.buttonCloses || "";
		toast.buttonClears = toast.buttonClears || "";
		var toaststring = "";
		toaststring += "<div id='popup' class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'>";
		toaststring += 		"<div class='toastMessageDuration' style='display: none; position: absolute; left: 2px; top: -2px; width: 10px;'>";
		toaststring +=			"<svg viewBox='0 0 36 36'>";
		toaststring +=				"<path fill='none' stroke='lightgrey' stroke-width='4' d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'></path>";
		toaststring +=				"<path class='toastMessageDurationProgress' fill='none' stroke='grey' stroke-width='4' stroke-linecap='round' stroke-dasharray='100, 100' transform='rotate(0 18 18)' d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'></path>";
		toaststring +=			"</svg>";
		toaststring +=		"</div>";
		toaststring += 		"<div class='toastMessageQueue' style='position: absolute; right: 2px; top: 2px; text-align: right; font-size: smaller;'>&nbsp;</div>";
		toaststring += 		"<h4>" + toast.message + "</h4>";
		if(toast.buttonNames !== ""){
			toaststring += 		"<div class='toastMessageButtons' style='width: 100%; text-align: center; font-size: smaller;'>";
			var buttonNames = toast.buttonNames.split(',');
			var buttonValues = toast.buttonValues.split(',');
			var buttonDestinationStates = toast.buttonDestinationStates.split(',');
			var buttonCloses = toast.buttonCloses.split(',');
			var buttonClears = toast.buttonClears.split(',');
			toaststring +=	 		"<div data-role='controlgroup' data-type='horizontal' data-mini='true'>";
			buttonNames.forEach(function(buttonName, i){
				if(buttonName == "") return;
				toaststring += 			"<button class='ui-shadow ui-btn ui-corner-all' onclick='";
				toaststring +=				((typeof buttonCloses[i] != udef ? buttonCloses[i] == 'false' : typeof buttonCloses[0] != udef ? buttonCloses[0] == 'false' : false) ? "event.stopPropagation(); " : "");
				var buttonDestinationState = (typeof buttonDestinationStates[i] != udef && buttonDestinationStates[i] !== "" ? buttonDestinationStates[i] : typeof buttonDestinationStates[0] != udef && buttonDestinationStates[0] !== "" ? buttonDestinationStates[0] : null);
				var buttonValue = (typeof buttonValues[i] != udef && buttonValues[i] !== "" ? buttonValues[i] : typeof buttonValues[0] != udef && buttonValues[0] !== "" ? buttonValues[0] : buttonName);
				if(buttonDestinationState == "COMMAND:renderView"){
					toaststring +=			"renderView(\"" + buttonValue + "\"); ";
				} else if(buttonDestinationState == "COMMAND:openDialog"){
					toaststring +=			"renderDialog(\"" + escape(buttonValue) + "\"); ";
					toaststring +=			"setTimeout(function(){$(\"#Dialog\").popup(\"open\", {transition: \"pop\", positionTo: \"window\"});}, 250); ";
				} else if(buttonDestinationState != null){
					toaststring +=			"deliverState(\"" + buttonDestinationState + "\", {val: \"" + buttonValue + "\", ack: true}); ";
				}
				toaststring +=				"deliverState(\"" + namespace + ".Popup.BUTTON_CLICKED\", {val: \"" + buttonValue + "\", ack: true}); ";
				toaststring +=				((typeof buttonClears[i] != udef ? buttonClears[i] == 'true' : typeof buttonClears[0] != udef ? buttonClears[0] == 'true' : false) ? "deliverState(\"" + namespace + ".Popup.CLEAR\", \"true\"); " : "");
				toaststring += 				"'>" + buttonName + "</button>";
			});
			toaststring +=			"</div>";
			toaststring += 		"</div>";
		}
		toaststring += "</div>";
		var $toast = $(toaststring);
		$toast.data('toast', toast);
		var removeToastByClick = function(){
			if(event.target.nodeName == "BUTTON" || !toast.clickKeepsOpen) removeToast(this, "click");
			var clickedDestinationState = (typeof toast.clickedDestinationState != udef && toast.clickedDestinationState !== "" ? toast.clickedDestinationState : null);
			var clickedValue = (typeof toast.clickedValue != udef && toast.clickedValue !== "" ? toast.clickedValue : true);
			if(clickedDestinationState != null){
				deliverState(clickedDestinationState, {val: clickedValue, ack: true});
			}
			deliverState(namespace + ".Popup.POPUP_CLICKED", {val: clickedValue, ack: true});
		};
		var removeToast = function(that, triggeredBy){
			let toast = $(that).data('toast') || {};
			$(that).remove();
			toastStack.shift();
			toastShowNext();
			if(!toast.persistentUndismissible) toastRemovePersistentMessagePending(toast);
		};
		$toast.css({
			'display': 'block',
			'background': '#fff',
			'opacity': 0.85,
			'position': 'fixed',
			'padding': '7px',
			'text-align': 'center',
			'word-wrap': 'break-word',
			'max-width': '80%',
			'right': '20px',
			'left': 'unset',
			'top': '20px',
			'display': 'none'
		});
		if(toast.duration > 0){
			$toast.find('.toastMessageDuration').show();
			$toast.find('.toastMessageDurationProgress').css('stroke-dashoffset', 0).animate({'strokeDashoffset': 100}, toast.duration + 400, 'linear');
		}
		$toast.click(removeToastByClick);
		$toast.appendTo($.mobile.pageContainer).enhanceWithin().fadeIn(400).delay(toast.duration);
		if(toastStack.length > 1) $(".toastMessageQueue").html("+" + (toastStack.length - 1).toString());
		if(toast.duration > 0) $toast.fadeOut(400, function(){ removeToast(this, "duration"); });
	}
}

function toastRemovePersistentMessagePending(toast){
	var persistentMessagesPendingId = namespace + ".Popup.PERSISTENT_MESSAGES_PENDING"
	var statePendingPersistentPopups = getStateObject(persistentMessagesPendingId);
	var pendingPersistentPopups = statePendingPersistentPopups && statePendingPersistentPopups.val || [];
	if(!Array.isArray(pendingPersistentPopups)) pendingPersistentPopups = [];
	pendingPersistentPopups = pendingPersistentPopups.filter(function(item){
		return !objectsEqual(item, toast, (toast.ts === null ? ["ts"] : []));
	});
	setState(persistentMessagesPendingId, null, pendingPersistentPopups);	
}

//++++++++++ PANELS ++++++++++
var panelIds = ["Panel"]; //At the moment there is only one panel present
function initPanels(){
	if(isBackgroundView || getUrlParameter("noPanel")) return;
	var panelLinkedStateIdsToFetchAndUpdate = [];
	panels.forEach(function(panel, panelIndex){
		var panelId = panelIds[panelIndex];
		//Create states of "device" panel
		panel.states = [];
		panel.states.push({state: "BACKGROUND_VIEW", commonRole: panel.BackgroundViewCommonRole, value: panel.BackgroundViewValue});
		panel.states.push({state: "BACKGROUND_URL", commonRole: panel.BackgroundURLCommonRole, value: panel.BackgroundURLValue});
		panel.states.push({state: "BACKGROUND_HTML", commonRole: panel.BackgroundHTMLCommonRole, value: panel.BackgroundHTMLValue});
		panel.states.push({state: "PANEL_HIDE", commonRole: panel.HideCommonRole, value: panel.HideValue});
		var panelLinkedStateIds = {};
		//Get linkedStates (resp. create a constant one if commonRole is const)
		["BACKGROUND_VIEW", "BACKGROUND_URL", "BACKGROUND_HTML", "PANEL_HIDE"].forEach(function(panelState){
			var linkedStateId = getLinkedStateId(panel, panelId + ".states", panelState);
			if(linkedStateId) { //Call updateFunction after rendering View
				panelLinkedStateIdsToFetchAndUpdate.push(linkedStateId);
			}
			panelLinkedStateIds[panelState] = linkedStateId;
		});
		if(panelLinkedStateIds["BACKGROUND_VIEW"] || panelLinkedStateIds["BACKGROUND_URL"] || panelLinkedStateIds["BACKGROUND_HTML"]){
			(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
				var _panelId = panelId;
				var _panelIndex = panelIndex;
				var _linkedBackgroundViewId = panelLinkedStateIds["BACKGROUND_VIEW"];
				var _linkedBackgroundURLId = panelLinkedStateIds["BACKGROUND_URL"];
				var _linkedBackgroundHTMLId = panelLinkedStateIds["BACKGROUND_HTML"];
				var _linkedPanelHideId = panelLinkedStateIds["PANEL_HIDE"];
				var updateFunction = function(){
					var stateBackgroundView = getStateObject(_linkedBackgroundViewId);
					var stateBackgroundURL = getStateObject(_linkedBackgroundURLId);
					var stateBackgroundHTML = getStateObject(_linkedBackgroundHTMLId);
					var statePanelHide = getStateObject(_linkedPanelHideId);
					var panelHide = (statePanelHide && statePanelHide.val !== udef && statePanelHide.val) || false;
					if(panels[_panelIndex].HideInvert) panelHide = !panelHide;
					if(((stateBackgroundView && typeof stateBackgroundView.val !== udef && stateBackgroundView.val !== "") || (stateBackgroundURL && typeof stateBackgroundURL.val !== udef && stateBackgroundURL.val !== "")) && !panelHide){
						createPanelIframe(_panelId, _panelIndex);
						setTimeout(function(){
							var iframe = document.getElementById("panelIframe_" + _panelId);
							if(stateBackgroundView && typeof stateBackgroundView.val !== udef && stateBackgroundView.val !== "") { //BACKGROUND_VIEW
								iframe.src = location.href.split('?')[0] + "?renderView=" + encodeURI(stateBackgroundView.val) + "&isBackgroundView=true&noToolbar=true" + (getUrlParameter("namespace") ? "&namespace=" + getUrlParameter("namespace") : "") + (passphrase ? "&passphrase=" + passphrase : "");
								$(iframe).addClass('isBackgroundView');
								var timeout = 1000;
							} else { //BACKGROUND_URL
								iframe.src = stateBackgroundURL.val;
								$(iframe).removeClass('isBackgroundView');
								var timeout = 500;
							}
							if(iframe.onload == null) {
								iframe.onload = function(){
									setTimeout(function(){
										if($("#" + _panelId + " .panelIframeWrapper").css('opacity', '0').css('opacity') == '0') $("#" + _panelId + " .panelIframeWrapper").css('opacity', '0').css('opacity', '');
										activatePanel(_panelId, _panelIndex);
									}, timeout);
								}
							}
						}, (isFirefox?100:0));
					} else if((stateBackgroundHTML && typeof stateBackgroundHTML.valFull !== udef && stateBackgroundHTML.valFull !== "") && !panelHide){
						createPanelIframe(_panelId, _panelIndex);
						setTimeout(function(){
							var iframe = document.getElementById("panelIframe_" + _panelId);
							var iframedoc = iframe.contentDocument || iframe.contentWindow.document;
							iframedoc.open();
							iframedoc.write(stateBackgroundHTML.valFull.replace(/\\n/g, String.fromCharCode(13)));
							$(iframedoc).find('body').css('font-family', 'sans-serif');
							iframedoc.close();
							setTimeout(function(){
								$("#" + _panelId + " .panelIframeWrapper").css('opacity', '');
								activatePanel(_panelId, _panelIndex);
							}, 500);
						}, (isFirefox?100:0));
					} else {
						$("#" + _panelId + " .panelIframeWrapper").css('opacity', '0');
						$("#" + _panelId + " .panelIframeWrapper").html("");
						deactivatePanel(_panelId, _panelIndex);
					}
				};
				if(_linkedBackgroundViewId) panelUpdateFunctions[_linkedBackgroundViewId].push(updateFunction);
				if(_linkedBackgroundURLId) panelUpdateFunctions[_linkedBackgroundURLId].push(updateFunction);
				if(_linkedBackgroundHTMLId) panelUpdateFunctions[_linkedBackgroundHTMLId].push(updateFunction);
				if(_linkedPanelHideId) panelUpdateFunctions[_linkedPanelHideId].push(updateFunction);
			})(); //<--End Closure
		}
	});
	panelLinkedStateIdsToFetchAndUpdate = removeDuplicates(panelLinkedStateIdsToFetchAndUpdate);
	fetchStates(panelLinkedStateIdsToFetchAndUpdate, function(){
		for (var i = 0; i < panelLinkedStateIdsToFetchAndUpdate.length; i++){
			if(typeof fetchedObjects[panelLinkedStateIdsToFetchAndUpdate[i]] == udef) {
				fetchObject(panelLinkedStateIdsToFetchAndUpdate[i], function(){
					updateState(panelLinkedStateIdsToFetchAndUpdate[i], "ignorePreventUpdateForPanel");
				});
			} else {
				updateState(panelLinkedStateIdsToFetchAndUpdate[i], "ignorePreventUpdateForPanel");
			}
		}
		panelLinkedStateIdsToFetchAndUpdate = [];
	});
	//Make PanelOpener clickable
	$('.panelOpener').off('click').on('click', function(){
		openPanel($(this).data('position'));
	});
	//Make PanelCloser clickable
	$('.panelCloser').off('click').on('click', function(){
		closePanel($(this).data('position'));
	});
	//Hide PanelOpener when opened
	$('.panel').off('panelbeforeopen').on('panelbeforeopen', function(){ $('.panelOpener.' + $(this).data('position')).css('width', '0'); });
	$('.panel').off('panelbeforeclose').on('panelbeforeclose', function(){ $('.panelOpener.' + $(this).data('position')).css('width', ''); });
	//Resize after opening and closing
	$('.panel').off('panelopen').on('panelopen', function(){
		resizeDevicesToFitScreen();
	});
	$('.panel').off('panelclose').on('panelclose', function(){
		resizeDevicesToFitScreen();
	});
}
function createPanelIframe(panelId, panelIndex){
	if($("#" + panelId + " .panelIframeWrapper").html() == ""){ //create iframe
		var padding = 0;
		var paddingStyleString = (padding > 0 ? "style='margin: " + padding + "px; width: calc(100% - " + (2 * padding) + "px); min-height: calc(100% - " + (2 * padding) + "px);'" : "");
		$("#" + panelId + " .panelIframeWrapper").html("<iframe class='panelIframe' id='panelIframe_" + panelId + "' data-panel-id='" + panelId + "' " + ((panels[panelIndex].AllowPostMessage) ? " data-allow-post-message='true'" : "") + paddingStyleString + "></iframe>");
	}
}
function activatePanel(panelId, panelIndex){
	var position = panels[panelIndex].Position = panels[panelIndex].Position || 'left';
	var oppositePosition = (position == 'left' ? 'right' : 'left');
	var customCss = "";
	$('#' + panelId).data('position', position);
	$('#' + panelId).panel('option', 'display', panels[panelIndex].Display || 'overlay');
	if(!panels[panelIndex].Dismissible){
		customCSS += ".ui-panel-dismiss-position-" + position + " {";
		customCSS += "		display: none !important;";
		customCSS += "}";
	}
	//LargeScreen-CSS
	customCSS += "@media ( min-width: " + (panels[panelIndex].LargeScreenTreshold || "600") + "px ) {";
	if(!panels[panelIndex].DismissibleOnLargeScreens){
		customCSS += ".ui-panel-dismiss-position-" + position + " {";
		customCSS += "		display: none !important;";
		customCSS += "}";
	}
	if(panels[panelIndex].CompressParentViewOnLargeScreens){
		customCSS += ".ui-panel-page-content-open.ui-panel-page-content-position-" + position + " {";
		customCSS += "		margin-" + oppositePosition + ": 17em;";
		customCSS += "		width: auto;";
		customCSS += "}";
	}
	if(panels[panelIndex].NoCloseButtonOnLargeScreens){
		customCSS += ".panelCloser." + position + " {";
		customCSS += "		opacity: 0 !important;";
		customCSS += "}";
	}
	customCSS += "}";
	$('.panelOpener.' + position).show().css('opacity', '1');
	if(!panels[panelIndex].NoCloseButton) $('.panelCloser.' + position).show().css('opacity', '1');
	removeCustomCSS(panelId);
	addCustomCSS(customCSS, panelId);
	panels[panelIndex].active = true;
	panelsCheckAutoOpenOnLargeScreens();
}
function deactivatePanel(panelId, panelIndex){
	panels[panelIndex].active = false;
	var position = panels[panelIndex].Position;
	$('.panelOpener.' + position).css('opacity', '0').delay(1000).hide();
	$('.panelCloser.' + position).css('opacity', '0').delay(1000).hide();
	$('#' + panelId).panel('close');
}
function openPanel(position){ //openes the first active panel with matching position
	var openedAPanel = false;
	for(var panelIndex = 0; panelIndex < panels.length; panelIndex++){
		var panelId = panelIds[panelIndex];
		if(panels[panelIndex].active && panels[panelIndex].Position == position){
			if(!$('#' + panelId).hasClass("ui-panel-open")){
				$('#' + panelId).panel('open');
				openedAPanel = true;
			}
			break;
		}
	}
	return openedAPanel;
}
function closePanel(position){ //closes all panels with matching position
	var closedAPanel = false;
	if(!position){
		closedAPanel = closePanel("left");
		position = "right";
	}
	for(var panelIndex = 0; panelIndex < panels.length; panelIndex++){
		var panelId = panelIds[panelIndex];
		if($('#' + panelId).hasClass("ui-panel-open") && panels[panelIndex].Position == position){
			$('#' + panelId).panel('close');
			closedAPanel = true;
		}
	}
	return closedAPanel;
}
function closePanelIdIfDismissible(panelId){
	var closedAPanel = false;
	var panelIndex = panelIds.indexOf(panelId);
	var position = panels[panelIndex].Position || 'left';
	if($('#' + panelId).hasClass("ui-panel-open") && $(".ui-panel-dismiss-position-" + position).css('display') != "none"){
		$('#' + panelId).panel('close');
		closedAPanel = true;
	}
	return closedAPanel;
}
function panelsCheckAutoOpenOnLargeScreens(ignoreActiveState){
	for(var panelIndex = 0; panelIndex < panels.length; panelIndex++){
		if(panels[panelIndex].AutoOpenOnLargeScreens && $(window).innerWidth() > parseInt((panels[panelIndex].LargeScreenTreshold || "600"))){
			openPanel('left', ignoreActiveState) || openPanel('left', ignoreActiveState);
		} else if(panels[panelIndex].AutoCloseOnSmallerScreens && $(window).innerWidth() < parseInt((panels[panelIndex].LargeScreenTreshold || "600"))){
			closePanel('left');
			closePanel('right');
		}
	};
}

//++++++++++ GENERAL AND INITIALIZATION ++++++++++
//Enable swiping, prevent default browser swipe back and forth through history
(function( $, window, undefined ) { //Extend jQuery swiping with vertical swipes
	$.event.special.swipe.handleSwipe = function( start, stop, thisObject, origTarget ) { //custom handleSwipe with swiperight, swipeleft, swipeup, swipedown
		if( stop.time - start.time < $.event.special.swipe.durationThreshold ) {
			var horSwipe = Math.abs( start.coords[0] - stop.coords[0] ) > $.event.special.swipe.horizontalDistanceThreshold;
			var verSwipe = Math.abs( start.coords[1] - stop.coords[1] ) > $.event.special.swipe.verticalDistanceThreshold;
			if( horSwipe != verSwipe ) {
				var direction;
				if(horSwipe)
					direction = start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight";
				else
					direction = start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown";
				$.event.trigger($.Event( "swipe", { target: origTarget, swipestart: start, swipestop: stop }), undefined, thisObject);
				$.event.trigger($.Event( direction, { target: origTarget, swipestart: start, swipestop: stop }), undefined, thisObject);
				return true;
			}
			return false;
		}
		return false;
	}
	$.each({ //do binding
		swipeup: "swipe.up",
		swipedown: "swipe.down"
	}, function( event, sourceEvent ) {
		$.event.special[ event ] = {
			setup: function() {
				$( this ).bind( sourceEvent, $.noop );
			},
			teardown: function() {
				$( this ).unbind( sourceEvent );
			}
		};
	});
})( jQuery, this );
var preventDefaultSwipeEmulateClickData = [false, 0, 0, null]; //clickTimerId, startX, startY, targetElement, actualX, acutalY
$(document).one("pagecreate", ".swipePage", function(){ //Swipe view (or open panel if swipe origin is near screen border)
 	$(".ui-page").get(0).addEventListener("touchstart", function(event){ //Prevent browser default swipe back and forth through history
		if(preventDefaultSwipeEmulateClickData[0]) clearTimeout(preventDefaultSwipeEmulateClickData[0]);
		if(event.touches && event.touches[0] && (event.touches[0].clientX < 20 || event.touches[0].clientX > (window.innerWidth - 10))){
			event.preventDefault();
			preventDefaultSwipeEmulateClickData[0] = setTimeout(function(){ preventDefaultSwipeEmulateClickData[0] = false; }, 200);
			preventDefaultSwipeEmulateClickData[1] = preventDefaultSwipeEmulateClickData[4] = event.touches[0].clientX || 0;
			preventDefaultSwipeEmulateClickData[2] = preventDefaultSwipeEmulateClickData[5] = event.touches[0].clientY || 0;
			preventDefaultSwipeEmulateClickData[3] = event.touches[0].target || null;
		}
	});
	$(".ui-page").get(0).addEventListener("touchmove", function(event){ //save coordniates
		if(preventDefaultSwipeEmulateClickData[0] && event.touches && event.touches[0]){
			preventDefaultSwipeEmulateClickData[4] = event.touches[0].clientX || 0;
			preventDefaultSwipeEmulateClickData[5] = event.touches[0].clientY || 0;
			if(preventDefaultSwipeEmulateClickData[3]
			&& Math.abs(preventDefaultSwipeEmulateClickData[1] - preventDefaultSwipeEmulateClickData[4]) > 2
			&& Math.abs(preventDefaultSwipeEmulateClickData[2] - preventDefaultSwipeEmulateClickData[5]) > 2) {
				$(preventDefaultSwipeEmulateClickData[3]).trigger('touchstart');
			}
		}
	});
	$(".ui-page").get(0).addEventListener("touchend", function(event){ //emulate click after preventing default
		if(preventDefaultSwipeEmulateClickData[0]){
			clearTimeout(preventDefaultSwipeEmulateClickData[0]);
			preventDefaultSwipeEmulateClickData[0] = false;
			if(preventDefaultSwipeEmulateClickData[1] && preventDefaultSwipeEmulateClickData[3]
			&& Math.abs(preventDefaultSwipeEmulateClickData[1] - preventDefaultSwipeEmulateClickData[4]) < 10
			&& Math.abs(preventDefaultSwipeEmulateClickData[2] - preventDefaultSwipeEmulateClickData[5]) < 10) {
				$(preventDefaultSwipeEmulateClickData[3]).trigger('click');
			}
		}
	});	
	$(document).on("swiperight", ".swipePage", function(event) {
		toolbarContextMenuEnd();
		viewDeviceContextMenuEnd();
		if(event.swipestart.coords[0] < 100){
			if(openPanel("left")){
				return false;
			}
		}
		if(!options.LayoutViewSwipingDisabled && !isBackgroundView) {
			setTimeout(function(){ viewSwipe("right"); }, 100);
			return false;
		}
	});
	$(document).on("swipeleft", ".swipePage", function(event){
		toolbarContextMenuEnd();
		viewDeviceContextMenuEnd();
		if(window.innerWidth - event.swipestart.coords[0] < 100){
			if(openPanel("right")){
				return false;
			}
		}
		if(!options.LayoutViewSwipingDisabled && !isBackgroundView) {
			setTimeout(function(){ viewSwipe("left"); }, 100);
			return false;
		}
	});
});
$(document).on('swipeleft swiperight', '#Dialog', function(event) { //Disable swiping on dialog
	event.stopPropagation();
	event.preventDefault();
});
$(document).on('swipeleft swiperight swipeup swipedown', function(event) { //Stop Context-Menu on swiping
	toolbarContextMenuEnd();
	viewDeviceContextMenuEnd();
});
$(document).on('click', function(event){
	if(!options.LayoutViewSwipingDisabled && !options.LayoutViewHideSwipeGoals && !isBackgroundView && event.clientX && event.clientX < 55 && event.clientY && event.clientY < 15) {
		viewSwipe("right");
	} else if(!options.LayoutViewSwipingDisabled && !options.LayoutViewHideSwipeGoals && !isBackgroundView && event.clientX && event.clientX > (window.innerWidth - 55) && event.clientY && event.clientY < 15) {
		viewSwipe("left");
	}
}); 

//Resize and Orientationchange
var resizeTimeout = false;
var toolbarMarqueeDisabledTimeouts = [];
var lastWidth;
$(window).on('orientationchange resize', function(){
	panelsCheckAutoOpenOnLargeScreens();
	if(resizeTimeout) clearTimeout(resizeTimeout);
	if(!lastWidth) lastWidth = $(".iQontrolDeviceShuffleSizer").outerWidth(true);
	var nowWidth = $(".iQontrolDeviceShuffleSizer").outerWidth(true);
	if(nowWidth != lastWidth){ // Detects changes in tile-size because of changing CSS @media query
		resizeTimeout = setTimeout(function(){
			console.log("orientationchange / resize including change of @media query timeout");
			resizeDevicesToFitScreen();
			$.backstretch("resize"); //Refresh background
			$('#Dialog').popup('reposition', {positionTo: 'window'});
			lastWidth = $(".iQontrolDeviceShuffleSizer").outerWidth(true);
			resizeTimeout = false;
		}, 1250);		
	} else {
		if(!options.LayoutViewShuffleDisabled) viewShuffleInstances.forEach(function(shuffleInstance, i){ shuffleInstance.disable(); });
		resizeFullWidthDevicesToFitScreen();
		resizeTimeout = setTimeout(function(){
			console.log("orientationchange / resize");
			resizeDevicesToFitScreen();
			$.backstretch("resize"); //Refresh background
			$('#Dialog').popup('reposition', {positionTo: 'window'});
			resizeTimeout = false;
		}, 250);
	}
	dialogResized();
	if(!options.LayoutViewMarqueeDisabled){
		$(".iQontrolToolbarBadge").each(function(){
			var deviceID = $(this).data('iqontrolDeviceId');
			var $state = $(this);
			if(toolbarMarqueeDisabledTimeouts[deviceID]) clearTimeout(toolbarMarqueeDisabledTimeouts[deviceID]);
			var $stateBGColor = $state.css('background-color');
			$state.data('marquee-disabled', 'true').marquee('destroy').attr('style', '').css('background-color', $stateBGColor);
			toolbarMarqueeDisabledTimeouts[deviceID] = setTimeout(function(){
				var _$state = $state;
				if(!options.LayoutViewMarqueeDisabled ){
					_$state.data('marquee-disabled', 'false');
					adaptHeightOrStartMarqueeOnOverflow(_$state);
				}
			}, 100);
		});
	}
});
function resizeDevicesToFitScreen(){
	var deviceMargin = parseInt($('.iQontrolDevicePressureIndicator').css('margin-left'), 10) || 6;
	var viewPadding = (parseInt($('#ViewMain').css('padding-left'), 10) || 0) + (parseInt($('#ViewMain').css('padding-right'), 10) || 0);
	var screenPadding = deviceMargin + viewPadding;
	var panelMarginLeft = parseFloat(($('.ui-panel-page-content-open.ui-panel-page-content-position-left').css('margin-right') || "0px").slice(0, -2))
	var panelMarginRight = parseFloat(($('.ui-panel-page-content-open.ui-panel-page-content-position-right').css('margin-left') || "0px").slice(0, -2))
	var screenWidth = $(window).innerWidth() - screenPadding - panelMarginLeft - panelMarginRight;
	var deviceSize = 2 * $('.iQontrolDeviceShuffleSizer').outerWidth(true);
	var columns = Math.round(screenWidth/deviceSize);
	var customCSS = ".viewShuffleContainer, .fullScreenWidth {";
	customCSS += "	width: " + (deviceSize * columns) +"px !important;";
	customCSS += "}";
	removeCustomCSS('resizeViewShuffleContainer');
	addCustomCSS(customCSS, "resizeViewShuffleContainer");
	if(!options.LayoutViewResizeDevicesToFitScreenDisabled){
		resizeFullWidthDevicesToFitScreen();
		if(options.LayoutViewResizeDevicesToFitScreenOnBigScreens || screenWidth <= (options.LayoutViewResizeDevicesToFitScreenTreshold || 600)){
			zoom = screenWidth / (columns * deviceSize);
			console.log("resizeDevicesToFitScreen with zoom-factor " + zoom);
			customCSS = "#ViewContent {";
			customCSS += "	webkit-transform: scale(" + zoom +");";
			customCSS += "	   moz-transform: scale(" + zoom +");";
			customCSS += "	       transform: scale(" + zoom +");";
			customCSS += "	margin-bottom: " + (($("#ViewContent").height() * (zoom - 1)) + $('#Toolbar').height()) + "px;";
			customCSS += "}";
			removeCustomCSS('resizeDevicesToFitScreen');
			addCustomCSS(customCSS, "resizeDevicesToFitScreen");
		}
	}
	viewShuffleReshuffle(500, 1250);
}
function resizeFullWidthDevicesToFitScreen(){
	var deviceMargin = parseInt($('.iQontrolDevicePressureIndicator').css('margin-left'), 10) || 6;
	var viewPadding = (parseInt($('#ViewMain').css('padding-left'), 10) || 0) + (parseInt($('#ViewMain').css('padding-right'), 10) || 0);
	var screenPadding = deviceMargin + viewPadding;
	var panelMarginLeft = parseFloat(($('.ui-panel-page-content-open.ui-panel-page-content-position-left').css('margin-right') || "0px").slice(0, -2))
	var panelMarginRight = parseFloat(($('.ui-panel-page-content-open.ui-panel-page-content-position-right').css('margin-left') || "0px").slice(0, -2))
	var screenWidth = $(window).innerWidth() - screenPadding - panelMarginLeft - panelMarginRight;
	var screenHeight = $(window).innerHeight();
	var deviceSize = 2 * $('.iQontrolDeviceShuffleSizer').outerWidth(true);
	var columns = Math.round(screenWidth/deviceSize);
	var toolbarHeight = $('#Toolbar').outerHeight();
	var rows = Math.round((screenHeight - toolbarHeight)/deviceSize);
	if(options.LayoutViewResizeDevicesToFitScreenOnBigScreens || screenWidth <= (options.LayoutViewResizeDevicesToFitScreenTreshold || 600)){
		zoom = screenWidth / (columns * deviceSize);
		console.log("resizeFullWidthDevicesToFitScreen with zoom-factor " + zoom);
		customCSS = ".iQontrolDevice.fullWidth, .iQontrolDevice:not(.active).fullWidthIfInactive, .iQontrolDevice.active.fullWidthIfActive, .iQontrolDevice.enlarged.fullWidthIfEnlarged {";
		customCSS += "	max-width: " + (deviceSize * columns - (3 * deviceMargin)) +"px !important;";
		customCSS += "	width: " + (deviceSize * columns - (3 * deviceMargin)) +"px !important;";
		customCSS += "}";
		x = parseInt((screenHeight / zoom) - toolbarHeight - (2 * deviceMargin) - 20 - 104);
		customCSS += ".iQontrolDevice.aspect-1-1-limited, .iQontrolDevice:not(.active).aspect-1-1-limitedIfInactive, .iQontrolDevice.active.aspect-1-1-limitedIfActive, .iQontrolDevice.enlarged.aspect-1-1-limitedIfEnlarged {";
		customCSS += "	padding-bottom: min(calc(100% - 104px), " + (x) + "px) !important;";
		customCSS += "}";
		customCSS += ".iQontrolDevice.aspect-4-3-limited, .iQontrolDevice:not(.active).aspect-4-3-limitedIfInactive, .iQontrolDevice.active.aspect-4-3-limitedIfActive, .iQontrolDevice.enlarged.aspect-4-3-limitedIfEnlarged {";
		customCSS += "	padding-bottom: min(calc(75% - 104px), " + (x) + "px) !important;";
		customCSS += "}";
		customCSS += ".iQontrolDevice.aspect-3-2-limited, .iQontrolDevice:not(.active).aspect-3-2-limitedIfInactive, .iQontrolDevice.active.aspect-3-2-limitedIfActive, .iQontrolDevice.enlarged.aspect-3-2-limitedIfEnlarged {";
		customCSS += "	padding-bottom: min(calc(66.66% - 104px), " + (x) + "px) !important;";
		customCSS += "}";
		customCSS += ".iQontrolDevice.aspect-16-9-limited, .iQontrolDevice:not(.active).aspect-16-9-limitedIfInactive, .iQontrolDevice.active.aspect-16-9-limitedIfActive, .iQontrolDevice.enlarged.aspect-16-9-limitedIfEnlarged {";
		customCSS += "	padding-bottom: min(calc(56.25% - 104px), " + (x) + "px) !important;";
		customCSS += "}";
		customCSS += ".iQontrolDevice.aspect-21-9-limited, .iQontrolDevice:not(.active).aspect-21-9-limitedIfInactive, .iQontrolDevice.active.aspect-21-9-limitedIfActive, .iQontrolDevice.enlarged.aspect-21-9-limitedIfEnlarged {";
		customCSS += "	padding-bottom: min(calc(42.86% - 104px), " + (x) + "px) !important;";
		customCSS += "}";
		customCSS += "@media screen and (min-width: 1500px) {";
		x = parseInt((screenHeight / zoom) - toolbarHeight - (2 * deviceMargin) - 20 - 156);
		customCSS += "	.iQontrolDevice.aspect-1-1-limited, .iQontrolDevice:not(.active).aspect-1-1-limitedIfInactive, .iQontrolDevice.active.aspect-1-1-limitedIfActive, .iQontrolDevice.enlarged.aspect-1-1-limitedIfEnlarged {";
		customCSS += "		padding-bottom: min(calc(100% - 104px), " + (x) + "px) !important;";
		customCSS += "	}";
		customCSS += "	.iQontrolDevice.aspect-4-3-limited, .iQontrolDevice:not(.active).aspect-4-3-limitedIfInactive, .iQontrolDevice.active.aspect-4-3-limitedIfActive, .iQontrolDevice.enlarged.aspect-4-3-limitedIfEnlarged {";
		customCSS += "		padding-bottom: min(calc(75% - 104px), " + (x) + "px) !important;";
		customCSS += "	}";
		customCSS += "	.iQontrolDevice.aspect-3-2-limited, .iQontrolDevice:not(.active).aspect-3-2-limitedIfInactive, .iQontrolDevice.active.aspect-3-2-limitedIfActive, .iQontrolDevice.enlarged.aspect-3-2-limitedIfEnlarged {";
		customCSS += "		padding-bottom: min(calc(66.66% - 104px), " + (x) + "px) !important;";
		customCSS += "	}";
		customCSS += "	.iQontrolDevice.aspect-16-9-limited, .iQontrolDevice:not(.active).aspect-16-9-limitedIfInactive, .iQontrolDevice.active.aspect-16-9-limitedIfActive, .iQontrolDevice.enlarged.aspect-16-9-limitedIfEnlarged {";
		customCSS += "		padding-bottom: min(calc(56.25% - 104px), " + (x) + "px) !important;";
		customCSS += "	}";
		customCSS += "	.iQontrolDevice.aspect-21-9-limited, .iQontrolDevice:not(.active).aspect-21-9-limitedIfInactive, .iQontrolDevice.active.aspect-21-9-limitedIfActive, .iQontrolDevice.enlarged.aspect-21-9-limitedIfEnlarged {";
		customCSS += "		padding-bottom: min(calc(42.86% - 104px), " + (x) + "px) !important;";
		customCSS += "	}";
		customCSS += "}";
		x = parseInt((screenHeight / zoom) - toolbarHeight - (2 * deviceMargin) - 20);
		customCSS += ".iQontrolDevice.fullHeight, .iQontrolDevice:not(.active).fullHeightIfInactive, .iQontrolDevice.active.fullHeightIfActive, .iQontrolDevice.enlarged.fullHeightIfEnlarged {";
		customCSS += "	height: " + (x) + "px !important; max-height: " + (x) + "px !important; min-height: " + (x) + "px !important;";
		customCSS += "	padding-bottom: unset !important;";
		customCSS += "}";
		customCSS += ".iQontrolDevice.fullHeight .iQontrolDeviceBackgroundIframe.adjustHeight, .iQontrolDevice:not(.active).fullHeightIfInactive .iQontrolDeviceBackgroundIframe.adjustHeight, .iQontrolDevice.active.fullHeightIfActive .iQontrolDeviceBackgroundIframe.adjustHeight, .iQontrolDevice.enlarged.fullHeightIfEnlarged .iQontrolDeviceBackgroundIframe.adjustHeight {";
		customCSS += "	height: " + (x + 5) + "px !important; max-height: " + (x + 5) + "px !important; min-height: " + (x + 5) + "px !important;";
		customCSS += "	padding-bottom: unset !important;";
		customCSS += "}";
		removeCustomCSS('resizeFullWidthDevicesToFitScreen');
		addCustomCSS(customCSS, "resizeFullWidthDevicesToFitScreen");
	}
	if(!options.LayoutViewMarqueeDisabled){
		var selector = ".iQontrolDevice.aspect-1-1, .iQontrolDevice:not(.active).aspect-1-1IfInactive, .iQontrolDevice.active.aspect-1-1IfActive, .iQontrolDevice.enlarged.aspect-1-1IfEnlarged";
		selector += ".iQontrolDevice.aspect-4-3, .iQontrolDevice:not(.active).aspect-4-3IfInactive, .iQontrolDevice.active.aspect-4-3IfActive, .iQontrolDevice.enlarged.aspect-4-3IfEnlarged";
		selector += ".iQontrolDevice.aspect-3-2, .iQontrolDevice:not(.active).aspect-3-2IfInactive, .iQontrolDevice.active.aspect-3-2IfActive, .iQontrolDevice.enlarged.aspect-3-3IfEnlarged";
		selector += ".iQontrolDevice.aspect-16-9, .iQontrolDevice:not(.active).aspect-16-9IfInactive, .iQontrolDevice.active.aspect-16-9IfActive, .iQontrolDevice.enlarged.aspect-16-9IfEnlarged";
		selector += ".iQontrolDevice.aspect-21-9, .iQontrolDevice:not(.active).aspect-21-9IfInactive, .iQontrolDevice.active.aspect-21-9IfActive, .iQontrolDevice.enlarged.aspect-21-9IfEnlarged";
		selector += ".iQontrolDevice.fullHeight, .iQontrolDevice:not(.active).fullHeightIfInactive, .iQontrolDevice.active.fullHeightIfActive, .iQontrolDevice.enlarged.fullHeightIfEnlarged";
		$(selector).each(function(){
			var deviceID = $(this).find('.iQontrolDeviceState').data('iqontrolDeviceId');
			var $state = $(this).find('.iQontrolDeviceState');
			if(viewShuffleApplyShuffleResizeObserverTimeoutsMarqueeDisabled[deviceID]) clearTimeout(viewShuffleApplyShuffleResizeObserverTimeoutsMarqueeDisabled[deviceID]);
			$state.data('marquee-disabled', 'true').marquee('destroy').attr('style', '');
			viewShuffleApplyShuffleResizeObserverTimeoutsMarqueeDisabled[deviceID] = setTimeout(function(){
				var _$state = $state;
				if(!options.LayoutViewMarqueeDisabled ){
					_$state.data('marquee-disabled', 'false');
					adaptHeightOrStartMarqueeOnOverflow(_$state);
				}
			}, 1500);
		});
	}
	dynamicIframeZoom();
}

//Check Connection when opening page
var hidden, visibilityChange, visibilityChangeCheckConnectionTimeout;
if(typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
	hidden = "hidden";
	visibilityChange = "visibilitychange";
} else if(typeof document.msHidden !== "undefined") {
	hidden = "msHidden";
	visibilityChange = "msvisibilitychange";
} else if(typeof document.webkitHidden !== "undefined") {
	hidden = "webkitHidden";
	visibilityChange = "webkitvisibilitychange";
}
if(typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
	console.log("This browser doesn' support the Page Visibility API.");
} else {
	document.addEventListener(visibilityChange, handleVisibilityChange, false);
}
function handleVisibilityChange() {
	if(!document[hidden]) { //Page gets visible
		console.debug("[Socket] getIsConnected");
		var connected = socket.connected || false;
		if(connected) {
			//Sometimes the connected state is false positive - therefore check for connection by sending a request an trigger reconnection on error or timeout
			if(visibilityChangeCheckConnectionTimeout) clearTimeout(visibilityChangeCheckConnectionTimeout);
			visibilityChangeCheckConnectionTimeout = setTimeout(function(){
				console.log("Page visible-event - socket connection check timeout reached - trigger reconnection");
				socket.close();
				socket.connect();
			}, 500);
			fetchSystemConfig(function(error){
				if(visibilityChangeCheckConnectionTimeout){
					clearTimeout(visibilityChangeCheckConnectionTimeout);
					visibilityChangeCheckConnectionTimeout = false;
				}
				if(error) {
					console.log("Page visible-event - socket connection check failed - trigger reconnection");
					socket.close();
					socket.connect();
				} else {
					console.log("Page visible-event - socket is connected");
				}
			});
		} else {
			console.log("Page visible-event - socket is disconnected");
			//$('.loader').show();
			socket.close();
			socket.connect();
		}
	}
}

//Document ready - initialization - start connection
$(document).ready(function(){
	//Add class isBackgroundView to html, body and #View
	if(isBackgroundView){ 
		$('html').addClass('isBackgroundView');
		$('body').addClass('isBackgroundView');
		$('#View').addClass('isBackgroundView');
		if(adjustHeightToBackgroundView) $('html').addClass('adjustHeightToBackgroundView').addClass('adjustHeightToBackgroundViewInitial');
	}

	//ViewContent Resize-Observer
	if(isBackgroundView && adjustHeightToBackgroundView){
		console.log("Starting ViewMain resize observer");
		var viewContentResizeObserver;
		var viewContentResizeObserverTimeout = false;
		var viewContentResizeObserverOldHeight = 0;
		if(viewContentResizeObserver){
			viewContentResizeObserver.disconnect();
		} else {
			viewContentResizeObserver = new MutationObserver(function(mutationList){
				mutationList.forEach(function(mutation){
					if(mutation.attributeName === 'style' && !viewContentResizeObserverTimeout){
						var delay = 10;
						if($('html').hasClass('adjustHeightToBackgroundViewInitial')){
							console.log("adjustHeightToBackgroundView initially delayed");
							delay = 500;
						}
						viewContentResizeObserverTimeout = setTimeout(function(){
							console.log("adjustHeightToBackgroundView");
							$('html').removeClass('adjustHeightToBackgroundViewInitial');
							var height = $('#ViewMain').innerHeight();
							if(viewContentResizeObserverOldHeight != height){
								window.parent.postMessage({ command: "adjustHeight" , value: (($('#ViewHeaderTitle').css('display') == 'none' ? 0 : 1) * $('#ViewHeaderTitle').outerHeight(true)) + ($('#ViewContent').innerHeight() * zoom) + 6 }, "*");
							}
							viewContentResizeObserverOldHeight = height;
							viewContentResizeObserverTimeout = false;
						}, delay);
					}
				});
			});
		}
		viewContentResizeObserver.observe(document.querySelector('#ViewContent'), {attributes: true, attributeOldValue: true, childList: false, subtree: true});
	}
	
	//Make Dialog draggable
	dragElement('Dialog-popup', 'DialogHeaderTitle', true, false, 'DialogContent', 100);

	//jQuery fix for autofocus on first input when clicking on popup
	$('#Dialog').on('mousemove', function(event){
		$('#DialogAutofocusElement').css('top', (event.pageY - $('#Dialog').offset().top - 20) + 'px');
	});

	//Init Toolbar
	$("[data-role='header'], [data-role='footer']").toolbar();

	//Init Dialog
	$('#Dialog').on('popupbeforeposition', function(){
		if($(".ui-popup-active").length == 0) $('#Toolbar').toolbar('hide');
		$('#ViewMain').data('plugin_ptrLight').options.paused = true;
		$('html').addClass('noscroll');
		setTimeout(function(){
			var setMaxHeightOffset = 100;
			var dragElement = document.getElementById('Dialog-popup');
			var setMaxHeightElement = document.getElementById('DialogContent');
			if(setMaxHeightElement) setMaxHeightElement.style.maxHeight = "calc(100vh - " + (dragElement.offsetTop - window.scrollY + setMaxHeightOffset) + "px)";
		}, 50);
	});
	console.log("Starting Dialog resize observer");
	var dialogResizeObserver;
	var dialogResizeObserverOldWidth = 0;
	if(dialogResizeObserver){
		dialogResizeObserver.disconnect();
	} else {	
		var dialogResizeObserver = new MutationObserver(function(mutationList){
			mutationList.forEach(function(mutation){
				if(mutation.attributeName === 'style'){
					var width = $('#DialogContent').innerWidth();
					if(dialogResizeObserverOldWidth != width){
						dialogResized();
					}
					dialogResizeObserverOldWidth = width;
				}
			});
		});
	}
	dialogResizeObserver.observe(document.querySelector('#DialogContent'), {attributes: true, attributeOldValue: true, childList: false, subtree: true});

	//Clear everything when Dialog is closed
	$('#Dialog').on('popupafterclose', function(){
		actualDialogId = "";
		if($('#Toolbar').hasClass('ui-fixed-hidden')) $('#Toolbar').toolbar('show');
		$('#ViewMain').data('plugin_ptrLight').options.paused = false;
		$('html').removeClass('noscroll');
		dialogUpdateFunctions = {};
	});

	//Enable viewHomeButton
	$(".viewHomeButton").on('click', function(){
		renderView(homeId);
	});

	//PullToRefresh
	$('#ViewMain').ptrLight({
		'refresh': function() {
			if(homeId !== "" && actualViewId !== "" && actualViewId != homeId) {
				socket.close();
				socket.connect();
				getStarted();
			} else {
				window.location.reload();
			}
		},
		ignoreThreshold: 20,
		pullThreshold: $(window).height() / 2,
		maxPullThreshold: $(window).height(),
		spinnerTimeout: 1000,
		allowPtrWhenStartedWhileScrolled: false,
		scrollingDom: $('html')
	});

	//Disable context-Menu (right click)
	let userAgent =  navigator && navigator.userAgent || "";
	if(!userAgent.indexOf("wioBrowser") == 0) window.oncontextmenu = function(event) {
		console.log("oncontextmenu - preventDefault and stopPropagation");
		event.preventDefault();
		event.stopPropagation();
		return false;
	};

	//Scroll Event
	$(window).scroll(function(){
		if(!viewScrollToDeviceRunning && $(window).scrollTop()){ 
			console.log("Scroll by user " + $(window).scrollTop());
			if(viewScrollToDeviceTimeout1) clearTimeout(viewScrollToDeviceTimeout1);
			if(viewScrollToDeviceTimeout2) clearTimeout(viewScrollToDeviceTimeout2);
		}
	});

	//Listen for postMessages from iframes
	window.addEventListener("message", receivePostMessage, false);
	function receivePostMessage(event) { //event: .data = message data, .origin = url of origin, .source = id of sending iframe
		var sourceIframe = false;
		if(event.source){
			$('iframe').each(function(){ //Find source iframe (event.source.frameElement may be blocked because of cross-domain-origin-policy)
				if(this.contentWindow == event.source){
					sourceIframe = this;
					return false;
				}
			});
		}
		if(event.data && sourceIframe){
			console.log("postMessage received from " + sourceIframe.id + ": " + JSON.stringify(event.data));
			if(sourceIframe.dataset.allowPostMessage == "true"){
				if(event.data.command) switch(event.data.command){
					case "getState": case "getWidgetState": case "getStateSubscribed": case "getWidgetStateSubscribed": case "getWidgetDeviceState": case "getWidgetDeviceStateSubscribed":
					if(event.data.stateId){
						var stateId = event.data.stateId;
						if(event.data.command == "getWidgetState" || event.data.command == "getWidgetStateSubscribed") stateId = namespace + ".Widgets." + event.data.stateId;
						if(event.data.command == "getWidgetDeviceState" || event.data.command == "getWidgetDeviceStateSubscribed") {
							var deviceIdEscaped = sourceIframe.dataset.iqontrolDeviceId;
							var deviceId = unescape(deviceIdEscaped);
							var device = getDevice(deviceId);
							var stateId = getLinkedStateId(device, deviceId, event.data.stateId) || "";
						}
						console.log("postMessage received: " + event.data.command + " " + stateId);
						if(stateId == ""){
							event.source.postMessage({command: "getState", stateId: event.data.stateId, value: null}, "*");
						} else {
							(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
								var _eventSource = event.source;
								var _eventDataStateId = event.data.stateId;
								var _source = event.source;
								var _stateId = stateId;
								var _noSubscribe = (event.data.command == "getState" || event.data.command == "getWidgetState" || event.data.command == "getWidgetDeviceState");
								var _updateFunctionExecuted = false;
								if(_stateId) fetchStates(_stateId, function(){
									fetchObject(_stateId, function(){
										var updateFunction = function(){
											if(fetchedObjects[_stateId] && !(_noSubscribe && _updateFunctionExecuted)){
												var value = getStateObject(_stateId);
												value.id = _stateId;
												_eventSource.postMessage({command: "getState", stateId: _eventDataStateId, value: value}, "*");
												_updateFunctionExecuted = true;
											}
										}
										if(!viewUpdateFunctions[_stateId]) viewUpdateFunctions[_stateId] = [];
										viewUpdateFunctions[_stateId].push(updateFunction);
										if(typeof fetchedStates[_stateId] != udef){
											updateFunction();
										}
									});
								});
							})(); //<--End Closure
						}
					}
					break;
					
					case "getOptions":
					console.log("postMessage received: getOptions");
					event.source.postMessage({command: "getOptions", value: options || null}, "*");
					break;

					case "setState": case "setWidgetState": case "setWidgetDeviceState":
					if(event.data.stateId && typeof event.data.value != udef){
						var stateId = event.data.stateId;
						if(event.data.command == "setWidgetState") stateId = namespace + ".Widgets." + event.data.stateId;
						if(event.data.command == "setWidgetDeviceState"){
							var deviceIdEscaped = sourceIframe.dataset.iqontrolDeviceId;
							var deviceIndex = parseInt(deviceIdEscaped.substring(deviceIdEscaped.lastIndexOf(".") + 1));
							stateId = actualView.devices[deviceIndex] && (actualView.devices[deviceIndex].states.find(function(element){ return (element.state == event.data.stateId); }) || {}).value || "";
						}
						console.log("postMessage received: setState " + stateId + " to " + event.data.value);
						(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
							var _deviceIdEscaped = deviceIdEscaped;
							var _stateId = stateId;
							var _value = event.data.value
							if(typeof _value != "object"){
								_value = {val: _value, ack: false};
							}
							// if(_stateId) deliverState(_stateId, _value);
							if(_stateId) fetchStates(_stateId, function(){
								fetchObject(_stateId, function(){
									if(fetchedObjects[_stateId]){
										setState(_stateId, _deviceIdEscaped, _value.val, true, null, 0);
									}
								});
							});							
						})(); //<--End Closure
					}
					break;

					case "renderView":
					if(event.data.value){
						console.log("postMessage received: renderView " + event.data.value);
						renderView(event.data.value);
					}
					break;

					case "renderViewClosePanel":
					if(event.data.value){
						console.log("postMessage received: renderView " + event.data.value + " and close panel");
						renderView(event.data.value);
						if(sourceIframe.dataset.panelId) closePanelIdIfDismissible(sourceIframe.dataset.panelId);
					}
					break;

					case "openDialog":
					if(event.data.value){
						console.log("postMessage received: openDialog " + event.data.value);
						renderDialog(escape(event.data.value));
						setTimeout(function(){$("#Dialog").popup("open", {transition: "pop", positionTo: "window"});}, 250);
					}
					break;
					
					case "backgroundViewLoaded":
					if(event.data.value){
						console.log("postMessage received: backgroundViewLoaded");
						var deviceIdEscaped = sourceIframe.dataset.iqontrolDeviceId;
						if($("[data-iQontrol-Device-ID='" + deviceIdEscaped + "'].iQontrolDeviceBackgroundIframeWrapper").css('opacity') == '0' && $("[data-iQontrol-Device-ID='" + deviceIdEscaped + "'].iQontrolDeviceBackgroundIframeWrapper").html() !== "") $("[data-iQontrol-Device-ID='" + deviceIdEscaped + "'].iQontrolDeviceBackgroundIframeWrapper").css('opacity', '');
					}
					break;

					case "adjustHeight":
					if(typeof event.data.value != udef){
						console.log("postMessage received: adjustHeight " + event.data.value);
						let value;
						if(event.data.value != null && !isNaN(event.data.value)) value = parseInt(event.data.value); else return;
						let deviceIdEscaped = sourceIframe.dataset.iqontrolDeviceId;
						let $iframe = $("[data-iQontrol-Device-ID='" + deviceIdEscaped + "'].iQontrolDeviceBackgroundIframe");
						if(!$iframe.data('allow-adjust-height')) return;
						let deviceClasses = "";
						if(!$iframe.parent('.iQontrolDeviceBackgroundIframeWrapper').hasClass('hideIfActive')) deviceClasses += " adjustHeightIfActive";
						if(!$iframe.parent('.iQontrolDeviceBackgroundIframeWrapper').hasClass('hideIfInactive')) deviceClasses += " adjustHeightIfInactive";
						if(!$iframe.parent('.iQontrolDeviceBackgroundIframeWrapper').hasClass('hideIfEnlarged') || $iframe.parent('.iQontrolDeviceBackgroundIframeWrapper').hasClass('visibleIfEnlarged')) deviceClasses += " adjustHeightIfEnlarged";
						if(value < 0) {
							$iframe.removeClass('adjustHeight').css('height', '').parent('.iQontrolDeviceBackgroundIframeWrapper').removeClass('adjustHeight').parent('.iQontrolDeviceLink').parent('.iQontrolDevice').removeClass(deviceClasses);
						} else {
							$iframe.addClass('adjustHeight').css('height', value).parent('.iQontrolDeviceBackgroundIframeWrapper').addClass('adjustHeight').parent('.iQontrolDeviceLink').parent('.iQontrolDevice').addClass(deviceClasses);
						}
						viewShuffleReshuffle(0, 100, 750, 1250, 1500, 2000, 2500, 3100);
						let maxHeight = $iframe.css('max-height').replace('px', '') || "0";
						if(maxHeight && maxHeight != null && !isNaN(maxHeight)) maxHeight = parseInt(maxHeight);
						if(maxHeight && $iframe.innerHeight() > maxHeight - 100){
							var scrollTop = $iframe.offset().top - 5;
							if(Math.abs($('html,body').scrollTop() - scrollTop) < 75) {
								console.log("adjustHeight exceeds limit - scroll to " + scrollTop);
								$('html,body').stop(true, false).animate({
									scrollTop: scrollTop
								}, 1000);
							}
						}
					}
					break;
				}
			} else {
				console.log("postMessage not allowed for this iframe");
			}
		} else if(event.data){
			console.log("postMessage received from parent: " + JSON.stringify(event.data));
			if(event.data.command) switch(event.data.command){
				case "parentBigModeEnabled":
				if(typeof event.data.value != udef){
					console.log("postMessage received: parentBigModeEnabled " + event.data.value);
					if(event.data.value) {
						$('html').addClass('bigMode'); 
						bigMode = true;
					} else {
						$('html').removeClass('bigMode'); 
						bigMode = false;
					}
					document.querySelectorAll('.iQontrolDeviceBackgroundIframe').forEach(function(iframe){
						iframe.contentWindow.postMessage({ command: "parentBigModeEnabled", value: bigMode }, "*");			
					});
					viewShuffleReshuffle(0, 1250);
				}
				break;
				
				case "updatePreview":
				console.log("postMessage received: updatePreview");
				if(configMode == "preview"){
					if(event.data.renderView) actualViewId = event.data.renderView;
					if(event.data.openDialog) openDialogId = event.data.openDialog;
					getStarted();
				}
				break;
				
				case "getPreviewConfig":
				if(typeof event.data.value != udef){
					console.log("postMessage received: getPreviewConfig " + JSON.stringify(event.data.value));
					config[namespace] = convertConfigV3(event.data.value); // #####
					createOptionsAndPanelObjectsFromConfig();
					if(event.data.getPreviewConfigCallbackId){
						let callback = getPreviewConfigCallbacks[event.data.getPreviewConfigCallbackId];
						delete getPreviewConfigCallbacks[event.data.getPreviewConfigCallbackId];
						if(typeof callback == "function") callback();
					}
				} 
				break;			}
		}
	}

	//--Special: Extend iQontrolRoles and append tileEnlarged to states of each role (then a VIRTUAL DP is created while extending the device)
	for (role in iQontrolRoles){
		iQontrolRoles[role].states.push("tileEnlarged");
	}

	//Init socket.io
	socket = io.connect(socketUrl, {
		query: {key: socketSession},
		reconnectionDelay: 500,
		reconnectionAttempts: Infinity,
		upgrade: typeof socketForceWebSockets !== 'undefined' ? !socketForceWebSockets : undefined,
		rememberUpgrade: typeof socketForceWebSockets !== 'undefined' ? socketForceWebSockets : undefined,
		transports: typeof socketForceWebSockets !== 'undefined' ? (socketForceWebSockets ? ['websocket'] : undefined) : undefined
	});
	socket.on('connect', function() {
		console.debug('[Socket] connected');
		socket.emit('name', namespace);
		//Connected -> Starting point
		if(!reconnectedShortly){
			console.log('Socket connected - getStarted');
			getStarted("triggeredByReconnection");
		} else {
			console.log('Socket connected - But it connected shortly before, so this event will be ignored');
			clearTimeout(reconnectedShortly);
			$('.loader').hide();
		}
		reconnectedShortly = setTimeout(function(){reconnectedShortly = false;}, 5000);
	});
	socket.on('reconnect', function () {
		console.debug('[Socket] reconnect');
		socket.emit('name', namespace);
		//Connected -> Starting point
		if(!reconnectedShortly){
			console.log('Socket connected - getStarted');
			getStarted("triggeredByReconnection");
		} else {
			console.log('Socket connected - But it connected shortly before, so this event will be ignored');
			clearTimeout(reconnectedShortly);
			$('.loader').hide();
		}
		reconnectedShortly = setTimeout(function(){reconnectedShortly = false;}, 5000);
	});
	socket.on('disconnect', function () {
		console.debug('[Socket] disconnected');
		$('.loader').show();
	});
	socket.on('objectChange', function (objectId, obj) {
		//console.debug('[Socket] Object Change: ' + objectId);
	});
	socket.on('stateChange', function (stateId, state) {
		//console.debug('[Socket] State Change: ' + stateId);
		setTimeout(function() {
			if(fetchedStates[stateId] && fetchedStates[stateId] != state){
				fetchedStates[stateId] = state;
				updateState(stateId);
			}
			$('.loader').hide();
			//ReturnAfterTime - check if treshold has reached
			if(returnAfterTimeTimestamp && ((new Date().getTime() - returnAfterTimeTimestamp.getTime()) / 1000) > returnAfterTimeTreshold){
				if((returnAfterTimeDestinationView == "" && actualViewId !== homeId) || (returnAfterTimeDestinationView !== "" && actualViewId !== returnAfterTimeDestinationView)) {
					console.log("Return after time - render destinationView (" + returnAfterTimeDestinationView + ")");
					returnAfterTimeTimestamp = null;
					$("#ToolbarContextMenu, #ViewDeviceContextMenu, #Dialog").popup("close");
					$('#pincode').hide(150);
					setTimeout(function(){
						renderView(returnAfterTimeDestinationView);
					}, 100);
				}
			}
		}, 0);
	});
	socket.on('reauthenticate', function () {
		console.debug('[Socket] reauthenticate');
	});
	socket.on('error', function (e) {
		console.error('[Socket] error: ' + e);
	});
	socket.on('connect_error', function (e) {
		console.error('[Socket] connect error: ' + e);
	});
	socket.on('permissionError', function (e) {
		console.error('[Socket] permission error: ' + e);
	});
});


// #####################################################################################################

function convertConfigV3(config){ // ##### must be integrated into convertConfigV3-function in admin 
	config.toolbar = convertToolbarV3(config.toolbar);
	config.views && config.views.forEach(function(view, viewIndex){
		config.views[viewIndex] = convertViewV3(view);
	});
	return config;
}

function convertToolbarV3(toolbar){ // ##### must be integrated into convertConfigV3-function in admin 
	let newToolbar = {};
	newToolbar.items = [];
	toolbar.forEach(function(item, itemIndex){
		newToolbar.items.push(convertToolbarItemV3(item));
	});
	return newToolbar;
}

function convertToolbarItemV3(item){ // ##### must be integrated into convertConfigV3-function in admin 
	var newItem = {};
	newItem.commonName = item.commonName;
	newItem.nativeLinkedView = item.nativeLinkedView;
	newItem.nativeIcon = item.nativeIcon;
	newItem.options = item.options;
	newItem.states = item.states;
	return newItem;
}

function convertViewV3(view){ // ##### must be integrated into convertConfigV3-function in admin 
	let newView = {};
	newView.commonName = view.commonName;
	newView.nativeBackgroundImage = view.nativeBackgroundImage;
	newView.nativeHideName = view.nativeHideName;
	newView.devices = [];
	view.devices && view.devices.forEach(function(device, deviceIndex){
		newView.devices[deviceIndex] = convertDeviceV3(device);
	});
	return newView;
}

function convertDeviceV3(device){ // ##### must be integrated into convertConfigV3-function in admin 
	let newDevice = {};
	newDevice.commonName = device.commonName;
	newDevice.commonRole = device.commonRole;
	newDevice.nativeBackgroundImage = device.nativeBackgroundImage;
	newDevice.nativeBackgroundImageActive = device.nativeBackgroundImageActive;
	newDevice.nativeHeading = device.nativeHeading;
	newDevice.nativeHeadingOptions = device.nativeHeadingOptions;
	newDevice.nativeLinkedView = device.nativeLinkedView;
	newDevice.nativeNewLine = device.nativeNewLine;
	newDevice.nativeHide = device.nativeHide;
	newDevice.options = device.options;
	newDevice.states = device.states;
	return newDevice;
} 

//#####################################################################################################

var updateFunctions = {};
var bindingFunctions = {};

/** Adds a collection of devices to a given HTML-Element and handles the registration and deletion of update- and binding-functions
 * @param {string} collectionId 
 * @param {string} appendHtmlToSelector 
 * @param {string} deviceIdPrefix 
 * @param {object[]} deviceList 
 * @param {function(device, deviceIndex, uiElements): UIElements} addDeviceFunction - has to return (modified) uiElements
 * @param {[function]} beforeUpdateStatesFunction 
 * @param {[UIElements]} initialUiElements
 */
function addDeviceCollection(collectionId, appendHtmlToSelector, deviceIdPrefix, deviceList, addDeviceFunction,  beforeUpdateStatesFunction, initialUiElements){
	if(beforeUpdateStatesFunction && beforeUpdateStatesFunction instanceof UIElements){
		initialUiElements = beforeUpdateStatesFunction;
		beforeUpdateStatesFunction = null;
	}
	if(initialUiElements && initialUiElements instanceof UIElements) uiElements = initialUiElements; else uiElements = new UIElements();
	unbindDeviceCollection(collectionId);
	var $appendHtmlToSelector = $(appendHtmlToSelector);
	var statesToUpdate = [];
	deviceList.forEach(function(device, deviceIndex){
		var deviceId = deviceIdPrefix + ".devices." + deviceIndex; 
		extendDevice(device, deviceId);
		Object.keys(device.deviceStates).forEach(function(deviceState){
			uiElements.updateFunctions[device.deviceStates[deviceState].stateId] = [];
			uiElements.bindingFunctions[device.deviceStates[deviceState].stateId] = [];
			if(!uiElements.statesToUpdate[device.deviceStates[deviceState].stateId]) uiElements.statesToUpdate.push(device.deviceStates[deviceState].stateId);
		})
		uiElements = addDeviceFunction(device, deviceIndex, uiElements);
	});
	if(uiElements.html) $appendHtmlToSelector.append(uiElements.html);
	if(typeof beforeUpdateStatesFunction == "function") beforeUpdateStatesFunction();
	bindDeviceCollection(collectionId, (Array.isArray(uiElements.updateFunctions) && uiElements.updateFunctions || null), (Array.isArray(uiElements.bindingFunctions) && uiElements.bindingFunctions || null));
	Array.isArray(uiElements.statesToUpdate) && uiElements.statesToUpdate.forEach(function(stateToUpdate){ updateState(stateToUpdate); });
}

/** Adds the update- and binding-functions of a collection
 * @param {string} collectionId 
 * @param {function[]} collectionUpdateFunctions 
 * @param {function[]} collectionBindingFunctions 
 */
function bindDeviceCollection(collectionId, collectionUpdateFunctions, collectionBindingFunctions){
	updateFunctions[collectionId] = collectionUpdateFunctions;
	bindingFunctions[collectionId] = collectionBindingFunctions;
}
/** Deletes the update- and binding-functions of a collection
 * @param {string} collectionId 
*/
function unbindDeviceCollection(collectionId){
	delete updateFunctions[collectionId];
	delete bindingFunctions[collectionId];
}

//#####################################################################################################

/** Extends devices with deviceId, deviceIdEscaped and deviceStates.
 * DeviceStates are generated out of the state-array by calling getDeviceStateId(), which in turn calls fetchAndSubscribeOrCreateState().
 * There are some specials like empty Widgets STATE or tileEnlarge that are taken into account.
 * Returns the extended device.
 * @param {object} device
 * @param {string} deviceId 
 * @returns {object} extended device
 */
function extendDevice(device, deviceId){ // #####
	if(device.deviceId && device.deviceId == deviceId) return device; //was already extended before
	device.deviceId = deviceId;
	device.deviceIdEscaped = escape(deviceId);
	//Get deviceStates (gets all states defined in the device and in the role, if the device has a commonRole)
	var statesToGet = [];
	device.states && device.states.forEach(function(stateObj){
		var state = stateObj.state;
		if(state && !statesToGet[state]) statesToGet.push(state);
	});
	if(device.commonRole && iQontrolRoles[device.commonRole] && typeof iQontrolRoles[device.commonRole].states != udef) iQontrolRoles[device.commonRole].states.forEach(function(state){
		if(state && !statesToGet[state]) statesToGet.push(state);
	}); 
	if(!device.deviceStates) device.deviceStates = {};
	statesToGet.forEach(function(state){ 
		if(typeof device.deviceStates[state] != "object") device.deviceStates[state] = {};
		//--Special: If the STATE of an iQontrolWidget is empty, create VIRTUAL DP
		if(device.commonRole == "iQontrolWidget" && state == "STATE" &&!(getDeviceOptionValue(device, "noVirtualState") == "true")){
			var deviceStateIndex = device.states.findIndex(function(element){ return (element.state == state);})
			if(deviceStateIndex > -1){
				if(typeof device.states[deviceStateIndex].value == udef || device.states[deviceStateIndex].value == ""){
					device.states[deviceStateIndex].value = 'VIRTUAL:boolean,switch,false';
				}	
			} else {
				device.states.push({state: 'STATE', commonRole: 'linkedState', value: 'VIRTUAL:boolean,switch,false'});
			}
		}
		//--Special: for tileEnlarge create a VIRTUAL DP
		if(state == "enlargeTile"){
			var deviceStateIndex = device.states.findIndex(function(element){ return (element.state == state);})
			if(deviceStateIndex == -1){
				device.states.push({state: 'tileEnlarged', commonRole: 'linkedState', value: 'VIRTUAL:boolean,switch,' + ((getDeviceOptionValue(device, "tileEnlargeStartEnlarged") == "true") ? "true" : "false")});
			}
		}
		device.deviceStates[state].stateId = getDeviceStateId(device, state); //While getting the device state the corresponding objects are also fetched or created
	});
	return device;
}

/** Gets the stateId of a deviceState and calls fetchAndSubscribeState() or createTemporaryState() or createVirtualState().
 * Returns null if state is not found in device.
 * Returns 'CONST:deviceId.state' if the found deviceState's role is 'const'.
 * Returns 'CALC:deviceId.state' if the found deviceState's role ist 'calc'.
 * Returns 'ARRAY:deviceId.state' if the found deviceState's role ist 'array'.
 * Returns 'VIRTUAL:deviceId.state' if the found deviceState's role is 'linkedState' and value is ' VIRTUAL:<type>,<role>,<value>'.
 * Returns stateId if the found deviceState's role is 'linkedState'
 * @param {object} device
 * @param {string} state
 * @returns {string|null} stateId or null, if state is not found
*/
function getDeviceStateId(device, state){
	var deviceStateId = device.deviceId + "." + state;
	var deviceStateIndex = device.states.findIndex(function(element){ return (element.state == state);})
	var deviceStateObject = device.states[deviceStateIndex] || {state: state};
	deviceStateObject.value = (typeof deviceStateObject.value != udef ? deviceStateObject.value : '');
	deviceStateObject.commonRole = (typeof deviceStateObject.commonRole != udef ? deviceStateObject.commonRole : '');
	var stateId = null;
	var statesToFetchAndSubscribe = [];
	if(deviceStateObject.commonRole == 'const' || deviceStateObject.commonRole == 'calc'){ //deviceState is const or calc
		stateId = deviceStateObject.commonRole.toUpperCase() + ":" + deviceStateId; //CONST: or CALC: + deviceStateId
		var variables = (deviceStateObject.value.match(/{([^}]+)}/g) || []).map(function(match){ return match.slice(1, -1); }); //check for {variables}
		variables.forEach(function(variable){
			if(!fetchedStates[variable] && !statesToFetchAndSubscribe[variable]) statesToFetchAndSubscribe.push(variable);
		});
		createTemporaryState(stateId, 'string', 'state', false, deviceStateObject.value);
	} else if(deviceStateObject.commonRole == 'array'){ //deviceState is array
		var array = tryParseJSON(deviceStateObject.value);
		if(Array.isArray(array)) array.forEach(function(element){
			stateId = "ARRAY:" + deviceStateId;
			element.value = (typeof element.value != udef ? element.value : '');
			element.commonRole = (typeof element.commonRole != udef ? element.commonRole : '');
			if(element.commonRole == 'const' || element.commonRole == 'calc'){ //array element is const or calc
				var variables = (element.value.match(/{([^}]+)}/g) || []).map(function(match){ return match.slice(1, -1); }); //check for {variables}
				variables.forEach(function(variable){
					if(!fetchedStates[variable] && !statesToFetchAndSubscribe[variable]) statesToFetchAndSubscribe.push(variable);
				});
			} else { //array element is linkedState
				if(!fetchedStates[element.value] && !statesToFetchAndSubscribe[element.value]) statesToFetchAndSubscribe.push(element.value);
			}
			createTemporaryState(stateId, 'array', 'list', false, array);
		});
	} else { //deviceState is linkedState (including when the value is 'VIRTUAL:<type>,<role>,<value>'
		if(deviceStateObject.value.substring(0, 8) == 'VIRTUAL:'){ //VIRTUAL state
			stateId = "VIRTUAL:" + deviceStateId;
			var config = (stateId.substring(8) || "").split(',');
			var type = config[0] || "boolean";
			var role = config[1] || "state";
			var value = config[2] || null;
			createTemporaryState(stateId, type, role, false, value);
		} else { //normal linkedState to fetch
			stateId = deviceStateObject.value;
			if(!fetchedStates[stateId] && !statesToFetchAndSubscribe[stateId]) statesToFetchAndSubscribe.push(stateId);
		}
	}
	fetchAndSubscribeStates(statesToFetchAndSubscribe);
	return stateId;
}

/** Creates a temporary State in fetchedObjects and fetchedStates.
 * Examples for temporary states are 'CONST:', 'ARRAY:', 'CALC:' or 'VIRTUAL:' states
 * @param {string} stateId
 * @param {string} type - type of the state object, for example "string", "boolean", "number", "array", "object" 
 * @param {string} role - role of state object, for example "value", "level" etc.
 * @param {string} tempValuesStoredInObjectId - Temporary states can write their value on changes back to ioBroker into a specified object. That is necessary for example for non bijective conversion functions like the usage of the ALTERNATIVE-COLORSPACE for lights to prevent cycling between two values
 * @param {*} value 
 * @returns {string} - temporaryStateId (for 'CONST:', 'ARRAY:', 'CALC:' or 'VIRTUAL:' it is the same as stateId, for all others (normal linkedStates) it is "TEMP:" + stateId)
 */
function createTemporaryState(stateId, type, role, tempValuesStoredInObjectId, value){
	if(tempValuesStoredInObjectId && typeof fetchedObjects[tempValuesStoredInObjectId] == udef) return null;
	var stateIdParts = stateId.split(':');
	var stateIdRole = stateIdParts.length > 1 && stateIdParts[0] || null; // 'CONST:', 'ARRAY:', 'CALC:' or 'VIRTUAL:'
	if(typeof fetchedStates[stateId] == udef) fetchedStates[stateId] = {};
	if(typeof fetchedStates[stateId].val == udef) fetchedStates[stateId].val = "";
	if(typeof fetchedStates[stateId] != udef && typeof fetchedStates[stateId].val != udef && fetchedStates[stateId].val == "") { //stateId is empty
		var temporaryStateId = (stateIdRole ? stateId : "TEMP:" + stateId); //
		fetchedStates[stateId].val = temporaryStateId;
		var tempType = (typeof type != udef && type) || "string";
		var tempRole = (typeof role != udef && role) || "state";
		var tempValue = (typeof value !== udef && value) || (fetchedObjects[tempValuesStoredInObjectId] && typeof fetchedObjects[tempValuesStoredInObjectId].native != udef && typeof fetchedObjects[tempValuesStoredInObjectId].native.iQontrolTempValues != udef && typeof fetchedObjects[tempValuesStoredInObjectId].native.iQontrolTempValues[stateId] != udef && fetchedObjects[tempValuesStoredInObjectId].native.iQontrolTempValues[stateId]) || (tempType == "level" ? 0 : (tempType == "boolean" ? false : ""));
		var tempObject = {
			"type": "state",
			"common": {
				"name": stateId.substring(stateId.lastIndexOf('.') + 1),
				"desc": "Temporary state created by iQontrol",
				"role": tempRole,
				"type": tempType,
				"icon": "",
				"read": true,
				"write": true,
				"def": ""
			},
			"native": {
				"tempValuesStoredInObjectId": tempValuesStoredInObjectId
			}
		};
		fetchedObjects[temporaryStateId] = tempObject;
		var now = new Date().getMilliseconds();
		var tempState = {
			"val": tempValue,
			"ack": false,
			"from": "iQontrol",
			"lc": now,
			"q": 0,
			"ts": now,
			"user": "system.user.admin"
		};
		fetchedStates[temporaryStateId] = tempState;
		return temporaryStateId;
	}
}

/** Fetchs the given stateId(s) from server and subscribes them, so that changes are transmitted to fetchedStates
 * @param {string|string[]} stateIds 
 * @param {function} [callback] 
 */
function fetchAndSubscribeStates(stateIds, callback){
	var _stateIds = [];
	if(Array.isArray(stateIds)) _stateIds = Object.assign([], stateIds); else _stateIds.push(stateIds);
	for(i = _stateIds.length -1; i >= 0; i--){
		if(!_stateIds[i] || fetchedStates[_stateIds[i]]) _stateIds.splice(i, 1);
		if(_stateIds[i] && !fetchedObjects[_stateIds[i]]) fetchObject(_stateIds[i]);
	}
	if(_stateIds.length > 0){
		console.debug("[Socket] & subscribe & getStates " + _stateIds);
		socket.emit('subscribe', _stateIds);
		socket.emit('getStates', _stateIds, function (err, _states) {
			if(_states){
				fetchedStates = Object.assign(_states, fetchedStates);
				Object.keys(_states).forEach(function(_stateId){
					if(fetchedObjects[_stateId]) updateState(_stateId);
				});
			}
			if(callback) callback(err);
		});
	} else {
		if(callback) callback();
	}
}


//#####################################################################################################

function newRenderView(viewId){
	if(!viewId){ viewId = homeId; console.log("Set viewId to homeId: " + viewId); }
	if(!viewId) return;
	fetchView(viewId, function(view){

		$('body').append('<div id="newViewContainer"></div>');
		//xxxxx add pre-work here

		addDeviceCollection('view', '#newViewContainer', viewId, view.devices, function(device){
			//xxxxx define, how device is added here

		});

		//xxxxx add post-work here

	});
}


function renderToolbar(){
	var toolbarItems = getObjectValue(config, namespace + ".toolbar.items", [], true, true);
	if(toolbarItems.length == 0){
		if(homeId == '') homeId = getObjectValue(config, namespace + ".views.0.commonName", "", true, true);
		return;
	}
	if(getUrlParameter('home')) config[namespace].toolbar.items[0].nativeLinkedView = getUrlParameter('home');
	if(homeId == '') homeId = addNamespaceToViewId(toolbarItems[0].nativeLinkedView);
	if(getUrlParameter('noToolbar')) return;
	removeCustomCSS("toolbarCustomIcons");
	toolbarLinksToOtherViews = [];
	$("#ToolbarContent").html("<div data-role='navbar' data-iconpos='" + (typeof options.LayoutToolbarIconPosition != udef && options.LayoutToolbarIconPosition !== "" ? options.LayoutToolbarIconPosition : 'top') +  "' id='iQontrolToolbar'><ul>");
	addDeviceCollection('toolbar', '#iQontrolToolbar ul', namespace + ".toolbar.items", toolbarItems, function(toolbarItem, toolbarIndex, uiElements){
		var linkedViewId = addNamespaceToViewId(toolbarItem.nativeLinkedView);
		toolbarLinksToOtherViews.push(linkedViewId);
		var toolbarItemContent = "<li><a data-icon='" + (toolbarItem.nativeIcon ? (toolbarItem.nativeIcon.indexOf('.') == -1 ? toolbarItem.nativeIcon : "grid") : "") + "' data-index='" + toolbarIndex + "' onclick='if(!toolbarContextMenuIgnoreClick){ toolbarContextMenuEnd(); viewHistory = toolbarLinksToOtherViews; viewHistoryPosition = " + toolbarIndex + ";renderView(unescape(\"" + escape(linkedViewId) + "\"));}' class='iQontrolToolbarLink ui-nodisc-icon " + (typeof options.LayoutToolbarIconColor != udef && options.LayoutToolbarIconColor == 'black' ? 'ui-alt-icon' : '') + "' data-theme='b' id='iQontrolToolbarLink_" + toolbarIndex + "'>" + toolbarItem.commonName;
		if(toolbarItem.nativeIcon && toolbarItem.nativeIcon.indexOf('.') > -1){ //Custom icon
			customCSS = ".iQontrolToolbarLink[data-index='" + toolbarIndex + "']:after {";
			customCSS += "	background:url('" + toolbarItem.nativeIcon + "');";
			customCSS += "	background-size:" + (options.LayoutToolbarIconSize ? options.LayoutToolbarIconSize + "px;" : "cover;");
			customCSS += "	background-position:center;";
			customCSS += "	background-repeat:no-repeat;";
			customCSS += "}";
			addCustomCSS(customCSS, "toolbarCustomIcons");
		}
		uiElements
			.addHtml(toolbarItemContent)
			.addBadge(toolbarItem, {
				badgeDeviceState: "BADGE",
				badgeColorDeviceState: "BADGE_COLOR",
				class: "iQontrolToolbarBadge"
			})
			.addHtml("</a></li>");
		//Create toolbarContextMenu
		toolbarContextMenu[toolbarIndex] = {};
		toolbarContextMenuLinksToOtherViews[toolbarIndex] = [];
		(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
			var _toolbarIndex = toolbarIndex;
			var _linkedViewId = linkedViewId;
			fetchView(_linkedViewId, function(view){
				if(view && typeof view.devices != udef) for (var deviceIndex = 0; deviceIndex < view.devices.length; deviceIndex++){ //Go through all devices on nativeLinkedView of the toolbar
					if(typeof view.devices[deviceIndex].nativeLinkedView != udef && view.devices[deviceIndex].nativeLinkedView != null && view.devices[deviceIndex].nativeLinkedView !== "" && !view.devices[deviceIndex].nativeHide){ //Link to other view
						var deviceLinkedViewId = addNamespaceToViewId(view.devices[deviceIndex].nativeLinkedView);
						if(deviceLinkedViewId && typeof getViewIndex(deviceLinkedViewId) !== udef && typeof config[namespace].views[getViewIndex(deviceLinkedViewId)] !== udef) {
							var deviceLinkedViewName = config[namespace].views[getViewIndex(deviceLinkedViewId)].commonName;
							toolbarContextMenu[toolbarIndex][deviceLinkedViewId] = {name: _("Open %s", deviceLinkedViewName), icon:'grid', href: '', target: '', onclick: '$("#ToolbarContextMenu").popup("close"); renderView(unescape("' + escape(deviceLinkedViewId) + '")); viewHistory = toolbarContextMenuLinksToOtherViews[' + toolbarIndex + ']; viewHistoryPosition = ' + toolbarContextMenuLinksToOtherViews[toolbarIndex].length + '; $(".iQontrolToolbarLink").removeClass("ui-btn-active"); $("#iQontrolToolbarLink_' + toolbarIndex + '").addClass("ui-btn-active");'};
							toolbarContextMenuLinksToOtherViews[toolbarIndex].push(deviceLinkedViewId);
						}
					}
				};
			});
		})(); //<--End Closure
		return uiElements;
	}, function(){
		$("#ToolbarContent").enhanceWithin();
		if(options.LayoutToolbarSingleLine) {
			customCSS = "#Toolbar li {";
			customCSS += "	width: calc(100% / " + toolbarItems.length + ") !important;";
			customCSS += "	clear: none !important;";
			customCSS += "}";
			customCSS += "#Toolbar li a {";
			customCSS += "	border-top-width: 1px !important;";
			customCSS += "}";
			removeCustomCSS("toolbarSingleLine");
			addCustomCSS(customCSS, "toolbarSingleLine");
		};
	});
	applyToolbarContextMenu();
	applyToolbarAdaptHeightOrMarqueeObserver();
}



//#####################################################################################################


/**
 * @typedef {object} UIElements
 * @property {string} html
 * @property {function[]} updateFunctions
 * @property {function[]} bindingFunctions
 * @property {string[]} statesToUpdate
 */
/** Class of UI-Elements to add to deviceCollections 
 * @class
 * @param {UIElements} [initialUiElements]
 */
function UIElements(initialUiElements) {
	if(typeof initialUiElements != "object") initialUiElements = {};
	this.html = initialUiElements.html || "";
	this.updateFunctions = initialUiElements.updateFunctions || [];
	this.bindingFunctions = initialUiElements.bindingFunctions || [];
	this.statesToUpdate = initialUiElements.statesToUpdate || [];

	/** Adds given HTML-Code to uiElements
	 * @param {*} html 
	 * @returns {UIElements} 
	 */
	this.addHtml = function(html){
		this.html += html;
		return this;
	}

	/** Adds a Badge to uiElements
	 * @param {object} device 
	 * @param {object} badgeOptions 
	 * @param {string} badgeOptions.badgeDeviceStateId
	 * @param {string} badgeOptions.badgeColorDeviceStateId 
	 * @param {string} badgeOptions.class
	 * @returns {UIElements}  
	 */
	this.addBadge = function(device, badgeOptions){
		if(typeof badgeOptions != "object") badgeOptions = {};
		var badgeDeviceStateId = badgeOptions.badgeDeviceStateId || "BADGE";
		var badgeColorDeviceStateId = badgeOptions.badgeDeviceStateId || "BADGE_COLOR";
		var badgeColorDeviceStateId = badgeOptions.badgeDeviceStateId || "BADGE_COLOR";
		var badgeClass = badgeOptions.class || "iQontrolDeviceBadge";
//		(function(){ //Closure--> (everything declared inside keeps its value as ist is at the time the function is created)
		var deviceStateBadge = getObjectValue(device, "deviceStates." + badgeDeviceStateId + ".stateId");
		var deviceStateBadgeColor = getObjectValue(device, "deviceStates." + badgeColorDeviceStateId + ".stateId");
		if(!deviceStateBadge) return this;
		this.html += "<div class='" + badgeClass + "' data-iQontrol-Device-ID='" + device.deviceIdEscaped +"'></div>";
		var updateFunction = function(){
			var stateBadge = getStateObject(deviceStateBadge);
			var stateBadgeColor = getStateObject(deviceStateBadgeColor);
			var badgeWithoutUnit = (getDeviceOptionValue(device, "badgeWithoutUnit") == "true");
			var showBadgeIfZero = (getDeviceOptionValue(device, "showBadgeIfZero") == "true");
			var colorString = stateBadgeColor && isValidColorString(stateBadgeColor.val) && stateBadgeColor.val || "rgba(255,0,0,0.8)";
			var restartActivateDelay = false;
			if($("[data-iQontrol-Device-ID='" + device.deviceIdEscaped + "']." + badgeClass).data('background-color-string') != colorString){ //New color
				console.log("Badge - new color (" + colorString + ") - restartActivateDelay");
				restartActivateDelay = true;
				$("[data-iQontrol-Device-ID='" + device.deviceIdEscaped + "']." + badgeClass).css('background-color', colorString).data('background-color-string', colorString);
			}
			if(stateBadge && typeof stateBadge.val !== udef && (showBadgeIfZero || stateBadge.val) && stateBadge.plainText !== ""){ //Active
				var val = stateBadge.plainText;
				var unit = stateBadge.unit;
				if(!isNaN(val)) val = Math.round(val * 10) / 10;
				if(!badgeWithoutUnit && stateBadge.plainText == stateBadge.val) val = val + unit;
				if($("[data-iQontrol-Device-ID='" + device.deviceIdEscaped + "']." + badgeClass).data('val') != val){ //New val
					$("[data-iQontrol-Device-ID='" + device.deviceIdEscaped + "']." + badgeClass).html(val).data('val', val);
				}
				if(!$("[data-iQontrol-Device-ID='" + device.deviceIdEscaped + "']." + badgeClass).hasClass('active')){ //Not active until now
					if(restartActivateDelay || $("[data-iQontrol-Device-ID='" + device.deviceIdEscaped + "']." + badgeClass).data('activate-delay-timeout') != "over"){ //ActivateDelay is not over
						console.log("Badge - new active - restartActivateDelay");
						restartActivateDelay = true;
					} else { //ActivateDelay is over
						console.log("Badge - new active - activateDelayTimeout is over - activate now");
						$("[data-iQontrol-Device-ID='" + device.deviceIdEscaped + "']." + badgeClass).addClass('active');
						stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + device.deviceIdEscaped + "'].iQontrolDeviceState"));
					}
				}
			} else { //Inactive
				$("[data-iQontrol-Device-ID='" + device.deviceIdEscaped + "']." + badgeClass).removeClass('active');
				stateFillsDeviceCheckForIconToFloat($("[data-iQontrol-Device-ID='" + device.deviceIdEscaped + "'].iQontrolDeviceState"));
				if(!restartActivateDelay){
					clearTimeout($("[data-iQontrol-Device-ID='" + device.deviceIdEscaped + "']." + badgeClass).data('activate-delay-timeout'));
					$("[data-iQontrol-Device-ID='" + device.deviceIdEscaped + "']." + badgeClass).data('activate-delay-timeout', null);
				}
			}
			if(restartActivateDelay){
				clearTimeout($("[data-iQontrol-Device-ID='" + device.deviceIdEscaped + "']." + badgeClass).data('activate-delay-timeout'));
				$("[data-iQontrol-Device-ID='" + device.deviceIdEscaped + "']." + badgeClass).data('activate-delay-timeout', setTimeout(function(){
					console.log("Badge - activateDelay-Timeout is over - recall updateFunction");
					$("[data-iQontrol-Device-ID='" + device.deviceIdEscaped + "']." + badgeClass).data('activate-delay-timeout', 'over');
					updateFunction();
				}, 500));
			}
		};
		this.updateFunctions[deviceStateBadge].push(updateFunction);
		if(deviceStateBadgeColor) this.updateFunctions[deviceStateBadgeColor].push(updateFunction);
//		})(); //<--End Closure
		return this;
	};
}
