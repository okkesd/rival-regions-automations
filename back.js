var express = require('express')
//var router = require('./routes')
const fs = require('fs');
const path = require('path');
//const fetch = require('node-fetch');


var app = express()

app.use(express.json());



app.get('/api/get', (req,res) => {
    res.send("Okk")
})

//module.exports = app

var http = require('http')


var port = normalizePort('3004');
app.set('port', port)

var server = http.createServer(app)


server.listen(port,() => {
    console.log(`Server is on at ${port}`)
})


function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }

  var router = express.Router();
  const cron = require('node-cron'); // npm install node-cron
  const { spawn } = require('child_process');
  
  // dehliz.argem.net/okkes
  router.post('/rv_sell', async (req,res) => {
    
        try {
            let { sess_id, rr_f, hour, minute, c, rr_add, rr_id, rr , kim} = req.body;
            
        console.log(`hour: ${hour} and minute: ${minute}`)
        if (!hour){
            hour = new Date().getHours()
        }
        if (!minute){
            minute = new Date().getMinutes()+1
        }
        if (!c){
            c = "6ed08bb641100b1a8dce966eff8398a9"
        }
        if (!rr_add){
            rr_add = "48e203aadfdd509cb385513ae370d368"
        }
        if (!rr_id){
            rr_id = "868625164333238"
        }
        if(!rr){
            rr = "f56a29d11b560478f71ae84d6435779c"
        } if (!kim){
            kim = "buddha"
        }

        console.log(sess_id);
        console.log(rr_f);
        console.log(`Scheduling the first task to start at ${hour}:${minute}.`);
    
        const logFilePath = path.join(__dirname, 'logs', 'script_output.log');
        const errorFilePath = path.join(__dirname, 'logs', 'script_error.log');

        // Ensure log directory exists
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            fs.mkdirSync(path.join(__dirname, 'logs'));
        }

        // Cron expression for the first task (runs at a specific hour and minute)
        const firstTaskExpression = `${minute} ${hour} * * *`;
    
        // Variable to hold the second task reference
        let secondTask;
        const venvActivatePath = path.join(__dirname, './wenv/bin/activate');
        const pythonScriptPath = path.join(__dirname, './rv_sell_modified.py');

        const mainJob = () => {
            // Spawn a Python process and pass the arguments
            //const python = spawn('python3', ['./rv_sell_modified.py', sess_id, rr_f, c, rr_add, rr_id, rr]);
            const python = spawn('/bin/bash', [
                '-c', 
                `. ${venvActivatePath} && python3 ${pythonScriptPath} ${sess_id} ${rr_f} ${c} ${rr_add} ${rr_id} ${rr}`
            ]);
            
    
            // Capture Python script output
            python.stdout.on('data', (data) => {
                const output = data.toString();
                console.log(`Python Output: ${output}`);

                fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python Output: ${data.toString()}\n`);

                // Check if the Python script returned "Stop"
                if (output.includes('Stop')) {
                    console.log('Stopping the second task based on Python script output.');
                    secondTask.stop();  // Stop the second task
                    if (!res.headersSent){
                        res.send("done")
                    }
                    
                }
            });

            // Capture any errors from the Python script
            python.stderr.on('data', (data) => {
                console.error(`Python Error: ${data.toString()}`);
                fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Python Error: ${data.toString()}\n`);
            });

            // Handle process exit
            python.on('close', (code) => {
                console.log(`Python script exited with code ${code}`);
                fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python script exited with code ${code}\n`);
                if (code == 0 && !res.headersSent){
                    res.status(200).send("done")
                }
            });
        }

        // Define the second task logic (runs every 5 minutes)
        const startSecondTask = () => {
            console.log(`Starting the second task to run every 6 minutes.`);
            const secondTaskExpression = `*/6 * * * *`;  // Runs every 5 minutes
    
            secondTask = cron.schedule(secondTaskExpression, () => {
                console.log(`Running the main Python script...`);
    
                mainJob();
            });
    
            secondTask.start();  // Start the second task
        };
        
        // First task logic (runs at the specified hour and minute)
        const firstTask = cron.schedule(firstTaskExpression, () => {
            console.log(`Starting the second task.`);
            
            mainJob(); // Call the main job to run it immeadiaately

            // Start the second task every 5 minutes
            startSecondTask();
            fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Current Cron-Jobs: ${cron.getTasks()}\n`);
            // Stop the first task after starting the second task
            firstTask.stop();
        });
    
        // Start the first task (scheduler)
        firstTask.start();
        console.log("the task setted")
        if (!res.headersSent) {
            res.status(200).send(`Started`);
        }}
        catch (e) {
            res.status(500).send(`Internal Server Error: Sorry, ${e}`)
        }
    });
    router.post('/dia_sell', async (req,res) => {
    
        try {
            let { sess_id, rr_f, hour, minute, c, rr_add, rr_id, rr , kim} = req.body;
            
        console.log(`hour: ${hour} and minute: ${minute}`)
        if (!hour){
            hour = new Date().getHours()
        }
        if (!minute){
            minute = new Date().getMinutes()+1
        }
        if (!c){
            c = "6ed08bb641100b1a8dce966eff8398a9"
        }
        if (!rr_add){
            rr_add = "48e203aadfdd509cb385513ae370d368"
        }
        if (!rr_id){
            rr_id = "868625164333238"
        }
        if(!rr){
            rr = "f56a29d11b560478f71ae84d6435779c"
        } if (!kim){
            kim = "buddha"
        }

        console.log(sess_id);
        console.log(rr_f);
        console.log(`Scheduling the first task to start at ${hour}:${minute}.`);
    
        const logFilePath = path.join(__dirname, 'logs', 'script_output.log');
        const errorFilePath = path.join(__dirname, 'logs', 'script_error.log');

        // Ensure log directory exists
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            fs.mkdirSync(path.join(__dirname, 'logs'));
        }

        // Cron expression for the first task (runs at a specific hour and minute)
        const firstTaskExpression = `${minute} ${hour} * * *`;
    
        // Variable to hold the second task reference
        let secondTask;
        const venvActivatePath = path.join(__dirname, './wenv/bin/activate');
        const pythonScriptPath = path.join(__dirname, './dia_sell_modified.py');

        const mainJob = () => {
            // Spawn a Python process and pass the arguments
            //const python = spawn('python3', ['./rv_sell_modified.py', sess_id, rr_f, c, rr_add, rr_id, rr]);
            const python = spawn('/bin/bash', [
                '-c', 
                `. ${venvActivatePath} && python3 ${pythonScriptPath} ${sess_id} ${rr_f} ${c} ${rr_add} ${rr_id} ${rr}`
            ]);
            
    
            // Capture Python script output
            python.stdout.on('data', (data) => {
                const output = data.toString();
                console.log(`Python Output: ${output}`);

                fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python Output: ${data.toString()}\n`);

                // Check if the Python script returned "Stop"
                if (output.includes('Stop')) {
                    console.log('Stopping the second task based on Python script output.');
                    secondTask.stop();  // Stop the second task
                    if (!res.headersSent){
                        res.send("done")
                    }
                    
                }
            });

            // Capture any errors from the Python script
            python.stderr.on('data', (data) => {
                console.error(`Python Error: ${data.toString()}`);
                fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Python Error: ${data.toString()}\n`);
            });

            // Handle process exit
            python.on('close', (code) => {
                console.log(`Python script exited with code ${code}`);
                fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python script exited with code ${code}\n`);
                if (code == 0 && !res.headersSent){
                    res.status(200).send("done")
                }
            });
        }

        // Define the second task logic (runs every 5 minutes)
        const startSecondTask = () => {
            console.log(`Starting the second task to run every 6 minutes.`);
            const secondTaskExpression = `*/6 * * * *`;  // Runs every 5 minutes
    
            secondTask = cron.schedule(secondTaskExpression, () => {
                console.log(`Running the main Python script...`);
    
                mainJob();
            });
    
            secondTask.start();  // Start the second task
        };
        
        // First task logic (runs at the specified hour and minute)
        const firstTask = cron.schedule(firstTaskExpression, () => {
            console.log(`Starting the second task.`);
            
            mainJob(); // Call the main job to run it immeadiaately

            // Start the second task every 5 minutes
            startSecondTask();
            fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Current Cron-Jobs: ${cron.getTasks()}\n`);
            // Stop the first task after starting the second task
            firstTask.stop();
        });
    
        // Start the first task (scheduler)
        firstTask.start();
        console.log("the task setted")
        if (!res.headersSent) {
            res.status(200).send(`Started`);
        }}
        catch (e) {
            res.status(500).send(`Internal Server Error: Sorry, ${e}`)
        }
    });

    router.post('/uranium_sell', async (req,res) => {
    
        try {
            let { sess_id, rr_f, hour, minute, c, rr_add, rr_id, rr , kim} = req.body;
            
        console.log(`hour: ${hour} and minute: ${minute}`)
        if (!hour){
            hour = new Date().getHours()
        }
        if (!minute){
            minute = new Date().getMinutes()+1
        }
        if (!c){
            c = "6ed08bb641100b1a8dce966eff8398a9"
        }
        if (!rr_add){
            rr_add = "48e203aadfdd509cb385513ae370d368"
        }
        if (!rr_id){
            rr_id = "868625164333238"
        }
        if(!rr){
            rr = "f56a29d11b560478f71ae84d6435779c"
        } if (!kim){
            kim = "buddha"
        }

        console.log(sess_id);
        console.log(rr_f);
        console.log(`Scheduling the first task to start at ${hour}:${minute}.`);
    
        const logFilePath = path.join(__dirname, 'logs', 'script_output.log');
        const errorFilePath = path.join(__dirname, 'logs', 'script_error.log');

        // Ensure log directory exists
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            fs.mkdirSync(path.join(__dirname, 'logs'));
        }

        // Cron expression for the first task (runs at a specific hour and minute)
        const firstTaskExpression = `${minute} ${hour} * * *`;
    
        // Variable to hold the second task reference
        let secondTask;
        const venvActivatePath = path.join(__dirname, './wenv/bin/activate');
        const pythonScriptPath = path.join(__dirname, './sell_uranium.py');

        const mainJob = () => {
            // Spawn a Python process and pass the arguments
            //const python = spawn('python3', ['./rv_sell_modified.py', sess_id, rr_f, c, rr_add, rr_id, rr]);
            const python = spawn('/bin/bash', [
                '-c', 
                `. ${venvActivatePath} && python3 ${pythonScriptPath} ${sess_id} ${rr_f} ${c} ${rr_add} ${rr_id} ${rr}`
            ]);
            
    
            // Capture Python script output
            python.stdout.on('data', (data) => {
                const output = data.toString();
                console.log(`Python Output: ${output}`);

                fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python Output: ${data.toString()}\n`);

                // Check if the Python script returned "Stop"
                if (output.includes('Stop')) {
                    console.log('Stopping the second task based on Python script output.');
                    secondTask.stop();  // Stop the second task
                    if (!res.headersSent){
                        res.send("done")
                    }
                    
                }
            });

            // Capture any errors from the Python script
            python.stderr.on('data', (data) => {
                console.error(`Python Error: ${data.toString()}`);
                fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Python Error: ${data.toString()}\n`);
            });

            // Handle process exit
            python.on('close', (code) => {
                console.log(`Python script exited with code ${code}`);
                fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python script exited with code ${code}\n`);
                if (code == 0 && !res.headersSent){
                    res.status(200).send("done")
                }
            });
        }

        // Define the second task logic (runs every 5 minutes)
        const startSecondTask = () => {
            console.log(`Starting the second task to run every 6 minutes.`);
            const secondTaskExpression = `*/6 * * * *`;  // Runs every 5 minutes
    
            secondTask = cron.schedule(secondTaskExpression, () => {
                console.log(`Running the main Python script...`);
    
                mainJob();
            });
    
            secondTask.start();  // Start the second task
        };
        
        // First task logic (runs at the specified hour and minute)
        const firstTask = cron.schedule(firstTaskExpression, () => {
            console.log(`Starting the second task.`);
            
            mainJob(); // Call the main job to run it immeadiaately

            // Start the second task every 5 minutes
            startSecondTask();
            fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Current Cron-Jobs: ${cron.getTasks()}\n`);
            // Stop the first task after starting the second task
            firstTask.stop();
        });
    
        // Start the first task (scheduler)
        firstTask.start();
        console.log("the task setted (uranium)")
        if (!res.headersSent) {
            res.status(200).send(`Started`);
        }}
        catch (e) {
            res.status(500).send(`Internal Server Error: Sorry, ${e}`)
        }
    });

    router.post('/oxygene_sell', async (req,res) => {
    
        try {
            let { sess_id, rr_f, hour, minute, c, rr_add, rr_id, rr , kim, other_id} = req.body;
            
        console.log(`hour: ${hour} and minute: ${minute}`)
        if (!hour){
            hour = new Date().getHours()
        }
        if (!minute){
            minute = new Date().getMinutes()+1
        }
        if (!c){
            c = "6ed08bb641100b1a8dce966eff8398a9"
        }
        if (!rr_add){
            rr_add = "48e203aadfdd509cb385513ae370d368"
        }
        if (!rr_id){
            rr_id = "868625164333238"
        }
        if(!rr){
            rr = "f56a29d11b560478f71ae84d6435779c"
        } if (!kim){
            kim = "buddha"
        }

        console.log(sess_id);
        console.log(rr_f);
        console.log(`Scheduling the first task to start at ${hour}:${minute}.`);
    
        const logFilePath = path.join(__dirname, 'logs', 'script_output.log');
        const errorFilePath = path.join(__dirname, 'logs', 'script_error.log');

        // Ensure log directory exists
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            fs.mkdirSync(path.join(__dirname, 'logs'));
        }

        // Cron expression for the first task (runs at a specific hour and minute)
        const firstTaskExpression = `${minute} ${hour} * * *`;
    
        // Variable to hold the second task reference
        let secondTask;
        const venvActivatePath = path.join(__dirname, './wenv/bin/activate');
        const pythonScriptPath = path.join(__dirname, './sell_oxygene.py');

        const mainJob = () => {
            // Spawn a Python process and pass the arguments
            //const python = spawn('python3', ['./rv_sell_modified.py', sess_id, rr_f, c, rr_add, rr_id, rr]);
            const python = spawn('/bin/bash', [
                '-c', 
                `. ${venvActivatePath} && python3 ${pythonScriptPath} ${sess_id} ${rr_f} ${c} ${rr_add} ${rr_id} ${rr} ${other_id}`
            ]);
            
    
            // Capture Python script output
            python.stdout.on('data', (data) => {
                const output = data.toString();
                console.log(`Python Output: ${output}`);

                fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python Output: ${data.toString()}\n`);

                // Check if the Python script returned "Stop"
                if (output.includes('Stop')) {
                    console.log('Stopping the second task based on Python script output.');
                    secondTask.stop();  // Stop the second task
                    if (!res.headersSent){
                        res.send("done")
                    }
                    
                }
            });

            // Capture any errors from the Python script
            python.stderr.on('data', (data) => {
                console.error(`Python Error: ${data.toString()}`);
                fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Python Error: ${data.toString()}\n`);
            });

            // Handle process exit
            python.on('close', (code) => {
                console.log(`Python script exited with code ${code}`);
                fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python script exited with code ${code}\n`);
                if (code == 0 && !res.headersSent){
                    res.status(200).send("done")
                }
            });
        }

        // Define the second task logic (runs every 5 minutes)
        const startSecondTask = () => {
            console.log(`Starting the second task to run every 6 minutes.`);
            const secondTaskExpression = `*/6 * * * *`;  // Runs every 5 minutes
    
            secondTask = cron.schedule(secondTaskExpression, () => {
                console.log(`Running the main Python script...`);
    
                mainJob();
            });
    
            secondTask.start();  // Start the second task
        };
        
        // First task logic (runs at the specified hour and minute)
        const firstTask = cron.schedule(firstTaskExpression, () => {
            console.log(`Starting the second task.`);
            
            mainJob(); // Call the main job to run it immeadiaately

            // Start the second task every 5 minutes
            startSecondTask();
            fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Current Cron-Jobs: ${cron.getTasks()}\n`);
            // Stop the first task after starting the second task
            firstTask.stop();
        });
    
        // Start the first task (scheduler)
        firstTask.start();
        console.log("the task setted (uranium)")
        if (!res.headersSent) {
            res.status(200).send(`Started`);
        }}
        catch (e) {
            res.status(500).send(`Internal Server Error: Sorry, ${e}`)
        }
    });


    router.post('/rv_sell_fly', async (req,res) => {
        
        try {
            let { sess_id, rr_f, hour, minute, c, rr_add, rr_id, rr , kim} = req.body;
            
        console.log(`hour: ${hour} and minute: ${minute}`)
        if (!hour){
            hour = new Date().getHours()
        }
        if (!minute){
            minute = new Date().getMinutes()+1
        }
        if (!c){
            c = "6ed08bb641100b1a8dce966eff8398a9"
        }
        if (!rr_add){
            rr_add = "48e203aadfdd509cb385513ae370d368"
        }
        if (!rr_id){
            rr_id = "868625164333238"
        }
        if(!rr){
            rr = "f56a29d11b560478f71ae84d6435779c"
        } if (!kim){
            kim = "buddha"
        }

        console.log(sess_id);
        console.log(rr_f);
        console.log(`Scheduling the first task to start at ${hour}:${minute}.`);
    
        const logFilePath = path.join(__dirname, 'logs', 'script_output.log');
        const errorFilePath = path.join(__dirname, 'logs', 'script_error.log');

        // Ensure log directory exists
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            fs.mkdirSync(path.join(__dirname, 'logs'));
        }

        // Cron expression for the first task (runs at a specific hour and minute)
        const firstTaskExpression = `${minute} ${hour} * * *`;
    
        // Variable to hold the second task reference
        let secondTask;
        const venvActivatePath = path.join(__dirname, './wenv/bin/activate');
        const pythonScriptPath = path.join(__dirname, './rv_sell_modified_fly.py');

        const mainJob = () => {
            // Spawn a Python process and pass the arguments
            //const python = spawn('python3', ['./rv_sell_modified.py', sess_id, rr_f, c, rr_add, rr_id, rr]);
            const python = spawn('/bin/bash', [
                '-c', 
                `. ${venvActivatePath} && python3 ${pythonScriptPath} ${sess_id} ${rr_f} ${c} ${rr_add} ${rr_id} ${rr} ${kim}`
            ]);
            
    
            // Capture Python script output
            python.stdout.on('data', (data) => {
                const output = data.toString();
                console.log(`Python Output: ${output}`);

                fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python Output: ${data.toString()}\n`);

                // Check if the Python script returned "Stop"
                if (output.includes('Stop')) {
                    console.log('Stopping the second task based on Python script output.');
                    secondTask.stop();  // Stop the second task
                    if (!res.headersSent){
                        res.send("done")
                    }
                    
                }
            });

            // Capture any errors from the Python script
            python.stderr.on('data', (data) => {
                console.error(`Python Error: ${data.toString()}`);
                fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Python Error: ${data.toString()}\n`);
            });

            // Handle process exit
            python.on('close', (code) => {
                console.log(`Python script exited with code ${code}`);
                fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python script exited with code ${code}\n`);
                if (code == 0 && !res.headersSent){
                    res.status(200).send("done")
                }
            });
        }

        // Define the second task logic (runs every 5 minutes)
        const startSecondTask = () => {
            console.log(`Starting the second task to run every 6 minutes.`);
            const secondTaskExpression = `*/6 * * * *`;  // Runs every 5 minutes
    
            secondTask = cron.schedule(secondTaskExpression, () => {
                console.log(`Running the main Python script...`);
    
                mainJob();
            });
    
            secondTask.start();  // Start the second task
        };
        
        // First task logic (runs at the specified hour and minute)
        const firstTask = cron.schedule(firstTaskExpression, () => {
            console.log(`Starting the second task.`);
            
            mainJob(); // Call the main job to run it immeadiaately

            // Start the second task every 5 minutes
            startSecondTask();
            fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Current Cron-Jobs: ${cron.getTasks()}\n`);
            // Stop the first task after starting the second task
            firstTask.stop();
        });
    
        // Start the first task (scheduler)
        firstTask.start();
        console.log("the task setted")
        if (!res.headersSent) {
            res.status(200).send(`Started`);
        }}
        catch (e) {
            res.status(500).send(`Internal Server Error: Sorry, ${e}`)
        }
    })

    router.post('/fly', async (req,res) => {
    
        try {
            let { reg_id, sess_id, rr_f, hour, minute, c, rr_add, rr_id, rr } = req.body;
    
        if (!hour){
            hour = new Date().getHours()
        }
        if (!minute){
            minute = new Date().getMinutes()+1
        }
        if (!c){
            c = "6ed08bb641100b1a8dce966eff8398a9"
        }
        if (!rr_add){
            rr_add = "48e203aadfdd509cb385513ae370d368"
        }
        if (!rr_id){
            rr_id = "868625164333238"
        }
        if(!rr){
            rr = "f56a29d11b560478f71ae84d6435779c"
        }

        console.log(sess_id);
        console.log(rr_f);
        console.log(`Scheduling the first task to start at ${hour}:${minute}.`);
    
        const logFilePath = path.join(__dirname, 'logs', 'script_output.log');
        const errorFilePath = path.join(__dirname, 'logs', 'script_error.log');

        // Ensure log directory exists
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            fs.mkdirSync(path.join(__dirname, 'logs'));
        }

        // Cron expression for the first task (runs at a specific hour and minute)
        const firstTaskExpression = `${minute} ${hour} * * *`;
    
        // Variable to hold the second task reference
        let secondTask;
        const venvActivatePath = path.join(__dirname, './wenv/bin/activate');
        const pythonScriptPath = path.join(__dirname, './fly_done.py');

        const mainJob = () => {
            // Spawn a Python process and pass the arguments
            //const python = spawn('python3', ['./rv_sell_modified.py', sess_id, rr_f, c, rr_add, rr_id, rr]);
            const python = spawn('/bin/bash', [
                '-c', 
                `. ${venvActivatePath} && python3 ${pythonScriptPath} ${reg_id} ${c} ${sess_id} ${rr_f} ${rr} ${rr_add} ${rr_id}`
            ]);
            
    
            // Capture Python script output
            python.stdout.on('data', (data) => {
                const output = data.toString();
                console.log(`Python Output: ${output}`);

                fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python Output: ${data.toString()}\n`);

                // Check if the Python script returned "Stop"
                if (output.includes('Stop')) {
                    console.log('Stopping the second task based on Python script output.');
                    secondTask.stop();  // Stop the second task
                    if (!res.headersSent){
                        res.send("done")
                    }
                    
                }
            });

            // Capture any errors from the Python script
            python.stderr.on('data', (data) => {
                console.error(`Python Error: ${data.toString()}`);
                fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Python Error: ${data.toString()}\n`);
            });

            // Handle process exit
            python.on('close', (code) => {
                console.log(`Python script exited with code ${code}`);
                fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python script exited with code ${code}\n`);
                if (code == 0 && !res.headersSent){
                    res.status(200).send("done")
                }
            });
        }

        // Define the second task logic (runs every 5 minutes)
        const startSecondTask = () => {
            console.log(`Starting the second task to run every 6 minutes.`);
            const secondTaskExpression = `*/6 * * * *`;  // Runs every 5 minutes
    
            secondTask = cron.schedule(secondTaskExpression, () => {
                console.log(`Running the main Python script...`);
    
                mainJob();
            });
    
            secondTask.start();  // Start the second task
        };
        
        // First task logic (runs at the specified hour and minute)
        const firstTask = cron.schedule(firstTaskExpression, () => {
            console.log(`Starting the second task.`);
            
            mainJob(); // Call the main job to run it immeadiaately

            // Start the second task every 5 minutes
            startSecondTask();
            fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Current Cron-Jobs: ${cron.getTasks()}\n`);
            // Stop the first task after starting the second task
            firstTask.stop();
        });
    
        // Start the first task (scheduler)
        firstTask.start();
        console.log("the task setted")
        if (!res.headersSent) {
            res.status(200).send(`Started`);
        }}
        catch (e) {
            res.status(500).send(`Internal Server Error: Sorry, ${e}`)
        }
    });

    router.post('/drone_sell', async (req,res) => {
    
        try {
            let { sess_id, rr_f, hour, minute, c, rr_add, rr_id, rr } = req.body;
    
        if (!hour){
            hour = new Date().getHours()
        }
        if (!minute){
            minute = new Date().getMinutes()+1
        }
        if (!c){
            c = "6ed08bb641100b1a8dce966eff8398a9"
        }
        if (!rr_add){
            rr_add = "48e203aadfdd509cb385513ae370d368"
        }
        if (!rr_id){
            rr_id = "868625164333238"
        }
        if(!rr){
            rr = "f56a29d11b560478f71ae84d6435779c"
        }

        console.log(sess_id);
        console.log(rr_f);
        console.log(`Scheduling the first task to start at ${hour}:${minute}.`);
    
        const logFilePath = path.join(__dirname, 'logs', 'script_output.log');
        const errorFilePath = path.join(__dirname, 'logs', 'script_error.log');

        // Ensure log directory exists
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            fs.mkdirSync(path.join(__dirname, 'logs'));
        }

        // Cron expression for the first task (runs at a specific hour and minute)
        const firstTaskExpression = `${minute} ${hour} * * *`;
    
        // Variable to hold the second task reference
        let secondTask;
        const venvActivatePath = path.join(__dirname, './wenv/bin/activate');
        const pythonScriptPath = path.join(__dirname, './drone_sell.py');

        const mainJob = () => {
            // Spawn a Python process and pass the arguments
            //const python = spawn('python3', ['./rv_sell_modified.py', sess_id, rr_f, c, rr_add, rr_id, rr]);
            const python = spawn('/bin/bash', [
                '-c', 
                `. ${venvActivatePath} && python3 ${pythonScriptPath} ${sess_id} ${rr_f} ${c} ${rr_add} ${rr_id} ${rr}`
            ]);
            
    
            // Capture Python script output
            python.stdout.on('data', (data) => {
                const output = data.toString();
                console.log(`Python Output: ${output}`);

                fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python Output: ${data.toString()}\n`);

                // Check if the Python script returned "Stop"
                if (output.includes('Stop')) {
                    console.log('Stopping the second task based on Python script output.');
                    secondTask.stop();  // Stop the second task
                    if (!res.headersSent){
                        res.send("done")
                    }
                    
                }
            });

            // Capture any errors from the Python script
            python.stderr.on('data', (data) => {
                console.error(`Python Error: ${data.toString()}`);
                fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Python Error: ${data.toString()}\n`);
            });

            // Handle process exit
            python.on('close', (code) => {
                console.log(`Python script exited with code ${code}`);
                fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python script exited with code ${code}\n`);
                if (code == 0 && !res.headersSent){
                    res.status(200).send("done")
                }
            });
        }

        // Define the second task logic (runs every 5 minutes)
        const startSecondTask = () => {
            console.log(`Starting the second task to run every 6 minutes.`);
            const secondTaskExpression = `*/6 * * * *`;  // Runs every 5 minutes
    
            secondTask = cron.schedule(secondTaskExpression, () => {
                console.log(`Running the main Python script...`);
    
                mainJob();
            });
    
            secondTask.start();  // Start the second task
        };
        
        // First task logic (runs at the specified hour and minute)
        const firstTask = cron.schedule(firstTaskExpression, () => {
            console.log(`Starting the second task.`);
            
            mainJob(); // Call the main job to run it immeadiaately

            // Start the second task every 5 minutes
            startSecondTask();
            fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Current Cron-Jobs: ${cron.getTasks()}\n`);
            // Stop the first task after starting the second task
            firstTask.stop();
        });
    
        // Start the first task (scheduler)
        firstTask.start();
        console.log("the task setted")
        if (!res.headersSent) {
            res.status(200).send(`Started`);
        }}
        catch (e) {
            res.status(500).send(`Internal Server Error: Sorry, ${e}`)
        }
    });
  router.post('/eko', async (req,res) => {
        try {    
            let {sess_id, rr_f, c, rr_add, rr_id, rr} = req.body
  
      console.log(sess_id)
      console.log(rr_f)
      
      // buddha
      if (!c){
        c = 'd4b457aca19d7f05e6bbf19af1a731f2'
      }
      if (!rr_add){
        rr_add = "b6c451362ac6a6cadcefe4b5ce4ad9d7"
      }
      if (!rr_id){
        rr_id = "2001352321"
      }
      if (!rr){
        rr = "651077bd0062c4cdf38a93df653f65cb"
      }

      const logFilePath = path.join(__dirname, 'logs', 'script_output.log');
      const errorFilePath = path.join(__dirname, 'logs', 'script_error.log');

      // Ensure log directory exists
      if (!fs.existsSync(path.join(__dirname, 'logs'))) {
        fs.mkdirSync(path.join(__dirname, 'logs'));
      }
      
      const cronExpression = '0 */3 * * *';
    const venvActivatePath = path.join(__dirname, './wenv/bin/activate');
    const pythonScriptPath = path.join(__dirname, './eko_yenile.py');
    const runScrpit = () => {
        //console.log(`Running Python script at ${hour}:${minute}...`);

        // Spawn a Python process and pass the arguments
        //const python = spawn('python3', ['./eko_yenile.py', sess_id, rr_f]);
        const python = spawn('/bin/bash', [
            '-c', 
            `. ${venvActivatePath} && python3 ${pythonScriptPath} ${sess_id} ${rr_f} ${c} ${rr_add} ${rr_id} ${rr}`
        ]);

        // Capture Python script output
        python.stdout.on('data', (data) => {
            console.log(`Python Output: ${data.toString()}`);
            fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python Output: ${data.toString()}\n`);
        });

        // Capture any errors from the Python script
        python.stderr.on('data', (data) => {
            console.error(`Python Error: ${data.toString()}`);
            fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Python Error: ${data.toString()}\n`);

        });

        // Handle process exit
        python.on('close', (code) => {
            console.log(`Python script exited with code ${code}`);
            fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python script exited with code ${code}\n`);
            if (!res.headersSent) {
                res.status(200).send(`Python script executed successfully.`);
            }
            //task.stop(); // Stop the cron job after the script has run once
        });
    }

    runScrpit();
      // Schedule the task
      const task = cron.schedule(cronExpression, () => {
        runScrpit();
    });
      
    task.start();
    console.log("renewing gold every 3 hours")

  } catch (e){
    res.status(500).send(`Internal Server Error: Sorry, ${e}`)
  }
  })
  
  // WORK
  router.post('/work', async (req,res) => {
    try {
        
    let {sess_id, rr_f, factory, hour, minute, c, rr_add, rr_id, rr} = req.body


    console.log(factory)
    console.log(hour)
    console.log(minute)
    
    // mahrez
    if (!c){
        c = "6ed08bb641100b1a8dce966eff8398a9"
    }
    if (!rr_add){
        rr_add = "48e203aadfdd509cb385513ae370d368"
    }
    if (!rr_id){
        rr_id = "868625164333238"
    }
    if (!rr){
        rr = "f56a29d11b560478f71ae84d6435779c"
    }

    console.log(`rr is: ${rr}`)

    const logFilePath = path.join(__dirname, 'logs', 'script_output.log');
    const errorFilePath = path.join(__dirname, 'logs', 'script_error.log');

    // Ensure log directory exists
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
      fs.mkdirSync(path.join(__dirname, 'logs'));
    }

    const cronExpression = `${minute} ${hour} * * *`;
    //const lssExpression = `${minute-2} ${hour} * * *`; // before arrive run buy lss

    const venvActivatePath = path.join(__dirname, './wenv/bin/activate');
    const pythonScriptPath = path.join(__dirname, './work.py');
    const lssPath = path.join(__dirname,"./lss.py")

    
    const task = cron.schedule(cronExpression, () => {

    // (sess_id, rr_f, factory, c, rr_add, rr_id, rr)
    //const python = spawn('python3', ["./work.py", sess_id, rr_f, factory, c, rr_add, rr_id, rr])
    const python = spawn('/bin/bash', [
        '-c', 
        `. ${venvActivatePath} && python3 ${pythonScriptPath} ${sess_id} ${rr_f} ${factory} ${c} ${rr_add} ${rr_id} ${rr}`
    ]);

    // Capture Python script output
    python.stdout.on('data', (data) => {
        console.log(`Python Output: ${data.toString()}`);
        fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python Output: ${data.toString()}\n`);
    });

    // Capture any errors from the Python script
    python.stderr.on('data', (data) => {
        //console.error(`Python Error: ${data.toString()}`);
        fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Python Error: ${data.toString()}\n`);
    });

    // Handle process exit
    python.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
        fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python script exited with code ${code}\n`);
        if (!res.headersSent) {
            res.status(200).send(`Python script executed successfully.`);
        }
        task.stop(); // Stop the cron job after the script has run once
    });
    })
    task.start();
    if (!res.headersSent) {
        res.status(200).send(`${task._task}`);
    }

}
    catch (err) {
        // Log any unexpected errors and respond with an error message
        console.error(`Server error: ${err}`);
        fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Server error: ${err}\n`);
        if (!res.headersSent) {
            res.status(500).send(`An error occurred on the server.`);
        }
    }

  })

  router.get('/work_and_sell', async(req,res) => {
    try {
        
        let {sess_id, rr_f, factory, hour, minute, c, rr_add, rr_id, rr, kim} = req.body
    
    
        console.log(factory)
        console.log(hour)
        console.log(minute)
        
        // mahrez
        if (!c){
            c = "6ed08bb641100b1a8dce966eff8398a9"
        }
        if (!rr_add){
            rr_add = "48e203aadfdd509cb385513ae370d368"
        }
        if (!rr_id){
            rr_id = "868625164333238"
        }
        if (!rr){
            rr = "f56a29d11b560478f71ae84d6435779c"
        } if (!kim){
            kim = "buddha"
        }
    
        console.log(`rr is: ${rr}`)
    
        const logFilePath = path.join(__dirname, 'logs', 'script_output.log');
        const errorFilePath = path.join(__dirname, 'logs', 'script_error.log');
    
        // Ensure log directory exists
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
          fs.mkdirSync(path.join(__dirname, 'logs'));
        }
    
        const cronExpression = `${minute} ${hour} * * *`;
        //const lssExpression = `${minute-2} ${hour} * * *`; // before arrive run buy lss
    
        const venvActivatePath = path.join(__dirname, './wenv/bin/activate');
        const pythonScriptPath = path.join(__dirname, './work_and_sell.py');
        const lssPath = path.join(__dirname,"./lss.py")
    
        
        const task = cron.schedule(cronExpression, () => {
    
        // (sess_id, rr_f, factory, c, rr_add, rr_id, rr)
        //const python = spawn('python3', ["./work.py", sess_id, rr_f, factory, c, rr_add, rr_id, rr])
        const python = spawn('/bin/bash', [
            '-c', 
            `. ${venvActivatePath} && python3 ${pythonScriptPath} ${sess_id} ${rr_f} ${factory} ${c} ${rr_add} ${rr_id} ${rr} ${kim}`
        ]);
    
        // Capture Python script output
        python.stdout.on('data', (data) => {
            console.log(`Python Output: ${data.toString()}`);
            fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python Output: ${data.toString()}\n`);
        });
    
        // Capture any errors from the Python script
        python.stderr.on('data', (data) => {
            //console.error(`Python Error: ${data.toString()}`);
            fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Python Error: ${data.toString()}\n`);
        });
    
        // Handle process exit
        python.on('close', (code) => {
            console.log(`Python script exited with code ${code}`);
            fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python script exited with code ${code}\n`);
            if (!res.headersSent) {
                res.status(200).send(`Python script executed successfully.`);
            }
            task.stop(); // Stop the cron job after the script has run once
        });
        })
        task.start();
        if (!res.headersSent) {
            res.status(200).send(`${task._task}`);
        }
    
    }
        catch (err) {
            // Log any unexpected errors and respond with an error message
            console.error(`Server error: ${err}`);
            fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Server error: ${err}\n`);
            if (!res.headersSent) {
                res.status(500).send(`An error occurred on the server.`);
            }
        }
  })

  router.get('/try', async(req,res) => {
      res.send("try")
  })

  router.get('/list', async(req,res) => {
    const tasks = cron.getTasks();

    let names = []
    for (let [key, value] of tasks.entries()) {
        console.log("key", key)
        names.push(key)
        console.log("value", value)
    }
    //console.log(key, value)
    res.status(200).send(`Job-list: \n${names}`)
  })  

  const axios = require('axios');
const zlib = require('zlib');
const cheerio = require('cheerio');

async function decompressResponse(response) {
    const contentEncoding = response.headers['content-encoding'];
    let decompressedContent;

    if (contentEncoding === 'gzip') {
        decompressedContent = zlib.gunzipSync(response.data);
    } else if (contentEncoding === 'deflate') {
        decompressedContent = zlib.inflateSync(response.data);
    } else {
        decompressedContent = response.data;
    }

    return decompressedContent.toString('utf-8');
}

/*async function getHTML(url, headers, cookies) {
    const response = await axios.get(url, {
        headers,
        cookies,
        responseType: 'arraybuffer'
    });
    const htmlContent = await decompressResponse(response);
    return cheerio.load(htmlContent);
}*/


async function getHTML(url, headers, cookies, data) {
    const queryString = new URLSearchParams(data).toString();
    const fullUrl = `${url}?${queryString}`; // Append `c` as query parameter

    const response = await fetch(fullUrl, {
        method: 'GET',
        headers: headers,
        credentials: 'include', // Ensures cookies are sent with the request
    });

    const htmlContent = await decompressResponse(response);
    return cheerio.load(htmlContent);
}

async function postHTML(url, headers, cookies, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        credentials: 'include',
        body: JSON.stringify(data)
    });

    const htmlContent = await decompressResponse(response);
    return cheerio.load(htmlContent);
}

async function js_job(headers, cookies, resource_id, c){
    console.log("running js_job")
    console.log(`c is ${c}`)
    const url0 = `https://rivalregions.com/storage?c=${c}`;
    const url1 = `https://rivalregions.com/storage/market/${resource_id}`;
    const url2 = `https://rivalregions.com/storage/sell/${resource_id}`;

    const $main = await getHTML(url0, headers, cookies, {'c' : c});
    console.log($main)
    const spanText = $main(`span.storage_number_change[url='${resource_id}']`).text();
    const depodaki = parseInt(spanText.replace(/\./g, ""), 10);
    console.log("Depoda bulunan:", depodaki);

    if (depodaki === 0) {
        console.log("Stop");
        process.exit(0);
    }

    let miktar;
    if (depodaki > 614400) {
        miktar = 614400;
    } else if (depodaki > 154) {
        miktar = depodaki;
    } else {
        console.log("Stop bir hata var");
        process.exit(0);
    }

    const $market = postHTML(url1, headers, cookies, { c });
    const kimin = $market("span.storage_see").eq(1).attr("action");
    const marketFiyati = parseInt($market("span.dot").eq(3).text().replace(/\./g, ""), 10);
    console.log("Guncel market fiyati:", marketFiyati);
    const ekleOrDegistir = $market("span.storage_sell.dot").text().charAt(0);

    if (ekleOrDegistir === "p" && depodaki === 0) {
        console.log("ERROR: Depo bos ve teklifte kaynak yok, program kapatiliyor...");
        console.log("Stop");
        process.exit(0);
    }

    if (kimin === "slide/profile/868625164333238" || marketFiyati < 60000) {
        console.log("En iyi fiyat bizim veya satis fiyati cok dusuk...");
    } else {
        let fiyat = marketFiyati - 1;
        console.log("Yeni fiyat ekleniyor:", fiyat);
        
        const post3Url = `https://rivalregions.com/storage/newsell/26/${miktar}/${fiyat}`;
        const post3Headers = {
            ...headers,
            'Cookie': cookies,
        };
        
        const $post3 = postHTML(post3Url, post3Headers, cookies, { c });
        console.log("Su anki saat:", new Date().toLocaleTimeString());
    }
}

