import store from 'store';

export default {
    //保存用户信息到localStroage
    saveUser(user){
        // localStroage 只能保存 string, 如果传递是对象, 会自动调用对象的 toString()并保存 //localStorage.setItem(USER_KEY, JSON.stringify(user)) 
        // 保存的必须是对象的 json 串
        store.set("user",user); //内部自动转换成json对象
    },
    //查找localStroage中的对象
    getUser(){
        return store.get('user') || {}
    },
    //删除用户（退出登录）
    removeUser(){
        store.remove("user")
    },

    saveStaff(staff){
        // localStroage 只能保存 string, 如果传递是对象, 会自动调用对象的 toString()并保存 //localStorage.setItem(USER_KEY, JSON.stringify(user)) 
        // 保存的必须是对象的 json 串
        store.set("staff",staff); //内部自动转换成json对象
    },
    //查找localStroage中的对象
    getStaff(){
        return store.get('staff') || {}
    },
    //删除员工（退出登录）
    removeStaff(){
        store.remove("staff")
    },

    saveCompany(company){
        // localStroage 只能保存 string, 如果传递是对象, 会自动调用对象的 toString()并保存 //localStorage.setItem(USER_KEY, JSON.stringify(user)) 
        // 保存的必须是对象的 json 串
        store.set("company",company); //内部自动转换成json对象
    },
    //查找localStroage中的对象
    getCompany(){
        return store.get('company') || {}
    },
    //删除公司账号（退出登录）
    removeCompany(){
        store.remove("company")
    }
}