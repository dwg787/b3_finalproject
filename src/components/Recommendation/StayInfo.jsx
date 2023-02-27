import { useQuery } from 'react-query';
import { fetchNearStayData } from '../../apis/publicAPI';
import Loader from '../Loader/Loader';
import noimg from '../../assets/noimg.avif';
import { Link } from 'react-router-dom';
import RestaurantLiked from '../Liked/RestaurantLiked';
import { useRecoilState } from 'recoil';
import { nearStayState } from '../../recoil/apiDataAtoms';
import { useEffect } from 'react';
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

export default function StayInfo({
  spotData,
  restaurantDetailData,
  stayDetailData,
}: UserProps): React.ReactElement {
  const combinedData = {
    ...spotData,
    ...restaurantDetailData,
    ...stayDetailData,
  };
  const [nearStayList, setNearStayList] = useRecoilState(nearStayState);
  const { data: stayData, isLoading: isLoadingStay } = useQuery(
    ['stay_list', combinedData],
    () =>
      fetchNearStayData({ mapx: combinedData.mapx, mapy: combinedData.mapy }),
    {
      enabled: !!combinedData,
    },
  );

  useEffect(() => {
    setNearStayList(stayData);
  }, [setNearStayList, stayData]);

  return (
    <Container>
      <MyChildTopText>주변 숙소 추천</MyChildTopText>
      <MyChildListBox>
        {isLoadingStay ? (
          <Loader />
        ) : (
          <>
            {stayData ? (
              <>
                {stayData.slice(0, 4).map((item, i) => {
                  return (
                    <Link to={`/stay/${item.contentid}`}>
                      <MyChildList key={item.contentid}>
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
                          {/* <LikeBox>
                          <RestaurantLiked stayData={stayData} />
                          <p>00</p>
                        </LikeBox> */}
                        </MyCildTextBox>
                      </MyChildList>
                    </Link>
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
