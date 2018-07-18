
var BrowserPrint = function() {
    function e(e) {
        return s + e
    }

    function n(e, n) {
        var i = new XMLHttpRequest;
        return "withCredentials" in i ? i.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (i = new XDomainRequest, i.open(e, n)) : i = null, i
    }

    function i(e, n, i, t) {
        return void 0 != e && (void 0 == i && (i = e.sendFinishedCallback), void 0 == t && (t = e.sendErrorCallback)), n.onreadystatechange = function() {
            n.readyState === XMLHttpRequest.DONE && 200 === n.status ? i(n.responseText) : n.readyState === XMLHttpRequest.DONE && t(n.responseText)
        }, n
    }
    var t = {},
        r = 2,
        s = "http://localhost:9100/";
    return "https:" === location.protocol && (s = "https://localhost:9101/"), t.Device = function(t) {
        var s = this;
        this.name = t.name, this.deviceType = t.deviceType, this.connection = t.connection, this.uid = t.uid, this.version = r, this.provider = t.provider, this.manufacturer = t.manufacturer, this.sendErrorCallback = function(e) {}, this.sendFinishedCallback = function(e) {}, this.send = function(t, r, o) {
            var a = n("POST", e("write"));
            if (a) {
                i(s, a, r, o);
                var c = {
                    device: {
                        name: this.name,
                        uid: this.uid,
                        connection: this.connection,
                        deviceType: this.deviceType,
                        version: this.version,
                        provider: this.provider,
                        manufacturer: this.manufacturer
                    },
                    data: t
                };
                a.send(JSON.stringify(c))
            }
        }, this.sendUrl = function(t, r, o) {
            var a = n("POST", e("write"));
            if (a) {
                i(s, a, r, o);
                var c = {
                    device: {
                        name: this.name,
                        uid: this.uid,
                        connection: this.connection,
                        deviceType: this.deviceType,
                        version: this.version,
                        provider: this.provider,
                        manufacturer: this.manufacturer
                    },
                    url: t
                };
                a.send(JSON.stringify(c))
            }
        }, this.readErrorCallback = function(e) {}, this.readFinishedCallback = function(e) {}, this.read = function(t, r) {
            var o = n("POST", e("read"));
            if (o) {
                i(s, o, t, r);
                var a = {
                    device: {
                        name: this.name,
                        uid: this.uid,
                        connection: this.connection,
                        deviceType: this.deviceType,
                        version: this.version,
                        provider: this.provider,
                        manufacturer: this.manufacturer
                    }
                };
                o.send(JSON.stringify(a))
            }
        }, this.sendThenRead = function(e, n, i) {
            this.send(e, function(e) {
                return function() {
                    e.read(n, i)
                }
            }(this), i)
        }
    }, t.getLocalDevices = function(r, s, o) {
      console.log(r);
      console.log(s);
      console.log(o);
        var a = n("GET", e("available"));
        a && (finishedFunction = function(e) {
            response = e, response = JSON.parse(response);
            for (var n in response)
                if (response.hasOwnProperty(n) && response[n].constructor === Array) {
                    arr = response[n];
                    for (var i = 0; i < arr.length; ++i) arr[i] = new t.Device(arr[i])
                }
            return void 0 == o ? void r(response) : void r(response[o])
        }, i(void 0, a, finishedFunction, s), a.send())
    }, t.getDefaultDevice = function(r, s, o) {
        console.log(r);
        console.log(s);
        console.log(o);
        var a = "default";
        void 0 != r && null != r && (a = a + "?type=" + r);
        var c = n("GET", e(a));
        c && (finishedFunction = function(e) {
            if (response = e, "" == response) return void s(null);
            response = JSON.parse(response);
            var n = new t.Device(response);
            s(n)
        }, i(void 0, c, finishedFunction, o), c.send())
    }, t.readOnInterval = function(e, n, i) {
        void 0 != i && 0 != i || (i = 1), readFunc = function() {
            e.read(function(e) {
                n(e), setTimeout(readFunc, i)
            }, function(e) {
                setTimeout(readFunc, i)
            })
        }, setTimeout(readFunc, i)
    }, t.bindFieldToReadData = function(e, n, i, r) {
        t.readOnInterval(e, function(e) {
            "" != e && (n.value = e, void 0 != r && null != r && r())
        }, i)
    }, t
}();





