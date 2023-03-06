
export  function debounce(func, wait) {
    let timeout;
    try {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    } catch (e) {
        console.log('error');
        console.log(e);
    }
};