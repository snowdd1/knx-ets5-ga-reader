# knx-ets5-ga-reader
Converter for ETS5 Group Address Exports (XML format) 

If you do not know what KNX is,  
or do not know what the ETS is,  
or do not know what group addresses are,  
or do not know what XML is,  
**you are in the wrong repository**  

### If you're still here...
Here is how to use it:

1. Export you group address structure in the ETS5 as XML format file
2. copy that file into the directory of this package
3. Edit the *test-file.js* Line 9 and put you file name into the `ets5gaFile : 'myETS5GroupAddressExport.xml'` configuration line
4. run it using `node test-file.js`
5. The file you are going to use is called *grouplist.json* unless you changed that in the config.   