export function setup_web_print()
{
  var available_printers = null;
  var selected_category = null;
  var default_printer = null;
  var selected_printer = null;
  var format_start = "^XA^LL200^FO80,50^A0N36,36^FD";
  var format_end = "^FS^XZ";
  var default_mode = true;

  console.log("Holis");

	//$('#printer_select').on('change', onPrinterSelected);
	//showLoading("Loading Printer Information...");
	default_mode = true;
	selected_printer = null;
	available_printers = null;
	selected_category = null;
	default_printer = null;

  BrowserPrint.getLocalDevices(function(printers)
    {
      console.log("Entro");
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

	BrowserPrint.getDefaultDevice('printer', function(printer)
	{
		default_printer = printer;
    console.log(default_printer);
		if((printer != null) && (printer.connection != undefined))
		{
      console.log("Entre if");
			selected_printer = printer;
			var printer_details = $('#printer_details');
      console.log(printer_details);
			var selected_printer_div = $('#selected_printer');
      console.log(selected_printer_div);

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
export function sendDataPrueba()
{
	//alert("Comunicacion exitosa");
	//showLoading("Printing...");
	checkPrinterStatus( function (text){
		if (text == "Ready to Print")
		{


				//selected_printer.send(format_start + $('#entered_name').val() + format_end, printComplete, printerError);



				var zpl = "^XA^CF,0,0,0^PR12^MD30^PW800^POI^CI13^LH0,20"+
				"^FO12,139^GB753,2,2^FS"+
				"^FO12,405^GB777,2,2^FS"+
				"^FO464,8^GB2,129,2^FS"+
				"^FO32,10^AdN,0,0^FWN^FH^FDORIGIN ID:LOMA ^FS"+
				"^FO224,10^AdN,0,0^FWN^FH^FD36755558^FS"+
				"^FO32,28^AdN,0,0^FWN^FH^FDDANIEL LOPEZ^FS"+
				"^FO32,46^AdN,0,0^FWN^FH^FD^FS"+
				"^FO32,64^AdN,0,0^FWN^FH^FDANDADOR VALERIO PRIETO 591 COL MIRA^FS"+
				"^FO32,82^AdN,0,0^FWN^FH^FD^FS"+
				"^FO32,100^AdN,0,0^FWN^FH^FDGUADALAJARA, JA 45590^FS"+
				"^FO32,118^AdN,0,0^FWN^FH^FDMEXICO MX^FS"+
				"^FO478,46^AdN,0,0^FWN^FH^FDCAD: 112926237/WSXI3300^FS"+
				"^FO28,747^A0N,24,24^FWN^FH^FDTRK#^FS"+
				"^FO28,805^A0N,27,32^FWN^FH^FD^FS"+
				"^FO136,717^A0N,27,36^FWN^FH^FD^FS"+
				"^FO15,151^A0N,21,21^FWN^FH^FDTO^FS"+
				"^FO60,149^A0N,38,38^FWN^FH^FDLUKA MODRIC^FS"+
				"^FO60,191^A0N,38,38^FWN^FH^FD^FS"+
				"^FO60,233^A0N,38,38^FWN^FH^FDPLAN DE SAN LUIS 3465 COL EL PALOMO^FS"+
				"^FO60,275^A0N,38,38^FWN^FH^FD^FS"+
				"^FO60,317^A0N,43,40^FWN^FH^FDSAN PEDRO TLAQUEPAQU JA 45580^FS"+
				"^FO35,359^A0N,21,21^FWN^FH^FD31456879^FS"+
				"^FO677,511^GB104,10,10^FS"+
				"^FO677,521^GB10,112,10^FS"+
				"^FO771,521^GB10,112,10^FS"+
				"^FO677,633^GB104,10,10^FS"+
				"^FO652,449^A0N,43,58^FWN^FH^FDFedEx^FS"+
				"^FO708,488^A0N,19,26^FWN^FH^FDExpress^FS"+
				"^FO697,529^A0N,128,137^FWN^FH^FDE^FS"+
			  "^FO21,413^BY2,2^B7N,10,5,14^FH^FWN^FH^FD[)>_1E01_1D0245580_1D484_1D20_1D7817915284260455_1DFDE_1D873385448_1D191_1D_1D1/1_1D3.00KG_1DN_1DPLAN DE SAN LUIS 3465 Col El Palomo_1DSan Pedro Tlaquepaque_1D  _1DLuka Modric_1E06_1D10ZXI001_1D12Z31456879_1D15Z112926237_1D20Z_1C_1D31Z1013486121641137761600781791528426_1D32Z02_1D39ZLOMA_1D_1E09_1DFDX_1Dz_1D8_1D(%_13_12;7_7F@_1E_04^FS"+
				"^FO478,100^AdN,0,0^FWN^FH^FDBILL SENDER^FS"+
				"^FO12,694^GB777,2,2^FS"+
				"^FO494,890^A0N,43,43^FWN^FH^FD^FS"+
				"^FO791,120^AbN,11,7^FWB^FH^FD552J2/8532/DCA5^FS"+
				"^FO95,751^A0N,53,40^FWN^FH^FD7817 9152 8426^FS"+
				"^FO409,700^A0N,51,38^FWN^FH^FB390,,,R,^FD                 AM^FS"+
				"^FO309,752^A0N,51,38^FWN^FH^FB490,,,R,^FD            ECONOMY^FS"+
				"^FO413,804^A0N,40,40^FWN^FH^FB386,,,R,^FD                ^FS"+
				"^FO495,846^A0N,44,44^FWN^FH^FB298,,,R,^FD     45580^FS"+
				"^FO574,906^A0N,24,24^FWN^FH^FB120,,,R,^FD   -MX^FS"+
				"^FO695,890^A0N,43,43^FWN^FH^FB100,,,R,^FDGDL^FS"+
				"^FO39,932^A0N,27,32^FWN^FH^FD^FS"+
				"^FO75,993^BY3,2^BCN,200,N,N,N,N^FWN^FD>;1013486121641137761600781791528426^FS"+
				"^FO28,842^A0N,107,96^FWN^FH^FD8Z LOMA ^FS"+
				"^FO790,513^A0N,13,18^FWB^FH^FDJ181118012601uv^FS"+
				"^FO478,10^AdN,0,0^FWN^FH^FDSHIP DATE: 10JUL18^FS"+
				"^FO478,28^AdN,0,0^FWN^FH^FDACTWGT: 3.00 KG^FS"+
				"^FO478,64^AdN,0,0^FWN^FH^FDDIMS: 20x20x20 CM^FS"+
				"^FO708,320^A0N,35,45^FWN^FH^FD(MX)^FS"+
				"^FO328,364^AbN,11,7^FWN^FH^FDREF: ^FS"+
				"^FO38,378^AbN,11,7^FWN^FH^FDINV: ^FS"+
				"^FO38,392^AbN,11,7^FWN^FH^FDPO: ^FS"+
				"^FO428,392^AbN,11,7^FWN^FH^FDDEPT: ^FS"+
				"^FO25,768^GB58,1,1^FS"+
				"^FO25,768^GB1,26,1^FS"+
				"^FO83,768^GB1,26,1^FS"+
				"^FO25,794^GB58,1,1^FS"+
				"^FO31,774^AdN,0,0^FWN^FH^FD0455^FS"+
				"^PQ1"+
				"^XZ";


			//	var zpl = '^XA^FO50,100^BXN,10,200^FDYourTextHere^FS^XZ';
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
						if ((!ok) && (statuses.Count == 0))
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
