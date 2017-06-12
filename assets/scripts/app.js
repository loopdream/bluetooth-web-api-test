'use strict';

var bluetoothDevice;
var $main = $("#main");
var $connectBtn = $("#connect");
var $disconnectBtn = $("#disconnect");
var options = { filters: [{ name: 'BeatsPill+' }] }
var log = console.log;

function init() {
	console.log('Init');
	$connectBtn.on('click', onScanButtonClick);
	$disconnectBtn.on('click', onDisconnectButtonClick);
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

function onScanButtonClick() {
 
  bluetoothDevice = null;
  log('Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice(options)
  .then(device => {
    bluetoothDevice = device;
    bluetoothDevice.addEventListener('gattserverdisconnected', onDisconnected);
    return connect();
  })
  .catch(error => {
    log('Argh! ' + error);
  });
}

function connect() {
  log('Connecting to Bluetooth Device...');
  return bluetoothDevice.gatt.connect()
  .then(server => {
    log('> Bluetooth Device connected');
  });
}

function onDisconnectButtonClick() {
  if (!bluetoothDevice) {
    return;
  }
  log('Disconnecting from Bluetooth Device...');
  if (bluetoothDevice.gatt.connected) {
    bluetoothDevice.gatt.disconnect();
  } else {
    log('> Bluetooth Device is already disconnected');
  }
}

function onDisconnected(event) {
  // Object event.target is Bluetooth Device getting disconnected.
  log('> Bluetooth Device disconnected');
}


function onReconnectButtonClick() {
  if (!bluetoothDevice) {
    return;
  }
  if (bluetoothDevice.gatt.connected) {
    log('> Bluetooth Device is already connected');
    return;
  }
  connect()
  .catch(error => {
    log('Argh! ' + error);
  });
}

$(function() {
    init();
});