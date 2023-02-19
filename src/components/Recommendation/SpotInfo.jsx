import { useQuery } from 'react-query';
import { fetchNearSpotData } from '../../apis/publicAPI';
import Loader from '../Loader/Loader';
import noimg from '../../assets/noimg.avif';
import { Link } from 'react-router-dom';
import RestaurantLiked from '../Liked/RestaurantLiked';

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

export default function SpotInfo({
  spotData,
  restaurantDetailData,
  stayDetailData,
}: UserProps): React.ReactElement {
  const combinedData = {
    ...spotData,
    ...restaurantDetailData,
    ...stayDetailData,
  };

  const { data: spotDetailData, isLoading: isLoadingSpot } = useQuery(
    ['spot_list', combinedData],
    () =>
      fetchNearSpotData({
        mapx: combinedData.mapx,
        mapy: combinedData.mapy,
      }),
    {
      enabled: !!combinedData,
    },
  );

  return (
    <Container>
      <MyChildTopText>주변 관광지 정보</MyChildTopText>
      <MyChildListBox>
        {isLoadingSpot ? (
          <Loader />
        ) : (
          <>
            {spotDetailData ? (
              <>
                {spotDetailData.slice(0, 4).map((item, i) => {
                  return (
                    <MyChildList key={i}>
                      <Link to={`/spot/${item.contentid}`}>
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
                          <RestaurantLiked spotDetailData={spotDetailData} />
                          <p>00</p>
                        </LikeBox>
                      </MyCildTextBox>
                    </MyChildList>
                  );
                })}
              </>
            ) : (
              <>
                <div>주변 관광지 정보가 없습니다.</div>
              </>
            )}
          </>
        )}
      </MyChildListBox>
    </Container>
  );
}
