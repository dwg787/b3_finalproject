import { useEffect } from 'react';
import { useQuery } from 'react-query';
import {
  fetchAllSpotData,
  fetchAllStayData,
  fetchAllRestaurantData,
} from '../apis/publicAPI';

const AdminPage = () => {
  // useEffect(()=>{

  // },[])
  // const {data:spotData, isLoading:isLoadingSpotData} = useQuery(['all_data'],fetchAllSpotData);
  // const {data:stayData, isLoading:isLoadingStayData} = useQuery(['all_data'],fetchAllSpotData);
  // const {data:restaurantData, isLoading:isLoadingRestaurantData} = useQuery(['all_data'],fetchAllSpotData);

  const fetchAllData = () => {
    fetchAllSpotData();
    fetchAllRestaurantData();
    fetchAllStayData();
  };

  return <button onClick={fetchAllData}>데이터 업데이트</button>;
};

export default AdminPage;
