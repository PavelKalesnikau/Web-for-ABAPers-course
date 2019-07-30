sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("UI5_course.App", {
		onSend: function () {
			// var oModel = sap.ui.getCore().getModel();
			var oModel = this.getView().getModel();
			var oProperty = oModel.getProperty("/");
			//  MessageToast.show(JSON.stringify(oProperty));		
			sendFormData(oModel);
		},
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
		onNavTo: function (oEvent) {
			if (oEvent.getParameter("id").includes("bnTask1")) {
				this.byId("App").to(this.byId("pgTask1"));
			}else if (oEvent.getParameter("id").includes("bnTask2")) {
				this.byId("App").to(this.byId("pgTask2"));
			}else if (oEvent.getParameter("id").includes("bnTask3")) {
				this.byId("App").to(this.byId("pgTask3"));
			}else if (oEvent.getParameter("id").includes("bnBack")) {
				this.byId("App").to(this.byId("pgOverview"));				
			}
			// if (oEvent.getParameter("class").includes("nav_back")){
			// 	this.byId("App").to(this.byId("pgOverview"));
			// }
		},
		onNavigate: function (evt) {
		  switch (evt.getParameter("key")) {
			case "key1":
			  this.getView().byId("idShellView").setContent(sap.ui.xmlview("UI5_course.Customers"));
			  break;
			case "key2":
			  this.getView().byId("idShellView").setContent(sap.ui.xmlview("UI5_course.Suppliers"));
			  break;
			default:
			  this.getView().byId("idShellView").setContent(sap.ui.xmlview("UI5_course.Customers"));
		  }
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