async function js_job_drone(headers, cookies, resource_id, c){
    const url0 = `https://rivalregions.com/storage?c=${c}`;
    const url1 = `https://rivalregions.com/storage/market/${resource_id}`;
    const url2 = `https://rivalregions.com/storage/sell/${resource_id}`;

    const $main = await getHTML(url0, headers, cookies);
    const spanText = $main(`span.storage_number_change[url='${resource_id}']`).text();
    const depodaki = parseInt(spanText.replace(/\./g, ""), 10);
    console.log("Depoda bulunan:", depodaki);

    if (depodaki === 0) {
        console.log("Stop");
        process.exit(0);
    }

    let miktar;
    if (depodaki > 256000) {
        miktar = 256000;
    } else if (depodaki > 154) {
        miktar = depodaki;
    } else {
        console.log("Stop bir hata var");
        process.exit(0);
    }

    const $market = await postHTML(url1, headers, cookies, { c });
    const kimin = $market("span.storage_see").eq(1).attr("action");
    const marketFiyati = parseInt($market("span.dot").eq(3).text().replace(/\./g, ""), 10);
    console.log("Guncel market fiyati:", marketFiyati);
    const ekleOrDegistir = $market("span.storage_sell.dot").text().charAt(0);

    if (ekleOrDegistir === "p" && depodaki === 0) {
        console.log("ERROR: Depo bos ve teklifte kaynak yok, program kapatiliyor...");
        console.log("Stop");
        process.exit(0);
    }

    if (kimin === "slide/profile/868625164333238" || marketFiyati < 190000000) {
        console.log("En iyi fiyat bizim veya satis fiyati cok dusuk...");
    } else {
        let fiyat = marketFiyati - 1000;
        console.log("Yeni fiyat ekleniyor:", fiyat);
        
        const post3Url = `https://rivalregions.com/storage/newsell/26/${miktar}/${fiyat}`;
        const post3Headers = {
            ...headers,
            'Cookie': cookies,
        };
        
        const $post3 = await postHTML(post3Url, post3Headers, cookies, { c });
        console.log("Su anki saat:", new Date().toLocaleTimeString());
    }
}

