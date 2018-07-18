import { Component, OnInit } from '@angular/core';

var available_printers = null;
var selected_category = null;
var default_printer = null;
var selected_printer = null;
var format_start = "^XA^LL200^FO80,50^A0N36,36^FD";
var format_end = "^FS^XZ";
var default_mode = true;

declare var jQuery:any;
declare var $:any;
declare var BrowserPrint:any;

function setup_web_print()
{
  $('#printer_select').on('change', onPrinterSelected);
  showLoading("Loading Printer Information...");
  default_mode = true;
  selected_printer = null;
  available_printers = null;
  selected_category = null;
  default_printer = null;

  BrowserPrint.getDefaultDevice('printer', function(printer)
  {
    default_printer = printer
    if((printer != null) && (printer.connection != undefined))
    {
      selected_printer = printer;
      var printer_details = $('#printer_details');
      var selected_printer_div = $('#selected_printer');

      selected_printer_div.text("Using Default Printer: " + printer.name);
      hideLoading();
      printer_details.show();
      $('#print_form').show();

    }
    BrowserPrint.getLocalDevices(function(printers)
      {
        available_printers = printers;
        var sel = document.getElementById("printers");
        var printers_available = false;
        sel.innerHTML = "";
        if (printers != undefined)
        {
          for(var i = 0; i < printers.length; i++)
          {
            if (printers[i].connection == 'usb')
            {
              var opt = document.createElement("option");
              opt.innerHTML = printers[i].connection + ": " + printers[i].uid;
              opt.value = printers[i].uid;
              sel.appendChild(opt);
              printers_available = true;
            }
          }
        }

        if(!printers_available)
        {
          showErrorMessage("No Zebra Printers could be found!");
          hideLoading();
          $('#print_form').hide();
          return;
        }
        else if(selected_printer == null)
        {
          default_mode = false;
          changePrinter();
          $('#print_form').show();
          hideLoading();
        }
      }, undefined, 'printer');
  },
  function(error_response)
  {
    showBrowserPrintNotFound();
  });
};
function showBrowserPrintNotFound()
{
  showErrorMessage("An error occured while attempting to connect to your Zebra Printer. You may not have Zebra Browser Print installed, or it may not be running. Install Zebra Browser Print, or start the Zebra Browser Print Service, and try again.");

};
function sendData()
{
  showLoading("Printing...");
  checkPrinterStatus( function (text){
    if (text == "Ready to Print")
    {

      var zpl="^XA^CF,0,0,0^PR12^MD30^PW800^POI^CI13^LH0,20\n^FO12,301^GB753,2,2^FS\n^FO12,567^GB777,2,2^FS\n^FO464,170^GB2,129,2^FS\n^FO32,172^AdN,0,0^FWN^FH^FDORIGIN ID:LOMA ^FS\n^FO224,172^AdN,0,0^FWN^FH^FD36755558^FS\n^FO32,190^AdN,0,0^FWN^FH^FDDANIEL LOPEZ^FS\n^FO32,208^AdN,0,0^FWN^FH^FD^FS\n^FO32,226^AdN,0,0^FWN^FH^FDANDADOR VALERIO PRIETO 591 COL MIRA^FS\n^FO32,244^AdN,0,0^FWN^FH^FD^FS\n^FO32,262^AdN,0,0^FWN^FH^FDGUADALAJARA, JA 45590^FS\n^FO32,280^AdN,0,0^FWN^FH^FDMEXICO MX^FS\n^FO478,208^AdN,0,0^FWN^FH^FDCAD: 112926237/WSXI3300^FS\n^FO28,909^A0N,24,24^FWN^FH^FDTRK#^FS\n^FO28,967^A0N,27,32^FWN^FH^FD^FS\n^FO136,879^A0N,27,36^FWN^FH^FD^FS\n^FO15,313^A0N,21,21^FWN^FH^FDTO^FS\n^FO60,311^A0N,38,38^FWN^FH^FDLUKA MODRIC^FS\n^FO60,353^A0N,38,38^FWN^FH^FD^FS\n^FO60,395^A0N,38,38^FWN^FH^FDPLAN DE SAN LUIS 3465 COL EL PALOMO^FS\n^FO60,437^A0N,38,38^FWN^FH^FD^FS\n^FO60,479^A0N,43,40^FWN^FH^FDSAN PEDRO TLAQUEPAQU JA 45580^FS\n^FO35,521^A0N,21,21^FWN^FH^FD31456879^FS\n^FO677,673^GB104,10,10^FS\n^FO677,683^GB10,112,10^FS\n^FO771,683^GB10,112,10^FS\n^FO677,795^GB104,10,10^FS\n^FO652,611^A0N,43,58^FWN^FH^FDFedEx^FS\n^FO708,650^A0N,19,26^FWN^FH^FDExpress^FS\n^FO697,691^A0N,128,137^FWN^FH^FDE^FS\n^FO21,575^BY2,2^B7N,10,5,14^FH^FWN^FH^FD[)>_1E01_1D0245580_1D484_1D20_1D7818258222440455_1DFDE_1D873385448_1D193_1D_1D1/1_1D3.00KG_1DN_1DPLAN DE SAN LUIS 3465 Col El Palomo_1DSan Pedro Tlaquepaque_1D  _1DLuka Modric_1E06_1D10ZXI001_1D12Z31456879_1D15Z112926237_1D20Z_1C_1D31Z1013486121941137761600781825822244_1D32Z02_1D39ZLOMA_1D_1E09_1DFDX_1Dz_1D8_1D(%_13_12;7_7F@_1E_04^FS\n^FO478,262^AdN,0,0^FWN^FH^FDBILL SENDER^FS\n^FO12,856^GB777,2,2^FS\n^FO494,1052^A0N,43,43^FWN^FH^FD^FS\n^FO791,282^AbN,11,7^FWB^FH^FD552J2/8532/DCA5^FS\n^FO95,913^A0N,53,40^FWN^FH^FD7818 2582 2244^FS\n^FO409,862^A0N,51,38^FWN^FH^FB390,,,R,^FD                 AM^FS\n^FO309,914^A0N,51,38^FWN^FH^FB490,,,R,^FD            ECONOMY^FS\n^FO413,966^A0N,40,40^FWN^FH^FB386,,,R,^FD                ^FS\n^FO495,1008^A0N,44,44^FWN^FH^FB298,,,R,^FD     45580^FS\n^FO574,1068^A0N,24,24^FWN^FH^FB120,,,R,^FD   -MX^FS\n^FO695,1052^A0N,43,43^FWN^FH^FB100,,,R,^FDGDL^FS\n^FO39,1094^A0N,27,32^FWN^FH^FD^FS\n^FO75,1155^BY3,2^BCN,200,N,N,N,N^FWN^FD>;1013486121941137761600781825822244^FS\n^FO28,1004^A0N,107,96^FWN^FH^FD8Z LOMA ^FS\n^FO790,675^A0N,13,18^FWB^FH^FDJ181118012601uv^FS\n^FO478,172^AdN,0,0^FWN^FH^FDSHIP DATE: 12JUL18^FS\n^FO478,190^AdN,0,0^FWN^FH^FDACTWGT: 3.00 KG^FS\n^FO478,226^AdN,0,0^FWN^FH^FDDIMS: 30x30x30 CM^FS\n^FO708,482^A0N,35,45^FWN^FH^FD(MX)^FS\n^FO328,526^AbN,11,7^FWN^FH^FDREF: ^FS\n^FO38,540^AbN,11,7^FWN^FH^FDINV: ^FS\n^FO38,554^AbN,11,7^FWN^FH^FDPO: ^FS\n^FO428,554^AbN,11,7^FWN^FH^FDDEPT: ^FS\n^FO25,930^GB58,1,1^FS\n^FO25,930^GB1,26,1^FS\n^FO83,930^GB1,26,1^FS\n^FO25,956^GB58,1,1^FS\n^FO31,936^AdN,0,0^FWN^FH^FD0455^FS\n^PQ1\n^XZ\n"


        selected_printer.send(zpl, printComplete, printerError);

    }
    else
    {
      printerError(text);
    }
  });
};
function checkPrinterStatus(finishedFunction)
{
  selected_printer.sendThenRead("~HQES",
        function(text){
            var that = this;
            var statuses = new Array();
            var ok = false;
            var is_error = text.charAt(70);
            var media = text.charAt(88);
            var head = text.charAt(87);
            var pause = text.charAt(84);
            // check each flag that prevents printing
            if (is_error == '0')
            {
              ok = true;
              statuses.push("Ready to Print");
            }
            if (media == '1')
              statuses.push("Paper out");
            if (media == '2')
              statuses.push("Ribbon Out");
            if (media == '4')
              statuses.push("Media Door Open");
            if (media == '8')
              statuses.push("Cutter Fault");
            if (head == '1')
              statuses.push("Printhead Overheating");
            if (head == '2')
              statuses.push("Motor Overheating");
            if (head == '4')
              statuses.push("Printhead Fault");
            if (head == '8')
              statuses.push("Incorrect Printhead");
            if (pause == '1')
              statuses.push("Printer Paused");
            if ((!ok) && (statuses.length == 0))
              statuses.push("Error: Unknown Error");
            finishedFunction(statuses.join());
      }, printerError);
};
function hidePrintForm()
{
  $('#print_form').hide();
};
function showPrintForm()
{
  $('#print_form').show();
};
function showLoading(text)
{
  $('#loading_message').text(text);
  $('#printer_data_loading').show();
  hidePrintForm();
  $('#printer_details').hide();
  $('#printer_select').hide();
};
function printComplete()
{
  hideLoading();
  alert ("Printing complete");
}
function hideLoading()
{
  $('#printer_data_loading').hide();
  if(default_mode == true)
  {
    showPrintForm();
    $('#printer_details').show();
  }
  else
  {
    $('#printer_select').show();
    showPrintForm();
  }
};
function changePrinter()
{
  default_mode = false;
  selected_printer = null;
  $('#printer_details').hide();
  if(available_printers == null)
  {
    showLoading("Finding Printers...");
    $('#print_form').hide();
    setTimeout(changePrinter, 200);
    return;
  }
  $('#printer_select').show();
  onPrinterSelected();

}
function onPrinterSelected()
{
  selected_printer = available_printers[$('#printers')[0].selectedIndex];
}
function showErrorMessage(text)
{
  $('#main').hide();
  $('#error_div').show();
  $('#error_message').html(text);
}
function printerError(text)
{
  showErrorMessage("An error occurred while printing. Please try again." + text);
}
function trySetupAgain()
{
  $('#main').show();
  $('#error_div').hide();
  setup_web_print();
  //hideLoading();
}

