'use strict';

var bluetoothDevice;
var $main = $("#main");
var $connectBtn = $("#connect");
var $disconnectBtn = $("#disconnect");
var options = { filters: [{ name: 'BeatsPill+' }] }
var log = console.log;

function init() {
	console.log('Init');
	$connectBtn.on('click', connectClick);
	$disconnectBtn.on('click', onReconnectButtonClick);
}


function connectClick() {

	var options = { filters: [{ name: 'BeatsPill+' }] }

	navigator.bluetooth.requestDevice(options).then(device => {
		console.log('Got device:', device.name);
		console.log('id:', device.id);
		// onsole.log('address:', device.address);
		
		console.log('connected', device.gatt.connected);
		// return device.gatt.connect();
		// Do something with the device.
		// return device.gatt.connect(); // Chromium 49 and below use `connectGATT()` but from Chromium 50 it will use gatt.connect();
	})
	.catch(exception => {
		console.log("Something went wrong. " + exception);
	});

}

 


$(function() {
    init();
});