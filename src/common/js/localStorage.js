export function storage(name) {
    return {
        save(val) {
            window.localStorage.setItem(name, JSON.stringify(val));
        },
        fetch() {
            return JSON.parse(window.localStorage.getItem(name) || '[]');
        }
    };
}
