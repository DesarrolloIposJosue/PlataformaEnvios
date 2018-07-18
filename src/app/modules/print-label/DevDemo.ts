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
			console.log(selected_printer);
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

				//selected_printer.send(format_start + $('#entered_name').val() + format_end, printComplete, printerError);
				/*var zpl = "^XA^CF,0,0,0^PR12^MD30^PW800^POI^CI13^LH0,20"+
"^FO12,761^GB753,2,2^FS"+
"^FO12,1027^GB777,2,2^FS"+
"^FO464,630^GB2,129,2^FS"+
"^FO32,632^AdN,0,0^FWN^FH^FDORIGIN ID:LOMA ^FS"+
"^FO224,632^AdN,0,0^FWN^FH^FD36755558^FS"+
"^FO32,650^AdN,0,0^FWN^FH^FDDANIEL LOPEZ^FS"+
"^FO32,668^AdN,0,0^FWN^FH^FD^FS"+
"^FO32,686^AdN,0,0^FWN^FH^FDANDADOR VALERIO PRIETO 591 COL MIRA^FS"+
"^FO32,704^AdN,0,0^FWN^FH^FD^FS"+
"^FO32,722^AdN,0,0^FWN^FH^FDGUADALAJARA, JA 45590^FS"+
"^FO32,740^AdN,0,0^FWN^FH^FDMEXICO MX^FS"+
"^FO478,668^AdN,0,0^FWN^FH^FDCAD: 112926237/WSXI3300^FS"+
"^FO28,1369^A0N,24,24^FWN^FH^FDTRK#^FS"+
"^FO28,1427^A0N,27,32^FWN^FH^FD^FS"+
"^FO136,1339^A0N,27,36^FWN^FH^FD^FS"+
"^FO70,530^A0N,27,36^FWN^FH^FD^FS"+
"^FO70,570^A0N,27,36^FWN^FH^FD^FS"+
"^FO15,773^A0N,21,21^FWN^FH^FDTO^FS"+
"^FO60,771^A0N,38,38^FWN^FH^FDLUKA MODRIC^FS"+
"^FO60,813^A0N,38,38^FWN^FH^FD^FS"+
"^FO60,855^A0N,38,38^FWN^FH^FDPLAN DE SAN LUIS 3465 COL EL PALOMO^FS"+
"^FO60,897^A0N,38,38^FWN^FH^FD^FS"+
"^FO60,939^A0N,43,40^FWN^FH^FDSAN PEDRO TLAQUEPAQU JA 45580^FS"+
"^FO35,981^A0N,21,21^FWN^FH^FD31456879^FS"+
"^FO677,1133^GB104,10,10^FS"+
"^FO677,1143^GB10,112,10^FS"+
"^FO771,1143^GB10,112,10^FS"+
"^FO677,1255^GB104,10,10^FS"+
"^FO652,1071^A0N,43,58^FWN^FH^FDFedEx^FS"+
"^FO708,1110^A0N,19,26^FWN^FH^FDExpress^FS"+
"^FO697,1151^A0N,128,137^FWN^FH^FDE^FS"+
"^FO21,1035^BY2,2^B7N,10,5,14^FH^FWN^FH^FD[)>_1E01_1D0245580_1D484_1D05_1D7818254619830455_1DFDE_1D873385448_1D193_1D_1D1/1_1D6.00KG_1DN_1DPLAN DE SAN LUIS 3465 Col El Palomo_1DSan Pedro Tlaquepaque_1D  _1DLuka Modric_1E06_1D10ZXI001_1D12Z31456879_1D15Z112926237_1D20Z_1C_1D31Z1013484921941137761600781825461983_1D32Z02_1D39ZLOMA_1D_1E09_1DFDX_1Dz_1D8_1D(%_13_12;7_7F@_1E_04^FS"+
"^FO478,722^AdN,0,0^FWN^FH^FDBILL SENDER^FS"+
"^FO12,1316^GB777,2,2^FS"+
"^FO494,1512^A0N,43,43^FWN^FH^FD^FS"+
"^FO791,742^AbN,11,7^FWB^FH^FD552J2/8532/DCA5^FS"+
"^FO95,1373^A0N,53,40^FWN^FH^FD7818 2546 1983^FS"+
"^FO409,1322^A0N,51,38^FWN^FH^FB390,,,R,^FD                 AM^FS"+
"^FO309,1374^A0N,51,38^FWN^FH^FB490,,,R,^FD STANDARD OVERNIGHT^FS"+
"^FO413,1426^A0N,40,40^FWN^FH^FB386,,,R,^FD                ^FS"+
"^FO495,1468^A0N,44,44^FWN^FH^FB298,,,R,^FD     45580^FS"+
"^FO574,1528^A0N,24,24^FWN^FH^FB120,,,R,^FD   -MX^FS"+
"^FO695,1512^A0N,43,43^FWN^FH^FB100,,,R,^FDGDL^FS"+
"^FO39,1554^A0N,27,32^FWN^FH^FD^FS"+
"^FO75,1615^BY3,2^BCN,200,N,N,N,N^FWN^FD>;1013484921941137761600781825461983^FS"+
"^FO28,1464^A0N,107,96^FWN^FH^FD8Z LOMA ^FS"+
"^FO790,1135^A0N,13,18^FWB^FH^FDJ181118012601uv^FS"+
"^FO478,632^AdN,0,0^FWN^FH^FDSHIP DATE: 12JUL18^FS"+
"^FO478,650^AdN,0,0^FWN^FH^FDACTWGT: 6.00 KG^FS"+
"^FO478,686^AdN,0,0^FWN^FH^FDDIMS: 30x30x30 CM^FS"+
"^FO708,942^A0N,35,45^FWN^FH^FD(MX)^FS"+
"^FO328,986^AbN,11,7^FWN^FH^FDREF: ^FS"+
"^FO38,1000^AbN,11,7^FWN^FH^FDINV: ^FS"+
"^FO38,1014^AbN,11,7^FWN^FH^FDPO: ^FS"+
"^FO428,1014^AbN,11,7^FWN^FH^FDDEPT: ^FS"+
"^FO25,1390^GB58,1,1^FS"+
"^FO25,1390^GB1,26,1^FS"+
"^FO83,1390^GB1,26,1^FS"+
"^FO25,1416^GB58,1,1^FS"+
"^FO31,1396^AdN,0,0^FWN^FH^FD0455^FS"+
"^PQ1"+
"^XZ";*/


				/*var zpl = "^XA^CF,0,0,0^PR12^MD30^PW800^POI^CI13^LH0,20"+
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
				"^XZ";*/

				/*var zpl = "^XA^CF,0,0,0^PR12^MD30^PW800^POI^CI13^LH0,20"+
"^FO12,551^GB753,2,2^FS"+
"^FO12,817^GB777,2,2^FS"+
"^FO464,420^GB2,129,2^FS"+
"^FO32,422^AdN,0,0^FWN^FH^FDORIGIN ID:LOMA ^FS"+
"^FO224,422^AdN,0,0^FWN^FH^FD36755558^FS"+
"^FO32,440^AdN,0,0^FWN^FH^FDDANIEL LOPEZ^FS"+
"^FO32,458^AdN,0,0^FWN^FH^FD^FS"+
"^FO32,476^AdN,0,0^FWN^FH^FDANDADOR VALERIO PRIETO 591 COL MIRA^FS"+
"^FO32,494^AdN,0,0^FWN^FH^FD^FS"+
"^FO32,512^AdN,0,0^FWN^FH^FDGUADALAJARA, JA 45590^FS"+
"^FO32,530^AdN,0,0^FWN^FH^FDMEXICO MX^FS"+
"^FO478,458^AdN,0,0^FWN^FH^FDCAD: 112926237/WSXI3300^FS"+
"^FO28,1159^A0N,24,24^FWN^FH^FDTRK#^FS"+
"^FO28,1217^A0N,27,32^FWN^FH^FD^FS"+
"^FO136,1129^A0N,27,36^FWN^FH^FD^FS"+
"^FO70,320^A0N,27,36^FWN^FH^FD^FS"+
"^FO70,360^A0N,27,36^FWN^FH^FD^FS"+
"^FO70,320^A0N,27,36^FWN^FH^FD^FS"+
"^FO70,360^A0N,27,36^FWN^FH^FD^FS"+
"^FO15,563^A0N,21,21^FWN^FH^FDTO^FS"+
"^FO60,561^A0N,38,38^FWN^FH^FDLUKA MODRIC^FS"+
"^FO60,603^A0N,38,38^FWN^FH^FD^FS"+
"^FO60,645^A0N,38,38^FWN^FH^FDPLAN DE SAN LUIS 3465 COL EL PALOMO^FS"+
"^FO60,687^A0N,38,38^FWN^FH^FD^FS"+
"^FO60,729^A0N,43,40^FWN^FH^FDSAN PEDRO TLAQUEPAQU JA 45580^FS"+
"^FO35,771^A0N,21,21^FWN^FH^FD31456879^FS"+
"^FO677,923^GB104,10,10^FS"+
"^FO677,933^GB10,112,10^FS"+
"^FO771,933^GB10,112,10^FS"+
"^FO677,1045^GB104,10,10^FS"+
"^FO652,861^A0N,43,58^FWN^FH^FDFedEx^FS"+
"^FO708,900^A0N,19,26^FWN^FH^FDExpress^FS"+
"^FO697,941^A0N,128,137^FWN^FH^FDE^FS"+
"^FO21,825^BY2,2^B7N,10,5,14^FH^FWN^FH^FD[)>_1E01_1D0245580_1D484_1D20_1D7818244814630455_1DFDE_1D873385448_1D193_1D_1D1/1_1D3.00KG_1DN_1DPLAN DE SAN LUIS 3465 Col El Palomo_1DSan Pedro Tlaquepaque_1D  _1DLuka Modric_1E06_1D10ZXI001_1D12Z31456879_1D15Z112926237_1D20Z_1C_1D31Z1013486121941137761600781824481463_1D32Z02_1D39ZLOMA_1D_1E09_1DFDX_1Dz_1D8_1D(%_13_12;7_7F@_1E_04^FS"+
"^FO478,512^AdN,0,0^FWN^FH^FDBILL SENDER^FS"+
"^FO12,1106^GB777,2,2^FS"+
"^FO494,1302^A0N,43,43^FWN^FH^FD^FS"+
"^FO791,532^AbN,11,7^FWB^FH^FD552J2/8532/DCA5^FS"+
"^FO95,1163^A0N,53,40^FWN^FH^FD7818 2448 1463^FS"+
"^FO409,1112^A0N,51,38^FWN^FH^FB390,,,R,^FD                 AM^FS"+
"^FO309,1164^A0N,51,38^FWN^FH^FB490,,,R,^FD            ECONOMY^FS"+
"^FO413,1216^A0N,40,40^FWN^FH^FB386,,,R,^FD                ^FS"+
"^FO495,1258^A0N,44,44^FWN^FH^FB298,,,R,^FD     45580^FS"+
"^FO574,1318^A0N,24,24^FWN^FH^FB120,,,R,^FD   -MX^FS"+
"^FO695,1302^A0N,43,43^FWN^FH^FB100,,,R,^FDGDL^FS"+
"^FO39,1344^A0N,27,32^FWN^FH^FD^FS"+
"^FO75,1405^BY3,2^BCN,200,N,N,N,N^FWN^FD>;1013486121941137761600781824481463^FS"+
"^FO28,1254^A0N,107,96^FWN^FH^FD8Z LOMA ^FS"+
"^FO790,925^A0N,13,18^FWB^FH^FDJ181118012601uv^FS"+
"^FO478,422^AdN,0,0^FWN^FH^FDSHIP DATE: 12JUL18^FS"+
"^FO478,440^AdN,0,0^FWN^FH^FDACTWGT: 3.00 KG^FS"+
"^FO478,476^AdN,0,0^FWN^FH^FDDIMS: 20x20x20 CM^FS"+
"^FO708,732^A0N,35,45^FWN^FH^FD(MX)^FS"+
"^FO328,776^AbN,11,7^FWN^FH^FDREF: ^FS"+
"^FO38,790^AbN,11,7^FWN^FH^FDINV: ^FS"+
"^FO38,804^AbN,11,7^FWN^FH^FDPO: ^FS"+
"^FO428,804^AbN,11,7^FWN^FH^FDDEPT: ^FS"+
"^FO25,1180^GB58,1,1^FS"+
"^FO25,1180^GB1,26,1^FS"+
"^FO83,1180^GB1,26,1^FS"+
"^FO25,1206^GB58,1,1^FS"+
"^FO31,1186^AdN,0,0^FWN^FH^FD0455^FS"+
"^PQ1"+
"^XZ";*/
				/*var zpl = '
N
OD10
q812
Q1218,24
D15
ZT
LO12,139,753,2
LO12,405,777,2
LO464,8,2,129
A32,10,0,2,1,1,N,"ORIGIN ID:LOMA "
A224,10,0,2,1,1,N,"36755558"
A32,28,0,2,1,1,N,"DANIEL LOPEZ"
A32,46,0,2,1,1,N,""
A32,64,0,2,1,1,N,"ANDADOR VALERIO PRIETO 591 COL MIRA"
A32,82,0,2,1,1,N,""
A32,100,0,2,1,1,N,"GUADALAJARA, JA 45590"
A32,118,0,2,1,1,N,"MEXICO MX"
A478,46,0,2,1,1,N,"CAD: 112926237/WSXI3300"
A28,747,0,3,1,1,N,"TRK#"
A28,805,0,4,1,1,N,""
A136,717,0,4,1,1,N,""
A15,151,0,2,1,1,N,"TO"
A60,149,0,1,2,3,N,"LUKA MODRIC"
A60,191,0,1,2,3,N,""
A60,233,0,1,2,3,N,"PLAN DE SAN LUIS 3465 COL EL PALOMO"
A60,275,0,1,2,3,N,""
A60,317,0,1,2,3,N,"SAN PEDRO TLAQUEPAQU JA 45580"
A35,359,0,2,1,1,N,"31456879"
LO677,511,104,10
LO677,521,10,112
LO771,521,10,112
LO677,633,104,10
A652,449,0,3,2,2,N,"FedEx"
A708,488,0,2,1,1,N,"Express"
A697,529,0,5,2,2,N,"E"
b21,413,P,800,800,s5,f0,x2,y10,r80,o0,l14,"[)>010245580484207817890289370455FDE8733854481911/13.00KGNPLAN DE SAN LUIS 3465 Col El PalomoSan Pedro Tlaquepaque  Luka Modric0610ZXI00112Z3145687915Z11292623720Z31Z101348612164113776160078178902893732Z0239ZLOMA09FDXz8(%;7@"
A478,100,0,2,1,1,N,"BILL SENDER"
LO12,694,777,2
A459,890,0,3,2,2,N,""
A791,300,3,1,1,1,N,"552J2/8532/DCA5"
A104,751,0,4,1,2,N,"7817 8902 8937"
A409,700,0,1,2,4,N,"                 AM"
A409,752,0,1,2,4,N,"            ECONOMY"
A469,804,0,1,2,3,N,"                "
A509,846,0,3,2,2,N,"     45580"
A604,906,0,3,1,1,N,"   -MX"
A705,890,0,3,2,2,N,"GDL"
A39,932,0,4,1,1,N,""
B75,993,0,1,3,4,200,N,"1013486121641137761600781789028937"
A28,842,0,4,3,4,N,"8Z LOMA "
A790,661,3,1,1,1,N,"J181118012601uv"
A478,10,0,2,1,1,N,"SHIP DATE: 10JUL18"
A478,28,0,2,1,1,N,"ACTWGT: 3.00 KG"
A478,64,0,2,1,1,N,"DIMS: 20x20x20 CM"
A708,320,0,2,2,2,N,"(MX)"
A328,364,0,1,1,1,N,"REF: "
A38,378,0,1,1,1,N,"INV: "
A38,392,0,1,1,1,N,"PO: "
A428,392,0,1,1,1,N,"DEPT: "
LO25,768,58,1
LO25,768,1,26
LO83,768,1,26
LO25,794,58,1
A31,774,0,2,1,1,N,"0455"
P1
N
';*/

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
