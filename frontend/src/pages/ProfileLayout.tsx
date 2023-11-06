import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../components/Avatar';
import Navbar from '../components/Navbar';
import EditProfile from './EditProfile';
import SetPassword from './SetPassword';
import useAuth from './UserAuth';


const { Content, Sider} = Layout;

function ProfileLayout(): JSX.Element {

    // `auth`: Represents the authentication status.
    // `username`: Represents the username associated with the authenticated user.
    // `handleSignout`: Function to handle the signout action.
    const { auth, username, handleSignout } = useAuth();


    // 'current': Represents the current state and is initially set to '1'
    // 'setCurrent': Funciton to update the 'current' state
    const [current, setCurrent] = useState('1');

    const navigate = useNavigate();


    /**
     * Click even handler for the Menu component.
     * @param {Object} e - The click even object
     */
    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };


    /**
     * Function that switches between components based on a given key.
     * @param {String} key - The key used to determine the component to render.
     * @return {JSX.Element | null}  The JSX representation of the selected component.
     */
    const componentsSwtich = (key:String) => {
        switch (key) {
            case '1':
                return (<EditProfile />);
            case '2':
                return (<SetPassword />);
            case '3':
                navigate('/bookshelf'); // Redirect to the sign-in page
            default:
                break;
            }
    }


    // Menu items configuration for rendering a menu.Each item has a label and a key.
    const items: MenuProps['items'] = [
        {
            label: "Edit Profile",
            key: '1',
        },
        {
            label: "Set Password",
            key: '2',
        },
        {
            label: "Bookshelf",
            key: '3',
        }

    ]


    return (
    <Layout style= {{background:'none', padding:'0 50px'}}>
        <Navbar auth={auth} username={username} handleSignout={handleSignout} />
        <Layout style = {{background:"none", padding: '10px 0'}}>
            <Sider style = {{background:"none"}} >
                <UserAvatar />
                <Menu onClick={onClick} selectedKeys={[current]} items={items} />
            </Sider>

            <Content
                style={{
                margin: '0 16px',
                padding: '0',
                minHeight:280,
                background: 'none',
                justifyContent: 'center',
                textAlign: 'center'
                }}>
                {componentsSwtich(current)}
            </Content>
        </Layout>
    </Layout>
    );
}
export default ProfileLayout;
