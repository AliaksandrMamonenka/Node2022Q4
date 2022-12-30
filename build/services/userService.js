import { v4 as uuidv4 } from 'uuid';
class UsersService {
    constructor() {
        this.usersList = [];
    }
    _getAutoSuggestUsers(loginSubstring, limit) {
        return this.usersList.filter((item) => item.login.includes(loginSubstring)).slice(0, limit);
    }
    getAllUsers(query) {
        const { loginSubstring, limit } = query;
        if (loginSubstring && limit) {
            return this._getAutoSuggestUsers(loginSubstring, limit);
        }
        return this.usersList;
    }
    getUser(id) {
        return this.usersList.find((user) => user.id === id);
    }
    createUser(user) {
        const newUser = {
            ...user,
            id: uuidv4(),
            isDeleted: false,
        };
        return (this.usersList = [...this.usersList, newUser]);
    }
    updateUser(currentUser) {
        return (this.usersList = this.usersList.map((user) => {
            if (user.id === currentUser.id) {
                return { ...user, ...currentUser };
            }
            return user;
        }));
    }
    deleteUser(id) {
        return (this.usersList = this.usersList.map((user) => {
            if (user.id === id) {
                return { ...user, isDeleted: true };
            }
            return user;
        }));
    }
}
export default new UsersService();
//# sourceMappingURL=userService.js.map