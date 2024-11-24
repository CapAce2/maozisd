// 用户数据管理
const UserManager = {
    // JSONBin 配置
    config: {
        binId: '67428dc9acd3cb34a8adbee7',
        apiKey: '$2a$10$RgEhjqeqmWDCMYTpIQG95eldbefxUbrCbZ8JFtEvwdmZYKd75Ahj.',
        baseURL: 'https://api.jsonbin.io/v3/b'
    },

    // 获取所有用户
    async getUsers() {
        try {
            const response = await fetch(`${this.config.baseURL}/${this.config.binId}/latest`, {
                method: 'GET',
                headers: {
                    'X-Master-Key': this.config.apiKey,
                    'X-Access-Key': this.config.apiKey,
                    'Content-Type': 'application/json',
                    'X-Bin-Meta': 'false'
                },
                mode: 'cors'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data || {
                'Admin': {
                    password: '123456',
                    type: 'admin',
                    registerDate: '2024-03-21'
                }
            };
        } catch (error) {
            console.error('获取用户数据失败:', error);
            // 如果远程获取失败，尝试从本地获取
            const localUsers = localStorage.getItem('users');
            return localUsers ? JSON.parse(localUsers) : {
                'Admin': {
                    password: '123456',
                    type: 'admin',
                    registerDate: '2024-03-21'
                }
            };
        }
    },

    // 保存用户数据
    async saveUsers(users) {
        try {
            const response = await fetch(`${this.config.baseURL}/${this.config.binId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': this.config.apiKey,
                    'X-Access-Key': this.config.apiKey,
                    'X-Bin-Meta': 'false'
                },
                mode: 'cors',
                body: JSON.stringify(users)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 同时更新本地存储
            localStorage.setItem('users', JSON.stringify(users));
        } catch (error) {
            console.error('保存用户数据失败:', error);
            // 如果远程保存失败，保存到本地
            localStorage.setItem('users', JSON.stringify(users));
        }
    },

    // 初始化
    async init() {
        try {
            const users = await this.getUsers();
            await this.saveUsers(users);
        } catch (error) {
            console.error('初始化失败:', error);
            // 如果初始化失败，至少确保本地有默认数据
            const defaultUsers = {
                'Admin': {
                    password: '123456',
                    type: 'admin',
                    registerDate: '2024-03-21'
                }
            };
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }
    }
};

// 初始化用户数据
UserManager.init().catch(console.error);