@Component({
  selector: 'app-print-label',
  templateUrl: './print-label.component.html',
  styleUrls: ['./print-label.component.css']
})

export class PrintLabelComponent implements OnInit {

  constructor() {
    $(document).ready(setup_web_print);
  }

  ngOnInit() {

  }

  sendData()
  {
    showLoading("Printing...");
    checkPrinterStatus( function (text){
      if (text == "Ready to Print")
      {

        var zpl="^XA^CF,0,0,0^PR12^MD30^PW800^POI^CI13^LH0,20\n^FO12,301^GB753,2,2^FS\n^FO12,567^GB777,2,2^FS\n^FO464,170^GB2,129,2^FS\n^FO32,172^AdN,0,0^FWN^FH^FDORIGIN ID:LOMA ^FS\n^FO224,172^AdN,0,0^FWN^FH^FD36755558^FS\n^FO32,190^AdN,0,0^FWN^FH^FDDANIEL LOPEZ^FS\n^FO32,208^AdN,0,0^FWN^FH^FD^FS\n^FO32,226^AdN,0,0^FWN^FH^FDANDADOR VALERIO PRIETO 591 COL MIRA^FS\n^FO32,244^AdN,0,0^FWN^FH^FD^FS\n^FO32,262^AdN,0,0^FWN^FH^FDGUADALAJARA, JA 45590^FS\n^FO32,280^AdN,0,0^FWN^FH^FDMEXICO MX^FS\n^FO478,208^AdN,0,0^FWN^FH^FDCAD: 112926237/WSXI3300^FS\n^FO28,909^A0N,24,24^FWN^FH^FDTRK#^FS\n^FO28,967^A0N,27,32^FWN^FH^FD^FS\n^FO136,879^A0N,27,36^FWN^FH^FD^FS\n^FO15,313^A0N,21,21^FWN^FH^FDTO^FS\n^FO60,311^A0N,38,38^FWN^FH^FDLUKA MODRIC^FS\n^FO60,353^A0N,38,38^FWN^FH^FD^FS\n^FO60,395^A0N,38,38^FWN^FH^FDPLAN DE SAN LUIS 3465 COL EL PALOMO^FS\n^FO60,437^A0N,38,38^FWN^FH^FD^FS\n^FO60,479^A0N,43,40^FWN^FH^FDSAN PEDRO TLAQUEPAQU JA 45580^FS\n^FO35,521^A0N,21,21^FWN^FH^FD31456879^FS\n^FO677,673^GB104,10,10^FS\n^FO677,683^GB10,112,10^FS\n^FO771,683^GB10,112,10^FS\n^FO677,795^GB104,10,10^FS\n^FO652,611^A0N,43,58^FWN^FH^FDFedEx^FS\n^FO708,650^A0N,19,26^FWN^FH^FDExpress^FS\n^FO697,691^A0N,128,137^FWN^FH^FDE^FS\n^FO21,575^BY2,2^B7N,10,5,14^FH^FWN^FH^FD[)>_1E01_1D0245580_1D484_1D20_1D7818258222440455_1DFDE_1D873385448_1D193_1D_1D1/1_1D3.00KG_1DN_1DPLAN DE SAN LUIS 3465 Col El Palomo_1DSan Pedro Tlaquepaque_1D  _1DLuka Modric_1E06_1D10ZXI001_1D12Z31456879_1D15Z112926237_1D20Z_1C_1D31Z1013486121941137761600781825822244_1D32Z02_1D39ZLOMA_1D_1E09_1DFDX_1Dz_1D8_1D(%_13_12;7_7F@_1E_04^FS\n^FO478,262^AdN,0,0^FWN^FH^FDBILL SENDER^FS\n^FO12,856^GB777,2,2^FS\n^FO494,1052^A0N,43,43^FWN^FH^FD^FS\n^FO791,282^AbN,11,7^FWB^FH^FD552J2/8532/DCA5^FS\n^FO95,913^A0N,53,40^FWN^FH^FD7818 2582 2244^FS\n^FO409,862^A0N,51,38^FWN^FH^FB390,,,R,^FD                 AM^FS\n^FO309,914^A0N,51,38^FWN^FH^FB490,,,R,^FD            ECONOMY^FS\n^FO413,966^A0N,40,40^FWN^FH^FB386,,,R,^FD                ^FS\n^FO495,1008^A0N,44,44^FWN^FH^FB298,,,R,^FD     45580^FS\n^FO574,1068^A0N,24,24^FWN^FH^FB120,,,R,^FD   -MX^FS\n^FO695,1052^A0N,43,43^FWN^FH^FB100,,,R,^FDGDL^FS\n^FO39,1094^A0N,27,32^FWN^FH^FD^FS\n^FO75,1155^BY3,2^BCN,200,N,N,N,N^FWN^FD>;1013486121941137761600781825822244^FS\n^FO28,1004^A0N,107,96^FWN^FH^FD8Z LOMA ^FS\n^FO790,675^A0N,13,18^FWB^FH^FDJ181118012601uv^FS\n^FO478,172^AdN,0,0^FWN^FH^FDSHIP DATE: 12JUL18^FS\n^FO478,190^AdN,0,0^FWN^FH^FDACTWGT: 3.00 KG^FS\n^FO478,226^AdN,0,0^FWN^FH^FDDIMS: 30x30x30 CM^FS\n^FO708,482^A0N,35,45^FWN^FH^FD(MX)^FS\n^FO328,526^AbN,11,7^FWN^FH^FDREF: ^FS\n^FO38,540^AbN,11,7^FWN^FH^FDINV: ^FS\n^FO38,554^AbN,11,7^FWN^FH^FDPO: ^FS\n^FO428,554^AbN,11,7^FWN^FH^FDDEPT: ^FS\n^FO25,930^GB58,1,1^FS\n^FO25,930^GB1,26,1^FS\n^FO83,930^GB1,26,1^FS\n^FO25,956^GB58,1,1^FS\n^FO31,936^AdN,0,0^FWN^FH^FD0455^FS\n^PQ1\n^XZ\n"

        selected_printer.send(zpl, printComplete, printerError);

      }
      else
      {
        printerError(text);
      }
    });
  };


}
