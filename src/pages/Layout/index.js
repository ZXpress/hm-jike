import { Layout, Menu, Popconfirm, message } from 'antd'
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user'
import { useDispatch, useSelector } from 'react-redux'

const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />
  }
]

const GeekLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const name = useSelector((state) => state.user.userInfo.name)
  const menuClick = (route) => {
    navigate(route.key)
  }
  // 高亮菜单
  const location = useLocation()
  const selectedKey = location.pathname

  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  // 退出
  const onConfirm = () => {
    dispatch(clearUserInfo())
    navigate('/login')
    message.success('退出成功')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu mode="inline" onClick={menuClick} theme="dark" selectedKeys={selectedKey} items={items} style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout
