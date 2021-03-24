/*
    功能：
    使用封装好的ajax发送各种请求
    每个函数返回的是promise
*/
import ajax from './ajax';

//更新数据库照片url（data={id=xxxxx,xxxImg:xxxxx}）
export const updatePicUrl = (api,data) => ajax(api,data,"POST")

//普通用户登录
export const reqLogin = user => ajax("/user/login",user,'POST')
//更新用户信息
export const updateUser = user => ajax("/user/update-user",user,"POST");
//通过id查询用户信息
export const getUserById = id => ajax("/user/getUserById",{id:id})
//通过ids查询用户
export const getUserByIds = ids => ajax("/user/getUserByIds",ids,"POST")


/**
 * 公司接口
 * */
//登陆
export const reqCompanyLogin = company => ajax("/company/login",company,"POST");
//更新公司信息
export const updateCompany = company => ajax("/company/update-company",company,"POST");

/**
 * 员工接口
*/
//登陆
export const reqStaffLogin = staff => ajax("/staff/login",staff,"POST")
//更新员工信息
export const updateStaff = staff => ajax("/staff/update-staff",staff,"POST")

/**
 * 帖子接口
*/
//查询帖子所有分类
export const getPostType = (pageNum=1,pageSize=10,postTypeName="") => ajax("/post-type/get-postType",{pageNum:pageNum,pageSize:pageSize,postTypeName:postTypeName})
//按title查询所有帖子
export const getPostByTitle = (pageNum,title="") => ajax("/post/get-post",{pageNum:pageNum,postName:title})
//按typeId查询
export const getPostByTypeId = (pageNum,typeId) => ajax("/post/get-postByTypeId",{pageNum:pageNum,typeId:typeId})
//按照userId查询
export const getPostByUserId = (pageNum,userId) => ajax("/post/get-postByUserId",{pageNum:pageNum,userId:userId})
//按ids查询返回用户信息跟post的连表查询
export const getPostUserByIds = ids => ajax("/post/getPostUserByIds",ids,"POST")
//按typeid查询返回用户信息跟post的连表查询
export const getPostUserByTypeId = (pageNum,typeId) => ajax("/post/getPostUserByTypeId",{pageNum:pageNum,typeId:typeId})
//创建帖子
export const creatPost = post => ajax("/post/create",post,"POST");
//删除帖子
export const deletePost = id => ajax("/post/deleteById",{postId:id}) 
//更新帖子浏览数
export const updatePostViewed = (id,count) => ajax("/post/update-post",{id:id,postViewed:count},"POST");
//更新帖子点赞数
export const updatePostLikes = (id,count) => ajax("/post/update-post",{id:id,postLikesNum:count},"POST");
//按照userId查询
export const getPostUserById = id => ajax("/post/get-postUserById",{postId:id})
//通过id查询帖子
export const getPostById = id => ajax("/post/get-postById",{postId:id})


/**
 * 评论接口
*/
//创建评价
//删除评价
//查询个人所有评价
export const getCommentByUserId = (pageNum,id) => ajax('/comment/get-CommentByUserId',{pageNum:pageNum,userId:id})
//查询post的评价


/**
 * 关注接口
*/
//通过userId查询所有个人关注帖子
export const getCollectionByUserId = userId => ajax("/collection/getCollectionByUserId",{userId:userId});