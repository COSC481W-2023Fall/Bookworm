import { UploadOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Image, Layout, Menu, Upload } from 'antd';
import { useState } from 'react';
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
        }
    ]

    return (
    <Layout style= {{background:'none', padding:'0 50px'}}>
        <Navbar auth={auth} username={username} handleSignout={handleSignout} />
        <Layout style = {{background:"none", padding: '10px 0'}}>
            <Sider style = {{background:"none"}} >
                <Image style = {{padding: '20px 0'}}
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
                <Upload>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
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
                }}
            >
                {componentsSwtich(current)}
            </Content>
        </Layout>
    </Layout>
    );
}
export default ProfileLayout;
