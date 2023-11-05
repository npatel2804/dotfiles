// ==UserScript== 
// @name        hideNotTodayTODOs
// @version     1.1.0 
// @description Creates a timer on a pomodoro task 
// @include     http*://habitica.com* 
// @run-at 	 document-idle 
// @author      Nikhil Patel
// ==/UserScript== 

debugger;
(function () {
    'use strict';

    /**
     * Logs a message and objects passed as arguments
     */
    function logs() {
        const [message, ...details] = [...arguments];
        const warning = details.reduce((parsedObject, object) => ({ ...parsedObject, ...object }), {});
        console.warn({ message, ...warning });
    }

    /**
     * Wait for the existance of a value
     * @param { function } getValueFunction function that returns the value
     * @param { number } time wait time before trying again
     * @param { number } maxTries max tries before stop waiting
     * @returns { Promise }
     */
    function waitForExistance(getValueFunction, time = 200, maxTries = 10) {
        return new Promise((resolve, reject) => {
            let tries = 0;
            let interval = setInterval(() => {
                const value = getValueFunction();
                if (!value) {
                    tries += 1;
                    return
                }

                if (tries >= maxTries) {
                    logs(`No value was found after ${tries} tries`, { getValueFunction });
                    clearInterval(interval);
                    return reject(null)
                }

                clearInterval(interval);
                return resolve(value)
            }, time);
        })
    }


    function isDateInPastOrNullOrFalse(inputString) {
        // Use a regular expression to find a date in the format MM/DD/YYYY
        const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/;
        const dateMatch = inputString.match(dateRegex);
        console.log("In dateMatch")
        console.log(dateMatch)

        if (dateMatch) {
            // If a date is found, parse it into a JavaScript Date object
            const date = new Date(dateMatch[0]);
            const currentDate = new Date();

            if (date < currentDate) {
                // Date is in the past, return true
                return true;
            } else {
                // Date is in the future, return false
                return false;
            }
        } else {
            // If no date is found, return null
            return null;
        }
    }

    /**
     * Get task with title #pomodoro
     * @returns { HTMLDivElement } habit task
     */
    function getPomodoroTask() {
        const habitTasks = Array.from(document.querySelectorAll('.task.type_todo'));
        let taskLoaded = false
        const pomodoroTask = habitTasks.find(task => {
            const text = task.querySelector('.task-content')
            if ((!text.outerText.includes("\nToday")) && !isDateInPastOrNullOrFalse(text.outerText)) {
                task.style.display = 'none';
                console.log(text.outerText)
            }
            taskLoaded = true
            return false
        });

        return taskLoaded

    }


    /**
     * Execute this script
     */
    async function main() {
        try {
            logs('Starting habiticaPomodoro script');
            const pomodoroTask = await waitForExistance(getPomodoroTask);
            //createSoundPlayer(['Todo', 'Chat']);
            // convertTask(pomodoroTask);
        } catch (error) {
            logs('Error on habiticaPomodoro.user.js', { error });
        }
    }
    main();

}());
