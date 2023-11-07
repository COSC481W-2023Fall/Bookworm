import { Descriptions, DescriptionsProps, Space, Typography } from 'antd';
import useAuth from './UserAuth';

const { Link, Title } = Typography;

function ShowProfile(): JSX.Element {
    const { auth } = useAuth();

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'UserName',
            children: 'Zhou Maomao',
        },
        {
            key: '2',
            label: 'Email',
            children: 'lucy@hotmail.com',
        },
        {
            key: '3',
            label: 'Age',
            children: '56',
        },
        {
            key: '4',
            label: 'Address',
            children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
        },
    ];

    const items1: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'About me',
            children: 'I was born and raised in New England, where bedtime stories gave him a love of books. He went on to study journalism and literature at Fitchburg State College, wrote screenplays in Los Angeles, and eventually found his niche in the fantasy genre, returning to the stories of his youth.',
        },
        {
            key: '2',
            label: 'Genre',
            children: 'Mystery, History, Fantasy',
        },
    ];
    return (
        <div>
            <Space direction="horizontal">
                <Title level={2}>Lucy</Title>
                {auth && <Link href='./profile' >
                    [Edit Profile]
                </Link>}
            </Space>
            {auth && <Descriptions items={items} contentStyle = {{font: '1.3em inter', textAlign: 'left'}} labelStyle={{color: 'black',font: 'bold 1.3em inter'}}/>}
            <Descriptions column={1} items={items1} contentStyle = {{font: '1.3em inter', textAlign: 'left'}} labelStyle={{color: 'black',font: 'bold 1.3em inter'}} />
        </div>
    )
}


export default ShowProfile;