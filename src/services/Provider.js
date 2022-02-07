const BASE_SERVER_URL = "http://localhost:4000";
const USERS_PATH = BASE_SERVER_URL + "/users";
const BOOKS_PATH = BASE_SERVER_URL + "/books";

export function fetchUsers() {
    return fetch(USERS_PATH)
        .then(response => response.json())
        .catch(error => handleError(error));
}

export function fetchBooks(bookIds) {
    let booksPath = BOOKS_PATH;
    if (bookIds && bookIds.length > 0) {
        booksPath += "?" + bookIds.map(id => "id=" + id).join("&")
    }
    return fetch(booksPath)
            .then(response => response.json())
            .catch(error => handleError(error));
}

export function deleteUser(id) {
    const userPath = USERS_PATH + "/" + id;
    return fetch(userPath, {method: 'DELETE'})
        .then(response => response.json())
        .catch(error => handleError(error));
}

export function updateUser(newUser) {
    const userPath = USERS_PATH + "/" + newUser.id;
    return fetch(userPath, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newUser)
    })
        .then(response => response.json())
        .catch(error => handleError(error));
}

export function addNewUser(newUser) {
    return fetch(USERS_PATH, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newUser)
    })
        .then(response => response.json())
        .catch(error => handleError(error));
}

function handleError(error) {
    console.log(error);
}