import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchNearStayData } from '../../apis/publicAPI';
import Loader from '../Loader/Loader';

import noimg from '../../assets/noimg.avif';
import { useNavigate } from 'react-router-dom';
import StayLiked from '../Liked/StayLiked';
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

const StayInfo = ({ spotData }) => {
  const navigate = useNavigate();

  const { data: stayData, isLoading: isLoadingStay } = useQuery(
    ['stay_list', spotData],
    () => fetchNearStayData({ mapx: spotData.mapx, mapy: spotData.mapy }),
    {
      enabled: !!spotData,
    },
  );

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
                      <MyChildList key={i}>
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
                          <LikeBox>
                            <StayLiked />
                            <p>00</p>
                          </LikeBox>
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
};

export default StayInfo;
