import React, { useState } from "react";

const Ticketing = ({ stayDetailData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState();
  const [termDate, setTermDate] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // process the ticket purchase here
    alert(
      `${quantity} 장의 티켓이 ${startDate}~${termDate}로 예약되었습니다 ${name} 님 (${email}) 로 ${stayDetailData.title}예약발송 되셧습니다`
    );
  };

  // console.log(startDate);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">이름 : </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label htmlFor="email">이메일 : </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="quantity">숙박인원 : </label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <br />
      <p>시작일</p>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <p>종료일</p>
      <input
        type="date"
        value={termDate}
        onChange={(e) => setTermDate(e.target.value)}
      />
      <button>장바구니담기</button>
      <button>구매하기</button>
    </form>
  );
};

export default Ticketing;
