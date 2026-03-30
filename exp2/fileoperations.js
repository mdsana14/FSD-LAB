const fs = require('fs');

// 1. Write file
fs.writeFile('sample.txt', 'Hello this is first content', (err) => {
    if (err) {
        console.log("Error writing file");
        return;
    }
    console.log("File created successfully");

    // 2. Read file
    fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading file");
            return;
        }
        console.log("File Content:", data);

        // 3. Append file
        fs.appendFile('sample.txt', '\nThis is appended content', (err) => {
            if (err) {
                console.log("Error appending file");
                return;
            }
            console.log("Content appended");

            // 4. Delete file
            fs.unlink('sample.txt', (err) => {
                if (err) {
                    console.log("Error deleting file");
                    return;
                }
                console.log("File deleted");

                // 5. Create directory
                fs.mkdir('testFolder', (err) => {
                    if (err) {
                        console.log("Error creating folder");
                        return;
                    }
                    console.log("Folder created");
                });
            });
        });
    });
});