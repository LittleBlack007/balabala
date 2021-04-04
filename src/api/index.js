/*
    功能：
    使用封装好的ajax发送各种请求
    每个函数返回的是promise
*/
import ajax from './ajax';

//更新数据库照片url（data={id=xxxxx,xxxImg:xxxxx}）
export const updatePicUrl = (api,data) => ajax(api,data,"POST")


/**
 * 广告
*/
export const getAdvertisements = (pageNum=1,title='',status=1) => ajax("/advertisement/get-advertisement",{pageNum,title,status});



//普通用户登录
export const reqLogin = user => ajax("/user/login",user,'POST')
//更新用户信息
export const updateUser = user => ajax("/user/update-user",user,"POST");
//通过id查询用户信息
export const getUserById = id => ajax("/user/getUserById",{id:id})
//通过ids查询用户
export const getUserByIds = ids => ajax("/user/getUserByIds",ids,"POST")
//注册用户
export const registerUser = user => ajax("/user/register",user, "POST")


/**
 * 公司接口
 * */
//登陆
export const reqCompanyLogin = company => ajax("/company/login",company,"POST");
//更新公司信息
export const updateCompany = company => ajax("/company/update-company",company,"POST");
//注册
export const registerCompany = company => ajax('/company/register',company,"POST");
//查询好公司
export const getGoddCompany = (pageNum=1,orderRatedStatus=null,companyName='') => ajax("/company/get-good-company",{pageNum,orderRatedStatus,companyName});
//查询所有公司
export const getCompany = (pageNum=1,companyName='') =>ajax("/company/get-company",{pageNum,companyName})
//通过id查询公司
export const getCompanyById = id =>ajax("/company/get-company-by-id",{id})


/**
 * 员工接口
*/
//登陆
export const reqStaffLogin = staff => ajax("/staff/login",staff,"POST")
//更新员工信息
export const updateStaff = staff => ajax("/staff/update-staff",staff,"POST")
//注册接口
export const registerStaff = staff => ajax("/staff/register",staff,"POST")
//查询好公司
export const getGoodStaff = (pageNum=1,orderRatedStatus=null,staffCity='') => ajax("/staff/get-good-staff",{pageNum,orderRatedStatus,staffCity});
//通过id查找员工
export const getStaffById = id => ajax('/staff/get-staff-by-id',{id});
//通过公司id查询所有员工卡片，包含订单数，职业/get-staff-by-company-id
export const getGoodStaffByCompanyId = (pageNum=1,companyId=null) => ajax('/staff/get-staff-by-company-id',{pageNum,companyId});

/**
 * 帖子接口
*/
//通过板块和用户和帖子标题查询帖子，传空查所有
export const getPostAndUserByTNT = (pageNum=1,typeId=0,userName='',postTitle='') => ajax('/post/get-post-and-user-by-TNT',{pageNum,typeId,userName,postTitle});
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
//更新帖子收藏数
export const updatePostCommentNum = (id,count) => ajax("/post/update-post",{id:id,postComNum:count},"POST");
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
export const getCommentUserByPostId = (pageNum=1,postId) => ajax('/comment/get-user-comment-by-postId',{pageNum,postId});
//添加评论
export const addComment = comment => ajax("/comment/create",comment,"POST");

/**
 * 关注接口
*/
//通过userId查询所有个人关注帖子
export const getCollectionByUserId = userId => ajax("/collection/getCollectionByUserId",{userId:userId});
//取消关注
export const cancelCollection = id => ajax('/collection/deleteCollection',{id});
//添加关注
export const addCollection = collection => ajax('/collection/create',collection,"POST")
//查询收藏的id
export const getCollectionId = (userId,postId) => ajax('/collection/get-collectionId-by-uid-pid',{userId,postId});

/**
 * 点赞接口
*/
//取消关注
export const cancelLike = id => ajax('/like/deleteLike',{id});
//添加关注
export const addLike = like => ajax('/like/create',like,"POST")
//查询收藏的id
export const getLikeId = (userId,postId) => ajax('/like/get-like-by-uid-pid',{userId,postId});


/**
 * 订单
*/
//查询总订单数/get-total-order-num
export const getOrderTotalNum = (companyId=null,startDate=null,endDate=null) => ajax('/order/get-total-order-num',{companyId,startDate,endDate});
//查询总好评数/get-total-order-num
export const getOrderTotalGoodNum = (companyId=null,startDate=null,endDate=null,orderRatedStatus=null) => ajax('/order/get-total-order-good-num',{companyId,startDate,endDate,orderRatedStatus});
//查询员工的订单数和好评数
export const getTotalOrderGoodNumForStaff = (staffId=null,orderRatedStatus=null) => ajax('/order/get-total-order-good-num-for-staff',{staffId,orderRatedStatus});
//查询订单 可传入用户id，员工id，订单类型，订单状态，不传则查询全部
export const  getOrderUserStaffByUSTS = (pageNum=1,userId=null,staffId=null,orderType='',orderStatus=null) => ajax("/order//get-order-user-by-USTS",{pageNum,userId,staffId,orderType,orderStatus})
/**
 * 案例
*/
//查询所有案例
export const getCases = (pageNum=1,title='') => ajax("/case/get-case",{pageNum,title});
//通过公司id查询案例/get-case-by-companyId
export const getCasesByCompanyId = (pageNum=1,companyId) => ajax("/case/get-case-by-companyId",{pageNum,companyId});
//通过员工id查询案例
export const getCaseByStaffId = (pageNum=1,staffId) => ajax('/case/get-case-by-staffId',{pageNum,staffId});
//通过id查看案例信息
export const getCaseById = id => ajax('/case/get-case-by-id',{id});
/**
 * 评价
*/
//根据评价等级和staffid查询评价+user信息
export const getRateUser = (pageNum=1,staffId=null,rateGrade=null) => ajax('/rate/get-rate-user',{pageNum,staffId,rateGrade});

/**
 * 订单
*/
//添加订单
export const addOrder = order => ajax('/order/add-order',order,"POST");