router.post('/rv_js',  async(req,res) => {

    let {sess_id, rr_f, c, rr_add, rr_id, rr, resource_id, hour, minute, } = req.body
    
    if (!hour){
        hour = new Date().getHours()
    }
    if (!minute){
        minute = new Date().getMinutes()+1
    }
    if (!c){
        c = "6ed08bb641100b1a8dce966eff8398a9"
    }
    if (!rr_add){
        rr_add = "48e203aadfdd509cb385513ae370d368"
    }
    if (!rr_id){
        rr_id = "868625164333238"
    }
    if(!rr){
        rr = "f56a29d11b560478f71ae84d6435779c"
    }

    const logFilePath = path.join(__dirname, 'logs', 'script_output.log');
    const errorFilePath = path.join(__dirname, 'logs', 'script_error.log');

    // Ensure log directory exists
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
        fs.mkdirSync(path.join(__dirname, 'logs'));
    }

    const headers = {
        'Accept': 'text/html, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6',
        'Content-Length': '34',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': `PHPSESSID=${sess_id}; rr=${rr}; rr_id=${rr_id}; rr_add=${rr_add}; rr_f=${rr_f}`,
        'Origin': 'https://rivalregions.com',
        'Priority': 'u=1, i',
    'Referer': 'https://rivalregions.com/',
    'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    'Sec-Ch-Ua-Mobile' : '?0',
    'Sec-Ch-Ua-Platform': "Windows",
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    };
    
    const cookies = {
        PHPSESSID: sess_id,
        rr: rr,
        rr_add: rr_add,
        rr_f: rr_f,
        rr_id: rr_id,
    };


    const rv_second_task = cron.schedule('*/6 * * * *', async() => {

        await js_job(headers, cookies, resource_id, c)
    });

    // Define the second task logic (runs every 5 minutes)
    const startSecondTask = () => {
         
        try {
            rv_second_task.start();  // Start the second task
        } catch (e){

            fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Failed to start rv_second_task: ${e.toString()}\n`);
        }
        
    };

    const firstTaskExpression = `${minute} ${hour} * * *`;

    // First task logic (runs at the specified hour and minute)
    const rv_first_task = cron.schedule(firstTaskExpression, () => {
        
        js_job(headers, cookies, resource_id, c) // Call the main job to run it immeadiaately
        console.log("runned js_job")
        // Start the second task every 5 minutes
        try {
            startSecondTask();
        } catch (e) {
            fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Failed to start rv_second_task: ${e.toString()}\n`);
        }
        fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Current Cron-Jobs: ${cron.getTasks()}\n`);
        // Stop the first task after starting the second task
        rv_first_task.stop();
    });

    // Start the first task (scheduler)
    try {
        rv_first_task.start();
    } catch (e){
        fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Failed to start rv_first_task: ${e.toString()}\n`);
    }
    if (!res.headersSent) {
        res.status(200).send(`Started_rv`);
    }
})
router.post('/drone_js',  async(req,res) => {

    let {sess_id, rr_f, c, rr_add, rr_id, rr, resource_id, hour, minute, } = req.body
    
    if (!hour){
        hour = new Date().getHours()
    }
    if (!minute){
        minute = new Date().getMinutes()+1
    }
    if (!c){
        c = "6ed08bb641100b1a8dce966eff8398a9"
    }
    if (!rr_add){
        rr_add = "48e203aadfdd509cb385513ae370d368"
    }
    if (!rr_id){
        rr_id = "868625164333238"
    }
    if(!rr){
        rr = "f56a29d11b560478f71ae84d6435779c"
    }

    const logFilePath = path.join(__dirname, 'logs', 'script_output.log');
    const errorFilePath = path.join(__dirname, 'logs', 'script_error.log');

    // Ensure log directory exists
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
        fs.mkdirSync(path.join(__dirname, 'logs'));
    }

    const headers = {
        'Accept': 'text/html, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6',
        'Content-Length': '34',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': `PHPSESSID=${sess_id}; rr=${rr}; rr_id=${rr_id}; rr_add=${rr_add}; rr_f=${rr_f}`,
        'Origin': 'https://rivalregions.com',
        'Priority': 'u=1, i',
    'Referer': 'https://rivalregions.com/',
    'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    'Sec-Ch-Ua-Mobile' : '?0',
    'Sec-Ch-Ua-Platform': "Windows",
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    };
    
    const cookies = {
        PHPSESSID: sess_id,
        rr: rr,
        rr_add: rr_add,
        rr_f: rr_f,
        rr_id: rr_id,
    };


    const drone_second_task = cron.schedule('*/6 * * * *', async() => {

        await js_job_drone(headers, cookies, resource_id, c)
    });

    // Define the second task logic (runs every 5 minutes)
    const startSecondTask = () => {
         
        try {
            drone_second_task.start();  // Start the second task
        } catch (e){

            fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Failed to start drone_second_task: ${e.toString()}\n`);
        }
        
    };

    const firstTaskExpression = `${minute} ${hour} * * *`;

    // First task logic (runs at the specified hour and minute)
    const drone_first_task = cron.schedule(firstTaskExpression, async() => {
        
        await js_job(headers, cookies, resource_id, c) // Call the main job to run it immeadiaately

        // Start the second task every 5 minutes
        try {
            startSecondTask();
        } catch (e) {
            fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Failed to start drone_second_task: ${e.toString()}\n`);
        }
        fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Current Cron-Jobs: ${cron.getTasks()}\n`);
        // Stop the first task after starting the second task
        drone_first_task.stop();
    });

    // Start the first task (scheduler)
    try {
        drone_first_task.start();
    } catch (e){
        fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Failed to start drone_first_task: ${e.toString()}\n`);
    }
    if (!res.headersSent) {
        res.status(200).send(`Started_drone`);
    }
})

