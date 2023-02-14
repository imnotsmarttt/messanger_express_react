export const getCompanion = (currentUsername, users) => {
    return users[0].username === currentUsername ? users[1].username : users[0].username
}