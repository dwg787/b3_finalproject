import Slider from 'react-slick';
import './slickStyle.css';
import './slick-theme.css';
import 'slick-carousel/slick/slick-theme.css';
import ReviewList from './ReviewList';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export function PreviewRCSSlide({ reviews, setReviews }) {
  const params = useParams();
  const settings = {
    dots: false,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 6,
    // slidesToScroll: 6,
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 2,

    speed: 500,
    rows: 1,
    slidesPerRow: 3,
  };
  return (
    <div>
      <Slider {...settings}>
        {/* <div>여차하면 여따 댓글 하드코딩 5개</div> */}
        {reviews.map((review, i) => {
          if (review.paramId === params.id) {
            return (
              <>
                <div>
                  <ReviewList
                    reviews={reviews}
                    setReviews={setReviews}
                    review={review}
                    i={i}
                    uid={localStorage.getItem('id')}
                  />
                </div>
              </>
            );
          }
        })}
      </Slider>
    </div>
  );
}

const ReviewBoxList = styled.div`
  display: flex;
  /* width: 1146.11px; */
  /* height: 327px; */
  height: 100%;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  overflow: hidden;
  /* border: 1px solid blue; */
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;
