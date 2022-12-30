import { v4 as uuidv4 } from 'uuid';
import { UserType } from '../types/userType.js';

class UsersService {
  usersList: UserType[];

  constructor() {
    this.usersList = [];
  }

  _getAutoSuggestUsers(loginSubstring: string, limit: number) {
    return this.usersList.filter((item) => item.login.includes(loginSubstring)).slice(0, limit);
  }

  getAllUsers(query: any) {
    const { loginSubstring, limit } = query;

    if (loginSubstring && limit) {
      return this._getAutoSuggestUsers(loginSubstring, limit);
    }

    return this.usersList;
  }

  getUser(id: string) {
    return this.usersList.find((user) => user.id === id);
  }

  createUser(user: UserType) {
    const newUser = {
      ...user,
      id: uuidv4(),
      isDeleted: false,
    };
    return (this.usersList = [...this.usersList, newUser]);
  }

  updateUser(currentUser: UserType) {
    return (this.usersList = this.usersList.map((user) => {
      if (user.id === currentUser.id) {
        return { ...user, ...currentUser };
      }
      return user;
    }));
  }

  deleteUser(id: string) {
    return (this.usersList = this.usersList.map((user) => {
      if (user.id === id) {
        return { ...user, isDeleted: true };
      }
      return user;
    }));
  }
}

export default new UsersService();
