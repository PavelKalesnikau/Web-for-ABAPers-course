sap.ui.define([
  "UI5_course/controller/BaseController",
  "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
  "use strict";

  return BaseController.extend("UI5_course.controller.Task3", {
    onInit: function () {
      // set data model on view !!!!!!!!!! DOESN'T WORK BECAUSE OF CORS POLITICS
      //   var oModel = new sap.ui.model.odata.v2.ODataModel("http://services.odata.org/Northwind/Northwind.svc/", "dbs1");
      //   this.getView().setModel(oModel);

      // use JSON instead
      var oModel = new JSONModel("./model/customers.json");
      oModel.setDefaultBindingMode("OneWay");        
      this.getView().setModel(oModel, "Customers");
      // sap.ui.getCore().setModel(oModel, "Customers");
    },
    onNavigate: function (evt) {
      switch (evt.getParameter("key")) {
        case "key1":
          this.getView().byId("idShellView").setContent(sap.ui.xmlview("UI5_course.view.Customers"));
          break;
        case "key2":
          this.getView().byId("idShellView").setContent(sap.ui.xmlview("UI5_course.view.Suppliers"));
          break;
        default:
          this.getView().byId("idShellView").setContent(sap.ui.xmlview("UI5_course.view.OtbDlv"));
      }
    }
  });
});
