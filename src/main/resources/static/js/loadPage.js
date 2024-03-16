window.addEventListener('load', () => {
    if(localStorage.getItem('uniqueId') === null) {
        localStorage.setItem('uniqueId', generateUniqueId());
    }
});

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}