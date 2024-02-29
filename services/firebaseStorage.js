
const { getStorage, ref, uploadBytes, getDownloadURL  } = require("firebase/storage");
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
    return {
        uploadFileToStorage
    }
    // Function to upload a file to Firebase Storage
    async function uploadFileToStorage(fileData, storageDirectory, destinationFilename) {
        const storage = getStorage(app);      
        
        const fileExtension = fileData.originalname.split('.').pop();

        const destinationPath = `${storageDirectory}/${destinationFilename}.${fileExtension}`;
      
        const storageRef = ref(storage, destinationPath);
      
        // Use upload to upload the file
        try {
         await uploadBytes(storageRef, fileData.buffer);
          const downloadURL = await getDownloadURL(storageRef);
          
          return downloadURL;
        } catch (error) {
            throw new Error(`Error uploading file ${localFilePath} as ${destinationPath}:`, error);
        }
      }
}