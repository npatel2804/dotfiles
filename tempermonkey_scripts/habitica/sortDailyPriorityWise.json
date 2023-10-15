// ==UserScript==
// @name        sortDailyPriorityWise
// @version     1.1.0
// @description Creates a timer on a pomodoro task
// @include     http*://habitica.com*
// @run-at 	 document-idle
// @author      Nikhil Patel
// ==/UserScript==

//debugger;
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



    /**
     * Get task with title #pomodoro
     * @returns { HTMLDivElement } habit task
     */
    function getPomodoroTask() {
        // Get all the task elements within the sortable-tasks container
        const taskElements = Array.from(document.querySelectorAll('.daily .sortable-tasks .task-wrapper'));
        let taskLoaded = false
        if (taskElements.length > 0) {
        taskLoaded = true
        }
        // Define a custom comparison function based on the text content of the <p> tag
        const compareFunction = (a, b) => {
            // Find the <p> tag within the task-notes element of each task element
            const notesA = a.querySelector('.task-notes p').textContent;
            const notesB = b.querySelector('.task-notes p').textContent;
            console.log(notesA)
            console.log(notesB)
            // Parse the text content to datetime
            const currentDate = new Date();
            const dateA = new Date(currentDate.toDateString() + ' ' + notesA);
            const dateB = new Date(currentDate.toDateString() + ' ' + notesB);
            // Compare the datetime values
            return dateA - dateB;

        };

        // Sort the taskElements array using the custom comparison function
        taskElements.sort(compareFunction);

        // Now, taskElements contains the sorted task elements
        // You can append them back to the container in the desired order
        const sortableTasksContainer = document.querySelector('.daily .sortable-tasks');
        sortableTasksContainer.innerHTML = ''; // Clear the container
        taskElements.forEach((taskElement) => {
            sortableTasksContainer.appendChild(taskElement);
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
