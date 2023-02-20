import { useQuery } from 'react-query';

import { fetchNearRestaurantData } from '../../apis/publicAPI';
import Loader from '../Loader/Loader';
import RestaurantDetail from '../RestaurantDetail';
import noimg from '../../assets/noimg.avif';

import {
  Container,
  MyChildTopText,
  MyChildListBox,
  MyChildList,
  MyChildImg,
  MyCildTextBox,
  MyChildTexth3,
  MyChildTextp,
  LikeBox,
  GoButton,
} from './styles';
import { Link } from 'react-router-dom';
import RestaurantLiked from '../Liked/RestaurantLiked';

export default function RestaurantInfo({
  spotData,
  restaurantDetailData,
  stayDetailData,
}: UserProps): React.ReactElement {
  const combinedData = {
    ...spotData,
    ...restaurantDetailData,
    ...stayDetailData,
  };

  const { data: restaurantData, isLoading: isLoadingRestaurant } = useQuery(
    ['restaurant_list', combinedData],
    () =>
      fetchNearRestaurantData({
        mapx: combinedData.mapx,
        mapy: combinedData.mapy,
      }),
    {
      enabled: !!combinedData,
    },
  );

  return (
    <Container>
      <MyChildTopText>주변 맛집 정보</MyChildTopText>
      <MyChildListBox>
        {isLoadingRestaurant ? (
          <Loader />
        ) : (
          <>
            {restaurantData ? (
              <>
                {restaurantData.slice(0, 4).map((item, i) => {
                  return (
                    <MyChildList key={i}>
                      <Link to={`/restaurant/${item.contentid}`}>
                        <picture>
                          <source
                            srcSet={item.firstimage || noimg}
                            type="image/avif"
                          ></source>
                          <source
                            srcSet={item.firstimage || noimg}
                            type="image/webp"
                          ></source>
                          <source
                            srcSet={item.firstimage || noimg}
                            type="image/jpg"
                          ></source>
                          <MyChildImg
                            src={item.firstimage || noimg}
                            alt="사진"
                            decoding="async"
                            loading="lazy"
                          />
                        </picture>
                      </Link>
                      <MyCildTextBox>
                        <MyChildTexth3>{item.title}</MyChildTexth3>
                        <MyChildTextp> {item.addr1}</MyChildTextp>
                        <LikeBox>
                          <RestaurantLiked restaurantData={restaurantData} />
                          <p>00</p>
                        </LikeBox>
                      </MyCildTextBox>
                    </MyChildList>
                  );
                })}
              </>
            ) : (
              <>
                <div>주변 숙박정보가 없습니다.</div>
              </>
            )}
          </>
        )}
      </MyChildListBox>
    </Container>
  );
}
