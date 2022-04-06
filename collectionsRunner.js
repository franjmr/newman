const newman = require('newman');
const fs = require('fs')
const path = require('path')

/**
 * Reporter Config
 * @param {array} reportersDefault 
 * @returns {NewmanRunOptions.reporter} reporter
 */
const reporterConfig = function(collectionPath, reportersDefault){
    if(reportersDefault.includes("junit")){
        const filename = path.basename(collectionPath, "json");
        const junitExport = "junit/"+filename+".xml";
        return {
            junit: {
                "export": junitExport
            }
        }
    }
}

/**
 * Run Newman collection
 * @param {string} collectionPath Collection path
 * @returns {Promise}
 */
const newmanRunCollection = function(collectionPath, reportersDefault){
    console.log('Run Collection %s ', collectionPath);

    return new Promise((resolve, reject)=>{
        newman.run({
            collection: collectionPath,
            reporters: reportersDefault,
            reporter: reporterConfig(collectionPath, reportersDefault)
        }, (err)=>{
            if (err) {
                console.error('Collection %s run with errors: %s', collectionPath, err);
                reject(err);
            }else{
                console.log('Collection %s run complete!', collectionPath);
                resolve();
            }
        });
    });
}

/**
 * Find recursively in a folder the files by extension
 * @param {strin} folderPath Folder to search
 * @param {string} fileExtension Extension filter
 * @returns 
 */
const findFileByExtension = function(folderPath, fileExtension) {
    const files = fs.readdirSync(folderPath);
    let result = [];
   
    files.forEach( (file) => {
        var filepath = path.join(folderPath,file);
        if ( fs.statSync(filepath).isDirectory() ){
            result = findFileByExtension(filepath, fileExtension, fs.readdirSync(filepath),result);
        } else {
            if ( path.extname(file) === fileExtension ){
                result.push(filepath);
            } 
        }
    })

    return result;
}

/**
 * Run all Newman collections from a path
 * @param {string} collectionPath 
 */
const newmanRunAllCollections = async function(collectionPath, reportersDefault){
    const collections = findFileByExtension(collectionPath, '.json');
    for(const collection of collections){
        await newmanRunCollection(collection, reportersDefault);
    }
}

const COLLECTION_DIR = './collections'
const REPORTER_DEFAULT = ['cli']

let collectionPath = COLLECTION_DIR;
let reportersDefault = REPORTER_DEFAULT

if(process.env.COLLECTION_DIR){
    collectionPath = path.join(collectionPath, process.env.COLLECTION_DIR);
    console.warn("Use collection directory: %s", collectionPath);
}

if(process.env.REPORTERS){
    reportersDefault = process.env.REPORTERS.split(",")
    console.warn("Use external reporter: %s", reportersDefault);
}

newmanRunAllCollections(collectionPath, reportersDefault);