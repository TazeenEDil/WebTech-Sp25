function loadTask(taskUrl) {
    const taskFrame = document.getElementById('taskFrame');
    taskFrame.src = taskUrl;
    
    taskFrame.onload = function() {
        console.log('Task loaded successfully');
    };
    
    taskFrame.onerror = function() {
        console.error('Failed to load task');
        
    };
}

