import { useQuery } from 'react-query';

import { fetchNearRestaurantData } from '../../../apis/publicAPI';
import Loader from '../../Loader/Loader';
import noimg from '../../../assets/noimg.avif';

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
} from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { DetailDataTypes } from '../../../types/apiDataTypes';

interface Props {
  spotData?: DetailDataTypes;
  stayDetailData?: DetailDataTypes;
}

const RestaurantInfo: React.FunctionComponent<Props> = (props) => {
  const { spotData, stayDetailData } = props;
  const navigate = useNavigate();

  const combinedData = {
    ...spotData,
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
      <MyChildTopText>가까운 맛집 추천</MyChildTopText>
      <MyChildListBox>
        {isLoadingRestaurant ? (
          <Loader />
        ) : (
          <>
            {restaurantData ? (
              <>
                {restaurantData.slice(0, 4).map((item: any, i: number) => {
                  return (
                    <MyChildList
                      key={item.contentid}
                      onClick={() => {
                        navigate(`/restaurant/${item.contentid}`);
                      }}
                    >
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

                      <MyCildTextBox>
                        <MyChildTexth3>{item.title}</MyChildTexth3>
                        <MyChildTextp> {item.addr1}</MyChildTextp>
                      </MyCildTextBox>
                    </MyChildList>
                  );
                })}
              </>
            ) : (
              <>
                <div>주변 맛집 정보가 없습니다.</div>
              </>
            )}
          </>
        )}
      </MyChildListBox>
    </Container>
  );
};

export default RestaurantInfo;
