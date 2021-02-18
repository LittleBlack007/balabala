import {HomeOutlined, AppstoreOutlined, BarChartOutlined,ToolOutlined,
    SafetyOutlined, AreaChartOutlined, BarsOutlined, LineChartOutlined, 
    PieChartOutlined,UserOutlined,
} from '@ant-design/icons'

const menuList = [
    { 
        title: '首页', // 菜单标题名称 
        key: '/page/home', // 对应的 path 
        icon: <HomeOutlined />, // 图标名称 
    },
    { 
        title: '商品', 
        key: '/page/products', 
        icon: <AppstoreOutlined />, 
        children: [ // 子菜单列表 
            { 
                title: '品类管理', 
                key: '/page/products/category', 
                icon: <BarsOutlined /> 
            },
            { 
                title: '商品管理', 
                key: '/page/products/manage', 
                icon: <ToolOutlined /> 
            }, 
        ] 
    },
    { 
        title: '用户管理', 
        key: '/page/user', 
        icon: <UserOutlined /> 
    },
    { 
        title: '角色管理', 
        key: '/page/role', 
        icon: <SafetyOutlined />, 
    },
    {
        title: '图形图表', 
        key: '/page/charts', 
        icon: <AreaChartOutlined />, 
        children: [ 
            { 
                title: '柱形图', 
                key: '/page/charts/bar', 
                icon: <BarChartOutlined /> 
            },
            { 
                title: '折线图', 
                key: '/page/charts/line', 
                icon: <LineChartOutlined /> 
            },
            { 
                title: '饼图', 
                key: '/page/charts/pie', 
                icon: <PieChartOutlined />
                 
            }, 
        ] 
    }, 
]

export default menuList;