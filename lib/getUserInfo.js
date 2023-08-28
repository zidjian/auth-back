function getUserInfo(user) {
    return {
        id: user.id,
        name: user.name,
        user: user.user,
    };
}

module.exports = getUserInfo;
