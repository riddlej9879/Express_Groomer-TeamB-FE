import React from 'react';
import { ProfileFormGR } from '../ProfileFormGR';
import { Button, Layout, Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './groomer.css';
import Services from './ServicesArea';

const GroomerProfilePage = props => {
  const {
    userInfo,
    isRegistered,
    groomerInfo,
    showForm,
    toggleForm,
    setShowForm,
  } = props;

  return (
    <div>
      {showForm ? (
        <ProfileFormGR
          groomerInfo={groomerInfo}
          isRegistered={isRegistered}
          userInfo={userInfo}
          setShowForm={setShowForm}
        />
      ) : null}
      <Layout.Content
        style={{
          background: 'white',
          width: '75%',
          margin: '20px auto',
          padding: '10px',
        }}
      >
        <div className="avatar">
          <Avatar size={74} icon={<UserOutlined />} />
        </div>

        <div className="customer-header">
          <p className="heading">
            {' '}
            {groomerInfo.given_name
              ? groomerInfo.given_name
              : userInfo.given_name}{' '}
          </p>

          <Button type="primary" onClick={() => toggleForm()}>
            {showForm ? 'Close Form' : 'Update Profile'}
          </Button>
        </div>
        <div className="customer-info-box">
          <div className="panel">
            <Divider style={{ borderColor: 'lightblue' }}>
              Personal Info
            </Divider>
            <div className="panel-info">
              <p>
                First Name:{' '}
                {groomerInfo.given_name
                  ? groomerInfo.given_name
                  : userInfo.given_name}
              </p>
              <p>
                Last Name:{' '}
                {groomerInfo.family_name
                  ? groomerInfo.family_name
                  : userInfo.family_name}
              </p>
              <p>Email: {userInfo.email}</p>
              <p>
                Phone Number:{' '}
                {groomerInfo.phone_number
                  ? groomerInfo.phone_number
                  : 'Update your profile'}
              </p>
            </div>
          </div>
          <div className="panel">
            <Divider style={{ borderColor: 'lightblue' }}>Address</Divider>
            <div className="panel-info">
              <p>
                Address:{' '}
                {groomerInfo.address
                  ? groomerInfo.address
                  : 'Update your profile'}
              </p>
              <p>
                City:{' '}
                {groomerInfo.city ? groomerInfo.city : 'Update your profile'}
              </p>
              <p>
                State:{' '}
                {groomerInfo.state ? groomerInfo.state : 'Update your profile'}
              </p>
              <p>
                Zip Code:{' '}
                {groomerInfo.zip_code
                  ? groomerInfo.zip_code
                  : 'Update your profile'}
              </p>
              <p>
                Country:{' '}
                {groomerInfo.country
                  ? groomerInfo.country
                  : 'Update your profile'}
              </p>
            </div>
          </div>
          <div className="panel">
            <Divider style={{ borderColor: 'lightblue' }}>Services</Divider>
            <div className="panel-info">
              <Services userInfo={userInfo} />
            </div>
          </div>
        </div>
      </Layout.Content>
    </div>
  );
};

export default GroomerProfilePage;
