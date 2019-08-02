sap.ui.define([
	// "sap/ui/core/mvc/Controller",
	"UI5_course/controller/BaseController",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (BaseController, MessageToast, JSONModel) {
	"use strict";

	return BaseController.extend("UI5_course.controller.App", {
		onInit: function () {
			// this.getView().setModel(new JSONModel({
			// 		features: [
			// 			"Enterprise-Ready Web Toolkit",
			// 			"Powerful Development Concepts",
			// 			"Feature-Rich UI Controls",
			// 			"Consistent User Experience",
			// 			"Free and Open Source",
			// 			"Responsive Across Browsers and Devices"
			// 		]
			// 	})
			// );
			var dataObject = {
				Author: "",
				Name: "",
				Review: ""
			};
			var oModel = new JSONModel();
			oModel.setData(dataObject);
			// sap.ui.getCore().setModel(oModel);
			this.getView().setModel(oModel);
		},
		onSend: function () {
			// var oModel = sap.ui.getCore().getModel();
			var oModel = this.getView().getModel();
			var oProperty = oModel.getProperty("/");
			//  MessageToast.show(JSON.stringify(oProperty));		
			sendFormData(oModel);
		},
		onNavTo: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (oEvent.getParameter("id").includes("bnTask1")) {
				oRouter.navTo("task1");	
			}else if (oEvent.getParameter("id").includes("bnTask2")) {
				oRouter.navTo("task2");	
			}else if (oEvent.getParameter("id").includes("bnTask3")) {
				oRouter.navTo("task3");	
			// }else if (oEvent.getParameter("id").includes("bnBack")) {
			// 	oRouter.navTo("overview");					
			}
			// if (oEvent.getParameter("class").includes("nav_back")){
			// 	this.byId("App").to(this.byId("pgOverview"));
			// }
		}
	});
	function sendFormData(oModel) {
		MessageToast.show(oModel.getJSON());
		let XHR = new XMLHttpRequest();

		// Define what happens on successful data submission
		XHR.addEventListener('load', function (event) {
			MessageToast.show('Yeah! Data sent and response loaded.');
		});

		// Define what happens in case of error
		XHR.addEventListener('error', function (event) {
			MessageToast.show('Oops! Something went wrong.');
		});

		// Set up our request
		XHR.open('POST', 'http://jkorpela.fi/cgi-bin/echo.cgi');

		XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		XHR.send(oModel.getJSON());
	}
});
