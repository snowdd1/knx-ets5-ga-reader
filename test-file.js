/*
 * Trying to convert an ETS5 group address XML export into something usable 
 * Right now just spits out some logs (can be copied and pasted, of course)
 * 
 */
'use strict';

let config = {
	ets5gaFile : 'test_adressen-ets553-2.xml'
};

let fs = require('fs');
let xml2js = require('xml2js');
let groupAddresses=[];
let groupStructure=[];
let addressFlat = {}; // Object for referencing DPTs from addresses
// check for a file
var parser = new xml2js.Parser();
fs.readFile(__dirname + '/' + config.ets5gaFile, function(err, data) {
	if (!err) {
		parser.parseString(data, function(err, result) {
			if (!err) {
				//console.dir(result['GroupAddress-Export'].GroupRange);
//				console.log('Done');
				// first level of group address structure 1/
				for (let i=0; i<result['GroupAddress-Export'].GroupRange.length; i++) {
					groupStructure.push(result['GroupAddress-Export'].GroupRange[i]);
//					console.log(groupStructure[i]);
					let node = groupStructure[i].$;
					node.l2 = [];
//					console.log('Level1: ' + node);
					// second level of group address structure /2/
					if (Array.isArray(groupStructure[i].GroupRange)) {
						for (let j= 0 ; j<groupStructure[i].GroupRange.length; j++) {
							let node2 =  groupStructure[i].GroupRange[j].$;
							node2.l3 = [];
	//						console.log('Level2:');
//							console.log(node2);
							// third level: group addresses /255
							if (Array.isArray(groupStructure[i].GroupRange[j].GroupAddress)) {
								for (let k= 0; k<groupStructure[i].GroupRange[j].GroupAddress.length; k++) {
									let node3 = groupStructure[i].GroupRange[j].GroupAddress[k].$;
									node2.l3.push(node3);
									addressFlat[node3.Address] = node3.DPTs || null;
								}
								node.l2.push(node2);
							}
						}
						groupAddresses.push(node); // push only if it has at least one subgroup
					}
					
				}
				console.log('STRUCTURE:');
				console.log(JSON.stringify(groupAddresses, undefined, 4));
				console.log('FLAT:');
				console.log(JSON.stringify(addressFlat, undefined, 4));
			} else {
				console.log('Error parsing XML');
			}
		});
	} else {
		console.log('Error opening XML file at: ' + __dirname + '/' + config.ets5gaFile);
	}
});
