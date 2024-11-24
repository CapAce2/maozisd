// 用户数据管理
const UserManager = {
    // 获取所有用户
    getUsers() {
        return JSON.parse(localStorage.getItem('users')) || {
            'Admin': {
                password: '123456',
                type: 'admin',
                registerDate: '2024-03-21'
            }
        };
    },

    // 保存用户数据
    saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    },

    // 初始化
    init() {
        const users = this.getUsers();
        this.saveUsers(users);
    }
};

// 初始化用户数据
UserManager.init();
