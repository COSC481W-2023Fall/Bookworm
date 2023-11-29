import { ConfigProvider, Typography } from 'antd';

function Footer(): JSX.Element {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FEC80B'
        }
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 450
        }}
      >
        <a
          href='https://www.flaticon.com/free-icons/book'
          title='book icons'
          style={{ textAlign: 'center' }}
        >
          <Typography.Link>
            Book icons created by Smashicons - Flaticon
          </Typography.Link>
        </a>
      </div>
    </ConfigProvider>
  );
}

export default Footer;
