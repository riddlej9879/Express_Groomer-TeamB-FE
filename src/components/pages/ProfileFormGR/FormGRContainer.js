import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RenderFormGR from './RenderFormGR';
//all axios call functions
import {
  getGroomerServicesByID,
  getGroomerServices,
  postUserInfo,
  putUserInfo,
  postGroomerServices,
  deleteProfile,
} from '../../../api/index.js';
import { useOktaAuth } from '@okta/okta-react';

const FormGRContainer = props => {
  const { userInfo, isRegistered, groomerInfo, setShowForm } = props;

  const { authState } = useOktaAuth();
  //for result message on submiting form
  const [resultInfo, setResultInfo] = useState({ message: null, type: null });
  //for delete modal
  const [showDelete, setShowDelete] = useState(false);
  const history = useHistory();
  //hours
  const hoursTemp = {
    sunday: { open: '12:00 AM', close: '12:00 AM' },
    monday: { open: '12:00 AM', close: '12:00 AM' },
    tuesday: { open: '12:00 AM', close: '12:00 AM' },
    wednesday: { open: '12:00 AM', close: '12:00 AM' },
    thursday: { open: '12:00 AM', close: '12:00 AM' },
    friday: { open: '12:00 AM', close: '12:00 AM' },
    saturday: { open: '12:00 AM', close: '12:00 AM' },
  };
  const [hoursOfOpp, setHoursOfOpp] = useState(hoursTemp);
  const [hours, setHours] = useState(hoursTemp);

  //services
  const [services, setServices] = useState({});
  const [grServices, setGrServices] = useState([]);

  //for adding a service
  const [serviceToAdd, setServiceToAdd] = useState('');
  const [priceToAdd, setPriceToAdd] = useState(0);

  useEffect(() => {
    if (userInfo) {
      getGroomerServicesByID(userInfo, setGrServices);
    }
    getGroomerServices(setServices);
  }, [userInfo]);

  useEffect(() => {
    if (groomerInfo.hours) {
      setHoursOfOpp(JSON.parse(groomerInfo.hours));
      setHours(JSON.parse(groomerInfo.hours));
    }
  }, [groomerInfo.hours]);

  const onFinish = values => {
    const hoursString = JSON.stringify(hours);
    //add in user id and hours
    const infoValues = {
      user_id: userInfo.sub,
      hours: hoursString,
      ...values,
    };

    //checking isRegistered and calling the API to either create or update
    //API calls are abstracted out into the API/index file as functions and called here
    if (isRegistered === false) {
      postUserInfo(
        `${process.env.REACT_APP_API_URI}/groomers/`,
        authState,
        infoValues,
        setResultInfo,
        history
      );
    } else {
      putUserInfo(
        `${process.env.REACT_APP_API_URI}/groomers/${userInfo.sub}`,
        authState,
        infoValues,
        setResultInfo
      );
    }
  };

  const deleteGroomerProfile = () => {
    deleteProfile(authState, 'groomers', userInfo, history, setResultInfo);
  };

  //updating open hours by day
  const updateOpenHours = (day, value) => {
    switch (day) {
      case 'sunday':
        setHours({
          ...hours,
          sunday: { ...hours.sunday, open: value },
        });
        break;
      case 'monday':
        setHours({
          ...hours,
          monday: { ...hours.sunday, open: value },
        });
        break;
      case 'tuesday':
        setHours({
          ...hours,
          tuesday: { ...hours.sunday, open: value },
        });
        break;
      case 'wednesday':
        setHours({
          ...hours,
          wednesday: { ...hours.sunday, open: value },
        });
        break;
      case 'thursday':
        setHours({
          ...hours,
          thursday: { ...hours.sunday, open: value },
        });
        break;
      case 'friday':
        setHours({
          ...hours,
          friday: { ...hours.sunday, open: value },
        });
        break;
      case 'saturday':
        setHours({
          ...hours,
          saturday: { ...hours.sunday, open: value },
        });
        break;
      default:
        setHours({ ...hours });
    }
  };

  //updating closed hours by day
  const updateCloseHours = (day, value) => {
    switch (day) {
      case 'sunday':
        setHours({
          ...hours,
          sunday: { ...hours.sunday, close: value },
        });
        break;
      case 'monday':
        setHours({
          ...hours,
          monday: { ...hours.sunday, close: value },
        });
        break;
      case 'tuesday':
        setHours({
          ...hours,
          tuesday: { ...hours.sunday, close: value },
        });
        break;
      case 'wednesday':
        setHours({
          ...hours,
          wednesday: { ...hours.sunday, close: value },
        });
        break;
      case 'thursday':
        setHours({
          ...hours,
          thursday: { ...hours.sunday, close: value },
        });
        break;
      case 'friday':
        setHours({
          ...hours,
          friday: { ...hours.sunday, close: value },
        });
        break;
      case 'saturday':
        setHours({
          ...hours,
          saturday: { ...hours.sunday, close: value },
        });
        break;
      default:
        setHours({ ...hours });
    }
  };

  const changeService = value => {
    setServiceToAdd(value);
  };

  const changePrice = event => {
    setPriceToAdd(event.target.value);
  };

  const addService = () => {
    const serviceValues = {
      groomer_id: userInfo.sub,
      services_id: serviceToAdd,
      services_price: priceToAdd,
    };
    postGroomerServices(
      `${process.env.REACT_APP_API_URI}/groomer_services/`,
      authState,
      serviceValues,
      setResultInfo
    );
  };

  return (
    <RenderFormGR
      userInfo={userInfo}
      onFinish={onFinish}
      groomerInfo={groomerInfo}
      isRegistered={isRegistered}
      resultInfo={resultInfo}
      showDelete={showDelete}
      setShowDelete={setShowDelete}
      deleteGroomerProfile={deleteGroomerProfile}
      updateOpenHours={updateOpenHours}
      updateCloseHours={updateCloseHours}
      hoursOfOpp={hoursOfOpp}
      changeService={changeService}
      changePrice={changePrice}
      addService={addService}
      services={services}
      grServices={grServices}
      setShowForm={setShowForm}
    />
  );
};

export default FormGRContainer;
