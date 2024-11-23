// 用户数据存储
let users = JSON.parse(localStorage.getItem('users')) || {
    'Admin': {
        password: '123456',
        type: 'admin',
        registerDate: '2024-03-21'
    }
};

// 保存用户数据到本地存储
localStorage.setItem('users', JSON.stringify(users));
