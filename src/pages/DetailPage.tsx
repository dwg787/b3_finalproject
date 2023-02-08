import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import { fetchAttractionDetailData } from '../apis/publicAPI';
import styled from 'styled-components';
import Loader from '../components/Loader';

const DetailPage = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(['attractions_detail', param], () =>
    fetchAttractionDetailData({ param })
  );

  // console.log('상세페이지 정보:', data);

  if (isLoading) return <Loader />;

  return (
    <Container>
      <div>
        {data &&
          data.map((e: any) => {
            return (
              <div key={param.id}>
                <Link to={'/'}>메인으로</Link>
                <div>{e.title}</div>
                <img src={e.firstimage} alt='관광지 사진' />
                <div>주소 : {e.addr1}</div>
                <Link to={`/${param.id}/map`}>지도보기</Link>
                {/* <div>{e.homepage}</div> */}
                <div>{e.overview}</div>
                <SideInfoWrapper>
                  <div>주변 숙박정보</div>
                  <div>주변 맛집정보</div>
                </SideInfoWrapper>
              </div>
            );
          })}
      </div>
    </Container>
  );
};

export default DetailPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SideInfoWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: row;
`;