router.post('/auction', async(req,res) => {
 
    let { kim, to_do } = req.body;

    const logFilePath = path.join(__dirname, 'logs', 'script_output.log');
    const errorFilePath = path.join(__dirname, 'logs', 'script_error.log');

    const venvActivatePath = path.join(__dirname, './wenv/bin/activate');
    const pythonScriptPath = path.join(__dirname, './ihale.py');

    const firstTaskExpression = `3,33 * * * *`;
    
    const mainJob = () => {
        // Spawn a Python process and pass the arguments
        //const python = spawn('python3', ['./rv_sell_modified.py', sess_id, rr_f, c, rr_add, rr_id, rr]);
        const python = spawn('/bin/bash', [
            '-c', 
            `. ${venvActivatePath} && python3 ${pythonScriptPath} ${kim}`
        ]);
        

        // Capture Python script output
        python.stdout.on('data', (data) => {
            const output = data.toString();
            console.log(`Python Output: ${output}`);

            fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python Output: ${data.toString()}\n`);

        });

        // Capture any errors from the Python script
        python.stderr.on('data', (data) => {
            console.error(`Python Error: ${data.toString()}`);
            fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Python Error: ${data.toString()}\n`);
        });

        // Handle process exit
        python.on('close', (code) => {
            console.log(`Python script exited with code ${code}`);
            fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python script exited with code ${code}\n`);
            
        });
    }

    const firstTask = cron.schedule(firstTaskExpression, async () => {
        console.log(`Starting the second task.`);
        
        mainJob();
    
    })

    if (to_do == "start"){

        firstTask.start()
        console.log("auction job is started : ", firstTaskExpression)
        if (!res.headersSent){
            res.status(200).send("Started")
        }
    } else if(to_do == "stop"){

        if (firstTask.getStatus() === 'scheduled'){
            firstTask.stop()
            console.log("Job stopped")
            if (!res.headersSent){
                res.status(200).send("Stopped")
            }
        } else {
            console.log("no job is running dumbass...")
        }
        
    } else {
        console.log("errroorrrrrr.....")

    }
    

}
)





router.post('/stat', async(req,res) => {
 
        let { sess_id, rr_f, hour, minute, c, rr_add, rr_id, rr } = req.body;

    
    if (!c){
        c = "6ed08bb641100b1a8dce966eff8398a9"
    }
    if (!rr_add){
        rr_add = "48e203aadfdd509cb385513ae370d368"
    }
    if (!rr_id){
        rr_id = "868625164333238"
    }
    if(!rr){
        rr = "f56a29d11b560478f71ae84d6435779c"
    }


    if (!hour){
        hour = new Date().getHours()
    }
    if (!minute){
        minute = new Date().getMinutes()
    }

    const logFilePath = path.join(__dirname, 'logs', 'script_output.log');
    const errorFilePath = path.join(__dirname, 'logs', 'script_error.log');

    const venvActivatePath = path.join(__dirname, './wenv/bin/activate');
    const pythonScriptPath = path.join(__dirname, './stat.py');

    const firstTaskExpression = `${Number(minute)+1} ${hour} * * *`;
    console.log(firstTaskExpression)
    const mainJob = () => {
        // Spawn a Python process and pass the arguments
        //const python = spawn('python3', ['./rv_sell_modified.py', sess_id, rr_f, c, rr_add, rr_id, rr]);
        return new Promise((resolve, reject) => {

        const python = spawn('/bin/bash', [
            '-c', 
            `. ${venvActivatePath} && python3 ${pythonScriptPath} ${sess_id} ${rr_f} ${c} ${rr_add} ${rr_id} ${rr}`
        ]);
        
        let next_time = ""

        // Capture Python script output
        python.stdout.on('data', (data) => {
            next_time = data.toString();
            //console.log(`Python Output: ${output}`);

            fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python Output: ${data.toString()}\n`);
            try {
                const parsedOutput = JSON.parse(next_time);
                console.log(`Hour: ${parsedOutput.hour}, Minute: ${parsedOutput.minute}`);
                
                // Now you can use parsedOutput.hour and parsedOutput.minute as needed
                fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python Output: Hour: ${parsedOutput.hour}, Minute: ${parsedOutput.minute}\n`);
                resolve(parsedOutput);

            } catch (error) {
                console.error('Error parsing Python output:', error);
                reject(error);

            }
        
            
        });

        // Capture any errors from the Python script
        python.stderr.on('data', (data) => {
            console.error(`Python Error: ${data.toString()}`);
            fs.appendFileSync(errorFilePath, `${new Date().toISOString()} -> Python Error: ${data.toString()}\n`);
        });

        // Handle process exit
        python.on('close', (code) => {
            console.log(`Python script exited with code ${code}`);
            fs.appendFileSync(logFilePath, `${new Date().toISOString()} -> Python script exited with code ${code}\n`);
            if (code == 0 && !res.headersSent){

                res.status(200).send("done")
            }
        });
    })
    }

    /*async function scheduleRecursiveTask(hour, minute) {
        const recursiveCronExpression = `${minute} ${hour} * * *`;
        console.log(`Scheduling mainJob recursively with expression: ${recursiveCronExpression}`);
    
        const task = cron.schedule(recursiveCronExpression, async () => {
            try {
                // Run the main job and wait for its result
                const next_time = await mainJob();
    
                // Stop the current task after running
                task.stop();
    
                // Recursively schedule the next run
                if (next_time && next_time.hour !== undefined && next_time.minute !== undefined) {
                    if (Number(next_time.minute) +1 == 60){
                        next_time.minute = 1
                        next_time.hour += 1
                    }
                    scheduleRecursiveTask(next_time.hour, Number(next_time.minute)+1);
                } else {
                    console.error('Invalid next_time received from mainJob:', next_time);
                }
            } catch (error) {
                console.error('Error in recursive mainJob:', error);
            }
        });
    
        task.start();
    }*/
   async function scheduleRecursiveTask(hour, minute) {
        // build Date object for target time
        let now = new Date();
        let target = new Date();
        target.setHours(hour, minute, 0, 0);
    
        // if target already passed, move to tomorrow
        if (target <= now) {
            target.setDate(target.getDate() + 1);
        }
    
        // extract final hour/minute for cron
        let finalHour = target.getHours();
        let finalMinute = target.getMinutes();
    
        const recursiveCronExpression = `${finalMinute} ${finalHour} * * *`;
        console.log(`Scheduling mainJob with expression: ${recursiveCronExpression} on ${target}`);
    
        const task = cron.schedule(recursiveCronExpression, async () => {
            try {
                const next_time = await mainJob();
                task.stop();
    
                if (next_time && next_time.hour !== undefined && next_time.minute !== undefined) {
                    scheduleRecursiveTask(next_time.hour, next_time.minute);
                } else {
                    console.error('Invalid next_time received from mainJob:', next_time);
                }
            } catch (error) {
                console.error('Error in recursive mainJob:', error);
            }
        });
    
        task.start();
    }
    
    // First task logic (runs at the specified hour and minute)
    const firstTask = cron.schedule(firstTaskExpression, async () => {
        console.log(`Starting the second task.`);
    
        try {
            // Call the main job and wait for its result
            const next_time = await mainJob();
    
            // Recursively schedule the next task based on the returned hour and minute
            if (next_time && next_time.hour !== undefined && next_time.minute !== undefined) {
                scheduleRecursiveTask(next_time.hour, next_time.minute);
            } else {
                console.error('Invalid next_time received from mainJob:', next_time);
            }
    
            // Log the current cron jobs
            fs.appendFileSync(
                logFilePath,
                `${new Date().toISOString()} -> Current Cron-Jobs: ${cron.getTasks()}\n`
            );
        } catch (error) {
            console.error('Error in first task:', error);
        }
    
        // Stop the first task
        firstTask.stop();
    });
    
    // Start the first task (scheduler)
    firstTask.start();
    
    console.log("the task setted")
    if (!res.headersSent) {
        res.status(200).send(`Started`);
    }
})

  app.use('/api', router)

